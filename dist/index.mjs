import { jsx as d } from "react/jsx-runtime";
import { useRef as h, useState as m, useEffect as l } from "react";
const c = "https://code.kaptha.dev/creative/embed", S = `${c}/manifest.json`;
let u = null;
async function C() {
  const t = { js: `${c}/editor.js`, css: `${c}/editor.css` };
  try {
    const e = await fetch(S, { cache: "no-cache" });
    if (!e.ok) return t;
    const r = await e.json();
    return {
      js: r.js?.startsWith("http") ? r.js : `${c}/${r.js || "editor.js"}`,
      css: r.css?.startsWith("http") ? r.css : `${c}/${r.css || "editor.css"}`
    };
  } catch {
    return t;
  }
}
function y(t) {
  if (document.querySelector('link[href*="editor"]')) return;
  const e = document.createElement("link");
  e.rel = "stylesheet", e.href = t, document.head.appendChild(e);
}
function E(t) {
  return new Promise((e, r) => {
    if (window.KapthaCreativeSuite) {
      e();
      return;
    }
    const o = document.querySelector('script[src*="editor"]');
    if (o) {
      o.addEventListener("load", () => e()), o.addEventListener("error", () => r(new Error("Failed to load Kaptha Creative Suite from CDN")));
      return;
    }
    const n = document.createElement("script");
    n.src = t, n.async = !0, n.onload = () => e(), n.onerror = () => r(new Error("Failed to load Kaptha Creative Suite from CDN")), document.head.appendChild(n);
  });
}
function v() {
  return u || (u = C().then(({ js: t, css: e }) => (y(e), E(t)))), u;
}
function w() {
  const t = window.KapthaCreativeSuite;
  if (!t?.createEditor)
    throw new Error("[KapthaCreativeSuite] CDN bundle not loaded. Call loadBundle() first.");
  return t.createEditor;
}
const k = ({
  className: t,
  style: e,
  onLoadError: r,
  ...o
}) => {
  const n = h(null), a = h(null), [s, f] = m("loading");
  return l(() => {
    let i = !1;
    return v().then(() => {
      i || f("ready");
    }).catch((p) => {
      i || (f("error"), r?.(p));
    }), () => {
      i = !0;
    };
  }, []), l(() => {
    if (!(s !== "ready" || !n.current))
      if (a.current)
        a.current.update(o);
      else {
        const i = w();
        a.current = i({
          container: n.current,
          ...o
        });
      }
  }, [s, o]), l(() => () => {
    a.current?.destroy(), a.current = null;
  }, []), s === "error" ? /* @__PURE__ */ d("div", { className: t, style: { display: "flex", alignItems: "center", justifyContent: "center", ...e }, children: /* @__PURE__ */ d("p", { style: { color: "#ef4444", fontSize: 14 }, children: "Failed to load Kaptha Creative Suite. Please check your connection and try again." }) }) : /* @__PURE__ */ d(
    "div",
    {
      ref: n,
      className: t,
      style: { position: "relative", ...e }
    }
  );
};
export {
  k as KapthaCreativeSuite,
  v as loadBundle
};
