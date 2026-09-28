/*
 * eduContent.defer.js — 科普数据懒加载门面（T621-B）。
 *
 * 为什么存在：eduContent.js 静态聚合 133 个 zh 科普分片（约 1.4MB），被 main.js
 * 静态 import 后全部进入首屏关键路径——每次冷载/硬刷新都全量拉取。本门面把
 * 聚合模块改为**闲时动态 import**：页面加载阶段不拉科普数据，模块就绪前
 * getEduSync() 返回 undefined（科普卡不渲染）、eduAliasesSync() 返回 null
 * （搜索索引不含别名），就绪后由消费方补渲/清缓存重建。
 *
 * 契约：
 * - eduContentReady(): Promise<module> —— 聚合模块就绪（含失败回落：import
 *   失败时保持 _mod=null，消费方退化到无科普/无别名行为，不崩）。
 * - getEduSync(opId, locale) / eduAliasesSync(): 同步直取，未就绪返回
 *   undefined / null；行为与 eduContent.js 的 getEdu/eduAliases 就绪后一致。
 * - registerEduEn(d): 转发英文科普层注册（保持 en 侧既有接入方式可用）。
 *
 * 红线：纯前端零外发；不改变 eduContent.js 数据与 API 本体。
 */
let _mod = null;
const _ready = import("./eduContent.js")
  .then((m) => { _mod = m; return m; })
  .catch((e) => { console.warn("[edu] 科普数据懒加载失败（本次会话无科普卡/搜索别名）：", e); return null; });

export function eduContentReady() {
  return _ready;
}

export function getEduSync(opId, locale) {
  return _mod ? _mod.getEdu(opId, locale) : undefined;
}

export function eduAliasesSync() {
  return _mod ? _mod.eduAliases() : null;
}

export function registerEduEn(enData) {
  return _ready.then((m) => (m ? m.registerEduEn(enData) : undefined));
}
