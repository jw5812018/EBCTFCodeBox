/*
 * oleExtract.js — OLE/CFB（Compound File Binary）只读静态提取（cat:'forensic', run 单向）。
 *
 * 原理：CFB（OLE2）是 Office 97-2003 文档、vbaProject.bin、msi 等的容器格式。
 * 头部（512B，magic D0CF11E0A1B11AE1）给出扇区大小（v3=512/v4=4096）、FAT/DIFAT
 * 位置、目录起始扇区、mini 流 cutoff（默认 4096B）。FAT 是扇区链表；目录是
 * 128 字节定长项（名称 UTF-16LE、类型 storage/stream/root、红黑树 sibling/child
 * 指针、起始扇区、大小）；小于 cutoff 的流放在「mini 流」里（64B 小扇区，由
 * Root Entry 的流空间承载、MiniFAT 链接），大于等于 cutoff 的直接走 FAT。
 * 本 op 按兄弟树走完整目录，列出全部 storage/stream 并提取流内容（静态只读，
 * 红线：不执行宏、不运行任何文档内代码）。
 *
 * 复用：CFB 读取链（parseCfbHeader/readFat/readStream/parseDirEntry/readMiniFat/
 * readMiniStream/followChain）来自 john_office.js（本卡补导出，单一事实源）。
 *
 * 边界（如实）：v3/v4 均支持；不解析 VBA dir 记录与 MS-OVBA 压缩容器（分阶段，
 * 本阶段输出 vbaProject.bin 原始流供下一步）；不校验目录树红黑平衡（只读遍历
 * 带环保护）；超时/超大文件由统一文件入口护栏控制。
 *
 * 自检：独立生成器夹具（MS-CFB 直构 + oracle 事实表）逐字段对拍。
 */
import { register } from "./registry.js";
import {
  parseCfbHeader, readFat, readStream, parseDirEntry,
  readMiniFat, readMiniStream, followChain, isCfbMagic, ENDOFCHAIN,
} from "./john_office.js";

/* ================= 目录遍历 ================= */

/**
 * 解析全部目录槽位（槽位号 = 目录项 ID，空槽保留 null，与 readDirectory 的
 * 压缩数组不同——树遍历必须用绝对 ID）。
 */
function readDirSlots(bytes, header, fat) {
  const { sectorSize, firstDirSector } = header;
  const perSector = sectorSize / 128;
  const slots = [];
  for (const secNum of followChain(fat, firstDirSector)) {
    const off = (secNum + 1) * sectorSize;
    for (let e = 0; e < perSector; e++) {
      const entryOff = off + e * 128;
      if (entryOff + 128 > bytes.length) break;
      slots.push(parseDirEntry(bytes, entryOff)); // 空槽 null
    }
  }
  return slots;
}

function fmtClsid(bytes, off) {
  const h = (n) => Array.from(bytes.slice(off + n, off + n + 4)).map((x) => x.toString(16).padStart(2, "0")).join("");
  const h2 = (n) => Array.from(bytes.slice(off + n, off + n + 2)).map((x) => x.toString(16).padStart(2, "0")).join("");
  const h1 = (n) => Array.from(bytes.slice(off + n, off + n + 1)).map((x) => x.toString(16).padStart(2, "0")).join("");
  const h6 = (n) => Array.from(bytes.slice(off + n, off + n + 6)).map((x) => x.toString(16).padStart(2, "0")).join("");
  if (!h(0) && !h2(4) && !h2(6) && !h2(8) && !h6(10)) {
    return "00000000-0000-0000-0000-000000000000";
  }
  // CFB 里 CLSID 按 GUID 混端序存储：前三组小端、后两组大端（8-4-4-4-12）
  const rev = (s) => s.match(/../g).reverse().join("");
  return rev(h(0)) + "-" + rev(h2(4)) + "-" + rev(h2(6)) + "-" + h2(8) + "-" + h6(10);
}

/**
 * 解析 CFB：返回 { ok, sectorSize, majorVersion, rootClsid,
 * entries: [{path,type,size,sha256?}], streams: Map(path→Uint8Array) }。
 * shaFn 注入同步哈希（产品路径可省）。
 */
