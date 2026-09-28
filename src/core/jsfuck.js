import { register } from "./registry.js";

// JSFuck only uses []()!+. Decoding executes the validated expression locally.
function jsFuckDecode(text) {
  const s = text.trim();
  if (!s) return "";
  if (!/^[\[\]()!+\s]+$/.test(s)) {
    throw new Error("JSFuck 只含 []()!+ 六字符");
  }
  try {
    const fn = new Function('"use strict"; return (' + s + ');');
    const r = fn();
    return typeof r === "string" ? r : String(r);
  } catch (e) {
    throw new Error("JSFuck 执行失败: " + e.message);
  }
}

register({
  id: "jsfuck", cat: "text", name: "JSFuck", desc: "六字符 []()!+ 构造的 JS（仅解码，Function 沙箱）",
  decode: jsFuckDecode,
  detect: (t) => (/^[\[\]()!+]+$/.test(t.trim()) && t.length >= 10 ? 0.6 : 0),
});

export { jsFuckDecode };
