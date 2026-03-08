import { jsx as d } from "react/jsx-runtime";
import { useRef as h, useState as C, useEffect as l } from "react";
const S = "https://code.kaptha.dev/creative/embed", u = `${S}/editor.js`, p = `${S}/editor.css`;
let s = null;
function y() {
  if (document.querySelector(`link[href="${p}"]`)) return;
  const e = document.createElement("link");
  e.rel = "stylesheet", e.href = p, document.head.appendChild(e);
}
function E() {
  return new Promise((e, n) => {
    if (document.querySelector(`script[src="${u}"]`)) {
      if (window.KapthaCreativeSuite)
        e();
      else {
        const r = document.querySelector(`script[src="${u}"]`);
        r.addEventListener("load", () => e()), r.addEventListener("error", () => n(new Error("Failed to load Kaptha Creative Suite from CDN")));
      }
      return;
    }
    const t = document.createElement("script");
    t.src = u, t.async = !0, t.onload = () => e(), t.onerror = () => n(new Error("Failed to load Kaptha Creative Suite from CDN")), document.head.appendChild(t);
  });
}
function v() {
  return s || (y(), s = E()), s;
}
function w() {
  const e = window.KapthaCreativeSuite;
  if (!e?.createEditor)
    throw new Error("[KapthaCreativeSuite] CDN bundle not loaded. Call loadBundle() first.");
  return e.createEditor;
}
const k = ({
  className: e,
  style: n,
  onLoadError: t,
  ...r
}) => {
  const a = h(null), o = h(null), [c, f] = C("loading");
  return l(() => {
    let i = !1;
    return v().then(() => {
      i || f("ready");
    }).catch((m) => {
      i || (f("error"), t?.(m));
    }), () => {
      i = !0;
    };
  }, []), l(() => {
    if (!(c !== "ready" || !a.current))
      if (o.current)
        o.current.update(r);
      else {
        const i = w();
        o.current = i({
          container: a.current,
          ...r
        });
      }
  }, [c, r]), l(() => () => {
    o.current?.destroy(), o.current = null;
  }, []), c === "error" ? /* @__PURE__ */ d("div", { className: e, style: { display: "flex", alignItems: "center", justifyContent: "center", ...n }, children: /* @__PURE__ */ d("p", { style: { color: "#ef4444", fontSize: 14 }, children: "Failed to load Kaptha Creative Suite. Please check your connection and try again." }) }) : /* @__PURE__ */ d(
    "div",
    {
      ref: a,
      className: e,
      style: { position: "relative", ...n }
    }
  );
};
export {
  k as KapthaCreativeSuite,
  v as loadBundle
};