export function parseOle(data, shaFn = null) {
  if (!isCfbMagic(data)) return { ok: false, error: "magic" };
  const header = parseCfbHeader(data);          // 非 CFB/坏头会抛错
  const fat = readFat(data, header);
  const slots = readDirSlots(data, header, fat);
  if (!slots.length || !slots[0] || slots[0].objectType !== 5) {
    return { ok: false, error: "root entry missing" };
  }
  const miniFat = readMiniFat(data, header, fat);
  const miniStream = readMiniStream(data, header, fat, slots[0]);
  const rootClsid = fmtClsid(data, slots[0].offset + 0x50);

  const entries = [];
  const streams = new Map();
  const seen = new Set();

  function visitSiblings(id, prefix) {
    // 红黑树以 left/right 兄弟链组织，递归遍历带环保护
    if (id === ENDOFCHAIN || id >= slots.length || id < 0) return;
    if (seen.has(id)) return;
    seen.add(id);
    const en = slots[id];
    if (!en) return;
    visitSiblings(en.leftSiblingId, prefix);
    const path = prefix + en.name;
    if (en.objectType === 1) {                  // storage
      entries.push({ path, type: "storage", size: 0, sha256: null });
      if (en.childId !== ENDOFCHAIN && en.childId < slots.length) {
        visitSiblings(en.childId, path + "/");
      }
    } else if (en.objectType === 2) {           // stream
      let content = null;
      try {
        content = readStream(data, header, fat, miniFat, miniStream, en);
      } catch { content = null; }               // 损坏流：如实标注，不中断整树
      const row = { path, type: "stream", size: en.streamSize };
      if (content && content.length === en.streamSize && shaFn) row.sha256 = shaFn(content);
      entries.push(row);
      if (content) streams.set(path, content);
    } else if (en.objectType === 5) {           // 嵌套 root（不规范但见过）：按 storage 处理
      entries.push({ path, type: "storage", size: 0, sha256: null });
      if (en.childId !== ENDOFCHAIN && en.childId < slots.length) {
        visitSiblings(en.childId, path + "/");
      }
    }
    visitSiblings(en.rightSiblingId, prefix);
  }

  if (slots[0].childId !== ENDOFCHAIN && slots[0].childId < slots.length) {
    visitSiblings(slots[0].childId, "");
  }
  entries.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
  return { ok: true, sectorSize: header.sectorSize, majorVersion: header.majorVersion, rootClsid, entries, streams };
}

/* ================= op（只读提取，单向） ================= */

function oleExtractRun(text, p) {
  const raw = p && p.rawBytes instanceof Uint8Array ? p.rawBytes : null;
  if (!raw || raw.length === 0) throw new Error("需要文件输入：把 OLE/OLE2 文件（.doc/.xls/.ppt/.msi/.ole/vbaProject.bin 等）拖进输入框（静态只读，不执行宏）");
  let r;
  try {
    r = parseOle(raw);
  } catch (err) {
    return { text: "无法解析为 OLE/CFB 容器——" + (err && err.message ? err.message : String(err)) };
  }
  if (!r.ok) {
    return { text: r.error === "magic"
      ? "不是 OLE/CFB 容器（magic D0CF11E0A1B11AE1 不匹配）。提示：Office 2007+ 的 .docx/.xlsx 是 ZIP 容器，请用解压类工具。"
      : "解析失败：" + r.error };
  }
  const maxMB = p && p.maxMB ? Number(p.maxMB) : 32;
  const maxBytes = Math.max(1, maxMB) * 1024 * 1024;
  const lines = [];
  lines.push(`OLE/CFB v${r.majorVersion}（扇区 ${r.sectorSize}B），Root CLSID ${r.rootClsid}`);
  lines.push(`共 ${r.entries.length} 个对象：`);
  lines.push("");
  const files = [];
  let totalOut = 0;
  let skipped = 0;
  for (const en of r.entries) {
    const tag = en.type === "storage" ? "[目录] " : "[流]   ";
    const extra = en.type === "stream" ? `  ${en.size} 字节${en.sha256 ? "  SHA-256 " + en.sha256.slice(0, 16) + "…" : ""}` : "";
    lines.push(`  ${tag}${en.path}${extra}`);
    if (en.type === "stream" && r.streams.has(en.path)) {
      if (totalOut + en.size <= maxBytes) {
        const bytes = r.streams.get(en.path);
        files.push({ name: en.path.replace(/[/\\]/g, "__"), mime: "application/octet-stream", bytes });
        totalOut += en.size;
      } else {
        skipped++;
      }
    }
  }
  if (skipped) lines.push("", `（另有 ${skipped} 个流超出提取上限 ${maxMB}MB，仅列出未附产物）`);
  lines.push("", "静态只读提取完成——未执行任何宏或文档代码。vbaProject.bin 流可另接 VBA 阶段解析。");
  return { text: lines.join("\n"), files };
}

register({
  id: "oleExtract", cat: "forensic", name: "OLE/CFB 容器静态提取",
  desc: "OLE2/Compound File Binary 容器只读解析：目录树（storage/stream）、FAT 与 MiniFAT 双通道取流、Root CLSID、流字节 SHA-256 并附下载产物。适用于 .doc/.xls/.ppt/.msi/vbaProject.bin 等 Office 97-2003 与安装包容器。静态只读，绝不执行宏或文档内代码",
  params: [
    { key: "maxMB", label: "产物总提取上限（MB）", type: "number", default: 32 },
  ],
  run: oleExtractRun,
  acceptsBytes: true,
});

export { oleExtractRun, readDirSlots, fmtClsid };
