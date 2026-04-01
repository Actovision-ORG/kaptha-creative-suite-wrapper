import { jsx as l } from "react/jsx-runtime";
import { useRef as f, useState as m, useEffect as d } from "react";
const p = "https://code.kaptha.dev/creative/embed", S = `?t=${Math.floor(Date.now() / 36e5)}`, y = `${p}/editor.js${S}`, h = `${p}/editor.css${S}`;
let u = null;
function E() {
  if (document.querySelector(`link[href="${h}"]`)) return;
  const e = document.createElement("link");
  e.rel = "stylesheet", e.href = h, document.head.appendChild(e);
}
function v() {
  return new Promise((e, o) => {
    if (window.KapthaCreativeSuite) {
      e();
      return;
    }
    const t = document.createElement("script");
    t.src = y, t.async = !0, t.onload = () => e(), t.onerror = () => o(new Error("Failed to load Kaptha Creative Suite from CDN")), document.head.appendChild(t);
  });
}
function w() {
  return u || (E(), u = v()), u;
}
function K() {
  const e = window.KapthaCreativeSuite;
  if (!e?.createEditor)
    throw new Error("[KapthaCreativeSuite] CDN bundle not loaded. Call loadBundle() first.");
  return e.createEditor;
}
const k = ({
  className: e,
  style: o,
  onLoadError: t,
  ...a
}) => {
  const i = f(null), r = f(null), [c, s] = m("loading");
  return d(() => {
    let n = !1;
    return w().then(() => {
      n || s("ready");
    }).catch((C) => {
      n || (s("error"), t?.(C));
    }), () => {
      n = !0;
    };
  }, []), d(() => {
    if (!(c !== "ready" || !i.current))
      if (r.current)
        r.current.update(a);
      else {
        const n = K();
        r.current = n({
          container: i.current,
          ...a
        });
      }
  }, [c, a]), d(() => () => {
    r.current?.destroy(), r.current = null;
  }, []), c === "error" ? /* @__PURE__ */ l("div", { className: e, style: { display: "flex", alignItems: "center", justifyContent: "center", ...o }, children: /* @__PURE__ */ l("p", { style: { color: "#ef4444", fontSize: 14 }, children: "Failed to load Kaptha Creative Suite. Please check your connection and try again." }) }) : /* @__PURE__ */ l(
    "div",
    {
      ref: i,
      className: e,
      style: { position: "relative", ...o }
    }
  );
};
export {
  k as KapthaCreativeSuite,
  w as loadBundle
};
