class va extends HTMLElement {
  _shadowRoot;
  _connected = !1;
  constructor() {
    super(), this._shadowRoot = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this._connected ? this.render() : (this._connected = !0, this.render(), this.firstUpdated());
  }
  disconnectedCallback() {
    this._connected = !1;
  }
  attributeChangedCallback(e, t, n) {
    t !== n && this.render();
  }
  firstUpdated() {
  }
  // Template literal values can be any type that can be converted to string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  html(e, ...t) {
    return e.reduce((n, r, s) => n + r + (t[s] || ""), "");
  }
  // Template literal values can be any type that can be converted to string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  css(e, ...t) {
    return `<style>${e.reduce((r, s, a) => r + s + (t[a] || ""), "")}</style>`;
  }
  updateShadowRoot(e) {
    this._shadowRoot.innerHTML = e;
  }
  query(e) {
    return this._shadowRoot.querySelector(e);
  }
  queryAll(e) {
    return this._shadowRoot.querySelectorAll(e);
  }
  // Custom event detail can be any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch(e, t) {
    this.dispatchEvent(new CustomEvent(e, {
      detail: t,
      bubbles: !0,
      composed: !0
    }));
  }
}
const Sc = ["image", "panorama", "youtube", "video", "3dmodel", "gaussian"];
function yi(i) {
  const e = i.getAttribute("image-type") ?? "", t = {
    url: i.getAttribute("image-url") ?? "",
    type: Sc.includes(e) ? e : "image",
    thumbnailUrl: i.getAttribute("thumbnail-url") ?? "",
    caption: i.getAttribute("caption") ?? "",
    fitToContainer: i.hasAttribute("fit-to-container"),
    debugMode: i.hasAttribute("debug-mode")
  }, n = i.getAttribute("material-url");
  n !== null && (t.materialUrl = n);
  const r = i.getAttribute("camera-position");
  r !== null && (t.cameraPosition = r);
  const s = i.getAttribute("camera-target");
  return s !== null && (t.cameraTarget = s), i.hasAttribute("show-texture") && (t.showTexture = i.getAttribute("show-texture") !== "false"), t;
}
function di(i, e, t) {
  return e <= 0 ? 0 : t ? (i % e + e) % e : Math.min(Math.max(i, 0), e - 1);
}
function pl(i, e, t, n) {
  return di(i + e, t, n);
}
function Zi(i, e, t) {
  if (e <= 0) return [];
  const n = [];
  for (let r = 0; r < e; r++) {
    let s = r - i;
    t && e > 1 && (s = (s % e + e) % e, s > e / 2 && (s -= e)), n.push(s);
  }
  return n;
}
const bc = 8;
function ml(i, e, t) {
  let n = "none";
  return !t && i > bc ? n = "counter" : !t && i > 1 && (n = "dots"), {
    showBar: i > 1 || e !== "",
    caption: e,
    indicator: n
  };
}
function gl(i, e, t, n, r, s) {
  if (i.replaceChildren(), !e.showBar) return;
  const a = document.createElement("div");
  a.className = s === "viewer" ? "cc-bar cc-bar--viewer" : "cc-bar cc-bar--slider";
  const o = document.createElement("div");
  o.className = "cc-bar-caption", o.textContent = e.caption;
  const c = document.createElement("div");
  if (c.className = "cc-bar-indicator", e.indicator === "counter") {
    const l = document.createElement("span");
    l.className = "cc-bar-counter", l.textContent = `${t + 1} / ${n}`, c.appendChild(l);
  } else if (e.indicator === "dots")
    for (let l = 0; l < n; l++) {
      const h = document.createElement("button");
      h.type = "button", h.className = "cc-bar-dot", h.setAttribute("aria-label", `Slide ${l + 1}`), l === t && h.setAttribute("aria-current", "true"), h.addEventListener("click", () => r(l)), c.appendChild(h);
    }
  a.append(o, c), i.appendChild(a);
}
const _l = `
.cc-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
}
.cc-bar-caption {
  flex: 1 1 auto;
  min-width: 0;
}
.cc-bar--slider .cc-bar-caption {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cc-bar--viewer .cc-bar-caption {
  white-space: normal;
  overflow-wrap: anywhere;
}
.cc-bar-indicator {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  gap: 6px;
}
.cc-bar-counter {
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.cc-bar-dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border: none;
  border-radius: 50%;
  /* button の既定の文字色（黒）ではなく、帯の文字色を受け継ぐ。スライダーは自前で主題色を指定する */
  color: inherit;
  background: currentColor;
  opacity: 0.35;
  cursor: pointer;
}
.cc-bar-dot[aria-current='true'] {
  opacity: 1;
}
`, Qe = {
  dragThresholdPx: 8,
  swipeCommitRatio: 0.2,
  swipeVelocityPxPerMs: 0.35,
  slideTransitionMs: 250,
  slideAutoplayMs: 5e3,
  dampingFactor: 0.9,
  dampingReferenceHz: 60,
  rotateSpeed: 1,
  panSpeed: 1,
  wheelZoomStep: 15e-4,
  imageMinZoom: 0.25,
  imageMaxZoom: 8,
  panoramaMaxPitchDeg: 85,
  panoramaMinFovDeg: 30,
  panoramaMaxFovDeg: 100,
  doubleTapMs: 300,
  doubleTapSlopPx: 24,
  barHideDelayMs: 3e3
}, to = {
  ja: "1 本指／左ドラッグ：回転／移動　2 本指／右ドラッグ：平行移動　ホイール／ピンチ：拡大縮小　ダブルクリック／ダブルタップ：初期表示に戻す",
  en: "One finger / left drag: rotate / move  Two fingers / right drag: pan  Wheel / pinch: zoom  Double-click / double-tap: reset view"
};
const xa = "186", yc = 0, no = 1, Ec = 2, Tr = 1, Tc = 2, Li = 3, In = 0, Lt = 1, gn = 2, vn = 0, Ni = 1, io = 2, ro = 3, so = 4, wc = 5, hi = 100, Ac = 101, Rc = 102, Cc = 103, Pc = 104, Lc = 200, Dc = 201, Ic = 202, Uc = 203, vl = 204, xl = 205, Nc = 206, Fc = 207, Oc = 208, Bc = 209, zc = 210, Vc = 211, Hc = 212, kc = 213, Gc = 214, Ps = 0, Ls = 1, Ds = 2, zi = 3, Is = 4, Us = 5, Ns = 6, Fs = 7, Ma = 0, Wc = 1, Xc = 2, an = 0, Ml = 1, Sl = 2, bl = 3, yl = 4, El = 5, Tl = 6, wl = 7, Al = 300, Gn = 301, _i = 302, Zr = 303, Jr = 304, Gr = 306, Ir = 1e3, _n = 1001, Os = 1002, bt = 1003, qc = 1004, Ji = 1005, At = 1006, Qr = 1007, Vn = 1008, l_ = 1008, Ot = 1009, Rl = 1010, Cl = 1011, Vi = 1012, Sa = 1013, on = 1014, rn = 1015, ln = 1016, ba = 1017, ya = 1018, Hi = 1020, Pl = 35902, Ll = 35899, Dl = 1021, Il = 1022, Zt = 1023, Sn = 1026, Hn = 1027, Ul = 1028, Ea = 1029, Wn = 1030, Ta = 1031, wa = 1033, wr = 33776, Ar = 33777, Rr = 33778, Cr = 33779, Bs = 35840, zs = 35841, Vs = 35842, Hs = 35843, ks = 36196, Gs = 37492, Ws = 37496, Xs = 37488, qs = 37489, Ur = 37490, Ys = 37491, Ks = 37808, $s = 37809, Zs = 37810, Js = 37811, Qs = 37812, js = 37813, ea = 37814, ta = 37815, na = 37816, ia = 37817, ra = 37818, sa = 37819, aa = 37820, oa = 37821, la = 36492, ca = 36494, ha = 36495, ua = 36283, da = 36284, Nr = 36285, fa = 36286, Yc = 3200, Fr = 0, Kc = 1, Dn = "", Mt = "srgb", Or = "srgb-linear", Br = "linear", Ze = "srgb", jr = 7680, $c = 519, Zc = 512, Jc = 513, Qc = 514, Aa = 515, jc = 516, eh = 517, Ra = 518, th = 519, nh = 35044, ao = "300 es", sn = 2e3, ki = 2001;
function ih(i) {
  for (let e = i.length - 1; e >= 0; --e)
    if (i[e] >= 65535) return !0;
  return !1;
}
function Gi(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function rh() {
  const i = Gi("canvas");
  return i.style.display = "block", i;
}
const oo = {};
function lo(...i) {
  const e = "THREE." + i.shift();
  console.log(e, ...i);
}
function Nl(i) {
  const e = i[0];
  if (typeof e == "string" && e.startsWith("TSL:")) {
    const t = i[1];
    t && t.isStackTrace ? i[0] += " " + t.getLocation() : i[1] = 'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.';
  }
  return i;
}
function Re(...i) {
  i = Nl(i);
  const e = "THREE." + i.shift();
  {
    const t = i[0];
    t && t.isStackTrace ? console.warn(t.getError(e)) : console.warn(e, ...i);
  }
}
function Xe(...i) {
  i = Nl(i);
  const e = "THREE." + i.shift();
  {
    const t = i[0];
    t && t.isStackTrace ? console.error(t.getError(e)) : console.error(e, ...i);
  }
}
function mi(...i) {
  const e = i.join(" ");
  e in oo || (oo[e] = !0, Re(...i));
}
function sh(i, e, t) {
  return new Promise(function(n, r) {
    function s() {
      switch (i.clientWaitSync(e, i.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case i.WAIT_FAILED:
          r();
          break;
        case i.TIMEOUT_EXPIRED:
          setTimeout(s, t);
          break;
        default:
          n();
      }
    }
    setTimeout(s, t);
  });
}
const ah = {
  [Ps]: Ls,
  [Ds]: Ns,
  [Is]: Fs,
  [zi]: Us,
  [Ls]: Ps,
  [Ns]: Ds,
  [Fs]: Is,
  [Us]: zi
};
class Xn {
  /**
   * Adds the given event listener to the given event type.
   *
   * @param {string} type - The type of event to listen to.
   * @param {Function} listener - The function that gets called when the event is fired.
   */
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
  }
  /**
   * Returns `true` if the given event listener has been added to the given event type.
   *
   * @param {string} type - The type of event.
   * @param {Function} listener - The listener to check.
   * @return {boolean} Whether the given event listener has been added to the given event type.
   */
  hasEventListener(e, t) {
    const n = this._listeners;
    return n === void 0 ? !1 : n[e] !== void 0 && n[e].indexOf(t) !== -1;
  }
  /**
   * Removes the given event listener from the given event type.
   *
   * @param {string} type - The type of event.
   * @param {Function} listener - The listener to remove.
   */
  removeEventListener(e, t) {
    const n = this._listeners;
    if (n === void 0) return;
    const r = n[e];
    if (r !== void 0) {
      const s = r.indexOf(t);
      s !== -1 && r.splice(s, 1);
    }
  }
  /**
   * Dispatches an event object.
   *
   * @param {Object} event - The event that gets fired.
   */
  dispatchEvent(e) {
    const t = this._listeners;
    if (t === void 0) return;
    const n = t[e.type];
    if (n !== void 0) {
      e.target = this;
      const r = n.slice(0);
      for (let s = 0, a = r.length; s < a; s++)
        r[s].call(this, e);
      e.target = null;
    }
  }
}
const Tt = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
let co = 1234567;
const Fi = Math.PI / 180, Wi = 180 / Math.PI;
function xi() {
  const i = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (Tt[i & 255] + Tt[i >> 8 & 255] + Tt[i >> 16 & 255] + Tt[i >> 24 & 255] + "-" + Tt[e & 255] + Tt[e >> 8 & 255] + "-" + Tt[e >> 16 & 15 | 64] + Tt[e >> 24 & 255] + "-" + Tt[t & 63 | 128] + Tt[t >> 8 & 255] + "-" + Tt[t >> 16 & 255] + Tt[t >> 24 & 255] + Tt[n & 255] + Tt[n >> 8 & 255] + Tt[n >> 16 & 255] + Tt[n >> 24 & 255]).toLowerCase();
}
function Be(i, e, t) {
  return Math.max(e, Math.min(t, i));
}
function Ca(i, e) {
  return (i % e + e) % e;
}
function oh(i, e, t, n, r) {
  return n + (i - e) * (r - n) / (t - e);
}
function lh(i, e, t) {
  return i !== e ? (t - i) / (e - i) : 0;
}
function Oi(i, e, t) {
  return (1 - t) * i + t * e;
}
function ch(i, e, t, n) {
  return Oi(i, e, 1 - Math.exp(-t * n));
}
function hh(i, e = 1) {
  return e - Math.abs(Ca(i, e * 2) - e);
}
function uh(i, e, t) {
  return i <= e ? 0 : i >= t ? 1 : (i = (i - e) / (t - e), i * i * (3 - 2 * i));
}
function dh(i, e, t) {
  return i <= e ? 0 : i >= t ? 1 : (i = (i - e) / (t - e), i * i * i * (i * (i * 6 - 15) + 10));
}
function fh(i, e) {
  return i + Math.floor(Math.random() * (e - i + 1));
}
function ph(i, e) {
  return i + Math.random() * (e - i);
}
function mh(i) {
  return i * (0.5 - Math.random());
}
function gh(i) {
  i !== void 0 && (co = i);
  let e = co += 1831565813;
  return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
}
function _h(i) {
  return i * Fi;
}
function vh(i) {
  return i * Wi;
}
function xh(i) {
  return i > 0 && Number.isInteger(i) && 2 ** Math.round(Math.log2(i)) === i;
}
function Mh(i) {
  return Math.pow(2, Math.ceil(Math.log(i) / Math.LN2));
}
function Sh(i) {
  return Math.pow(2, Math.floor(Math.log(i) / Math.LN2));
}
function bh(i, e, t, n, r) {
  const s = Math.cos, a = Math.sin, o = s(t / 2), c = a(t / 2), l = s((e + n) / 2), h = a((e + n) / 2), d = s((e - n) / 2), u = a((e - n) / 2), p = s((n - e) / 2), _ = a((n - e) / 2);
  switch (r) {
    case "XYX":
      i.set(o * h, c * d, c * u, o * l);
      break;
    case "YZY":
      i.set(c * u, o * h, c * d, o * l);
      break;
    case "ZXZ":
      i.set(c * d, c * u, o * h, o * l);
      break;
    case "XZX":
      i.set(o * h, c * _, c * p, o * l);
      break;
    case "YXY":
      i.set(c * p, o * h, c * _, o * l);
      break;
    case "ZYZ":
      i.set(c * _, c * p, o * h, o * l);
      break;
    default:
      Re("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + r);
  }
}
function ui(i, e) {
  switch (e.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return i / 4294967295;
    case Uint16Array:
      return i / 65535;
    case Uint8Array:
    case Uint8ClampedArray:
      return i / 255;
    case Int32Array:
      return Math.max(i / 2147483647, -1);
    case Int16Array:
      return Math.max(i / 32767, -1);
    case Int8Array:
      return Math.max(i / 127, -1);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
function Ct(i, e) {
  switch (e.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return Math.round(i * 4294967295);
    case Uint16Array:
      return Math.round(i * 65535);
    case Uint8Array:
    case Uint8ClampedArray:
      return Math.round(i * 255);
    case Int32Array:
      return Math.round(i * 2147483647);
    case Int16Array:
      return Math.round(i * 32767);
    case Int8Array:
      return Math.round(i * 127);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
const Kt = {
  DEG2RAD: Fi,
  RAD2DEG: Wi,
  /**
   * Generate a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)
   * (universally unique identifier).
   *
   * @static
   * @method
   * @return {string} The UUID.
   */
  generateUUID: xi,
  /**
   * Clamps the given value between min and max.
   *
   * @static
   * @method
   * @param {number} value - The value to clamp.
   * @param {number} min - The min value.
   * @param {number} max - The max value.
   * @return {number} The clamped value.
   */
  clamp: Be,
  /**
   * Computes the Euclidean modulo of the given parameters that
   * is `( ( n % m ) + m ) % m`.
   *
   * @static
   * @method
   * @param {number} n - The first parameter.
   * @param {number} m - The second parameter.
   * @return {number} The Euclidean modulo.
   */
  euclideanModulo: Ca,
  /**
   * Performs a linear mapping from range `<a1, a2>` to range `<b1, b2>`
   * for the given value.
   *
   * @static
   * @method
   * @param {number} x - The value to be mapped.
   * @param {number} a1 - Minimum value for range A.
   * @param {number} a2 - Maximum value for range A.
   * @param {number} b1 - Minimum value for range B.
   * @param {number} b2 - Maximum value for range B.
   * @return {number} The mapped value.
   */
  mapLinear: oh,
  /**
   * Returns the percentage in the closed interval `[0, 1]` of the given value
   * between the start and end point.
   *
   * @static
   * @method
   * @param {number} x - The start point
   * @param {number} y - The end point.
   * @param {number} value - A value between start and end.
   * @return {number} The interpolation factor.
   */
  inverseLerp: lh,
  /**
   * Returns a value linearly interpolated from two known points based on the given interval -
   * `t = 0` will return `x` and `t = 1` will return `y`.
   *
   * @static
   * @method
   * @param {number} x - The start point
   * @param {number} y - The end point.
   * @param {number} t - The interpolation factor in the closed interval `[0, 1]`.
   * @return {number} The interpolated value.
   */
  lerp: Oi,
  /**
   * Smoothly interpolate a number from `x` to `y` in  a spring-like manner using a delta
   * time to maintain frame rate independent movement. For details, see
   * [Frame rate independent damping using lerp](http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/).
   *
   * @static
   * @method
   * @param {number} x - The current point.
   * @param {number} y - The target point.
   * @param {number} lambda - A higher lambda value will make the movement more sudden,
   * and a lower value will make the movement more gradual.
   * @param {number} dt - Delta time in seconds.
   * @return {number} The interpolated value.
   */
  damp: ch,
  /**
   * Returns a value that alternates between `0` and the given `length` parameter.
   *
   * @static
   * @method
   * @param {number} x - The value to pingpong.
   * @param {number} [length=1] - The positive value the function will pingpong to.
   * @return {number} The alternated value.
   */
  pingpong: hh,
  /**
   * Returns a value in the range `[0,1]` that represents the percentage that `x` has
   * moved between `min` and `max`, but smoothed or slowed down the closer `x` is to
   * the `min` and `max`.
   *
   * See [Smoothstep](http://en.wikipedia.org/wiki/Smoothstep) for more details.
   *
   * @static
   * @method
   * @param {number} x - The value to evaluate based on its position between min and max.
   * @param {number} min - The min value. Any x value below min will be `0`.
   * @param {number} max - The max value. Any x value above max will be `1`.
   * @return {number} The alternated value.
   */
  smoothstep: uh,
  /**
   * A [variation on smoothstep](https://en.wikipedia.org/wiki/Smoothstep#Variations)
   * that has zero 1st and 2nd order derivatives at x=0 and x=1.
   *
   * @static
   * @method
   * @param {number} x - The value to evaluate based on its position between min and max.
   * @param {number} min - The min value. Any x value below min will be `0`.
   * @param {number} max - The max value. Any x value above max will be `1`.
   * @return {number} The alternated value.
   */
  smootherstep: dh,
  /**
   * Returns a random integer from `<low, high>` interval.
   *
   * @static
   * @method
   * @param {number} low - The lower value boundary.
   * @param {number} high - The upper value boundary
   * @return {number} A random integer.
   */
  randInt: fh,
  /**
   * Returns a random float from `<low, high>` interval.
   *
   * @static
   * @method
   * @param {number} low - The lower value boundary.
   * @param {number} high - The upper value boundary
   * @return {number} A random float.
   */
  randFloat: ph,
  /**
   * Returns a random integer from `<-range/2, range/2>` interval.
   *
   * @static
   * @method
   * @param {number} range - Defines the value range.
   * @return {number} A random float.
   */
  randFloatSpread: mh,
  /**
   * Returns a deterministic pseudo-random float in the interval `[0, 1]`.
   *
   * @static
   * @method
   * @param {number} [s] - The integer seed.
   * @return {number} A random float.
   */
  seededRandom: gh,
  /**
   * Converts degrees to radians.
   *
   * @static
   * @method
   * @param {number} degrees - A value in degrees.
   * @return {number} The converted value in radians.
   */
  degToRad: _h,
  /**
   * Converts radians to degrees.
   *
   * @static
   * @method
   * @param {number} radians - A value in radians.
   * @return {number} The converted value in degrees.
   */
  radToDeg: vh,
  /**
   * Returns `true` if the given number is a power of two.
   *
   * @static
   * @method
   * @param {number} value - The value to check.
   * @return {boolean} Whether the given number is a power of two or not.
   */
  isPowerOfTwo: xh,
  /**
   * Returns the smallest power of two that is greater than or equal to the given number.
   *
   * @static
   * @method
   * @param {number} value - The value to find a POT for.
   * @return {number} The smallest power of two that is greater than or equal to the given number.
   */
  ceilPowerOfTwo: Mh,
  /**
   * Returns the largest power of two that is less than or equal to the given number.
   *
   * @static
   * @method
   * @param {number} value - The value to find a POT for.
   * @return {number} The largest power of two that is less than or equal to the given number.
   */
  floorPowerOfTwo: Sh,
  /**
   * Sets the given quaternion from the [Intrinsic Proper Euler Angles](https://en.wikipedia.org/wiki/Euler_angles)
   * defined by the given angles and order.
   *
   * Rotations are applied to the axes in the order specified by order:
   * rotation by angle `a` is applied first, then by angle `b`, then by angle `c`.
   *
   * @static
   * @method
   * @param {Quaternion} q - The quaternion to set.
   * @param {number} a - The rotation applied to the first axis, in radians.
   * @param {number} b - The rotation applied to the second axis, in radians.
   * @param {number} c - The rotation applied to the third axis, in radians.
   * @param {('XYX'|'XZX'|'YXY'|'YZY'|'ZXZ'|'ZYZ')} order - A string specifying the axes order.
   */
  setQuaternionFromProperEuler: bh,
  /**
   * Normalizes the given value according to the given typed array.
   *
   * @static
   * @method
   * @param {number} value - The float value in the range `[0,1]` to normalize.
   * @param {TypedArray} array - The typed array that defines the data type of the value.
   * @return {number} The normalize value.
   */
  normalize: Ct,
  /**
   * Denormalizes the given value according to the given typed array.
   *
   * @static
   * @method
   * @param {number} value - The value to denormalize.
   * @param {TypedArray} array - The typed array that defines the data type of the value.
   * @return {number} The denormalize (float) value in the range `[0,1]`.
   */
  denormalize: ui
}, Va = class Va {
  /**
   * Constructs a new 2D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   */
  constructor(e = 0, t = 0) {
    this.x = e, this.y = t;
  }
  /**
   * Alias for {@link Vector2#x}.
   *
   * @type {number}
   */
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  /**
   * Alias for {@link Vector2#y}.
   *
   * @type {number}
   */
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @return {Vector2} A reference to this vector.
   */
  set(e, t) {
    return this.x = e, this.y = t, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector2} A reference to this vector.
   */
  setScalar(e) {
    return this.x = e, this.y = e, this;
  }
  /**
   * Sets the vector's x component to the given value
   *
   * @param {number} x - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setX(e) {
    return this.x = e, this;
  }
  /**
   * Sets the vector's y component to the given value
   *
   * @param {number} y - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setY(e) {
    return this.y = e, this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y.
   * @param {number} value - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + e);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y.
   * @return {number} A vector component value.
   */
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + e);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector2} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector2} v - The vector to copy.
   * @return {Vector2} A reference to this vector.
   */
  copy(e) {
    return this.x = e.x, this.y = e.y, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector2} v - The vector to add.
   * @return {Vector2} A reference to this vector.
   */
  add(e) {
    return this.x += e.x, this.y += e.y, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector2} A reference to this vector.
   */
  addScalar(e) {
    return this.x += e, this.y += e, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector2} a - The first vector.
   * @param {Vector2} b - The second vector.
   * @return {Vector2} A reference to this vector.
   */
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector2} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector2} A reference to this vector.
   */
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector2} v - The vector to subtract.
   * @return {Vector2} A reference to this vector.
   */
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector2} A reference to this vector.
   */
  subScalar(e) {
    return this.x -= e, this.y -= e, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector2} a - The first vector.
   * @param {Vector2} b - The second vector.
   * @return {Vector2} A reference to this vector.
   */
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector2} v - The vector to multiply.
   * @return {Vector2} A reference to this vector.
   */
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector2} A reference to this vector.
   */
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this;
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector2} v - The vector to divide.
   * @return {Vector2} A reference to this vector.
   */
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector2} A reference to this vector.
   */
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  /**
   * Multiplies this vector (with an implicit 1 as the 3rd component) by
   * the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to apply.
   * @return {Vector2} A reference to this vector.
   */
  applyMatrix3(e) {
    const t = this.x, n = this.y, r = e.elements;
    return this.x = r[0] * t + r[3] * n + r[6], this.y = r[1] * t + r[4] * n + r[7], this;
  }
  /**
   * If this vector's x or y value is greater than the given vector's x or y
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector2} v - The vector.
   * @return {Vector2} A reference to this vector.
   */
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
  }
  /**
   * If this vector's x or y value is less than the given vector's x or y
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector2} v - The vector.
   * @return {Vector2} A reference to this vector.
   */
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
  }
  /**
   * If this vector's x or y value is greater than the max vector's x or y
   * value, it is replaced by the corresponding value.
   * If this vector's x or y value is less than the min vector's x or y value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector2} min - The minimum x and y values.
   * @param {Vector2} max - The maximum x and y values in the desired range.
   * @return {Vector2} A reference to this vector.
   */
  clamp(e, t) {
    return this.x = Be(this.x, e.x, t.x), this.y = Be(this.y, e.y, t.y), this;
  }
  /**
   * If this vector's x or y values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x or y values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector2} A reference to this vector.
   */
  clampScalar(e, t) {
    return this.x = Be(this.x, e, t), this.y = Be(this.y, e, t), this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector2} A reference to this vector.
   */
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Be(n, e, t));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector2} A reference to this vector.
   */
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x and y = -y.
   *
   * @return {Vector2} A reference to this vector.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector2} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  /**
   * Calculates the cross product of the given vector with this instance.
   *
   * @param {Vector2} v - The vector to compute the cross product with.
   * @return {number} The result of the cross product.
   */
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0) to (x, y). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0) to (x, y).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector2} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Computes the angle in radians of this vector with respect to the positive x-axis.
   *
   * @return {number} The angle in radians.
   */
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  /**
   * Returns the angle between the given vector and this instance in radians.
   *
   * @param {Vector2} v - The vector to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(Be(n, -1, 1));
  }
  /**
   * Computes the distance from the given vector to this instance.
   *
   * @param {Vector2} v - The vector to compute the distance to.
   * @return {number} The distance.
   */
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  /**
   * Computes the squared distance from the given vector to this instance.
   * If you are just comparing the distance with another distance, you should compare
   * the distance squared instead as it is slightly more efficient to calculate.
   *
   * @param {Vector2} v - The vector to compute the squared distance to.
   * @return {number} The squared distance.
   */
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y;
    return t * t + n * n;
  }
  /**
   * Computes the Manhattan distance from the given vector to this instance.
   *
   * @param {Vector2} v - The vector to compute the Manhattan distance to.
   * @return {number} The Manhattan distance.
   */
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector2} A reference to this vector.
   */
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector2} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector2} A reference to this vector.
   */
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector2} v1 - The first vector.
   * @param {Vector2} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector2} A reference to this vector.
   */
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector2} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]` and y
   * value to be `array[ offset + 1 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector2} A reference to this vector.
   */
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector2} A reference to this vector.
   */
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this;
  }
  /**
   * Rotates this vector around the given center by the given angle.
   *
   * @param {Vector2} center - The point around which to rotate.
   * @param {number} angle - The angle to rotate, in radians.
   * @return {Vector2} A reference to this vector.
   */
  rotateAround(e, t) {
    const n = Math.cos(t), r = Math.sin(t), s = this.x - e.x, a = this.y - e.y;
    return this.x = s * n - a * r + e.x, this.y = s * r + a * n + e.y, this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector2} A reference to this vector.
   */
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
};
Va.prototype.isVector2 = !0;
let Ne = Va;
class Mi {
  /**
   * Constructs a new quaternion.
   *
   * @param {number} [x=0] - The x value of this quaternion.
   * @param {number} [y=0] - The y value of this quaternion.
   * @param {number} [z=0] - The z value of this quaternion.
   * @param {number} [w=1] - The w value of this quaternion.
   */
  constructor(e = 0, t = 0, n = 0, r = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = r;
  }
  /**
   * Interpolates between two quaternions via SLERP. This implementation assumes the
   * quaternion data are managed in flat arrays.
   *
   * @param {Array<number>} dst - The destination array.
   * @param {number} dstOffset - An offset into the destination array.
   * @param {Array<number>} src0 - The source array of the first quaternion.
   * @param {number} srcOffset0 - An offset into the first source array.
   * @param {Array<number>} src1 -  The source array of the second quaternion.
   * @param {number} srcOffset1 - An offset into the second source array.
   * @param {number} t - The interpolation factor. A value in the range `[0,1]` will interpolate. A value outside the range `[0,1]` will extrapolate.
   * @see {@link Quaternion#slerp}
   */
  static slerpFlat(e, t, n, r, s, a, o) {
    let c = n[r + 0], l = n[r + 1], h = n[r + 2], d = n[r + 3], u = s[a + 0], p = s[a + 1], _ = s[a + 2], M = s[a + 3];
    if (d !== M || c !== u || l !== p || h !== _) {
      let m = c * u + l * p + h * _ + d * M;
      m < 0 && (u = -u, p = -p, _ = -_, M = -M, m = -m);
      let f = 1 - o;
      if (m < 0.9995) {
        const y = Math.acos(m), R = Math.sin(y);
        f = Math.sin(f * y) / R, o = Math.sin(o * y) / R, c = c * f + u * o, l = l * f + p * o, h = h * f + _ * o, d = d * f + M * o;
      } else {
        c = c * f + u * o, l = l * f + p * o, h = h * f + _ * o, d = d * f + M * o;
        const y = 1 / Math.sqrt(c * c + l * l + h * h + d * d);
        c *= y, l *= y, h *= y, d *= y;
      }
    }
    e[t] = c, e[t + 1] = l, e[t + 2] = h, e[t + 3] = d;
  }
  /**
   * Multiplies two quaternions. This implementation assumes the quaternion data are managed
   * in flat arrays.
   *
   * @param {Array<number>} dst - The destination array.
   * @param {number} dstOffset - An offset into the destination array.
   * @param {Array<number>} src0 - The source array of the first quaternion.
   * @param {number} srcOffset0 - An offset into the first source array.
   * @param {Array<number>} src1 -  The source array of the second quaternion.
   * @param {number} srcOffset1 - An offset into the second source array.
   * @return {Array<number>} The destination array.
   * @see {@link Quaternion#multiplyQuaternions}.
   */
  static multiplyQuaternionsFlat(e, t, n, r, s, a) {
    const o = n[r], c = n[r + 1], l = n[r + 2], h = n[r + 3], d = s[a], u = s[a + 1], p = s[a + 2], _ = s[a + 3];
    return e[t] = o * _ + h * d + c * p - l * u, e[t + 1] = c * _ + h * u + l * d - o * p, e[t + 2] = l * _ + h * p + o * u - c * d, e[t + 3] = h * _ - o * d - c * u - l * p, e;
  }
  /**
   * The x value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  /**
   * The y value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  /**
   * The z value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  /**
   * The w value of this quaternion.
   *
   * @type {number}
   * @default 1
   */
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  /**
   * Sets the quaternion components.
   *
   * @param {number} x - The x value of this quaternion.
   * @param {number} y - The y value of this quaternion.
   * @param {number} z - The z value of this quaternion.
   * @param {number} w - The w value of this quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  set(e, t, n, r) {
    return this._x = e, this._y = t, this._z = n, this._w = r, this._onChangeCallback(), this;
  }
  /**
   * Returns a new quaternion with copied values from this instance.
   *
   * @return {Quaternion} A clone of this instance.
   */
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  /**
   * Copies the values of the given quaternion to this instance.
   *
   * @param {Quaternion} quaternion - The quaternion to copy.
   * @return {Quaternion} A reference to this quaternion.
   */
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion from the rotation specified by the given
   * Euler angles.
   *
   * @param {Euler} euler - The Euler angles.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromEuler(e, t = !0) {
    const n = e._x, r = e._y, s = e._z, a = e._order, o = Math.cos, c = Math.sin, l = o(n / 2), h = o(r / 2), d = o(s / 2), u = c(n / 2), p = c(r / 2), _ = c(s / 2);
    switch (a) {
      case "XYZ":
        this._x = u * h * d + l * p * _, this._y = l * p * d - u * h * _, this._z = l * h * _ + u * p * d, this._w = l * h * d - u * p * _;
        break;
      case "YXZ":
        this._x = u * h * d + l * p * _, this._y = l * p * d - u * h * _, this._z = l * h * _ - u * p * d, this._w = l * h * d + u * p * _;
        break;
      case "ZXY":
        this._x = u * h * d - l * p * _, this._y = l * p * d + u * h * _, this._z = l * h * _ + u * p * d, this._w = l * h * d - u * p * _;
        break;
      case "ZYX":
        this._x = u * h * d - l * p * _, this._y = l * p * d + u * h * _, this._z = l * h * _ - u * p * d, this._w = l * h * d + u * p * _;
        break;
      case "YZX":
        this._x = u * h * d + l * p * _, this._y = l * p * d + u * h * _, this._z = l * h * _ - u * p * d, this._w = l * h * d - u * p * _;
        break;
      case "XZY":
        this._x = u * h * d - l * p * _, this._y = l * p * d - u * h * _, this._z = l * h * _ + u * p * d, this._w = l * h * d + u * p * _;
        break;
      default:
        Re("Quaternion: .setFromEuler() encountered an unknown order: " + a);
    }
    return t === !0 && this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion from the given axis and angle.
   *
   * @param {Vector3} axis - The normalized axis.
   * @param {number} angle - The angle in radians.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromAxisAngle(e, t) {
    const n = t / 2, r = Math.sin(n);
    return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion from the given rotation matrix.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromRotationMatrix(e) {
    const t = e.elements, n = t[0], r = t[4], s = t[8], a = t[1], o = t[5], c = t[9], l = t[2], h = t[6], d = t[10], u = n + o + d;
    if (u > 0) {
      const p = 0.5 / Math.sqrt(u + 1);
      this._w = 0.25 / p, this._x = (h - c) * p, this._y = (s - l) * p, this._z = (a - r) * p;
    } else if (n > o && n > d) {
      const p = 2 * Math.sqrt(1 + n - o - d);
      this._w = (h - c) / p, this._x = 0.25 * p, this._y = (r + a) / p, this._z = (s + l) / p;
    } else if (o > d) {
      const p = 2 * Math.sqrt(1 + o - n - d);
      this._w = (s - l) / p, this._x = (r + a) / p, this._y = 0.25 * p, this._z = (c + h) / p;
    } else {
      const p = 2 * Math.sqrt(1 + d - n - o);
      this._w = (a - r) / p, this._x = (s + l) / p, this._y = (c + h) / p, this._z = 0.25 * p;
    }
    return this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion to the rotation required to rotate the direction vector
   * `vFrom` to the direction vector `vTo`.
   *
   * @param {Vector3} vFrom - The first (normalized) direction vector.
   * @param {Vector3} vTo - The second (normalized) direction vector.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromUnitVectors(e, t) {
    let n = e.dot(t) + 1;
    return n < 1e-8 ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
  }
  /**
   * Returns the angle between this quaternion and the given one in radians.
   *
   * @param {Quaternion} q - The quaternion to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(e) {
    return 2 * Math.acos(Math.abs(Be(this.dot(e), -1, 1)));
  }
  /**
   * Rotates this quaternion by a given angular step to the given quaternion.
   * The method ensures that the final quaternion will not overshoot `q`.
   *
   * @param {Quaternion} q - The target quaternion.
   * @param {number} step - The angular step in radians.
   * @return {Quaternion} A reference to this quaternion.
   */
  rotateTowards(e, t) {
    const n = this.angleTo(e);
    if (n === 0) return this;
    const r = Math.min(1, t / n);
    return this.slerp(e, r), this;
  }
  /**
   * Sets this quaternion to the identity quaternion; that is, to the
   * quaternion that represents "no rotation".
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  identity() {
    return this.set(0, 0, 0, 1);
  }
  /**
   * Inverts this quaternion via {@link Quaternion#conjugate}. The
   * quaternion is assumed to have unit length.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  invert() {
    return this.conjugate();
  }
  /**
   * Returns the rotational conjugate of this quaternion. The conjugate of a
   * quaternion represents the same rotation in the opposite direction about
   * the rotational axis.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  /**
   * Calculates the dot product of this quaternion and the given one.
   *
   * @param {Quaternion} v - The quaternion to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  /**
   * Computes the squared Euclidean length (straight-line length) of this quaternion,
   * considered as a 4 dimensional vector. This can be useful if you are comparing the
   * lengths of two quaternions, as this is a slightly more efficient calculation than
   * {@link Quaternion#length}.
   *
   * @return {number} The squared Euclidean length.
   */
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  /**
   * Computes the Euclidean length (straight-line length) of this quaternion,
   * considered as a 4 dimensional vector.
   *
   * @return {number} The Euclidean length.
   */
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  /**
   * Normalizes this quaternion - that is, calculated the quaternion that performs
   * the same rotation as this one, but has a length equal to `1`.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  /**
   * Multiplies this quaternion by the given one.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  /**
   * Pre-multiplies this quaternion by the given one.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  /**
   * Multiplies the given quaternions and stores the result in this instance.
   *
   * @param {Quaternion} a - The first quaternion.
   * @param {Quaternion} b - The second quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  multiplyQuaternions(e, t) {
    const n = e._x, r = e._y, s = e._z, a = e._w, o = t._x, c = t._y, l = t._z, h = t._w;
    return this._x = n * h + a * o + r * l - s * c, this._y = r * h + a * c + s * o - n * l, this._z = s * h + a * l + n * c - r * o, this._w = a * h - n * o - r * c - s * l, this._onChangeCallback(), this;
  }
  /**
   * Performs a spherical linear interpolation between this quaternion and the target quaternion.
   *
   * @param {Quaternion} qb - The target quaternion.
   * @param {number} t - The interpolation factor. A value in the range `[0,1]` will interpolate. A value outside the range `[0,1]` will extrapolate.
   * @return {Quaternion} A reference to this quaternion.
   */
  slerp(e, t) {
    let n = e._x, r = e._y, s = e._z, a = e._w, o = this.dot(e);
    o < 0 && (n = -n, r = -r, s = -s, a = -a, o = -o);
    let c = 1 - t;
    if (o < 0.9995) {
      const l = Math.acos(o), h = Math.sin(l);
      c = Math.sin(c * l) / h, t = Math.sin(t * l) / h, this._x = this._x * c + n * t, this._y = this._y * c + r * t, this._z = this._z * c + s * t, this._w = this._w * c + a * t, this._onChangeCallback();
    } else
      this._x = this._x * c + n * t, this._y = this._y * c + r * t, this._z = this._z * c + s * t, this._w = this._w * c + a * t, this.normalize();
    return this;
  }
  /**
   * Performs a spherical linear interpolation between the given quaternions
   * and stores the result in this quaternion.
   *
   * @param {Quaternion} qa - The source quaternion.
   * @param {Quaternion} qb - The target quaternion.
   * @param {number} t - The interpolation factor in the closed interval `[0, 1]`.
   * @return {Quaternion} A reference to this quaternion.
   */
  slerpQuaternions(e, t, n) {
    return this.copy(e).slerp(t, n);
  }
  /**
   * Sets this quaternion to a uniformly random, normalized quaternion.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  random() {
    const e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), r = Math.sqrt(1 - n), s = Math.sqrt(n);
    return this.set(
      r * Math.sin(e),
      r * Math.cos(e),
      s * Math.sin(t),
      s * Math.cos(t)
    );
  }
  /**
   * Returns `true` if this quaternion is equal with the given one.
   *
   * @param {Quaternion} quaternion - The quaternion to test for equality.
   * @return {boolean} Whether this quaternion is equal with the given one.
   */
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  /**
   * Sets this quaternion's components from the given array.
   *
   * @param {Array<number>} array - An array holding the quaternion component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Quaternion} A reference to this quaternion.
   */
  fromArray(e, t = 0) {
    return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
  }
  /**
   * Writes the components of this quaternion to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the quaternion components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The quaternion components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
  }
  /**
   * Sets the components of this quaternion from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding quaternion data.
   * @param {number} index - The index into the attribute.
   * @return {Quaternion} A reference to this quaternion.
   */
  fromBufferAttribute(e, t) {
    return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
  }
  /**
   * This methods defines the serialization result of this class. Returns the
   * numerical elements of this quaternion in an array of format `[x, y, z, w]`.
   *
   * @return {Array<number>} The serialized quaternion.
   */
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
const Ha = class Ha {
  /**
   * Constructs a new 3D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   * @param {number} [z=0] - The z value of this vector.
   */
  constructor(e = 0, t = 0, n = 0) {
    this.x = e, this.y = t, this.z = n;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @param {number} z - The value of the z component.
   * @return {Vector3} A reference to this vector.
   */
  set(e, t, n) {
    return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector3} A reference to this vector.
   */
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this;
  }
  /**
   * Sets the vector's x component to the given value.
   *
   * @param {number} x - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setX(e) {
    return this.x = e, this;
  }
  /**
   * Sets the vector's y component to the given value.
   *
   * @param {number} y - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setY(e) {
    return this.y = e, this;
  }
  /**
   * Sets the vector's z component to the given value.
   *
   * @param {number} z - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setZ(e) {
    return this.z = e, this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.
   * @param {number} value - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + e);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.
   * @return {number} A vector component value.
   */
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + e);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector3} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector3} v - The vector to copy.
   * @return {Vector3} A reference to this vector.
   */
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector3} v - The vector to add.
   * @return {Vector3} A reference to this vector.
   */
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector3} A reference to this vector.
   */
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector3|Vector4} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector3} A reference to this vector.
   */
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector3} v - The vector to subtract.
   * @return {Vector3} A reference to this vector.
   */
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector3} A reference to this vector.
   */
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector3} v - The vector to multiply.
   * @return {Vector3} A reference to this vector.
   */
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector3} A reference to this vector.
   */
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this;
  }
  /**
   * Multiplies the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  multiplyVectors(e, t) {
    return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
  }
  /**
   * Applies the given Euler rotation to this vector.
   *
   * @param {Euler} euler - The Euler angles.
   * @return {Vector3} A reference to this vector.
   */
  applyEuler(e) {
    return this.applyQuaternion(ho.setFromEuler(e));
  }
  /**
   * Applies a rotation specified by an axis and an angle to this vector.
   *
   * @param {Vector3} axis - A normalized vector representing the rotation axis.
   * @param {number} angle - The angle in radians.
   * @return {Vector3} A reference to this vector.
   */
  applyAxisAngle(e, t) {
    return this.applyQuaternion(ho.setFromAxisAngle(e, t));
  }
  /**
   * Multiplies this vector with the given 3x3 matrix.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @return {Vector3} A reference to this vector.
   */
  applyMatrix3(e) {
    const t = this.x, n = this.y, r = this.z, s = e.elements;
    return this.x = s[0] * t + s[3] * n + s[6] * r, this.y = s[1] * t + s[4] * n + s[7] * r, this.z = s[2] * t + s[5] * n + s[8] * r, this;
  }
  /**
   * Multiplies this vector by the given normal matrix and normalizes
   * the result.
   *
   * @param {Matrix3} m - The normal matrix.
   * @return {Vector3} A reference to this vector.
   */
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  /**
   * Multiplies this vector (with an implicit 1 in the 4th dimension) by m, and
   * divides by perspective.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {Vector3} A reference to this vector.
   */
  applyMatrix4(e) {
    const t = this.x, n = this.y, r = this.z, s = e.elements, a = 1 / (s[3] * t + s[7] * n + s[11] * r + s[15]);
    return this.x = (s[0] * t + s[4] * n + s[8] * r + s[12]) * a, this.y = (s[1] * t + s[5] * n + s[9] * r + s[13]) * a, this.z = (s[2] * t + s[6] * n + s[10] * r + s[14]) * a, this;
  }
  /**
   * Applies the given Quaternion to this vector.
   *
   * @param {Quaternion} q - The Quaternion.
   * @return {Vector3} A reference to this vector.
   */
  applyQuaternion(e) {
    const t = this.x, n = this.y, r = this.z, s = e.x, a = e.y, o = e.z, c = e.w, l = 2 * (a * r - o * n), h = 2 * (o * t - s * r), d = 2 * (s * n - a * t);
    return this.x = t + c * l + a * d - o * h, this.y = n + c * h + o * l - s * d, this.z = r + c * d + s * h - a * l, this;
  }
  /**
   * Projects this vector from world space into the camera's normalized
   * device coordinate (NDC) space.
   *
   * @param {Camera} camera - The camera.
   * @return {Vector3} A reference to this vector.
   */
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  /**
   * Unprojects this vector from the camera's normalized device coordinate (NDC)
   * space into world space.
   *
   * @param {Camera} camera - The camera.
   * @return {Vector3} A reference to this vector.
   */
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  /**
   * Transforms this vector by the upper left 3x3 sub-matrix of the given 4x4 matrix,
   * and normalizes the result.
   *
   * @param {Matrix4} m - The matrix.
   * @return {Vector3} A reference to this vector.
   */
  transformDirection(e) {
    const t = this.x, n = this.y, r = this.z, s = e.elements;
    return this.x = s[0] * t + s[4] * n + s[8] * r, this.y = s[1] * t + s[5] * n + s[9] * r, this.z = s[2] * t + s[6] * n + s[10] * r, this.normalize();
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector3} v - The vector to divide.
   * @return {Vector3} A reference to this vector.
   */
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector3} A reference to this vector.
   */
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  /**
   * If this vector's x, y or z value is greater than the given vector's x, y or z
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector3} v - The vector.
   * @return {Vector3} A reference to this vector.
   */
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
  }
  /**
   * If this vector's x, y or z value is less than the given vector's x, y or z
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector3} v - The vector.
   * @return {Vector3} A reference to this vector.
   */
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
  }
  /**
   * If this vector's x, y or z value is greater than the max vector's x, y or z
   * value, it is replaced by the corresponding value.
   * If this vector's x, y or z value is less than the min vector's x, y or z value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector3} min - The minimum x, y and z values.
   * @param {Vector3} max - The maximum x, y and z values in the desired range.
   * @return {Vector3} A reference to this vector.
   */
  clamp(e, t) {
    return this.x = Be(this.x, e.x, t.x), this.y = Be(this.y, e.y, t.y), this.z = Be(this.z, e.z, t.z), this;
  }
  /**
   * If this vector's x, y or z values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x, y or z values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector3} A reference to this vector.
   */
  clampScalar(e, t) {
    return this.x = Be(this.x, e, t), this.y = Be(this.y, e, t), this.z = Be(this.z, e, t), this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector3} A reference to this vector.
   */
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Be(n, e, t));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector3} A reference to this vector.
   */
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x, y = -y and z = -z.
   *
   * @return {Vector3} A reference to this vector.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector3} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0, 0) to (x, y, z). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector3} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector3} A reference to this vector.
   */
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector3} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector3} A reference to this vector.
   */
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector3} v1 - The first vector.
   * @param {Vector3} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector3} A reference to this vector.
   */
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this;
  }
  /**
   * Calculates the cross product of the given vector with this instance.
   *
   * @param {Vector3} v - The vector to compute the cross product with.
   * @return {Vector3} The result of the cross product.
   */
  cross(e) {
    return this.crossVectors(this, e);
  }
  /**
   * Calculates the cross product of the given vectors and stores the result
   * in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  crossVectors(e, t) {
    const n = e.x, r = e.y, s = e.z, a = t.x, o = t.y, c = t.z;
    return this.x = r * c - s * o, this.y = s * a - n * c, this.z = n * o - r * a, this;
  }
  /**
   * Projects this vector onto the given one.
   *
   * @param {Vector3} v - The vector to project to.
   * @return {Vector3} A reference to this vector.
   */
  projectOnVector(e) {
    const t = e.lengthSq();
    if (t === 0) return this.set(0, 0, 0);
    const n = e.dot(this) / t;
    return this.copy(e).multiplyScalar(n);
  }
  /**
   * Projects this vector onto a plane by subtracting this
   * vector projected onto the plane's normal from this vector.
   *
   * @param {Vector3} planeNormal - The plane normal.
   * @return {Vector3} A reference to this vector.
   */
  projectOnPlane(e) {
    return es.copy(this).projectOnVector(e), this.sub(es);
  }
  /**
   * Reflects this vector off a plane orthogonal to the given normal vector.
   *
   * @param {Vector3} normal - The (normalized) normal vector.
   * @return {Vector3} A reference to this vector.
   */
  reflect(e) {
    return this.sub(es.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  /**
   * Returns the angle between the given vector and this instance in radians.
   *
   * @param {Vector3} v - The vector to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(Be(n, -1, 1));
  }
  /**
   * Computes the distance from the given vector to this instance.
   *
   * @param {Vector3} v - The vector to compute the distance to.
   * @return {number} The distance.
   */
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  /**
   * Computes the squared distance from the given vector to this instance.
   * If you are just comparing the distance with another distance, you should compare
   * the distance squared instead as it is slightly more efficient to calculate.
   *
   * @param {Vector3} v - The vector to compute the squared distance to.
   * @return {number} The squared distance.
   */
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y, r = this.z - e.z;
    return t * t + n * n + r * r;
  }
  /**
   * Computes the Manhattan distance from the given vector to this instance.
   *
   * @param {Vector3} v - The vector to compute the Manhattan distance to.
   * @return {number} The Manhattan distance.
   */
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  /**
   * Sets the vector components from the given spherical coordinates.
   *
   * @param {Spherical} s - The spherical coordinates.
   * @return {Vector3} A reference to this vector.
   */
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  /**
   * Sets the vector components from the given spherical coordinates.
   *
   * @param {number} radius - The radius.
   * @param {number} phi - The phi angle in radians.
   * @param {number} theta - The theta angle in radians.
   * @return {Vector3} A reference to this vector.
   */
  setFromSphericalCoords(e, t, n) {
    const r = Math.sin(t) * e;
    return this.x = r * Math.sin(n), this.y = Math.cos(t) * e, this.z = r * Math.cos(n), this;
  }
  /**
   * Sets the vector components from the given cylindrical coordinates.
   *
   * @param {Cylindrical} c - The cylindrical coordinates.
   * @return {Vector3} A reference to this vector.
   */
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  /**
   * Sets the vector components from the given cylindrical coordinates.
   *
   * @param {number} radius - The radius.
   * @param {number} theta - The theta angle in radians.
   * @param {number} y - The y value.
   * @return {Vector3} A reference to this vector.
   */
  setFromCylindricalCoords(e, t, n) {
    return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this;
  }
  /**
   * Sets the vector components to the position elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this;
  }
  /**
   * Sets the vector components to the scale elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixScale(e) {
    const t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), r = this.setFromMatrixColumn(e, 2).length();
    return this.x = t, this.y = n, this.z = r, this;
  }
  /**
   * Sets the vector components from the specified matrix column.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @param {number} index - The column index.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, t * 4);
  }
  /**
   * Sets the vector components from the specified matrix column.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @param {number} index - The column index.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, t * 3);
  }
  /**
   * Sets the vector components from the given Euler angles.
   *
   * @param {Euler} e - The Euler angles to set.
   * @return {Vector3} A reference to this vector.
   */
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  /**
   * Sets the vector components from the RGB components of the
   * given color.
   *
   * @param {Color} c - The color to set.
   * @return {Vector3} A reference to this vector.
   */
  setFromColor(e) {
    return this.x = e.r, this.y = e.g, this.z = e.b, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector3} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`
   * and z value to be `array[ offset + 2 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector3} A reference to this vector.
   */
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector3} A reference to this vector.
   */
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector3} A reference to this vector.
   */
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  /**
   * Sets this vector to a uniformly random point on a unit sphere.
   *
   * @return {Vector3} A reference to this vector.
   */
  randomDirection() {
    const e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, n = Math.sqrt(1 - t * t);
    return this.x = n * Math.cos(e), this.y = t, this.z = n * Math.sin(e), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
};
Ha.prototype.isVector3 = !0;
let U = Ha;
const es = /* @__PURE__ */ new U(), ho = /* @__PURE__ */ new Mi(), ka = class ka {
  /**
   * Constructs a new 3x3 matrix. The arguments are supposed to be
   * in row-major order. If no arguments are provided, the constructor
   * initializes the matrix as an identity matrix.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   */
  constructor(e, t, n, r, s, a, o, c, l) {
    this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, r, s, a, o, c, l);
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @return {Matrix3} A reference to this matrix.
   */
  set(e, t, n, r, s, a, o, c, l) {
    const h = this.elements;
    return h[0] = e, h[1] = r, h[2] = o, h[3] = t, h[4] = s, h[5] = c, h[6] = n, h[7] = a, h[8] = l, this;
  }
  /**
   * Sets this matrix to the 3x3 identity matrix.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Copies the values of the given matrix to this instance.
   *
   * @param {Matrix3} m - The matrix to copy.
   * @return {Matrix3} A reference to this matrix.
   */
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this;
  }
  /**
   * Extracts the basis of this matrix into the three axis vectors provided.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix3} A reference to this matrix.
   */
  extractBasis(e, t, n) {
    return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  /**
   * Set this matrix to the upper 3x3 matrix of the given 4x4 matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  setFromMatrix4(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[4],
      t[8],
      t[1],
      t[5],
      t[9],
      t[2],
      t[6],
      t[10]
    ), this;
  }
  /**
   * Post-multiplies this matrix by the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to multiply with.
   * @return {Matrix3} A reference to this matrix.
   */
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  /**
   * Pre-multiplies this matrix by the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to multiply with.
   * @return {Matrix3} A reference to this matrix.
   */
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  /**
   * Multiples the given 3x3 matrices and stores the result
   * in this matrix.
   *
   * @param {Matrix3} a - The first matrix.
   * @param {Matrix3} b - The second matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  multiplyMatrices(e, t) {
    const n = e.elements, r = t.elements, s = this.elements, a = n[0], o = n[3], c = n[6], l = n[1], h = n[4], d = n[7], u = n[2], p = n[5], _ = n[8], M = r[0], m = r[3], f = r[6], y = r[1], R = r[4], S = r[7], T = r[2], b = r[5], A = r[8];
    return s[0] = a * M + o * y + c * T, s[3] = a * m + o * R + c * b, s[6] = a * f + o * S + c * A, s[1] = l * M + h * y + d * T, s[4] = l * m + h * R + d * b, s[7] = l * f + h * S + d * A, s[2] = u * M + p * y + _ * T, s[5] = u * m + p * R + _ * b, s[8] = u * f + p * S + _ * A, this;
  }
  /**
   * Multiplies every component of the matrix by the given scalar.
   *
   * @param {number} s - The scalar.
   * @return {Matrix3} A reference to this matrix.
   */
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
  }
  /**
   * Computes and returns the determinant of this matrix.
   *
   * @return {number} The determinant.
   */
  determinant() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], s = e[3], a = e[4], o = e[5], c = e[6], l = e[7], h = e[8];
    return t * a * h - t * o * l - n * s * h + n * o * c + r * s * l - r * a * c;
  }
  /**
   * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
   * You can not invert with a determinant of zero. If you attempt this, the method produces
   * a zero matrix instead.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  invert() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], s = e[3], a = e[4], o = e[5], c = e[6], l = e[7], h = e[8], d = h * a - o * l, u = o * c - h * s, p = l * s - a * c, _ = t * d + n * u + r * p;
    if (_ === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const M = 1 / _;
    return e[0] = d * M, e[1] = (r * l - h * n) * M, e[2] = (o * n - r * a) * M, e[3] = u * M, e[4] = (h * t - r * c) * M, e[5] = (r * s - o * t) * M, e[6] = p * M, e[7] = (n * c - l * t) * M, e[8] = (a * t - n * s) * M, this;
  }
  /**
   * Transposes this matrix in place.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  transpose() {
    let e;
    const t = this.elements;
    return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
  }
  /**
   * Computes the normal matrix which is the inverse transpose of the upper
   * left 3x3 portion of the given 4x4 matrix.
   *
   * @param {Matrix4} matrix4 - The 4x4 matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  /**
   * Transposes this matrix into the supplied array, and returns itself unchanged.
   *
   * @param {Array<number>} r - An array to store the transposed matrix elements.
   * @return {Matrix3} A reference to this matrix.
   */
  transposeIntoArray(e) {
    const t = this.elements;
    return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
  }
  /**
   * Sets the UV transform matrix from offset, repeat, rotation, and center.
   *
   * @param {number} tx - Offset x.
   * @param {number} ty - Offset y.
   * @param {number} sx - Repeat x.
   * @param {number} sy - Repeat y.
   * @param {number} rotation - Rotation, in radians. Positive values rotate counterclockwise.
   * @param {number} cx - Center x of rotation.
   * @param {number} cy - Center y of rotation
   * @return {Matrix3} A reference to this matrix.
   */
  setUvTransform(e, t, n, r, s, a, o) {
    const c = Math.cos(s), l = Math.sin(s);
    return this.set(
      n * c,
      n * l,
      -n * (c * a + l * o) + a + e,
      -r * l,
      r * c,
      -r * (-l * a + c * o) + o + t,
      0,
      0,
      1
    ), this;
  }
  /**
   * Scales this matrix with the given scalar values.
   *
   * @deprecated
   * @param {number} sx - The amount to scale in the X axis.
   * @param {number} sy - The amount to scale in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  scale(e, t) {
    return mi("Matrix3: .scale() is deprecated. Use .makeScale() instead."), this.premultiply(ts.makeScale(e, t)), this;
  }
  /**
   * Rotates this matrix by the given angle.
   *
   * @deprecated
   * @param {number} theta - The rotation in radians.
   * @return {Matrix3} A reference to this matrix.
   */
  rotate(e) {
    return mi("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."), this.premultiply(ts.makeRotation(-e)), this;
  }
  /**
   * Translates this matrix by the given scalar values.
   *
   * @deprecated
   * @param {number} tx - The amount to translate in the X axis.
   * @param {number} ty - The amount to translate in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  translate(e, t) {
    return mi("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."), this.premultiply(ts.makeTranslation(e, t)), this;
  }
  // for 2D Transforms
  /**
   * Sets this matrix as a 2D translation transform.
   *
   * @param {number|Vector2} x - The amount to translate in the X axis or alternatively a translation vector.
   * @param {number} y - The amount to translate in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  makeTranslation(e, t) {
    return e.isVector2 ? this.set(
      1,
      0,
      e.x,
      0,
      1,
      e.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      e,
      0,
      1,
      t,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a 2D rotational transformation.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix3} A reference to this matrix.
   */
  makeRotation(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      n,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a 2D scale transform.
   *
   * @param {number} x - The amount to scale in the X axis.
   * @param {number} y - The amount to scale in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  makeScale(e, t) {
    return this.set(
      e,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Returns `true` if this matrix is equal with the given one.
   *
   * @param {Matrix3} matrix - The matrix to test for equality.
   * @return {boolean} Whether this matrix is equal with the given one.
   */
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let r = 0; r < 9; r++)
      if (t[r] !== n[r]) return !1;
    return !0;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix3} A reference to this matrix.
   */
  fromArray(e, t = 0) {
    for (let n = 0; n < 9; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  /**
   * Writes the elements of this matrix to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The matrix elements in column-major order.
   */
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e;
  }
  /**
   * Returns a matrix with copied values from this instance.
   *
   * @return {Matrix3} A clone of this instance.
   */
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
};
ka.prototype.isMatrix3 = !0;
let Pe = ka;
const ts = /* @__PURE__ */ new Pe(), uo = /* @__PURE__ */ new Pe().set(
  0.4123908,
  0.3575843,
  0.1804808,
  0.212639,
  0.7151687,
  0.0721923,
  0.0193308,
  0.1191948,
  0.9505322
), fo = /* @__PURE__ */ new Pe().set(
  3.2409699,
  -1.5373832,
  -0.4986108,
  -0.9692436,
  1.8759675,
  0.0415551,
  0.0556301,
  -0.203977,
  1.0569715
);
function yh() {
  const i = {
    enabled: !0,
    workingColorSpace: Or,
    /**
     * Implementations of supported color spaces.
     *
     * Required:
     *	- primaries: chromaticity coordinates [ rx ry gx gy bx by ]
     *	- whitePoint: reference white [ x y ]
     *	- transfer: transfer function (pre-defined)
     *	- toXYZ: Matrix3 RGB to XYZ transform
     *	- fromXYZ: Matrix3 XYZ to RGB transform
     *	- luminanceCoefficients: RGB luminance coefficients
     *
     * Optional:
     *  - outputColorSpaceConfig: { drawingBufferColorSpace: ColorSpace, toneMappingMode: 'extended' | 'standard' }
     *  - workingColorSpaceConfig: { unpackColorSpace: ColorSpace }
     *
     * Reference:
     * - https://www.russellcottrell.com/photo/matrixCalculator.htm
     */
    spaces: {},
    convert: function(r, s, a) {
      return this.enabled === !1 || s === a || !s || !a || (this.spaces[s].transfer === Ze && (r.r = xn(r.r), r.g = xn(r.g), r.b = xn(r.b)), this.spaces[s].primaries !== this.spaces[a].primaries && (r.applyMatrix3(this.spaces[s].toXYZ), r.applyMatrix3(this.spaces[a].fromXYZ)), this.spaces[a].transfer === Ze && (r.r = gi(r.r), r.g = gi(r.g), r.b = gi(r.b))), r;
    },
    workingToColorSpace: function(r, s) {
      return this.convert(r, this.workingColorSpace, s);
    },
    colorSpaceToWorking: function(r, s) {
      return this.convert(r, s, this.workingColorSpace);
    },
    getPrimaries: function(r) {
      return this.spaces[r].primaries;
    },
    getTransfer: function(r) {
      return r === Dn ? Br : this.spaces[r].transfer;
    },
    getToneMappingMode: function(r) {
      return this.spaces[r].outputColorSpaceConfig.toneMappingMode || "standard";
    },
    getLuminanceCoefficients: function(r, s = this.workingColorSpace) {
      return r.fromArray(this.spaces[s].luminanceCoefficients);
    },
    define: function(r) {
      Object.assign(this.spaces, r);
    },
    // Internal APIs
    _getMatrix: function(r, s, a) {
      return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ);
    },
    _getDrawingBufferColorSpace: function(r) {
      return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace;
    },
    _getUnpackColorSpace: function(r = this.workingColorSpace) {
      return this.spaces[r].workingColorSpaceConfig.unpackColorSpace;
    },
    // Deprecated
    fromWorkingColorSpace: function(r, s) {
      return mi("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), i.workingToColorSpace(r, s);
    },
    toWorkingColorSpace: function(r, s) {
      return mi("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), i.colorSpaceToWorking(r, s);
    }
  }, e = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], t = [0.2126, 0.7152, 0.0722], n = [0.3127, 0.329];
  return i.define({
    [Or]: {
      primaries: e,
      whitePoint: n,
      transfer: Br,
      toXYZ: uo,
      fromXYZ: fo,
      luminanceCoefficients: t,
      workingColorSpaceConfig: { unpackColorSpace: Mt },
      outputColorSpaceConfig: { drawingBufferColorSpace: Mt }
    },
    [Mt]: {
      primaries: e,
      whitePoint: n,
      transfer: Ze,
      toXYZ: uo,
      fromXYZ: fo,
      luminanceCoefficients: t,
      outputColorSpaceConfig: { drawingBufferColorSpace: Mt }
    }
  }), i;
}
const Oe = /* @__PURE__ */ yh();
function xn(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function gi(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
let $n;
class Eh {
  /**
   * Returns a data URI containing a representation of the given image.
   *
   * @param {(HTMLImageElement|HTMLCanvasElement)} image - The image object.
   * @param {string} [type='image/png'] - Indicates the image format.
   * @return {string} The data URI.
   */
  static getDataURL(e, t = "image/png") {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u")
      return e.src;
    let n;
    if (e instanceof HTMLCanvasElement)
      n = e;
    else {
      $n === void 0 && ($n = Gi("canvas")), $n.width = e.width, $n.height = e.height;
      const r = $n.getContext("2d");
      e instanceof ImageData ? r.putImageData(e, 0, 0) : r.drawImage(e, 0, 0, e.width, e.height), n = $n;
    }
    return n.toDataURL(t);
  }
  /**
   * Converts the given sRGB image data to linear color space.
   *
   * @param {(HTMLImageElement|HTMLCanvasElement|ImageBitmap|Object)} image - The image object.
   * @return {HTMLCanvasElement|Object} The converted image.
   */
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = Gi("canvas");
      t.width = e.width, t.height = e.height;
      const n = t.getContext("2d");
      n.drawImage(e, 0, 0, e.width, e.height);
      const r = n.getImageData(0, 0, e.width, e.height), s = r.data;
      for (let a = 0; a < s.length; a++)
        s[a] = xn(s[a] / 255) * 255;
      return n.putImageData(r, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let n = 0; n < t.length; n++)
        t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[n] = Math.floor(xn(t[n] / 255) * 255) : t[n] = xn(t[n]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return Re("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}
let Th = 0;
class Pa {
  /**
   * Constructs a new texture source.
   *
   * @param {any} [data=null] - The data definition of a texture.
   */
  constructor(e = null) {
    this.isTextureSource = !0, Object.defineProperty(this, "id", { value: Th++ }), this.uuid = xi(), this.data = e, this.dataReady = !0, this.version = 0;
  }
  /**
   * Returns the dimensions of the source into the given target vector.
   *
   * @param {(Vector2|Vector3)} target - The target object the result is written into.
   * @return {(Vector2|Vector3)} The dimensions of the source.
   */
  getSize(e) {
    const t = this.data;
    return typeof HTMLVideoElement < "u" && t instanceof HTMLVideoElement ? e.set(t.videoWidth, t.videoHeight, 0) : typeof VideoFrame < "u" && t instanceof VideoFrame ? e.set(t.displayWidth, t.displayHeight, 0) : t !== null ? e.set(t.width, t.height, t.depth || 0) : e.set(0, 0, 0), e;
  }
  /**
   * When the property is set to `true`, the engine allocates the memory
   * for the texture (if necessary) and triggers the actual texture upload
   * to the GPU next time the source is used.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  /**
   * Serializes the source into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized source.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.images[this.uuid] !== void 0)
      return e.images[this.uuid];
    const n = {
      uuid: this.uuid,
      url: ""
    }, r = this.data;
    if (r !== null) {
      let s;
      if (Array.isArray(r)) {
        s = [];
        for (let a = 0, o = r.length; a < o; a++)
          r[a].isDataTexture ? s.push(ns(r[a].image)) : s.push(ns(r[a]));
      } else
        s = ns(r);
      n.url = s;
    }
    return t || (e.images[this.uuid] = n), n;
  }
}
function ns(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? Eh.getDataURL(i) : i.data ? {
    data: Array.from(i.data),
    width: i.width,
    height: i.height,
    type: i.data.constructor.name
  } : (Re("Texture: Unable to serialize Texture."), {});
}
let wh = 0;
const is = /* @__PURE__ */ new U();
class pt extends Xn {
  /**
   * Constructs a new texture.
   *
   * @param {?Object} [image=Texture.DEFAULT_IMAGE] - The image holding the texture data.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space.
   */
  constructor(e = pt.DEFAULT_IMAGE, t = pt.DEFAULT_MAPPING, n = _n, r = _n, s = At, a = Vn, o = Zt, c = Ot, l = pt.DEFAULT_ANISOTROPY, h = Dn) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: wh++ }), this.uuid = xi(), this.name = "", this.source = new Pa(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = n, this.wrapT = r, this.magFilter = s, this.minFilter = a, this.anisotropy = l, this.format = o, this.internalFormat = null, this.type = c, this.offset = new Ne(0, 0), this.repeat = new Ne(1, 1), this.center = new Ne(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Pe(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = h, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(e && e.depth && e.depth > 1), this.pmremVersion = 0, this.normalized = !1;
  }
  /**
   * The width of the texture in pixels.
   */
  get width() {
    return this.source.getSize(is).x;
  }
  /**
   * The height of the texture in pixels.
   */
  get height() {
    return this.source.getSize(is).y;
  }
  /**
   * The depth of the texture in pixels.
   */
  get depth() {
    return this.source.getSize(is).z;
  }
  /**
   * The image object holding the texture data.
   *
   * @type {?Object}
   */
  get image() {
    return this.source.data;
  }
  set image(e) {
    this.source.data = e;
  }
  /**
   * Updates the texture transformation matrix from the properties {@link Texture#offset},
   * {@link Texture#repeat}, {@link Texture#rotation}, and {@link Texture#center}.
   */
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  /**
   * Adds a range of data in the data texture to be updated on the GPU.
   *
   * @param {number} start - Position at which to start update.
   * @param {number} count - The number of components to update.
   */
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  /**
   * Clears the update ranges.
   */
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  /**
   * Returns a new texture with copied values from this instance.
   *
   * @return {Texture} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given texture to this instance.
   *
   * @param {Texture} source - The texture to copy.
   * @return {Texture} A reference to this instance.
   */
  copy(e) {
    return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.normalized = e.normalized, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.renderTarget = e.renderTarget, this.isRenderTargetTexture = e.isRenderTargetTexture, this.isArrayTexture = e.isArrayTexture, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
  }
  /**
   * Sets this texture's properties based on `values`.
   * @param {Object} values - A container with texture parameters.
   */
  setValues(e) {
    for (const t in e) {
      const n = e[t];
      if (n === void 0) {
        Re(`Texture.setValues(): parameter '${t}' has value of undefined.`);
        continue;
      }
      const r = this[t];
      if (r === void 0) {
        Re(`Texture.setValues(): property '${t}' does not exist.`);
        continue;
      }
      r && n && r.isVector2 && n.isVector2 || r && n && r.isVector3 && n.isVector3 || r && n && r.isMatrix3 && n.isMatrix3 ? r.copy(n) : this[t] = n;
    }
  }
  /**
   * Serializes the texture into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized texture.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.textures[this.uuid] !== void 0)
      return e.textures[this.uuid];
    const n = {
      metadata: {
        version: 4.7,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      normalized: this.normalized,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires Texture#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  /**
   * Transforms the given uv vector with the textures uv transformation matrix.
   *
   * @param {Vector2} uv - The uv vector.
   * @return {Vector2} The transformed uv vector.
   */
  transformUv(e) {
    if (this.mapping !== Al) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1)
      switch (this.wrapS) {
        case Ir:
          e.x = e.x - Math.floor(e.x);
          break;
        case _n:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case Os:
          Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
          break;
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case Ir:
          e.y = e.y - Math.floor(e.y);
          break;
        case _n:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case Os:
          Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
          break;
      }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  /**
   * Setting this property to `true` indicates the engine the texture
   * must be updated in the next render. This triggers a texture upload
   * to the GPU and ensures correct texture parameter configuration.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  /**
   * Setting this property to `true` indicates the engine the PMREM
   * must be regenerated.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsPMREMUpdate(e) {
    e === !0 && this.pmremVersion++;
  }
}
pt.DEFAULT_IMAGE = null;
pt.DEFAULT_MAPPING = Al;
pt.DEFAULT_ANISOTROPY = 1;
const Ga = class Ga {
  /**
   * Constructs a new 4D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   * @param {number} [z=0] - The z value of this vector.
   * @param {number} [w=1] - The w value of this vector.
   */
  constructor(e = 0, t = 0, n = 0, r = 1) {
    this.x = e, this.y = t, this.z = n, this.w = r;
  }
  /**
   * Alias for {@link Vector4#z}.
   *
   * @type {number}
   */
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  /**
   * Alias for {@link Vector4#w}.
   *
   * @type {number}
   */
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @param {number} z - The value of the z component.
   * @param {number} w - The value of the w component.
   * @return {Vector4} A reference to this vector.
   */
  set(e, t, n, r) {
    return this.x = e, this.y = t, this.z = n, this.w = r, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector4} A reference to this vector.
   */
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this.w = e, this;
  }
  /**
   * Sets the vector's x component to the given value
   *
   * @param {number} x - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setX(e) {
    return this.x = e, this;
  }
  /**
   * Sets the vector's y component to the given value
   *
   * @param {number} y - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setY(e) {
    return this.y = e, this;
  }
  /**
   * Sets the vector's z component to the given value
   *
   * @param {number} z - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setZ(e) {
    return this.z = e, this;
  }
  /**
   * Sets the vector's w component to the given value
   *
   * @param {number} w - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setW(e) {
    return this.w = e, this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y,
   * `2` equals to z, `3` equals to w.
   * @param {number} value - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + e);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y,
   * `2` equals to z, `3` equals to w.
   * @return {number} A vector component value.
   */
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + e);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector4} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector3|Vector4} v - The vector to copy.
   * @return {Vector4} A reference to this vector.
   */
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0 ? e.w : 1, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector4} v - The vector to add.
   * @return {Vector4} A reference to this vector.
   */
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector4} A reference to this vector.
   */
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this.w += e, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector4} a - The first vector.
   * @param {Vector4} b - The second vector.
   * @return {Vector4} A reference to this vector.
   */
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector4} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector4} A reference to this vector.
   */
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector4} v - The vector to subtract.
   * @return {Vector4} A reference to this vector.
   */
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector4} A reference to this vector.
   */
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector4} a - The first vector.
   * @param {Vector4} b - The second vector.
   * @return {Vector4} A reference to this vector.
   */
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector4} v - The vector to multiply.
   * @return {Vector4} A reference to this vector.
   */
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector4} A reference to this vector.
   */
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
  }
  /**
   * Multiplies this vector with the given 4x4 matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector4} A reference to this vector.
   */
  applyMatrix4(e) {
    const t = this.x, n = this.y, r = this.z, s = this.w, a = e.elements;
    return this.x = a[0] * t + a[4] * n + a[8] * r + a[12] * s, this.y = a[1] * t + a[5] * n + a[9] * r + a[13] * s, this.z = a[2] * t + a[6] * n + a[10] * r + a[14] * s, this.w = a[3] * t + a[7] * n + a[11] * r + a[15] * s, this;
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector4} v - The vector to divide.
   * @return {Vector4} A reference to this vector.
   */
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector4} A reference to this vector.
   */
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  /**
   * Sets the x, y and z components of this
   * vector to the quaternion's axis and w to the angle.
   *
   * @param {Quaternion} q - The Quaternion to set.
   * @return {Vector4} A reference to this vector.
   */
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const t = Math.sqrt(1 - e.w * e.w);
    return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
  }
  /**
   * Sets the x, y and z components of this
   * vector to the axis of rotation and w to the angle.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper left 3x3 matrix is a pure rotation matrix.
   * @return {Vector4} A reference to this vector.
   */
  setAxisAngleFromRotationMatrix(e) {
    let t, n, r, s;
    const c = e.elements, l = c[0], h = c[4], d = c[8], u = c[1], p = c[5], _ = c[9], M = c[2], m = c[6], f = c[10];
    if (Math.abs(h - u) < 0.01 && Math.abs(d - M) < 0.01 && Math.abs(_ - m) < 0.01) {
      if (Math.abs(h + u) < 0.1 && Math.abs(d + M) < 0.1 && Math.abs(_ + m) < 0.1 && Math.abs(l + p + f - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const R = (l + 1) / 2, S = (p + 1) / 2, T = (f + 1) / 2, b = (h + u) / 4, A = (d + M) / 4, v = (_ + m) / 4;
      return R > S && R > T ? R < 0.01 ? (n = 0, r = 0.707106781, s = 0.707106781) : (n = Math.sqrt(R), r = b / n, s = A / n) : S > T ? S < 0.01 ? (n = 0.707106781, r = 0, s = 0.707106781) : (r = Math.sqrt(S), n = b / r, s = v / r) : T < 0.01 ? (n = 0.707106781, r = 0.707106781, s = 0) : (s = Math.sqrt(T), n = A / s, r = v / s), this.set(n, r, s, t), this;
    }
    let y = Math.sqrt((m - _) * (m - _) + (d - M) * (d - M) + (u - h) * (u - h));
    return Math.abs(y) < 1e-3 && (y = 1), this.x = (m - _) / y, this.y = (d - M) / y, this.z = (u - h) / y, this.w = Math.acos((l + p + f - 1) / 2), this;
  }
  /**
   * Sets the vector components to the position elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector4} A reference to this vector.
   */
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this;
  }
  /**
   * If this vector's x, y, z or w value is greater than the given vector's x, y, z or w
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector4} v - The vector.
   * @return {Vector4} A reference to this vector.
   */
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
  }
  /**
   * If this vector's x, y, z or w value is less than the given vector's x, y, z or w
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector4} v - The vector.
   * @return {Vector4} A reference to this vector.
   */
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
  }
  /**
   * If this vector's x, y, z or w value is greater than the max vector's x, y, z or w
   * value, it is replaced by the corresponding value.
   * If this vector's x, y, z or w value is less than the min vector's x, y, z or w value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector4} min - The minimum x, y and z values.
   * @param {Vector4} max - The maximum x, y and z values in the desired range.
   * @return {Vector4} A reference to this vector.
   */
  clamp(e, t) {
    return this.x = Be(this.x, e.x, t.x), this.y = Be(this.y, e.y, t.y), this.z = Be(this.z, e.z, t.z), this.w = Be(this.w, e.w, t.w), this;
  }
  /**
   * If this vector's x, y, z or w values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x, y, z or w values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector4} A reference to this vector.
   */
  clampScalar(e, t) {
    return this.x = Be(this.x, e, t), this.y = Be(this.y, e, t), this.z = Be(this.z, e, t), this.w = Be(this.w, e, t), this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector4} A reference to this vector.
   */
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Be(n, e, t));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector4} A reference to this vector.
   */
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x, y = -y, z = -z, w = -w.
   *
   * @return {Vector4} A reference to this vector.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector4} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0, 0, 0) to (x, y, z, w). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0, 0, 0) to (x, y, z, w).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector4} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector4} A reference to this vector.
   */
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector4} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector4} A reference to this vector.
   */
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector4} v1 - The first vector.
   * @param {Vector4} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector4} A reference to this vector.
   */
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector4} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`,
   * z value to be `array[ offset + 2 ]`, w value to be `array[ offset + 3 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector4} A reference to this vector.
   */
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector4} A reference to this vector.
   */
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector4} A reference to this vector.
   */
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
};
Ga.prototype.isVector4 = !0;
let lt = Ga;
class Ah extends Xn {
  /**
   * Render target options.
   *
   * @typedef {Object} RenderTarget~Options
   * @property {boolean} [generateMipmaps=false] - Whether to generate mipmaps or not.
   * @property {number} [magFilter=LinearFilter] - The mag filter.
   * @property {number} [minFilter=LinearFilter] - The min filter.
   * @property {number} [format=RGBAFormat] - The texture format.
   * @property {number} [type=UnsignedByteType] - The texture type.
   * @property {?string} [internalFormat=null] - The texture's internal format.
   * @property {number} [wrapS=ClampToEdgeWrapping] - The texture's uv wrapping mode.
   * @property {number} [wrapT=ClampToEdgeWrapping] - The texture's uv wrapping mode.
   * @property {number} [anisotropy=1] - The texture's anisotropy value.
   * @property {string} [colorSpace=NoColorSpace] - The texture's color space.
   * @property {boolean} [depthBuffer=true] - Whether to allocate a depth buffer or not.
   * @property {boolean} [stencilBuffer=false] - Whether to allocate a stencil buffer or not.
   * @property {boolean} [resolveColorBuffer=true] - Whether to resolve the color buffer or not. Only relevant for multisampled render targets.
   * @property {boolean} [resolveDepthBuffer=true] - Whether to resolve the depth buffer or not. Only relevant for multisampled render targets.
   * @property {boolean} [resolveStencilBuffer=true] - Whether to resolve the stencil buffer or not. Only relevant for multisampled render targets.
   * @property {boolean} [storeMultisampledColorBuffer=true] - Whether to store the multisampled color buffer or not. Setting to `false` saves memory bandwidth when the multisampled data are not needed after a render pass.
   * @property {boolean} [storeMultisampledDepthBuffer=true] - Whether to store the multisampled depth buffer or not. Setting to `false` saves memory bandwidth when the multisampled data are not needed after a render pass.
   * @property {boolean} [storeMultisampledStencilBuffer=true] - Whether to store the multisampled stencil buffer or not. Setting to `false` saves memory bandwidth when the multisampled data are not needed after a render pass.
   * @property {?Texture} [depthTexture=null] - Reference to a depth texture.
   * @property {number} [samples=0] - The MSAA samples count.
   * @property {number} [count=1] - Defines the number of color attachments . Must be at least `1`.
   * @property {number} [depth=1] - The texture depth.
   * @property {boolean} [multiview=false] - Whether this target is used for multiview rendering (WebGL OVR_multiview2 extension).
   * @property {boolean} [useArrayDepthTexture=false] - Whether to create the depth texture as an array texture for per-layer depth testing. This is separate from multiview so layered render targets can use array depth without the multiview extension.
   */
  /**
   * Constructs a new render target.
   *
   * @param {number} [width=1] - The width of the render target.
   * @param {number} [height=1] - The height of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(e = 1, t = 1, n = {}) {
    super(), n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: At,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveColorBuffer: !0,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      storeMultisampledColorBuffer: !0,
      storeMultisampledDepthBuffer: !0,
      storeMultisampledStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1,
      depth: 1,
      multiview: !1,
      useArrayDepthTexture: !1
    }, n), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = n.depth, this.scissor = new lt(0, 0, e, t), this.scissorTest = !1, this.viewport = new lt(0, 0, e, t), this.textures = [];
    const r = { width: e, height: t, depth: n.depth }, s = new pt(r), a = n.count;
    for (let o = 0; o < a; o++)
      this.textures[o] = s.clone(), this.textures[o].isRenderTargetTexture = !0, this.textures[o].renderTarget = this;
    this._setTextureOptions(n), this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveColorBuffer = n.resolveColorBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this.storeMultisampledColorBuffer = n.storeMultisampledColorBuffer, this.storeMultisampledDepthBuffer = n.storeMultisampledDepthBuffer, this.storeMultisampledStencilBuffer = n.storeMultisampledStencilBuffer, this._depthTexture = null, this.depthTexture = n.depthTexture, this.samples = n.samples, this.multiview = n.multiview, this.useArrayDepthTexture = n.useArrayDepthTexture;
  }
  _setTextureOptions(e = {}) {
    const t = {
      minFilter: At,
      generateMipmaps: !1,
      flipY: !1,
      internalFormat: null
    };
    e.mapping !== void 0 && (t.mapping = e.mapping), e.wrapS !== void 0 && (t.wrapS = e.wrapS), e.wrapT !== void 0 && (t.wrapT = e.wrapT), e.wrapR !== void 0 && (t.wrapR = e.wrapR), e.magFilter !== void 0 && (t.magFilter = e.magFilter), e.minFilter !== void 0 && (t.minFilter = e.minFilter), e.format !== void 0 && (t.format = e.format), e.type !== void 0 && (t.type = e.type), e.anisotropy !== void 0 && (t.anisotropy = e.anisotropy), e.colorSpace !== void 0 && (t.colorSpace = e.colorSpace), e.flipY !== void 0 && (t.flipY = e.flipY), e.generateMipmaps !== void 0 && (t.generateMipmaps = e.generateMipmaps), e.internalFormat !== void 0 && (t.internalFormat = e.internalFormat);
    for (let n = 0; n < this.textures.length; n++)
      this.textures[n].setValues(t);
  }
  /**
   * The texture representing the default color attachment.
   *
   * @type {Texture}
   */
  get texture() {
    return this.textures[0];
  }
  set texture(e) {
    this.textures[0] = e;
  }
  set depthTexture(e) {
    this._depthTexture !== null && this._depthTexture.renderTarget === this && (this._depthTexture.renderTarget = null), e !== null && e.renderTarget === null && (e.renderTarget = this), this._depthTexture = e;
  }
  /**
   * Instead of saving the depth in a renderbuffer, a texture
   * can be used instead which is useful for further processing
   * e.g. in context of post-processing.
   *
   * @type {?DepthTexture}
   * @default null
   */
  get depthTexture() {
    return this._depthTexture;
  }
  /**
   * Sets the size of this render target.
   *
   * @param {number} width - The width.
   * @param {number} height - The height.
   * @param {number} [depth=1] - The depth.
   */
  setSize(e, t, n = 1) {
    if (this.width !== e || this.height !== t || this.depth !== n) {
      this.width = e, this.height = t, this.depth = n;
      for (let r = 0, s = this.textures.length; r < s; r++)
        this.textures[r].image.width = e, this.textures[r].image.height = t, this.textures[r].image.depth = n, this.textures[r].isData3DTexture !== !0 && (this.textures[r].isArrayTexture = this.textures[r].image.depth > 1);
      this.dispose();
    }
    this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
  }
  /**
   * Returns a new render target with copied values from this instance.
   *
   * @return {RenderTarget} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the settings of the given render target. This is a structural copy so
   * no resources are shared between render targets after the copy. That includes
   * all MRT textures and the depth texture.
   *
   * @param {RenderTarget} source - The render target to copy.
   * @return {RenderTarget} A reference to this instance.
   */
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
    for (let t = 0, n = e.textures.length; t < n; t++) {
      this.textures[t] = e.textures[t].clone(), this.textures[t].isRenderTargetTexture = !0, this.textures[t].renderTarget = this;
      const r = Object.assign({}, e.textures[t].image);
      this.textures[t].source = new Pa(r);
    }
    if (this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveColorBuffer = e.resolveColorBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, this.storeMultisampledColorBuffer = e.storeMultisampledColorBuffer, this.storeMultisampledDepthBuffer = e.storeMultisampledDepthBuffer, this.storeMultisampledStencilBuffer = e.storeMultisampledStencilBuffer, e.depthTexture !== null)
      if (e.depthTexture.renderTarget === e) {
        const t = e.depthTexture.clone();
        t.renderTarget = null, this.depthTexture = t;
      } else
        this.depthTexture = e.depthTexture;
    return this.samples = e.samples, this.multiview = e.multiview, this.useArrayDepthTexture = e.useArrayDepthTexture, this;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires RenderTarget#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class Gt extends Ah {
  /**
   * Constructs a new 3D render target.
   *
   * @param {number} [width=1] - The width of the render target.
   * @param {number} [height=1] - The height of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(e = 1, t = 1, n = {}) {
    super(e, t, n), this.isWebGLRenderTarget = !0;
  }
}
class La extends pt {
  /**
   * Constructs a new data array texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(e = null, t = 1, n = 1, r = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: e, width: t, height: n, depth: r }, this.magFilter = bt, this.minFilter = bt, this.wrapR = _n, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  /**
   * Copies the values of the given texture to this instance.
   *
   * @param {DataArrayTexture} source - The texture to copy.
   * @return {DataArrayTexture} A reference to this instance.
   */
  copy(e) {
    return super.copy(e), this.wrapR = e.wrapR, this;
  }
  /**
   * Describes that a specific layer of the texture needs to be updated.
   * Normally when {@link Texture#needsUpdate} is set to `true`, the
   * entire data texture array is sent to the GPU. Marking specific
   * layers will only transmit subsets of all mipmaps associated with a
   * specific depth in the array which is often much more performant.
   *
   * @param {number} layerIndex - The layer index that should be updated.
   */
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  /**
   * Resets the layer updates registry.
   */
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class c_ extends Gt {
  /**
   * Constructs a new array render target.
   *
   * @param {number} [width=1] - The width of the render target.
   * @param {number} [height=1] - The height of the render target.
   * @param {number} [depth=1] - The height of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(e = 1, t = 1, n = 1, r = {}) {
    super(e, t, r), this.isWebGLArrayRenderTarget = !0, this.depth = n, this.texture = new La(null, e, t, n), this._setTextureOptions(r), this.texture.isRenderTargetTexture = !0;
  }
}
class Rh extends pt {
  /**
   * Constructs a new data array texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(e = null, t = 1, n = 1, r = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: e, width: t, height: n, depth: r }, this.magFilter = bt, this.minFilter = bt, this.wrapR = _n, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
  /**
   * Copies the values of the given texture to this instance.
   *
   * @param {Data3DTexture} source - The texture to copy.
   * @return {Data3DTexture} A reference to this instance.
   */
  copy(e) {
    return super.copy(e), this.wrapR = e.wrapR, this;
  }
}
const kr = class kr {
  /**
   * Constructs a new 4x4 matrix. The arguments are supposed to be
   * in row-major order. If no arguments are provided, the constructor
   * initializes the matrix as an identity matrix.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n14] - 1-4 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n24] - 2-4 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @param {number} [n34] - 3-4 matrix element.
   * @param {number} [n41] - 4-1 matrix element.
   * @param {number} [n42] - 4-2 matrix element.
   * @param {number} [n43] - 4-3 matrix element.
   * @param {number} [n44] - 4-4 matrix element.
   */
  constructor(e, t, n, r, s, a, o, c, l, h, d, u, p, _, M, m) {
    this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, r, s, a, o, c, l, h, d, u, p, _, M, m);
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n14] - 1-4 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n24] - 2-4 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @param {number} [n34] - 3-4 matrix element.
   * @param {number} [n41] - 4-1 matrix element.
   * @param {number} [n42] - 4-2 matrix element.
   * @param {number} [n43] - 4-3 matrix element.
   * @param {number} [n44] - 4-4 matrix element.
   * @return {Matrix4} A reference to this matrix.
   */
  set(e, t, n, r, s, a, o, c, l, h, d, u, p, _, M, m) {
    const f = this.elements;
    return f[0] = e, f[4] = t, f[8] = n, f[12] = r, f[1] = s, f[5] = a, f[9] = o, f[13] = c, f[2] = l, f[6] = h, f[10] = d, f[14] = u, f[3] = p, f[7] = _, f[11] = M, f[15] = m, this;
  }
  /**
   * Sets this matrix to the 4x4 identity matrix.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Returns a matrix with copied values from this instance.
   *
   * @return {Matrix4} A clone of this instance.
   */
  clone() {
    return new kr().fromArray(this.elements);
  }
  /**
   * Copies the values of the given matrix to this instance.
   *
   * @param {Matrix4} m - The matrix to copy.
   * @return {Matrix4} A reference to this matrix.
   */
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this;
  }
  /**
   * Copies the translation component of the given matrix
   * into this matrix's translation component.
   *
   * @param {Matrix4} m - The matrix to copy the translation component.
   * @return {Matrix4} A reference to this matrix.
   */
  copyPosition(e) {
    const t = this.elements, n = e.elements;
    return t[12] = n[12], t[13] = n[13], t[14] = n[14], this;
  }
  /**
   * Set the upper 3x3 elements of this matrix to the values of given 3x3 matrix.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  setFromMatrix3(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[3],
      t[6],
      0,
      t[1],
      t[4],
      t[7],
      0,
      t[2],
      t[5],
      t[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Extracts the basis vectors of this matrix into the three vectors provided.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  extractBasis(e, t, n) {
    return this.determinantAffine() === 0 ? (e.set(1, 0, 0), t.set(0, 1, 0), n.set(0, 0, 1), this) : (e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this);
  }
  /**
   * Sets the given basis vectors to this matrix.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeBasis(e, t, n) {
    return this.set(
      e.x,
      t.x,
      n.x,
      0,
      e.y,
      t.y,
      n.y,
      0,
      e.z,
      t.z,
      n.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Extracts the rotation component of the given matrix
   * into this matrix's rotation component.
   *
   * Note: This method does not support reflection matrices.
   *
   * @param {Matrix4} m - The matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  extractRotation(e) {
    if (e.determinantAffine() === 0)
      return this.identity();
    const t = this.elements, n = e.elements, r = 1 / Zn.setFromMatrixColumn(e, 0).length(), s = 1 / Zn.setFromMatrixColumn(e, 1).length(), a = 1 / Zn.setFromMatrixColumn(e, 2).length();
    return t[0] = n[0] * r, t[1] = n[1] * r, t[2] = n[2] * r, t[3] = 0, t[4] = n[4] * s, t[5] = n[5] * s, t[6] = n[6] * s, t[7] = 0, t[8] = n[8] * a, t[9] = n[9] * a, t[10] = n[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  /**
   * Sets the rotation component (the upper left 3x3 matrix) of this matrix to
   * the rotation specified by the given Euler angles. The rest of
   * the matrix is set to the identity. Depending on the {@link Euler#order},
   * there are six possible outcomes. See [this page](https://en.wikipedia.org/wiki/Euler_angles#Rotation_matrix)
   * for a complete list.
   *
   * @param {Euler} euler - The Euler angles.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationFromEuler(e) {
    const t = this.elements, n = e.x, r = e.y, s = e.z, a = Math.cos(n), o = Math.sin(n), c = Math.cos(r), l = Math.sin(r), h = Math.cos(s), d = Math.sin(s);
    if (e.order === "XYZ") {
      const u = a * h, p = a * d, _ = o * h, M = o * d;
      t[0] = c * h, t[4] = -c * d, t[8] = l, t[1] = p + _ * l, t[5] = u - M * l, t[9] = -o * c, t[2] = M - u * l, t[6] = _ + p * l, t[10] = a * c;
    } else if (e.order === "YXZ") {
      const u = c * h, p = c * d, _ = l * h, M = l * d;
      t[0] = u + M * o, t[4] = _ * o - p, t[8] = a * l, t[1] = a * d, t[5] = a * h, t[9] = -o, t[2] = p * o - _, t[6] = M + u * o, t[10] = a * c;
    } else if (e.order === "ZXY") {
      const u = c * h, p = c * d, _ = l * h, M = l * d;
      t[0] = u - M * o, t[4] = -a * d, t[8] = _ + p * o, t[1] = p + _ * o, t[5] = a * h, t[9] = M - u * o, t[2] = -a * l, t[6] = o, t[10] = a * c;
    } else if (e.order === "ZYX") {
      const u = a * h, p = a * d, _ = o * h, M = o * d;
      t[0] = c * h, t[4] = _ * l - p, t[8] = u * l + M, t[1] = c * d, t[5] = M * l + u, t[9] = p * l - _, t[2] = -l, t[6] = o * c, t[10] = a * c;
    } else if (e.order === "YZX") {
      const u = a * c, p = a * l, _ = o * c, M = o * l;
      t[0] = c * h, t[4] = M - u * d, t[8] = _ * d + p, t[1] = d, t[5] = a * h, t[9] = -o * h, t[2] = -l * h, t[6] = p * d + _, t[10] = u - M * d;
    } else if (e.order === "XZY") {
      const u = a * c, p = a * l, _ = o * c, M = o * l;
      t[0] = c * h, t[4] = -d, t[8] = l * h, t[1] = u * d + M, t[5] = a * h, t[9] = p * d - _, t[2] = _ * d - p, t[6] = o * h, t[10] = M * d + u;
    }
    return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  /**
   * Sets the rotation component of this matrix to the rotation specified by
   * the given Quaternion as outlined [here](https://en.wikipedia.org/wiki/Rotation_matrix#Quaternion)
   * The rest of the matrix is set to the identity.
   *
   * @param {Quaternion} q - The Quaternion.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationFromQuaternion(e) {
    return this.compose(Ch, e, Ph);
  }
  /**
   * Sets the rotation component of the transformation matrix, looking from `eye` towards
   * `target`, and oriented by the up-direction.
   *
   * @param {Vector3} eye - The eye vector.
   * @param {Vector3} target - The target vector.
   * @param {Vector3} up - The up vector.
   * @return {Matrix4} A reference to this matrix.
   */
  lookAt(e, t, n) {
    const r = this.elements;
    return Ut.subVectors(e, t), Ut.lengthSq() === 0 && (Ut.z = 1), Ut.normalize(), wn.crossVectors(n, Ut), wn.lengthSq() === 0 && (Math.abs(n.z) === 1 ? Ut.x += 1e-4 : Ut.z += 1e-4, Ut.normalize(), wn.crossVectors(n, Ut)), wn.normalize(), Qi.crossVectors(Ut, wn), r[0] = wn.x, r[4] = Qi.x, r[8] = Ut.x, r[1] = wn.y, r[5] = Qi.y, r[9] = Ut.y, r[2] = wn.z, r[6] = Qi.z, r[10] = Ut.z, this;
  }
  /**
   * Post-multiplies this matrix by the given 4x4 matrix.
   *
   * @param {Matrix4} m - The matrix to multiply with.
   * @return {Matrix4} A reference to this matrix.
   */
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  /**
   * Pre-multiplies this matrix by the given 4x4 matrix.
   *
   * @param {Matrix4} m - The matrix to multiply with.
   * @return {Matrix4} A reference to this matrix.
   */
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  /**
   * Multiples the given 4x4 matrices and stores the result
   * in this matrix.
   *
   * @param {Matrix4} a - The first matrix.
   * @param {Matrix4} b - The second matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  multiplyMatrices(e, t) {
    const n = e.elements, r = t.elements, s = this.elements, a = n[0], o = n[4], c = n[8], l = n[12], h = n[1], d = n[5], u = n[9], p = n[13], _ = n[2], M = n[6], m = n[10], f = n[14], y = n[3], R = n[7], S = n[11], T = n[15], b = r[0], A = r[4], v = r[8], w = r[12], D = r[1], F = r[5], V = r[9], G = r[13], I = r[2], H = r[6], $ = r[10], K = r[14], ne = r[3], X = r[7], j = r[11], te = r[15];
    return s[0] = a * b + o * D + c * I + l * ne, s[4] = a * A + o * F + c * H + l * X, s[8] = a * v + o * V + c * $ + l * j, s[12] = a * w + o * G + c * K + l * te, s[1] = h * b + d * D + u * I + p * ne, s[5] = h * A + d * F + u * H + p * X, s[9] = h * v + d * V + u * $ + p * j, s[13] = h * w + d * G + u * K + p * te, s[2] = _ * b + M * D + m * I + f * ne, s[6] = _ * A + M * F + m * H + f * X, s[10] = _ * v + M * V + m * $ + f * j, s[14] = _ * w + M * G + m * K + f * te, s[3] = y * b + R * D + S * I + T * ne, s[7] = y * A + R * F + S * H + T * X, s[11] = y * v + R * V + S * $ + T * j, s[15] = y * w + R * G + S * K + T * te, this;
  }
  /**
   * Multiplies every component of the matrix by the given scalar.
   *
   * @param {number} s - The scalar.
   * @return {Matrix4} A reference to this matrix.
   */
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
  }
  /**
   * Computes and returns the determinant of this matrix.
   *
   * @return {number} The determinant.
   */
  determinant() {
    const e = this.elements, t = e[0], n = e[4], r = e[8], s = e[12], a = e[1], o = e[5], c = e[9], l = e[13], h = e[2], d = e[6], u = e[10], p = e[14], _ = e[3], M = e[7], m = e[11], f = e[15], y = c * p - l * u, R = o * p - l * d, S = o * u - c * d, T = a * p - l * h, b = a * u - c * h, A = a * d - o * h;
    return t * (M * y - m * R + f * S) - n * (_ * y - m * T + f * b) + r * (_ * R - M * T + f * A) - s * (_ * S - M * b + m * A);
  }
  /**
   * Computes and returns the determinant of the 4x4 matrix, but assumes the
   * matrix is affine, saving some computations.
   *
   * For affine matrices (like an object's world matrix), this value equals the
   * full 4x4 {@link Matrix4#determinant} but is cheaper to compute.
   *
   * Assumes the bottom row is [0, 0, 0, 1].
   *
   * @return {number} The determinant of the matrix.
   */
  determinantAffine() {
    const e = this.elements, t = e[0], n = e[4], r = e[8], s = e[1], a = e[5], o = e[9], c = e[2], l = e[6], h = e[10];
    return t * (a * h - o * l) - n * (s * h - o * c) + r * (s * l - a * c);
  }
  /**
   * Transposes this matrix in place.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  transpose() {
    const e = this.elements;
    let t;
    return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
  }
  /**
   * Sets the position component for this matrix from the given vector,
   * without affecting the rest of the matrix.
   *
   * @param {number|Vector3} x - The x component of the vector or alternatively the vector object.
   * @param {number} y - The y component of the vector.
   * @param {number} z - The z component of the vector.
   * @return {Matrix4} A reference to this matrix.
   */
  setPosition(e, t, n) {
    const r = this.elements;
    return e.isVector3 ? (r[12] = e.x, r[13] = e.y, r[14] = e.z) : (r[12] = e, r[13] = t, r[14] = n), this;
  }
  /**
   * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
   * You can not invert with a determinant of zero. If you attempt this, the method produces
   * a zero matrix instead.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  invert() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], s = e[3], a = e[4], o = e[5], c = e[6], l = e[7], h = e[8], d = e[9], u = e[10], p = e[11], _ = e[12], M = e[13], m = e[14], f = e[15], y = t * o - n * a, R = t * c - r * a, S = t * l - s * a, T = n * c - r * o, b = n * l - s * o, A = r * l - s * c, v = h * M - d * _, w = h * m - u * _, D = h * f - p * _, F = d * m - u * M, V = d * f - p * M, G = u * f - p * m, I = y * G - R * V + S * F + T * D - b * w + A * v;
    if (I === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const H = 1 / I;
    return e[0] = (o * G - c * V + l * F) * H, e[1] = (r * V - n * G - s * F) * H, e[2] = (M * A - m * b + f * T) * H, e[3] = (u * b - d * A - p * T) * H, e[4] = (c * D - a * G - l * w) * H, e[5] = (t * G - r * D + s * w) * H, e[6] = (m * S - _ * A - f * R) * H, e[7] = (h * A - u * S + p * R) * H, e[8] = (a * V - o * D + l * v) * H, e[9] = (n * D - t * V - s * v) * H, e[10] = (_ * b - M * S + f * y) * H, e[11] = (d * S - h * b - p * y) * H, e[12] = (o * w - a * F - c * v) * H, e[13] = (t * F - n * w + r * v) * H, e[14] = (M * R - _ * T - m * y) * H, e[15] = (h * T - d * R + u * y) * H, this;
  }
  /**
   * Scales each of the first three columns of this matrix by the corresponding component of the given vector.
   *
   * @param {Vector3} v - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  scale(e) {
    const t = this.elements, n = e.x, r = e.y, s = e.z;
    return t[0] *= n, t[4] *= r, t[8] *= s, t[1] *= n, t[5] *= r, t[9] *= s, t[2] *= n, t[6] *= r, t[10] *= s, t[3] *= n, t[7] *= r, t[11] *= s, this;
  }
  /**
   * Gets the maximum scale value of the three axes.
   *
   * @return {number} The maximum scale.
   */
  getMaxScaleOnAxis() {
    const e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(t, n, r));
  }
  /**
   * Sets this matrix as a translation transform from the given vector.
   *
   * @param {number|Vector3} x - The amount to translate in the X axis or alternatively a translation vector.
   * @param {number} y - The amount to translate in the Y axis.
   * @param {number} z - The amount to translate in the z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeTranslation(e, t, n) {
    return e.isVector3 ? this.set(
      1,
      0,
      0,
      e.x,
      0,
      1,
      0,
      e.y,
      0,
      0,
      1,
      e.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      e,
      0,
      1,
      0,
      t,
      0,
      0,
      1,
      n,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the X axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationX(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the Y axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationY(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      0,
      n,
      0,
      0,
      1,
      0,
      0,
      -n,
      0,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the Z axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationZ(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the given axis by
   * the given angle.
   *
   * @param {Vector3} axis - The normalized rotation axis.
   * @param {number} angle - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationAxis(e, t) {
    const n = Math.cos(t), r = Math.sin(t), s = 1 - n, a = e.x, o = e.y, c = e.z, l = s * a, h = s * o;
    return this.set(
      l * a + n,
      l * o - r * c,
      l * c + r * o,
      0,
      l * o + r * c,
      h * o + n,
      h * c - r * a,
      0,
      l * c - r * o,
      h * c + r * a,
      s * c * c + n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a scale transformation.
   *
   * @param {number} x - The amount to scale in the X axis.
   * @param {number} y - The amount to scale in the Y axis.
   * @param {number} z - The amount to scale in the Z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeScale(e, t, n) {
    return this.set(
      e,
      0,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      0,
      n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a shear transformation.
   *
   * @param {number} xy - The amount to shear X by Y.
   * @param {number} xz - The amount to shear X by Z.
   * @param {number} yx - The amount to shear Y by X.
   * @param {number} yz - The amount to shear Y by Z.
   * @param {number} zx - The amount to shear Z by X.
   * @param {number} zy - The amount to shear Z by Y.
   * @return {Matrix4} A reference to this matrix.
   */
  makeShear(e, t, n, r, s, a) {
    return this.set(
      1,
      n,
      s,
      0,
      e,
      1,
      a,
      0,
      t,
      r,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix to the transformation composed of the given position,
   * rotation (Quaternion) and scale.
   *
   * @param {Vector3} position - The position vector.
   * @param {Quaternion} quaternion - The rotation as a Quaternion.
   * @param {Vector3} scale - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  compose(e, t, n) {
    const r = this.elements, s = t._x, a = t._y, o = t._z, c = t._w, l = s + s, h = a + a, d = o + o, u = s * l, p = s * h, _ = s * d, M = a * h, m = a * d, f = o * d, y = c * l, R = c * h, S = c * d, T = n.x, b = n.y, A = n.z;
    return r[0] = (1 - (M + f)) * T, r[1] = (p + S) * T, r[2] = (_ - R) * T, r[3] = 0, r[4] = (p - S) * b, r[5] = (1 - (u + f)) * b, r[6] = (m + y) * b, r[7] = 0, r[8] = (_ + R) * A, r[9] = (m - y) * A, r[10] = (1 - (u + M)) * A, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this;
  }
  /**
   * Decomposes this matrix into its position, rotation and scale components
   * and provides the result in the given objects.
   *
   * Note: Not all matrices are decomposable in this way. For example, if an
   * object has a non-uniformly scaled parent, then the object's world matrix
   * may not be decomposable, and this method may not be appropriate.
   *
   * @param {Vector3} position - The position vector.
   * @param {Quaternion} quaternion - The rotation as a Quaternion.
   * @param {Vector3} scale - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  decompose(e, t, n) {
    const r = this.elements;
    e.x = r[12], e.y = r[13], e.z = r[14];
    const s = this.determinantAffine();
    if (s === 0)
      return n.set(1, 1, 1), t.identity(), this;
    let a = Zn.set(r[0], r[1], r[2]).length();
    const o = Zn.set(r[4], r[5], r[6]).length(), c = Zn.set(r[8], r[9], r[10]).length();
    s < 0 && (a = -a), Xt.copy(this);
    const l = 1 / a, h = 1 / o, d = 1 / c;
    return Xt.elements[0] *= l, Xt.elements[1] *= l, Xt.elements[2] *= l, Xt.elements[4] *= h, Xt.elements[5] *= h, Xt.elements[6] *= h, Xt.elements[8] *= d, Xt.elements[9] *= d, Xt.elements[10] *= d, t.setFromRotationMatrix(Xt), n.x = a, n.y = o, n.z = c, this;
  }
  /**
  	 * Creates a perspective projection matrix. This is used internally by
  	 * {@link PerspectiveCamera#updateProjectionMatrix}.
  
  	 * @param {number} left - Left boundary of the viewing frustum at the near plane.
  	 * @param {number} right - Right boundary of the viewing frustum at the near plane.
  	 * @param {number} top - Top boundary of the viewing frustum at the near plane.
  	 * @param {number} bottom - Bottom boundary of the viewing frustum at the near plane.
  	 * @param {number} near - The distance from the camera to the near plane.
  	 * @param {number} far - The distance from the camera to the far plane.
  	 * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} [coordinateSystem=WebGLCoordinateSystem] - The coordinate system.
  	 * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
  	 * @return {Matrix4} A reference to this matrix.
  	 */
  makePerspective(e, t, n, r, s, a, o = sn, c = !1) {
    const l = this.elements, h = 2 * s / (t - e), d = 2 * s / (n - r), u = (t + e) / (t - e), p = (n + r) / (n - r);
    let _, M;
    if (c)
      _ = s / (a - s), M = a * s / (a - s);
    else if (o === sn)
      _ = -(a + s) / (a - s), M = -2 * a * s / (a - s);
    else if (o === ki)
      _ = -a / (a - s), M = -a * s / (a - s);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
    return l[0] = h, l[4] = 0, l[8] = u, l[12] = 0, l[1] = 0, l[5] = d, l[9] = p, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = _, l[14] = M, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this;
  }
  /**
  	 * Creates a orthographic projection matrix. This is used internally by
  	 * {@link OrthographicCamera#updateProjectionMatrix}.
  
  	 * @param {number} left - Left boundary of the viewing frustum at the near plane.
  	 * @param {number} right - Right boundary of the viewing frustum at the near plane.
  	 * @param {number} top - Top boundary of the viewing frustum at the near plane.
  	 * @param {number} bottom - Bottom boundary of the viewing frustum at the near plane.
  	 * @param {number} near - The distance from the camera to the near plane.
  	 * @param {number} far - The distance from the camera to the far plane.
  	 * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} [coordinateSystem=WebGLCoordinateSystem] - The coordinate system.
  	 * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
  	 * @return {Matrix4} A reference to this matrix.
  	 */
  makeOrthographic(e, t, n, r, s, a, o = sn, c = !1) {
    const l = this.elements, h = 2 / (t - e), d = 2 / (n - r), u = -(t + e) / (t - e), p = -(n + r) / (n - r);
    let _, M;
    if (c)
      _ = 1 / (a - s), M = a / (a - s);
    else if (o === sn)
      _ = -2 / (a - s), M = -(a + s) / (a - s);
    else if (o === ki)
      _ = -1 / (a - s), M = -s / (a - s);
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
    return l[0] = h, l[4] = 0, l[8] = 0, l[12] = u, l[1] = 0, l[5] = d, l[9] = 0, l[13] = p, l[2] = 0, l[6] = 0, l[10] = _, l[14] = M, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this;
  }
  /**
   * Returns `true` if this matrix is equal with the given one.
   *
   * @param {Matrix4} matrix - The matrix to test for equality.
   * @return {boolean} Whether this matrix is equal with the given one.
   */
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let r = 0; r < 16; r++)
      if (t[r] !== n[r]) return !1;
    return !0;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix4} A reference to this matrix.
   */
  fromArray(e, t = 0) {
    for (let n = 0; n < 16; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  /**
   * Writes the elements of this matrix to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The matrix elements in column-major order.
   */
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e;
  }
};
kr.prototype.isMatrix4 = !0;
let st = kr;
const Zn = /* @__PURE__ */ new U(), Xt = /* @__PURE__ */ new st(), Ch = /* @__PURE__ */ new U(0, 0, 0), Ph = /* @__PURE__ */ new U(1, 1, 1), wn = /* @__PURE__ */ new U(), Qi = /* @__PURE__ */ new U(), Ut = /* @__PURE__ */ new U(), po = /* @__PURE__ */ new st(), mo = /* @__PURE__ */ new Mi();
class bn {
  /**
   * Constructs a new euler instance.
   *
   * @param {number} [x=0] - The angle of the x axis in radians.
   * @param {number} [y=0] - The angle of the y axis in radians.
   * @param {number} [z=0] - The angle of the z axis in radians.
   * @param {string} [order=Euler.DEFAULT_ORDER] - A string representing the order that the rotations are applied.
   */
  constructor(e = 0, t = 0, n = 0, r = bn.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = e, this._y = t, this._z = n, this._order = r;
  }
  /**
   * The angle of the x axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  /**
   * The angle of the y axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  /**
   * The angle of the z axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  /**
   * A string representing the order that the rotations are applied.
   *
   * @type {string}
   * @default 'XYZ'
   */
  get order() {
    return this._order;
  }
  set order(e) {
    this._order = e, this._onChangeCallback();
  }
  /**
   * Sets the Euler components.
   *
   * @param {number} x - The angle of the x axis in radians.
   * @param {number} y - The angle of the y axis in radians.
   * @param {number} z - The angle of the z axis in radians.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  set(e, t, n, r = this._order) {
    return this._x = e, this._y = t, this._z = n, this._order = r, this._onChangeCallback(), this;
  }
  /**
   * Returns a new Euler instance with copied values from this instance.
   *
   * @return {Euler} A clone of this instance.
   */
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  /**
   * Copies the values of the given Euler instance to this instance.
   *
   * @param {Euler} euler - The Euler instance to copy.
   * @return {Euler} A reference to this Euler instance.
   */
  copy(e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
  }
  /**
   * Sets the angles of this Euler instance from a pure rotation matrix.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromRotationMatrix(e, t = this._order, n = !0) {
    const r = e.elements, s = r[0], a = r[4], o = r[8], c = r[1], l = r[5], h = r[9], d = r[2], u = r[6], p = r[10];
    switch (t) {
      case "XYZ":
        this._y = Math.asin(Be(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-h, p), this._z = Math.atan2(-a, s)) : (this._x = Math.atan2(u, l), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-Be(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(o, p), this._z = Math.atan2(c, l)) : (this._y = Math.atan2(-d, s), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(Be(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._y = Math.atan2(-d, p), this._z = Math.atan2(-a, l)) : (this._y = 0, this._z = Math.atan2(c, s));
        break;
      case "ZYX":
        this._y = Math.asin(-Be(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._x = Math.atan2(u, p), this._z = Math.atan2(c, s)) : (this._x = 0, this._z = Math.atan2(-a, l));
        break;
      case "YZX":
        this._z = Math.asin(Be(c, -1, 1)), Math.abs(c) < 0.9999999 ? (this._x = Math.atan2(-h, l), this._y = Math.atan2(-d, s)) : (this._x = 0, this._y = Math.atan2(o, p));
        break;
      case "XZY":
        this._z = Math.asin(-Be(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(u, l), this._y = Math.atan2(o, s)) : (this._x = Math.atan2(-h, p), this._y = 0);
        break;
      default:
        Re("Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
    }
    return this._order = t, n === !0 && this._onChangeCallback(), this;
  }
  /**
   * Sets the angles of this Euler instance from a normalized quaternion.
   *
   * @param {Quaternion} q - A normalized Quaternion.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromQuaternion(e, t, n) {
    return po.makeRotationFromQuaternion(e), this.setFromRotationMatrix(po, t, n);
  }
  /**
   * Sets the angles of this Euler instance from the given vector.
   *
   * @param {Vector3} v - The vector.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  /**
   * Resets the euler angle with a new order by creating a quaternion from this
   * euler angle and then setting this euler angle with the quaternion and the
   * new order.
   *
   * Warning: This discards revolution information.
   *
   * @param {string} [newOrder] - A string representing the new order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  reorder(e) {
    return mo.setFromEuler(this), this.setFromQuaternion(mo, e);
  }
  /**
   * Returns `true` if this Euler instance is equal with the given one.
   *
   * @param {Euler} euler - The Euler instance to test for equality.
   * @return {boolean} Whether this Euler instance is equal with the given one.
   */
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  /**
   * Sets this Euler instance's components to values from the given array. The first three
   * entries of the array are assign to the x,y and z components. An optional fourth entry
   * defines the Euler order.
   *
   * @param {Array<number,number,number,?string>} array - An array holding the Euler component values.
   * @return {Euler} A reference to this Euler instance.
   */
  fromArray(e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
  }
  /**
   * Writes the components of this Euler instance to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number,number,number,string>} [array=[]] - The target array holding the Euler components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number,number,number,string>} The Euler components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
bn.DEFAULT_ORDER = "XYZ";
class Fl {
  /**
   * Constructs a new layers instance, with membership
   * initially set to layer `0`.
   */
  constructor() {
    this.mask = 1;
  }
  /**
   * Sets membership to the given layer, and remove membership all other layers.
   *
   * @param {number} layer - The layer to set.
   */
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  /**
   * Adds membership of the given layer.
   *
   * @param {number} layer - The layer to enable.
   */
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  /**
   * Adds membership to all layers.
   */
  enableAll() {
    this.mask = -1;
  }
  /**
   * Toggles the membership of the given layer.
   *
   * @param {number} layer - The layer to toggle.
   */
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  /**
   * Removes membership of the given layer.
   *
   * @param {number} layer - The layer to enable.
   */
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  /**
   * Removes the membership from all layers.
   */
  disableAll() {
    this.mask = 0;
  }
  /**
   * Returns `true` if this and the given layers object have at least one
   * layer in common.
   *
   * @param {Layers} layers - The layers to test.
   * @return {boolean } Whether this and the given layers object have at least one layer in common or not.
   */
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  /**
   * Returns `true` if the given layer is enabled.
   *
   * @param {number} layer - The layer to test.
   * @return {boolean } Whether the given layer is enabled or not.
   */
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}
let Lh = 0;
const go = /* @__PURE__ */ new U(), Jn = /* @__PURE__ */ new Mi(), hn = /* @__PURE__ */ new st(), ji = /* @__PURE__ */ new U(), Ei = /* @__PURE__ */ new U(), Dh = /* @__PURE__ */ new U(), Ih = /* @__PURE__ */ new Mi(), _o = /* @__PURE__ */ new U(1, 0, 0), vo = /* @__PURE__ */ new U(0, 1, 0), xo = /* @__PURE__ */ new U(0, 0, 1), Mo = { type: "added" }, Uh = { type: "removed" }, Qn = { type: "childadded", child: null }, rs = { type: "childremoved", child: null };
class St extends Xn {
  /**
   * Constructs a new 3D object.
   */
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Lh++ }), this.uuid = xi(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = St.DEFAULT_UP.clone();
    const e = new U(), t = new bn(), n = new Mi(), r = new U(1, 1, 1);
    function s() {
      n.setFromEuler(t, !1);
    }
    function a() {
      t.setFromQuaternion(n, void 0, !1);
    }
    t._onChange(s), n._onChange(a), Object.defineProperties(this, {
      /**
       * Represents the object's local position.
       *
       * @name Object3D#position
       * @type {Vector3}
       * @default (0,0,0)
       */
      position: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      /**
       * Represents the object's local rotation as Euler angles, in radians.
       *
       * @name Object3D#rotation
       * @type {Euler}
       * @default (0,0,0)
       */
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      /**
       * Represents the object's local rotation as Quaternions.
       *
       * @name Object3D#quaternion
       * @type {Quaternion}
       */
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      /**
       * Represents the object's local scale.
       *
       * @name Object3D#scale
       * @type {Vector3}
       * @default (1,1,1)
       */
      scale: {
        configurable: !0,
        enumerable: !0,
        value: r
      },
      /**
       * Represents the object's model-view matrix.
       *
       * @name Object3D#modelViewMatrix
       * @type {Matrix4}
       */
      modelViewMatrix: {
        value: new st()
      },
      /**
       * Represents the object's normal matrix.
       *
       * @name Object3D#normalMatrix
       * @type {Matrix3}
       */
      normalMatrix: {
        value: new Pe()
      }
    }), this.matrix = new st(), this.matrixWorld = new st(), this.matrixAutoUpdate = St.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Fl(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null;
  }
  /**
   * A callback that is executed immediately before a 3D object is rendered to a shadow map.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {Camera} shadowCamera - The shadow camera.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} depthMaterial - The depth material.
   * @param {Object} group - The geometry group data.
   */
  onBeforeShadow() {
  }
  /**
   * A callback that is executed immediately after a 3D object is rendered to a shadow map.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {Camera} shadowCamera - The shadow camera.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} depthMaterial - The depth material.
   * @param {Object} group - The geometry group data.
   */
  onAfterShadow() {
  }
  /**
   * A callback that is executed immediately before a 3D object is rendered.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} material - The 3D object's material.
   * @param {Object} group - The geometry group data.
   */
  onBeforeRender() {
  }
  /**
   * A callback that is executed immediately after a 3D object is rendered.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} material - The 3D object's material.
   * @param {Object} group - The geometry group data.
   */
  onAfterRender() {
  }
  /**
   * Applies the given transformation matrix to the object and updates the object's position,
   * rotation and scale.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   */
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  /**
   * Applies a rotation represented by given the quaternion to the 3D object.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Object3D} A reference to this instance.
   */
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  /**
   * Sets the given rotation represented as an axis/angle couple to the 3D object.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   */
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  /**
   * Sets the given rotation represented as Euler angles to the 3D object.
   *
   * @param {Euler} euler - The Euler angles.
   */
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  /**
   * Sets the given rotation represented as rotation matrix to the 3D object.
   *
   * @param {Matrix4} m - Although a 4x4 matrix is expected, the upper 3x3 portion must be
   * a pure rotation matrix (i.e, unscaled).
   */
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  /**
   * Sets the given rotation represented as a Quaternion to the 3D object.
   *
   * @param {Quaternion} q - The Quaternion
   */
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  /**
   * Rotates the 3D object along an axis in local space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateOnAxis(e, t) {
    return Jn.setFromAxisAngle(e, t), this.quaternion.multiply(Jn), this;
  }
  /**
   * Rotates the 3D object along an axis in world space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateOnWorldAxis(e, t) {
    return Jn.setFromAxisAngle(e, t), this.quaternion.premultiply(Jn), this;
  }
  /**
   * Rotates the 3D object around its X axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateX(e) {
    return this.rotateOnAxis(_o, e);
  }
  /**
   * Rotates the 3D object around its Y axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateY(e) {
    return this.rotateOnAxis(vo, e);
  }
  /**
   * Rotates the 3D object around its Z axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateZ(e) {
    return this.rotateOnAxis(xo, e);
  }
  /**
   * Translate the 3D object by a distance along the given axis in local space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateOnAxis(e, t) {
    return go.copy(e).applyQuaternion(this.quaternion), this.position.add(go.multiplyScalar(t)), this;
  }
  /**
   * Translate the 3D object by a distance along its X-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateX(e) {
    return this.translateOnAxis(_o, e);
  }
  /**
   * Translate the 3D object by a distance along its Y-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateY(e) {
    return this.translateOnAxis(vo, e);
  }
  /**
   * Translate the 3D object by a distance along its Z-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateZ(e) {
    return this.translateOnAxis(xo, e);
  }
  /**
   * Converts the given vector from this 3D object's local space to world space.
   *
   * @param {Vector3} vector - The vector to convert.
   * @return {Vector3} The converted vector.
   */
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  /**
   * Converts the given vector from this 3D object's world space to local space.
   *
   * @param {Vector3} vector - The vector to convert.
   * @return {Vector3} The converted vector.
   */
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(hn.copy(this.matrixWorld).invert());
  }
  /**
   * Rotates the object to face a point in world space.
   *
   * This method does not support objects having non-uniformly-scaled parent(s).
   *
   * @param {number|Vector3} x - The x coordinate in world space. Alternatively, a vector representing a position in world space
   * @param {number} [y] - The y coordinate in world space.
   * @param {number} [z] - The z coordinate in world space.
   */
  lookAt(e, t, n) {
    e.isVector3 ? ji.copy(e) : ji.set(e, t, n);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1), Ei.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? hn.lookAt(Ei, ji, this.up) : hn.lookAt(ji, Ei, this.up), this.quaternion.setFromRotationMatrix(hn), r && (hn.extractRotation(r.matrixWorld), Jn.setFromRotationMatrix(hn), this.quaternion.premultiply(Jn.invert()));
  }
  /**
   * Adds the given 3D object as a child to this 3D object. An arbitrary number of
   * objects may be added. Any current parent on an object passed in here will be
   * removed, since an object can have at most one parent.
   *
   * @fires Object3D#added
   * @fires Object3D#childadded
   * @param {Object3D} object - The 3D object to add.
   * @return {Object3D} A reference to this instance.
   */
  add(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++)
        this.add(arguments[t]);
      return this;
    }
    return e === this ? (Xe("Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(Mo), Qn.child = e, this.dispatchEvent(Qn), Qn.child = null) : Xe("Object3D.add: object not an instance of THREE.Object3D.", e), this);
  }
  /**
   * Removes the given 3D object as child from this 3D object.
   * An arbitrary number of objects may be removed.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @param {Object3D} object - The 3D object to remove.
   * @return {Object3D} A reference to this instance.
   */
  remove(e) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++)
        this.remove(arguments[n]);
      return this;
    }
    const t = this.children.indexOf(e);
    return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(Uh), rs.child = e, this.dispatchEvent(rs), rs.child = null), this;
  }
  /**
   * Removes this 3D object from its current parent.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @return {Object3D} A reference to this instance.
   */
  removeFromParent() {
    const e = this.parent;
    return e !== null && e.remove(this), this;
  }
  /**
   * Removes all child objects.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @return {Object3D} A reference to this instance.
   */
  clear() {
    return this.remove(...this.children);
  }
  /**
   * Adds the given 3D object as a child of this 3D object, while maintaining the object's world
   * transform. This method does not support scene graphs having non-uniformly-scaled nodes(s).
   *
   * @fires Object3D#added
   * @fires Object3D#childadded
   * @param {Object3D} object - The 3D object to attach.
   * @return {Object3D} A reference to this instance.
   */
  attach(e) {
    return this.updateWorldMatrix(!0, !1), hn.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), hn.multiply(e.parent.matrixWorld)), e.applyMatrix4(hn), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(Mo), Qn.child = e, this.dispatchEvent(Qn), Qn.child = null, this;
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching ID.
   *
   * @param {number} id - The id.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching name.
   *
   * @param {string} name - The name.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching property value.
   *
   * @param {string} name - The name of the property.
   * @param {any} value - The value.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectByProperty(e, t) {
    if (this[e] === t) return this;
    for (let n = 0, r = this.children.length; n < r; n++) {
      const a = this.children[n].getObjectByProperty(e, t);
      if (a !== void 0)
        return a;
    }
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns all 3D objects with a matching property value.
   *
   * @param {string} name - The name of the property.
   * @param {any} value - The value.
   * @param {Array<Object3D>} result - The method stores the result in this array.
   * @return {Array<Object3D>} The found 3D objects.
   */
  getObjectsByProperty(e, t, n = []) {
    this[e] === t && n.push(this);
    const r = this.children;
    for (let s = 0, a = r.length; s < a; s++)
      r[s].getObjectsByProperty(e, t, n);
    return n;
  }
  /**
   * Returns a vector representing the position of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's position in world space.
   */
  getWorldPosition(e) {
    return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
  }
  /**
   * Returns a Quaternion representing the position of the 3D object in world space.
   *
   * @param {Quaternion} target - The target Quaternion the result is stored to.
   * @return {Quaternion} The 3D object's rotation in world space.
   */
  getWorldQuaternion(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ei, e, Dh), e;
  }
  /**
   * Returns a vector representing the scale of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's scale in world space.
   */
  getWorldScale(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Ei, Ih, e), e;
  }
  /**
   * Returns a vector representing the ("look") direction of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's direction in world space.
   */
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  /**
   * Abstract method to get intersections between a casted ray and this
   * 3D object. Renderable 3D objects such as {@link Mesh}, {@link Line} or {@link Points}
   * implement this method in order to use raycasting.
   *
   * @abstract
   * @param {Raycaster} raycaster - The raycaster.
   * @param {Array<Object>} intersects - An array holding the result of the method.
   */
  raycast() {
  }
  /**
   * Abstract method to test whether this 3D object intersects the given frustum.
   * Renderable 3D objects such as {@link Mesh}, {@link Line} or {@link Points}
   * implement this method in order to use frustum culling.
   *
   * @abstract
   * @param {Frustum|FrustumArray} frustum - The frustum to test.
   * @return {boolean|undefined} Whether this 3D object intersects the given frustum or not.
   */
  intersectsFrustum() {
  }
  /**
   * Executes the callback on this 3D object and all descendants.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverse(e) {
    e(this);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++)
      t[n].traverse(e);
  }
  /**
   * Like {@link Object3D#traverse}, but the callback will only be executed for visible 3D objects.
   * Descendants of invisible 3D objects are not traversed.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverseVisible(e) {
    if (this.visible === !1) return;
    e(this);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++)
      t[n].traverseVisible(e);
  }
  /**
   * Like {@link Object3D#traverse}, but the callback will only be executed for all ancestors.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverseAncestors(e) {
    const t = this.parent;
    t !== null && (e(t), t.traverseAncestors(e));
  }
  /**
   * Updates the transformation matrix in local space by computing it from the current
   * position, rotation and scale values.
   */
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    const e = this.pivot;
    if (e !== null) {
      const t = e.x, n = e.y, r = e.z, s = this.matrix.elements;
      s[12] += t - s[0] * t - s[4] * n - s[8] * r, s[13] += n - s[1] * t - s[5] * n - s[9] * r, s[14] += r - s[2] * t - s[6] * n - s[10] * r;
    }
    this.matrixWorldNeedsUpdate = !0;
  }
  /**
   * Updates the transformation matrix in world space of this 3D objects and its descendants.
   *
   * To ensure correct results, this method also recomputes the 3D object's transformation matrix in
   * local space. The computation of the local and world matrix can be controlled with the
   * {@link Object3D#matrixAutoUpdate} and {@link Object3D#matrixWorldAutoUpdate} flags which are both
   * `true` by default.  Set these flags to `false` if you need more control over the update matrix process.
   *
   * @param {boolean} [force=false] - When set to `true`, a recomputation of world matrices is forced even
   * when {@link Object3D#matrixWorldNeedsUpdate} is `false`.
   */
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++)
      t[n].updateMatrixWorld(e);
  }
  /**
   * An alternative version of {@link Object3D#updateMatrixWorld} with more control over the
   * update of ancestor and descendant nodes.
   *
   * @param {boolean} [updateParents=false] Whether ancestor nodes should be updated or not.
   * @param {boolean} [updateChildren=false] Whether descendant nodes should be updated or not.
   * @param {boolean} [force=false] - When set to `true`, a recomputation of world matrices is forced even
   * when {@link Object3D#matrixWorldNeedsUpdate} is `false`.
   */
  updateWorldMatrix(e, t, n = !1) {
    const r = this.parent;
    if (e === !0 && r !== null && r.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || n) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, n = !0), t === !0) {
      const s = this.children;
      for (let a = 0, o = s.length; a < o; a++)
        s[a].updateWorldMatrix(!1, !0, n);
    }
  }
  /**
   * Serializes the 3D object into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized 3D object.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string", n = {};
    t && (e = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, n.metadata = {
      version: 4.7,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const r = {};
    r.uuid = this.uuid, r.type = this.type, r.name = this.name, r.castShadow = this.castShadow, r.receiveShadow = this.receiveShadow, r.visible = this.visible, r.frustumCulled = this.frustumCulled, r.renderOrder = this.renderOrder, r.static = this.static, r.matrixAutoUpdate = this.matrixAutoUpdate, Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.pivot !== null && (r.pivot = this.pivot.toArray()), this.morphTargetDictionary !== void 0 && (r.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), this.morphTargetInfluences !== void 0 && (r.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.geometryInfo = this._geometryInfo.map((o) => ({
      ...o,
      boundingBox: o.boundingBox ? o.boundingBox.toJSON() : void 0,
      boundingSphere: o.boundingSphere ? o.boundingSphere.toJSON() : void 0
    })), r.instanceInfo = this._instanceInfo.map((o) => ({ ...o })), r.availableInstanceIds = this._availableInstanceIds.slice(), r.availableGeometryIds = this._availableGeometryIds.slice(), r.nextIndexStart = this._nextIndexStart, r.nextVertexStart = this._nextVertexStart, r.geometryCount = this._geometryCount, r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.matricesTexture = this._matricesTexture.toJSON(e), r.indirectTexture = this._indirectTexture.toJSON(e), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (r.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (r.boundingBox = this.boundingBox.toJSON()));
    function s(o, c) {
      return o[c.uuid] === void 0 && (o[c.uuid] = c.toJSON(e)), c.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(e).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = s(e.geometries, this.geometry);
      const o = this.geometry.parameters;
      if (o !== void 0 && o.shapes !== void 0) {
        const c = o.shapes;
        if (Array.isArray(c))
          for (let l = 0, h = c.length; l < h; l++) {
            const d = c[l];
            s(e.shapes, d);
          }
        else
          s(e.shapes, c);
      }
    }
    if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (s(e.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const o = [];
        for (let c = 0, l = this.material.length; c < l; c++)
          o.push(s(e.materials, this.material[c]));
        r.material = o;
      } else
        r.material = s(e.materials, this.material);
    if (this.children.length > 0) {
      r.children = [];
      for (let o = 0; o < this.children.length; o++)
        r.children.push(this.children[o].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let o = 0; o < this.animations.length; o++) {
        const c = this.animations[o];
        r.animations.push(s(e.animations, c));
      }
    }
    if (t) {
      const o = a(e.geometries), c = a(e.materials), l = a(e.textures), h = a(e.images), d = a(e.shapes), u = a(e.skeletons), p = a(e.animations), _ = a(e.nodes);
      o.length > 0 && (n.geometries = o), c.length > 0 && (n.materials = c), l.length > 0 && (n.textures = l), h.length > 0 && (n.images = h), d.length > 0 && (n.shapes = d), u.length > 0 && (n.skeletons = u), p.length > 0 && (n.animations = p), _.length > 0 && (n.nodes = _);
    }
    return n.object = r, n;
    function a(o) {
      const c = [];
      for (const l in o) {
        const h = o[l];
        delete h.metadata, c.push(h);
      }
      return c;
    }
  }
  /**
   * Returns a new 3D object with copied values from this instance.
   *
   * @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are also cloned.
   * @return {Object3D} A clone of this instance.
   */
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  /**
   * Copies the values of the given 3D object to this instance.
   *
   * @param {Object3D} source - The 3D object to copy.
   * @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are cloned.
   * @return {Object3D} A reference to this instance.
   */
  copy(e, t = !0) {
    if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.pivot = e.pivot !== null ? e.pivot.clone() : null, this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.static = e.static, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0)
      for (let n = 0; n < e.children.length; n++) {
        const r = e.children[n];
        this.add(r.clone());
      }
    return this;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * Geometries, materials and textures are potentially shared with other
   * 3D objects and must be disposed of separately.
   *
   * @fires Object3D#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
St.DEFAULT_UP = /* @__PURE__ */ new U(0, 1, 0);
St.DEFAULT_MATRIX_AUTO_UPDATE = !0;
St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
class Di extends St {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const Nh = { type: "move" };
class ss {
  /**
   * Constructs a new XR controller.
   */
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  /**
   * Returns a group representing the hand space of the XR controller.
   *
   * @return {Group} A group representing the hand space of the XR controller.
   */
  getHandSpace() {
    return this._hand === null && (this._hand = new Di(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  /**
   * Returns a group representing the target ray space of the XR controller.
   *
   * @return {Group} A group representing the target ray space of the XR controller.
   */
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new Di(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new U(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new U()), this._targetRay;
  }
  /**
   * Returns a group representing the grip space of the XR controller.
   *
   * @return {Group} A group representing the grip space of the XR controller.
   */
  getGripSpace() {
    return this._grip === null && (this._grip = new Di(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new U(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new U(), this._grip.eventsEnabled = !1), this._grip;
  }
  /**
   * Dispatches the given event to the groups representing
   * the different coordinate spaces of the XR controller.
   *
   * @param {Object} event - The event to dispatch.
   * @return {WebXRController} A reference to this instance.
   */
  dispatchEvent(e) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
  }
  /**
   * Connects the controller with the given XR input source.
   *
   * @param {XRInputSource} inputSource - The input source.
   * @return {WebXRController} A reference to this instance.
   */
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t)
        for (const n of e.hand.values())
          this._getHandJoint(t, n);
    }
    return this.dispatchEvent({ type: "connected", data: e }), this;
  }
  /**
   * Disconnects the controller from the given XR input source.
   *
   * @param {XRInputSource} inputSource - The input source.
   * @return {WebXRController} A reference to this instance.
   */
  disconnect(e) {
    return this.dispatchEvent({ type: "disconnected", data: e }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  /**
   * Updates the controller with the given input source, XR frame and reference space.
   * This updates the transformations of the groups that represent the different
   * coordinate systems of the controller.
   *
   * @param {XRInputSource} inputSource - The input source.
   * @param {XRFrame} frame - The XR frame.
   * @param {XRReferenceSpace} referenceSpace - The reference space.
   * @return {WebXRController} A reference to this instance.
   */
  update(e, t, n) {
    let r = null, s = null, a = null;
    const o = this._targetRay, c = this._grip, l = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (l && e.hand) {
        a = !0;
        for (const M of e.hand.values()) {
          const m = t.getJointPose(M, n), f = this._getHandJoint(l, M);
          m !== null && (f.matrix.fromArray(m.transform.matrix), f.matrix.decompose(f.position, f.rotation, f.scale), f.matrixWorldNeedsUpdate = !0, f.jointRadius = m.radius), f.visible = m !== null;
        }
        const h = l.joints["index-finger-tip"], d = l.joints["thumb-tip"], u = h.position.distanceTo(d.position), p = 0.02, _ = 5e-3;
        l.inputState.pinching && u > p + _ ? (l.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !l.inputState.pinching && u <= p - _ && (l.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else
        c !== null && e.gripSpace && (s = t.getPose(e.gripSpace, n), s !== null && (c.matrix.fromArray(s.transform.matrix), c.matrix.decompose(c.position, c.rotation, c.scale), c.matrixWorldNeedsUpdate = !0, s.linearVelocity ? (c.hasLinearVelocity = !0, c.linearVelocity.copy(s.linearVelocity)) : c.hasLinearVelocity = !1, s.angularVelocity ? (c.hasAngularVelocity = !0, c.angularVelocity.copy(s.angularVelocity)) : c.hasAngularVelocity = !1, c.eventsEnabled && c.dispatchEvent({
          type: "gripUpdated",
          data: e,
          target: this
        })));
      o !== null && (r = t.getPose(e.targetRaySpace, n), r === null && s !== null && (r = s), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(Nh)));
    }
    return o !== null && (o.visible = r !== null), c !== null && (c.visible = s !== null), l !== null && (l.visible = a !== null), this;
  }
  /**
   * Returns a group representing the hand joint for the given input joint.
   *
   * @private
   * @param {Group} hand - The group representing the hand space.
   * @param {XRJointSpace} inputjoint - The hand joint data.
   * @return {Group} A group representing the hand joint for the given input joint.
   */
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const n = new Di();
      n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
    }
    return e.joints[t.jointName];
  }
}
const Ol = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, An = { h: 0, s: 0, l: 0 }, er = { h: 0, s: 0, l: 0 };
function as(i, e, t) {
  return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? i + (e - i) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? i + (e - i) * 6 * (2 / 3 - t) : i;
}
class Le {
  /**
   * Constructs a new color.
   *
   * Note that standard method of specifying color in three.js is with a hexadecimal triplet,
   * and that method is used throughout the rest of the documentation.
   *
   * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
   * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
   * @param {number} [g] - The green component.
   * @param {number} [b] - The blue component.
   */
  constructor(e, t, n) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n);
  }
  /**
   * Sets the colors's components from the given values.
   *
   * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
   * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
   * @param {number} [g] - The green component.
   * @param {number} [b] - The blue component.
   * @return {Color} A reference to this color.
   */
  set(e, t, n) {
    if (t === void 0 && n === void 0) {
      const r = e;
      r && r.isColor ? this.copy(r) : typeof r == "number" ? this.setHex(r) : typeof r == "string" && this.setStyle(r);
    } else
      this.setRGB(e, t, n);
    return this;
  }
  /**
   * Sets the colors's components to the given scalar value.
   *
   * @param {number} scalar - The scalar value.
   * @return {Color} A reference to this color.
   */
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  /**
   * Sets this color from a hexadecimal value.
   *
   * @param {number} hex - The hexadecimal value.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setHex(e, t = Mt) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, Oe.colorSpaceToWorking(this, t), this;
  }
  /**
   * Sets this color from RGB values.
   *
   * @param {number} r - Red channel value between `0.0` and `1.0`.
   * @param {number} g - Green channel value between `0.0` and `1.0`.
   * @param {number} b - Blue channel value between `0.0` and `1.0`.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setRGB(e, t, n, r = Oe.workingColorSpace) {
    return this.r = e, this.g = t, this.b = n, Oe.colorSpaceToWorking(this, r), this;
  }
  /**
   * Sets this color from RGB values.
   *
   * @param {number} h - Hue value between `0.0` and `1.0`.
   * @param {number} s - Saturation value between `0.0` and `1.0`.
   * @param {number} l - Lightness value between `0.0` and `1.0`.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setHSL(e, t, n, r = Oe.workingColorSpace) {
    if (e = Ca(e, 1), t = Be(t, 0, 1), n = Be(n, 0, 1), t === 0)
      this.r = this.g = this.b = n;
    else {
      const s = n <= 0.5 ? n * (1 + t) : n + t - n * t, a = 2 * n - s;
      this.r = as(a, s, e + 1 / 3), this.g = as(a, s, e), this.b = as(a, s, e - 1 / 3);
    }
    return Oe.colorSpaceToWorking(this, r), this;
  }
  /**
   * Sets this color from a CSS-style string. For example, `rgb(250, 0,0)`,
   * `rgb(100%, 0%, 0%)`, `hsl(0, 100%, 50%)`, `#ff0000`, `#f00`, or `red` ( or
   * any [X11 color name](https://en.wikipedia.org/wiki/X11_color_names#Color_name_chart) -
   * all 140 color names are supported).
   *
   * @param {string} style - Color as a CSS-style string.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setStyle(e, t = Mt) {
    function n(s) {
      s !== void 0 && parseFloat(s) < 1 && Re("Color: Alpha component of " + e + " will be ignored.");
    }
    let r;
    if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let s;
      const a = r[1], o = r[2];
      switch (a) {
        case "rgb":
        case "rgba":
          if (s = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setRGB(
              Math.min(255, parseInt(s[1], 10)) / 255,
              Math.min(255, parseInt(s[2], 10)) / 255,
              Math.min(255, parseInt(s[3], 10)) / 255,
              t
            );
          if (s = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setRGB(
              Math.min(100, parseInt(s[1], 10)) / 100,
              Math.min(100, parseInt(s[2], 10)) / 100,
              Math.min(100, parseInt(s[3], 10)) / 100,
              t
            );
          break;
        case "hsl":
        case "hsla":
          if (s = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return n(s[4]), this.setHSL(
              parseFloat(s[1]) / 360,
              parseFloat(s[2]) / 100,
              parseFloat(s[3]) / 100,
              t
            );
          break;
        default:
          Re("Color: Unknown color model " + e);
      }
    } else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const s = r[1], a = s.length;
      if (a === 3)
        return this.setRGB(
          parseInt(s.charAt(0), 16) / 15,
          parseInt(s.charAt(1), 16) / 15,
          parseInt(s.charAt(2), 16) / 15,
          t
        );
      if (a === 6)
        return this.setHex(parseInt(s, 16), t);
      Re("Color: Invalid hex color " + e);
    } else if (e && e.length > 0)
      return this.setColorName(e, t);
    return this;
  }
  /**
   * Sets this color from a color name. Faster than {@link Color#setStyle} if
   * you don't need the other CSS-style formats.
   *
   * For convenience, the list of names is exposed in `Color.NAMES` as a hash.
   * ```js
   * Color.NAMES.aliceblue // returns 0xF0F8FF
   * ```
   *
   * @param {string} style - The color name.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setColorName(e, t = Mt) {
    const n = Ol[e.toLowerCase()];
    return n !== void 0 ? this.setHex(n, t) : Re("Color: Unknown color " + e), this;
  }
  /**
   * Returns a new color with copied values from this instance.
   *
   * @return {Color} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  /**
   * Copies the values of the given color to this instance.
   *
   * @param {Color} color - The color to copy.
   * @return {Color} A reference to this color.
   */
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  /**
   * Copies the given color into this color, and then converts this color from
   * `SRGBColorSpace` to `LinearSRGBColorSpace`.
   *
   * @param {Color} color - The color to copy/convert.
   * @return {Color} A reference to this color.
   */
  copySRGBToLinear(e) {
    return this.r = xn(e.r), this.g = xn(e.g), this.b = xn(e.b), this;
  }
  /**
   * Copies the given color into this color, and then converts this color from
   * `LinearSRGBColorSpace` to `SRGBColorSpace`.
   *
   * @param {Color} color - The color to copy/convert.
   * @return {Color} A reference to this color.
   */
  copyLinearToSRGB(e) {
    return this.r = gi(e.r), this.g = gi(e.g), this.b = gi(e.b), this;
  }
  /**
   * Converts this color from `SRGBColorSpace` to `LinearSRGBColorSpace`.
   *
   * @return {Color} A reference to this color.
   */
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  /**
   * Converts this color from `LinearSRGBColorSpace` to `SRGBColorSpace`.
   *
   * @return {Color} A reference to this color.
   */
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  /**
   * Returns the hexadecimal value of this color.
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {number} The hexadecimal value.
   */
  getHex(e = Mt) {
    return Oe.workingToColorSpace(wt.copy(this), e), Math.round(Be(wt.r * 255, 0, 255)) * 65536 + Math.round(Be(wt.g * 255, 0, 255)) * 256 + Math.round(Be(wt.b * 255, 0, 255));
  }
  /**
   * Returns the hexadecimal value of this color as a string (for example, 'FFFFFF').
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {string} The hexadecimal value as a string.
   */
  getHexString(e = Mt) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  /**
   * Converts the colors RGB values into the HSL format and stores them into the
   * given target object.
   *
   * @param {{h:number,s:number,l:number}} target - The target object that is used to store the method's result.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {{h:number,s:number,l:number}} The HSL representation of this color.
   */
  getHSL(e, t = Oe.workingColorSpace) {
    Oe.workingToColorSpace(wt.copy(this), t);
    const n = wt.r, r = wt.g, s = wt.b, a = Math.max(n, r, s), o = Math.min(n, r, s);
    let c, l;
    const h = (o + a) / 2;
    if (o === a)
      c = 0, l = 0;
    else {
      const d = a - o;
      switch (l = h <= 0.5 ? d / (a + o) : d / (2 - a - o), a) {
        case n:
          c = (r - s) / d + (r < s ? 6 : 0);
          break;
        case r:
          c = (s - n) / d + 2;
          break;
        case s:
          c = (n - r) / d + 4;
          break;
      }
      c /= 6;
    }
    return e.h = c, e.s = l, e.l = h, e;
  }
  /**
   * Returns the RGB values of this color and stores them into the given target object.
   *
   * @param {Color} target - The target color that is used to store the method's result.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} The RGB representation of this color.
   */
  getRGB(e, t = Oe.workingColorSpace) {
    return Oe.workingToColorSpace(wt.copy(this), t), e.r = wt.r, e.g = wt.g, e.b = wt.b, e;
  }
  /**
   * Returns the value of this color as a CSS style string. Example: `rgb(255,0,0)`.
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {string} The CSS representation of this color.
   */
  getStyle(e = Mt) {
    Oe.workingToColorSpace(wt.copy(this), e);
    const t = wt.r, n = wt.g, r = wt.b;
    return e !== Mt ? `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(r * 255)})`;
  }
  /**
   * Adds the given HSL values to this color's values.
   * Internally, this converts the color's RGB values to HSL, adds HSL
   * and then converts the color back to RGB.
   *
   * @param {number} h - Hue value between `0.0` and `1.0`.
   * @param {number} s - Saturation value between `0.0` and `1.0`.
   * @param {number} l - Lightness value between `0.0` and `1.0`.
   * @return {Color} A reference to this color.
   */
  offsetHSL(e, t, n) {
    return this.getHSL(An), this.setHSL(An.h + e, An.s + t, An.l + n);
  }
  /**
   * Adds the RGB values of the given color to the RGB values of this color.
   *
   * @param {Color} color - The color to add.
   * @return {Color} A reference to this color.
   */
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  /**
   * Adds the RGB values of the given colors and stores the result in this instance.
   *
   * @param {Color} color1 - The first color.
   * @param {Color} color2 - The second color.
   * @return {Color} A reference to this color.
   */
  addColors(e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
  }
  /**
   * Adds the given scalar value to the RGB values of this color.
   *
   * @param {number} s - The scalar to add.
   * @return {Color} A reference to this color.
   */
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  /**
   * Subtracts the RGB values of the given color from the RGB values of this color.
   *
   * @param {Color} color - The color to subtract.
   * @return {Color} A reference to this color.
   */
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  /**
   * Multiplies the RGB values of the given color with the RGB values of this color.
   *
   * @param {Color} color - The color to multiply.
   * @return {Color} A reference to this color.
   */
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  /**
   * Multiplies the given scalar value with the RGB values of this color.
   *
   * @param {number} s - The scalar to multiply.
   * @return {Color} A reference to this color.
   */
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  /**
   * Linearly interpolates this color's RGB values toward the RGB values of the
   * given color. The alpha argument can be thought of as the ratio between
   * the two colors, where `0.0` is this color and `1.0` is the first argument.
   *
   * @param {Color} color - The color to converge on.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerp(e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
  }
  /**
   * Linearly interpolates between the given colors and stores the result in this instance.
   * The alpha argument can be thought of as the ratio between the two colors, where `0.0`
   * is the first and `1.0` is the second color.
   *
   * @param {Color} color1 - The first color.
   * @param {Color} color2 - The second color.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerpColors(e, t, n) {
    return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
  }
  /**
   * Linearly interpolates this color's HSL values toward the HSL values of the
   * given color. It differs from {@link Color#lerp} by not interpolating straight
   * from one color to the other, but instead going through all the hues in between
   * those two colors. The alpha argument can be thought of as the ratio between
   * the two colors, where 0.0 is this color and 1.0 is the first argument.
   *
   * @param {Color} color - The color to converge on.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerpHSL(e, t) {
    this.getHSL(An), e.getHSL(er);
    const n = Oi(An.h, er.h, t), r = Oi(An.s, er.s, t), s = Oi(An.l, er.l, t);
    return this.setHSL(n, r, s), this;
  }
  /**
   * Sets the color's RGB components from the given 3D vector.
   *
   * @param {Vector3} v - The vector to set.
   * @return {Color} A reference to this color.
   */
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  /**
   * Transforms this color with the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix.
   * @return {Color} A reference to this color.
   */
  applyMatrix3(e) {
    const t = this.r, n = this.g, r = this.b, s = e.elements;
    return this.r = s[0] * t + s[3] * n + s[6] * r, this.g = s[1] * t + s[4] * n + s[7] * r, this.b = s[2] * t + s[5] * n + s[8] * r, this;
  }
  /**
   * Returns `true` if this color is equal with the given one.
   *
   * @param {Color} c - The color to test for equality.
   * @return {boolean} Whether this bounding color is equal with the given one.
   */
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  /**
   * Sets this color's RGB components from the given array.
   *
   * @param {Array<number>} array - An array holding the RGB values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Color} A reference to this color.
   */
  fromArray(e, t = 0) {
    return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
  }
  /**
   * Writes the RGB components of this color to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the color components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The color components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
  }
  /**
   * Sets the components of this color from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding color data.
   * @param {number} index - The index into the attribute.
   * @return {Color} A reference to this color.
   */
  fromBufferAttribute(e, t) {
    return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
  }
  /**
   * This methods defines the serialization result of this class. Returns the color
   * as a hexadecimal value.
   *
   * @return {number} The hexadecimal value.
   */
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const wt = /* @__PURE__ */ new Le();
Le.NAMES = Ol;
class Bl extends St {
  /**
   * Constructs a new scene.
   */
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new bn(), this.environmentIntensity = 1, this.environmentRotation = new bn(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), t.object.backgroundBlurriness = this.backgroundBlurriness, t.object.backgroundIntensity = this.backgroundIntensity, t.object.backgroundRotation = this.backgroundRotation.toArray(), t.object.environmentIntensity = this.environmentIntensity, t.object.environmentRotation = this.environmentRotation.toArray(), t;
  }
}
const qt = /* @__PURE__ */ new U(), un = /* @__PURE__ */ new U(), os = /* @__PURE__ */ new U(), dn = /* @__PURE__ */ new U(), jn = /* @__PURE__ */ new U(), ei = /* @__PURE__ */ new U(), So = /* @__PURE__ */ new U(), ls = /* @__PURE__ */ new U(), cs = /* @__PURE__ */ new U(), hs = /* @__PURE__ */ new U(), us = /* @__PURE__ */ new lt(), ds = /* @__PURE__ */ new lt(), fs = /* @__PURE__ */ new lt();
class $t {
  /**
   * Constructs a new triangle.
   *
   * @param {Vector3} [a=(0,0,0)] - The first corner of the triangle.
   * @param {Vector3} [b=(0,0,0)] - The second corner of the triangle.
   * @param {Vector3} [c=(0,0,0)] - The third corner of the triangle.
   */
  constructor(e = new U(), t = new U(), n = new U()) {
    this.a = e, this.b = t, this.c = n;
  }
  /**
   * Computes the normal vector of a triangle.
   *
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The triangle's normal.
   */
  static getNormal(e, t, n, r) {
    r.subVectors(n, t), qt.subVectors(e, t), r.cross(qt);
    const s = r.lengthSq();
    return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0);
  }
  /**
   * Computes a barycentric coordinates from the given vector.
   * Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The barycentric coordinates for the given point
   */
  static getBarycoord(e, t, n, r, s) {
    qt.subVectors(r, t), un.subVectors(n, t), os.subVectors(e, t);
    const a = qt.dot(qt), o = qt.dot(un), c = qt.dot(os), l = un.dot(un), h = un.dot(os), d = a * l - o * o;
    if (d === 0)
      return s.set(0, 0, 0), null;
    const u = 1 / d, p = (l * c - o * h) * u, _ = (a * h - o * c) * u;
    return s.set(1 - p - _, _, p);
  }
  /**
   * Returns `true` if the given point, when projected onto the plane of the
   * triangle, lies within the triangle.
   *
   * @param {Vector3} point - The point in 3D space to test.
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @return {boolean} Whether the given point, when projected onto the plane of the
   * triangle, lies within the triangle or not.
   */
  static containsPoint(e, t, n, r) {
    return this.getBarycoord(e, t, n, r, dn) === null ? !1 : dn.x >= 0 && dn.y >= 0 && dn.x + dn.y <= 1;
  }
  /**
   * Computes the value barycentrically interpolated for the given point on the
   * triangle. Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - Position of interpolated point.
   * @param {Vector3} p1 - The first corner of the triangle.
   * @param {Vector3} p2 - The second corner of the triangle.
   * @param {Vector3} p3 - The third corner of the triangle.
   * @param {Vector3} v1 - Value to interpolate of first vertex.
   * @param {Vector3} v2 - Value to interpolate of second vertex.
   * @param {Vector3} v3 - Value to interpolate of third vertex.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The interpolated value.
   */
  static getInterpolation(e, t, n, r, s, a, o, c) {
    return this.getBarycoord(e, t, n, r, dn) === null ? (c.x = 0, c.y = 0, "z" in c && (c.z = 0), "w" in c && (c.w = 0), null) : (c.setScalar(0), c.addScaledVector(s, dn.x), c.addScaledVector(a, dn.y), c.addScaledVector(o, dn.z), c);
  }
  /**
   * Computes the value barycentrically interpolated for the given attribute and indices.
   *
   * @param {BufferAttribute} attr - The attribute to interpolate.
   * @param {number} i1 - Index of first vertex.
   * @param {number} i2 - Index of second vertex.
   * @param {number} i3 - Index of third vertex.
   * @param {Vector3} barycoord - The barycoordinate value to use to interpolate.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The interpolated attribute value.
   */
  static getInterpolatedAttribute(e, t, n, r, s, a) {
    return us.setScalar(0), ds.setScalar(0), fs.setScalar(0), us.fromBufferAttribute(e, t), ds.fromBufferAttribute(e, n), fs.fromBufferAttribute(e, r), a.setScalar(0), a.addScaledVector(us, s.x), a.addScaledVector(ds, s.y), a.addScaledVector(fs, s.z), a;
  }
  /**
   * Returns `true` if the triangle is oriented towards the given direction.
   *
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @param {Vector3} direction - The (normalized) direction vector.
   * @return {boolean} Whether the triangle is oriented towards the given direction or not.
   */
  static isFrontFacing(e, t, n, r) {
    return qt.subVectors(n, t), un.subVectors(e, t), qt.cross(un).dot(r) < 0;
  }
  /**
   * Sets the triangle's vertices by copying the given values.
   *
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @return {Triangle} A reference to this triangle.
   */
  set(e, t, n) {
    return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
  }
  /**
   * Sets the triangle's vertices by copying the given array values.
   *
   * @param {Array<Vector3>} points - An array with 3D points.
   * @param {number} i0 - The array index representing the first corner of the triangle.
   * @param {number} i1 - The array index representing the second corner of the triangle.
   * @param {number} i2 - The array index representing the third corner of the triangle.
   * @return {Triangle} A reference to this triangle.
   */
  setFromPointsAndIndices(e, t, n, r) {
    return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[r]), this;
  }
  /**
   * Sets the triangle's vertices by copying the given attribute values.
   *
   * @param {BufferAttribute} attribute - A buffer attribute with 3D points data.
   * @param {number} i0 - The attribute index representing the first corner of the triangle.
   * @param {number} i1 - The attribute index representing the second corner of the triangle.
   * @param {number} i2 - The attribute index representing the third corner of the triangle.
   * @return {Triangle} A reference to this triangle.
   */
  setFromAttributeAndIndices(e, t, n, r) {
    return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, r), this;
  }
  /**
   * Returns a new triangle with copied values from this instance.
   *
   * @return {Triangle} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given triangle to this instance.
   *
   * @param {Triangle} triangle - The triangle to copy.
   * @return {Triangle} A reference to this triangle.
   */
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  /**
   * Computes the area of the triangle.
   *
   * @return {number} The triangle's area.
   */
  getArea() {
    return qt.subVectors(this.c, this.b), un.subVectors(this.a, this.b), qt.cross(un).length() * 0.5;
  }
  /**
   * Computes the midpoint of the triangle.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The triangle's midpoint.
   */
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  /**
   * Computes the normal of the triangle.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The triangle's normal.
   */
  getNormal(e) {
    return $t.getNormal(this.a, this.b, this.c, e);
  }
  /**
   * Computes a plane the triangle lies within.
   *
   * @param {Plane} target - The target vector that is used to store the method's result.
   * @return {Plane} The plane the triangle lies within.
   */
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  /**
   * Computes a barycentric coordinates from the given vector.
   * Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The barycentric coordinates for the given point
   */
  getBarycoord(e, t) {
    return $t.getBarycoord(e, this.a, this.b, this.c, t);
  }
  /**
   * Computes the value barycentrically interpolated for the given point on the
   * triangle. Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - Position of interpolated point.
   * @param {Vector3} v1 - Value to interpolate of first vertex.
   * @param {Vector3} v2 - Value to interpolate of second vertex.
   * @param {Vector3} v3 - Value to interpolate of third vertex.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The interpolated value.
   */
  getInterpolation(e, t, n, r, s) {
    return $t.getInterpolation(e, this.a, this.b, this.c, t, n, r, s);
  }
  /**
   * Returns `true` if the given point, when projected onto the plane of the
   * triangle, lies within the triangle.
   *
   * @param {Vector3} point - The point in 3D space to test.
   * @return {boolean} Whether the given point, when projected onto the plane of the
   * triangle, lies within the triangle or not.
   */
  containsPoint(e) {
    return $t.containsPoint(e, this.a, this.b, this.c);
  }
  /**
   * Returns `true` if the triangle is oriented towards the given direction.
   *
   * @param {Vector3} direction - The (normalized) direction vector.
   * @return {boolean} Whether the triangle is oriented towards the given direction or not.
   */
  isFrontFacing(e) {
    return $t.isFrontFacing(this.a, this.b, this.c, e);
  }
  /**
   * Returns `true` if this triangle intersects with the given box.
   *
   * @param {Box3} box - The box to intersect.
   * @return {boolean} Whether this triangle intersects with the given box or not.
   */
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  /**
   * Returns the closest point on the triangle to the given point.
   *
   * @param {Vector3} p - The point to compute the closest point for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The closest point on the triangle.
   */
  closestPointToPoint(e, t) {
    const n = this.a, r = this.b, s = this.c;
    let a, o;
    jn.subVectors(r, n), ei.subVectors(s, n), ls.subVectors(e, n);
    const c = jn.dot(ls), l = ei.dot(ls);
    if (c <= 0 && l <= 0)
      return t.copy(n);
    cs.subVectors(e, r);
    const h = jn.dot(cs), d = ei.dot(cs);
    if (h >= 0 && d <= h)
      return t.copy(r);
    const u = c * d - h * l;
    if (u <= 0 && c >= 0 && h <= 0)
      return a = c / (c - h), t.copy(n).addScaledVector(jn, a);
    hs.subVectors(e, s);
    const p = jn.dot(hs), _ = ei.dot(hs);
    if (_ >= 0 && p <= _)
      return t.copy(s);
    const M = p * l - c * _;
    if (M <= 0 && l >= 0 && _ <= 0)
      return o = l / (l - _), t.copy(n).addScaledVector(ei, o);
    const m = h * _ - p * d;
    if (m <= 0 && d - h >= 0 && p - _ >= 0)
      return So.subVectors(s, r), o = (d - h) / (d - h + (p - _)), t.copy(r).addScaledVector(So, o);
    const f = 1 / (m + M + u);
    return a = M * f, o = u * f, t.copy(n).addScaledVector(jn, a).addScaledVector(ei, o);
  }
  /**
   * Returns `true` if this triangle is equal with the given one.
   *
   * @param {Triangle} triangle - The triangle to test for equality.
   * @return {boolean} Whether this triangle is equal with the given one.
   */
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
class qn {
  /**
   * Constructs a new bounding box.
   *
   * @param {Vector3} [min=(Infinity,Infinity,Infinity)] - A vector representing the lower boundary of the box.
   * @param {Vector3} [max=(-Infinity,-Infinity,-Infinity)] - A vector representing the upper boundary of the box.
   */
  constructor(e = new U(1 / 0, 1 / 0, 1 / 0), t = new U(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  /**
   * Sets the lower and upper boundaries of this box.
   * Please note that this method only copies the values from the given objects.
   *
   * @param {Vector3} min - The lower boundary of the box.
   * @param {Vector3} max - The upper boundary of the box.
   * @return {Box3} A reference to this bounding box.
   */
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given array.
   *
   * @param {Array<number>} array - An array holding 3D position data.
   * @return {Box3} A reference to this bounding box.
   */
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t += 3)
      this.expandByPoint(Yt.fromArray(e, t));
    return this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - A buffer attribute holding 3D position data.
   * @return {Box3} A reference to this bounding box.
   */
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, n = e.count; t < n; t++)
      this.expandByPoint(Yt.fromBufferAttribute(e, t));
    return this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given array.
   *
   * @param {Array<Vector3>} points - An array holding 3D position data as instances of {@link Vector3}.
   * @return {Box3} A reference to this bounding box.
   */
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t++)
      this.expandByPoint(e[t]);
    return this;
  }
  /**
   * Centers this box on the given center vector and sets this box's width, height and
   * depth to the given size values.
   *
   * @param {Vector3} center - The center of the box.
   * @param {Vector3} size - The x, y and z dimensions of the box.
   * @return {Box3} A reference to this bounding box.
   */
  setFromCenterAndSize(e, t) {
    const n = Yt.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
  }
  /**
   * Computes the world-axis-aligned bounding box for the given 3D object
   * (including its children), accounting for the object's, and children's,
   * world transforms. The function may result in a larger box than strictly necessary.
   *
   * Note: To compute the correct bounding box, make sure the given 3D object
   * has an up-to-date world matrix that reflects the current transformation of its
   * ancestor nodes. Call `object.updateWorldMatrix( true, false )` beforehand if
   * you're unsure.
   *
   * @param {Object3D} object - The 3D object to compute the bounding box for.
   * @param {boolean} [precise=false] - If set to `true`, the method computes the smallest
   * world-axis-aligned bounding box at the expense of more computation.
   * @return {Box3} A reference to this bounding box.
   */
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  /**
   * Returns a new box with copied values from this instance.
   *
   * @return {Box3} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given box to this instance.
   *
   * @param {Box3} box - The box to copy.
   * @return {Box3} A reference to this bounding box.
   */
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  /**
   * Makes this box empty which means in encloses a zero space in 3D.
   *
   * @return {Box3} A reference to this bounding box.
   */
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  /**
   * Returns true if this box includes zero points within its bounds.
   * Note that a box with equal lower and upper bounds still includes one
   * point, the one both bounds share.
   *
   * @return {boolean} Whether this box is empty or not.
   */
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  /**
   * Returns the center point of this box.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The center point.
   */
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  /**
   * Returns the dimensions of this box.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The size.
   */
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  /**
   * Expands the boundaries of this box to include the given point.
   *
   * @param {Vector3} point - The point that should be included by the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  /**
   * Expands this box equilaterally by the given vector. The width of this
   * box will be expanded by the x component of the vector in both
   * directions. The height of this box will be expanded by the y component of
   * the vector in both directions. The depth of this box will be
   * expanded by the z component of the vector in both directions.
   *
   * @param {Vector3} vector - The vector that should expand the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  /**
   * Expands each dimension of the box by the given scalar. If negative, the
   * dimensions of the box will be contracted.
   *
   * @param {number} scalar - The scalar value that should expand the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  /**
   * Expands the boundaries of this box to include the given 3D object and
   * its children, accounting for the object's, and children's, world
   * transforms. The function may result in a larger box than strictly
   * necessary (unless the precise parameter is set to true).
   *
   * @param {Object3D} object - The 3D object that should expand the bounding box.
   * @param {boolean} precise - If set to `true`, the method expands the bounding box
   * as little as necessary at the expense of more computation.
   * @return {Box3} A reference to this bounding box.
   */
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    const n = e.geometry;
    if (n !== void 0) {
      const s = n.getAttribute("position");
      if (t === !0 && s !== void 0 && e.isInstancedMesh !== !0)
        for (let a = 0, o = s.count; a < o; a++)
          e.isMesh === !0 ? e.getVertexPosition(a, Yt) : Yt.fromBufferAttribute(s, a), Yt.applyMatrix4(e.matrixWorld), this.expandByPoint(Yt);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), tr.copy(e.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), tr.copy(n.boundingBox)), tr.applyMatrix4(e.matrixWorld), this.union(tr);
    }
    const r = e.children;
    for (let s = 0, a = r.length; s < a; s++)
      this.expandByObject(r[s], t);
    return this;
  }
  /**
   * Returns `true` if the given point lies within or on the boundaries of this box.
   *
   * @param {Vector3} point - The point to test.
   * @return {boolean} Whether the bounding box contains the given point or not.
   */
  containsPoint(e) {
    return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
  }
  /**
   * Returns `true` if this bounding box includes the entirety of the given bounding box.
   * If this box and the given one are identical, this function also returns `true`.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the bounding box contains the given bounding box or not.
   */
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  /**
   * Returns a point as a proportion of this box's width, height and depth.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} A point as a proportion of this box's width, height and depth.
   */
  getParameter(e, t) {
    return t.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
      (e.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  /**
   * Returns `true` if the given bounding box intersects with this bounding box.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the given bounding box intersects with this bounding box.
   */
  intersectsBox(e) {
    return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
  }
  /**
   * Returns `true` if the given bounding sphere intersects with this bounding box.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the given bounding sphere intersects with this bounding box.
   */
  intersectsSphere(e) {
    return this.clampPoint(e.center, Yt), Yt.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  /**
   * Returns `true` if the given plane intersects with this bounding box.
   *
   * @param {Plane} plane - The plane to test.
   * @return {boolean} Whether the given plane intersects with this bounding box.
   */
  intersectsPlane(e) {
    let t, n;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
  }
  /**
   * Returns `true` if the given triangle intersects with this bounding box.
   *
   * @param {Triangle} triangle - The triangle to test.
   * @return {boolean} Whether the given triangle intersects with this bounding box.
   */
  intersectsTriangle(e) {
    if (this.isEmpty())
      return !1;
    this.getCenter(Ti), nr.subVectors(this.max, Ti), ti.subVectors(e.a, Ti), ni.subVectors(e.b, Ti), ii.subVectors(e.c, Ti), Rn.subVectors(ni, ti), Cn.subVectors(ii, ni), Nn.subVectors(ti, ii);
    let t = [
      0,
      -Rn.z,
      Rn.y,
      0,
      -Cn.z,
      Cn.y,
      0,
      -Nn.z,
      Nn.y,
      Rn.z,
      0,
      -Rn.x,
      Cn.z,
      0,
      -Cn.x,
      Nn.z,
      0,
      -Nn.x,
      -Rn.y,
      Rn.x,
      0,
      -Cn.y,
      Cn.x,
      0,
      -Nn.y,
      Nn.x,
      0
    ];
    return !ps(t, ti, ni, ii, nr) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !ps(t, ti, ni, ii, nr)) ? !1 : (ir.crossVectors(Rn, Cn), t = [ir.x, ir.y, ir.z], ps(t, ti, ni, ii, nr));
  }
  /**
   * Clamps the given point within the bounds of this box.
   *
   * @param {Vector3} point - The point to clamp.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The clamped point.
   */
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  /**
   * Returns the euclidean distance from any edge of this box to the specified point. If
   * the given point lies inside of this box, the distance will be `0`.
   *
   * @param {Vector3} point - The point to compute the distance to.
   * @return {number} The euclidean distance.
   */
  distanceToPoint(e) {
    return this.clampPoint(e, Yt).distanceTo(e);
  }
  /**
   * Returns a bounding sphere that encloses this bounding box.
   *
   * @param {Sphere} target - The target sphere that is used to store the method's result.
   * @return {Sphere} The bounding sphere that encloses this bounding box.
   */
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(Yt).length() * 0.5), e;
  }
  /**
   * Computes the intersection of this bounding box and the given one, setting the upper
   * bound of this box to the lesser of the two boxes' upper bounds and the
   * lower bound of this box to the greater of the two boxes' lower bounds. If
   * there's no overlap, makes this box empty.
   *
   * @param {Box3} box - The bounding box to intersect with.
   * @return {Box3} A reference to this bounding box.
   */
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  /**
   * Computes the union of this box and another and the given one, setting the upper
   * bound of this box to the greater of the two boxes' upper bounds and the
   * lower bound of this box to the lesser of the two boxes' lower bounds.
   *
   * @param {Box3} box - The bounding box that will be unioned with this instance.
   * @return {Box3} A reference to this bounding box.
   */
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  /**
   * Transforms this bounding box by the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @return {Box3} A reference to this bounding box.
   */
  applyMatrix4(e) {
    return this.isEmpty() ? this : (fn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), fn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), fn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), fn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), fn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), fn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), fn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), fn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(fn), this);
  }
  /**
   * Adds the given offset to both the upper and lower bounds of this bounding box,
   * effectively moving it in 3D space.
   *
   * @param {Vector3} offset - The offset that should be used to translate the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  /**
   * Returns `true` if this bounding box is equal with the given one.
   *
   * @param {Box3} box - The box to test for equality.
   * @return {boolean} Whether this bounding box is equal with the given one.
   */
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
  /**
   * Returns a serialized structure of the bounding box.
   *
   * @return {Object} Serialized structure with fields representing the object state.
   */
  toJSON() {
    return {
      min: this.min.toArray(),
      max: this.max.toArray()
    };
  }
  /**
   * Returns a serialized structure of the bounding box.
   *
   * @param {Object} json - The serialized json to set the box from.
   * @return {Box3} A reference to this bounding box.
   */
  fromJSON(e) {
    return this.min.fromArray(e.min), this.max.fromArray(e.max), this;
  }
}
const fn = [
  /* @__PURE__ */ new U(),
  /* @__PURE__ */ new U(),
  /* @__PURE__ */ new U(),
  /* @__PURE__ */ new U(),
  /* @__PURE__ */ new U(),
  /* @__PURE__ */ new U(),
  /* @__PURE__ */ new U(),
  /* @__PURE__ */ new U()
], Yt = /* @__PURE__ */ new U(), tr = /* @__PURE__ */ new qn(), ti = /* @__PURE__ */ new U(), ni = /* @__PURE__ */ new U(), ii = /* @__PURE__ */ new U(), Rn = /* @__PURE__ */ new U(), Cn = /* @__PURE__ */ new U(), Nn = /* @__PURE__ */ new U(), Ti = /* @__PURE__ */ new U(), nr = /* @__PURE__ */ new U(), ir = /* @__PURE__ */ new U(), Fn = /* @__PURE__ */ new U();
function ps(i, e, t, n, r) {
  for (let s = 0, a = i.length - 3; s <= a; s += 3) {
    Fn.fromArray(i, s);
    const o = r.x * Math.abs(Fn.x) + r.y * Math.abs(Fn.y) + r.z * Math.abs(Fn.z), c = e.dot(Fn), l = t.dot(Fn), h = n.dot(Fn);
    if (Math.max(-Math.max(c, l, h), Math.min(c, l, h)) > o)
      return !1;
  }
  return !0;
}
const dt = /* @__PURE__ */ new U(), rr = /* @__PURE__ */ new Ne();
let Fh = 0;
class Mn extends Xn {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {TypedArray} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, n = !1) {
    if (super(), Array.isArray(e))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: Fh++ }), this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = n, this.usage = nh, this.updateRanges = [], this.gpuType = rn, this.version = 0;
  }
  /**
   * A callback function that is executed after the renderer has transferred the attribute
   * array data to the GPU.
   */
  onUploadCallback() {
  }
  /**
   * Flag to indicate that this attribute has changed and should be re-sent to
   * the GPU. Set this to `true` when you modify the value of the array.
   *
   * @type {number}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  /**
   * Sets the usage of this buffer attribute.
   *
   * @param {(StaticDrawUsage|DynamicDrawUsage|StreamDrawUsage|StaticReadUsage|DynamicReadUsage|StreamReadUsage|StaticCopyUsage|DynamicCopyUsage|StreamCopyUsage)} value - The usage to set.
   * @return {BufferAttribute} A reference to this buffer attribute.
   */
  setUsage(e) {
    return this.usage = e, this;
  }
  /**
   * Adds a range of data in the data array to be updated on the GPU.
   *
   * @param {number} start - Position at which to start update.
   * @param {number} count - The number of components to update.
   */
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  /**
   * Clears the update ranges.
   */
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  /**
   * Copies the values of the given buffer attribute to this instance.
   *
   * @param {BufferAttribute} source - The buffer attribute to copy.
   * @return {BufferAttribute} A reference to this instance.
   */
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
  }
  /**
   * Copies a vector from the given buffer attribute to this one. The start
   * and destination position in the attribute buffers are represented by the
   * given indices.
   *
   * @param {number} index1 - The destination index into this buffer attribute.
   * @param {BufferAttribute} attribute - The buffer attribute to copy from.
   * @param {number} index2 - The source index into the given buffer attribute.
   * @return {BufferAttribute} A reference to this instance.
   */
  copyAt(e, t, n) {
    e *= this.itemSize, n *= t.itemSize;
    for (let r = 0, s = this.itemSize; r < s; r++)
      this.array[e + r] = t.array[n + r];
    return this;
  }
  /**
   * Copies the given array data into this buffer attribute.
   *
   * @param {(TypedArray|Array)} array - The array to copy.
   * @return {BufferAttribute} A reference to this instance.
   */
  copyArray(e) {
    return this.array.set(e), this;
  }
  /**
   * Applies the given 3x3 matrix to the given attribute. Works with
   * item size `2` and `3`.
   *
   * @param {Matrix3} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyMatrix3(e) {
    if (this.itemSize === 2)
      for (let t = 0, n = this.count; t < n; t++)
        rr.fromBufferAttribute(this, t), rr.applyMatrix3(e), this.setXY(t, rr.x, rr.y);
    else if (this.itemSize === 3)
      for (let t = 0, n = this.count; t < n; t++)
        dt.fromBufferAttribute(this, t), dt.applyMatrix3(e), this.setXYZ(t, dt.x, dt.y, dt.z);
    return this;
  }
  /**
   * Applies the given 4x4 matrix to the given attribute. Only works with
   * item size `3`.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyMatrix4(e) {
    for (let t = 0, n = this.count; t < n; t++)
      dt.fromBufferAttribute(this, t), dt.applyMatrix4(e), this.setXYZ(t, dt.x, dt.y, dt.z);
    return this;
  }
  /**
   * Applies the given 3x3 normal matrix to the given attribute. Only works with
   * item size `3`.
   *
   * @param {Matrix3} m - The normal matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      dt.fromBufferAttribute(this, t), dt.applyNormalMatrix(e), this.setXYZ(t, dt.x, dt.y, dt.z);
    return this;
  }
  /**
   * Applies the given 4x4 matrix to the given attribute. Only works with
   * item size `3` and with direction vectors.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      dt.fromBufferAttribute(this, t), dt.transformDirection(e), this.setXYZ(t, dt.x, dt.y, dt.z);
    return this;
  }
  /**
   * Sets the given array data in the buffer attribute.
   *
   * @param {(TypedArray|Array)} value - The array data to set.
   * @param {number} [offset=0] - The offset in this buffer attribute's array.
   * @return {BufferAttribute} A reference to this instance.
   */
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  /**
   * Returns the given component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} component - The component index.
   * @return {number} The returned value.
   */
  getComponent(e, t) {
    let n = this.array[e * this.itemSize + t];
    return this.normalized && (n = ui(n, this.array)), n;
  }
  /**
   * Sets the given value to the given component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} component - The component index.
   * @param {number} value - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setComponent(e, t, n) {
    return this.normalized && (n = Ct(n, this.array)), this.array[e * this.itemSize + t] = n, this;
  }
  /**
   * Returns the x component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The x component.
   */
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = ui(t, this.array)), t;
  }
  /**
   * Sets the x component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setX(e, t) {
    return this.normalized && (t = Ct(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  /**
   * Returns the y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The y component.
   */
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = ui(t, this.array)), t;
  }
  /**
   * Sets the y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} y - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setY(e, t) {
    return this.normalized && (t = Ct(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  /**
   * Returns the z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The z component.
   */
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = ui(t, this.array)), t;
  }
  /**
   * Sets the z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} z - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setZ(e, t) {
    return this.normalized && (t = Ct(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  /**
   * Returns the w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The w component.
   */
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = ui(t, this.array)), t;
  }
  /**
   * Sets the w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} w - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setW(e, t) {
    return this.normalized && (t = Ct(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  /**
   * Sets the x and y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXY(e, t, n) {
    return e *= this.itemSize, this.normalized && (t = Ct(t, this.array), n = Ct(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
  }
  /**
   * Sets the x, y and z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @param {number} z - The value for the z component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXYZ(e, t, n, r) {
    return e *= this.itemSize, this.normalized && (t = Ct(t, this.array), n = Ct(n, this.array), r = Ct(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this;
  }
  /**
   * Sets the x, y, z and w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @param {number} z - The value for the z component to set.
   * @param {number} w - The value for the w component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXYZW(e, t, n, r, s) {
    return e *= this.itemSize, this.normalized && (t = Ct(t, this.array), n = Ct(n, this.array), r = Ct(r, this.array), s = Ct(s, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this.array[e + 3] = s, this;
  }
  /**
   * Sets the given callback function that is executed after the Renderer has transferred
   * the attribute array data to the GPU. Can be used to perform clean-up operations after
   * the upload when attribute data are not needed anymore on the CPU side.
   *
   * @param {Function} callback - The `onUpload()` callback.
   * @return {BufferAttribute} A reference to this instance.
   */
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  /**
   * Returns a new buffer attribute with copied values from this instance.
   *
   * @return {BufferAttribute} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  /**
   * Serializes the buffer attribute into JSON.
   *
   * @return {Object} A JSON object representing the serialized buffer attribute.
   */
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return e.name = this.name, e.usage = this.usage, e.gpuType = this.gpuType, e;
  }
  /**
   * Disposes of the buffer attribute. Available only in {@link WebGPURenderer}.
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class zl extends Mn {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Uint16Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, n) {
    super(new Uint16Array(e), t, n);
  }
}
class Vl extends Mn {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Uint32Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, n) {
    super(new Uint32Array(e), t, n);
  }
}
class ft extends Mn {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Float32Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, n) {
    super(new Float32Array(e), t, n);
  }
}
const Oh = /* @__PURE__ */ new qn(), wi = /* @__PURE__ */ new U(), ms = /* @__PURE__ */ new U();
class qi {
  /**
   * Constructs a new sphere.
   *
   * @param {Vector3} [center=(0,0,0)] - The center of the sphere
   * @param {number} [radius=-1] - The radius of the sphere.
   */
  constructor(e = new U(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  /**
   * Sets the sphere's components by copying the given values.
   *
   * @param {Vector3} center - The center.
   * @param {number} radius - The radius.
   * @return {Sphere} A reference to this sphere.
   */
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  /**
   * Computes the minimum bounding sphere for list of points.
   * If the optional center point is given, it is used as the sphere's
   * center. Otherwise, the center of the axis-aligned bounding box
   * encompassing the points is calculated.
   *
   * @param {Array<Vector3>} points - A list of points in 3D space.
   * @param {Vector3} [optionalCenter] - The center of the sphere.
   * @return {Sphere} A reference to this sphere.
   */
  setFromPoints(e, t) {
    const n = this.center;
    t !== void 0 ? n.copy(t) : Oh.setFromPoints(e).getCenter(n);
    let r = 0;
    for (let s = 0, a = e.length; s < a; s++)
      r = Math.max(r, n.distanceToSquared(e[s]));
    return this.radius = Math.sqrt(r), this;
  }
  /**
   * Copies the values of the given sphere to this instance.
   *
   * @param {Sphere} sphere - The sphere to copy.
   * @return {Sphere} A reference to this sphere.
   */
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  /**
   * Returns `true` if the sphere is empty (the radius set to a negative number).
   *
   * Spheres with a radius of `0` contain only their center point and are not
   * considered to be empty.
   *
   * @return {boolean} Whether this sphere is empty or not.
   */
  isEmpty() {
    return this.radius < 0;
  }
  /**
   * Makes this sphere empty which means in encloses a zero space in 3D.
   *
   * @return {Sphere} A reference to this sphere.
   */
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  /**
   * Returns `true` if this sphere contains the given point inclusive of
   * the surface of the sphere.
   *
   * @param {Vector3} point - The point to check.
   * @return {boolean} Whether this sphere contains the given point or not.
   */
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  /**
   * Returns the closest distance from the boundary of the sphere to the
   * given point. If the sphere contains the point, the distance will
   * be negative.
   *
   * @param {Vector3} point - The point to compute the distance to.
   * @return {number} The distance to the point.
   */
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  /**
   * Returns `true` if this sphere intersects with the given one.
   *
   * @param {Sphere} sphere - The sphere to test.
   * @return {boolean} Whether this sphere intersects with the given one or not.
   */
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  /**
   * Returns `true` if this sphere intersects with the given box.
   *
   * @param {Box3} box - The box to test.
   * @return {boolean} Whether this sphere intersects with the given box or not.
   */
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  /**
   * Returns `true` if this sphere intersects with the given plane.
   *
   * @param {Plane} plane - The plane to test.
   * @return {boolean} Whether this sphere intersects with the given plane or not.
   */
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  /**
   * Clamps a point within the sphere. If the point is outside the sphere, it
   * will clamp it to the closest point on the edge of the sphere. Points
   * already inside the sphere will not be affected.
   *
   * @param {Vector3} point - The plane to clamp.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The clamped point.
   */
  clampPoint(e, t) {
    const n = this.center.distanceToSquared(e);
    return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
  }
  /**
   * Returns a bounding box that encloses this sphere.
   *
   * @param {Box3} target - The target box that is used to store the method's result.
   * @return {Box3} The bounding box that encloses this sphere.
   */
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  /**
   * Transforms this sphere with the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @return {Sphere} A reference to this sphere.
   */
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  /**
   * Translates the sphere's center by the given offset.
   *
   * @param {Vector3} offset - The offset.
   * @return {Sphere} A reference to this sphere.
   */
  translate(e) {
    return this.center.add(e), this;
  }
  /**
   * Expands the boundaries of this sphere to include the given point.
   *
   * @param {Vector3} point - The point to include.
   * @return {Sphere} A reference to this sphere.
   */
  expandByPoint(e) {
    if (this.isEmpty())
      return this.center.copy(e), this.radius = 0, this;
    wi.subVectors(e, this.center);
    const t = wi.lengthSq();
    if (t > this.radius * this.radius) {
      const n = Math.sqrt(t), r = (n - this.radius) * 0.5;
      this.center.addScaledVector(wi, r / n), this.radius += r;
    }
    return this;
  }
  /**
   * Expands this sphere to enclose both the original sphere and the given sphere.
   *
   * @param {Sphere} sphere - The sphere to include.
   * @return {Sphere} A reference to this sphere.
   */
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (ms.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(wi.copy(e.center).add(ms)), this.expandByPoint(wi.copy(e.center).sub(ms))), this);
  }
  /**
   * Returns `true` if this sphere is equal with the given one.
   *
   * @param {Sphere} sphere - The sphere to test for equality.
   * @return {boolean} Whether this bounding sphere is equal with the given one.
   */
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  /**
   * Returns a new sphere with copied values from this instance.
   *
   * @return {Sphere} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Returns a serialized structure of the bounding sphere.
   *
   * @return {Object} Serialized structure with fields representing the object state.
   */
  toJSON() {
    return {
      radius: this.radius,
      center: this.center.toArray()
    };
  }
  /**
   * Returns a serialized structure of the bounding sphere.
   *
   * @param {Object} json - The serialized json to set the sphere from.
   * @return {Sphere} A reference to this bounding sphere.
   */
  fromJSON(e) {
    return this.radius = e.radius, this.center.fromArray(e.center), this;
  }
}
let Bh = 0;
const Vt = /* @__PURE__ */ new st(), gs = /* @__PURE__ */ new St(), ri = /* @__PURE__ */ new U(), Nt = /* @__PURE__ */ new qn(), Ai = /* @__PURE__ */ new qn(), xt = /* @__PURE__ */ new U();
class Dt extends Xn {
  /**
   * Constructs a new geometry.
   */
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: Bh++ }), this.uuid = xi(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {}, this._transformed = !1;
  }
  /**
   * Returns the index of this geometry.
   *
   * @return {?BufferAttribute} The index. Returns `null` if no index is defined.
   */
  getIndex() {
    return this.index;
  }
  /**
   * Sets the given index to this geometry.
   *
   * @param {Array<number>|BufferAttribute} index - The index to set.
   * @return {BufferGeometry} A reference to this instance.
   */
  setIndex(e) {
    return Array.isArray(e) ? this.index = new (ih(e) ? Vl : zl)(e, 1) : this.index = e, this;
  }
  /**
   * Sets the given indirect attribute to this geometry.
   *
   * @param {BufferAttribute} indirect - The attribute holding indirect draw calls.
   * @param {number|Array<number>} [indirectOffset=0] - The offset, in bytes, into the indirect drawing buffer where the value data begins. If an array is provided, multiple indirect draw calls will be made for each offset.
   * @return {BufferGeometry} A reference to this instance.
   */
  setIndirect(e, t = 0) {
    return this.indirect = e, this.indirectOffset = t, this;
  }
  /**
   * Returns the indirect attribute of this geometry.
   *
   * @return {?BufferAttribute} The indirect attribute. Returns `null` if no indirect attribute is defined.
   */
  getIndirect() {
    return this.indirect;
  }
  /**
   * Returns the buffer attribute for the given name.
   *
   * @param {string} name - The attribute name.
   * @return {BufferAttribute|InterleavedBufferAttribute|undefined} The buffer attribute.
   * Returns `undefined` if not attribute has been found.
   */
  getAttribute(e) {
    return this.attributes[e];
  }
  /**
   * Sets the given attribute for the given name.
   *
   * @param {string} name - The attribute name.
   * @param {BufferAttribute|InterleavedBufferAttribute} attribute - The attribute to set.
   * @return {BufferGeometry} A reference to this instance.
   */
  setAttribute(e, t) {
    return this.attributes[e] = t, this;
  }
  /**
   * Deletes the attribute for the given name.
   *
   * @param {string} name - The attribute name to delete.
   * @return {BufferGeometry} A reference to this instance.
   */
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  /**
   * Returns `true` if this geometry has an attribute for the given name.
   *
   * @param {string} name - The attribute name.
   * @return {boolean} Whether this geometry has an attribute for the given name or not.
   */
  hasAttribute(e) {
    return this.attributes[e] !== void 0;
  }
  /**
   * Adds a group to this geometry.
   *
   * @param {number} start - The first element in this draw call. That is the first
   * vertex for non-indexed geometry, otherwise the first triangle index.
   * @param {number} count - Specifies how many vertices (or indices) are part of this group.
   * @param {number} [materialIndex=0] - The material array index to use.
   */
  addGroup(e, t, n = 0) {
    this.groups.push({
      start: e,
      count: t,
      materialIndex: n
    });
  }
  /**
   * Clears all groups.
   */
  clearGroups() {
    this.groups = [];
  }
  /**
   * Sets the draw range for this geometry.
   *
   * @param {number} start - The first vertex for non-indexed geometry, otherwise the first triangle index.
   * @param {number} count - For non-indexed BufferGeometry, `count` is the number of vertices to render.
   * For indexed BufferGeometry, `count` is the number of indices to render.
   */
  setDrawRange(e, t) {
    this.drawRange.start = e, this.drawRange.count = t;
  }
  /**
   * Applies the given 4x4 transformation matrix to the geometry.
   *
   * @param {Matrix4} matrix - The matrix to apply.
   * @return {BufferGeometry} A reference to this instance.
   */
  applyMatrix4(e) {
    const t = this.attributes.position;
    t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
    const n = this.attributes.normal;
    if (n !== void 0) {
      const s = new Pe().getNormalMatrix(e);
      n.applyNormalMatrix(s), n.needsUpdate = !0;
    }
    const r = this.attributes.tangent;
    return r !== void 0 && (r.transformDirection(e), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this._transformed = !0, this;
  }
  /**
   * Applies the rotation represented by the Quaternion to the geometry.
   *
   * @param {Quaternion} q - The Quaternion to apply.
   * @return {BufferGeometry} A reference to this instance.
   */
  applyQuaternion(e) {
    return Vt.makeRotationFromQuaternion(e), this.applyMatrix4(Vt), this;
  }
  /**
   * Rotates the geometry about the X axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateX(e) {
    return Vt.makeRotationX(e), this.applyMatrix4(Vt), this;
  }
  /**
   * Rotates the geometry about the Y axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateY(e) {
    return Vt.makeRotationY(e), this.applyMatrix4(Vt), this;
  }
  /**
   * Rotates the geometry about the Z axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateZ(e) {
    return Vt.makeRotationZ(e), this.applyMatrix4(Vt), this;
  }
  /**
   * Translates the geometry. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#position} for typical
   * real-time mesh rotation.
   *
   * @param {number} x - The x offset.
   * @param {number} y - The y offset.
   * @param {number} z - The z offset.
   * @return {BufferGeometry} A reference to this instance.
   */
  translate(e, t, n) {
    return Vt.makeTranslation(e, t, n), this.applyMatrix4(Vt), this;
  }
  /**
   * Scales the geometry. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#scale} for typical
   * real-time mesh rotation.
   *
   * @param {number} x - The x scale.
   * @param {number} y - The y scale.
   * @param {number} z - The z scale.
   * @return {BufferGeometry} A reference to this instance.
   */
  scale(e, t, n) {
    return Vt.makeScale(e, t, n), this.applyMatrix4(Vt), this;
  }
  /**
   * Rotates the geometry to face a point in 3D space. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#lookAt} for typical
   * real-time mesh rotation.
   *
   * @param {Vector3} vector - The target point.
   * @return {BufferGeometry} A reference to this instance.
   */
  lookAt(e) {
    return gs.lookAt(e), gs.updateMatrix(), this.applyMatrix4(gs.matrix), this;
  }
  /**
   * Center the geometry based on its bounding box.
   *
   * @return {BufferGeometry} A reference to this instance.
   */
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(ri).negate(), this.translate(ri.x, ri.y, ri.z), this;
  }
  /**
   * Defines a geometry by creating a `position` attribute based on the given array of points. The array
   * can hold 2D or 3D vectors. When using two-dimensional data, the `z` coordinate for all vertices is
   * set to `0`.
   *
   * If the method is used with an existing `position` attribute, the vertex data are overwritten with the
   * data from the array. The length of the array must match the vertex count.
   *
   * @param {Array<Vector2>|Array<Vector3>} points - The points.
   * @return {BufferGeometry} A reference to this instance.
   */
  setFromPoints(e) {
    const t = this.getAttribute("position");
    if (t === void 0) {
      const n = [];
      for (let r = 0, s = e.length; r < s; r++) {
        const a = e[r];
        n.push(a.x, a.y, a.z || 0);
      }
      this.setAttribute("position", new ft(n, 3));
    } else {
      const n = Math.min(e.length, t.count);
      for (let r = 0; r < n; r++) {
        const s = e[r];
        t.setXYZ(r, s.x, s.y, s.z || 0);
      }
      e.length > t.count && Re("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), t.needsUpdate = !0;
    }
    return this;
  }
  /**
   * Computes the bounding box of the geometry, and updates the `boundingBox` member.
   * The bounding box is not computed by the engine; it must be computed by your app.
   * You may need to recompute the bounding box if the geometry vertices are modified.
   */
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new qn());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      Xe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(
        new U(-1 / 0, -1 / 0, -1 / 0),
        new U(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (e !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(e), t)
        for (let n = 0, r = t.length; n < r; n++) {
          const s = t[n];
          Nt.setFromBufferAttribute(s), this.morphTargetsRelative ? (xt.addVectors(this.boundingBox.min, Nt.min), this.boundingBox.expandByPoint(xt), xt.addVectors(this.boundingBox.max, Nt.max), this.boundingBox.expandByPoint(xt)) : (this.boundingBox.expandByPoint(Nt.min), this.boundingBox.expandByPoint(Nt.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && Xe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  /**
   * Computes the bounding sphere of the geometry, and updates the `boundingSphere` member.
   * The engine automatically computes the bounding sphere when it is needed, e.g., for ray casting or view frustum culling.
   * You may need to recompute the bounding sphere if the geometry vertices are modified.
   */
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new qi());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      Xe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new U(), 1 / 0);
      return;
    }
    if (e) {
      const n = this.boundingSphere.center;
      if (Nt.setFromBufferAttribute(e), t)
        for (let s = 0, a = t.length; s < a; s++) {
          const o = t[s];
          Ai.setFromBufferAttribute(o), this.morphTargetsRelative ? (xt.addVectors(Nt.min, Ai.min), Nt.expandByPoint(xt), xt.addVectors(Nt.max, Ai.max), Nt.expandByPoint(xt)) : (Nt.expandByPoint(Ai.min), Nt.expandByPoint(Ai.max));
        }
      Nt.getCenter(n);
      let r = 0;
      for (let s = 0, a = e.count; s < a; s++)
        xt.fromBufferAttribute(e, s), r = Math.max(r, n.distanceToSquared(xt));
      if (t)
        for (let s = 0, a = t.length; s < a; s++) {
          const o = t[s], c = this.morphTargetsRelative;
          for (let l = 0, h = o.count; l < h; l++)
            xt.fromBufferAttribute(o, l), c && (ri.fromBufferAttribute(e, l), xt.add(ri)), r = Math.max(r, n.distanceToSquared(xt));
        }
      this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && Xe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  /**
   * Calculates and adds a tangent attribute to this geometry.
   *
   * The computation is only supported for indexed geometries and if position, normal, and uv attributes
   * are defined. When using a tangent space normal map, prefer the MikkTSpace algorithm provided by
   * {@link BufferGeometryUtils#computeMikkTSpaceTangents} instead.
   */
  computeTangents() {
    const e = this.index, t = this.attributes;
    if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
      Xe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = t.position, r = t.normal, s = t.uv;
    let a = this.getAttribute("tangent");
    (a === void 0 || a.count !== n.count) && (a = new Mn(new Float32Array(4 * n.count), 4), this.setAttribute("tangent", a));
    const o = [], c = [];
    for (let v = 0; v < n.count; v++)
      o[v] = new U(), c[v] = new U();
    const l = new U(), h = new U(), d = new U(), u = new Ne(), p = new Ne(), _ = new Ne(), M = new U(), m = new U();
    function f(v, w, D) {
      l.fromBufferAttribute(n, v), h.fromBufferAttribute(n, w), d.fromBufferAttribute(n, D), u.fromBufferAttribute(s, v), p.fromBufferAttribute(s, w), _.fromBufferAttribute(s, D), h.sub(l), d.sub(l), p.sub(u), _.sub(u);
      const F = 1 / (p.x * _.y - _.x * p.y);
      isFinite(F) && (M.copy(h).multiplyScalar(_.y).addScaledVector(d, -p.y).multiplyScalar(F), m.copy(d).multiplyScalar(p.x).addScaledVector(h, -_.x).multiplyScalar(F), o[v].add(M), o[w].add(M), o[D].add(M), c[v].add(m), c[w].add(m), c[D].add(m));
    }
    let y = this.groups;
    y.length === 0 && (y = [{
      start: 0,
      count: e.count
    }]);
    for (let v = 0, w = y.length; v < w; ++v) {
      const D = y[v], F = D.start, V = D.count;
      for (let G = F, I = F + V; G < I; G += 3)
        f(
          e.getX(G + 0),
          e.getX(G + 1),
          e.getX(G + 2)
        );
    }
    const R = new U(), S = new U(), T = new U(), b = new U();
    function A(v) {
      T.fromBufferAttribute(r, v), b.copy(T);
      const w = o[v];
      R.copy(w), R.sub(T.multiplyScalar(T.dot(w))).normalize(), S.crossVectors(b, w);
      const F = S.dot(c[v]) < 0 ? -1 : 1;
      a.setXYZW(v, R.x, R.y, R.z, F);
    }
    for (let v = 0, w = y.length; v < w; ++v) {
      const D = y[v], F = D.start, V = D.count;
      for (let G = F, I = F + V; G < I; G += 3)
        A(e.getX(G + 0)), A(e.getX(G + 1)), A(e.getX(G + 2));
    }
    this._transformed = !0;
  }
  /**
   * Computes vertex normals for the given vertex data. For indexed geometries, the method sets
   * each vertex normal to be the average of the face normals of the faces that share that vertex.
   * For non-indexed geometries, vertices are not shared, and the method sets each vertex normal
   * to be the same as the face normal.
   */
  computeVertexNormals() {
    const e = this.index, t = this.getAttribute("position");
    if (t !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0 || n.count !== t.count)
        n = new Mn(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
      else
        for (let u = 0, p = n.count; u < p; u++)
          n.setXYZ(u, 0, 0, 0);
      const r = new U(), s = new U(), a = new U(), o = new U(), c = new U(), l = new U(), h = new U(), d = new U();
      if (e)
        for (let u = 0, p = e.count; u < p; u += 3) {
          const _ = e.getX(u + 0), M = e.getX(u + 1), m = e.getX(u + 2);
          r.fromBufferAttribute(t, _), s.fromBufferAttribute(t, M), a.fromBufferAttribute(t, m), h.subVectors(a, s), d.subVectors(r, s), h.cross(d), o.fromBufferAttribute(n, _), c.fromBufferAttribute(n, M), l.fromBufferAttribute(n, m), o.add(h), c.add(h), l.add(h), n.setXYZ(_, o.x, o.y, o.z), n.setXYZ(M, c.x, c.y, c.z), n.setXYZ(m, l.x, l.y, l.z);
        }
      else
        for (let u = 0, p = t.count; u < p; u += 3)
          r.fromBufferAttribute(t, u + 0), s.fromBufferAttribute(t, u + 1), a.fromBufferAttribute(t, u + 2), h.subVectors(a, s), d.subVectors(r, s), h.cross(d), n.setXYZ(u + 0, h.x, h.y, h.z), n.setXYZ(u + 1, h.x, h.y, h.z), n.setXYZ(u + 2, h.x, h.y, h.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  /**
   * Ensures every normal vector in a geometry will have a magnitude of `1`. This will
   * correct lighting on the geometry surfaces.
   */
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let t = 0, n = e.count; t < n; t++)
      xt.fromBufferAttribute(e, t), xt.normalize(), e.setXYZ(t, xt.x, xt.y, xt.z);
  }
  /**
   * Return a new non-index version of this indexed geometry. If the geometry
   * is already non-indexed, the method is a NOOP.
   *
   * @return {BufferGeometry} The non-indexed version of this indexed geometry.
   */
  toNonIndexed() {
    function e(o, c) {
      const l = o.array, h = o.itemSize, d = o.normalized, u = new l.constructor(c.length * h);
      let p = 0, _ = 0;
      for (let M = 0, m = c.length; M < m; M++) {
        o.isInterleavedBufferAttribute ? p = c[M] * o.data.stride + o.offset : p = c[M] * h;
        for (let f = 0; f < h; f++)
          u[_++] = l[p++];
      }
      return new Mn(u, h, d);
    }
    if (this.index === null)
      return Re("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const t = new Dt(), n = this.index.array, r = this.attributes;
    for (const o in r) {
      const c = r[o], l = e(c, n);
      t.setAttribute(o, l);
    }
    const s = this.morphAttributes;
    for (const o in s) {
      const c = [], l = s[o];
      for (let h = 0, d = l.length; h < d; h++) {
        const u = l[h], p = e(u, n);
        c.push(p);
      }
      t.morphAttributes[o] = c;
    }
    t.morphTargetsRelative = this.morphTargetsRelative;
    const a = this.groups;
    for (let o = 0, c = a.length; o < c; o++) {
      const l = a[o];
      t.addGroup(l.start, l.count, l.materialIndex);
    }
    return t;
  }
  /**
   * Serializes the geometry into JSON.
   *
   * @return {Object} A JSON object representing the serialized geometry.
   */
  toJSON() {
    const e = {
      metadata: {
        version: 4.7,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (e.uuid = this.uuid, e.type = this.parameters !== void 0 && this._transformed === !0 ? "BufferGeometry" : this.type, e.name = this.name, Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0 && this._transformed !== !0) {
      const c = this.parameters;
      for (const l in c)
        c[l] !== void 0 && (e[l] = c[l]);
      return e;
    }
    e.data = { attributes: {} };
    const t = this.index;
    t !== null && (e.data.index = {
      type: t.array.constructor.name,
      array: Array.prototype.slice.call(t.array)
    });
    const n = this.attributes;
    for (const c in n) {
      const l = n[c];
      e.data.attributes[c] = l.toJSON(e.data);
    }
    const r = {};
    let s = !1;
    for (const c in this.morphAttributes) {
      const l = this.morphAttributes[c], h = [];
      for (let d = 0, u = l.length; d < u; d++) {
        const p = l[d];
        h.push(p.toJSON(e.data));
      }
      h.length > 0 && (r[c] = h, s = !0);
    }
    s && (e.data.morphAttributes = r, e.data.morphTargetsRelative = this.morphTargetsRelative);
    const a = this.groups;
    a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
    const o = this.boundingSphere;
    return o !== null && (e.data.boundingSphere = o.toJSON()), e;
  }
  /**
   * Returns a new geometry with copied values from this instance.
   *
   * @return {BufferGeometry} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given geometry to this instance.
   *
   * @param {BufferGeometry} source - The geometry to copy.
   * @return {BufferGeometry} A reference to this instance.
   */
  copy(e) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const t = {};
    this.name = e.name;
    const n = e.index;
    n !== null && this.setIndex(n.clone());
    const r = e.attributes;
    for (const l in r) {
      const h = r[l];
      this.setAttribute(l, h.clone(t));
    }
    const s = e.morphAttributes;
    for (const l in s) {
      const h = [], d = s[l];
      for (let u = 0, p = d.length; u < p; u++)
        h.push(d[u].clone(t));
      this.morphAttributes[l] = h;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const a = e.groups;
    for (let l = 0, h = a.length; l < h; l++) {
      const d = a[l];
      this.addGroup(d.start, d.count, d.materialIndex);
    }
    const o = e.boundingBox;
    o !== null && (this.boundingBox = o.clone());
    const c = e.boundingSphere;
    return c !== null && (this.boundingSphere = c.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this._transformed = e._transformed, this;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires BufferGeometry#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const _s = /* @__PURE__ */ new U(), zh = /* @__PURE__ */ new U(), Vh = /* @__PURE__ */ new Pe();
class Ln {
  /**
   * Constructs a new plane.
   *
   * @param {Vector3} [normal=(1,0,0)] - A unit length vector defining the normal of the plane.
   * @param {number} [constant=0] - The signed distance from the origin to the plane.
   */
  constructor(e = new U(1, 0, 0), t = 0) {
    this.isPlane = !0, this.normal = e, this.constant = t;
  }
  /**
   * Sets the plane components by copying the given values.
   *
   * @param {Vector3} normal - The normal.
   * @param {number} constant - The constant.
   * @return {Plane} A reference to this plane.
   */
  set(e, t) {
    return this.normal.copy(e), this.constant = t, this;
  }
  /**
   * Sets the plane components by defining `x`, `y`, `z` as the
   * plane normal and `w` as the constant.
   *
   * @param {number} x - The value for the normal's x component.
   * @param {number} y - The value for the normal's y component.
   * @param {number} z - The value for the normal's z component.
   * @param {number} w - The constant value.
   * @return {Plane} A reference to this plane.
   */
  setComponents(e, t, n, r) {
    return this.normal.set(e, t, n), this.constant = r, this;
  }
  /**
   * Sets the plane from the given normal and coplanar point (that is a point
   * that lies onto the plane).
   *
   * @param {Vector3} normal - The normal.
   * @param {Vector3} point - A coplanar point.
   * @return {Plane} A reference to this plane.
   */
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
  }
  /**
   * Sets the plane from three coplanar points. The winding order is
   * assumed to be counter-clockwise, and determines the direction of
   * the plane normal.
   *
   * @param {Vector3} a - The first coplanar point.
   * @param {Vector3} b - The second coplanar point.
   * @param {Vector3} c - The third coplanar point.
   * @return {Plane} A reference to this plane.
   */
  setFromCoplanarPoints(e, t, n) {
    const r = _s.subVectors(n, t).cross(zh.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(r, e), this;
  }
  /**
   * Copies the values of the given plane to this instance.
   *
   * @param {Plane} plane - The plane to copy.
   * @return {Plane} A reference to this plane.
   */
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  /**
   * Normalizes the plane normal and adjusts the constant accordingly.
   *
   * @return {Plane} A reference to this plane.
   */
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this;
  }
  /**
   * Negates both the plane normal and the constant.
   *
   * @return {Plane} A reference to this plane.
   */
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  /**
   * Returns the signed distance from the given point to this plane.
   *
   * @param {Vector3} point - The point to compute the distance for.
   * @return {number} The signed distance.
   */
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  /**
   * Returns the signed distance from the given sphere to this plane.
   *
   * @param {Sphere} sphere - The sphere to compute the distance for.
   * @return {number} The signed distance.
   */
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  /**
   * Projects a the given point onto the plane.
   *
   * @param {Vector3} point - The point to project.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The projected point on the plane.
   */
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  /**
   * Returns the intersection point of the passed line and the plane. Returns
   * `null` if the line does not intersect. Returns the line's starting point if
   * the line is coplanar with the plane.
   *
   * @param {Line3} line - The line to compute the intersection for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @param {boolean} [clampToLine=true] - Whether to clamp the intersection to the line segment.
   * @return {?Vector3} The intersection point. Returns `null` if no intersection is detected.
   */
  intersectLine(e, t, n = !0) {
    const r = e.delta(_s), s = this.normal.dot(r);
    if (s === 0)
      return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
    const a = -(e.start.dot(this.normal) + this.constant) / s;
    return n === !0 && (a < 0 || a > 1) ? null : t.copy(e.start).addScaledVector(r, a);
  }
  /**
   * Returns `true` if the given line segment intersects with (passes through) the plane.
   *
   * @param {Line3} line - The line to test.
   * @return {boolean} Whether the given line segment intersects with the plane or not.
   */
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end);
    return t < 0 && n > 0 || n < 0 && t > 0;
  }
  /**
   * Returns `true` if the given bounding box intersects with the plane.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the given bounding box intersects with the plane or not.
   */
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  /**
   * Returns `true` if the given bounding sphere intersects with the plane.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the given bounding sphere intersects with the plane or not.
   */
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  /**
   * Returns a coplanar vector to the plane, by calculating the
   * projection of the normal at the origin onto the plane.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The coplanar point.
   */
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  /**
   * Apply a 4x4 matrix to the plane. The matrix must be an affine, homogeneous transform.
   *
   * The optional normal matrix can be pre-computed like so:
   * ```js
   * const optionalNormalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );
   * ```
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @param {Matrix4} [optionalNormalMatrix] - A pre-computed normal matrix.
   * @return {Plane} A reference to this plane.
   */
  applyMatrix4(e, t) {
    const n = t || Vh.getNormalMatrix(e), r = this.coplanarPoint(_s).applyMatrix4(e), s = this.normal.applyMatrix3(n).normalize();
    return this.constant = -r.dot(s), this;
  }
  /**
   * Translates the plane by the distance defined by the given offset vector.
   * Note that this only affects the plane constant and will not affect the normal vector.
   *
   * @param {Vector3} offset - The offset vector.
   * @return {Plane} A reference to this plane.
   */
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  /**
   * Returns `true` if this plane is equal with the given one.
   *
   * @param {Plane} plane - The plane to test for equality.
   * @return {boolean} Whether this plane is equal with the given one.
   */
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  /**
   * Returns a new plane with copied values from this instance.
   *
   * @return {Plane} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Returns a serialized structure of the plane.
   *
   * @return {Object} Serialized structure with fields representing the object state.
   */
  toJSON() {
    return {
      normal: this.normal.toArray(),
      constant: this.constant
    };
  }
  /**
   * Sets the plane properties from the given JSON.
   *
   * @param {Object} json - The serialized json to set the plane from.
   * @return {Plane} A reference to this plane.
   */
  fromJSON(e) {
    return this.normal.fromArray(e.normal), this.constant = e.constant, this;
  }
}
let Hh = 0;
class cn extends Xn {
  /**
   * Constructs a new material.
   */
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Hh++ }), this.uuid = xi(), this.name = "", this.type = "Material", this.blending = Ni, this.side = In, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = vl, this.blendDst = xl, this.blendEquation = hi, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Le(0, 0, 0), this.blendAlpha = 0, this.depthFunc = zi, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = $c, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = jr, this.stencilZFail = jr, this.stencilZPass = jr, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  /**
   * Sets the alpha value to be used when running an alpha test. The material
   * will not be rendered if the opacity is lower than this value.
   *
   * @type {number}
   * @readonly
   * @default 0
   */
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
  }
  /**
   * An optional callback that is executed immediately before the material is used to render a 3D object.
   *
   * This method can only be used when rendering with {@link WebGLRenderer}.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {Scene} scene - The scene.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Object3D} object - The 3D object.
   * @param {Object} group - The geometry group data.
   */
  onBeforeRender() {
  }
  /**
   * An optional callback that is executed immediately before the shader
   * program is compiled. This function is called with the shader source code
   * as a parameter. Useful for the modification of built-in materials.
   *
   * This method can only be used when rendering with {@link WebGLRenderer}. The
   * recommended approach when customizing materials is to use `WebGPURenderer` with the new
   * Node Material system and [TSL](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language).
   *
   * @param {{vertexShader:string,fragmentShader:string,uniforms:Object}} shaderobject - The object holds the uniforms and the vertex and fragment shader source.
   * @param {WebGLRenderer} renderer - A reference to the renderer.
   */
  onBeforeCompile() {
  }
  /**
   * In case {@link Material#onBeforeCompile} is used, this callback can be used to identify
   * values of settings used in `onBeforeCompile()`, so three.js can reuse a cached
   * shader or recompile the shader for this material as needed.
   *
   * This method can only be used when rendering with {@link WebGLRenderer}.
   *
   * @return {string} The custom program cache key.
   */
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  /**
   * This method can be used to set default values from parameter objects.
   * It is a generic implementation so it can be used with different types
   * of materials.
   *
   * @param {Object} [values] - The material values to set.
   */
  setValues(e) {
    if (e !== void 0)
      for (const t in e) {
        const n = e[t];
        if (n === void 0) {
          Re(`Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const r = this[t];
        if (r === void 0) {
          Re(`Material: '${t}' is not a property of THREE.${this.type}.`);
          continue;
        }
        r && r.isColor ? r.set(n) : r && r.isVector2 && n && n.isVector2 || r && r.isEuler && n && n.isEuler || r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[t] = n;
      }
  }
  /**
   * Serializes the material into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized material.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    t && (e = {
      textures: {},
      images: {}
    });
    const n = {
      metadata: {
        version: 4.7,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    n.uuid = this.uuid, n.type = this.type, n.blending = this.blending, n.side = this.side, n.shadowSide = this.shadowSide, n.vertexColors = this.vertexColors, n.opacity = this.opacity, n.transparent = this.transparent, n.blendSrc = this.blendSrc, n.blendDst = this.blendDst, n.blendEquation = this.blendEquation, n.blendSrcAlpha = this.blendSrcAlpha, n.blendDstAlpha = this.blendDstAlpha, n.blendEquationAlpha = this.blendEquationAlpha, n.blendColor = this.blendColor.getHex(), n.blendAlpha = this.blendAlpha, n.depthFunc = this.depthFunc, n.depthTest = this.depthTest, n.depthWrite = this.depthWrite, n.colorWrite = this.colorWrite, n.clipIntersection = this.clipIntersection, n.clipShadows = this.clipShadows, n.stencilWriteMask = this.stencilWriteMask, n.stencilFunc = this.stencilFunc, n.stencilRef = this.stencilRef, n.stencilFuncMask = this.stencilFuncMask, n.stencilFail = this.stencilFail, n.stencilZFail = this.stencilZFail, n.stencilZPass = this.stencilZPass, n.stencilWrite = this.stencilWrite, n.polygonOffset = this.polygonOffset, n.polygonOffsetFactor = this.polygonOffsetFactor, n.polygonOffsetUnits = this.polygonOffsetUnits, n.dithering = this.dithering, n.alphaTest = this.alphaTest, n.alphaHash = this.alphaHash, n.alphaToCoverage = this.alphaToCoverage, n.premultipliedAlpha = this.premultipliedAlpha, n.forceSinglePass = this.forceSinglePass, n.allowOverride = this.allowOverride, n.visible = this.visible, n.toneMapped = this.toneMapped, n.name = this.name, this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (n.sheenColorMap = this.sheenColorMap.toJSON(e).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (n.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid), this.dispersion !== void 0 && (n.dispersion = this.dispersion), this.retroreflectivity !== void 0 && (n.retroreflectivity = this.retroreflectivity), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapRotation !== void 0 && (n.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), Array.isArray(this.clippingPlanes) && this.clippingPlanes.length > 0 && (n.clippingPlanes = this.clippingPlanes.map((s) => s.toJSON())), this.rotation !== void 0 && (n.rotation = this.rotation), this.depthPacking !== void 0 && (n.depthPacking = this.depthPacking), this.linewidth !== void 0 && (n.linewidth = this.linewidth), this.linecap !== void 0 && (n.linecap = this.linecap), this.linejoin !== void 0 && (n.linejoin = this.linejoin), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.wireframe !== void 0 && (n.wireframe = this.wireframe), this.wireframeLinewidth !== void 0 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== void 0 && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== void 0 && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading !== void 0 && (n.flatShading = this.flatShading), this.fog !== void 0 && (n.fog = this.fog), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function r(s) {
      const a = [];
      for (const o in s) {
        const c = s[o];
        delete c.metadata, a.push(c);
      }
      return a;
    }
    if (t) {
      const s = r(e.textures), a = r(e.images);
      s.length > 0 && (n.textures = s), a.length > 0 && (n.images = a);
    }
    return n;
  }
  /**
   * Deserializes the material from the given JSON.
   *
   * @param {Object} json - The JSON holding the serialized material.
   * @param {Object<string,Texture>} textures - A dictionary holding textures referenced by the material.
   * @return {Material} A reference to this material.
   */
  fromJSON(e, t) {
    if (e.uuid !== void 0 && (this.uuid = e.uuid), e.name !== void 0 && (this.name = e.name), e.color !== void 0 && this.color !== void 0 && this.color.setHex(e.color), e.roughness !== void 0 && (this.roughness = e.roughness), e.metalness !== void 0 && (this.metalness = e.metalness), e.sheen !== void 0 && (this.sheen = e.sheen), e.sheenColor !== void 0 && (this.sheenColor = new Le().setHex(e.sheenColor)), e.sheenRoughness !== void 0 && (this.sheenRoughness = e.sheenRoughness), e.emissive !== void 0 && this.emissive !== void 0 && this.emissive.setHex(e.emissive), e.specular !== void 0 && this.specular !== void 0 && this.specular.setHex(e.specular), e.specularIntensity !== void 0 && (this.specularIntensity = e.specularIntensity), e.specularColor !== void 0 && this.specularColor !== void 0 && this.specularColor.setHex(e.specularColor), e.shininess !== void 0 && (this.shininess = e.shininess), e.clearcoat !== void 0 && (this.clearcoat = e.clearcoat), e.clearcoatRoughness !== void 0 && (this.clearcoatRoughness = e.clearcoatRoughness), e.dispersion !== void 0 && (this.dispersion = e.dispersion), e.retroreflectivity !== void 0 && (this.retroreflectivity = e.retroreflectivity), e.iridescence !== void 0 && (this.iridescence = e.iridescence), e.iridescenceIOR !== void 0 && (this.iridescenceIOR = e.iridescenceIOR), e.iridescenceThicknessRange !== void 0 && (this.iridescenceThicknessRange = e.iridescenceThicknessRange), e.transmission !== void 0 && (this.transmission = e.transmission), e.thickness !== void 0 && (this.thickness = e.thickness), e.attenuationDistance !== void 0 && (this.attenuationDistance = e.attenuationDistance), e.attenuationColor !== void 0 && this.attenuationColor !== void 0 && this.attenuationColor.setHex(e.attenuationColor), e.anisotropy !== void 0 && (this.anisotropy = e.anisotropy), e.anisotropyRotation !== void 0 && (this.anisotropyRotation = e.anisotropyRotation), e.fog !== void 0 && (this.fog = e.fog), e.flatShading !== void 0 && (this.flatShading = e.flatShading), e.blending !== void 0 && (this.blending = e.blending), e.combine !== void 0 && (this.combine = e.combine), e.side !== void 0 && (this.side = e.side), e.shadowSide !== void 0 && (this.shadowSide = e.shadowSide), e.opacity !== void 0 && (this.opacity = e.opacity), e.transparent !== void 0 && (this.transparent = e.transparent), e.alphaTest !== void 0 && (this.alphaTest = e.alphaTest), e.alphaHash !== void 0 && (this.alphaHash = e.alphaHash), e.depthFunc !== void 0 && (this.depthFunc = e.depthFunc), e.depthTest !== void 0 && (this.depthTest = e.depthTest), e.depthWrite !== void 0 && (this.depthWrite = e.depthWrite), e.colorWrite !== void 0 && (this.colorWrite = e.colorWrite), e.clippingPlanes !== void 0 && (this.clippingPlanes = e.clippingPlanes.map((n) => new Ln().fromJSON(n))), e.clipIntersection !== void 0 && (this.clipIntersection = e.clipIntersection), e.clipShadows !== void 0 && (this.clipShadows = e.clipShadows), e.depthPacking !== void 0 && (this.depthPacking = e.depthPacking), e.blendSrc !== void 0 && (this.blendSrc = e.blendSrc), e.blendDst !== void 0 && (this.blendDst = e.blendDst), e.blendEquation !== void 0 && (this.blendEquation = e.blendEquation), e.blendSrcAlpha !== void 0 && (this.blendSrcAlpha = e.blendSrcAlpha), e.blendDstAlpha !== void 0 && (this.blendDstAlpha = e.blendDstAlpha), e.blendEquationAlpha !== void 0 && (this.blendEquationAlpha = e.blendEquationAlpha), e.blendColor !== void 0 && this.blendColor !== void 0 && this.blendColor.setHex(e.blendColor), e.blendAlpha !== void 0 && (this.blendAlpha = e.blendAlpha), e.stencilWriteMask !== void 0 && (this.stencilWriteMask = e.stencilWriteMask), e.stencilFunc !== void 0 && (this.stencilFunc = e.stencilFunc), e.stencilRef !== void 0 && (this.stencilRef = e.stencilRef), e.stencilFuncMask !== void 0 && (this.stencilFuncMask = e.stencilFuncMask), e.stencilFail !== void 0 && (this.stencilFail = e.stencilFail), e.stencilZFail !== void 0 && (this.stencilZFail = e.stencilZFail), e.stencilZPass !== void 0 && (this.stencilZPass = e.stencilZPass), e.stencilWrite !== void 0 && (this.stencilWrite = e.stencilWrite), e.wireframe !== void 0 && (this.wireframe = e.wireframe), e.wireframeLinewidth !== void 0 && (this.wireframeLinewidth = e.wireframeLinewidth), e.wireframeLinecap !== void 0 && (this.wireframeLinecap = e.wireframeLinecap), e.wireframeLinejoin !== void 0 && (this.wireframeLinejoin = e.wireframeLinejoin), e.rotation !== void 0 && (this.rotation = e.rotation), e.linewidth !== void 0 && (this.linewidth = e.linewidth), e.linecap !== void 0 && (this.linecap = e.linecap), e.linejoin !== void 0 && (this.linejoin = e.linejoin), e.dashSize !== void 0 && (this.dashSize = e.dashSize), e.gapSize !== void 0 && (this.gapSize = e.gapSize), e.scale !== void 0 && (this.scale = e.scale), e.polygonOffset !== void 0 && (this.polygonOffset = e.polygonOffset), e.polygonOffsetFactor !== void 0 && (this.polygonOffsetFactor = e.polygonOffsetFactor), e.polygonOffsetUnits !== void 0 && (this.polygonOffsetUnits = e.polygonOffsetUnits), e.dithering !== void 0 && (this.dithering = e.dithering), e.alphaToCoverage !== void 0 && (this.alphaToCoverage = e.alphaToCoverage), e.premultipliedAlpha !== void 0 && (this.premultipliedAlpha = e.premultipliedAlpha), e.forceSinglePass !== void 0 && (this.forceSinglePass = e.forceSinglePass), e.allowOverride !== void 0 && (this.allowOverride = e.allowOverride), e.visible !== void 0 && (this.visible = e.visible), e.toneMapped !== void 0 && (this.toneMapped = e.toneMapped), e.userData !== void 0 && (this.userData = e.userData), e.vertexColors !== void 0 && (typeof e.vertexColors == "number" ? this.vertexColors = e.vertexColors > 0 : this.vertexColors = e.vertexColors), e.size !== void 0 && (this.size = e.size), e.sizeAttenuation !== void 0 && (this.sizeAttenuation = e.sizeAttenuation), e.map !== void 0 && (this.map = t[e.map] || null), e.matcap !== void 0 && (this.matcap = t[e.matcap] || null), e.alphaMap !== void 0 && (this.alphaMap = t[e.alphaMap] || null), e.bumpMap !== void 0 && (this.bumpMap = t[e.bumpMap] || null), e.bumpScale !== void 0 && (this.bumpScale = e.bumpScale), e.normalMap !== void 0 && (this.normalMap = t[e.normalMap] || null), e.normalMapType !== void 0 && (this.normalMapType = e.normalMapType), e.normalScale !== void 0) {
      let n = e.normalScale;
      Array.isArray(n) === !1 && (n = [n, n]), this.normalScale = new Ne().fromArray(n);
    }
    return e.displacementMap !== void 0 && (this.displacementMap = t[e.displacementMap] || null), e.displacementScale !== void 0 && (this.displacementScale = e.displacementScale), e.displacementBias !== void 0 && (this.displacementBias = e.displacementBias), e.roughnessMap !== void 0 && (this.roughnessMap = t[e.roughnessMap] || null), e.metalnessMap !== void 0 && (this.metalnessMap = t[e.metalnessMap] || null), e.emissiveMap !== void 0 && (this.emissiveMap = t[e.emissiveMap] || null), e.emissiveIntensity !== void 0 && (this.emissiveIntensity = e.emissiveIntensity), e.specularMap !== void 0 && (this.specularMap = t[e.specularMap] || null), e.specularIntensityMap !== void 0 && (this.specularIntensityMap = t[e.specularIntensityMap] || null), e.specularColorMap !== void 0 && (this.specularColorMap = t[e.specularColorMap] || null), e.envMap !== void 0 && (this.envMap = t[e.envMap] || null), e.envMapRotation !== void 0 && this.envMapRotation.fromArray(e.envMapRotation), e.envMapIntensity !== void 0 && (this.envMapIntensity = e.envMapIntensity), e.reflectivity !== void 0 && (this.reflectivity = e.reflectivity), e.refractionRatio !== void 0 && (this.refractionRatio = e.refractionRatio), e.lightMap !== void 0 && (this.lightMap = t[e.lightMap] || null), e.lightMapIntensity !== void 0 && (this.lightMapIntensity = e.lightMapIntensity), e.aoMap !== void 0 && (this.aoMap = t[e.aoMap] || null), e.aoMapIntensity !== void 0 && (this.aoMapIntensity = e.aoMapIntensity), e.gradientMap !== void 0 && (this.gradientMap = t[e.gradientMap] || null), e.clearcoatMap !== void 0 && (this.clearcoatMap = t[e.clearcoatMap] || null), e.clearcoatRoughnessMap !== void 0 && (this.clearcoatRoughnessMap = t[e.clearcoatRoughnessMap] || null), e.clearcoatNormalMap !== void 0 && (this.clearcoatNormalMap = t[e.clearcoatNormalMap] || null), e.clearcoatNormalScale !== void 0 && (this.clearcoatNormalScale = new Ne().fromArray(e.clearcoatNormalScale)), e.iridescenceMap !== void 0 && (this.iridescenceMap = t[e.iridescenceMap] || null), e.iridescenceThicknessMap !== void 0 && (this.iridescenceThicknessMap = t[e.iridescenceThicknessMap] || null), e.transmissionMap !== void 0 && (this.transmissionMap = t[e.transmissionMap] || null), e.thicknessMap !== void 0 && (this.thicknessMap = t[e.thicknessMap] || null), e.anisotropyMap !== void 0 && (this.anisotropyMap = t[e.anisotropyMap] || null), e.sheenColorMap !== void 0 && (this.sheenColorMap = t[e.sheenColorMap] || null), e.sheenRoughnessMap !== void 0 && (this.sheenRoughnessMap = t[e.sheenRoughnessMap] || null), this;
  }
  /**
   * Returns a new material with copied values from this instance.
   *
   * @return {Material} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given material to this instance.
   *
   * @param {Material} source - The material to copy.
   * @return {Material} A reference to this instance.
   */
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const t = e.clippingPlanes;
    let n = null;
    if (t !== null) {
      const r = t.length;
      n = new Array(r);
      for (let s = 0; s !== r; ++s)
        n[s] = t[s].clone();
    }
    return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.allowOverride = e.allowOverride, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires Material#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  /**
   * Setting this property to `true` indicates the engine the material
   * needs to be recompiled.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
}
const pn = /* @__PURE__ */ new U(), vs = /* @__PURE__ */ new U(), sr = /* @__PURE__ */ new U(), ar = /* @__PURE__ */ new U();
class Da {
  /**
   * Constructs a new ray.
   *
   * @param {Vector3} [origin=(0,0,0)] - The origin of the ray.
   * @param {Vector3} [direction=(0,0,-1)] - The (normalized) direction of the ray.
   */
  constructor(e = new U(), t = new U(0, 0, -1)) {
    this.origin = e, this.direction = t;
  }
  /**
   * Sets the ray's components by copying the given values.
   *
   * @param {Vector3} origin - The origin.
   * @param {Vector3} direction - The direction.
   * @return {Ray} A reference to this ray.
   */
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  /**
   * Copies the values of the given ray to this instance.
   *
   * @param {Ray} ray - The ray to copy.
   * @return {Ray} A reference to this ray.
   */
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  /**
   * Returns a vector that is located at a given distance along this ray.
   *
   * @param {number} t - The distance along the ray to retrieve a position for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} A position on the ray.
   */
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  /**
   * Adjusts the direction of the ray to point at the given vector in world space.
   *
   * @param {Vector3} v - The target position.
   * @return {Ray} A reference to this ray.
   */
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  /**
   * Shift the origin of this ray along its direction by the given distance.
   *
   * @param {number} t - The distance along the ray to interpolate.
   * @return {Ray} A reference to this ray.
   */
  recast(e) {
    return this.origin.copy(this.at(e, pn)), this;
  }
  /**
   * Returns the point along this ray that is closest to the given point.
   *
   * @param {Vector3} point - A point in 3D space to get the closet location on the ray for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The closest point on this ray.
   */
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const n = t.dot(this.direction);
    return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n);
  }
  /**
   * Returns the distance of the closest approach between this ray and the given point.
   *
   * @param {Vector3} point - A point in 3D space to compute the distance to.
   * @return {number} The distance.
   */
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  /**
   * Returns the squared distance of the closest approach between this ray and the given point.
   *
   * @param {Vector3} point - A point in 3D space to compute the distance to.
   * @return {number} The squared distance.
   */
  distanceSqToPoint(e) {
    const t = pn.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (pn.copy(this.origin).addScaledVector(this.direction, t), pn.distanceToSquared(e));
  }
  /**
   * Returns the squared distance between this ray and the given line segment.
   *
   * @param {Vector3} v0 - The start point of the line segment.
   * @param {Vector3} v1 - The end point of the line segment.
   * @param {Vector3} [optionalPointOnRay] - When provided, it receives the point on this ray that is closest to the segment.
   * @param {Vector3} [optionalPointOnSegment] - When provided, it receives the point on the line segment that is closest to this ray.
   * @return {number} The squared distance.
   */
  distanceSqToSegment(e, t, n, r) {
    vs.copy(e).add(t).multiplyScalar(0.5), sr.copy(t).sub(e).normalize(), ar.copy(this.origin).sub(vs);
    const s = e.distanceTo(t) * 0.5, a = -this.direction.dot(sr), o = ar.dot(this.direction), c = -ar.dot(sr), l = ar.lengthSq(), h = Math.abs(1 - a * a);
    let d, u, p, _;
    if (h > 0)
      if (d = a * c - o, u = a * o - c, _ = s * h, d >= 0)
        if (u >= -_)
          if (u <= _) {
            const M = 1 / h;
            d *= M, u *= M, p = d * (d + a * u + 2 * o) + u * (a * d + u + 2 * c) + l;
          } else
            u = s, d = Math.max(0, -(a * u + o)), p = -d * d + u * (u + 2 * c) + l;
        else
          u = -s, d = Math.max(0, -(a * u + o)), p = -d * d + u * (u + 2 * c) + l;
      else
        u <= -_ ? (d = Math.max(0, -(-a * s + o)), u = d > 0 ? -s : Math.min(Math.max(-s, -c), s), p = -d * d + u * (u + 2 * c) + l) : u <= _ ? (d = 0, u = Math.min(Math.max(-s, -c), s), p = u * (u + 2 * c) + l) : (d = Math.max(0, -(a * s + o)), u = d > 0 ? s : Math.min(Math.max(-s, -c), s), p = -d * d + u * (u + 2 * c) + l);
    else
      u = a > 0 ? -s : s, d = Math.max(0, -(a * u + o)), p = -d * d + u * (u + 2 * c) + l;
    return n && n.copy(this.origin).addScaledVector(this.direction, d), r && r.copy(vs).addScaledVector(sr, u), p;
  }
  /**
   * Intersects this ray with the given sphere, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Sphere} sphere - The sphere to intersect.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectSphere(e, t) {
    if (e.radius < 0) return null;
    pn.subVectors(e.center, this.origin);
    const n = pn.dot(this.direction), r = pn.dot(pn) - n * n, s = e.radius * e.radius;
    if (r > s) return null;
    const a = Math.sqrt(s - r), o = n - a, c = n + a;
    return c < 0 ? null : o < 0 ? this.at(c, t) : this.at(o, t);
  }
  /**
   * Returns `true` if this ray intersects with the given sphere.
   *
   * @param {Sphere} sphere - The sphere to intersect.
   * @return {boolean} Whether this ray intersects with the given sphere or not.
   */
  intersectsSphere(e) {
    return e.radius < 0 ? !1 : this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  /**
   * Computes the distance from the ray's origin to the given plane. Returns `null` if the ray
   * does not intersect with the plane.
   *
   * @param {Plane} plane - The plane to compute the distance to.
   * @return {?number} Whether this ray intersects with the given sphere or not.
   */
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (t === 0)
      return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(e.normal) + e.constant) / t;
    return n >= 0 ? n : null;
  }
  /**
   * Intersects this ray with the given plane, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Plane} plane - The plane to intersect.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectPlane(e, t) {
    const n = this.distanceToPlane(e);
    return n === null ? null : this.at(n, t);
  }
  /**
   * Returns `true` if this ray intersects with the given plane.
   *
   * @param {Plane} plane - The plane to intersect.
   * @return {boolean} Whether this ray intersects with the given plane or not.
   */
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    return t === 0 || e.normal.dot(this.direction) * t < 0;
  }
  /**
   * Intersects this ray with the given bounding box, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Box3} box - The box to intersect.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectBox(e, t) {
    let n, r, s, a, o, c;
    const l = 1 / this.direction.x, h = 1 / this.direction.y, d = 1 / this.direction.z, u = this.origin;
    return l >= 0 ? (n = (e.min.x - u.x) * l, r = (e.max.x - u.x) * l) : (n = (e.max.x - u.x) * l, r = (e.min.x - u.x) * l), h >= 0 ? (s = (e.min.y - u.y) * h, a = (e.max.y - u.y) * h) : (s = (e.max.y - u.y) * h, a = (e.min.y - u.y) * h), n > a || s > r || ((s > n || isNaN(n)) && (n = s), (a < r || isNaN(r)) && (r = a), d >= 0 ? (o = (e.min.z - u.z) * d, c = (e.max.z - u.z) * d) : (o = (e.max.z - u.z) * d, c = (e.min.z - u.z) * d), n > c || o > r) || ((o > n || n !== n) && (n = o), (c < r || r !== r) && (r = c), r < 0) ? null : this.at(n >= 0 ? n : r, t);
  }
  /**
   * Returns `true` if this ray intersects with the given box.
   *
   * @param {Box3} box - The box to intersect.
   * @return {boolean} Whether this ray intersects with the given box or not.
   */
  intersectsBox(e) {
    return this.intersectBox(e, pn) !== null;
  }
  /**
   * Intersects this ray with the given triangle, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Vector3} a - The first vertex of the triangle.
   * @param {Vector3} b - The second vertex of the triangle.
   * @param {Vector3} c - The third vertex of the triangle.
   * @param {boolean} backfaceCulling - Whether to use backface culling or not.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectTriangle(e, t, n, r, s) {
    const a = this.origin, o = this.direction, c = o.x, l = o.y, h = o.z, d = e.x - a.x, u = e.y - a.y, p = e.z - a.z, _ = t.x - a.x, M = t.y - a.y, m = t.z - a.z, f = n.x - a.x, y = n.y - a.y, R = n.z - a.z, S = Math.abs(c), T = Math.abs(l), b = Math.abs(h);
    let A, v, w, D, F, V, G, I, H, $, K, ne;
    if (S >= T && S >= b ? (w = c, V = d, H = _, ne = f, c >= 0 ? (A = l, v = h, D = u, F = p, G = M, I = m, $ = y, K = R) : (A = h, v = l, D = p, F = u, G = m, I = M, $ = R, K = y)) : T >= b ? (w = l, V = u, H = M, ne = y, l >= 0 ? (A = h, v = c, D = p, F = d, G = m, I = _, $ = R, K = f) : (A = c, v = h, D = d, F = p, G = _, I = m, $ = f, K = R)) : (w = h, V = p, H = m, ne = R, h >= 0 ? (A = c, v = l, D = d, F = u, G = _, I = M, $ = f, K = y) : (A = l, v = c, D = u, F = d, G = M, I = _, $ = y, K = f)), w === 0) return null;
    const X = A / w, j = v / w, te = 1 / w, we = D - X * V, Ee = F - j * V, et = G - X * H, ke = I - j * H, qe = $ - X * ne, q = K - j * ne, Q = qe * ke - q * et, _e = we * q - Ee * qe, Ce = et * Ee - ke * we;
    if (r) {
      if (Q < 0 || _e < 0 || Ce < 0) return null;
    } else if ((Q < 0 || _e < 0 || Ce < 0) && (Q > 0 || _e > 0 || Ce > 0)) return null;
    const me = Q + _e + Ce;
    if (me === 0) return null;
    const Fe = te * (Q * V + _e * H + Ce * ne);
    return (me > 0 ? Fe < 0 : Fe > 0) ? null : this.at(Fe / me, s);
  }
  /**
   * Transforms this ray with the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix4 - The transformation matrix.
   * @return {Ray} A reference to this ray.
   */
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  /**
   * Returns `true` if this ray is equal with the given one.
   *
   * @param {Ray} ray - The ray to test for equality.
   * @return {boolean} Whether this ray is equal with the given one.
   */
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  /**
   * Returns a new ray with copied values from this instance.
   *
   * @return {Ray} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
class Ia extends cn {
  /**
   * Constructs a new mesh basic material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Le(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new bn(), this.combine = Ma, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
const bo = /* @__PURE__ */ new st(), On = /* @__PURE__ */ new Da(), or = /* @__PURE__ */ new qi(), yo = /* @__PURE__ */ new U(), lr = /* @__PURE__ */ new U(), cr = /* @__PURE__ */ new U(), hr = /* @__PURE__ */ new U(), xs = /* @__PURE__ */ new U(), ur = /* @__PURE__ */ new U(), Eo = /* @__PURE__ */ new U(), dr = /* @__PURE__ */ new U();
class Bt extends St {
  /**
   * Constructs a new mesh.
   *
   * @param {BufferGeometry} [geometry] - The mesh geometry.
   * @param {Material|Array<Material>} [material] - The mesh material.
   */
  constructor(e = new Dt(), t = new Ia()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  /**
   * Sets the values of {@link Mesh#morphTargetDictionary} and {@link Mesh#morphTargetInfluences}
   * to make sure existing morph targets can influence this 3D object.
   */
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, n = Object.keys(t);
    if (n.length > 0) {
      const r = t[n[0]];
      if (r !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let s = 0, a = r.length; s < a; s++) {
          const o = r[s].name || String(s);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = s;
        }
      }
    }
  }
  /**
   * Returns the local-space position of the vertex at the given index, taking into
   * account the current animation state of both morph targets and skinning.
   *
   * @param {number} index - The vertex index.
   * @param {Vector3} target - The target object that is used to store the method's result.
   * @return {Vector3} The vertex position in local space.
   */
  getVertexPosition(e, t) {
    const n = this.geometry, r = n.attributes.position, s = n.morphAttributes.position, a = n.morphTargetsRelative;
    t.fromBufferAttribute(r, e);
    const o = this.morphTargetInfluences;
    if (s && o) {
      ur.set(0, 0, 0);
      for (let c = 0, l = s.length; c < l; c++) {
        const h = o[c], d = s[c];
        h !== 0 && (xs.fromBufferAttribute(d, e), a ? ur.addScaledVector(xs, h) : ur.addScaledVector(xs.sub(t), h));
      }
      t.add(ur);
    }
    return t;
  }
  /**
   * Returns `true` if this mesh intersects the given frustum.
   *
   * @param {Frustum|FrustumArray} frustum - The frustum to test.
   * @return {boolean} Whether this mesh intersects the given frustum or not.
   */
  intersectsFrustum(e) {
    return e.intersectsObject(this);
  }
  /**
   * Computes intersection points between a casted ray and this line.
   *
   * @param {Raycaster} raycaster - The raycaster.
   * @param {Array<Object>} intersects - The target array that holds the intersection points.
   */
  raycast(e, t) {
    const n = this.geometry, r = this.material, s = this.matrixWorld;
    r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), or.copy(n.boundingSphere), or.applyMatrix4(s), On.copy(e.ray).recast(e.near), !(or.containsPoint(On.origin) === !1 && (On.intersectSphere(or, yo) === null || On.origin.distanceToSquared(yo) > (e.far - e.near) ** 2)) && (bo.copy(s).invert(), On.copy(e.ray).applyMatrix4(bo), !(n.boundingBox !== null && On.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(e, t, On)));
  }
  _computeIntersections(e, t, n) {
    let r;
    const s = this.geometry, a = this.material, o = s.index, c = s.attributes.position, l = s.attributes.uv, h = s.attributes.uv1, d = s.attributes.normal, u = s.groups, p = s.drawRange;
    if (o !== null)
      if (Array.isArray(a))
        for (let _ = 0, M = u.length; _ < M; _++) {
          const m = u[_], f = a[m.materialIndex], y = Math.max(m.start, p.start), R = Math.min(o.count, Math.min(m.start + m.count, p.start + p.count));
          for (let S = y, T = R; S < T; S += 3) {
            const b = o.getX(S), A = o.getX(S + 1), v = o.getX(S + 2);
            r = fr(this, f, e, n, l, h, d, b, A, v), r && (r.faceIndex = Math.floor(S / 3), r.face.materialIndex = m.materialIndex, t.push(r));
          }
        }
      else {
        const _ = Math.max(0, p.start), M = Math.min(o.count, p.start + p.count);
        for (let m = _, f = M; m < f; m += 3) {
          const y = o.getX(m), R = o.getX(m + 1), S = o.getX(m + 2);
          r = fr(this, a, e, n, l, h, d, y, R, S), r && (r.faceIndex = Math.floor(m / 3), t.push(r));
        }
      }
    else if (c !== void 0)
      if (Array.isArray(a))
        for (let _ = 0, M = u.length; _ < M; _++) {
          const m = u[_], f = a[m.materialIndex], y = Math.max(m.start, p.start), R = Math.min(c.count, Math.min(m.start + m.count, p.start + p.count));
          for (let S = y, T = R; S < T; S += 3) {
            const b = S, A = S + 1, v = S + 2;
            r = fr(this, f, e, n, l, h, d, b, A, v), r && (r.faceIndex = Math.floor(S / 3), r.face.materialIndex = m.materialIndex, t.push(r));
          }
        }
      else {
        const _ = Math.max(0, p.start), M = Math.min(c.count, p.start + p.count);
        for (let m = _, f = M; m < f; m += 3) {
          const y = m, R = m + 1, S = m + 2;
          r = fr(this, a, e, n, l, h, d, y, R, S), r && (r.faceIndex = Math.floor(m / 3), t.push(r));
        }
      }
  }
}
function kh(i, e, t, n, r, s, a, o) {
  let c;
  if (e.side === Lt ? c = n.intersectTriangle(a, s, r, !0, o) : c = n.intersectTriangle(r, s, a, e.side === In, o), c === null) return null;
  dr.copy(o), dr.applyMatrix4(i.matrixWorld);
  const l = t.ray.origin.distanceTo(dr);
  return l < t.near || l > t.far ? null : {
    distance: l,
    point: dr.clone(),
    object: i
  };
}
function fr(i, e, t, n, r, s, a, o, c, l) {
  i.getVertexPosition(o, lr), i.getVertexPosition(c, cr), i.getVertexPosition(l, hr);
  const h = kh(i, e, t, n, lr, cr, hr, Eo);
  if (h) {
    const d = new U();
    $t.getBarycoord(Eo, lr, cr, hr, d), r && (h.uv = $t.getInterpolatedAttribute(r, o, c, l, d, new Ne())), s && (h.uv1 = $t.getInterpolatedAttribute(s, o, c, l, d, new Ne())), a && (h.normal = $t.getInterpolatedAttribute(a, o, c, l, d, new U()), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const u = {
      a: o,
      b: c,
      c: l,
      normal: new U(),
      materialIndex: 0
    };
    $t.getNormal(lr, cr, hr, u.normal), h.face = u, h.barycoord = d;
  }
  return h;
}
class Gh extends pt {
  /**
   * Constructs a new data texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=NearestFilter] - The mag filter value.
   * @param {number} [minFilter=NearestFilter] - The min filter value.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space.
   */
  constructor(e = null, t = 1, n = 1, r, s, a, o, c, l = bt, h = bt, d, u) {
    super(null, a, o, c, l, h, r, s, d, u), this.isDataTexture = !0, this.image = { data: e, width: t, height: n }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
const Bn = /* @__PURE__ */ new qi(), Wh = /* @__PURE__ */ new Ne(0.5, 0.5), pr = /* @__PURE__ */ new U();
class Ua {
  /**
   * Constructs a new frustum.
   *
   * @param {Plane} [p0] - The first plane that encloses the frustum.
   * @param {Plane} [p1] - The second plane that encloses the frustum.
   * @param {Plane} [p2] - The third plane that encloses the frustum.
   * @param {Plane} [p3] - The fourth plane that encloses the frustum.
   * @param {Plane} [p4] - The fifth plane that encloses the frustum.
   * @param {Plane} [p5] - The sixth plane that encloses the frustum.
   */
  constructor(e = new Ln(), t = new Ln(), n = new Ln(), r = new Ln(), s = new Ln(), a = new Ln()) {
    this.planes = [e, t, n, r, s, a];
  }
  /**
   * Sets the frustum planes by copying the given planes.
   *
   * @param {Plane} [p0] - The first plane that encloses the frustum.
   * @param {Plane} [p1] - The second plane that encloses the frustum.
   * @param {Plane} [p2] - The third plane that encloses the frustum.
   * @param {Plane} [p3] - The fourth plane that encloses the frustum.
   * @param {Plane} [p4] - The fifth plane that encloses the frustum.
   * @param {Plane} [p5] - The sixth plane that encloses the frustum.
   * @return {Frustum} A reference to this frustum.
   */
  set(e, t, n, r, s, a) {
    const o = this.planes;
    return o[0].copy(e), o[1].copy(t), o[2].copy(n), o[3].copy(r), o[4].copy(s), o[5].copy(a), this;
  }
  /**
   * Copies the values of the given frustum to this instance.
   *
   * @param {Frustum} frustum - The frustum to copy.
   * @return {Frustum} A reference to this frustum.
   */
  copy(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      t[n].copy(e.planes[n]);
    return this;
  }
  /**
   * Sets the frustum planes from the given projection matrix.
   *
   * @param {Matrix4} m - The projection matrix.
   * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} coordinateSystem - The coordinate system.
   * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
   * @return {Frustum} A reference to this frustum.
   */
  setFromProjectionMatrix(e, t = sn, n = !1) {
    const r = this.planes, s = e.elements, a = s[0], o = s[1], c = s[2], l = s[3], h = s[4], d = s[5], u = s[6], p = s[7], _ = s[8], M = s[9], m = s[10], f = s[11], y = s[12], R = s[13], S = s[14], T = s[15];
    if (r[0].setComponents(l - a, p - h, f - _, T - y).normalize(), r[1].setComponents(l + a, p + h, f + _, T + y).normalize(), r[2].setComponents(l + o, p + d, f + M, T + R).normalize(), r[3].setComponents(l - o, p - d, f - M, T - R).normalize(), n)
      r[4].setComponents(c, u, m, S).normalize(), r[5].setComponents(l - c, p - u, f - m, T - S).normalize();
    else if (r[4].setComponents(l - c, p - u, f - m, T - S).normalize(), t === sn)
      r[5].setComponents(l + c, p + u, f + m, T + S).normalize();
    else if (t === ki)
      r[5].setComponents(c, u, m, S).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  /**
   * Returns `true` if the 3D object's bounding sphere is intersecting this frustum.
   *
   * Note that the 3D object must have a geometry so that the bounding sphere can be calculated.
   *
   * @param {Object3D} object - The 3D object to test.
   * @return {boolean} Whether the 3D object's bounding sphere is intersecting this frustum or not.
   */
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), Bn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), Bn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(Bn);
  }
  /**
   * Returns `true` if the given sprite is intersecting this frustum.
   *
   * @param {Sprite} sprite - The sprite to test.
   * @return {boolean} Whether the sprite is intersecting this frustum or not.
   */
  intersectsSprite(e) {
    Bn.center.set(0, 0, 0);
    const t = Wh.distanceTo(e.center);
    return Bn.radius = 0.7071067811865476 + t, Bn.applyMatrix4(e.matrixWorld), this.intersectsSphere(Bn);
  }
  /**
   * Returns `true` if the given bounding sphere is intersecting this frustum.
   *
   * This is a fast, conservative test that favors performance over precision. It can
   * report false positives for spheres that lie outside the frustum but are not separated
   * by a single frustum plane. It never reports false negatives, so it is safe for culling.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the bounding sphere is intersecting this frustum or not.
   */
  intersectsSphere(e) {
    const t = this.planes, n = e.center, r = -e.radius;
    for (let s = 0; s < 6; s++)
      if (t[s].distanceToPoint(n) < r)
        return !1;
    return !0;
  }
  /**
   * Returns `true` if the given bounding box is intersecting this frustum.
   *
   * This is a fast, conservative test that favors performance over precision. It can
   * report false positives for large boxes that lie outside the frustum but are not
   * separated by a single frustum plane. It never reports false negatives, so it is
   * safe for culling.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the bounding box is intersecting this frustum or not.
   */
  intersectsBox(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) {
      const r = t[n];
      if (pr.x = r.normal.x > 0 ? e.max.x : e.min.x, pr.y = r.normal.y > 0 ? e.max.y : e.min.y, pr.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint(pr) < 0)
        return !1;
    }
    return !0;
  }
  /**
   * Returns `true` if the given point lies within the frustum.
   *
   * @param {Vector3} point - The point to test.
   * @return {boolean} Whether the point lies within this frustum or not.
   */
  containsPoint(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      if (t[n].distanceToPoint(e) < 0)
        return !1;
    return !0;
  }
  /**
   * Returns a new frustum with copied values from this instance.
   *
   * @return {Frustum} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
class Pr extends cn {
  /**
   * Constructs a new line basic material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isLineBasicMaterial = !0, this.type = "LineBasicMaterial", this.color = new Le(16777215), this.map = null, this.linewidth = 1, this.linecap = "round", this.linejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.linewidth = e.linewidth, this.linecap = e.linecap, this.linejoin = e.linejoin, this.fog = e.fog, this;
  }
}
const zr = /* @__PURE__ */ new U(), Vr = /* @__PURE__ */ new U(), To = /* @__PURE__ */ new st(), Ri = /* @__PURE__ */ new Da(), mr = /* @__PURE__ */ new qi(), Ms = /* @__PURE__ */ new U(), wo = /* @__PURE__ */ new U();
class Xh extends St {
  /**
   * Constructs a new line.
   *
   * @param {BufferGeometry} [geometry] - The line geometry.
   * @param {Material|Array<Material>} [material] - The line material.
   */
  constructor(e = new Dt(), t = new Pr()) {
    super(), this.isLine = !0, this.type = "Line", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  /**
   * Computes an array of distance values which are necessary for rendering dashed lines.
   * For each vertex in the geometry, the method calculates the cumulative length from the
   * current point to the very beginning of the line.
   *
   * @return {Line} A reference to this line.
   */
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position, n = [0];
      for (let r = 1, s = t.count; r < s; r++)
        zr.fromBufferAttribute(t, r - 1), Vr.fromBufferAttribute(t, r), n[r] = n[r - 1], n[r] += zr.distanceTo(Vr);
      e.setAttribute("lineDistance", new ft(n, 1));
    } else
      Re("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
  /**
   * Returns `true` if this line intersects the given frustum.
   *
   * @param {Frustum|FrustumArray} frustum - The frustum to test.
   * @return {boolean} Whether this line intersects the given frustum or not.
   */
  intersectsFrustum(e) {
    return e.intersectsObject(this);
  }
  /**
   * Computes intersection points between a casted ray and this line.
   *
   * @param {Raycaster} raycaster - The raycaster.
   * @param {Array<Object>} intersects - The target array that holds the intersection points.
   */
  raycast(e, t) {
    const n = this.geometry, r = this.matrixWorld, s = e.params.Line.threshold, a = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), mr.copy(n.boundingSphere), mr.applyMatrix4(r), mr.radius += s, e.ray.intersectsSphere(mr) === !1) return;
    To.copy(r).invert(), Ri.copy(e.ray).applyMatrix4(To);
    const o = s / ((this.scale.x + this.scale.y + this.scale.z) / 3), c = o * o, l = this.isLineSegments ? 2 : 1, h = n.index, u = n.attributes.position;
    if (h !== null) {
      const p = Math.max(0, a.start), _ = Math.min(h.count, a.start + a.count);
      for (let M = p, m = _ - 1; M < m; M += l) {
        const f = h.getX(M), y = h.getX(M + 1), R = gr(this, e, Ri, c, f, y, M);
        R && t.push(R);
      }
      if (this.isLineLoop) {
        const M = h.getX(_ - 1), m = h.getX(p), f = gr(this, e, Ri, c, M, m, _ - 1);
        f && t.push(f);
      }
    } else {
      const p = Math.max(0, a.start), _ = Math.min(u.count, a.start + a.count);
      for (let M = p, m = _ - 1; M < m; M += l) {
        const f = gr(this, e, Ri, c, M, M + 1, M);
        f && t.push(f);
      }
      if (this.isLineLoop) {
        const M = gr(this, e, Ri, c, _ - 1, p, _ - 1);
        M && t.push(M);
      }
    }
  }
  /**
   * Sets the values of {@link Line#morphTargetDictionary} and {@link Line#morphTargetInfluences}
   * to make sure existing morph targets can influence this 3D object.
   */
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, n = Object.keys(t);
    if (n.length > 0) {
      const r = t[n[0]];
      if (r !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let s = 0, a = r.length; s < a; s++) {
          const o = r[s].name || String(s);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = s;
        }
      }
    }
  }
}
function gr(i, e, t, n, r, s, a) {
  const o = i.geometry.attributes.position;
  if (zr.fromBufferAttribute(o, r), Vr.fromBufferAttribute(o, s), t.distanceSqToSegment(zr, Vr, Ms, wo) > n) return;
  Ms.applyMatrix4(i.matrixWorld);
  const l = e.ray.origin.distanceTo(Ms);
  if (!(l < e.near || l > e.far))
    return {
      distance: l,
      // What do we want? intersection point on the ray or on the segment??
      // point: raycaster.ray.at( distance ),
      point: wo.clone().applyMatrix4(i.matrixWorld),
      index: a,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: i
    };
}
const Ao = /* @__PURE__ */ new U(), Ro = /* @__PURE__ */ new U();
class Co extends Xh {
  /**
   * Constructs a new line segments.
   *
   * @param {BufferGeometry} [geometry] - The line geometry.
   * @param {Material|Array<Material>} [material] - The line material.
   */
  constructor(e, t) {
    super(e, t), this.isLineSegments = !0, this.type = "LineSegments";
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position, n = [];
      for (let r = 0, s = t.count; r < s; r += 2)
        Ao.fromBufferAttribute(t, r), Ro.fromBufferAttribute(t, r + 1), n[r] = r === 0 ? 0 : n[r - 1], n[r + 1] = n[r] + Ao.distanceTo(Ro);
      e.setAttribute("lineDistance", new ft(n, 1));
    } else
      Re("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    return this;
  }
}
class Ii extends cn {
  /**
   * Constructs a new points material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isPointsMaterial = !0, this.type = "PointsMaterial", this.color = new Le(16777215), this.map = null, this.alphaMap = null, this.size = 1, this.sizeAttenuation = !0, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.alphaMap = e.alphaMap, this.size = e.size, this.sizeAttenuation = e.sizeAttenuation, this.fog = e.fog, this;
  }
}
const Po = /* @__PURE__ */ new st(), pa = /* @__PURE__ */ new Da(), _r = /* @__PURE__ */ new qi(), vr = /* @__PURE__ */ new U();
class Ss extends St {
  /**
   * Constructs a new point cloud.
   *
   * @param {BufferGeometry} [geometry] - The points geometry.
   * @param {Material|Array<Material>} [material] - The points material.
   */
  constructor(e = new Dt(), t = new Ii()) {
    super(), this.isPoints = !0, this.type = "Points", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  /**
   * Returns `true` if this point cloud intersects the given frustum.
   *
   * @param {Frustum|FrustumArray} frustum - The frustum to test.
   * @return {boolean} Whether this point cloud intersects the given frustum or not.
   */
  intersectsFrustum(e) {
    return e.intersectsObject(this);
  }
  /**
   * Computes intersection points between a casted ray and this point cloud.
   *
   * @param {Raycaster} raycaster - The raycaster.
   * @param {Array<Object>} intersects - The target array that holds the intersection points.
   */
  raycast(e, t) {
    const n = this.geometry, r = this.matrixWorld, s = e.params.Points.threshold, a = n.drawRange;
    if (n.boundingSphere === null && n.computeBoundingSphere(), _r.copy(n.boundingSphere), _r.applyMatrix4(r), _r.radius += s, e.ray.intersectsSphere(_r) === !1) return;
    Po.copy(r).invert(), pa.copy(e.ray).applyMatrix4(Po);
    const o = s / ((this.scale.x + this.scale.y + this.scale.z) / 3), c = o * o, l = n.index, d = n.attributes.position;
    if (l !== null) {
      const u = Math.max(0, a.start), p = Math.min(l.count, a.start + a.count);
      for (let _ = u, M = p; _ < M; _++) {
        const m = l.getX(_);
        vr.fromBufferAttribute(d, m), Lo(vr, m, c, r, e, t, this);
      }
    } else {
      const u = Math.max(0, a.start), p = Math.min(d.count, a.start + a.count);
      for (let _ = u, M = p; _ < M; _++)
        vr.fromBufferAttribute(d, _), Lo(vr, _, c, r, e, t, this);
    }
  }
  /**
   * Sets the values of {@link Points#morphTargetDictionary} and {@link Points#morphTargetInfluences}
   * to make sure existing morph targets can influence this 3D object.
   */
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, n = Object.keys(t);
    if (n.length > 0) {
      const r = t[n[0]];
      if (r !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let s = 0, a = r.length; s < a; s++) {
          const o = r[s].name || String(s);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = s;
        }
      }
    }
  }
}
function Lo(i, e, t, n, r, s, a) {
  const o = pa.distanceSqToPoint(i);
  if (o < t) {
    const c = new U();
    pa.closestPointToPoint(i, c), c.applyMatrix4(n);
    const l = r.ray.origin.distanceTo(c);
    if (l < r.near || l > r.far) return;
    s.push({
      distance: l,
      distanceToRay: Math.sqrt(o),
      point: c,
      index: e,
      face: null,
      faceIndex: null,
      barycoord: null,
      object: a
    });
  }
}
class Hl extends pt {
  /**
   * Constructs a new cube texture.
   *
   * @param {Array<Image>} [images=[]] - An array holding a image for each side of a cube.
   * @param {number} [mapping=CubeReflectionMapping] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space value.
   */
  constructor(e = [], t = Gn, n, r, s, a, o, c, l, h) {
    super(e, t, n, r, s, a, o, c, l, h), this.isCubeTexture = !0, this.flipY = !1;
  }
  /**
   * Alias for {@link CubeTexture#image}.
   *
   * @type {Array<Image>}
   */
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class Xi extends pt {
  /**
   * Constructs a new depth texture.
   *
   * @param {number} width - The width of the texture.
   * @param {number} height - The height of the texture.
   * @param {number} [type=UnsignedIntType] - The texture type.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearFilter] - The min filter value.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {number} [format=DepthFormat] - The texture format.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(e, t, n = on, r, s, a, o = bt, c = bt, l, h = Sn, d = 1) {
    if (h !== Sn && h !== Hn)
      throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    const u = { width: e, height: t, depth: d };
    super(u, r, s, a, o, c, h, n, l), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.source = new Pa(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.compareFunction = this.compareFunction, t;
  }
}
class qh extends Xi {
  /**
   * Constructs a new cube depth texture.
   *
   * @param {number} size - The size (width and height) of each cube face.
   * @param {number} [type=UnsignedIntType] - The texture type.
   * @param {number} [mapping=CubeReflectionMapping] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=NearestFilter] - The mag filter value.
   * @param {number} [minFilter=NearestFilter] - The min filter value.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {number} [format=DepthFormat] - The texture format.
   */
  constructor(e, t = on, n = Gn, r, s, a = bt, o = bt, c, l = Sn) {
    const h = { width: e, height: e, depth: 1 }, d = [h, h, h, h, h, h];
    super(e, e, t, n, r, s, a, o, c, l), this.image = d, this.isCubeDepthTexture = !0, this.isCubeTexture = !0;
  }
  /**
   * Alias for {@link CubeDepthTexture#image}.
   *
   * @type {Array<Image>}
   */
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class kl extends pt {
  /**
   * Creates a new raw texture.
   *
   * @param {?(WebGLTexture|GPUTexture)} [sourceTexture=null] - The external texture.
   */
  constructor(e = null) {
    super(), this.sourceTexture = e, this.isExternalTexture = !0;
  }
  copy(e) {
    return super.copy(e), this.sourceTexture = e.sourceTexture, this;
  }
}
class Yi extends Dt {
  /**
   * Constructs a new box geometry.
   *
   * @param {number} [width=1] - The width. That is, the length of the edges parallel to the X axis.
   * @param {number} [height=1] - The height. That is, the length of the edges parallel to the Y axis.
   * @param {number} [depth=1] - The depth. That is, the length of the edges parallel to the Z axis.
   * @param {number} [widthSegments=1] - Number of segmented rectangular faces along the width of the sides.
   * @param {number} [heightSegments=1] - Number of segmented rectangular faces along the height of the sides.
   * @param {number} [depthSegments=1] - Number of segmented rectangular faces along the depth of the sides.
   */
  constructor(e = 1, t = 1, n = 1, r = 1, s = 1, a = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: e,
      height: t,
      depth: n,
      widthSegments: r,
      heightSegments: s,
      depthSegments: a
    };
    const o = this;
    r = Math.floor(r), s = Math.floor(s), a = Math.floor(a);
    const c = [], l = [], h = [], d = [];
    let u = 0, p = 0;
    _("z", "y", "x", -1, -1, n, t, e, a, s, 0), _("z", "y", "x", 1, -1, n, t, -e, a, s, 1), _("x", "z", "y", 1, 1, e, n, t, r, a, 2), _("x", "z", "y", 1, -1, e, n, -t, r, a, 3), _("x", "y", "z", 1, -1, e, t, n, r, s, 4), _("x", "y", "z", -1, -1, e, t, -n, r, s, 5), this.setIndex(c), this.setAttribute("position", new ft(l, 3)), this.setAttribute("normal", new ft(h, 3)), this.setAttribute("uv", new ft(d, 2));
    function _(M, m, f, y, R, S, T, b, A, v, w) {
      const D = S / A, F = T / v, V = S / 2, G = T / 2, I = b / 2, H = A + 1, $ = v + 1;
      let K = 0, ne = 0;
      const X = new U();
      for (let j = 0; j < $; j++) {
        const te = j * F - G;
        for (let we = 0; we < H; we++) {
          const Ee = we * D - V;
          X[M] = Ee * y, X[m] = te * R, X[f] = I, l.push(X.x, X.y, X.z), X[M] = 0, X[m] = 0, X[f] = b > 0 ? 1 : -1, h.push(X.x, X.y, X.z), d.push(we / A), d.push(1 - j / v), K += 1;
        }
      }
      for (let j = 0; j < v; j++)
        for (let te = 0; te < A; te++) {
          const we = u + te + H * j, Ee = u + te + H * (j + 1), et = u + (te + 1) + H * (j + 1), ke = u + (te + 1) + H * j;
          c.push(we, Ee, ke), c.push(Ee, et, ke), ne += 6;
        }
      o.addGroup(p, ne, w), p += ne, u += K;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {BoxGeometry} A new instance.
   */
  static fromJSON(e) {
    return new Yi(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
class Wr extends Dt {
  /**
   * Constructs a new plane geometry.
   *
   * @param {number} [width=1] - The width along the X axis.
   * @param {number} [height=1] - The height along the Y axis
   * @param {number} [widthSegments=1] - The number of segments along the X axis.
   * @param {number} [heightSegments=1] - The number of segments along the Y axis.
   */
  constructor(e = 1, t = 1, n = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: e,
      height: t,
      widthSegments: n,
      heightSegments: r
    };
    const s = e / 2, a = t / 2, o = Math.floor(n), c = Math.floor(r), l = o + 1, h = c + 1, d = e / o, u = t / c, p = [], _ = [], M = [], m = [];
    for (let f = 0; f < h; f++) {
      const y = f * u - a;
      for (let R = 0; R < l; R++) {
        const S = R * d - s;
        _.push(S, -y, 0), M.push(0, 0, 1), m.push(R / o), m.push(1 - f / c);
      }
    }
    for (let f = 0; f < c; f++)
      for (let y = 0; y < o; y++) {
        const R = y + l * f, S = y + l * (f + 1), T = y + 1 + l * (f + 1), b = y + 1 + l * f;
        p.push(R, S, b), p.push(S, T, b);
      }
    this.setIndex(p), this.setAttribute("position", new ft(_, 3)), this.setAttribute("normal", new ft(M, 3)), this.setAttribute("uv", new ft(m, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {PlaneGeometry} A new instance.
   */
  static fromJSON(e) {
    return new Wr(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
class Na extends Dt {
  /**
   * Constructs a new sphere geometry.
   *
   * @param {number} [radius=1] - The sphere radius.
   * @param {number} [widthSegments=32] - The number of horizontal segments. Minimum value is `3`.
   * @param {number} [heightSegments=16] - The number of vertical segments. Minimum value is `2`.
   * @param {number} [phiStart=0] - The horizontal starting angle in radians.
   * @param {number} [phiLength=Math.PI*2] - The horizontal sweep angle size.
   * @param {number} [thetaStart=0] - The vertical starting angle in radians.
   * @param {number} [thetaLength=Math.PI] - The vertical sweep angle size.
   */
  constructor(e = 1, t = 32, n = 16, r = 0, s = Math.PI * 2, a = 0, o = Math.PI) {
    super(), this.type = "SphereGeometry", this.parameters = {
      radius: e,
      widthSegments: t,
      heightSegments: n,
      phiStart: r,
      phiLength: s,
      thetaStart: a,
      thetaLength: o
    }, t = Math.max(3, Math.floor(t)), n = Math.max(2, Math.floor(n));
    const c = Math.min(a + o, Math.PI);
    let l = 0;
    const h = [], d = new U(), u = new U(), p = [], _ = [], M = [], m = [];
    for (let f = 0; f <= n; f++) {
      const y = [], R = f / n, S = a + R * o, T = e * Math.cos(S), b = Math.sqrt(e * e - T * T);
      let A = 0;
      f === 0 && a === 0 ? A = 0.5 / t : f === n && c === Math.PI && (A = -0.5 / t);
      for (let v = 0; v <= t; v++) {
        const w = v / t, D = r + w * s;
        d.x = -b * Math.cos(D), d.y = T, d.z = b * Math.sin(D), _.push(d.x, d.y, d.z), u.copy(d).normalize(), M.push(u.x, u.y, u.z), m.push(w + A, 1 - R), y.push(l++);
      }
      h.push(y);
    }
    for (let f = 0; f < n; f++)
      for (let y = 0; y < t; y++) {
        const R = h[f][y + 1], S = h[f][y], T = h[f + 1][y], b = h[f + 1][y + 1];
        (f !== 0 || a > 0) && p.push(R, S, b), (f !== n - 1 || c < Math.PI) && p.push(S, T, b);
      }
    this.setIndex(p), this.setAttribute("position", new ft(_, 3)), this.setAttribute("normal", new ft(M, 3)), this.setAttribute("uv", new ft(m, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {SphereGeometry} A new instance.
   */
  static fromJSON(e) {
    return new Na(e.radius, e.widthSegments, e.heightSegments, e.phiStart, e.phiLength, e.thetaStart, e.thetaLength);
  }
}
function vi(i) {
  const e = {};
  for (const t in i) {
    e[t] = {};
    for (const n in i[t]) {
      const r = i[t][n];
      if (Do(r))
        r.isRenderTargetTexture ? (Re("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[t][n] = null) : e[t][n] = r.clone();
      else if (Array.isArray(r))
        if (Do(r[0])) {
          const s = [];
          for (let a = 0, o = r.length; a < o; a++)
            s[a] = r[a].clone();
          e[t][n] = s;
        } else
          e[t][n] = r.slice();
      else
        e[t][n] = r;
    }
  }
  return e;
}
function Pt(i) {
  const e = {};
  for (let t = 0; t < i.length; t++) {
    const n = vi(i[t]);
    for (const r in n)
      e[r] = n[r];
  }
  return e;
}
function Do(i) {
  return i && (i.isColor || i.isMatrix3 || i.isMatrix4 || i.isVector2 || i.isVector3 || i.isVector4 || i.isTexture || i.isQuaternion);
}
function Yh(i) {
  const e = [];
  for (let t = 0; t < i.length; t++)
    e.push(i[t].clone());
  return e;
}
function Gl(i) {
  const e = i.getRenderTarget();
  return e === null ? i.outputColorSpace : e.isXRRenderTarget === !0 ? e.texture.colorSpace : Oe.workingColorSpace;
}
const Kh = { clone: vi, merge: Pt };
var $h = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, Zh = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class Jt extends cn {
  /**
   * Constructs a new shader material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = $h, this.fragmentShader = Zh, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      // set to use vertex shader clipping
      multiDraw: !1
      // set to use vertex shader multi_draw / enable gl_DrawID
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = vi(e.uniforms), this.uniformsGroups = Yh(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this.defaultAttributeValues = Object.assign({}, e.defaultAttributeValues), this.index0AttributeName = e.index0AttributeName, this.uniformsNeedUpdate = e.uniformsNeedUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const r in this.uniforms) {
      const a = this.uniforms[r].value;
      a && a.isTexture ? t.uniforms[r] = {
        type: "t",
        value: a.toJSON(e).uuid
      } : a && a.isColor ? t.uniforms[r] = {
        type: "c",
        value: a.getHex()
      } : a && a.isVector2 ? t.uniforms[r] = {
        type: "v2",
        value: a.toArray()
      } : a && a.isVector3 ? t.uniforms[r] = {
        type: "v3",
        value: a.toArray()
      } : a && a.isVector4 ? t.uniforms[r] = {
        type: "v4",
        value: a.toArray()
      } : a && a.isMatrix3 ? t.uniforms[r] = {
        type: "m3",
        value: a.toArray()
      } : a && a.isMatrix4 ? t.uniforms[r] = {
        type: "m4",
        value: a.toArray()
      } : t.uniforms[r] = {
        value: a
      };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
    const n = {};
    for (const r in this.extensions)
      this.extensions[r] === !0 && (n[r] = !0);
    return Object.keys(n).length > 0 && (t.extensions = n), t;
  }
  /**
   * Deserializes the material from the given JSON.
   *
   * @param {Object} json - The JSON holding the serialized material.
   * @param {Object<string,Texture>} textures - A dictionary holding textures referenced by the material.
   * @return {ShaderMaterial} A reference to this material.
   */
  fromJSON(e, t) {
    if (super.fromJSON(e, t), e.uniforms !== void 0)
      for (const n in e.uniforms) {
        const r = e.uniforms[n];
        switch (this.uniforms[n] = {}, r.type) {
          case "t":
            this.uniforms[n].value = t[r.value] || null;
            break;
          case "c":
            this.uniforms[n].value = new Le().setHex(r.value);
            break;
          case "v2":
            this.uniforms[n].value = new Ne().fromArray(r.value);
            break;
          case "v3":
            this.uniforms[n].value = new U().fromArray(r.value);
            break;
          case "v4":
            this.uniforms[n].value = new lt().fromArray(r.value);
            break;
          case "m3":
            this.uniforms[n].value = new Pe().fromArray(r.value);
            break;
          case "m4":
            this.uniforms[n].value = new st().fromArray(r.value);
            break;
          default:
            this.uniforms[n].value = r.value;
        }
      }
    if (e.defines !== void 0 && (this.defines = e.defines), e.vertexShader !== void 0 && (this.vertexShader = e.vertexShader), e.fragmentShader !== void 0 && (this.fragmentShader = e.fragmentShader), e.glslVersion !== void 0 && (this.glslVersion = e.glslVersion), e.extensions !== void 0)
      for (const n in e.extensions)
        this.extensions[n] = e.extensions[n];
    return e.lights !== void 0 && (this.lights = e.lights), e.clipping !== void 0 && (this.clipping = e.clipping), this;
  }
}
class Jh extends Jt {
  /**
   * Constructs a new raw shader material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(e), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
  }
}
class h_ extends cn {
  /**
   * Constructs a new mesh standard material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isMeshStandardMaterial = !0, this.type = "MeshStandardMaterial", this.defines = { STANDARD: "" }, this.color = new Le(16777215), this.roughness = 1, this.metalness = 0, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Le(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = Fr, this.normalScale = new Ne(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.roughnessMap = null, this.metalnessMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new bn(), this.envMapIntensity = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.defines = { STANDARD: "" }, this.color.copy(e.color), this.roughness = e.roughness, this.metalness = e.metalness, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.roughnessMap = e.roughnessMap, this.metalnessMap = e.metalnessMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.envMapIntensity = e.envMapIntensity, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}
class Fa extends cn {
  /**
   * Constructs a new mesh phong material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isMeshPhongMaterial = !0, this.type = "MeshPhongMaterial", this.color = new Le(16777215), this.specular = new Le(1118481), this.shininess = 30, this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.emissive = new Le(0), this.emissiveIntensity = 1, this.emissiveMap = null, this.bumpMap = null, this.bumpScale = 1, this.normalMap = null, this.normalMapType = Fr, this.normalScale = new Ne(1, 1), this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new bn(), this.combine = Ma, this.reflectivity = 1, this.envMapIntensity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.flatShading = !1, this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.specular.copy(e.specular), this.shininess = e.shininess, this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.emissive.copy(e.emissive), this.emissiveMap = e.emissiveMap, this.emissiveIntensity = e.emissiveIntensity, this.bumpMap = e.bumpMap, this.bumpScale = e.bumpScale, this.normalMap = e.normalMap, this.normalMapType = e.normalMapType, this.normalScale.copy(e.normalScale), this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.envMapIntensity = e.envMapIntensity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.flatShading = e.flatShading, this.fog = e.fog, this;
  }
}
class Qh extends cn {
  /**
   * Constructs a new mesh depth material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = Yc, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}
class jh extends cn {
  /**
   * Constructs a new mesh distance material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
}
const Bi = {
  /**
   * Whether caching is enabled or not.
   *
   * @static
   * @type {boolean}
   * @default false
   */
  enabled: !1,
  /**
   * A dictionary that holds cached files.
   *
   * @static
   * @type {Object<string,Object>}
   */
  files: {},
  /**
   * Adds a cache entry with a key to reference the file. If this key already
   * holds a file, it is overwritten.
   *
   * @static
   * @param {string} key - The key to reference the cached file.
   * @param {Object} file -  The file to be cached.
   */
  add: function(i, e) {
    this.enabled !== !1 && (Io(i) || (this.files[i] = e));
  },
  /**
   * Gets the cached value for the given key.
   *
   * @static
   * @param {string} key - The key to reference the cached file.
   * @return {Object|undefined} The cached file. If the key does not exist `undefined` is returned.
   */
  get: function(i) {
    if (this.enabled !== !1 && !Io(i))
      return this.files[i];
  },
  /**
   * Removes the cached file associated with the given key.
   *
   * @static
   * @param {string} key - The key to reference the cached file.
   */
  remove: function(i) {
    delete this.files[i];
  },
  /**
   * Remove all values from the cache.
   *
   * @static
   */
  clear: function() {
    this.files = {};
  }
};
function Io(i) {
  try {
    const e = i.slice(i.indexOf(":") + 1);
    return new URL(e).protocol === "blob:";
  } catch {
    return !1;
  }
}
class Wl {
  /**
   * Constructs a new loading manager.
   *
   * @param {Function} [onLoad] - Executes when all items have been loaded.
   * @param {Function} [onProgress] - Executes when single items have been loaded.
   * @param {Function} [onError] - Executes when an error occurs.
   */
  constructor(e, t, n) {
    const r = this;
    let s = !1, a = 0, o = 0, c;
    const l = [];
    this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = n, this._abortController = null, this.itemStart = function(h) {
      o++, s === !1 && r.onStart !== void 0 && r.onStart(h, a, o), s = !0;
    }, this.itemEnd = function(h) {
      a++, r.onProgress !== void 0 && r.onProgress(h, a, o), a === o && (s = !1, r.onLoad !== void 0 && r.onLoad());
    }, this.itemError = function(h) {
      r.onError !== void 0 && r.onError(h);
    }, this.resolveURL = function(h) {
      return h = h.normalize("NFC"), c ? c(h) : h;
    }, this.setURLModifier = function(h) {
      return c = h, this;
    }, this.addHandler = function(h, d) {
      return l.push(h, d), this;
    }, this.removeHandler = function(h) {
      const d = l.indexOf(h);
      return d !== -1 && l.splice(d, 2), this;
    }, this.getHandler = function(h) {
      for (let d = 0, u = l.length; d < u; d += 2) {
        const p = l[d], _ = l[d + 1];
        if (p.global && (p.lastIndex = 0), p.test(h))
          return _;
      }
      return null;
    }, this.abort = function() {
      return this.abortController.abort(), this._abortController = null, this;
    };
  }
  // TODO: Revert this back to a single member variable once this issue has been fixed
  // https://github.com/cloudflare/workerd/issues/3657
  /**
   * Used for aborting ongoing requests in loaders using this manager.
   *
   * @type {AbortController}
   */
  get abortController() {
    return this._abortController || (this._abortController = new AbortController()), this._abortController;
  }
}
const Xl = /* @__PURE__ */ new Wl();
class Si {
  /**
   * Constructs a new loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    this.manager = e !== void 0 ? e : Xl, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {}, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  /**
   * This method needs to be implemented by all concrete loaders. It holds the
   * logic for loading assets from the backend.
   *
   * @abstract
   * @param {string} url - The path/URL of the file to be loaded.
   * @param {Function} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} [onProgress] - Executed while the loading is in progress.
   * @param {onErrorCallback} [onError] - Executed when errors occur.
   */
  load() {
  }
  /**
   * A async version of {@link Loader#load}.
   *
   * @param {string} url - The path/URL of the file to be loaded.
   * @param {onProgressCallback} [onProgress] - Executed while the loading is in progress.
   * @return {Promise} A Promise that resolves when the asset has been loaded.
   */
  loadAsync(e, t) {
    const n = this;
    return new Promise(function(r, s) {
      n.load(e, r, t, s);
    });
  }
  /**
   * This method needs to be implemented by all concrete loaders. It holds the
   * logic for parsing the asset into three.js entities.
   *
   * @abstract
   * @param {any} data - The data to parse.
   */
  parse() {
  }
  /**
   * Sets the `crossOrigin` String to implement CORS for loading the URL
   * from a different domain that allows CORS.
   *
   * @param {string} crossOrigin - The `crossOrigin` value.
   * @return {Loader} A reference to this instance.
   */
  setCrossOrigin(e) {
    return this.crossOrigin = e, this;
  }
  /**
   * Whether the XMLHttpRequest uses credentials such as cookies, authorization
   * headers or TLS client certificates, see [XMLHttpRequest.withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials).
   *
   * Note: This setting has no effect if you are loading files locally or from the same domain.
   *
   * @param {boolean} value - The `withCredentials` value.
   * @return {Loader} A reference to this instance.
   */
  setWithCredentials(e) {
    return this.withCredentials = e, this;
  }
  /**
   * Sets the base path for the asset.
   *
   * @param {string} path - The base path.
   * @return {Loader} A reference to this instance.
   */
  setPath(e) {
    return this.path = e, this;
  }
  /**
   * Sets the base path for dependent resources like textures.
   *
   * @param {string} resourcePath - The resource path.
   * @return {Loader} A reference to this instance.
   */
  setResourcePath(e) {
    return this.resourcePath = e, this;
  }
  /**
   * Sets the given request header.
   *
   * @param {Object} requestHeader - A [request header](https://developer.mozilla.org/en-US/docs/Glossary/Request_header)
   * for configuring the HTTP request.
   * @return {Loader} A reference to this instance.
   */
  setRequestHeader(e) {
    return this.requestHeader = e, this;
  }
  /**
   * This method can be implemented in loaders for aborting ongoing requests.
   *
   * @abstract
   * @return {Loader} A reference to this instance.
   */
  abort() {
    return this;
  }
}
Si.DEFAULT_MATERIAL_NAME = "__DEFAULT";
const mn = {};
class eu extends Error {
  constructor(e, t) {
    super(e), this.response = t;
  }
}
class ql extends Si {
  /**
   * Constructs a new file loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e), this.mimeType = "", this.responseType = "", this._abortController = new AbortController();
  }
  /**
   * Starts loading from the given URL and pass the loaded response to the `onLoad()` callback.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(any)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} [onProgress] - Executed while the loading is in progress.
   * @param {onErrorCallback} [onError] - Executed when errors occur.
   */
  load(e, t, n, r) {
    e === void 0 && (e = ""), this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
    const s = Bi.get(`file:${e}`);
    if (s !== void 0) {
      this.manager.itemStart(e), setTimeout(() => {
        t && t(s), this.manager.itemEnd(e);
      }, 0);
      return;
    }
    if (mn[e] !== void 0) {
      mn[e].push({
        onLoad: t,
        onProgress: n,
        onError: r
      });
      return;
    }
    mn[e] = [], mn[e].push({
      onLoad: t,
      onProgress: n,
      onError: r
    });
    const a = new Request(e, {
      headers: new Headers(this.requestHeader),
      credentials: this.withCredentials ? "include" : "same-origin",
      signal: typeof AbortSignal.any == "function" ? AbortSignal.any([this._abortController.signal, this.manager.abortController.signal]) : this._abortController.signal
    }), o = this.mimeType, c = this.responseType;
    fetch(a).then((l) => {
      if (l.status === 200 || l.status === 0) {
        if (l.status === 0 && Re("FileLoader: HTTP Status 0 received."), typeof ReadableStream > "u" || l.body === void 0 || l.body.getReader === void 0)
          return l;
        const h = mn[e], d = l.body.getReader(), u = l.headers.get("X-File-Size") || l.headers.get("Content-Length"), p = u ? parseInt(u) : 0, _ = p !== 0;
        let M = 0;
        const m = new ReadableStream({
          start(f) {
            y();
            function y() {
              d.read().then(({ done: R, value: S }) => {
                if (R)
                  f.close();
                else {
                  M += S.byteLength;
                  const T = new ProgressEvent("progress", { lengthComputable: _, loaded: M, total: p });
                  for (let b = 0, A = h.length; b < A; b++) {
                    const v = h[b];
                    v.onProgress && v.onProgress(T);
                  }
                  f.enqueue(S), y();
                }
              }, (R) => {
                f.error(R);
              });
            }
          }
        });
        return new Response(m);
      } else
        throw new eu(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`, l);
    }).then((l) => {
      switch (c) {
        case "arraybuffer":
          return l.arrayBuffer();
        case "blob":
          return l.blob();
        case "document":
          return l.text().then((h) => new DOMParser().parseFromString(h, o));
        case "json":
          return l.json();
        default:
          if (o === "")
            return l.text();
          {
            const d = /charset="?([^;"\s]*)"?/i.exec(o), u = d && d[1] ? d[1].toLowerCase() : void 0, p = new TextDecoder(u);
            return l.arrayBuffer().then((_) => p.decode(_));
          }
      }
    }).then((l) => {
      Bi.add(`file:${e}`, l);
      const h = mn[e];
      delete mn[e];
      for (let d = 0, u = h.length; d < u; d++) {
        const p = h[d];
        p.onLoad && p.onLoad(l);
      }
    }).catch((l) => {
      const h = mn[e];
      if (h === void 0)
        throw this.manager.itemError(e), l;
      delete mn[e];
      for (let d = 0, u = h.length; d < u; d++) {
        const p = h[d];
        p.onError && p.onError(l);
      }
      this.manager.itemError(e);
    }).finally(() => {
      this.manager.itemEnd(e);
    }), this.manager.itemStart(e);
  }
  /**
   * Sets the expected response type.
   *
   * @param {('arraybuffer'|'blob'|'document'|'json'|'')} value - The response type.
   * @return {FileLoader} A reference to this file loader.
   */
  setResponseType(e) {
    return this.responseType = e, this;
  }
  /**
   * Sets the expected mime type of the loaded file.
   *
   * @param {string} value - The mime type.
   * @return {FileLoader} A reference to this file loader.
   */
  setMimeType(e) {
    return this.mimeType = e, this;
  }
  /**
   * Aborts ongoing fetch requests.
   *
   * @return {FileLoader} A reference to this instance.
   */
  abort() {
    return this._abortController.abort(), this._abortController = new AbortController(), this;
  }
}
const si = /* @__PURE__ */ new WeakMap();
class tu extends Si {
  /**
   * Constructs a new image loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e);
  }
  /**
   * Starts loading from the given URL and passes the loaded image
   * to the `onLoad()` callback. The method also returns a new `Image` object which can
   * directly be used for texture creation. If you do it this way, the texture
   * may pop up in your scene once the respective loading process is finished.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(Image)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Unsupported in this loader.
   * @param {onErrorCallback} onError - Executed when errors occur.
   * @return {Image} The image.
   */
  load(e, t, n, r) {
    this.path !== void 0 && (e = this.path + e), e = this.manager.resolveURL(e);
    const s = this, a = Bi.get(`image:${e}`);
    if (a !== void 0) {
      if (a.complete === !0)
        s.manager.itemStart(e), setTimeout(function() {
          t && t(a), s.manager.itemEnd(e);
        }, 0);
      else {
        let d = si.get(a);
        d === void 0 && (d = [], si.set(a, d)), d.push({ onLoad: t, onError: r });
      }
      return a;
    }
    const o = Gi("img");
    function c() {
      h(), t && t(this);
      const d = si.get(this) || [];
      for (let u = 0; u < d.length; u++) {
        const p = d[u];
        p.onLoad && p.onLoad(this);
      }
      si.delete(this), s.manager.itemEnd(e);
    }
    function l(d) {
      h(), r && r(d), Bi.remove(`image:${e}`);
      const u = si.get(this) || [];
      for (let p = 0; p < u.length; p++) {
        const _ = u[p];
        _.onError && _.onError(d);
      }
      si.delete(this), s.manager.itemError(e), s.manager.itemEnd(e);
    }
    function h() {
      o.removeEventListener("load", c, !1), o.removeEventListener("error", l, !1);
    }
    return o.addEventListener("load", c, !1), o.addEventListener("error", l, !1), e.slice(0, 5) !== "data:" && this.crossOrigin !== void 0 && (o.crossOrigin = this.crossOrigin), Bi.add(`image:${e}`, o), s.manager.itemStart(e), o.src = e, o;
  }
}
class nu extends Si {
  /**
   * Constructs a new texture loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e);
  }
  /**
   * Starts loading from the given URL and pass the fully loaded texture
   * to the `onLoad()` callback. The method also returns a new texture object which can
   * directly be used for material creation. If you do it this way, the texture
   * may pop up in your scene once the respective loading process is finished.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(Texture)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Unsupported in this loader.
   * @param {onErrorCallback} onError - Executed when errors occur.
   * @return {Texture} The texture.
   */
  load(e, t, n, r) {
    const s = new pt(), a = new tu(this.manager);
    return a.setCrossOrigin(this.crossOrigin), a.setPath(this.path), a.load(e, function(o) {
      s.image = o, s.needsUpdate = !0, t !== void 0 && t(s);
    }, n, r), s;
  }
}
class Yl extends St {
  /**
   * Constructs a new light.
   *
   * @param {(number|Color|string)} [color=0xffffff] - The light's color.
   * @param {number} [intensity=1] - The light's strength/intensity.
   */
  constructor(e, t = 1) {
    super(), this.isLight = !0, this.type = "Light", this.color = new Le(e), this.intensity = t;
  }
  copy(e, t) {
    return super.copy(e, t), this.color.copy(e.color), this.intensity = e.intensity, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.color = this.color.getHex(), t.object.intensity = this.intensity, t;
  }
}
const bs = /* @__PURE__ */ new st(), Uo = /* @__PURE__ */ new U(), No = /* @__PURE__ */ new U();
class iu {
  /**
   * Constructs a new light shadow.
   *
   * @param {Camera} camera - The light's view of the world.
   */
  constructor(e) {
    this.camera = e, this.intensity = 1, this.bias = 0, this.biasNode = null, this.normalBias = 0, this.radius = 1, this.blurSamples = 8, this.mapSize = new Ne(512, 512), this.mapType = Ot, this.map = null, this.mapPass = null, this.matrix = new st(), this.autoUpdate = !0, this.needsUpdate = !1, this._frustum = new Ua(), this._frameExtents = new Ne(1, 1), this._viewportCount = 1, this._viewports = [
      new lt(0, 0, 1, 1)
    ];
  }
  /**
   * Used internally by the renderer to get the number of viewports that need
   * to be rendered for this shadow.
   *
   * @return {number} The viewport count.
   */
  getViewportCount() {
    return this._viewportCount;
  }
  /**
   * Used internally by the renderer to get the camera that renders the given viewport.
   *
   * @param {number} [viewportIndex=0] - The viewport index.
   * @return {Camera} The shadow camera.
   */
  getCamera() {
    return this.camera;
  }
  /**
   * Gets the shadow cameras frustum. Used internally by the renderer to cull objects.
   *
   * @return {Frustum} The shadow camera frustum.
   */
  getFrustum() {
    return this._frustum;
  }
  /**
   * Update the matrices for the camera and shadow, used internally by the renderer.
   *
   * @param {Light} light - The light for which the shadow is being rendered.
   */
  updateMatrices(e) {
    const t = this.camera;
    Uo.setFromMatrixPosition(e.matrixWorld), t.position.copy(Uo), No.setFromMatrixPosition(e.target.matrixWorld), t.lookAt(No), t.updateMatrixWorld(), this._updateMatrix(t, this.matrix, this._frustum);
  }
  /**
   * Updates a shadow projection matrix and its corresponding frustum.
   *
   * @private
   * @param {Camera} shadowCamera - The shadow camera.
   * @param {Matrix4} shadowMatrix - The target shadow matrix.
   * @param {Frustum} frustum - The target frustum.
   * @param {Vector4} [viewport] - The viewport within the shadow atlas.
   */
  _updateMatrix(e, t, n, r) {
    bs.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), n.setFromProjectionMatrix(bs, e.coordinateSystem, e.reversedDepth);
    const s = this._frameExtents, a = r ? r.z / s.x : 1, o = r ? r.w / s.y : 1, c = r ? r.x / s.x : 0, l = r ? r.y / s.y : 0;
    e.coordinateSystem === ki || e.reversedDepth ? t.set(
      0.5 * a,
      0,
      0,
      0.5 * a + c,
      0,
      0.5 * o,
      0,
      0.5 * o + l,
      0,
      0,
      1,
      0,
      // Identity Z (preserving the correct [0, 1] range from the projection matrix)
      0,
      0,
      0,
      1
    ) : t.set(
      0.5 * a,
      0,
      0,
      0.5 * a + c,
      0,
      0.5 * o,
      0,
      0.5 * o + l,
      0,
      0,
      0.5,
      0.5,
      0,
      0,
      0,
      1
    ), t.multiply(bs);
  }
  /**
   * Returns a viewport definition for the given viewport index.
   *
   * @param {number} viewportIndex - The viewport index.
   * @return {Vector4} The viewport.
   */
  getViewport(e) {
    return this._viewports[e];
  }
  /**
   * Returns the frame extends.
   *
   * @return {Vector2} The frame extends.
   */
  getFrameExtents() {
    return this._frameExtents;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   */
  dispose() {
    this.map && this.map.dispose(), this.mapPass && this.mapPass.dispose();
  }
  /**
   * Copies the values of the given light shadow instance to this instance.
   *
   * @param {LightShadow} source - The light shadow to copy.
   * @return {LightShadow} A reference to this light shadow instance.
   */
  copy(e) {
    return this.camera = e.camera.clone(), this.intensity = e.intensity, this.bias = e.bias, this.radius = e.radius, this.autoUpdate = e.autoUpdate, this.needsUpdate = e.needsUpdate, this.normalBias = e.normalBias, this.blurSamples = e.blurSamples, this.mapSize.copy(e.mapSize), this.biasNode = e.biasNode, this;
  }
  /**
   * Returns a new light shadow instance with copied values from this instance.
   *
   * @return {LightShadow} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Serializes the light shadow into JSON.
   *
   * @return {Object} A JSON object representing the serialized light shadow.
   * @see {@link ObjectLoader#parse}
   */
  toJSON() {
    const e = {};
    return e.intensity = this.intensity, e.bias = this.bias, e.normalBias = this.normalBias, e.radius = this.radius, e.blurSamples = this.blurSamples, e.mapSize = this.mapSize.toArray(), e.camera = this.camera.toJSON(!1).object, delete e.camera.matrix, e;
  }
}
const xr = /* @__PURE__ */ new U(), Mr = /* @__PURE__ */ new Mi(), en = /* @__PURE__ */ new U();
class Kl extends St {
  /**
   * Constructs a new camera.
   */
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new st(), this.projectionMatrix = new st(), this.projectionMatrixInverse = new st(), this.coordinateSystem = sn, this._reversedDepth = !1;
  }
  /**
   * The flag that indicates whether the camera uses a reversed depth buffer.
   *
   * @type {boolean}
   * @default false
   */
  get reversedDepth() {
    return this._reversedDepth;
  }
  copy(e, t) {
    return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
  }
  /**
   * Returns a vector representing the ("look") direction of the 3D object in world space.
   *
   * This method is overwritten since cameras have a different forward vector compared to other
   * 3D objects. A camera looks down its local, negative z-axis by default.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's direction in world space.
   */
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorld.decompose(xr, Mr, en), en.x === 1 && en.y === 1 && en.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(xr, Mr, en.set(1, 1, 1)).invert();
  }
  updateWorldMatrix(e, t, n = !1) {
    super.updateWorldMatrix(e, t, n), this.matrixWorld.decompose(xr, Mr, en), en.x === 1 && en.y === 1 && en.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(xr, Mr, en.set(1, 1, 1)).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Pn = /* @__PURE__ */ new U(), Fo = /* @__PURE__ */ new Ne(), Oo = /* @__PURE__ */ new Ne();
class kt extends Kl {
  /**
   * Constructs a new perspective camera.
   *
   * @param {number} [fov=50] - The vertical field of view.
   * @param {number} [aspect=1] - The aspect ratio.
   * @param {number} [near=0.1] - The camera's near plane.
   * @param {number} [far=2000] - The camera's far plane.
   */
  constructor(e = 50, t = 1, n = 0.1, r = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = r, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current {@link PerspectiveCamera#filmGauge}.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * @param {number} focalLength - Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(e) {
    const t = 0.5 * this.getFilmHeight() / e;
    this.fov = Wi * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  /**
   * Returns the focal length from the current {@link PerspectiveCamera#fov} and
   * {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The computed focal length.
   */
  getFocalLength() {
    const e = Math.tan(Fi * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  /**
   * Returns the current vertical field of view angle in degrees considering {@link PerspectiveCamera#zoom}.
   *
   * @return {number} The effective FOV.
   */
  getEffectiveFOV() {
    return Wi * 2 * Math.atan(
      Math.tan(Fi * 0.5 * this.fov) / this.zoom
    );
  }
  /**
   * Returns the width of the image on the film. If {@link PerspectiveCamera#aspect} is greater than or
   * equal to one (landscape format), the result equals {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The film width.
   */
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  /**
   * Returns the height of the image on the film. If {@link PerspectiveCamera#aspect} is greater than or
   * equal to one (landscape format), the result equals {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The film width.
   */
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  /**
   * Computes the 2D bounds of the camera's viewable rectangle at a given distance along the viewing direction.
   * Sets `minTarget` and `maxTarget` to the coordinates of the lower-left and upper-right corners of the view rectangle.
   *
   * @param {number} distance - The viewing distance.
   * @param {Vector2} minTarget - The lower-left corner of the view rectangle is written into this vector.
   * @param {Vector2} maxTarget - The upper-right corner of the view rectangle is written into this vector.
   */
  getViewBounds(e, t, n) {
    Pn.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), t.set(Pn.x, Pn.y).multiplyScalar(-e / Pn.z), Pn.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), n.set(Pn.x, Pn.y).multiplyScalar(-e / Pn.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   *
   * @param {number} distance - The viewing distance.
   * @param {Vector2} target - The target vector that is used to store result where x is width and y is height.
   * @returns {Vector2} The view size.
   */
  getViewSize(e, t) {
    return this.getViewBounds(e, Fo, Oo), t.subVectors(Oo, Fo);
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *```
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *```
   * then for each monitor you would call it like this:
   *```js
   * const w = 1920;
   * const h = 1080;
   * const fullWidth = w * 3;
   * const fullHeight = h * 2;
   *
   * // --A--
   * camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   * // --B--
   * camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   * // --C--
   * camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   * // --D--
   * camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   * // --E--
   * camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   * // --F--
   * camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   * ```
   *
   * Note there is no reason monitors have to be the same size or in a grid.
   *
   * @param {number} fullWidth - The full width of multiview setup.
   * @param {number} fullHeight - The full height of multiview setup.
   * @param {number} x - The horizontal offset of the subcamera.
   * @param {number} y - The vertical offset of the subcamera.
   * @param {number} width - The width of subcamera.
   * @param {number} height - The height of subcamera.
   */
  setViewOffset(e, t, n, r, s, a) {
    this.aspect = e / t, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
  }
  /**
   * Removes the view offset from the projection matrix.
   */
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  /**
   * Updates the camera's projection matrix. Must be called after any change of
   * camera properties.
   */
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(Fi * 0.5 * this.fov) / this.zoom, n = 2 * t, r = this.aspect * n, s = -0.5 * r;
    const a = this.view;
    if (this.view !== null && this.view.enabled) {
      const c = a.fullWidth, l = a.fullHeight;
      s += a.offsetX * r / c, t -= a.offsetY * n / l, r *= a.width / c, n *= a.height / l;
    }
    const o = this.filmOffset;
    o !== 0 && (s += e * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(s, s + r, t, t - n, e, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}
class Oa extends Kl {
  /**
   * Constructs a new orthographic camera.
   *
   * @param {number} [left=-1] - The left plane of the camera's frustum.
   * @param {number} [right=1] - The right plane of the camera's frustum.
   * @param {number} [top=1] - The top plane of the camera's frustum.
   * @param {number} [bottom=-1] - The bottom plane of the camera's frustum.
   * @param {number} [near=0.1] - The camera's near plane.
   * @param {number} [far=2000] - The camera's far plane.
   */
  constructor(e = -1, t = 1, n = 1, r = -1, s = 0.1, a = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = r, this.near = s, this.far = a, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * @param {number} fullWidth - The full width of multiview setup.
   * @param {number} fullHeight - The full height of multiview setup.
   * @param {number} x - The horizontal offset of the subcamera.
   * @param {number} y - The vertical offset of the subcamera.
   * @param {number} width - The width of subcamera.
   * @param {number} height - The height of subcamera.
   * @see {@link PerspectiveCamera#setViewOffset}
   */
  setViewOffset(e, t, n, r, s, a) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
  }
  /**
   * Removes the view offset from the projection matrix.
   */
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  /**
   * Updates the camera's projection matrix. Must be called after any change of
   * camera properties.
   */
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2;
    let s = n - e, a = n + e, o = r + t, c = r - t;
    if (this.view !== null && this.view.enabled) {
      const l = (this.right - this.left) / this.view.fullWidth / this.zoom, h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      s += l * this.view.offsetX, a = s + l * this.view.width, o -= h * this.view.offsetY, c = o - h * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(s, a, o, c, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
  }
}
class ru extends iu {
  /**
   * Constructs a new directional light shadow.
   */
  constructor() {
    super(new Oa(-5, 5, 5, -5, 0.5, 500)), this.isDirectionalLightShadow = !0;
  }
}
class su extends Yl {
  /**
   * Constructs a new directional light.
   *
   * @param {(number|Color|string)} [color=0xffffff] - The light's color.
   * @param {number} [intensity=1] - The light's strength/intensity.
   */
  constructor(e, t) {
    super(e, t), this.isDirectionalLight = !0, this.type = "DirectionalLight", this.position.copy(St.DEFAULT_UP), this.updateMatrix(), this.target = new St(), this.shadow = new ru();
  }
  dispose() {
    super.dispose(), this.shadow.dispose();
  }
  copy(e) {
    return super.copy(e), this.target = e.target.clone(), this.shadow = e.shadow.clone(), this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.shadow = this.shadow.toJSON(), t.object.target = this.target.uuid, t;
  }
}
class au extends Yl {
  /**
   * Constructs a new ambient light.
   *
   * @param {(number|Color|string)} [color=0xffffff] - The light's color.
   * @param {number} [intensity=1] - The light's strength/intensity.
   */
  constructor(e, t) {
    super(e, t), this.isAmbientLight = !0, this.type = "AmbientLight";
  }
}
class ou {
  /**
   * Extracts the base URL from the given URL.
   *
   * @param {string} url -The URL to extract the base URL from.
   * @return {string} The extracted base URL.
   */
  static extractUrlBase(e) {
    const t = e.lastIndexOf("/");
    return t === -1 ? "./" : e.slice(0, t + 1);
  }
  /**
   * Resolves relative URLs against the given path. Absolute paths, data urls,
   * and blob URLs will be returned as is. Invalid URLs will return an empty
   * string.
   *
   * @param {string} url -The URL to resolve.
   * @param {string} path - The base path for relative URLs to be resolved against.
   * @return {string} The resolved URL.
   */
  static resolveURL(e, t) {
    return typeof e != "string" || e === "" ? "" : (/^https?:\/\//i.test(t) && /^\//.test(e) && (t = t.replace(/(^https?:\/\/[^\/]+).*/i, "$1")), /^(https?:)?\/\//i.test(e) || /^data:.*,.*$/i.test(e) || /^blob:.*$/i.test(e) ? e : t + e);
  }
}
class u_ extends Dt {
  /**
   * Constructs a new instanced buffer geometry.
   */
  constructor() {
    super(), this.isInstancedBufferGeometry = !0, this.type = "InstancedBufferGeometry", this.instanceCount = 1 / 0;
  }
  copy(e) {
    return super.copy(e), this.instanceCount = e.instanceCount, this;
  }
  toJSON() {
    const e = super.toJSON();
    return e.instanceCount = this.instanceCount, e.isInstancedBufferGeometry = !0, e;
  }
}
const ai = -90, oi = 1;
class lu extends St {
  /**
   * Constructs a new cube camera.
   *
   * @param {number} near - The camera's near plane.
   * @param {number} far - The camera's far plane.
   * @param {WebGLCubeRenderTarget} renderTarget - The cube render target.
   */
  constructor(e, t, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const r = new kt(ai, oi, e, t);
    r.layers = this.layers, this.add(r);
    const s = new kt(ai, oi, e, t);
    s.layers = this.layers, this.add(s);
    const a = new kt(ai, oi, e, t);
    a.layers = this.layers, this.add(a);
    const o = new kt(ai, oi, e, t);
    o.layers = this.layers, this.add(o);
    const c = new kt(ai, oi, e, t);
    c.layers = this.layers, this.add(c);
    const l = new kt(ai, oi, e, t);
    l.layers = this.layers, this.add(l);
  }
  /**
   * Must be called when the coordinate system of the cube camera is changed.
   */
  updateCoordinateSystem() {
    const e = this.coordinateSystem, t = this.children.concat(), [n, r, s, a, o, c] = t;
    for (const l of t) this.remove(l);
    if (e === sn)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), s.up.set(0, 0, -1), s.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), c.up.set(0, 1, 0), c.lookAt(0, 0, -1);
    else if (e === ki)
      n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), s.up.set(0, 0, 1), s.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), c.up.set(0, -1, 0), c.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const l of t)
      this.add(l), l.updateMatrixWorld();
  }
  /**
   * Calling this method will render the given scene with the given renderer
   * into the cube render target of the camera.
   *
   * @param {(Renderer|WebGLRenderer)} renderer - The renderer.
   * @param {Scene} scene - The scene to render.
   */
  update(e, t) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: r } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [s, a, o, c, l, h] = this.children, d = e.getRenderTarget(), u = e.getActiveCubeFace(), p = e.getActiveMipmapLevel(), _ = e.xr.enabled;
    e.xr.enabled = !1;
    const M = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1;
    let m = !1;
    e.isWebGLRenderer === !0 ? m = e.state.buffers.depth.getReversed() : m = e.reversedDepthBuffer, e.setRenderTarget(n, 0, r), m && e.autoClear === !1 && e.clearDepth(), e.render(t, s), e.setRenderTarget(n, 1, r), m && e.autoClear === !1 && e.clearDepth(), e.render(t, a), e.setRenderTarget(n, 2, r), m && e.autoClear === !1 && e.clearDepth(), e.render(t, o), e.setRenderTarget(n, 3, r), m && e.autoClear === !1 && e.clearDepth(), e.render(t, c), e.setRenderTarget(n, 4, r), m && e.autoClear === !1 && e.clearDepth(), e.render(t, l), n.texture.generateMipmaps = M, e.setRenderTarget(n, 5, r), m && e.autoClear === !1 && e.clearDepth(), e.render(t, h), e.setRenderTarget(d, u, p), e.xr.enabled = _, n.texture.needsPMREMUpdate = !0;
  }
}
class cu extends kt {
  /**
   * Constructs a new array camera.
   *
   * @param {Array<PerspectiveCamera>} [array=[]] - An array of perspective sub cameras.
   */
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = e;
  }
}
class d_ {
  /**
   * Constructs a new timer.
   */
  constructor() {
    this._previousTime = 0, this._currentTime = 0, this._startTime = performance.now(), this._delta = 0, this._elapsed = 0, this._timescale = 1, this._document = null, this._pageVisibilityHandler = null;
  }
  /**
   * Connect the timer to the given document.Calling this method is not mandatory to
   * use the timer but enables the usage of the Page Visibility API to avoid large time
   * delta values.
   *
   * @param {Document} document - The document.
   */
  connect(e) {
    this._document = e, e.hidden !== void 0 && (this._pageVisibilityHandler = hu.bind(this), e.addEventListener("visibilitychange", this._pageVisibilityHandler, !1));
  }
  /**
   * Disconnects the timer from the DOM and also disables the usage of the Page Visibility API.
   */
  disconnect() {
    this._pageVisibilityHandler !== null && (this._document.removeEventListener("visibilitychange", this._pageVisibilityHandler), this._pageVisibilityHandler = null), this._document = null;
  }
  /**
   * Returns the time delta in seconds.
   *
   * @return {number} The time delta in second.
   */
  getDelta() {
    return this._delta / 1e3;
  }
  /**
   * Returns the elapsed time in seconds.
   *
   * @return {number} The elapsed time in second.
   */
  getElapsed() {
    return this._elapsed / 1e3;
  }
  /**
   * Returns the timescale.
   *
   * @return {number} The timescale.
   */
  getTimescale() {
    return this._timescale;
  }
  /**
   * Sets the given timescale which scale the time delta computation
   * in `update()`.
   *
   * @param {number} timescale - The timescale to set.
   * @return {Timer} A reference to this timer.
   */
  setTimescale(e) {
    return this._timescale = e, this;
  }
  /**
   * Resets the time computation for the current simulation step.
   *
   * @return {Timer} A reference to this timer.
   */
  reset() {
    return this._currentTime = performance.now() - this._startTime, this;
  }
  /**
   * Can be used to free all internal resources. Usually called when
   * the timer instance isn't required anymore.
   */
  dispose() {
    this.disconnect();
  }
  /**
   * Updates the internal state of the timer. This method should be called
   * once per simulation step and before you perform queries against the timer
   * (e.g. via `getDelta()`).
   *
   * @param {number} timestamp - The current time in milliseconds. Can be obtained
   * from the `requestAnimationFrame` callback argument. If not provided, the current
   * time will be determined with `performance.now`.
   * @return {Timer} A reference to this timer.
   */
  update(e) {
    return this._pageVisibilityHandler !== null && this._document.hidden === !0 ? this._delta = 0 : (this._previousTime = this._currentTime, this._currentTime = (e !== void 0 ? e : performance.now()) - this._startTime, this._delta = (this._currentTime - this._previousTime) * this._timescale, this._elapsed += this._delta), this;
  }
}
function hu() {
  this._document.hidden === !1 && this.reset();
}
class uu {
  /**
   * Constructs a new spherical.
   *
   * @param {number} [radius=1] - The radius, or the Euclidean distance (straight-line distance) from the point to the origin.
   * @param {number} [phi=0] - The polar angle in radians from the y (up) axis.
   * @param {number} [theta=0] - The equator/azimuthal angle in radians around the y (up) axis.
   */
  constructor(e = 1, t = 0, n = 0) {
    this.radius = e, this.phi = t, this.theta = n;
  }
  /**
   * Sets the spherical components by copying the given values.
   *
   * @param {number} radius - The radius.
   * @param {number} phi - The polar angle.
   * @param {number} theta - The azimuthal angle.
   * @return {Spherical} A reference to this spherical.
   */
  set(e, t, n) {
    return this.radius = e, this.phi = t, this.theta = n, this;
  }
  /**
   * Copies the values of the given spherical to this instance.
   *
   * @param {Spherical} other - The spherical to copy.
   * @return {Spherical} A reference to this spherical.
   */
  copy(e) {
    return this.radius = e.radius, this.phi = e.phi, this.theta = e.theta, this;
  }
  /**
   * Restricts the polar angle [page:.phi phi] to be between `0.000001` and pi -
   * `0.000001`.
   *
   * @return {Spherical} A reference to this spherical.
   */
  makeSafe() {
    return this.phi = Be(this.phi, 1e-6, Math.PI - 1e-6), this;
  }
  /**
   * Sets the spherical components from the given vector which is assumed to hold
   * Cartesian coordinates.
   *
   * @param {Vector3} v - The vector to set.
   * @return {Spherical} A reference to this spherical.
   */
  setFromVector3(e) {
    return this.setFromCartesianCoords(e.x, e.y, e.z);
  }
  /**
   * Sets the spherical components from the given Cartesian coordinates.
   *
   * @param {number} x - The x value.
   * @param {number} y - The y value.
   * @param {number} z - The z value.
   * @return {Spherical} A reference to this spherical.
   */
  setFromCartesianCoords(e, t, n) {
    return this.radius = Math.sqrt(e * e + t * t + n * n), this.radius === 0 ? (this.theta = 0, this.phi = 0) : (this.theta = Math.atan2(e, n), this.phi = Math.acos(Be(t / this.radius, -1, 1))), this;
  }
  /**
   * Returns a new spherical with copied values from this instance.
   *
   * @return {Spherical} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
const Wa = class Wa {
  /**
   * Constructs a new 2x2 matrix. The arguments are supposed to be
   * in row-major order. If no arguments are provided, the constructor
   * initializes the matrix as an identity matrix.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   */
  constructor(e, t, n, r) {
    this.elements = [
      1,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, r);
  }
  /**
   * Sets this matrix to the 2x2 identity matrix.
   *
   * @return {Matrix2} A reference to this matrix.
   */
  identity() {
    return this.set(
      1,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix2} A reference to this matrix.
   */
  fromArray(e, t = 0) {
    for (let n = 0; n < 4; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} n11 - 1-1 matrix element.
   * @param {number} n12 - 1-2 matrix element.
   * @param {number} n21 - 2-1 matrix element.
   * @param {number} n22 - 2-2 matrix element.
   * @return {Matrix2} A reference to this matrix.
   */
  set(e, t, n, r) {
    const s = this.elements;
    return s[0] = e, s[2] = t, s[1] = n, s[3] = r, this;
  }
};
Wa.prototype.isMatrix2 = !0;
let Bo = Wa;
function zo(i, e, t, n) {
  const r = du(n);
  switch (t) {
    // https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
    case Dl:
      return i * e;
    case Ul:
      return i * e / r.components * r.byteLength;
    case Ea:
      return i * e / r.components * r.byteLength;
    case Wn:
      return i * e * 2 / r.components * r.byteLength;
    case Ta:
      return i * e * 2 / r.components * r.byteLength;
    case Il:
      return i * e * 3 / r.components * r.byteLength;
    case Zt:
      return i * e * 4 / r.components * r.byteLength;
    case wa:
      return i * e * 4 / r.components * r.byteLength;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_s3tc_srgb/
    case wr:
    case Ar:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case Rr:
    case Cr:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_pvrtc/
    case zs:
    case Hs:
      return Math.max(i, 16) * Math.max(e, 8) / 4;
    case Bs:
    case Vs:
      return Math.max(i, 8) * Math.max(e, 8) / 2;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_etc/
    case ks:
    case Gs:
    case Xs:
    case qs:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case Ws:
    case Ur:
    case Ys:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_astc/
    case Ks:
      return Math.floor((i + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case $s:
      return Math.floor((i + 4) / 5) * Math.floor((e + 3) / 4) * 16;
    case Zs:
      return Math.floor((i + 4) / 5) * Math.floor((e + 4) / 5) * 16;
    case Js:
      return Math.floor((i + 5) / 6) * Math.floor((e + 4) / 5) * 16;
    case Qs:
      return Math.floor((i + 5) / 6) * Math.floor((e + 5) / 6) * 16;
    case js:
      return Math.floor((i + 7) / 8) * Math.floor((e + 4) / 5) * 16;
    case ea:
      return Math.floor((i + 7) / 8) * Math.floor((e + 5) / 6) * 16;
    case ta:
      return Math.floor((i + 7) / 8) * Math.floor((e + 7) / 8) * 16;
    case na:
      return Math.floor((i + 9) / 10) * Math.floor((e + 4) / 5) * 16;
    case ia:
      return Math.floor((i + 9) / 10) * Math.floor((e + 5) / 6) * 16;
    case ra:
      return Math.floor((i + 9) / 10) * Math.floor((e + 7) / 8) * 16;
    case sa:
      return Math.floor((i + 9) / 10) * Math.floor((e + 9) / 10) * 16;
    case aa:
      return Math.floor((i + 11) / 12) * Math.floor((e + 9) / 10) * 16;
    case oa:
      return Math.floor((i + 11) / 12) * Math.floor((e + 11) / 12) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_bptc/
    case la:
    case ca:
    case ha:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_rgtc/
    case ua:
    case da:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 8;
    case Nr:
    case fa:
      return Math.ceil(i / 4) * Math.ceil(e / 4) * 16;
  }
  throw new Error(
    `Unable to determine texture byte length for ${t} format.`
  );
}
function du(i) {
  switch (i) {
    case Ot:
    case Rl:
      return { byteLength: 1, components: 1 };
    case Vi:
    case Cl:
    case ln:
      return { byteLength: 2, components: 1 };
    case ba:
    case ya:
      return { byteLength: 2, components: 4 };
    case on:
    case Sa:
    case rn:
      return { byteLength: 4, components: 1 };
    case Pl:
    case Ll:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: xa
} }));
typeof window < "u" && (window.__THREE__ ? Re("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = xa);
function $l() {
  let i = null, e = !1, t = null, n = null;
  function r(s, a) {
    n = i.requestAnimationFrame(r), t(s, a);
  }
  return {
    start: function() {
      e !== !0 && t !== null && i !== null && (n = i.requestAnimationFrame(r), e = !0);
    },
    stop: function() {
      i !== null && i.cancelAnimationFrame(n), e = !1;
    },
    setAnimationLoop: function(s) {
      t = s;
    },
    setContext: function(s) {
      i = s;
    }
  };
}
function fu(i) {
  const e = /* @__PURE__ */ new WeakMap();
  function t(o, c) {
    const l = o.array, h = o.usage, d = l.byteLength, u = i.createBuffer();
    i.bindBuffer(c, u), i.bufferData(c, l, h), o.onUploadCallback();
    let p;
    if (l instanceof Float32Array)
      p = i.FLOAT;
    else if (typeof Float16Array < "u" && l instanceof Float16Array)
      p = i.HALF_FLOAT;
    else if (l instanceof Uint16Array)
      o.isFloat16BufferAttribute ? p = i.HALF_FLOAT : p = i.UNSIGNED_SHORT;
    else if (l instanceof Int16Array)
      p = i.SHORT;
    else if (l instanceof Uint32Array)
      p = i.UNSIGNED_INT;
    else if (l instanceof Int32Array)
      p = i.INT;
    else if (l instanceof Int8Array)
      p = i.BYTE;
    else if (l instanceof Uint8Array)
      p = i.UNSIGNED_BYTE;
    else if (l instanceof Uint8ClampedArray)
      p = i.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + l);
    return {
      buffer: u,
      type: p,
      bytesPerElement: l.BYTES_PER_ELEMENT,
      version: o.version,
      size: d
    };
  }
  function n(o, c, l) {
    const h = c.array, d = c.updateRanges;
    if (i.bindBuffer(l, o), d.length === 0)
      i.bufferSubData(l, 0, h);
    else {
      d.sort((p, _) => p.start - _.start);
      let u = 0;
      for (let p = 1; p < d.length; p++) {
        const _ = d[u], M = d[p];
        M.start <= _.start + _.count + 1 ? _.count = Math.max(
          _.count,
          M.start + M.count - _.start
        ) : (++u, d[u] = M);
      }
      d.length = u + 1;
      for (let p = 0, _ = d.length; p < _; p++) {
        const M = d[p];
        i.bufferSubData(
          l,
          M.start * h.BYTES_PER_ELEMENT,
          h,
          M.start,
          M.count
        );
      }
      c.clearUpdateRanges();
    }
    c.onUploadCallback();
  }
  function r(o) {
    return o.isInterleavedBufferAttribute && (o = o.data), e.get(o);
  }
  function s(o) {
    o.isInterleavedBufferAttribute && (o = o.data);
    const c = e.get(o);
    c && (i.deleteBuffer(c.buffer), e.delete(o));
  }
  function a(o, c) {
    if (o.isInterleavedBufferAttribute && (o = o.data), o.isGLBufferAttribute) {
      const h = e.get(o);
      (!h || h.version < o.version) && e.set(o, {
        buffer: o.buffer,
        type: o.type,
        bytesPerElement: o.elementSize,
        version: o.version
      });
      return;
    }
    const l = e.get(o);
    if (l === void 0)
      e.set(o, t(o, c));
    else if (l.version < o.version) {
      if (l.size !== o.array.byteLength)
        throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      n(l.buffer, o, c), l.version = o.version;
    }
  }
  return {
    get: r,
    remove: s,
    update: a
  };
}
var pu = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, mu = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, gu = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, _u = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, vu = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, xu = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, Mu = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, Su = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, bu = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`, yu = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, Eu = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, Tu = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, wu = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, Au = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, Ru = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, Cu = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, Pu = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, Lu = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, Du = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, Iu = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`, Uu = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`, Nu = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`, Fu = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`, Ou = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, Bu = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, zu = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`, Vu = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, Hu = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, ku = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, Gu = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, Wu = "gl_FragColor = linearToOutputTexel( gl_FragColor );", Xu = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, qu = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`, Yu = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`, Ku = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, $u = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, Zu = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, Ju = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, Qu = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, ju = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, ed = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, td = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, nd = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, id = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, rd = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, sd = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`, ad = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`, od = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, ld = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, cd = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, hd = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, ud = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, dd = `uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, fd = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, pd = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, md = `#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, gd = `#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`, _d = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, vd = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, xd = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, Md = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, Sd = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, bd = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, yd = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, Ed = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, Td = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, wd = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, Ad = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, Rd = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, Cd = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Pd = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`, Ld = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Dd = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, Id = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, Ud = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Nd = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Fd = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`, Od = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, Bd = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, zd = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, Vd = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, Hd = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, kd = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, Gd = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`, Wd = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, Xd = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, qd = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, Yd = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, Kd = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, $d = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, Zd = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`, Jd = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, Qd = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, jd = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, ef = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, tf = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, nf = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, rf = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, sf = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, af = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, of = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, lf = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, cf = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, hf = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, uf = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, df = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, ff = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, pf = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const mf = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, gf = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, _f = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, vf = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, xf = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, Mf = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Sf = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, bf = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`, yf = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, Ef = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`, Tf = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, wf = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, Af = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, Rf = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Cf = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, Pf = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Lf = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Df = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, If = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, Uf = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Nf = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, Ff = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, Of = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Bf = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, zf = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, Vf = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Hf = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, kf = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Gf = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, Wf = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Xf = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, qf = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Yf = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, Kf = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Ue = {
  alphahash_fragment: pu,
  alphahash_pars_fragment: mu,
  alphamap_fragment: gu,
  alphamap_pars_fragment: _u,
  alphatest_fragment: vu,
  alphatest_pars_fragment: xu,
  aomap_fragment: Mu,
  aomap_pars_fragment: Su,
  batching_pars_vertex: bu,
  batching_vertex: yu,
  begin_vertex: Eu,
  beginnormal_vertex: Tu,
  bsdfs: wu,
  iridescence_fragment: Au,
  bumpmap_pars_fragment: Ru,
  clipping_planes_fragment: Cu,
  clipping_planes_pars_fragment: Pu,
  clipping_planes_pars_vertex: Lu,
  clipping_planes_vertex: Du,
  color_fragment: Iu,
  color_pars_fragment: Uu,
  color_pars_vertex: Nu,
  color_vertex: Fu,
  common: Ou,
  cube_uv_reflection_fragment: Bu,
  defaultnormal_vertex: zu,
  displacementmap_pars_vertex: Vu,
  displacementmap_vertex: Hu,
  emissivemap_fragment: ku,
  emissivemap_pars_fragment: Gu,
  colorspace_fragment: Wu,
  colorspace_pars_fragment: Xu,
  envmap_fragment: qu,
  envmap_common_pars_fragment: Yu,
  envmap_pars_fragment: Ku,
  envmap_pars_vertex: $u,
  envmap_physical_pars_fragment: ad,
  envmap_vertex: Zu,
  fog_vertex: Ju,
  fog_pars_vertex: Qu,
  fog_fragment: ju,
  fog_pars_fragment: ed,
  gradientmap_pars_fragment: td,
  lightmap_pars_fragment: nd,
  lights_lambert_fragment: id,
  lights_lambert_pars_fragment: rd,
  lights_pars_begin: sd,
  lights_toon_fragment: od,
  lights_toon_pars_fragment: ld,
  lights_phong_fragment: cd,
  lights_phong_pars_fragment: hd,
  lights_physical_fragment: ud,
  lights_physical_pars_fragment: dd,
  lights_fragment_begin: fd,
  lights_fragment_maps: pd,
  lights_fragment_end: md,
  lightprobes_pars_fragment: gd,
  logdepthbuf_fragment: _d,
  logdepthbuf_pars_fragment: vd,
  logdepthbuf_pars_vertex: xd,
  logdepthbuf_vertex: Md,
  map_fragment: Sd,
  map_pars_fragment: bd,
  map_particle_fragment: yd,
  map_particle_pars_fragment: Ed,
  metalnessmap_fragment: Td,
  metalnessmap_pars_fragment: wd,
  morphinstance_vertex: Ad,
  morphcolor_vertex: Rd,
  morphnormal_vertex: Cd,
  morphtarget_pars_vertex: Pd,
  morphtarget_vertex: Ld,
  normal_fragment_begin: Dd,
  normal_fragment_maps: Id,
  normal_pars_fragment: Ud,
  normal_pars_vertex: Nd,
  normal_vertex: Fd,
  normalmap_pars_fragment: Od,
  clearcoat_normal_fragment_begin: Bd,
  clearcoat_normal_fragment_maps: zd,
  clearcoat_pars_fragment: Vd,
  iridescence_pars_fragment: Hd,
  opaque_fragment: kd,
  packing: Gd,
  premultiplied_alpha_fragment: Wd,
  project_vertex: Xd,
  dithering_fragment: qd,
  dithering_pars_fragment: Yd,
  roughnessmap_fragment: Kd,
  roughnessmap_pars_fragment: $d,
  shadowmap_pars_fragment: Zd,
  shadowmap_pars_vertex: Jd,
  shadowmap_vertex: Qd,
  shadowmask_pars_fragment: jd,
  skinbase_vertex: ef,
  skinning_pars_vertex: tf,
  skinning_vertex: nf,
  skinnormal_vertex: rf,
  specularmap_fragment: sf,
  specularmap_pars_fragment: af,
  tonemapping_fragment: of,
  tonemapping_pars_fragment: lf,
  transmission_fragment: cf,
  transmission_pars_fragment: hf,
  uv_pars_fragment: uf,
  uv_pars_vertex: df,
  uv_vertex: ff,
  worldpos_vertex: pf,
  background_vert: mf,
  background_frag: gf,
  backgroundCube_vert: _f,
  backgroundCube_frag: vf,
  cube_vert: xf,
  cube_frag: Mf,
  depth_vert: Sf,
  depth_frag: bf,
  distance_vert: yf,
  distance_frag: Ef,
  equirect_vert: Tf,
  equirect_frag: wf,
  linedashed_vert: Af,
  linedashed_frag: Rf,
  meshbasic_vert: Cf,
  meshbasic_frag: Pf,
  meshlambert_vert: Lf,
  meshlambert_frag: Df,
  meshmatcap_vert: If,
  meshmatcap_frag: Uf,
  meshnormal_vert: Nf,
  meshnormal_frag: Ff,
  meshphong_vert: Of,
  meshphong_frag: Bf,
  meshphysical_vert: zf,
  meshphysical_frag: Vf,
  meshtoon_vert: Hf,
  meshtoon_frag: kf,
  points_vert: Gf,
  points_frag: Wf,
  shadow_vert: Xf,
  shadow_frag: qf,
  sprite_vert: Yf,
  sprite_frag: Kf
}, he = {
  common: {
    diffuse: { value: /* @__PURE__ */ new Le(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Pe() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Pe() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new Pe() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new Pe() },
    reflectivity: { value: 1 },
    // basic, lambert, phong
    ior: { value: 1.5 },
    // physical
    refractionRatio: { value: 0.98 },
    // basic, lambert, phong
    dfgLUT: { value: null }
    // DFG LUT for physically-based rendering
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new Pe() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new Pe() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new Pe() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new Pe() },
    normalScale: { value: /* @__PURE__ */ new Ne(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new Pe() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new Pe() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new Pe() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new Pe() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new Le(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    sunLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    sunLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    sunShadowMatrix: { value: [] },
    sunShadowCascade: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null },
    probesSH: { value: null },
    probesMin: { value: /* @__PURE__ */ new U() },
    probesMax: { value: /* @__PURE__ */ new U() },
    probesResolution: { value: /* @__PURE__ */ new U() }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new Le(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Pe() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Pe() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new Le(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new Ne(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Pe() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Pe() },
    alphaTest: { value: 0 }
  }
}, nn = {
  basic: {
    uniforms: /* @__PURE__ */ Pt([
      he.common,
      he.specularmap,
      he.envmap,
      he.aomap,
      he.lightmap,
      he.fog
    ]),
    vertexShader: Ue.meshbasic_vert,
    fragmentShader: Ue.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ Pt([
      he.common,
      he.specularmap,
      he.envmap,
      he.aomap,
      he.lightmap,
      he.emissivemap,
      he.bumpmap,
      he.normalmap,
      he.displacementmap,
      he.fog,
      he.lights,
      {
        emissive: { value: /* @__PURE__ */ new Le(0) },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshlambert_vert,
    fragmentShader: Ue.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ Pt([
      he.common,
      he.specularmap,
      he.envmap,
      he.aomap,
      he.lightmap,
      he.emissivemap,
      he.bumpmap,
      he.normalmap,
      he.displacementmap,
      he.fog,
      he.lights,
      {
        emissive: { value: /* @__PURE__ */ new Le(0) },
        specular: { value: /* @__PURE__ */ new Le(1118481) },
        shininess: { value: 30 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshphong_vert,
    fragmentShader: Ue.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ Pt([
      he.common,
      he.envmap,
      he.aomap,
      he.lightmap,
      he.emissivemap,
      he.bumpmap,
      he.normalmap,
      he.displacementmap,
      he.roughnessmap,
      he.metalnessmap,
      he.fog,
      he.lights,
      {
        emissive: { value: /* @__PURE__ */ new Le(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshphysical_vert,
    fragmentShader: Ue.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ Pt([
      he.common,
      he.aomap,
      he.lightmap,
      he.emissivemap,
      he.bumpmap,
      he.normalmap,
      he.displacementmap,
      he.gradientmap,
      he.fog,
      he.lights,
      {
        emissive: { value: /* @__PURE__ */ new Le(0) }
      }
    ]),
    vertexShader: Ue.meshtoon_vert,
    fragmentShader: Ue.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ Pt([
      he.common,
      he.bumpmap,
      he.normalmap,
      he.displacementmap,
      he.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: Ue.meshmatcap_vert,
    fragmentShader: Ue.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ Pt([
      he.points,
      he.fog
    ]),
    vertexShader: Ue.points_vert,
    fragmentShader: Ue.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ Pt([
      he.common,
      he.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Ue.linedashed_vert,
    fragmentShader: Ue.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ Pt([
      he.common,
      he.displacementmap
    ]),
    vertexShader: Ue.depth_vert,
    fragmentShader: Ue.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ Pt([
      he.common,
      he.bumpmap,
      he.normalmap,
      he.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshnormal_vert,
    fragmentShader: Ue.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ Pt([
      he.sprite,
      he.fog
    ]),
    vertexShader: Ue.sprite_vert,
    fragmentShader: Ue.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Pe() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Ue.background_vert,
    fragmentShader: Ue.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new Pe() }
    },
    vertexShader: Ue.backgroundCube_vert,
    fragmentShader: Ue.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Ue.cube_vert,
    fragmentShader: Ue.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: Ue.equirect_vert,
    fragmentShader: Ue.equirect_frag
  },
  distance: {
    uniforms: /* @__PURE__ */ Pt([
      he.common,
      he.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new U() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Ue.distance_vert,
    fragmentShader: Ue.distance_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ Pt([
      he.lights,
      he.fog,
      {
        color: { value: /* @__PURE__ */ new Le(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Ue.shadow_vert,
    fragmentShader: Ue.shadow_frag
  }
};
nn.physical = {
  uniforms: /* @__PURE__ */ Pt([
    nn.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new Pe() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Pe() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new Ne(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Pe() },
      dispersion: { value: 0 },
      retroreflectivity: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new Pe() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Pe() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new Le(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new Pe() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Pe() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new Pe() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new Ne() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new Pe() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new Le(0) },
      specularColor: { value: /* @__PURE__ */ new Le(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new Pe() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new Pe() },
      anisotropyVector: { value: /* @__PURE__ */ new Ne() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new Pe() }
    }
  ]),
  vertexShader: Ue.meshphysical_vert,
  fragmentShader: Ue.meshphysical_frag
};
const Sr = { r: 0, b: 0, g: 0 }, $f = /* @__PURE__ */ new st(), Zl = /* @__PURE__ */ new Pe();
Zl.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function Zf(i, e, t, n, r, s) {
  const a = new Le(0);
  let o = r === !0 ? 0 : 1, c, l, h = null, d = 0, u = null;
  function p(y) {
    let R = y.isScene === !0 ? y.background : null;
    if (R && R.isTexture) {
      const S = y.backgroundBlurriness > 0;
      R = e.get(R, S);
    }
    return R;
  }
  function _(y) {
    let R = !1;
    const S = p(y);
    S === null ? m(a, o) : S && S.isColor && (m(S, 1), R = !0);
    const T = i.xr.getEnvironmentBlendMode();
    T === "additive" ? t.buffers.color.setClear(0, 0, 0, 1, s) : T === "alpha-blend" && t.buffers.color.setClear(0, 0, 0, 0, s), (i.autoClear || R) && (t.buffers.depth.setTest(!0), t.buffers.depth.setMask(!0), t.buffers.color.setMask(!0), i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil));
  }
  function M(y, R) {
    const S = p(R);
    S && (S.isCubeTexture || S.mapping === Gr) ? (l === void 0 && (l = new Bt(
      new Yi(1, 1, 1),
      new Jt({
        name: "BackgroundCubeMaterial",
        uniforms: vi(nn.backgroundCube.uniforms),
        vertexShader: nn.backgroundCube.vertexShader,
        fragmentShader: nn.backgroundCube.fragmentShader,
        side: Lt,
        depthTest: !1,
        depthWrite: !1,
        fog: !1,
        allowOverride: !1
      })
    ), l.geometry.deleteAttribute("normal"), l.geometry.deleteAttribute("uv"), l.onBeforeRender = function(T, b, A) {
      this.matrixWorld.copyPosition(A.matrixWorld);
    }, Object.defineProperty(l.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), n.update(l)), l.material.uniforms.envMap.value = S, l.material.uniforms.backgroundBlurriness.value = R.backgroundBlurriness, l.material.uniforms.backgroundIntensity.value = R.backgroundIntensity, l.material.uniforms.backgroundRotation.value.setFromMatrix4($f.makeRotationFromEuler(R.backgroundRotation)).transpose(), S.isCubeTexture && S.isRenderTargetTexture === !1 && l.material.uniforms.backgroundRotation.value.premultiply(Zl), l.material.toneMapped = Oe.getTransfer(S.colorSpace) !== Ze, (h !== S || d !== S.version || u !== i.toneMapping) && (l.material.needsUpdate = !0, h = S, d = S.version, u = i.toneMapping), l.layers.enableAll(), y.unshift(l, l.geometry, l.material, 0, 0, null)) : S && S.isTexture && (c === void 0 && (c = new Bt(
      new Wr(2, 2),
      new Jt({
        name: "BackgroundMaterial",
        uniforms: vi(nn.background.uniforms),
        vertexShader: nn.background.vertexShader,
        fragmentShader: nn.background.fragmentShader,
        side: In,
        depthTest: !1,
        depthWrite: !1,
        fog: !1,
        allowOverride: !1
      })
    ), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), n.update(c)), c.material.uniforms.t2D.value = S, c.material.uniforms.backgroundIntensity.value = R.backgroundIntensity, c.material.toneMapped = Oe.getTransfer(S.colorSpace) !== Ze, S.matrixAutoUpdate === !0 && S.updateMatrix(), c.material.uniforms.uvTransform.value.copy(S.matrix), (h !== S || d !== S.version || u !== i.toneMapping) && (c.material.needsUpdate = !0, h = S, d = S.version, u = i.toneMapping), c.layers.enableAll(), y.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function m(y, R) {
    y.getRGB(Sr, Gl(i)), t.buffers.color.setClear(Sr.r, Sr.g, Sr.b, R, s);
  }
  function f() {
    l !== void 0 && (l.geometry.dispose(), l.material.dispose(), l = void 0), c !== void 0 && (c.geometry.dispose(), c.material.dispose(), c = void 0);
  }
  return {
    getClearColor: function() {
      return a;
    },
    setClearColor: function(y, R = 1) {
      a.set(y), o = R, m(a, o);
    },
    getClearAlpha: function() {
      return o;
    },
    setClearAlpha: function(y) {
      o = y, m(a, o);
    },
    render: _,
    addToRenderList: M,
    dispose: f
  };
}
function Jf(i, e) {
  const t = i.getParameter(i.MAX_VERTEX_ATTRIBS), n = {}, r = u(null);
  let s = r, a = !1;
  function o(F, V, G, I, H) {
    let $ = !1;
    const K = d(F, I, G, V);
    s !== K && (s = K, l(s.object)), $ = p(F, I, G, H), $ && _(F, I, G, H), H !== null && e.update(H, i.ELEMENT_ARRAY_BUFFER), ($ || a) && (a = !1, S(F, V, G, I), H !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.get(H).buffer));
  }
  function c() {
    return i.createVertexArray();
  }
  function l(F) {
    return i.bindVertexArray(F);
  }
  function h(F) {
    return i.deleteVertexArray(F);
  }
  function d(F, V, G, I) {
    const H = I.wireframe === !0;
    let $ = n[V.id];
    $ === void 0 && ($ = {}, n[V.id] = $);
    const K = F.isInstancedMesh === !0 ? F.id : 0;
    let ne = $[K];
    ne === void 0 && (ne = {}, $[K] = ne);
    let X = ne[G.id];
    X === void 0 && (X = {}, ne[G.id] = X);
    let j = X[H];
    return j === void 0 && (j = u(c()), X[H] = j), j;
  }
  function u(F) {
    const V = [], G = [], I = [];
    for (let H = 0; H < t; H++)
      V[H] = 0, G[H] = 0, I[H] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: V,
      enabledAttributes: G,
      attributeDivisors: I,
      object: F,
      attributes: {},
      index: null
    };
  }
  function p(F, V, G, I) {
    const H = s.attributes, $ = V.attributes;
    let K = 0;
    const ne = G.getAttributes();
    for (const X in ne)
      if (ne[X].location >= 0) {
        const te = H[X];
        let we = $[X];
        if (we === void 0 && (X === "instanceMatrix" && F.instanceMatrix && (we = F.instanceMatrix), X === "instanceColor" && F.instanceColor && (we = F.instanceColor)), te === void 0 || te.attribute !== we || we && te.data !== we.data) return !0;
        K++;
      }
    return s.attributesNum !== K || s.index !== I;
  }
  function _(F, V, G, I) {
    const H = {}, $ = V.attributes;
    let K = 0;
    const ne = G.getAttributes();
    for (const X in ne)
      if (ne[X].location >= 0) {
        let te = $[X];
        te === void 0 && (X === "instanceMatrix" && F.instanceMatrix && (te = F.instanceMatrix), X === "instanceColor" && F.instanceColor && (te = F.instanceColor));
        const we = {};
        we.attribute = te, te && te.data && (we.data = te.data), H[X] = we, K++;
      }
    s.attributes = H, s.attributesNum = K, s.index = I;
  }
  function M() {
    const F = s.newAttributes;
    for (let V = 0, G = F.length; V < G; V++)
      F[V] = 0;
  }
  function m(F) {
    f(F, 0);
  }
  function f(F, V) {
    const G = s.newAttributes, I = s.enabledAttributes, H = s.attributeDivisors;
    G[F] = 1, I[F] === 0 && (i.enableVertexAttribArray(F), I[F] = 1), H[F] !== V && (i.vertexAttribDivisor(F, V), H[F] = V);
  }
  function y() {
    const F = s.newAttributes, V = s.enabledAttributes;
    for (let G = 0, I = V.length; G < I; G++)
      V[G] !== F[G] && (i.disableVertexAttribArray(G), V[G] = 0);
  }
  function R(F, V, G, I, H, $, K) {
    K === !0 ? i.vertexAttribIPointer(F, V, G, H, $) : i.vertexAttribPointer(F, V, G, I, H, $);
  }
  function S(F, V, G, I) {
    M();
    const H = I.attributes, $ = G.getAttributes(), K = V.defaultAttributeValues;
    for (const ne in $) {
      const X = $[ne];
      if (X.location >= 0) {
        let j = H[ne];
        if (j === void 0 && (ne === "instanceMatrix" && F.instanceMatrix && (j = F.instanceMatrix), ne === "instanceColor" && F.instanceColor && (j = F.instanceColor)), j !== void 0) {
          const te = j.normalized, we = j.itemSize, Ee = e.get(j);
          if (Ee === void 0) continue;
          const et = Ee.buffer, ke = Ee.type, qe = Ee.bytesPerElement, q = ke === i.INT || ke === i.UNSIGNED_INT || j.gpuType === Sa;
          if (j.isInterleavedBufferAttribute) {
            const Q = j.data, _e = Q.stride, Ce = j.offset;
            if (Q.isInstancedInterleavedBuffer) {
              for (let me = 0; me < X.locationSize; me++)
                f(X.location + me, Q.meshPerAttribute);
              F.isInstancedMesh !== !0 && I._maxInstanceCount === void 0 && (I._maxInstanceCount = Q.meshPerAttribute * Q.count);
            } else
              for (let me = 0; me < X.locationSize; me++)
                m(X.location + me);
            i.bindBuffer(i.ARRAY_BUFFER, et);
            for (let me = 0; me < X.locationSize; me++)
              R(
                X.location + me,
                we / X.locationSize,
                ke,
                te,
                _e * qe,
                (Ce + we / X.locationSize * me) * qe,
                q
              );
          } else {
            if (j.isInstancedBufferAttribute) {
              for (let Q = 0; Q < X.locationSize; Q++)
                f(X.location + Q, j.meshPerAttribute);
              F.isInstancedMesh !== !0 && I._maxInstanceCount === void 0 && (I._maxInstanceCount = j.meshPerAttribute * j.count);
            } else
              for (let Q = 0; Q < X.locationSize; Q++)
                m(X.location + Q);
            i.bindBuffer(i.ARRAY_BUFFER, et);
            for (let Q = 0; Q < X.locationSize; Q++)
              R(
                X.location + Q,
                we / X.locationSize,
                ke,
                te,
                we * qe,
                we / X.locationSize * Q * qe,
                q
              );
          }
        } else if (K !== void 0) {
          const te = K[ne];
          if (te !== void 0)
            switch (te.length) {
              case 2:
                i.vertexAttrib2fv(X.location, te);
                break;
              case 3:
                i.vertexAttrib3fv(X.location, te);
                break;
              case 4:
                i.vertexAttrib4fv(X.location, te);
                break;
              default:
                i.vertexAttrib1fv(X.location, te);
            }
        }
      }
    }
    y();
  }
  function T() {
    w();
    for (const F in n) {
      const V = n[F];
      for (const G in V) {
        const I = V[G];
        for (const H in I) {
          const $ = I[H];
          for (const K in $)
            h($[K].object), delete $[K];
          delete I[H];
        }
      }
      delete n[F];
    }
  }
  function b(F) {
    if (n[F.id] === void 0) return;
    const V = n[F.id];
    for (const G in V) {
      const I = V[G];
      for (const H in I) {
        const $ = I[H];
        for (const K in $)
          h($[K].object), delete $[K];
        delete I[H];
      }
    }
    delete n[F.id];
  }
  function A(F) {
    for (const V in n) {
      const G = n[V];
      for (const I in G) {
        const H = G[I];
        if (H[F.id] === void 0) continue;
        const $ = H[F.id];
        for (const K in $)
          h($[K].object), delete $[K];
        delete H[F.id];
      }
    }
  }
  function v(F) {
    for (const V in n) {
      const G = n[V], I = F.isInstancedMesh === !0 ? F.id : 0, H = G[I];
      if (H !== void 0) {
        for (const $ in H) {
          const K = H[$];
          for (const ne in K)
            h(K[ne].object), delete K[ne];
          delete H[$];
        }
        delete G[I], Object.keys(G).length === 0 && delete n[V];
      }
    }
  }
  function w() {
    D(), a = !0, s !== r && (s = r, l(s.object));
  }
  function D() {
    r.geometry = null, r.program = null, r.wireframe = !1;
  }
  return {
    setup: o,
    reset: w,
    resetDefaultState: D,
    dispose: T,
    releaseStatesOfGeometry: b,
    releaseStatesOfObject: v,
    releaseStatesOfProgram: A,
    initAttributes: M,
    enableAttribute: m,
    disableUnusedAttributes: y
  };
}
function Qf(i, e, t) {
  let n;
  function r(c) {
    n = c;
  }
  function s(c, l) {
    i.drawArrays(n, c, l), t.update(l, n, 1);
  }
  function a(c, l, h) {
    h !== 0 && (i.drawArraysInstanced(n, c, l, h), t.update(l, n, h));
  }
  function o(c, l, h) {
    if (h === 0) return;
    e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n, c, 0, l, 0, h);
    let u = 0;
    for (let p = 0; p < h; p++)
      u += l[p];
    t.update(u, n, 1);
  }
  this.setMode = r, this.render = s, this.renderInstances = a, this.renderMultiDraw = o;
}
function jf(i, e, t, n) {
  let r;
  function s() {
    if (r !== void 0) return r;
    if (e.has("EXT_texture_filter_anisotropic") === !0) {
      const A = e.get("EXT_texture_filter_anisotropic");
      r = i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      r = 0;
    return r;
  }
  function a(A) {
    return !(A !== Zt && n.convert(A) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function o(A) {
    const v = A === ln && (e.has("EXT_color_buffer_half_float") || e.has("EXT_color_buffer_float"));
    return !(A !== Ot && A !== rn && !v && n.convert(A) !== i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE));
  }
  function c(A) {
    if (A === "highp") {
      if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0)
        return "highp";
      A = "mediump";
    }
    return A === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let l = t.precision !== void 0 ? t.precision : "highp";
  const h = c(l);
  h !== l && (Re("WebGLRenderer:", l, "not supported, using", h, "instead."), l = h);
  const d = t.logarithmicDepthBuffer === !0, u = t.reversedDepthBuffer === !0 && e.has("EXT_clip_control");
  t.reversedDepthBuffer === !0 && u === !1 && Re("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");
  const p = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), _ = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), M = i.getParameter(i.MAX_TEXTURE_SIZE), m = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), f = i.getParameter(i.MAX_VERTEX_ATTRIBS), y = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), R = i.getParameter(i.MAX_VARYING_VECTORS), S = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), T = i.getParameter(i.MAX_SAMPLES), b = i.getParameter(i.SAMPLES);
  return {
    isWebGL2: !0,
    // keeping this for backwards compatibility
    getMaxAnisotropy: s,
    getMaxPrecision: c,
    textureFormatReadable: a,
    textureTypeReadable: o,
    precision: l,
    logarithmicDepthBuffer: d,
    reversedDepthBuffer: u,
    maxTextures: p,
    maxVertexTextures: _,
    maxTextureSize: M,
    maxCubemapSize: m,
    maxAttributes: f,
    maxVertexUniforms: y,
    maxVaryings: R,
    maxFragmentUniforms: S,
    maxSamples: T,
    samples: b
  };
}
function ep(i) {
  const e = this;
  let t = null, n = 0, r = !1, s = !1;
  const a = new Ln(), o = new Pe(), c = { value: null, needsUpdate: !1 };
  this.uniform = c, this.numPlanes = 0, this.numIntersection = 0, this.init = function(d, u) {
    const p = d.length !== 0 || u || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    n !== 0 || r;
    return r = u, n = d.length, p;
  }, this.beginShadows = function() {
    s = !0, h(null);
  }, this.endShadows = function() {
    s = !1;
  }, this.setGlobalState = function(d, u) {
    t = h(d, u, 0);
  }, this.setState = function(d, u, p) {
    const _ = d.clippingPlanes, M = d.clipIntersection, m = d.clipShadows, f = i.get(d);
    if (!r || _ === null || _.length === 0 || s && !m)
      s ? h(null) : l();
    else {
      const y = s ? 0 : n, R = y * 4;
      let S = f.clippingState || null;
      c.value = S, S = h(_, u, R, p);
      for (let T = 0; T !== R; ++T)
        S[T] = t[T];
      f.clippingState = S, this.numIntersection = M ? this.numPlanes : 0, this.numPlanes += y;
    }
  };
  function l() {
    c.value !== t && (c.value = t, c.needsUpdate = n > 0), e.numPlanes = n, e.numIntersection = 0;
  }
  function h(d, u, p, _) {
    const M = d !== null ? d.length : 0;
    let m = null;
    if (M !== 0) {
      if (m = c.value, _ !== !0 || m === null) {
        const f = p + M * 4, y = u.matrixWorldInverse;
        o.getNormalMatrix(y), (m === null || m.length < f) && (m = new Float32Array(f));
        for (let R = 0, S = p; R !== M; ++R, S += 4)
          a.copy(d[R]).applyMatrix4(y, o), a.normal.toArray(m, S), m[S + 3] = a.constant;
      }
      c.value = m, c.needsUpdate = !0;
    }
    return e.numPlanes = M, e.numIntersection = 0, m;
  }
}
const fi = 4, tp = 6, np = 20, ip = 256, Ci = /* @__PURE__ */ new Oa(), Vo = /* @__PURE__ */ new Le();
let ys = null, Es = 0, Ts = 0, ws = !1;
const rp = /* @__PURE__ */ new U(), zn = /* @__PURE__ */ new U();
class Ho {
  /**
   * Constructs a new PMREM generator.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   */
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._sizeLods = [], this._lodMeshes = [], this._backgroundBox = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null;
  }
  /**
   * Generates a PMREM from a supplied Scene, which can be faster than using an
   * image if networking bandwidth is low. Optional sigma specifies a blur radius
   * in radians to be applied to the scene before PMREM generation. Optional near
   * and far planes ensure the scene is rendered in its entirety.
   *
   * @param {Scene} scene - The scene to be captured.
   * @param {number} [sigma=0] - The blur radius in radians.
   * @param {number} [near=0.1] - The near plane distance.
   * @param {number} [far=100] - The far plane distance.
   * @param {Object} [options={}] - The configuration options.
   * @param {number} [options.size=256] - The texture size of the PMREM.
   * @param {Vector3} [options.position=origin] - The position of the internal cube camera that renders the scene.
   * @return {WebGLRenderTarget} The resulting PMREM.
   */
  fromScene(e, t = 0, n = 0.1, r = 100, s = {}) {
    const {
      size: a = 256,
      position: o = rp
    } = s;
    ys = this._renderer.getRenderTarget(), Es = this._renderer.getActiveCubeFace(), Ts = this._renderer.getActiveMipmapLevel(), ws = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(a);
    const c = this._allocateTargets();
    return c.depthBuffer = !0, this._sceneToCubeUV(e, n, r, c, o), t > 0 && this._blur(c, 0, 0, t), this._applyPMREM(c), this._cleanup(c), c;
  }
  /**
   * Generates a PMREM from an equirectangular texture, which can be either LDR
   * or HDR. The ideal input image size is 1k (1024 x 512), as this matches best
   * with the 256 x 256 cubemap output. The minimum supported input image size
   * is 64 x 32.
   *
   * @param {Texture} equirectangular - The equirectangular texture to be converted.
   * @param {?WebGLRenderTarget} [renderTarget=null] - The render target to use.
   * @return {WebGLRenderTarget} The resulting PMREM.
   */
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Generates a PMREM from an cubemap texture, which can be either LDR
   * or HDR. The ideal input cube size is 256 x 256, as this matches best
   * with the 256 x 256 cubemap output. The minimum supported input cube
   * size is 16 x 16 per face.
   *
   * @param {Texture} cubemap - The cubemap texture to be converted.
   * @param {?WebGLRenderTarget} [renderTarget=null] - The render target to use.
   * @return {WebGLRenderTarget} The resulting PMREM.
   */
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = Wo(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = Go(), this._compileMaterial(this._equirectMaterial));
  }
  /**
   * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
   * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
   * one of them will cause any others to also become unusable.
   */
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose(), this._backgroundBox !== null && (this._backgroundBox.geometry.dispose(), this._backgroundBox.material.dispose());
  }
  // private interface
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._ggxMaterial !== null && this._ggxMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodMeshes.length; e++)
      this._lodMeshes[e].geometry.dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(ys, Es, Ts), this._renderer.xr.enabled = ws, e.scissorTest = !1, li(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === Gn || e.mapping === _i ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), ys = this._renderer.getRenderTarget(), Es = this._renderer.getActiveCubeFace(), Ts = this._renderer.getActiveMipmapLevel(), ws = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const n = t || this._allocateTargets();
    return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = {
      magFilter: At,
      minFilter: At,
      generateMipmaps: !1,
      type: ln,
      format: Zt,
      colorSpace: Or,
      depthBuffer: !1
    }, r = ko(e, t, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = ko(e, t, n);
      const { _lodMax: s } = this;
      ({ lodMeshes: this._lodMeshes, sizeLods: this._sizeLods } = sp(s)), this._blurMaterial = op(s, e, t), this._ggxMaterial = ap(s, e, t);
    }
    return r;
  }
  _compileMaterial(e) {
    const t = new Bt(new Dt(), e);
    this._renderer.compile(t, Ci);
  }
  _sceneToCubeUV(e, t, n, r, s) {
    const c = new kt(90, 1, t, n), l = [1, -1, 1, 1, 1, 1], h = [1, 1, 1, -1, -1, -1], d = this._renderer, u = d.autoClear, p = d.toneMapping;
    d.getClearColor(Vo), d.toneMapping = an, d.autoClear = !1, d.state.buffers.depth.getReversed() && (d.setRenderTarget(r), d.clearDepth(), d.setRenderTarget(null)), this._backgroundBox === null && (this._backgroundBox = new Bt(
      new Yi(),
      new Ia({
        name: "PMREM.Background",
        side: Lt,
        depthWrite: !1,
        depthTest: !1
      })
    ));
    const M = this._backgroundBox, m = M.material;
    let f = !1;
    const y = e.background;
    y ? y.isColor && (m.color.copy(y), e.background = null, f = !0) : (m.color.copy(Vo), f = !0);
    for (let R = 0; R < 6; R++) {
      const S = R % 3;
      S === 0 ? (c.up.set(0, l[R], 0), c.position.set(s.x, s.y, s.z), c.lookAt(s.x + h[R], s.y, s.z)) : S === 1 ? (c.up.set(0, 0, l[R]), c.position.set(s.x, s.y, s.z), c.lookAt(s.x, s.y + h[R], s.z)) : (c.up.set(0, l[R], 0), c.position.set(s.x, s.y, s.z), c.lookAt(s.x, s.y, s.z + h[R]));
      const T = this._cubeSize;
      li(r, S * T, R > 2 ? T : 0, T, T), d.setRenderTarget(r), f && d.render(M, c), d.render(e, c);
    }
    d.toneMapping = p, d.autoClear = u, e.background = y;
  }
  _textureToCubeUV(e, t) {
    const n = this._renderer, r = e.mapping === Gn || e.mapping === _i;
    r ? (this._cubemapMaterial === null && (this._cubemapMaterial = Wo()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = Go());
    const s = r ? this._cubemapMaterial : this._equirectMaterial, a = this._lodMeshes[0];
    a.material = s;
    const o = s.uniforms;
    o.envMap.value = e;
    const c = this._cubeSize;
    li(t, 0, 0, 3 * c, 2 * c), n.setRenderTarget(t), n.render(a, Ci);
  }
  _applyPMREM(e) {
    const t = this._renderer, n = t.autoClear;
    t.autoClear = !1;
    const r = this._lodMeshes.length;
    for (let s = 1; s < r; s++)
      this._applyGGXFilter(e, s - 1, s);
    t.autoClear = n;
  }
  /**
   * Applies GGX VNDF importance sampling filter to generate a prefiltered environment map.
   * Uses Monte Carlo integration with VNDF importance sampling to accurately represent the
   * GGX BRDF for physically-based rendering. Reads from the previous LOD level and
   * applies incremental roughness filtering to avoid over-blurring.
   *
   * @private
   * @param {WebGLRenderTarget} cubeUVRenderTarget
   * @param {number} lodIn - Source LOD level to read from
   * @param {number} lodOut - Target LOD level to write to
   */
  _applyGGXFilter(e, t, n) {
    const r = this._renderer, s = this._pingPongRenderTarget, a = this._ggxMaterial, o = this._lodMeshes[n];
    o.material = a;
    const c = a.uniforms, l = n / (this._lodMeshes.length - 1), h = t / (this._lodMeshes.length - 1), d = Math.sqrt(l * l - h * h), u = l * 1.25, p = d * u, { _lodMax: _ } = this, M = this._sizeLods[n], m = 3 * M * (n > _ - fi ? n - _ + fi : 0), f = 4 * (this._cubeSize - M);
    c.envMap.value = e.texture, c.roughness.value = p, c.mipInt.value = _ - t, li(s, m, f, 3 * M, 2 * M), r.setRenderTarget(s), r.render(o, Ci), c.envMap.value = s.texture, c.roughness.value = 0, c.mipInt.value = _ - n, li(e, m, f, 3 * M, 2 * M), r.setRenderTarget(e), r.render(o, Ci);
  }
  /**
   * This is a two-pass Gaussian blur for a cubemap. Each pass importance-samples
   * the Gaussian along a spiral kernel (Golden Angle), which distributes samples
   * isotropically on the sphere (no pole artifacts).
   *
   * Used for initial scene blur in fromScene() method when sigma > 0.
   *
   * @private
   * @param {WebGLRenderTarget} cubeUVRenderTarget
   * @param {number} lodIn
   * @param {number} lodOut
   * @param {number} sigma
   */
  _blur(e, t, n, r) {
    const s = this._pingPongRenderTarget, a = Math.min(r, Math.PI) / Math.SQRT2;
    this._blurPass(e, s, t, n, a), this._blurPass(s, e, n, n, a);
  }
  _blurPass(e, t, n, r, s) {
    const a = this._renderer, o = this._blurMaterial, c = this._lodMeshes[r];
    c.material = o;
    const l = o.uniforms;
    l.envMap.value = e.texture, l.sigma.value = s, l.mipInt.value = this._lodMax - n;
    const h = this._sizeLods[r], d = 3 * h * (r > this._lodMax - fi ? r - this._lodMax + fi : 0), u = 4 * (this._cubeSize - h);
    li(t, d, u, 3 * h, 2 * h), a.setRenderTarget(t), a.render(c, Ci);
  }
}
function sp(i) {
  const e = [], t = [];
  let n = i;
  const r = i - fi + 1 + tp;
  for (let s = 0; s < r; s++) {
    const a = Math.pow(2, n);
    e.push(a);
    const o = 1 / (a - 2), c = -o, l = 1 + o, h = [c, c, l, c, l, l, c, c, l, l, c, l], d = 6, u = 6, p = 3, _ = new Float32Array(p * u * d), M = new Float32Array(p * u * d);
    for (let f = 0; f < d; f++) {
      const y = f % 3 * 2 / 3 - 1, R = f > 2 ? 0 : -1, S = [
        y,
        R,
        0,
        y + 2 / 3,
        R,
        0,
        y + 2 / 3,
        R + 1,
        0,
        y,
        R,
        0,
        y + 2 / 3,
        R + 1,
        0,
        y,
        R + 1,
        0
      ];
      _.set(S, p * u * f);
      for (let T = 0; T < u; T++) {
        const b = h[T * 2] * 2 - 1, A = h[T * 2 + 1] * 2 - 1;
        f === 0 ? zn.set(1, A, b) : f === 1 ? zn.set(-b, 1, -A) : f === 2 ? zn.set(-b, A, 1) : f === 3 ? zn.set(-1, A, -b) : f === 4 ? zn.set(-b, -1, A) : zn.set(b, A, -1), zn.toArray(M, (f * u + T) * p);
      }
    }
    const m = new Dt();
    m.setAttribute("position", new Mn(_, p)), m.setAttribute("outputDirection", new Mn(M, p)), t.push(new Bt(m, null)), n > fi && n--;
  }
  return { lodMeshes: t, sizeLods: e };
}
function ko(i, e, t) {
  const n = new Gt(i, e, t);
  return n.texture.mapping = Gr, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function li(i, e, t, n, r) {
  i.viewport.set(e, t, n, r), i.scissor.set(e, t, n, r);
}
function ap(i, e, t) {
  return new Jt({
    name: "PMREMGGXConvolution",
    defines: {
      GGX_SAMPLES: ip,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${i}.0`
    },
    uniforms: {
      envMap: { value: null },
      roughness: { value: 0 },
      mipInt: { value: 0 }
    },
    vertexShader: Xr(),
    fragmentShader: (
      /* glsl */
      `

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`
    ),
    blending: vn,
    depthTest: !1,
    depthWrite: !1
  });
}
function op(i, e, t) {
  return new Jt({
    name: "SphericalGaussianBlur",
    defines: {
      SAMPLES: np,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${i}.0`
    },
    uniforms: {
      envMap: { value: null },
      sigma: { value: 0 },
      mipInt: { value: 0 }
    },
    vertexShader: Xr(),
    fragmentShader: (
      /* glsl */
      `

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`
    ),
    blending: vn,
    depthTest: !1,
    depthWrite: !1
  });
}
function Go() {
  return new Jt({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: Xr(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`
    ),
    blending: vn,
    depthTest: !1,
    depthWrite: !1
  });
}
function Wo() {
  return new Jt({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: Xr(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`
    ),
    blending: vn,
    depthTest: !1,
    depthWrite: !1
  });
}
function Xr() {
  return (
    /* glsl */
    `

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`
  );
}
class Jl extends Gt {
  /**
   * Constructs a new cube render target.
   *
   * @param {number} [size=1] - The size of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = !0;
    const n = { width: e, height: e, depth: 1 }, r = [n, n, n, n, n, n];
    this.texture = new Hl(r), this._setTextureOptions(t), this.texture.isRenderTargetTexture = !0;
  }
  /**
   * Converts the given equirectangular texture to a cube map.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {Texture} texture - The equirectangular texture.
   * @return {WebGLCubeRenderTarget} A reference to this cube render target.
   */
  fromEquirectangularTexture(e, t) {
    this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
    const n = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: (
        /* glsl */
        `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      )
    }, r = new Yi(5, 5, 5), s = new Jt({
      name: "CubemapFromEquirect",
      uniforms: vi(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: Lt,
      blending: vn
    });
    s.uniforms.tEquirect.value = t;
    const a = new Bt(r, s), o = t.minFilter;
    return t.minFilter === Vn && (t.minFilter = At), new lu(1, 10, this).update(e, a), t.minFilter = o, a.geometry.dispose(), a.material.dispose(), this;
  }
  /**
   * Clears this cube render target.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {boolean} [color=true] - Whether the color buffer should be cleared or not.
   * @param {boolean} [depth=true] - Whether the depth buffer should be cleared or not.
   * @param {boolean} [stencil=true] - Whether the stencil buffer should be cleared or not.
   */
  clear(e, t = !0, n = !0, r = !0) {
    const s = e.getRenderTarget();
    for (let a = 0; a < 6; a++)
      e.setRenderTarget(this, a), e.clear(t, n, r);
    e.setRenderTarget(s);
  }
}
function lp(i) {
  let e = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap(), n = null;
  function r(u, p = !1) {
    return u == null ? null : p ? a(u) : s(u);
  }
  function s(u) {
    if (u && u.isTexture) {
      const p = u.mapping;
      if (p === Zr || p === Jr)
        if (e.has(u)) {
          const _ = e.get(u).texture;
          return o(_, u.mapping);
        } else {
          const _ = u.image;
          if (_ && _.height > 0) {
            const M = new Jl(_.height);
            return M.fromEquirectangularTexture(i, u), e.set(u, M), u.addEventListener("dispose", l), o(M.texture, u.mapping);
          } else
            return null;
        }
    }
    return u;
  }
  function a(u) {
    if (u && u.isTexture) {
      const p = u.mapping, _ = p === Zr || p === Jr, M = p === Gn || p === _i;
      if (_ || M) {
        let m = t.get(u);
        const f = m !== void 0 ? m.texture.pmremVersion : 0;
        if (u.isRenderTargetTexture && u.pmremVersion !== f)
          return n === null && (n = new Ho(i)), m = _ ? n.fromEquirectangular(u, m) : n.fromCubemap(u, m), m.texture.pmremVersion = u.pmremVersion, t.set(u, m), m.texture;
        if (m !== void 0)
          return m.texture;
        {
          const y = u.image;
          return _ && y && y.height > 0 || M && y && c(y) ? (n === null && (n = new Ho(i)), m = _ ? n.fromEquirectangular(u) : n.fromCubemap(u), m.texture.pmremVersion = u.pmremVersion, t.set(u, m), u.addEventListener("dispose", h), m.texture) : null;
        }
      }
    }
    return u;
  }
  function o(u, p) {
    return p === Zr ? u.mapping = Gn : p === Jr && (u.mapping = _i), u;
  }
  function c(u) {
    let p = 0;
    const _ = 6;
    for (let M = 0; M < _; M++)
      u[M] !== void 0 && p++;
    return p === _;
  }
  function l(u) {
    const p = u.target;
    p.removeEventListener("dispose", l);
    const _ = e.get(p);
    _ !== void 0 && (e.delete(p), _.dispose());
  }
  function h(u) {
    const p = u.target;
    p.removeEventListener("dispose", h);
    const _ = t.get(p);
    _ !== void 0 && (t.delete(p), _.dispose());
  }
  function d() {
    e = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap(), n !== null && (n.dispose(), n = null);
  }
  return {
    get: r,
    dispose: d
  };
}
function cp(i) {
  const e = {};
  function t(n) {
    if (e[n] !== void 0)
      return e[n];
    const r = i.getExtension(n);
    return e[n] = r, r;
  }
  return {
    has: function(n) {
      return t(n) !== null;
    },
    init: function() {
      t("EXT_color_buffer_float"), t("WEBGL_clip_cull_distance"), t("OES_texture_float_linear"), t("EXT_color_buffer_half_float"), t("WEBGL_multisampled_render_to_texture"), t("WEBGL_render_shared_exponent");
    },
    get: function(n) {
      const r = t(n);
      return r === null && mi("WebGLRenderer: " + n + " extension not supported."), r;
    }
  };
}
function hp(i, e, t, n) {
  const r = {}, s = /* @__PURE__ */ new WeakMap();
  function a(d) {
    const u = d.target;
    u.index !== null && e.remove(u.index);
    for (const _ in u.attributes)
      e.remove(u.attributes[_]);
    u.removeEventListener("dispose", a), delete r[u.id];
    const p = s.get(u);
    p && (e.remove(p), s.delete(u)), n.releaseStatesOfGeometry(u), u.isInstancedBufferGeometry === !0 && delete u._maxInstanceCount, t.memory.geometries--;
  }
  function o(d, u) {
    return r[u.id] === !0 || (u.addEventListener("dispose", a), r[u.id] = !0, t.memory.geometries++), u;
  }
  function c(d) {
    const u = d.attributes;
    for (const p in u)
      e.update(u[p], i.ARRAY_BUFFER);
  }
  function l(d) {
    const u = [], p = d.index, _ = d.attributes.position;
    let M = 0;
    if (_ === void 0)
      return;
    if (p !== null) {
      const y = p.array;
      M = p.version;
      for (let R = 0, S = y.length; R < S; R += 3) {
        const T = y[R + 0], b = y[R + 1], A = y[R + 2];
        u.push(T, b, b, A, A, T);
      }
    } else {
      const y = _.array;
      M = _.version;
      for (let R = 0, S = y.length / 3 - 1; R < S; R += 3) {
        const T = R + 0, b = R + 1, A = R + 2;
        u.push(T, b, b, A, A, T);
      }
    }
    const m = new (_.count >= 65535 ? Vl : zl)(u, 1);
    m.version = M;
    const f = s.get(d);
    f && e.remove(f), s.set(d, m);
  }
  function h(d) {
    const u = s.get(d);
    if (u) {
      const p = d.index;
      p !== null && u.version < p.version && l(d);
    } else
      l(d);
    return s.get(d);
  }
  return {
    get: o,
    update: c,
    getWireframeAttribute: h
  };
}
function up(i, e, t) {
  let n;
  function r(d) {
    n = d;
  }
  let s, a;
  function o(d) {
    s = d.type, a = d.bytesPerElement;
  }
  function c(d, u) {
    i.drawElements(n, u, s, d * a), t.update(u, n, 1);
  }
  function l(d, u, p) {
    p !== 0 && (i.drawElementsInstanced(n, u, s, d * a, p), t.update(u, n, p));
  }
  function h(d, u, p) {
    if (p === 0) return;
    e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n, u, 0, s, d, 0, p);
    let M = 0;
    for (let m = 0; m < p; m++)
      M += u[m];
    t.update(M, n, 1);
  }
  this.setMode = r, this.setIndex = o, this.render = c, this.renderInstances = l, this.renderMultiDraw = h;
}
function dp(i) {
  const e = {
    geometries: 0,
    textures: 0
  }, t = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function n(s, a, o) {
    switch (t.calls++, a) {
      case i.TRIANGLES:
        t.triangles += o * (s / 3);
        break;
      case i.LINES:
        t.lines += o * (s / 2);
        break;
      case i.LINE_STRIP:
        t.lines += o * (s - 1);
        break;
      case i.LINE_LOOP:
        t.lines += o * s;
        break;
      case i.POINTS:
        t.points += o * s;
        break;
      default:
        Xe("WebGLInfo: Unknown draw mode:", a);
        break;
    }
  }
  function r() {
    t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0;
  }
  return {
    memory: e,
    render: t,
    programs: null,
    autoReset: !0,
    reset: r,
    update: n
  };
}
function fp(i, e, t) {
  const n = /* @__PURE__ */ new WeakMap(), r = new lt();
  function s(a, o, c) {
    const l = a.morphTargetInfluences, h = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, d = h !== void 0 ? h.length : 0;
    let u = n.get(o);
    if (u === void 0 || u.count !== d) {
      let w = function() {
        A.dispose(), n.delete(o), o.removeEventListener("dispose", w);
      };
      u !== void 0 && u.texture.dispose();
      const p = o.morphAttributes.position !== void 0, _ = o.morphAttributes.normal !== void 0, M = o.morphAttributes.color !== void 0, m = o.morphAttributes.position || [], f = o.morphAttributes.normal || [], y = o.morphAttributes.color || [];
      let R = 0;
      p === !0 && (R = 1), _ === !0 && (R = 2), M === !0 && (R = 3);
      let S = o.attributes.position.count * R, T = 1;
      S > e.maxTextureSize && (T = Math.ceil(S / e.maxTextureSize), S = e.maxTextureSize);
      const b = new Float32Array(S * T * 4 * d), A = new La(b, S, T, d);
      A.type = rn, A.needsUpdate = !0;
      const v = R * 4;
      for (let D = 0; D < d; D++) {
        const F = m[D], V = f[D], G = y[D], I = S * T * 4 * D;
        for (let H = 0; H < F.count; H++) {
          const $ = H * v;
          p === !0 && (r.fromBufferAttribute(F, H), b[I + $ + 0] = r.x, b[I + $ + 1] = r.y, b[I + $ + 2] = r.z, b[I + $ + 3] = 0), _ === !0 && (r.fromBufferAttribute(V, H), b[I + $ + 4] = r.x, b[I + $ + 5] = r.y, b[I + $ + 6] = r.z, b[I + $ + 7] = 0), M === !0 && (r.fromBufferAttribute(G, H), b[I + $ + 8] = r.x, b[I + $ + 9] = r.y, b[I + $ + 10] = r.z, b[I + $ + 11] = G.itemSize === 4 ? r.w : 1);
        }
      }
      u = {
        count: d,
        texture: A,
        size: new Ne(S, T)
      }, n.set(o, u), o.addEventListener("dispose", w);
    }
    if (a.isInstancedMesh === !0 && a.morphTexture !== null)
      c.getUniforms().setValue(i, "morphTexture", a.morphTexture, t);
    else {
      let p = 0;
      for (let M = 0; M < l.length; M++)
        p += l[M];
      const _ = o.morphTargetsRelative ? 1 : 1 - p;
      c.getUniforms().setValue(i, "morphTargetBaseInfluence", _), c.getUniforms().setValue(i, "morphTargetInfluences", l);
    }
    c.getUniforms().setValue(i, "morphTargetsTexture", u.texture, t), c.getUniforms().setValue(i, "morphTargetsTextureSize", u.size);
  }
  return {
    update: s
  };
}
function pp(i, e, t, n, r) {
  let s = /* @__PURE__ */ new WeakMap();
  function a(l) {
    const h = r.render.frame, d = l.geometry, u = e.get(l, d);
    if (s.get(u) !== h && (e.update(u), s.set(u, h)), l.isInstancedMesh && (l.hasEventListener("dispose", c) === !1 && l.addEventListener("dispose", c), s.get(l) !== h && (t.update(l.instanceMatrix, i.ARRAY_BUFFER), l.instanceColor !== null && t.update(l.instanceColor, i.ARRAY_BUFFER), s.set(l, h))), l.isSkinnedMesh) {
      const p = l.skeleton;
      s.get(p) !== h && (p.update(), s.set(p, h));
    }
    return u;
  }
  function o() {
    s = /* @__PURE__ */ new WeakMap();
  }
  function c(l) {
    const h = l.target;
    h.removeEventListener("dispose", c), n.releaseStatesOfObject(h), t.remove(h.instanceMatrix), h.instanceColor !== null && t.remove(h.instanceColor);
  }
  return {
    update: a,
    dispose: o
  };
}
const mp = {
  [Ml]: "LINEAR_TONE_MAPPING",
  [Sl]: "REINHARD_TONE_MAPPING",
  [bl]: "CINEON_TONE_MAPPING",
  [yl]: "ACES_FILMIC_TONE_MAPPING",
  [Tl]: "AGX_TONE_MAPPING",
  [wl]: "NEUTRAL_TONE_MAPPING",
  [El]: "CUSTOM_TONE_MAPPING"
};
function gp(i, e, t, n, r, s) {
  const a = new Gt(e, t, {
    type: i,
    depthBuffer: r,
    stencilBuffer: s,
    samples: n ? 4 : 0,
    storeMultisampledDepthBuffer: !1,
    storeMultisampledStencilBuffer: !1,
    resolveDepthBuffer: !1,
    resolveStencilBuffer: !1
  });
  let o = null, c = null;
  const l = new Dt();
  l.setAttribute("position", new ft([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), l.setAttribute("uv", new ft([0, 2, 0, 0, 2, 0], 2));
  const h = new Jh({
    uniforms: {
      tDiffuse: { value: null }
    },
    vertexShader: (
      /* glsl */
      `
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`
    ),
    fragmentShader: (
      /* glsl */
      `
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`
    ),
    depthTest: !1,
    depthWrite: !1
  }), d = new Bt(l, h), u = new Oa(-1, 1, 1, -1, 0, 1);
  let p = null, _ = null, M = !1, m, f = null, y = [], R = !1;
  this.setSize = function(S, T) {
    a.setSize(S, T), o !== null && o.setSize(S, T), c !== null && c.setSize(S, T);
    for (let b = 0; b < y.length; b++) {
      const A = y[b];
      A.setSize && A.setSize(S, T);
    }
  }, this.setEffects = function(S) {
    y = S, R = y.length > 0 && y[0].isRenderPass === !0;
    const T = a.width, b = a.height;
    y.length > 0 && o === null && (o = new Gt(T, b, { type: ln, depthBuffer: !1, stencilBuffer: !1 }), c = new Gt(T, b, { type: ln, depthBuffer: !1, stencilBuffer: !1 }));
    for (let A = 0; A < y.length; A++) {
      const v = y[A];
      v.setSize && v.setSize(T, b);
    }
  }, this.begin = function(S, T) {
    if (M || S.toneMapping === an && y.length === 0) return !1;
    if (f = T, T !== null) {
      const b = T.width, A = T.height;
      (a.width !== b || a.height !== A) && this.setSize(b, A);
    }
    return R === !1 && S.setRenderTarget(a), m = S.toneMapping, S.toneMapping = an, !0;
  }, this.hasRenderPass = function() {
    return R;
  }, this.end = function(S, T) {
    S.toneMapping = m, M = !0;
    let b = a, A = o;
    for (let v = 0; v < y.length; v++) {
      const w = y[v];
      w.enabled !== !1 && (w.render(S, A, b, T), w.needsSwap !== !1 && (b = A, A = A === o ? c : o));
    }
    if (p !== S.outputColorSpace || _ !== S.toneMapping) {
      p = S.outputColorSpace, _ = S.toneMapping, h.defines = {}, Oe.getTransfer(p) === Ze && (h.defines.SRGB_TRANSFER = "");
      const v = mp[_];
      v && (h.defines[v] = ""), h.needsUpdate = !0;
    }
    h.uniforms.tDiffuse.value = b.texture, S.setRenderTarget(f), S.render(d, u), f = null, M = !1;
  }, this.isCompositing = function() {
    return M;
  }, this.dispose = function() {
    a.dispose(), o !== null && o.dispose(), c !== null && c.dispose(), l.dispose(), h.dispose();
  };
}
const Ql = /* @__PURE__ */ new pt(), ma = /* @__PURE__ */ new Xi(1, 1), jl = /* @__PURE__ */ new La(), ec = /* @__PURE__ */ new Rh(), tc = /* @__PURE__ */ new Hl(), Xo = [], qo = [], Yo = new Float32Array(16), Ko = new Float32Array(9), $o = new Float32Array(4);
function bi(i, e, t) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const r = e * t;
  let s = Xo[r];
  if (s === void 0 && (s = new Float32Array(r), Xo[r] = s), e !== 0) {
    n.toArray(s, 0);
    for (let a = 1, o = 0; a !== e; ++a)
      o += t, i[a].toArray(s, o);
  }
  return s;
}
function gt(i, e) {
  if (i.length !== e.length) return !1;
  for (let t = 0, n = i.length; t < n; t++)
    if (i[t] !== e[t]) return !1;
  return !0;
}
function _t(i, e) {
  for (let t = 0, n = e.length; t < n; t++)
    i[t] = e[t];
}
function qr(i, e) {
  let t = qo[e];
  t === void 0 && (t = new Int32Array(e), qo[e] = t);
  for (let n = 0; n !== e; ++n)
    t[n] = i.allocateTextureUnit();
  return t;
}
function _p(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1f(this.addr, e), t[0] = e);
}
function vp(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2f(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (gt(t, e)) return;
    i.uniform2fv(this.addr, e), _t(t, e);
  }
}
function xp(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else if (e.r !== void 0)
    (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (i.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b);
  else {
    if (gt(t, e)) return;
    i.uniform3fv(this.addr, e), _t(t, e);
  }
}
function Mp(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (gt(t, e)) return;
    i.uniform4fv(this.addr, e), _t(t, e);
  }
}
function Sp(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (gt(t, e)) return;
    i.uniformMatrix2fv(this.addr, !1, e), _t(t, e);
  } else {
    if (gt(t, n)) return;
    $o.set(n), i.uniformMatrix2fv(this.addr, !1, $o), _t(t, n);
  }
}
function bp(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (gt(t, e)) return;
    i.uniformMatrix3fv(this.addr, !1, e), _t(t, e);
  } else {
    if (gt(t, n)) return;
    Ko.set(n), i.uniformMatrix3fv(this.addr, !1, Ko), _t(t, n);
  }
}
function yp(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (gt(t, e)) return;
    i.uniformMatrix4fv(this.addr, !1, e), _t(t, e);
  } else {
    if (gt(t, n)) return;
    Yo.set(n), i.uniformMatrix4fv(this.addr, !1, Yo), _t(t, n);
  }
}
function Ep(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1i(this.addr, e), t[0] = e);
}
function Tp(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2i(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (gt(t, e)) return;
    i.uniform2iv(this.addr, e), _t(t, e);
  }
}
function wp(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3i(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (gt(t, e)) return;
    i.uniform3iv(this.addr, e), _t(t, e);
  }
}
function Ap(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4i(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (gt(t, e)) return;
    i.uniform4iv(this.addr, e), _t(t, e);
  }
}
function Rp(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1ui(this.addr, e), t[0] = e);
}
function Cp(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2ui(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (gt(t, e)) return;
    i.uniform2uiv(this.addr, e), _t(t, e);
  }
}
function Pp(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3ui(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (gt(t, e)) return;
    i.uniform3uiv(this.addr, e), _t(t, e);
  }
}
function Lp(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4ui(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (gt(t, e)) return;
    i.uniform4uiv(this.addr, e), _t(t, e);
  }
}
function Dp(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r);
  let s;
  this.type === i.SAMPLER_2D_SHADOW ? (ma.compareFunction = t.isReversedDepthBuffer() ? Ra : Aa, s = ma) : s = Ql, t.setTexture2D(e || s, r);
}
function Ip(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTexture3D(e || ec, r);
}
function Up(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTextureCube(e || tc, r);
}
function Np(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTexture2DArray(e || jl, r);
}
function Fp(i) {
  switch (i) {
    case 5126:
      return _p;
    // FLOAT
    case 35664:
      return vp;
    // _VEC2
    case 35665:
      return xp;
    // _VEC3
    case 35666:
      return Mp;
    // _VEC4
    case 35674:
      return Sp;
    // _MAT2
    case 35675:
      return bp;
    // _MAT3
    case 35676:
      return yp;
    // _MAT4
    case 5124:
    case 35670:
      return Ep;
    // INT, BOOL
    case 35667:
    case 35671:
      return Tp;
    // _VEC2
    case 35668:
    case 35672:
      return wp;
    // _VEC3
    case 35669:
    case 35673:
      return Ap;
    // _VEC4
    case 5125:
      return Rp;
    // UINT
    case 36294:
      return Cp;
    // _VEC2
    case 36295:
      return Pp;
    // _VEC3
    case 36296:
      return Lp;
    // _VEC4
    case 35678:
    // SAMPLER_2D
    case 36198:
    // SAMPLER_EXTERNAL_OES
    case 36298:
    // INT_SAMPLER_2D
    case 36306:
    // UNSIGNED_INT_SAMPLER_2D
    case 35682:
      return Dp;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return Ip;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return Up;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return Np;
  }
}
function Op(i, e) {
  i.uniform1fv(this.addr, e);
}
function Bp(i, e) {
  const t = bi(e, this.size, 2);
  i.uniform2fv(this.addr, t);
}
function zp(i, e) {
  const t = bi(e, this.size, 3);
  i.uniform3fv(this.addr, t);
}
function Vp(i, e) {
  const t = bi(e, this.size, 4);
  i.uniform4fv(this.addr, t);
}
function Hp(i, e) {
  const t = bi(e, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, t);
}
function kp(i, e) {
  const t = bi(e, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, t);
}
function Gp(i, e) {
  const t = bi(e, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, t);
}
function Wp(i, e) {
  i.uniform1iv(this.addr, e);
}
function Xp(i, e) {
  i.uniform2iv(this.addr, e);
}
function qp(i, e) {
  i.uniform3iv(this.addr, e);
}
function Yp(i, e) {
  i.uniform4iv(this.addr, e);
}
function Kp(i, e) {
  i.uniform1uiv(this.addr, e);
}
function $p(i, e) {
  i.uniform2uiv(this.addr, e);
}
function Zp(i, e) {
  i.uniform3uiv(this.addr, e);
}
function Jp(i, e) {
  i.uniform4uiv(this.addr, e);
}
function Qp(i, e, t) {
  const n = this.cache, r = e.length, s = qr(t, r);
  gt(n, s) || (i.uniform1iv(this.addr, s), _t(n, s));
  let a;
  this.type === i.SAMPLER_2D_SHADOW ? a = ma : a = Ql;
  for (let o = 0; o !== r; ++o)
    t.setTexture2D(e[o] || a, s[o]);
}
function jp(i, e, t) {
  const n = this.cache, r = e.length, s = qr(t, r);
  gt(n, s) || (i.uniform1iv(this.addr, s), _t(n, s));
  for (let a = 0; a !== r; ++a)
    t.setTexture3D(e[a] || ec, s[a]);
}
function em(i, e, t) {
  const n = this.cache, r = e.length, s = qr(t, r);
  gt(n, s) || (i.uniform1iv(this.addr, s), _t(n, s));
  for (let a = 0; a !== r; ++a)
    t.setTextureCube(e[a] || tc, s[a]);
}
function tm(i, e, t) {
  const n = this.cache, r = e.length, s = qr(t, r);
  gt(n, s) || (i.uniform1iv(this.addr, s), _t(n, s));
  for (let a = 0; a !== r; ++a)
    t.setTexture2DArray(e[a] || jl, s[a]);
}
function nm(i) {
  switch (i) {
    case 5126:
      return Op;
    // FLOAT
    case 35664:
      return Bp;
    // _VEC2
    case 35665:
      return zp;
    // _VEC3
    case 35666:
      return Vp;
    // _VEC4
    case 35674:
      return Hp;
    // _MAT2
    case 35675:
      return kp;
    // _MAT3
    case 35676:
      return Gp;
    // _MAT4
    case 5124:
    case 35670:
      return Wp;
    // INT, BOOL
    case 35667:
    case 35671:
      return Xp;
    // _VEC2
    case 35668:
    case 35672:
      return qp;
    // _VEC3
    case 35669:
    case 35673:
      return Yp;
    // _VEC4
    case 5125:
      return Kp;
    // UINT
    case 36294:
      return $p;
    // _VEC2
    case 36295:
      return Zp;
    // _VEC3
    case 36296:
      return Jp;
    // _VEC4
    case 35678:
    // SAMPLER_2D
    case 36198:
    // SAMPLER_EXTERNAL_OES
    case 36298:
    // INT_SAMPLER_2D
    case 36306:
    // UNSIGNED_INT_SAMPLER_2D
    case 35682:
      return Qp;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return jp;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return em;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return tm;
  }
}
class im {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = Fp(t.type);
  }
}
class rm {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = nm(t.type);
  }
}
class sm {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, t, n) {
    const r = this.seq;
    for (let s = 0, a = r.length; s !== a; ++s) {
      const o = r[s];
      o.setValue(e, t[o.id], n);
    }
  }
}
const As = /(\w+)(\])?(\[|\.)?/g;
function Zo(i, e) {
  i.seq.push(e), i.map[e.id] = e;
}
function am(i, e, t) {
  const n = i.name, r = n.length;
  for (As.lastIndex = 0; ; ) {
    const s = As.exec(n), a = As.lastIndex;
    let o = s[1];
    const c = s[2] === "]", l = s[3];
    if (c && (o = o | 0), l === void 0 || l === "[" && a + 2 === r) {
      Zo(t, l === void 0 ? new im(o, i, e) : new rm(o, i, e));
      break;
    } else {
      let d = t.map[o];
      d === void 0 && (d = new sm(o), Zo(t, d)), t = d;
    }
  }
}
class Lr {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let a = 0; a < n; ++a) {
      const o = e.getActiveUniform(t, a), c = e.getUniformLocation(t, o.name);
      am(o, c, this);
    }
    const r = [], s = [];
    for (const a of this.seq)
      a.type === e.SAMPLER_2D_SHADOW || a.type === e.SAMPLER_CUBE_SHADOW || a.type === e.SAMPLER_2D_ARRAY_SHADOW ? r.push(a) : s.push(a);
    r.length > 0 && (this.seq = r.concat(s));
  }
  setValue(e, t, n, r) {
    const s = this.map[t];
    s !== void 0 && s.setValue(e, n, r);
  }
  setOptional(e, t, n) {
    const r = t[n];
    r !== void 0 && this.setValue(e, n, r);
  }
  static upload(e, t, n, r) {
    for (let s = 0, a = t.length; s !== a; ++s) {
      const o = t[s], c = n[o.id];
      c.needsUpdate !== !1 && o.setValue(e, c.value, r);
    }
  }
  static seqWithValue(e, t) {
    const n = [];
    for (let r = 0, s = e.length; r !== s; ++r) {
      const a = e[r];
      a.id in t && n.push(a);
    }
    return n;
  }
}
function Jo(i, e, t) {
  const n = i.createShader(e);
  return i.shaderSource(n, t), i.compileShader(n), n;
}
const om = 37297;
let lm = 0;
function cm(i, e) {
  const t = i.split(`
`), n = [], r = Math.max(e - 6, 0), s = Math.min(e + 6, t.length);
  for (let a = r; a < s; a++) {
    const o = a + 1;
    n.push(`${o === e ? ">" : " "} ${o}: ${t[a]}`);
  }
  return n.join(`
`);
}
const Qo = /* @__PURE__ */ new Pe();
function hm(i) {
  Oe._getMatrix(Qo, Oe.workingColorSpace, i);
  const e = `mat3( ${Qo.elements.map((t) => t.toFixed(4))} )`;
  switch (Oe.getTransfer(i)) {
    case Br:
      return [e, "LinearTransferOETF"];
    case Ze:
      return [e, "sRGBTransferOETF"];
    default:
      return Re("WebGLProgram: Unsupported color space: ", i), [e, "LinearTransferOETF"];
  }
}
function jo(i, e, t) {
  const n = i.getShaderParameter(e, i.COMPILE_STATUS), s = (i.getShaderInfoLog(e) || "").trim();
  if (n && s === "") return "";
  const a = /ERROR: 0:(\d+)/.exec(s);
  if (a) {
    const o = parseInt(a[1]);
    return t.toUpperCase() + `

` + s + `

` + cm(i.getShaderSource(e), o);
  } else
    return s;
}
function um(i, e) {
  const t = hm(e);
  return [
    `vec4 ${i}( vec4 value ) {`,
    `	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
const dm = {
  [Ml]: "Linear",
  [Sl]: "Reinhard",
  [bl]: "Cineon",
  [yl]: "ACESFilmic",
  [Tl]: "AgX",
  [wl]: "Neutral",
  [El]: "Custom"
};
function fm(i, e) {
  const t = dm[e];
  return t === void 0 ? (Re("WebGLProgram: Unsupported toneMapping:", e), "vec3 " + i + "( vec3 color ) { return LinearToneMapping( color ); }") : "vec3 " + i + "( vec3 color ) { return " + t + "ToneMapping( color ); }";
}
const br = /* @__PURE__ */ new U();
function pm() {
  Oe.getLuminanceCoefficients(br);
  const i = br.x.toFixed(4), e = br.y.toFixed(4), t = br.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function mm(i) {
  return [
    i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    i.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter(Ui).join(`
`);
}
function gm(i) {
  const e = [];
  for (const t in i) {
    const n = i[t];
    n !== !1 && e.push("#define " + t + " " + n);
  }
  return e.join(`
`);
}
function _m(i, e) {
  const t = {}, n = i.getProgramParameter(e, i.ACTIVE_ATTRIBUTES);
  for (let r = 0; r < n; r++) {
    const s = i.getActiveAttrib(e, r), a = s.name;
    let o = 1;
    s.type === i.FLOAT_MAT2 && (o = 2), s.type === i.FLOAT_MAT3 && (o = 3), s.type === i.FLOAT_MAT4 && (o = 4), t[a] = {
      type: s.type,
      location: i.getAttribLocation(e, a),
      locationSize: o
    };
  }
  return t;
}
function Ui(i) {
  return i !== "";
}
function el(i, e) {
  const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_SUN_LIGHTS/g, e.numSunLights).replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g, e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function tl(i, e) {
  return i.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
const vm = /^[ \t]*#include +<([\w\d./]+)>/gm;
function ga(i) {
  return i.replace(vm, Mm);
}
const xm = /* @__PURE__ */ new Map();
function Mm(i, e) {
  let t = Ue[e];
  if (t === void 0) {
    const n = xm.get(e);
    if (n !== void 0)
      t = Ue[n], Re('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, n);
    else
      throw new Error("THREE.WebGLProgram: Can not resolve #include <" + e + ">");
  }
  return ga(t);
}
const Sm = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function nl(i) {
  return i.replace(Sm, bm);
}
function bm(i, e, t, n) {
  let r = "";
  for (let s = parseInt(e); s < parseInt(t); s++)
    r += n.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
  return r;
}
function il(i) {
  let e = `precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;
  return i.precision === "highp" ? e += `
#define HIGH_PRECISION` : i.precision === "mediump" ? e += `
#define MEDIUM_PRECISION` : i.precision === "lowp" && (e += `
#define LOW_PRECISION`), e;
}
const ym = {
  [Tr]: "SHADOWMAP_TYPE_PCF",
  [Li]: "SHADOWMAP_TYPE_VSM"
};
function Em(i) {
  return ym[i.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
}
const Tm = {
  [Gn]: "ENVMAP_TYPE_CUBE",
  [_i]: "ENVMAP_TYPE_CUBE",
  [Gr]: "ENVMAP_TYPE_CUBE_UV"
};
function wm(i) {
  return i.envMap === !1 ? "ENVMAP_TYPE_CUBE" : Tm[i.envMapMode] || "ENVMAP_TYPE_CUBE";
}
const Am = {
  [_i]: "ENVMAP_MODE_REFRACTION"
};
function Rm(i) {
  return i.envMap === !1 ? "ENVMAP_MODE_REFLECTION" : Am[i.envMapMode] || "ENVMAP_MODE_REFLECTION";
}
const Cm = {
  [Ma]: "ENVMAP_BLENDING_MULTIPLY",
  [Wc]: "ENVMAP_BLENDING_MIX",
  [Xc]: "ENVMAP_BLENDING_ADD"
};
function Pm(i) {
  return i.envMap === !1 ? "ENVMAP_BLENDING_NONE" : Cm[i.combine] || "ENVMAP_BLENDING_NONE";
}
function Lm(i) {
  const e = i.envMapCubeUVHeight;
  if (e === null) return null;
  const t = Math.log2(e) - 2, n = 1 / e;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 112)), texelHeight: n, maxMip: t };
}
function Dm(i, e, t, n) {
  const r = i.getContext(), s = t.defines;
  let a = t.vertexShader, o = t.fragmentShader;
  const c = Em(t), l = wm(t), h = Rm(t), d = Pm(t), u = Lm(t), p = mm(t), _ = gm(s), M = r.createProgram();
  let m, f, y = t.glslVersion ? "#version " + t.glslVersion + `
` : "";
  t.isRawShaderMaterial ? (m = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    _
  ].filter(Ui).join(`
`), m.length > 0 && (m += `
`), f = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    _
  ].filter(Ui).join(`
`), f.length > 0 && (f += `
`)) : (m = [
    il(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    _,
    t.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    t.batching ? "#define USE_BATCHING" : "",
    t.batchingColor ? "#define USE_BATCHING_COLOR" : "",
    t.instancing ? "#define USE_INSTANCING" : "",
    t.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    t.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.map ? "#define USE_MAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + h : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    t.mapUv ? "#define MAP_UV " + t.mapUv : "",
    t.alphaMapUv ? "#define ALPHAMAP_UV " + t.alphaMapUv : "",
    t.lightMapUv ? "#define LIGHTMAP_UV " + t.lightMapUv : "",
    t.aoMapUv ? "#define AOMAP_UV " + t.aoMapUv : "",
    t.emissiveMapUv ? "#define EMISSIVEMAP_UV " + t.emissiveMapUv : "",
    t.bumpMapUv ? "#define BUMPMAP_UV " + t.bumpMapUv : "",
    t.normalMapUv ? "#define NORMALMAP_UV " + t.normalMapUv : "",
    t.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + t.displacementMapUv : "",
    t.metalnessMapUv ? "#define METALNESSMAP_UV " + t.metalnessMapUv : "",
    t.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + t.roughnessMapUv : "",
    t.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + t.anisotropyMapUv : "",
    t.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + t.clearcoatMapUv : "",
    t.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv : "",
    t.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv : "",
    t.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv : "",
    t.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv : "",
    t.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv : "",
    t.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv : "",
    t.specularMapUv ? "#define SPECULARMAP_UV " + t.specularMapUv : "",
    t.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv : "",
    t.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv : "",
    t.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + t.transmissionMapUv : "",
    t.thicknessMapUv ? "#define THICKNESSMAP_UV " + t.thicknessMapUv : "",
    //
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexNormals ? "#define HAS_NORMAL" : "",
    t.vertexColors ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.skinning ? "#define USE_SKINNING" : "",
    t.morphTargets ? "#define USE_MORPHTARGETS" : "",
    t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    t.morphColors ? "#define USE_MORPHCOLORS" : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + c : "",
    t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
    t.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "#ifdef USE_INSTANCING_MORPH",
    "	uniform sampler2D morphTexture;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(Ui).join(`
`), f = [
    il(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    _,
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    t.map ? "#define USE_MAP" : "",
    t.matcap ? "#define USE_MATCAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + l : "",
    t.envMap ? "#define " + h : "",
    t.envMap ? "#define " + d : "",
    u ? "#define CUBEUV_TEXEL_WIDTH " + u.texelWidth : "",
    u ? "#define CUBEUV_TEXEL_HEIGHT " + u.texelHeight : "",
    u ? "#define CUBEUV_MAX_MIP " + u.maxMip + ".0" : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.packedNormalMap ? "#define USE_PACKED_NORMALMAP" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoat ? "#define USE_CLEARCOAT" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.dispersion ? "#define USE_DISPERSION" : "",
    t.retroreflection ? "#define USE_RETROREFLECTION" : "",
    t.iridescence ? "#define USE_IRIDESCENCE" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaTest ? "#define USE_ALPHATEST" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.sheen ? "#define USE_SHEEN" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors || t.instancingColor ? "#define USE_COLOR" : "",
    t.vertexAlphas || t.batchingColor ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.gradientMap ? "#define USE_GRADIENTMAP" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + c : "",
    t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.numLightProbeGrids > 0 ? "#define USE_LIGHT_PROBES_GRID" : "",
    t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    t.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
    t.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    t.toneMapping !== an ? "#define TONE_MAPPING" : "",
    t.toneMapping !== an ? Ue.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    t.toneMapping !== an ? fm("toneMapping", t.toneMapping) : "",
    t.dithering ? "#define DITHERING" : "",
    t.opaque ? "#define OPAQUE" : "",
    Ue.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    um("linearToOutputTexel", t.outputColorSpace),
    pm(),
    t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
    `
`
  ].filter(Ui).join(`
`)), a = ga(a), a = el(a, t), a = tl(a, t), o = ga(o), o = el(o, t), o = tl(o, t), a = nl(a), o = nl(o), t.isRawShaderMaterial !== !0 && (y = `#version 300 es
`, m = [
    p,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + m, f = [
    "#define varying in",
    t.glslVersion === ao ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    t.glslVersion === ao ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + f);
  const R = y + m + a, S = y + f + o, T = Jo(r, r.VERTEX_SHADER, R), b = Jo(r, r.FRAGMENT_SHADER, S);
  r.attachShader(M, T), r.attachShader(M, b), t.index0AttributeName !== void 0 ? r.bindAttribLocation(M, 0, t.index0AttributeName) : t.hasPositionAttribute === !0 && r.bindAttribLocation(M, 0, "position"), r.linkProgram(M);
  function A(F) {
    if (i.debug.checkShaderErrors) {
      const V = r.getProgramInfoLog(M) || "", G = r.getShaderInfoLog(T) || "", I = r.getShaderInfoLog(b) || "", H = V.trim(), $ = G.trim(), K = I.trim();
      let ne = !0, X = !0;
      if (r.getProgramParameter(M, r.LINK_STATUS) === !1)
        if (ne = !1, typeof i.debug.onShaderError == "function")
          i.debug.onShaderError(r, M, T, b);
        else {
          const j = jo(r, T, "vertex"), te = jo(r, b, "fragment");
          Xe(
            "WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(M, r.VALIDATE_STATUS) + `

Material Name: ` + F.name + `
Material Type: ` + F.type + `

Program Info Log: ` + H + `
` + j + `
` + te
          );
        }
      else H !== "" ? Re("WebGLProgram: Program Info Log:", H) : ($ === "" || K === "") && (X = !1);
      X && (F.diagnostics = {
        runnable: ne,
        programLog: H,
        vertexShader: {
          log: $,
          prefix: m
        },
        fragmentShader: {
          log: K,
          prefix: f
        }
      });
    }
    r.deleteShader(T), r.deleteShader(b), v = new Lr(r, M), w = _m(r, M);
  }
  let v;
  this.getUniforms = function() {
    return v === void 0 && A(this), v;
  };
  let w;
  this.getAttributes = function() {
    return w === void 0 && A(this), w;
  };
  let D = t.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return D === !1 && (D = r.getProgramParameter(M, om)), D;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), r.deleteProgram(M), this.program = void 0;
  }, this.type = t.shaderType, this.name = t.shaderName, this.id = lm++, this.cacheKey = e, this.usedTimes = 1, this.program = M, this.vertexShader = T, this.fragmentShader = b, this;
}
let Im = 0;
class Um {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(e, t, n) {
    const r = this._getShaderCacheForMaterial(e);
    return r.has(t) === !1 && (r.add(t), t.usedTimes++), r.has(n) === !1 && (r.add(n), n.usedTimes++), this;
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const n of t)
      n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderStage(e) {
    return this._getShaderStage(e.vertexShader);
  }
  getFragmentShaderStage(e) {
    return this._getShaderStage(e.fragmentShader);
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const t = this.materialCache;
    let n = t.get(e);
    return n === void 0 && (n = /* @__PURE__ */ new Set(), t.set(e, n)), n;
  }
  _getShaderStage(e) {
    const t = this.shaderCache;
    let n = t.get(e);
    return n === void 0 && (n = new Nm(e), t.set(e, n)), n;
  }
}
class Nm {
  constructor(e) {
    this.id = Im++, this.code = e, this.usedTimes = 0;
  }
}
function Fm(i) {
  return i === Wn || i === Ur || i === Nr;
}
function Om(i, e, t, n, r, s) {
  const a = new Fl(), o = new Um(), c = /* @__PURE__ */ new Set(), l = [], h = /* @__PURE__ */ new Map(), d = n.logarithmicDepthBuffer;
  let u = n.precision;
  const p = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distance",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function _(v) {
    return c.add(v), v === 0 ? "uv" : `uv${v}`;
  }
  function M(v, w, D, F, V, G) {
    const I = F.fog, H = V.geometry, $ = v.isMeshStandardMaterial || v.isMeshLambertMaterial || v.isMeshPhongMaterial ? F.environment : null, K = v.isMeshStandardMaterial || v.isMeshLambertMaterial && !v.envMap || v.isMeshPhongMaterial && !v.envMap, ne = e.get(v.envMap || $, K), X = ne && ne.mapping === Gr ? ne.image.height : null, j = p[v.type];
    v.precision !== null && (u = n.getMaxPrecision(v.precision), u !== v.precision && Re("WebGLProgram.getParameters:", v.precision, "not supported, using", u, "instead."));
    const te = H.morphAttributes.position || H.morphAttributes.normal || H.morphAttributes.color, we = te !== void 0 ? te.length : 0;
    let Ee = 0;
    H.morphAttributes.position !== void 0 && (Ee = 1), H.morphAttributes.normal !== void 0 && (Ee = 2), H.morphAttributes.color !== void 0 && (Ee = 3);
    let et, ke, qe, q;
    if (j) {
      const nt = nn[j];
      et = nt.vertexShader, ke = nt.fragmentShader;
    } else {
      et = v.vertexShader, ke = v.fragmentShader;
      const nt = o.getVertexShaderStage(v), Ye = o.getFragmentShaderStage(v);
      o.update(v, nt, Ye), qe = nt.id, q = Ye.id;
    }
    const Q = i.getRenderTarget(), _e = i.state.buffers.depth.getReversed(), Ce = V.isInstancedMesh === !0, me = V.isBatchedMesh === !0, Fe = !!v.map, mt = !!v.matcap, ze = !!ne, We = !!v.aoMap, tt = !!v.lightMap, He = !!v.bumpMap && v.wireframe === !1, at = !!v.normalMap, vt = !!v.displacementMap, It = !!v.emissiveMap, ot = !!v.metalnessMap, ht = !!v.roughnessMap, L = v.anisotropy > 0, yt = v.clearcoat > 0, $e = v.dispersion > 0, E = v.retroreflectivity > 0, g = v.iridescence > 0, N = v.sheen > 0, z = v.transmission > 0, W = L && !!v.anisotropyMap, ie = yt && !!v.clearcoatMap, re = yt && !!v.clearcoatNormalMap, Y = yt && !!v.clearcoatRoughnessMap, J = g && !!v.iridescenceMap, se = g && !!v.iridescenceThicknessMap, be = N && !!v.sheenColorMap, ce = N && !!v.sheenRoughnessMap, ae = !!v.specularMap, ye = !!v.specularColorMap, Ae = !!v.specularIntensityMap, De = z && !!v.transmissionMap, P = z && !!v.thicknessMap, oe = !!v.gradientMap, Z = !!v.alphaMap, le = v.alphaTest > 0, fe = !!v.alphaHash, ee = !!v.extensions;
    let Te = an;
    v.toneMapped && (Q === null || Q.isXRRenderTarget === !0) && (Te = i.toneMapping);
    const Me = {
      shaderID: j,
      shaderType: v.type,
      shaderName: v.name,
      vertexShader: et,
      fragmentShader: ke,
      defines: v.defines,
      customVertexShaderID: qe,
      customFragmentShaderID: q,
      isRawShaderMaterial: v.isRawShaderMaterial === !0,
      glslVersion: v.glslVersion,
      precision: u,
      batching: me,
      batchingColor: me && V._colorsTexture !== null,
      instancing: Ce,
      instancingColor: Ce && V.instanceColor !== null,
      instancingMorph: Ce && V.morphTexture !== null,
      outputColorSpace: Q === null ? i.outputColorSpace : Q.isXRRenderTarget === !0 ? Q.texture.colorSpace : Oe.workingColorSpace,
      alphaToCoverage: !!v.alphaToCoverage,
      map: Fe,
      matcap: mt,
      envMap: ze,
      envMapMode: ze && ne.mapping,
      envMapCubeUVHeight: X,
      aoMap: We,
      lightMap: tt,
      bumpMap: He,
      normalMap: at,
      displacementMap: vt,
      emissiveMap: It,
      normalMapObjectSpace: at && v.normalMapType === Kc,
      normalMapTangentSpace: at && v.normalMapType === Fr,
      packedNormalMap: at && v.normalMapType === Fr && Fm(v.normalMap.format),
      metalnessMap: ot,
      roughnessMap: ht,
      anisotropy: L,
      anisotropyMap: W,
      clearcoat: yt,
      clearcoatMap: ie,
      clearcoatNormalMap: re,
      clearcoatRoughnessMap: Y,
      dispersion: $e,
      retroreflection: E,
      iridescence: g,
      iridescenceMap: J,
      iridescenceThicknessMap: se,
      sheen: N,
      sheenColorMap: be,
      sheenRoughnessMap: ce,
      specularMap: ae,
      specularColorMap: ye,
      specularIntensityMap: Ae,
      transmission: z,
      transmissionMap: De,
      thicknessMap: P,
      gradientMap: oe,
      opaque: v.transparent === !1 && v.blending === Ni && v.alphaToCoverage === !1,
      alphaMap: Z,
      alphaTest: le,
      alphaHash: fe,
      combine: v.combine,
      //
      mapUv: Fe && _(v.map.channel),
      aoMapUv: We && _(v.aoMap.channel),
      lightMapUv: tt && _(v.lightMap.channel),
      bumpMapUv: He && _(v.bumpMap.channel),
      normalMapUv: at && _(v.normalMap.channel),
      displacementMapUv: vt && _(v.displacementMap.channel),
      emissiveMapUv: It && _(v.emissiveMap.channel),
      metalnessMapUv: ot && _(v.metalnessMap.channel),
      roughnessMapUv: ht && _(v.roughnessMap.channel),
      anisotropyMapUv: W && _(v.anisotropyMap.channel),
      clearcoatMapUv: ie && _(v.clearcoatMap.channel),
      clearcoatNormalMapUv: re && _(v.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: Y && _(v.clearcoatRoughnessMap.channel),
      iridescenceMapUv: J && _(v.iridescenceMap.channel),
      iridescenceThicknessMapUv: se && _(v.iridescenceThicknessMap.channel),
      sheenColorMapUv: be && _(v.sheenColorMap.channel),
      sheenRoughnessMapUv: ce && _(v.sheenRoughnessMap.channel),
      specularMapUv: ae && _(v.specularMap.channel),
      specularColorMapUv: ye && _(v.specularColorMap.channel),
      specularIntensityMapUv: Ae && _(v.specularIntensityMap.channel),
      transmissionMapUv: De && _(v.transmissionMap.channel),
      thicknessMapUv: P && _(v.thicknessMap.channel),
      alphaMapUv: Z && _(v.alphaMap.channel),
      //
      vertexTangents: !!H.attributes.tangent && (at || L),
      vertexNormals: !!H.attributes.normal,
      vertexColors: v.vertexColors,
      vertexAlphas: v.vertexColors === !0 && !!H.attributes.color && H.attributes.color.itemSize === 4,
      pointsUvs: V.isPoints === !0 && !!H.attributes.uv && (Fe || Z),
      fog: !!I,
      useFog: v.fog === !0,
      fogExp2: !!I && I.isFogExp2,
      flatShading: v.wireframe === !1 && (v.flatShading === !0 || H.attributes.normal === void 0 && at === !1 && (v.isMeshLambertMaterial || v.isMeshPhongMaterial || v.isMeshStandardMaterial || v.isMeshPhysicalMaterial)),
      sizeAttenuation: v.sizeAttenuation === !0,
      logarithmicDepthBuffer: d,
      reversedDepthBuffer: _e,
      skinning: V.isSkinnedMesh === !0,
      hasPositionAttribute: H.attributes.position !== void 0,
      morphTargets: H.morphAttributes.position !== void 0,
      morphNormals: H.morphAttributes.normal !== void 0,
      morphColors: H.morphAttributes.color !== void 0,
      morphTargetsCount: we,
      morphTextureStride: Ee,
      numSunLights: w.sun.length,
      numDirLights: w.directional.length,
      numPointLights: w.point.length,
      numSpotLights: w.spot.length,
      numSpotLightMaps: w.spotLightMap.length,
      numRectAreaLights: w.rectArea.length,
      numHemiLights: w.hemi.length,
      numSunLightShadows: w.sunShadowMap.length,
      numDirLightShadows: w.directionalShadowMap.length,
      numPointLightShadows: w.pointShadowMap.length,
      numSpotLightShadows: w.spotShadowMap.length,
      numSpotLightShadowsWithMaps: w.numSpotLightShadowsWithMaps,
      numLightProbes: w.numLightProbes,
      numLightProbeGrids: G.length,
      numClippingPlanes: s.numPlanes,
      numClipIntersection: s.numIntersection,
      dithering: v.dithering,
      shadowMapEnabled: i.shadowMap.enabled && D.length > 0,
      shadowMapType: i.shadowMap.type,
      toneMapping: Te,
      decodeVideoTexture: Fe && v.map.isVideoTexture === !0 && Oe.getTransfer(v.map.colorSpace) === Ze,
      decodeVideoTextureEmissive: It && v.emissiveMap.isVideoTexture === !0 && Oe.getTransfer(v.emissiveMap.colorSpace) === Ze,
      premultipliedAlpha: v.premultipliedAlpha,
      doubleSided: v.side === gn,
      flipSided: v.side === Lt,
      useDepthPacking: v.depthPacking >= 0,
      depthPacking: v.depthPacking || 0,
      index0AttributeName: v.index0AttributeName,
      extensionClipCullDistance: ee && v.extensions.clipCullDistance === !0 && t.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (ee && v.extensions.multiDraw === !0 || me) && t.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: t.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: v.customProgramCacheKey()
    };
    return Me.vertexUv1s = c.has(1), Me.vertexUv2s = c.has(2), Me.vertexUv3s = c.has(3), c.clear(), Me;
  }
  function m(v) {
    const w = [];
    if (v.shaderID ? w.push(v.shaderID) : (w.push(v.customVertexShaderID), w.push(v.customFragmentShaderID)), v.defines !== void 0)
      for (const D in v.defines)
        w.push(D), w.push(v.defines[D]);
    return v.isRawShaderMaterial === !1 && (f(w, v), y(w, v), w.push(i.outputColorSpace)), w.push(v.customProgramCacheKey), w.join();
  }
  function f(v, w) {
    v.push(w.precision), v.push(w.outputColorSpace), v.push(w.envMapMode), v.push(w.envMapCubeUVHeight), v.push(w.mapUv), v.push(w.alphaMapUv), v.push(w.lightMapUv), v.push(w.aoMapUv), v.push(w.bumpMapUv), v.push(w.normalMapUv), v.push(w.displacementMapUv), v.push(w.emissiveMapUv), v.push(w.metalnessMapUv), v.push(w.roughnessMapUv), v.push(w.anisotropyMapUv), v.push(w.clearcoatMapUv), v.push(w.clearcoatNormalMapUv), v.push(w.clearcoatRoughnessMapUv), v.push(w.iridescenceMapUv), v.push(w.iridescenceThicknessMapUv), v.push(w.sheenColorMapUv), v.push(w.sheenRoughnessMapUv), v.push(w.specularMapUv), v.push(w.specularColorMapUv), v.push(w.specularIntensityMapUv), v.push(w.transmissionMapUv), v.push(w.thicknessMapUv), v.push(w.combine), v.push(w.fogExp2), v.push(w.sizeAttenuation), v.push(w.morphTargetsCount), v.push(w.morphAttributeCount), v.push(w.numSunLights), v.push(w.numDirLights), v.push(w.numPointLights), v.push(w.numSpotLights), v.push(w.numSpotLightMaps), v.push(w.numHemiLights), v.push(w.numRectAreaLights), v.push(w.numSunLightShadows), v.push(w.numDirLightShadows), v.push(w.numPointLightShadows), v.push(w.numSpotLightShadows), v.push(w.numSpotLightShadowsWithMaps), v.push(w.numLightProbes), v.push(w.shadowMapType), v.push(w.toneMapping), v.push(w.numClippingPlanes), v.push(w.numClipIntersection), v.push(w.depthPacking);
  }
  function y(v, w) {
    a.disableAll(), w.instancing && a.enable(0), w.instancingColor && a.enable(1), w.instancingMorph && a.enable(2), w.matcap && a.enable(3), w.envMap && a.enable(4), w.normalMapObjectSpace && a.enable(5), w.normalMapTangentSpace && a.enable(6), w.clearcoat && a.enable(7), w.iridescence && a.enable(8), w.alphaTest && a.enable(9), w.vertexColors && a.enable(10), w.vertexAlphas && a.enable(11), w.vertexUv1s && a.enable(12), w.vertexUv2s && a.enable(13), w.vertexUv3s && a.enable(14), w.vertexTangents && a.enable(15), w.anisotropy && a.enable(16), w.alphaHash && a.enable(17), w.batching && a.enable(18), w.dispersion && a.enable(19), w.retroreflection && a.enable(24), w.batchingColor && a.enable(20), w.gradientMap && a.enable(21), w.packedNormalMap && a.enable(22), w.vertexNormals && a.enable(23), v.push(a.mask), a.disableAll(), w.fog && a.enable(0), w.useFog && a.enable(1), w.flatShading && a.enable(2), w.logarithmicDepthBuffer && a.enable(3), w.reversedDepthBuffer && a.enable(4), w.skinning && a.enable(5), w.morphTargets && a.enable(6), w.morphNormals && a.enable(7), w.morphColors && a.enable(8), w.premultipliedAlpha && a.enable(9), w.shadowMapEnabled && a.enable(10), w.doubleSided && a.enable(11), w.flipSided && a.enable(12), w.useDepthPacking && a.enable(13), w.dithering && a.enable(14), w.transmission && a.enable(15), w.sheen && a.enable(16), w.opaque && a.enable(17), w.pointsUvs && a.enable(18), w.decodeVideoTexture && a.enable(19), w.decodeVideoTextureEmissive && a.enable(20), w.alphaToCoverage && a.enable(21), w.numLightProbeGrids > 0 && a.enable(22), w.hasPositionAttribute && a.enable(23), v.push(a.mask);
  }
  function R(v) {
    const w = p[v.type];
    let D;
    if (w) {
      const F = nn[w];
      D = Kh.clone(F.uniforms);
    } else
      D = v.uniforms;
    return D;
  }
  function S(v, w) {
    let D = h.get(w);
    return D !== void 0 ? ++D.usedTimes : (D = new Dm(i, w, v, r), l.push(D), h.set(w, D)), D;
  }
  function T(v) {
    if (--v.usedTimes === 0) {
      const w = l.indexOf(v);
      l[w] = l[l.length - 1], l.pop(), h.delete(v.cacheKey), v.destroy();
    }
  }
  function b(v) {
    o.remove(v);
  }
  function A() {
    o.dispose();
  }
  return {
    getParameters: M,
    getProgramCacheKey: m,
    getUniforms: R,
    acquireProgram: S,
    releaseProgram: T,
    releaseShaderCache: b,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: l,
    dispose: A
  };
}
function Bm() {
  let i = /* @__PURE__ */ new WeakMap();
  function e(a) {
    return i.has(a);
  }
  function t(a) {
    let o = i.get(a);
    return o === void 0 && (o = {}, i.set(a, o)), o;
  }
  function n(a) {
    i.delete(a);
  }
  function r(a, o, c) {
    i.get(a)[o] = c;
  }
  function s() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: e,
    get: t,
    remove: n,
    update: r,
    dispose: s
  };
}
function zm(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.material.id !== e.material.id ? i.material.id - e.material.id : i.materialVariant !== e.materialVariant ? i.materialVariant - e.materialVariant : i.z !== e.z ? i.z - e.z : i.id - e.id;
}
function rl(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.z !== e.z ? e.z - i.z : i.id - e.id;
}
function sl() {
  const i = [];
  let e = 0;
  const t = [], n = [], r = [];
  function s() {
    e = 0, t.length = 0, n.length = 0, r.length = 0;
  }
  function a(u) {
    let p = 0;
    return u.isInstancedMesh && (p += 2), u.isSkinnedMesh && (p += 1), p;
  }
  function o(u, p, _, M, m, f) {
    let y = i[e];
    return y === void 0 ? (y = {
      id: u.id,
      object: u,
      geometry: p,
      material: _,
      materialVariant: a(u),
      groupOrder: M,
      renderOrder: u.renderOrder,
      z: m,
      group: f
    }, i[e] = y) : (y.id = u.id, y.object = u, y.geometry = p, y.material = _, y.materialVariant = a(u), y.groupOrder = M, y.renderOrder = u.renderOrder, y.z = m, y.group = f), e++, y;
  }
  function c(u, p, _, M, m, f, y) {
    y.reversedDepth === !0 && (m = -m);
    const R = o(u, p, _, M, m, f);
    _.transmission > 0 ? n.push(R) : _.transparent === !0 ? r.push(R) : t.push(R);
  }
  function l(u, p, _, M, m, f) {
    const y = o(u, p, _, M, m, f);
    _.transmission > 0 ? n.unshift(y) : _.transparent === !0 ? r.unshift(y) : t.unshift(y);
  }
  function h(u, p) {
    t.length > 1 && t.sort(u || zm), n.length > 1 && n.sort(p || rl), r.length > 1 && r.sort(p || rl);
  }
  function d() {
    for (let u = e, p = i.length; u < p; u++) {
      const _ = i[u];
      if (_.id === null) break;
      _.id = null, _.object = null, _.geometry = null, _.material = null, _.group = null;
    }
  }
  return {
    opaque: t,
    transmissive: n,
    transparent: r,
    init: s,
    push: c,
    unshift: l,
    finish: d,
    sort: h
  };
}
function Vm() {
  let i = /* @__PURE__ */ new WeakMap();
  function e(n, r) {
    const s = i.get(n);
    let a;
    return s === void 0 ? (a = new sl(), i.set(n, [a])) : r >= s.length ? (a = new sl(), s.push(a)) : a = s[r], a;
  }
  function t() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: t
  };
}
function Hm() {
  const i = {};
  return {
    get: function(e) {
      if (i[e.id] !== void 0)
        return i[e.id];
      let t;
      switch (e.type) {
        case "SunLight":
        case "DirectionalLight":
          t = {
            direction: new U(),
            color: new Le()
          };
          break;
        case "SpotLight":
          t = {
            position: new U(),
            direction: new U(),
            color: new Le(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          t = {
            position: new U(),
            color: new Le(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          t = {
            direction: new U(),
            skyColor: new Le(),
            groundColor: new Le()
          };
          break;
        case "RectAreaLight":
          t = {
            color: new Le(),
            position: new U(),
            halfWidth: new U(),
            halfHeight: new U()
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
function km() {
  const i = {};
  return {
    get: function(e) {
      if (i[e.id] !== void 0)
        return i[e.id];
      let t;
      switch (e.type) {
        case "SunLight":
        case "DirectionalLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Ne()
          };
          break;
        case "SpotLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Ne()
          };
          break;
        case "PointLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Ne(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
let Gm = 0;
function Wm(i, e) {
  return (e.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (i.map ? 1 : 0);
}
function Xm(i) {
  const e = new Hm(), t = km(), n = {
    version: 0,
    hash: {
      sunLength: -1,
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numSunShadows: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    sun: [],
    sunShadow: [],
    sunShadowMap: [],
    sunShadowMatrix: [],
    sunShadowCascade: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let l = 0; l < 9; l++) n.probe.push(new U());
  const r = new U(), s = new st(), a = new st();
  function o(l) {
    let h = 0, d = 0, u = 0;
    for (let V = 0; V < 9; V++) n.probe[V].set(0, 0, 0);
    let p = 0, _ = 0, M = 0, m = 0, f = 0, y = 0, R = 0, S = 0, T = 0, b = 0, A = 0, v = 0, w = 0, D = 0;
    l.sort(Wm);
    for (let V = 0, G = l.length; V < G; V++) {
      const I = l[V], H = I.color, $ = I.intensity, K = I.distance;
      let ne = null;
      if (I.shadow && I.shadow.map && (I.shadow.map.texture.format === Wn ? ne = I.shadow.map.texture : ne = I.shadow.map.depthTexture || I.shadow.map.texture), I.isAmbientLight)
        h += H.r * $, d += H.g * $, u += H.b * $;
      else if (I.isLightProbe) {
        for (let X = 0; X < 9; X++)
          n.probe[X].addScaledVector(I.sh.coefficients[X], $);
        D++;
      } else if (I.isSunLight) {
        const X = e.get(I);
        if (X.color.copy(I.color).multiplyScalar(I.intensity), I.castShadow) {
          const j = I.shadow, te = t.get(I);
          te.shadowIntensity = j.intensity, te.shadowBias = j.bias, te.shadowNormalBias = j.normalBias, te.shadowRadius = j.radius, te.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()), n.sunShadow[_] = te, n.sunShadowMap[_] = ne;
          const we = j.getViewportCount();
          for (let Ee = 0; Ee < we; Ee++)
            n.sunShadowMatrix[M + Ee] = j.getMatrix(Ee), n.sunShadowCascade[M + Ee] = j._cascadeData[Ee];
          M += we, _++;
        }
        n.sun[p] = X, p++;
      } else if (I.isDirectionalLight) {
        const X = e.get(I);
        if (X.color.copy(I.color).multiplyScalar(I.intensity), I.castShadow) {
          const j = I.shadow, te = t.get(I);
          te.shadowIntensity = j.intensity, te.shadowBias = j.bias, te.shadowNormalBias = j.normalBias, te.shadowRadius = j.radius, te.shadowMapSize = j.mapSize, n.directionalShadow[m] = te, n.directionalShadowMap[m] = ne, n.directionalShadowMatrix[m] = I.shadow.matrix, T++;
        }
        n.directional[m] = X, m++;
      } else if (I.isSpotLight) {
        const X = e.get(I);
        X.position.setFromMatrixPosition(I.matrixWorld), X.color.copy(H).multiplyScalar($), X.distance = K, X.coneCos = Math.cos(I.angle), X.penumbraCos = Math.cos(I.angle * (1 - I.penumbra)), X.decay = I.decay, n.spot[y] = X;
        const j = I.shadow;
        if (I.map && (n.spotLightMap[v] = I.map, v++, j.updateMatrices(I), I.castShadow && w++), n.spotLightMatrix[y] = j.matrix, I.castShadow) {
          const te = t.get(I);
          te.shadowIntensity = j.intensity, te.shadowBias = j.bias, te.shadowNormalBias = j.normalBias, te.shadowRadius = j.radius, te.shadowMapSize = j.mapSize, n.spotShadow[y] = te, n.spotShadowMap[y] = ne, A++;
        }
        y++;
      } else if (I.isRectAreaLight) {
        const X = e.get(I);
        X.color.copy(H).multiplyScalar($), X.halfWidth.set(I.width * 0.5, 0, 0), X.halfHeight.set(0, I.height * 0.5, 0), n.rectArea[R] = X, R++;
      } else if (I.isPointLight) {
        const X = e.get(I);
        if (X.color.copy(I.color).multiplyScalar(I.intensity), X.distance = I.distance, X.decay = I.decay, I.castShadow) {
          const j = I.shadow, te = t.get(I);
          te.shadowIntensity = j.intensity, te.shadowBias = j.bias, te.shadowNormalBias = j.normalBias, te.shadowRadius = j.radius, te.shadowMapSize = j.mapSize, te.shadowCameraNear = j.camera.near, te.shadowCameraFar = j.camera.far, n.pointShadow[f] = te, n.pointShadowMap[f] = ne, n.pointShadowMatrix[f] = I.shadow.matrix, b++;
        }
        n.point[f] = X, f++;
      } else if (I.isHemisphereLight) {
        const X = e.get(I);
        X.skyColor.copy(I.color).multiplyScalar($), X.groundColor.copy(I.groundColor).multiplyScalar($), n.hemi[S] = X, S++;
      }
    }
    R > 0 && (i.has("OES_texture_float_linear") === !0 ? (n.rectAreaLTC1 = he.LTC_FLOAT_1, n.rectAreaLTC2 = he.LTC_FLOAT_2) : (n.rectAreaLTC1 = he.LTC_HALF_1, n.rectAreaLTC2 = he.LTC_HALF_2)), n.ambient[0] = h, n.ambient[1] = d, n.ambient[2] = u;
    const F = n.hash;
    (F.sunLength !== p || F.directionalLength !== m || F.pointLength !== f || F.spotLength !== y || F.rectAreaLength !== R || F.hemiLength !== S || F.numSunShadows !== _ || F.numDirectionalShadows !== T || F.numPointShadows !== b || F.numSpotShadows !== A || F.numSpotMaps !== v || F.numLightProbes !== D) && (n.sun.length = p, n.directional.length = m, n.spot.length = y, n.rectArea.length = R, n.point.length = f, n.hemi.length = S, n.sunShadow.length = _, n.sunShadowMap.length = _, n.sunShadowMatrix.length = M, n.sunShadowCascade.length = M, n.directionalShadow.length = T, n.directionalShadowMap.length = T, n.directionalShadowMatrix.length = T, n.pointShadow.length = b, n.pointShadowMap.length = b, n.pointShadowMatrix.length = b, n.spotShadow.length = A, n.spotShadowMap.length = A, n.spotLightMatrix.length = A + v - w, n.spotLightMap.length = v, n.numSpotLightShadowsWithMaps = w, n.numLightProbes = D, F.sunLength = p, F.directionalLength = m, F.pointLength = f, F.spotLength = y, F.rectAreaLength = R, F.hemiLength = S, F.numSunShadows = _, F.numDirectionalShadows = T, F.numPointShadows = b, F.numSpotShadows = A, F.numSpotMaps = v, F.numLightProbes = D, n.version = Gm++);
  }
  function c(l, h) {
    let d = 0, u = 0, p = 0, _ = 0, M = 0, m = 0;
    const f = h.matrixWorldInverse;
    for (let y = 0, R = l.length; y < R; y++) {
      const S = l[y];
      if (S.isSunLight) {
        const T = n.sun[d];
        T.direction.setFromMatrixPosition(S.matrixWorld), T.direction.transformDirection(f), d++;
      } else if (S.isDirectionalLight) {
        const T = n.directional[u];
        T.direction.setFromMatrixPosition(S.matrixWorld), r.setFromMatrixPosition(S.target.matrixWorld), T.direction.sub(r), T.direction.transformDirection(f), u++;
      } else if (S.isSpotLight) {
        const T = n.spot[_];
        T.position.setFromMatrixPosition(S.matrixWorld), T.position.applyMatrix4(f), T.direction.setFromMatrixPosition(S.matrixWorld), r.setFromMatrixPosition(S.target.matrixWorld), T.direction.sub(r), T.direction.transformDirection(f), _++;
      } else if (S.isRectAreaLight) {
        const T = n.rectArea[M];
        T.position.setFromMatrixPosition(S.matrixWorld), T.position.applyMatrix4(f), a.identity(), s.copy(S.matrixWorld), s.premultiply(f), a.extractRotation(s), T.halfWidth.set(S.width * 0.5, 0, 0), T.halfHeight.set(0, S.height * 0.5, 0), T.halfWidth.applyMatrix4(a), T.halfHeight.applyMatrix4(a), M++;
      } else if (S.isPointLight) {
        const T = n.point[p];
        T.position.setFromMatrixPosition(S.matrixWorld), T.position.applyMatrix4(f), p++;
      } else if (S.isHemisphereLight) {
        const T = n.hemi[m];
        T.direction.setFromMatrixPosition(S.matrixWorld), T.direction.transformDirection(f), m++;
      }
    }
  }
  return {
    setup: o,
    setupView: c,
    state: n
  };
}
function al(i) {
  const e = new Xm(i), t = [], n = [], r = [];
  function s(u) {
    d.camera = u, t.length = 0, n.length = 0, r.length = 0;
  }
  function a(u) {
    t.push(u);
  }
  function o(u) {
    n.push(u);
  }
  function c(u) {
    r.push(u);
  }
  function l() {
    e.setup(t);
  }
  function h(u) {
    e.setupView(t, u);
  }
  const d = {
    lightsArray: t,
    shadowsArray: n,
    lightProbeGridArray: r,
    camera: null,
    lights: e,
    transmissionRenderTarget: {},
    textureUnits: 0
  };
  return {
    init: s,
    state: d,
    setupLights: l,
    setupLightsView: h,
    pushLight: a,
    pushShadow: o,
    pushLightProbeGrid: c
  };
}
function qm(i) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(r, s = 0) {
    const a = e.get(r);
    let o;
    return a === void 0 ? (o = new al(i), e.set(r, [o])) : s >= a.length ? (o = new al(i), a.push(o)) : o = a[s], o;
  }
  function n() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: n
  };
}
const Ym = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, Km = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`, $m = [
  /* @__PURE__ */ new U(1, 0, 0),
  /* @__PURE__ */ new U(-1, 0, 0),
  /* @__PURE__ */ new U(0, 1, 0),
  /* @__PURE__ */ new U(0, -1, 0),
  /* @__PURE__ */ new U(0, 0, 1),
  /* @__PURE__ */ new U(0, 0, -1)
], Zm = [
  /* @__PURE__ */ new U(0, -1, 0),
  /* @__PURE__ */ new U(0, -1, 0),
  /* @__PURE__ */ new U(0, 0, 1),
  /* @__PURE__ */ new U(0, 0, -1),
  /* @__PURE__ */ new U(0, -1, 0),
  /* @__PURE__ */ new U(0, -1, 0)
], ol = /* @__PURE__ */ new st(), Pi = /* @__PURE__ */ new U(), Rs = /* @__PURE__ */ new U();
function Jm(i, e, t) {
  let n = new Ua();
  const r = new Ne(), s = new Ne(), a = new lt(), o = new Qh(), c = new jh(), l = {}, h = t.maxTextureSize, d = { [In]: Lt, [Lt]: In, [gn]: gn }, u = new Jt({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new Ne() },
      radius: { value: 4 }
    },
    vertexShader: Ym,
    fragmentShader: Km
  }), p = u.clone();
  p.defines.HORIZONTAL_PASS = 1;
  const _ = new Dt();
  _.setAttribute(
    "position",
    new Mn(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const M = new Bt(_, u), m = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = Tr;
  let f = this.type;
  this.render = function(b, A, v) {
    if (m.enabled === !1 || m.autoUpdate === !1 && m.needsUpdate === !1 || b.length === 0) return;
    this.type === Tc && (Re("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."), this.type = Tr);
    const w = i.getRenderTarget(), D = i.getActiveCubeFace(), F = i.getActiveMipmapLevel(), V = i.state;
    V.setBlending(vn), V.buffers.depth.getReversed() === !0 ? V.buffers.color.setClear(0, 0, 0, 0) : V.buffers.color.setClear(1, 1, 1, 1), V.buffers.depth.setTest(!0), V.setScissorTest(!1);
    const G = f !== this.type;
    G && A.traverse(function(I) {
      I.material && (Array.isArray(I.material) ? I.material.forEach((H) => H.needsUpdate = !0) : I.material.needsUpdate = !0);
    });
    for (let I = 0, H = b.length; I < H; I++) {
      const $ = b[I], K = $.shadow;
      if (K === void 0) {
        Re("WebGLShadowMap:", $, "has no shadow.");
        continue;
      }
      if (K.autoUpdate === !1 && K.needsUpdate === !1) continue;
      r.copy(K.mapSize);
      const ne = K.getFrameExtents();
      r.multiply(ne), s.copy(K.mapSize), (r.x > h || r.y > h) && (r.x > h && (s.x = Math.floor(h / ne.x), r.x = s.x * ne.x, K.mapSize.x = s.x), r.y > h && (s.y = Math.floor(h / ne.y), r.y = s.y * ne.y, K.mapSize.y = s.y));
      const X = i.state.buffers.depth.getReversed();
      if (K.camera._reversedDepth = X, K.map === null || G === !0) {
        if (K.map !== null && (K.map.depthTexture !== null && (K.map.depthTexture.dispose(), K.map.depthTexture = null), K.map.dispose()), this.type === Li) {
          if ($.isPointLight) {
            Re("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");
            continue;
          }
          K.map = new Gt(r.x, r.y, {
            format: Wn,
            type: ln,
            minFilter: At,
            magFilter: At,
            generateMipmaps: !1
          }), K.map.texture.name = $.name + ".shadowMap", K.map.depthTexture = new Xi(r.x, r.y, rn), K.map.depthTexture.name = $.name + ".shadowMapDepth", K.map.depthTexture.format = Sn, K.map.depthTexture.compareFunction = null, K.map.depthTexture.minFilter = bt, K.map.depthTexture.magFilter = bt;
        } else
          $.isPointLight ? (K.map = new Jl(r.x), K.map.depthTexture = new qh(r.x, on)) : (K.map = new Gt(r.x, r.y), K.map.depthTexture = new Xi(r.x, r.y, on)), K.map.depthTexture.name = $.name + ".shadowMap", K.map.depthTexture.format = Sn, this.type === Tr ? (K.map.depthTexture.compareFunction = X ? Ra : Aa, K.map.depthTexture.minFilter = At, K.map.depthTexture.magFilter = At) : (K.map.depthTexture.compareFunction = null, K.map.depthTexture.minFilter = bt, K.map.depthTexture.magFilter = bt);
        K.camera.updateProjectionMatrix();
      }
      K.map.isWebGLCubeRenderTarget !== !0 && (K.map.width !== r.x || K.map.height !== r.y) && K.map.setSize(r.x, r.y);
      const j = K.map.isWebGLCubeRenderTarget ? 6 : K.getViewportCount();
      $.isPointLight !== !0 && K.updateMatrices($, v);
      for (let te = 0; te < j; te++) {
        const we = K.getCamera(te);
        if ($.isPointLight) {
          const Ee = K.camera, et = K.matrix, ke = $.distance || Ee.far;
          ke !== Ee.far && (Ee.far = ke, Ee.updateProjectionMatrix()), Pi.setFromMatrixPosition($.matrixWorld), Ee.position.copy(Pi), Rs.copy(Ee.position), Rs.add($m[te]), Ee.up.copy(Zm[te]), Ee.lookAt(Rs), Ee.updateMatrixWorld(), et.makeTranslation(-Pi.x, -Pi.y, -Pi.z), ol.multiplyMatrices(Ee.projectionMatrix, Ee.matrixWorldInverse), K._frustum.setFromProjectionMatrix(ol, Ee.coordinateSystem, Ee.reversedDepth);
        }
        if (K.map.isWebGLCubeRenderTarget)
          i.setRenderTarget(K.map, te), i.clear();
        else {
          te === 0 && (i.setRenderTarget(K.map), i.clear());
          const Ee = K.getViewport(te);
          a.set(
            s.x * Ee.x,
            s.y * Ee.y,
            s.x * Ee.z,
            s.y * Ee.w
          ), V.viewport(a);
        }
        n = K.getFrustum(te), S(A, v, we, $, this.type);
      }
      K.isPointLightShadow !== !0 && this.type === Li && y(K, v), K.needsUpdate = !1;
    }
    f = this.type, m.needsUpdate = !1, i.setRenderTarget(w, D, F);
  };
  function y(b, A) {
    const v = e.update(M);
    u.defines.VSM_SAMPLES !== b.blurSamples && (u.defines.VSM_SAMPLES = b.blurSamples, p.defines.VSM_SAMPLES = b.blurSamples, u.needsUpdate = !0, p.needsUpdate = !0), b.mapPass === null ? b.mapPass = new Gt(r.x, r.y, {
      format: Wn,
      type: ln
    }) : (b.mapPass.width !== b.map.width || b.mapPass.height !== b.map.height) && b.mapPass.setSize(b.map.width, b.map.height), u.uniforms.shadow_pass.value = b.map.depthTexture, u.uniforms.resolution.value.set(b.map.width, b.map.height), u.uniforms.radius.value = b.radius, i.setRenderTarget(b.mapPass), i.clear(), i.renderBufferDirect(A, null, v, u, M, null), p.uniforms.shadow_pass.value = b.mapPass.texture, p.uniforms.resolution.value.set(b.map.width, b.map.height), p.uniforms.radius.value = b.radius, i.setRenderTarget(b.map), i.clear(), i.renderBufferDirect(A, null, v, p, M, null);
  }
  function R(b, A, v, w) {
    let D = null;
    const F = v.isPointLight === !0 ? b.customDistanceMaterial : b.customDepthMaterial;
    if (F !== void 0)
      D = F;
    else if (D = v.isPointLight === !0 ? c : o, i.localClippingEnabled && A.clipShadows === !0 && Array.isArray(A.clippingPlanes) && A.clippingPlanes.length !== 0 || A.displacementMap && A.displacementScale !== 0 || A.alphaMap && A.alphaTest > 0 || A.map && A.alphaTest > 0 || A.alphaToCoverage === !0) {
      const V = D.uuid, G = A.uuid;
      let I = l[V];
      I === void 0 && (I = {}, l[V] = I);
      let H = I[G];
      H === void 0 && (H = D.clone(), I[G] = H, A.addEventListener("dispose", T)), D = H;
    }
    if (D.visible = A.visible, D.wireframe = A.wireframe, w === Li ? D.side = A.shadowSide !== null ? A.shadowSide : A.side : D.side = A.shadowSide !== null ? A.shadowSide : d[A.side], D.alphaMap = A.alphaMap, D.alphaTest = A.alphaToCoverage === !0 ? 0.5 : A.alphaTest, D.map = A.map, D.clipShadows = A.clipShadows, D.clippingPlanes = A.clippingPlanes, D.clipIntersection = A.clipIntersection, D.displacementMap = A.displacementMap, D.displacementScale = A.displacementScale, D.displacementBias = A.displacementBias, D.wireframeLinewidth = A.wireframeLinewidth, D.linewidth = A.linewidth, v.isPointLight === !0 && D.isMeshDistanceMaterial === !0) {
      const V = i.properties.get(D);
      V.light = v;
    }
    return D;
  }
  function S(b, A, v, w, D) {
    if (b.visible === !1) return;
    if (b.layers.test(A.layers) && (b.isMesh || b.isLine || b.isPoints) && (b.castShadow || b.receiveShadow && D === Li) && (!b.frustumCulled || b.intersectsFrustum(n))) {
      b.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse, b.matrixWorld);
      const G = e.update(b), I = b.material;
      if (Array.isArray(I)) {
        const H = G.groups;
        for (let $ = 0, K = H.length; $ < K; $++) {
          const ne = H[$], X = I[ne.materialIndex];
          if (X && X.visible) {
            const j = R(b, X, w, D);
            b.onBeforeShadow(i, b, A, v, G, j, ne), i.renderBufferDirect(v, null, G, j, b, ne), b.onAfterShadow(i, b, A, v, G, j, ne);
          }
        }
      } else if (I.visible) {
        const H = R(b, I, w, D);
        b.onBeforeShadow(i, b, A, v, G, H, null), i.renderBufferDirect(v, null, G, H, b, null), b.onAfterShadow(i, b, A, v, G, H, null);
      }
    }
    const V = b.children;
    for (let G = 0, I = V.length; G < I; G++)
      S(V[G], A, v, w, D);
  }
  function T(b) {
    b.target.removeEventListener("dispose", T);
    for (const v in l) {
      const w = l[v], D = b.target.uuid;
      D in w && (w[D].dispose(), delete w[D]);
    }
  }
}
function Qm(i, e) {
  function t() {
    let P = !1;
    const oe = new lt();
    let Z = null;
    const le = new lt(0, 0, 0, 0);
    return {
      setMask: function(fe) {
        Z !== fe && !P && (i.colorMask(fe, fe, fe, fe), Z = fe);
      },
      setLocked: function(fe) {
        P = fe;
      },
      setClear: function(fe, ee, Te, Me, nt) {
        nt === !0 && (fe *= Me, ee *= Me, Te *= Me), oe.set(fe, ee, Te, Me), le.equals(oe) === !1 && (i.clearColor(fe, ee, Te, Me), le.copy(oe));
      },
      reset: function() {
        P = !1, Z = null, le.set(-1, 0, 0, 0);
      }
    };
  }
  function n() {
    let P = !1, oe = !1, Z = null, le = null, fe = null;
    return {
      setReversed: function(ee) {
        if (oe !== ee) {
          const Te = e.get("EXT_clip_control");
          ee ? Te.clipControlEXT(Te.LOWER_LEFT_EXT, Te.ZERO_TO_ONE_EXT) : Te.clipControlEXT(Te.LOWER_LEFT_EXT, Te.NEGATIVE_ONE_TO_ONE_EXT), oe = ee;
          const Me = fe;
          fe = null, this.setClear(Me);
        }
      },
      getReversed: function() {
        return oe;
      },
      setTest: function(ee) {
        ee ? Q(i.DEPTH_TEST) : _e(i.DEPTH_TEST);
      },
      setMask: function(ee) {
        Z !== ee && !P && (i.depthMask(ee), Z = ee);
      },
      setFunc: function(ee) {
        if (oe && (ee = ah[ee]), le !== ee) {
          switch (ee) {
            case Ps:
              i.depthFunc(i.NEVER);
              break;
            case Ls:
              i.depthFunc(i.ALWAYS);
              break;
            case Ds:
              i.depthFunc(i.LESS);
              break;
            case zi:
              i.depthFunc(i.LEQUAL);
              break;
            case Is:
              i.depthFunc(i.EQUAL);
              break;
            case Us:
              i.depthFunc(i.GEQUAL);
              break;
            case Ns:
              i.depthFunc(i.GREATER);
              break;
            case Fs:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          le = ee;
        }
      },
      setLocked: function(ee) {
        P = ee;
      },
      setClear: function(ee) {
        fe !== ee && (fe = ee, oe && (ee = 1 - ee), i.clearDepth(ee));
      },
      reset: function() {
        P = !1, Z = null, le = null, fe = null, oe = !1;
      }
    };
  }
  function r() {
    let P = !1, oe = null, Z = null, le = null, fe = null, ee = null, Te = null, Me = null, nt = null;
    return {
      setTest: function(Ye) {
        P || (Ye ? Q(i.STENCIL_TEST) : _e(i.STENCIL_TEST));
      },
      setMask: function(Ye) {
        oe !== Ye && !P && (i.stencilMask(Ye), oe = Ye);
      },
      setFunc: function(Ye, Wt, Qt) {
        (Z !== Ye || le !== Wt || fe !== Qt) && (i.stencilFunc(Ye, Wt, Qt), Z = Ye, le = Wt, fe = Qt);
      },
      setOp: function(Ye, Wt, Qt) {
        (ee !== Ye || Te !== Wt || Me !== Qt) && (i.stencilOp(Ye, Wt, Qt), ee = Ye, Te = Wt, Me = Qt);
      },
      setLocked: function(Ye) {
        P = Ye;
      },
      setClear: function(Ye) {
        nt !== Ye && (i.clearStencil(Ye), nt = Ye);
      },
      reset: function() {
        P = !1, oe = null, Z = null, le = null, fe = null, ee = null, Te = null, Me = null, nt = null;
      }
    };
  }
  const s = new t(), a = new n(), o = new r(), c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap();
  let h = {}, d = {}, u = {}, p = /* @__PURE__ */ new WeakMap(), _ = [], M = null, m = !1, f = null, y = null, R = null, S = null, T = null, b = null, A = null, v = new Le(0, 0, 0), w = 0, D = !1, F = null, V = null, G = null, I = null, H = null;
  const $ = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let K = !1, ne = 0;
  const X = i.getParameter(i.VERSION);
  X.indexOf("WebGL") !== -1 ? (ne = parseFloat(/^WebGL (\d)/.exec(X)[1]), K = ne >= 1) : X.indexOf("OpenGL ES") !== -1 && (ne = parseFloat(/^OpenGL ES (\d)/.exec(X)[1]), K = ne >= 2);
  let j = null, te = {};
  const we = i.getParameter(i.SCISSOR_BOX), Ee = i.getParameter(i.VIEWPORT), et = new lt().fromArray(we), ke = new lt().fromArray(Ee);
  function qe(P, oe, Z, le) {
    const fe = new Uint8Array(4), ee = i.createTexture();
    i.bindTexture(P, ee), i.texParameteri(P, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(P, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let Te = 0; Te < Z; Te++)
      P === i.TEXTURE_3D || P === i.TEXTURE_2D_ARRAY ? i.texImage3D(oe, 0, i.RGBA, 1, 1, le, 0, i.RGBA, i.UNSIGNED_BYTE, fe) : i.texImage2D(oe + Te, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, fe);
    return ee;
  }
  const q = {};
  q[i.TEXTURE_2D] = qe(i.TEXTURE_2D, i.TEXTURE_2D, 1), q[i.TEXTURE_CUBE_MAP] = qe(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), q[i.TEXTURE_2D_ARRAY] = qe(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), q[i.TEXTURE_3D] = qe(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1), s.setClear(0, 0, 0, 1), a.setClear(1), o.setClear(0), Q(i.DEPTH_TEST), a.setFunc(zi), He(!1), at(no), Q(i.CULL_FACE), We(vn);
  function Q(P) {
    h[P] !== !0 && (i.enable(P), h[P] = !0);
  }
  function _e(P) {
    h[P] !== !1 && (i.disable(P), h[P] = !1);
  }
  function Ce(P, oe) {
    return u[P] !== oe ? (i.bindFramebuffer(P, oe), u[P] = oe, P === i.DRAW_FRAMEBUFFER && (u[i.FRAMEBUFFER] = oe), P === i.FRAMEBUFFER && (u[i.DRAW_FRAMEBUFFER] = oe), !0) : !1;
  }
  function me(P, oe) {
    let Z = _, le = !1;
    if (P) {
      Z = p.get(oe), Z === void 0 && (Z = [], p.set(oe, Z));
      const fe = P.textures;
      if (Z.length !== fe.length || Z[0] !== i.COLOR_ATTACHMENT0) {
        for (let ee = 0, Te = fe.length; ee < Te; ee++)
          Z[ee] = i.COLOR_ATTACHMENT0 + ee;
        Z.length = fe.length, le = !0;
      }
    } else
      Z[0] !== i.BACK && (Z[0] = i.BACK, le = !0);
    le && i.drawBuffers(Z);
  }
  function Fe(P) {
    return M !== P ? (i.useProgram(P), M = P, !0) : !1;
  }
  const mt = {
    [hi]: i.FUNC_ADD,
    [Ac]: i.FUNC_SUBTRACT,
    [Rc]: i.FUNC_REVERSE_SUBTRACT
  };
  mt[Cc] = i.MIN, mt[Pc] = i.MAX;
  const ze = {
    [Lc]: i.ZERO,
    [Dc]: i.ONE,
    [Ic]: i.SRC_COLOR,
    [vl]: i.SRC_ALPHA,
    [zc]: i.SRC_ALPHA_SATURATE,
    [Oc]: i.DST_COLOR,
    [Nc]: i.DST_ALPHA,
    [Uc]: i.ONE_MINUS_SRC_COLOR,
    [xl]: i.ONE_MINUS_SRC_ALPHA,
    [Bc]: i.ONE_MINUS_DST_COLOR,
    [Fc]: i.ONE_MINUS_DST_ALPHA,
    [Vc]: i.CONSTANT_COLOR,
    [Hc]: i.ONE_MINUS_CONSTANT_COLOR,
    [kc]: i.CONSTANT_ALPHA,
    [Gc]: i.ONE_MINUS_CONSTANT_ALPHA
  };
  function We(P, oe, Z, le, fe, ee, Te, Me, nt, Ye) {
    if (P === vn) {
      m === !0 && (_e(i.BLEND), m = !1);
      return;
    }
    if (m === !1 && (Q(i.BLEND), m = !0), P !== wc) {
      if (P !== f || Ye !== D) {
        if ((y !== hi || T !== hi) && (i.blendEquation(i.FUNC_ADD), y = hi, T = hi), Ye)
          switch (P) {
            case Ni:
              i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case io:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case ro:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case so:
              i.blendFuncSeparate(i.DST_COLOR, i.ONE_MINUS_SRC_ALPHA, i.ZERO, i.ONE);
              break;
            default:
              Xe("WebGLState: Invalid blending: ", P);
              break;
          }
        else
          switch (P) {
            case Ni:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case io:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE, i.ONE, i.ONE);
              break;
            case ro:
              Xe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
              break;
            case so:
              Xe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
              break;
            default:
              Xe("WebGLState: Invalid blending: ", P);
              break;
          }
        R = null, S = null, b = null, A = null, v.set(0, 0, 0), w = 0, f = P, D = Ye;
      }
      return;
    }
    fe = fe || oe, ee = ee || Z, Te = Te || le, (oe !== y || fe !== T) && (i.blendEquationSeparate(mt[oe], mt[fe]), y = oe, T = fe), (Z !== R || le !== S || ee !== b || Te !== A) && (i.blendFuncSeparate(ze[Z], ze[le], ze[ee], ze[Te]), R = Z, S = le, b = ee, A = Te), (Me.equals(v) === !1 || nt !== w) && (i.blendColor(Me.r, Me.g, Me.b, nt), v.copy(Me), w = nt), f = P, D = !1;
  }
  function tt(P, oe) {
    P.side === gn ? _e(i.CULL_FACE) : Q(i.CULL_FACE);
    let Z = P.side === Lt;
    oe && (Z = !Z), He(Z), P.blending === Ni && P.transparent === !1 ? We(vn) : We(P.blending, P.blendEquation, P.blendSrc, P.blendDst, P.blendEquationAlpha, P.blendSrcAlpha, P.blendDstAlpha, P.blendColor, P.blendAlpha, P.premultipliedAlpha), a.setFunc(P.depthFunc), a.setTest(P.depthTest), a.setMask(P.depthWrite), s.setMask(P.colorWrite);
    const le = P.stencilWrite;
    o.setTest(le), le && (o.setMask(P.stencilWriteMask), o.setFunc(P.stencilFunc, P.stencilRef, P.stencilFuncMask), o.setOp(P.stencilFail, P.stencilZFail, P.stencilZPass)), It(P.polygonOffset, P.polygonOffsetFactor, P.polygonOffsetUnits), P.alphaToCoverage === !0 ? Q(i.SAMPLE_ALPHA_TO_COVERAGE) : _e(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function He(P) {
    F !== P && (P ? i.frontFace(i.CW) : i.frontFace(i.CCW), F = P);
  }
  function at(P) {
    P !== yc ? (Q(i.CULL_FACE), P !== V && (P === no ? i.cullFace(i.BACK) : P === Ec ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : _e(i.CULL_FACE), V = P;
  }
  function vt(P) {
    P !== G && (K && i.lineWidth(P), G = P);
  }
  function It(P, oe, Z) {
    P ? (Q(i.POLYGON_OFFSET_FILL), (I !== oe || H !== Z) && (I = oe, H = Z, a.getReversed() && (oe = -oe), i.polygonOffset(oe, Z))) : _e(i.POLYGON_OFFSET_FILL);
  }
  function ot(P) {
    P ? Q(i.SCISSOR_TEST) : _e(i.SCISSOR_TEST);
  }
  function ht(P) {
    P === void 0 && (P = i.TEXTURE0 + $ - 1), j !== P && (i.activeTexture(P), j = P);
  }
  function L(P, oe, Z) {
    Z === void 0 && (j === null ? Z = i.TEXTURE0 + $ - 1 : Z = j);
    let le = te[Z];
    le === void 0 && (le = { type: void 0, texture: void 0 }, te[Z] = le), (le.type !== P || le.texture !== oe) && (j !== Z && (i.activeTexture(Z), j = Z), i.bindTexture(P, oe || q[P]), le.type = P, le.texture = oe);
  }
  function yt() {
    const P = te[j];
    P !== void 0 && P.type !== void 0 && (i.bindTexture(P.type, null), P.type = void 0, P.texture = void 0);
  }
  function $e() {
    try {
      i.compressedTexImage2D(...arguments);
    } catch (P) {
      Xe("WebGLState:", P);
    }
  }
  function E() {
    try {
      i.compressedTexImage3D(...arguments);
    } catch (P) {
      Xe("WebGLState:", P);
    }
  }
  function g() {
    try {
      i.texSubImage2D(...arguments);
    } catch (P) {
      Xe("WebGLState:", P);
    }
  }
  function N() {
    try {
      i.texSubImage3D(...arguments);
    } catch (P) {
      Xe("WebGLState:", P);
    }
  }
  function z() {
    try {
      i.compressedTexSubImage2D(...arguments);
    } catch (P) {
      Xe("WebGLState:", P);
    }
  }
  function W() {
    try {
      i.compressedTexSubImage3D(...arguments);
    } catch (P) {
      Xe("WebGLState:", P);
    }
  }
  function ie() {
    try {
      i.texStorage2D(...arguments);
    } catch (P) {
      Xe("WebGLState:", P);
    }
  }
  function re() {
    try {
      i.texStorage3D(...arguments);
    } catch (P) {
      Xe("WebGLState:", P);
    }
  }
  function Y() {
    try {
      i.texImage2D(...arguments);
    } catch (P) {
      Xe("WebGLState:", P);
    }
  }
  function J() {
    try {
      i.texImage3D(...arguments);
    } catch (P) {
      Xe("WebGLState:", P);
    }
  }
  function se(P) {
    return d[P] !== void 0 ? d[P] : i.getParameter(P);
  }
  function be(P, oe) {
    d[P] !== oe && (i.pixelStorei(P, oe), d[P] = oe);
  }
  function ce(P) {
    et.equals(P) === !1 && (i.scissor(P.x, P.y, P.z, P.w), et.copy(P));
  }
  function ae(P) {
    ke.equals(P) === !1 && (i.viewport(P.x, P.y, P.z, P.w), ke.copy(P));
  }
  function ye(P, oe) {
    let Z = l.get(oe);
    Z === void 0 && (Z = /* @__PURE__ */ new WeakMap(), l.set(oe, Z));
    let le = Z.get(P);
    le === void 0 && (le = i.getUniformBlockIndex(oe, P.name), Z.set(P, le));
  }
  function Ae(P, oe) {
    const le = l.get(oe).get(P);
    c.get(oe) !== le && (i.uniformBlockBinding(oe, le, P.__bindingPointIndex), c.set(oe, le));
  }
  function De() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.depthMask(!0), i.depthFunc(i.LESS), a.setReversed(!1), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), i.pixelStorei(i.PACK_ALIGNMENT, 4), i.pixelStorei(i.UNPACK_ALIGNMENT, 4), i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, !1), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, i.BROWSER_DEFAULT_WEBGL), i.pixelStorei(i.PACK_ROW_LENGTH, 0), i.pixelStorei(i.PACK_SKIP_PIXELS, 0), i.pixelStorei(i.PACK_SKIP_ROWS, 0), i.pixelStorei(i.UNPACK_ROW_LENGTH, 0), i.pixelStorei(i.UNPACK_IMAGE_HEIGHT, 0), i.pixelStorei(i.UNPACK_SKIP_PIXELS, 0), i.pixelStorei(i.UNPACK_SKIP_ROWS, 0), i.pixelStorei(i.UNPACK_SKIP_IMAGES, 0), h = {}, d = {}, j = null, te = {}, u = {}, p = /* @__PURE__ */ new WeakMap(), _ = [], M = null, m = !1, f = null, y = null, R = null, S = null, T = null, b = null, A = null, v = new Le(0, 0, 0), w = 0, D = !1, F = null, V = null, G = null, I = null, H = null, et.set(0, 0, i.canvas.width, i.canvas.height), ke.set(0, 0, i.canvas.width, i.canvas.height), s.reset(), a.reset(), o.reset();
  }
  return {
    buffers: {
      color: s,
      depth: a,
      stencil: o
    },
    enable: Q,
    disable: _e,
    bindFramebuffer: Ce,
    drawBuffers: me,
    useProgram: Fe,
    setBlending: We,
    setMaterial: tt,
    setFlipSided: He,
    setCullFace: at,
    setLineWidth: vt,
    setPolygonOffset: It,
    setScissorTest: ot,
    activeTexture: ht,
    bindTexture: L,
    unbindTexture: yt,
    compressedTexImage2D: $e,
    compressedTexImage3D: E,
    texImage2D: Y,
    texImage3D: J,
    pixelStorei: be,
    getParameter: se,
    updateUBOMapping: ye,
    uniformBlockBinding: Ae,
    texStorage2D: ie,
    texStorage3D: re,
    texSubImage2D: g,
    texSubImage3D: N,
    compressedTexSubImage2D: z,
    compressedTexSubImage3D: W,
    scissor: ce,
    viewport: ae,
    reset: De
  };
}
function jm(i, e, t, n, r, s, a) {
  const o = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, c = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), l = new Ne(), h = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new Set();
  let u;
  const p = /* @__PURE__ */ new WeakMap();
  let _ = !1;
  try {
    _ = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function M(E, g) {
    return _ ? new OffscreenCanvas(E, g) : Gi("canvas");
  }
  function m(E, g, N) {
    let z = 1;
    const W = $e(E);
    if ((W.width > N || W.height > N) && (z = N / Math.max(W.width, W.height)), z < 1)
      if (typeof HTMLImageElement < "u" && E instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && E instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && E instanceof ImageBitmap || typeof VideoFrame < "u" && E instanceof VideoFrame) {
        const ie = Math.floor(z * W.width), re = Math.floor(z * W.height);
        u === void 0 && (u = M(ie, re));
        const Y = g ? M(ie, re) : u;
        return Y.width = ie, Y.height = re, Y.getContext("2d").drawImage(E, 0, 0, ie, re), Re("WebGLRenderer: Texture has been resized from (" + W.width + "x" + W.height + ") to (" + ie + "x" + re + ")."), Y;
      } else
        return "data" in E && Re("WebGLRenderer: Image in DataTexture is too big (" + W.width + "x" + W.height + ")."), E;
    return E;
  }
  function f(E) {
    return E.generateMipmaps;
  }
  function y(E) {
    i.generateMipmap(E);
  }
  function R(E) {
    return E.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : E.isWebGL3DRenderTarget ? i.TEXTURE_3D : E.isWebGLArrayRenderTarget || E.isCompressedArrayTexture ? i.TEXTURE_2D_ARRAY : i.TEXTURE_2D;
  }
  function S(E, g, N, z, W, ie = !1) {
    if (E !== null) {
      if (i[E] !== void 0) return i[E];
      Re("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + E + "'");
    }
    let re;
    z && (re = e.get("EXT_texture_norm16"), re || Re("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));
    let Y = g;
    if (g === i.RED && (N === i.FLOAT && (Y = i.R32F), N === i.HALF_FLOAT && (Y = i.R16F), N === i.UNSIGNED_BYTE && (Y = i.R8), N === i.UNSIGNED_SHORT && re && (Y = re.R16_EXT), N === i.SHORT && re && (Y = re.R16_SNORM_EXT)), g === i.RED_INTEGER && (N === i.UNSIGNED_BYTE && (Y = i.R8UI), N === i.UNSIGNED_SHORT && (Y = i.R16UI), N === i.UNSIGNED_INT && (Y = i.R32UI), N === i.BYTE && (Y = i.R8I), N === i.SHORT && (Y = i.R16I), N === i.INT && (Y = i.R32I)), g === i.RG && (N === i.FLOAT && (Y = i.RG32F), N === i.HALF_FLOAT && (Y = i.RG16F), N === i.UNSIGNED_BYTE && (Y = i.RG8), N === i.UNSIGNED_SHORT && re && (Y = re.RG16_EXT), N === i.SHORT && re && (Y = re.RG16_SNORM_EXT)), g === i.RG_INTEGER && (N === i.UNSIGNED_BYTE && (Y = i.RG8UI), N === i.UNSIGNED_SHORT && (Y = i.RG16UI), N === i.UNSIGNED_INT && (Y = i.RG32UI), N === i.BYTE && (Y = i.RG8I), N === i.SHORT && (Y = i.RG16I), N === i.INT && (Y = i.RG32I)), g === i.RGB_INTEGER && (N === i.UNSIGNED_BYTE && (Y = i.RGB8UI), N === i.UNSIGNED_SHORT && (Y = i.RGB16UI), N === i.UNSIGNED_INT && (Y = i.RGB32UI), N === i.BYTE && (Y = i.RGB8I), N === i.SHORT && (Y = i.RGB16I), N === i.INT && (Y = i.RGB32I)), g === i.RGBA_INTEGER && (N === i.UNSIGNED_BYTE && (Y = i.RGBA8UI), N === i.UNSIGNED_SHORT && (Y = i.RGBA16UI), N === i.UNSIGNED_INT && (Y = i.RGBA32UI), N === i.BYTE && (Y = i.RGBA8I), N === i.SHORT && (Y = i.RGBA16I), N === i.INT && (Y = i.RGBA32I)), g === i.RGB && (N === i.UNSIGNED_SHORT && re && (Y = re.RGB16_EXT), N === i.SHORT && re && (Y = re.RGB16_SNORM_EXT), N === i.UNSIGNED_INT_5_9_9_9_REV && (Y = i.RGB9_E5), N === i.UNSIGNED_INT_10F_11F_11F_REV && (Y = i.R11F_G11F_B10F)), g === i.RGBA) {
      const J = ie ? Br : Oe.getTransfer(W);
      N === i.FLOAT && (Y = i.RGBA32F), N === i.HALF_FLOAT && (Y = i.RGBA16F), N === i.UNSIGNED_BYTE && (Y = J === Ze ? i.SRGB8_ALPHA8 : i.RGBA8), N === i.UNSIGNED_SHORT && re && (Y = re.RGBA16_EXT), N === i.SHORT && re && (Y = re.RGBA16_SNORM_EXT), N === i.UNSIGNED_SHORT_4_4_4_4 && (Y = i.RGBA4), N === i.UNSIGNED_SHORT_5_5_5_1 && (Y = i.RGB5_A1);
    }
    return (Y === i.R16F || Y === i.R32F || Y === i.RG16F || Y === i.RG32F || Y === i.RGBA16F || Y === i.RGBA32F) && e.get("EXT_color_buffer_float"), Y;
  }
  function T(E, g) {
    let N;
    return E ? g === null || g === on || g === Hi ? N = i.DEPTH24_STENCIL8 : g === rn ? N = i.DEPTH32F_STENCIL8 : g === Vi && (N = i.DEPTH24_STENCIL8, Re("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : g === null || g === on || g === Hi ? N = i.DEPTH_COMPONENT24 : g === rn ? N = i.DEPTH_COMPONENT32F : g === Vi && (N = i.DEPTH_COMPONENT16), N;
  }
  function b(E, g) {
    return f(E) === !0 || E.isFramebufferTexture && E.minFilter !== bt && E.minFilter !== At ? Math.log2(Math.max(g.width, g.height)) + 1 : E.mipmaps !== void 0 && E.mipmaps.length > 0 ? E.mipmaps.length : E.isCompressedTexture && Array.isArray(E.image) ? g.mipmaps.length : 1;
  }
  function A(E) {
    const g = E.target;
    g.removeEventListener("dispose", A), w(g), g.isVideoTexture && h.delete(g), g.isHTMLTexture && d.delete(g);
  }
  function v(E) {
    const g = E.target;
    g.removeEventListener("dispose", v), F(g);
  }
  function w(E) {
    const g = n.get(E);
    if (g.__webglInit === void 0) return;
    const N = E.source, z = p.get(N);
    if (z) {
      const W = z[g.__cacheKey];
      W.usedTimes--, W.usedTimes === 0 && D(E), Object.keys(z).length === 0 && p.delete(N);
    }
    n.remove(E);
  }
  function D(E) {
    const g = n.get(E);
    i.deleteTexture(g.__webglTexture);
    const N = E.source, z = p.get(N);
    delete z[g.__cacheKey], a.memory.textures--;
  }
  function F(E) {
    const g = n.get(E);
    if (E.depthTexture && (E.depthTexture.dispose(), n.remove(E.depthTexture)), E.isWebGLCubeRenderTarget)
      for (let z = 0; z < 6; z++) {
        if (Array.isArray(g.__webglFramebuffer[z]))
          for (let W = 0; W < g.__webglFramebuffer[z].length; W++) i.deleteFramebuffer(g.__webglFramebuffer[z][W]);
        else
          i.deleteFramebuffer(g.__webglFramebuffer[z]);
        g.__webglDepthbuffer && i.deleteRenderbuffer(g.__webglDepthbuffer[z]);
      }
    else {
      if (Array.isArray(g.__webglFramebuffer))
        for (let z = 0; z < g.__webglFramebuffer.length; z++) i.deleteFramebuffer(g.__webglFramebuffer[z]);
      else
        i.deleteFramebuffer(g.__webglFramebuffer);
      if (g.__webglDepthbuffer && i.deleteRenderbuffer(g.__webglDepthbuffer), g.__webglMultisampledFramebuffer && i.deleteFramebuffer(g.__webglMultisampledFramebuffer), g.__webglColorRenderbuffer)
        for (let z = 0; z < g.__webglColorRenderbuffer.length; z++)
          g.__webglColorRenderbuffer[z] && i.deleteRenderbuffer(g.__webglColorRenderbuffer[z]);
      g.__webglDepthRenderbuffer && i.deleteRenderbuffer(g.__webglDepthRenderbuffer);
    }
    const N = E.textures;
    for (let z = 0, W = N.length; z < W; z++) {
      const ie = n.get(N[z]);
      ie.__webglTexture && (i.deleteTexture(ie.__webglTexture), a.memory.textures--), n.remove(N[z]);
    }
    n.remove(E);
  }
  let V = 0;
  function G() {
    V = 0;
  }
  function I() {
    return V;
  }
  function H(E) {
    V = E;
  }
  function $() {
    const E = V;
    return E >= r.maxTextures && Re("WebGLTextures: Trying to use " + (E + 1) + " texture units while this GPU supports only " + r.maxTextures), V += 1, E;
  }
  function K(E) {
    const g = [];
    return g.push(E.wrapS), g.push(E.wrapT), g.push(E.wrapR || 0), g.push(E.magFilter), g.push(E.minFilter), g.push(E.anisotropy), g.push(E.internalFormat), g.push(E.format), g.push(E.type), g.push(E.generateMipmaps), g.push(E.premultiplyAlpha), g.push(E.flipY), g.push(E.unpackAlignment), g.push(E.colorSpace), g.join();
  }
  function ne(E, g) {
    const N = n.get(E);
    if (E.isVideoTexture && L(E), E.isRenderTargetTexture === !1 && E.isExternalTexture !== !0 && E.version > 0 && N.__version !== E.version) {
      const z = E.image;
      if (z === null)
        Re("WebGLRenderer: Texture marked for update but no image data found.");
      else if (z.complete === !1)
        Re("WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        _e(N, E, g);
        return;
      }
    } else E.isExternalTexture && (N.__webglTexture = E.sourceTexture ? E.sourceTexture : null);
    t.bindTexture(i.TEXTURE_2D, N.__webglTexture, i.TEXTURE0 + g);
  }
  function X(E, g) {
    const N = n.get(E);
    if (E.isRenderTargetTexture === !1 && E.version > 0 && N.__version !== E.version) {
      _e(N, E, g);
      return;
    } else E.isExternalTexture && (N.__webglTexture = E.sourceTexture ? E.sourceTexture : null);
    t.bindTexture(i.TEXTURE_2D_ARRAY, N.__webglTexture, i.TEXTURE0 + g);
  }
  function j(E, g) {
    const N = n.get(E);
    if (E.isRenderTargetTexture === !1 && E.version > 0 && N.__version !== E.version) {
      _e(N, E, g);
      return;
    }
    t.bindTexture(i.TEXTURE_3D, N.__webglTexture, i.TEXTURE0 + g);
  }
  function te(E, g) {
    const N = n.get(E);
    if (E.isCubeDepthTexture !== !0 && E.version > 0 && N.__version !== E.version) {
      Ce(N, E, g);
      return;
    }
    t.bindTexture(i.TEXTURE_CUBE_MAP, N.__webglTexture, i.TEXTURE0 + g);
  }
  const we = {
    [Ir]: i.REPEAT,
    [_n]: i.CLAMP_TO_EDGE,
    [Os]: i.MIRRORED_REPEAT
  }, Ee = {
    [bt]: i.NEAREST,
    [qc]: i.NEAREST_MIPMAP_NEAREST,
    [Ji]: i.NEAREST_MIPMAP_LINEAR,
    [At]: i.LINEAR,
    [Qr]: i.LINEAR_MIPMAP_NEAREST,
    [Vn]: i.LINEAR_MIPMAP_LINEAR
  }, et = {
    [Zc]: i.NEVER,
    [th]: i.ALWAYS,
    [Jc]: i.LESS,
    [Aa]: i.LEQUAL,
    [Qc]: i.EQUAL,
    [Ra]: i.GEQUAL,
    [jc]: i.GREATER,
    [eh]: i.NOTEQUAL
  };
  function ke(E, g) {
    if (g.type === rn && e.has("OES_texture_float_linear") === !1 && (g.magFilter === At || g.magFilter === Qr || g.magFilter === Ji || g.magFilter === Vn || g.minFilter === At || g.minFilter === Qr || g.minFilter === Ji || g.minFilter === Vn) && Re("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), i.texParameteri(E, i.TEXTURE_WRAP_S, we[g.wrapS]), i.texParameteri(E, i.TEXTURE_WRAP_T, we[g.wrapT]), (E === i.TEXTURE_3D || E === i.TEXTURE_2D_ARRAY) && i.texParameteri(E, i.TEXTURE_WRAP_R, we[g.wrapR]), i.texParameteri(E, i.TEXTURE_MAG_FILTER, Ee[g.magFilter]), i.texParameteri(E, i.TEXTURE_MIN_FILTER, Ee[g.minFilter]), g.compareFunction && (i.texParameteri(E, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(E, i.TEXTURE_COMPARE_FUNC, et[g.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) {
      if (g.magFilter === bt || g.minFilter !== Ji && g.minFilter !== Vn || g.type === rn && e.has("OES_texture_float_linear") === !1) return;
      if (g.anisotropy > 1 || n.get(g).__currentAnisotropy) {
        const N = e.get("EXT_texture_filter_anisotropic");
        i.texParameterf(E, N.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(g.anisotropy, r.getMaxAnisotropy())), n.get(g).__currentAnisotropy = g.anisotropy;
      }
    }
  }
  function qe(E, g) {
    let N = !1;
    E.__webglInit === void 0 && (E.__webglInit = !0, g.addEventListener("dispose", A));
    const z = g.source;
    let W = p.get(z);
    W === void 0 && (W = {}, p.set(z, W));
    const ie = K(g);
    if (ie !== E.__cacheKey) {
      W[ie] === void 0 && (W[ie] = {
        texture: i.createTexture(),
        usedTimes: 0
      }, a.memory.textures++, N = !0), W[ie].usedTimes++;
      const re = W[E.__cacheKey];
      re !== void 0 && (W[E.__cacheKey].usedTimes--, re.usedTimes === 0 && D(g)), E.__cacheKey = ie, E.__webglTexture = W[ie].texture;
    }
    return N;
  }
  function q(E, g, N) {
    return Math.floor(Math.floor(E / N) / g);
  }
  function Q(E, g, N, z) {
    const ie = E.updateRanges;
    if (ie.length === 0)
      t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, g.width, g.height, N, z, g.data);
    else {
      ie.sort((be, ce) => be.start - ce.start);
      let re = 0;
      for (let be = 1; be < ie.length; be++) {
        const ce = ie[re], ae = ie[be], ye = ce.start + ce.count, Ae = q(ae.start, g.width, 4), De = q(ce.start, g.width, 4);
        ae.start <= ye + 1 && Ae === De && q(ae.start + ae.count - 1, g.width, 4) === Ae ? ce.count = Math.max(
          ce.count,
          ae.start + ae.count - ce.start
        ) : (++re, ie[re] = ae);
      }
      ie.length = re + 1;
      const Y = t.getParameter(i.UNPACK_ROW_LENGTH), J = t.getParameter(i.UNPACK_SKIP_PIXELS), se = t.getParameter(i.UNPACK_SKIP_ROWS);
      t.pixelStorei(i.UNPACK_ROW_LENGTH, g.width);
      for (let be = 0, ce = ie.length; be < ce; be++) {
        const ae = ie[be], ye = Math.floor(ae.start / 4), Ae = Math.ceil(ae.count / 4), De = ye % g.width, P = Math.floor(ye / g.width), oe = Ae, Z = 1;
        t.pixelStorei(i.UNPACK_SKIP_PIXELS, De), t.pixelStorei(i.UNPACK_SKIP_ROWS, P), t.texSubImage2D(i.TEXTURE_2D, 0, De, P, oe, Z, N, z, g.data);
      }
      E.clearUpdateRanges(), t.pixelStorei(i.UNPACK_ROW_LENGTH, Y), t.pixelStorei(i.UNPACK_SKIP_PIXELS, J), t.pixelStorei(i.UNPACK_SKIP_ROWS, se);
    }
  }
  function _e(E, g, N) {
    let z = i.TEXTURE_2D;
    (g.isDataArrayTexture || g.isCompressedArrayTexture) && (z = i.TEXTURE_2D_ARRAY), g.isData3DTexture && (z = i.TEXTURE_3D);
    const W = qe(E, g), ie = g.source;
    t.bindTexture(z, E.__webglTexture, i.TEXTURE0 + N);
    const re = n.get(ie);
    if (ie.version !== re.__version || W === !0) {
      if (t.activeTexture(i.TEXTURE0 + N), (typeof ImageBitmap < "u" && g.image instanceof ImageBitmap) === !1) {
        const Z = Oe.getPrimaries(Oe.workingColorSpace), le = g.colorSpace === Dn ? null : Oe.getPrimaries(g.colorSpace), fe = g.colorSpace === Dn || Z === le ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
        t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, g.flipY), t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, g.premultiplyAlpha), t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, fe);
      }
      t.pixelStorei(i.UNPACK_ALIGNMENT, g.unpackAlignment);
      let J = m(g.image, !1, r.maxTextureSize);
      J = yt(g, J);
      const se = s.convert(g.format, g.colorSpace), be = s.convert(g.type);
      let ce = S(g.internalFormat, se, be, g.normalized, g.colorSpace, g.isVideoTexture);
      ke(z, g);
      let ae;
      const ye = g.mipmaps, Ae = g.isVideoTexture !== !0, De = re.__version === void 0 || W === !0, P = ie.dataReady, oe = b(g, J);
      if (g.isDepthTexture)
        ce = T(g.format === Hn, g.type), De && (Ae ? t.texStorage2D(i.TEXTURE_2D, 1, ce, J.width, J.height) : t.texImage2D(i.TEXTURE_2D, 0, ce, J.width, J.height, 0, se, be, null));
      else if (g.isDataTexture)
        if (ye.length > 0) {
          Ae && De && t.texStorage2D(i.TEXTURE_2D, oe, ce, ye[0].width, ye[0].height);
          for (let Z = 0, le = ye.length; Z < le; Z++)
            ae = ye[Z], Ae ? P && t.texSubImage2D(i.TEXTURE_2D, Z, 0, 0, ae.width, ae.height, se, be, ae.data) : t.texImage2D(i.TEXTURE_2D, Z, ce, ae.width, ae.height, 0, se, be, ae.data);
          g.generateMipmaps = !1;
        } else
          Ae ? (De && t.texStorage2D(i.TEXTURE_2D, oe, ce, J.width, J.height), P && Q(g, J, se, be)) : t.texImage2D(i.TEXTURE_2D, 0, ce, J.width, J.height, 0, se, be, J.data);
      else if (g.isCompressedTexture)
        if (g.isCompressedArrayTexture) {
          Ae && De && t.texStorage3D(i.TEXTURE_2D_ARRAY, oe, ce, ye[0].width, ye[0].height, J.depth);
          for (let Z = 0, le = ye.length; Z < le; Z++)
            if (ae = ye[Z], g.format !== Zt)
              if (se !== null)
                if (Ae) {
                  if (P)
                    if (g.layerUpdates.size > 0) {
                      const fe = zo(ae.width, ae.height, g.format, g.type);
                      for (const ee of g.layerUpdates) {
                        const Te = ae.data.subarray(
                          ee * fe / ae.data.BYTES_PER_ELEMENT,
                          (ee + 1) * fe / ae.data.BYTES_PER_ELEMENT
                        );
                        t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, Z, 0, 0, ee, ae.width, ae.height, 1, se, Te);
                      }
                    } else
                      t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, Z, 0, 0, 0, ae.width, ae.height, J.depth, se, ae.data);
                } else
                  t.compressedTexImage3D(i.TEXTURE_2D_ARRAY, Z, ce, ae.width, ae.height, J.depth, 0, ae.data, 0, 0);
              else
                Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
            else
              Ae ? P && t.texSubImage3D(i.TEXTURE_2D_ARRAY, Z, 0, 0, 0, ae.width, ae.height, J.depth, se, be, ae.data) : t.texImage3D(i.TEXTURE_2D_ARRAY, Z, ce, ae.width, ae.height, J.depth, 0, se, be, ae.data);
          g.layerUpdates.size > 0 && g.clearLayerUpdates();
        } else {
          Ae && De && t.texStorage2D(i.TEXTURE_2D, oe, ce, ye[0].width, ye[0].height);
          for (let Z = 0, le = ye.length; Z < le; Z++)
            ae = ye[Z], g.format !== Zt ? se !== null ? Ae ? P && t.compressedTexSubImage2D(i.TEXTURE_2D, Z, 0, 0, ae.width, ae.height, se, ae.data) : t.compressedTexImage2D(i.TEXTURE_2D, Z, ce, ae.width, ae.height, 0, ae.data) : Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : Ae ? P && t.texSubImage2D(i.TEXTURE_2D, Z, 0, 0, ae.width, ae.height, se, be, ae.data) : t.texImage2D(i.TEXTURE_2D, Z, ce, ae.width, ae.height, 0, se, be, ae.data);
        }
      else if (g.isDataArrayTexture)
        if (Ae) {
          if (De && t.texStorage3D(i.TEXTURE_2D_ARRAY, oe, ce, J.width, J.height, J.depth), P)
            if (g.layerUpdates.size > 0) {
              const Z = zo(J.width, J.height, g.format, g.type);
              for (const le of g.layerUpdates) {
                const fe = J.data.subarray(
                  le * Z / J.data.BYTES_PER_ELEMENT,
                  (le + 1) * Z / J.data.BYTES_PER_ELEMENT
                );
                t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, le, J.width, J.height, 1, se, be, fe);
              }
              g.clearLayerUpdates();
            } else
              t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, J.width, J.height, J.depth, se, be, J.data);
        } else
          t.texImage3D(i.TEXTURE_2D_ARRAY, 0, ce, J.width, J.height, J.depth, 0, se, be, J.data);
      else if (g.isData3DTexture)
        Ae ? (De && t.texStorage3D(i.TEXTURE_3D, oe, ce, J.width, J.height, J.depth), P && t.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, J.width, J.height, J.depth, se, be, J.data)) : t.texImage3D(i.TEXTURE_3D, 0, ce, J.width, J.height, J.depth, 0, se, be, J.data);
      else if (g.isFramebufferTexture) {
        if (De)
          if (Ae)
            t.texStorage2D(i.TEXTURE_2D, oe, ce, J.width, J.height);
          else {
            let Z = J.width, le = J.height;
            for (let fe = 0; fe < oe; fe++)
              t.texImage2D(i.TEXTURE_2D, fe, ce, Z, le, 0, se, be, null), Z >>= 1, le >>= 1;
          }
      } else if (g.isHTMLTexture) {
        if ("texElementImage2D" in i) {
          const Z = i.canvas;
          if (Z.hasAttribute("layoutsubtree") || Z.setAttribute("layoutsubtree", "true"), J.parentNode !== Z) {
            Z.appendChild(J), d.add(g), Z.onpaint = (le) => {
              const fe = le.changedElements;
              for (const ee of d)
                fe.includes(ee.image) && (ee.needsUpdate = !0);
            }, Z.requestPaint();
            return;
          }
          if (i.texElementImage2D.length === 3)
            i.texElementImage2D(i.TEXTURE_2D, i.RGBA8, J);
          else {
            const fe = i.RGBA, ee = i.RGBA, Te = i.UNSIGNED_BYTE;
            i.texElementImage2D(i.TEXTURE_2D, 0, fe, ee, Te, J);
          }
          i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, i.LINEAR), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE);
        }
      } else if (ye.length > 0) {
        if (Ae && De) {
          const Z = $e(ye[0]);
          t.texStorage2D(i.TEXTURE_2D, oe, ce, Z.width, Z.height);
        }
        for (let Z = 0, le = ye.length; Z < le; Z++)
          ae = ye[Z], Ae ? P && t.texSubImage2D(i.TEXTURE_2D, Z, 0, 0, se, be, ae) : t.texImage2D(i.TEXTURE_2D, Z, ce, se, be, ae);
        g.generateMipmaps = !1;
      } else if (Ae) {
        if (De) {
          const Z = $e(J);
          t.texStorage2D(i.TEXTURE_2D, oe, ce, Z.width, Z.height);
        }
        P && t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, se, be, J);
      } else
        t.texImage2D(i.TEXTURE_2D, 0, ce, se, be, J);
      f(g) && y(z), re.__version = ie.version, g.onUpdate && g.onUpdate(g);
    }
    E.__version = g.version;
  }
  function Ce(E, g, N) {
    if (g.image.length !== 6) return;
    const z = qe(E, g), W = g.source;
    t.bindTexture(i.TEXTURE_CUBE_MAP, E.__webglTexture, i.TEXTURE0 + N);
    const ie = n.get(W);
    if (W.version !== ie.__version || z === !0) {
      t.activeTexture(i.TEXTURE0 + N);
      const re = Oe.getPrimaries(Oe.workingColorSpace), Y = g.colorSpace === Dn ? null : Oe.getPrimaries(g.colorSpace), J = g.colorSpace === Dn || re === Y ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, g.flipY), t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, g.premultiplyAlpha), t.pixelStorei(i.UNPACK_ALIGNMENT, g.unpackAlignment), t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, J);
      const se = g.isCompressedTexture || g.image[0].isCompressedTexture, be = g.image[0] && g.image[0].isDataTexture, ce = [];
      for (let ee = 0; ee < 6; ee++)
        !se && !be ? ce[ee] = m(g.image[ee], !0, r.maxCubemapSize) : ce[ee] = be ? g.image[ee].image : g.image[ee], ce[ee] = yt(g, ce[ee]);
      const ae = ce[0], ye = s.convert(g.format, g.colorSpace), Ae = s.convert(g.type), De = S(g.internalFormat, ye, Ae, g.normalized, g.colorSpace), P = g.isVideoTexture !== !0, oe = ie.__version === void 0 || z === !0, Z = W.dataReady;
      let le = b(g, ae);
      ke(i.TEXTURE_CUBE_MAP, g);
      let fe;
      if (se) {
        P && oe && t.texStorage2D(i.TEXTURE_CUBE_MAP, le, De, ae.width, ae.height);
        for (let ee = 0; ee < 6; ee++) {
          fe = ce[ee].mipmaps;
          for (let Te = 0; Te < fe.length; Te++) {
            const Me = fe[Te];
            g.format !== Zt ? ye !== null ? P ? Z && t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ee, Te, 0, 0, Me.width, Me.height, ye, Me.data) : t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ee, Te, De, Me.width, Me.height, 0, Me.data) : Re("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : P ? Z && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ee, Te, 0, 0, Me.width, Me.height, ye, Ae, Me.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ee, Te, De, Me.width, Me.height, 0, ye, Ae, Me.data);
          }
        }
      } else {
        if (fe = g.mipmaps, P && oe) {
          fe.length > 0 && le++;
          const ee = $e(ce[0]);
          t.texStorage2D(i.TEXTURE_CUBE_MAP, le, De, ee.width, ee.height);
        }
        for (let ee = 0; ee < 6; ee++)
          if (be) {
            P ? Z && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ee, 0, 0, 0, ce[ee].width, ce[ee].height, ye, Ae, ce[ee].data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ee, 0, De, ce[ee].width, ce[ee].height, 0, ye, Ae, ce[ee].data);
            for (let Te = 0; Te < fe.length; Te++) {
              const nt = fe[Te].image[ee].image;
              P ? Z && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ee, Te + 1, 0, 0, nt.width, nt.height, ye, Ae, nt.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ee, Te + 1, De, nt.width, nt.height, 0, ye, Ae, nt.data);
            }
          } else {
            P ? Z && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ee, 0, 0, 0, ye, Ae, ce[ee]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ee, 0, De, ye, Ae, ce[ee]);
            for (let Te = 0; Te < fe.length; Te++) {
              const Me = fe[Te];
              P ? Z && t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ee, Te + 1, 0, 0, ye, Ae, Me.image[ee]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ee, Te + 1, De, ye, Ae, Me.image[ee]);
            }
          }
      }
      f(g) && y(i.TEXTURE_CUBE_MAP), ie.__version = W.version, g.onUpdate && g.onUpdate(g);
    }
    E.__version = g.version;
  }
  function me(E, g, N, z, W, ie) {
    const re = s.convert(N.format, N.colorSpace), Y = s.convert(N.type), J = S(N.internalFormat, re, Y, N.normalized, N.colorSpace), se = n.get(g), be = n.get(N);
    if (be.__renderTarget = g, !se.__hasExternalTextures) {
      const ce = Math.max(1, g.width >> ie), ae = Math.max(1, g.height >> ie);
      W === i.TEXTURE_3D || W === i.TEXTURE_2D_ARRAY ? t.texImage3D(W, ie, J, ce, ae, g.depth, 0, re, Y, null) : t.texImage2D(W, ie, J, ce, ae, 0, re, Y, null);
    }
    t.bindFramebuffer(i.FRAMEBUFFER, E), ht(g) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, z, W, be.__webglTexture, 0, ot(g)) : (W === i.TEXTURE_2D || W >= i.TEXTURE_CUBE_MAP_POSITIVE_X && W <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, z, W, be.__webglTexture, ie), t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function Fe(E, g, N) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, E), g.depthBuffer) {
      const z = g.depthTexture, W = z && z.isDepthTexture ? z.type : null, ie = T(g.stencilBuffer, W), re = g.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
      ht(g) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, ot(g), ie, g.width, g.height) : N ? i.renderbufferStorageMultisample(i.RENDERBUFFER, ot(g), ie, g.width, g.height) : i.renderbufferStorage(i.RENDERBUFFER, ie, g.width, g.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, re, i.RENDERBUFFER, E);
    } else {
      const z = g.textures;
      for (let W = 0; W < z.length; W++) {
        const ie = z[W], re = s.convert(ie.format, ie.colorSpace), Y = s.convert(ie.type), J = S(ie.internalFormat, re, Y, ie.normalized, ie.colorSpace);
        ht(g) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, ot(g), J, g.width, g.height) : N ? i.renderbufferStorageMultisample(i.RENDERBUFFER, ot(g), J, g.width, g.height) : i.renderbufferStorage(i.RENDERBUFFER, J, g.width, g.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function mt(E, g, N) {
    const z = g.isWebGLCubeRenderTarget === !0;
    if (t.bindFramebuffer(i.FRAMEBUFFER, E), !(g.depthTexture && g.depthTexture.isDepthTexture))
      throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");
    const W = n.get(g.depthTexture);
    if (W.__renderTarget = g, (!W.__webglTexture || g.depthTexture.image.width !== g.width || g.depthTexture.image.height !== g.height) && (g.depthTexture.image.width = g.width, g.depthTexture.image.height = g.height, g.depthTexture.needsUpdate = !0), z) {
      if (W.__webglInit === void 0 && (W.__webglInit = !0, g.depthTexture.addEventListener("dispose", A)), W.__webglTexture === void 0) {
        W.__webglTexture = i.createTexture(), t.bindTexture(i.TEXTURE_CUBE_MAP, W.__webglTexture), ke(i.TEXTURE_CUBE_MAP, g.depthTexture);
        const se = s.convert(g.depthTexture.format), be = s.convert(g.depthTexture.type);
        let ce;
        g.depthTexture.format === Sn ? ce = i.DEPTH_COMPONENT24 : g.depthTexture.format === Hn && (ce = i.DEPTH24_STENCIL8);
        for (let ae = 0; ae < 6; ae++)
          i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ae, 0, ce, g.width, g.height, 0, se, be, null);
      }
    } else
      ne(g.depthTexture, 0);
    const ie = W.__webglTexture, re = ot(g), Y = z ? i.TEXTURE_CUBE_MAP_POSITIVE_X + N : i.TEXTURE_2D, J = g.depthTexture.format === Hn ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
    if (g.depthTexture.format === Sn)
      ht(g) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, J, Y, ie, 0, re) : i.framebufferTexture2D(i.FRAMEBUFFER, J, Y, ie, 0);
    else if (g.depthTexture.format === Hn)
      ht(g) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, J, Y, ie, 0, re) : i.framebufferTexture2D(i.FRAMEBUFFER, J, Y, ie, 0);
    else
      throw new Error("THREE.WebGLTextures: Unknown depthTexture format.");
  }
  function ze(E) {
    const g = n.get(E), N = E.isWebGLCubeRenderTarget === !0;
    if (g.__boundDepthTexture !== E.depthTexture) {
      const z = E.depthTexture;
      if (g.__depthDisposeCallback && g.__depthDisposeCallback(), z) {
        const W = () => {
          delete g.__boundDepthTexture, delete g.__depthDisposeCallback, z.removeEventListener("dispose", W);
        };
        z.addEventListener("dispose", W), g.__depthDisposeCallback = W;
      }
      g.__boundDepthTexture = z;
    }
    if (E.depthTexture && !g.__autoAllocateDepthBuffer)
      if (N)
        for (let z = 0; z < 6; z++)
          mt(g.__webglFramebuffer[z], E, z);
      else {
        const z = E.texture.mipmaps;
        z && z.length > 0 ? mt(g.__webglFramebuffer[0], E, 0) : mt(g.__webglFramebuffer, E, 0);
      }
    else if (N) {
      g.__webglDepthbuffer = [];
      for (let z = 0; z < 6; z++)
        if (t.bindFramebuffer(i.FRAMEBUFFER, g.__webglFramebuffer[z]), g.__webglDepthbuffer[z] === void 0)
          g.__webglDepthbuffer[z] = i.createRenderbuffer(), Fe(g.__webglDepthbuffer[z], E, !1);
        else {
          const W = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, ie = g.__webglDepthbuffer[z];
          i.bindRenderbuffer(i.RENDERBUFFER, ie), i.framebufferRenderbuffer(i.FRAMEBUFFER, W, i.RENDERBUFFER, ie);
        }
    } else {
      const z = E.texture.mipmaps;
      if (z && z.length > 0 ? t.bindFramebuffer(i.FRAMEBUFFER, g.__webglFramebuffer[0]) : t.bindFramebuffer(i.FRAMEBUFFER, g.__webglFramebuffer), g.__webglDepthbuffer === void 0)
        g.__webglDepthbuffer = i.createRenderbuffer(), Fe(g.__webglDepthbuffer, E, !1);
      else {
        const W = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, ie = g.__webglDepthbuffer;
        i.bindRenderbuffer(i.RENDERBUFFER, ie), i.framebufferRenderbuffer(i.FRAMEBUFFER, W, i.RENDERBUFFER, ie);
      }
    }
    t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function We(E, g, N) {
    const z = n.get(E);
    g !== void 0 && me(z.__webglFramebuffer, E, E.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), N !== void 0 && ze(E);
  }
  function tt(E) {
    const g = E.texture, N = n.get(E), z = n.get(g);
    E.addEventListener("dispose", v);
    const W = E.textures, ie = E.isWebGLCubeRenderTarget === !0, re = W.length > 1;
    if (re || (z.__webglTexture === void 0 && (z.__webglTexture = i.createTexture()), z.__version = g.version, a.memory.textures++), ie) {
      N.__webglFramebuffer = [];
      for (let Y = 0; Y < 6; Y++)
        if (g.mipmaps && g.mipmaps.length > 0) {
          N.__webglFramebuffer[Y] = [];
          for (let J = 0; J < g.mipmaps.length; J++)
            N.__webglFramebuffer[Y][J] = i.createFramebuffer();
        } else
          N.__webglFramebuffer[Y] = i.createFramebuffer();
    } else {
      if (g.mipmaps && g.mipmaps.length > 0) {
        N.__webglFramebuffer = [];
        for (let Y = 0; Y < g.mipmaps.length; Y++)
          N.__webglFramebuffer[Y] = i.createFramebuffer();
      } else
        N.__webglFramebuffer = i.createFramebuffer();
      if (re)
        for (let Y = 0, J = W.length; Y < J; Y++) {
          const se = n.get(W[Y]);
          se.__webglTexture === void 0 && (se.__webglTexture = i.createTexture(), a.memory.textures++);
        }
      if (E.samples > 0 && ht(E) === !1) {
        N.__webglMultisampledFramebuffer = i.createFramebuffer(), N.__webglColorRenderbuffer = [], t.bindFramebuffer(i.FRAMEBUFFER, N.__webglMultisampledFramebuffer);
        for (let Y = 0; Y < W.length; Y++) {
          const J = W[Y];
          N.__webglColorRenderbuffer[Y] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, N.__webglColorRenderbuffer[Y]);
          const se = s.convert(J.format, J.colorSpace), be = s.convert(J.type), ce = S(J.internalFormat, se, be, J.normalized, J.colorSpace, E.isXRRenderTarget === !0), ae = ot(E);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, ae, ce, E.width, E.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Y, i.RENDERBUFFER, N.__webglColorRenderbuffer[Y]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), E.depthBuffer && (N.__webglDepthRenderbuffer = i.createRenderbuffer(), Fe(N.__webglDepthRenderbuffer, E, !0)), t.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if (ie) {
      t.bindTexture(i.TEXTURE_CUBE_MAP, z.__webglTexture), ke(i.TEXTURE_CUBE_MAP, g);
      for (let Y = 0; Y < 6; Y++)
        if (g.mipmaps && g.mipmaps.length > 0)
          for (let J = 0; J < g.mipmaps.length; J++)
            me(N.__webglFramebuffer[Y][J], E, g, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, J);
        else
          me(N.__webglFramebuffer[Y], E, g, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + Y, 0);
      f(g) && y(i.TEXTURE_CUBE_MAP), t.unbindTexture();
    } else if (re) {
      for (let Y = 0, J = W.length; Y < J; Y++) {
        const se = W[Y], be = n.get(se);
        let ce = i.TEXTURE_2D;
        (E.isWebGL3DRenderTarget || E.isWebGLArrayRenderTarget) && (ce = E.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), t.bindTexture(ce, be.__webglTexture), ke(ce, se), me(N.__webglFramebuffer, E, se, i.COLOR_ATTACHMENT0 + Y, ce, 0), f(se) && y(ce);
      }
      t.unbindTexture();
    } else {
      let Y = i.TEXTURE_2D;
      if ((E.isWebGL3DRenderTarget || E.isWebGLArrayRenderTarget) && (Y = E.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY), t.bindTexture(Y, z.__webglTexture), ke(Y, g), g.mipmaps && g.mipmaps.length > 0)
        for (let J = 0; J < g.mipmaps.length; J++)
          me(N.__webglFramebuffer[J], E, g, i.COLOR_ATTACHMENT0, Y, J);
      else
        me(N.__webglFramebuffer, E, g, i.COLOR_ATTACHMENT0, Y, 0);
      f(g) && y(Y), t.unbindTexture();
    }
    E.depthBuffer && ze(E);
  }
  function He(E) {
    const g = E.textures;
    for (let N = 0, z = g.length; N < z; N++) {
      const W = g[N];
      if (f(W)) {
        const ie = R(E), re = n.get(W).__webglTexture;
        t.bindTexture(ie, re), y(ie), t.unbindTexture();
      }
    }
  }
  const at = [], vt = [];
  function It(E) {
    if (E.samples > 0) {
      if (ht(E) === !1) {
        const g = E.textures, N = E.width, z = E.height;
        let W = i.COLOR_BUFFER_BIT;
        const ie = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, re = n.get(E), Y = g.length > 1;
        if (Y)
          for (let se = 0; se < g.length; se++)
            t.bindFramebuffer(i.FRAMEBUFFER, re.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + se, i.RENDERBUFFER, null), t.bindFramebuffer(i.FRAMEBUFFER, re.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + se, i.TEXTURE_2D, null, 0);
        t.bindFramebuffer(i.READ_FRAMEBUFFER, re.__webglMultisampledFramebuffer);
        const J = E.texture.mipmaps;
        J && J.length > 0 ? t.bindFramebuffer(i.DRAW_FRAMEBUFFER, re.__webglFramebuffer[0]) : t.bindFramebuffer(i.DRAW_FRAMEBUFFER, re.__webglFramebuffer);
        for (let se = 0; se < g.length; se++) {
          if (E.resolveDepthBuffer && (E.depthBuffer && (W |= i.DEPTH_BUFFER_BIT), E.stencilBuffer && E.resolveStencilBuffer && (W |= i.STENCIL_BUFFER_BIT)), Y) {
            i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, re.__webglColorRenderbuffer[se]);
            const be = n.get(g[se]).__webglTexture;
            i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, be, 0);
          }
          i.blitFramebuffer(0, 0, N, z, 0, 0, N, z, W, i.NEAREST), c === !0 && (at.length = 0, vt.length = 0, at.push(i.COLOR_ATTACHMENT0 + se), E.depthBuffer && E.storeMultisampledDepthBuffer === !1 && (at.push(ie), vt.push(ie), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, vt)), i.invalidateFramebuffer(i.READ_FRAMEBUFFER, at));
        }
        if (t.bindFramebuffer(i.READ_FRAMEBUFFER, null), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), Y)
          for (let se = 0; se < g.length; se++) {
            t.bindFramebuffer(i.FRAMEBUFFER, re.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + se, i.RENDERBUFFER, re.__webglColorRenderbuffer[se]);
            const be = n.get(g[se]).__webglTexture;
            t.bindFramebuffer(i.FRAMEBUFFER, re.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + se, i.TEXTURE_2D, be, 0);
          }
        t.bindFramebuffer(i.DRAW_FRAMEBUFFER, re.__webglMultisampledFramebuffer);
      } else if (E.depthBuffer && E.storeMultisampledDepthBuffer === !1 && c) {
        const g = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT;
        i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [g]);
      }
    }
  }
  function ot(E) {
    return Math.min(r.maxSamples, E.samples);
  }
  function ht(E) {
    const g = n.get(E);
    return E.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && g.__useRenderToTexture !== !1;
  }
  function L(E) {
    const g = a.render.frame;
    h.get(E) !== g && (h.set(E, g), E.update());
  }
  function yt(E, g) {
    const N = E.colorSpace, z = E.format, W = E.type;
    return E.isCompressedTexture === !0 || E.isVideoTexture === !0 || N !== Or && N !== Dn && (Oe.getTransfer(N) === Ze ? (z !== Zt || W !== Ot) && Re("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : Xe("WebGLTextures: Unsupported texture color space:", N)), g;
  }
  function $e(E) {
    return typeof HTMLImageElement < "u" && E instanceof HTMLImageElement ? (l.width = E.naturalWidth || E.width, l.height = E.naturalHeight || E.height) : typeof VideoFrame < "u" && E instanceof VideoFrame ? (l.width = E.displayWidth, l.height = E.displayHeight) : (l.width = E.width, l.height = E.height), l;
  }
  this.allocateTextureUnit = $, this.resetTextureUnits = G, this.getTextureUnits = I, this.setTextureUnits = H, this.setTexture2D = ne, this.setTexture2DArray = X, this.setTexture3D = j, this.setTextureCube = te, this.rebindTextures = We, this.setupRenderTarget = tt, this.updateRenderTargetMipmap = He, this.updateMultisampleRenderTarget = It, this.setupDepthRenderbuffer = ze, this.setupFrameBufferTexture = me, this.useMultisampledRTT = ht, this.isReversedDepthBuffer = function() {
    return t.buffers.depth.getReversed();
  };
}
function eg(i, e) {
  function t(n, r = Dn) {
    let s;
    const a = Oe.getTransfer(r);
    if (n === Ot) return i.UNSIGNED_BYTE;
    if (n === ba) return i.UNSIGNED_SHORT_4_4_4_4;
    if (n === ya) return i.UNSIGNED_SHORT_5_5_5_1;
    if (n === Pl) return i.UNSIGNED_INT_5_9_9_9_REV;
    if (n === Ll) return i.UNSIGNED_INT_10F_11F_11F_REV;
    if (n === Rl) return i.BYTE;
    if (n === Cl) return i.SHORT;
    if (n === Vi) return i.UNSIGNED_SHORT;
    if (n === Sa) return i.INT;
    if (n === on) return i.UNSIGNED_INT;
    if (n === rn) return i.FLOAT;
    if (n === ln) return i.HALF_FLOAT;
    if (n === Dl) return i.ALPHA;
    if (n === Il) return i.RGB;
    if (n === Zt) return i.RGBA;
    if (n === Sn) return i.DEPTH_COMPONENT;
    if (n === Hn) return i.DEPTH_STENCIL;
    if (n === Ul) return i.RED;
    if (n === Ea) return i.RED_INTEGER;
    if (n === Wn) return i.RG;
    if (n === Ta) return i.RG_INTEGER;
    if (n === wa) return i.RGBA_INTEGER;
    if (n === wr || n === Ar || n === Rr || n === Cr)
      if (a === Ze)
        if (s = e.get("WEBGL_compressed_texture_s3tc_srgb"), s !== null) {
          if (n === wr) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (n === Ar) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (n === Rr) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (n === Cr) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (s = e.get("WEBGL_compressed_texture_s3tc"), s !== null) {
        if (n === wr) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (n === Ar) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (n === Rr) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (n === Cr) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (n === Bs || n === zs || n === Vs || n === Hs)
      if (s = e.get("WEBGL_compressed_texture_pvrtc"), s !== null) {
        if (n === Bs) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (n === zs) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (n === Vs) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (n === Hs) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (n === ks || n === Gs || n === Ws || n === Xs || n === qs || n === Ur || n === Ys)
      if (s = e.get("WEBGL_compressed_texture_etc"), s !== null) {
        if (n === ks || n === Gs) return a === Ze ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
        if (n === Ws) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC;
        if (n === Xs) return s.COMPRESSED_R11_EAC;
        if (n === qs) return s.COMPRESSED_SIGNED_R11_EAC;
        if (n === Ur) return s.COMPRESSED_RG11_EAC;
        if (n === Ys) return s.COMPRESSED_SIGNED_RG11_EAC;
      } else
        return null;
    if (n === Ks || n === $s || n === Zs || n === Js || n === Qs || n === js || n === ea || n === ta || n === na || n === ia || n === ra || n === sa || n === aa || n === oa)
      if (s = e.get("WEBGL_compressed_texture_astc"), s !== null) {
        if (n === Ks) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (n === $s) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (n === Zs) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (n === Js) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (n === Qs) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (n === js) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (n === ea) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (n === ta) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (n === na) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (n === ia) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (n === ra) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (n === sa) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (n === aa) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (n === oa) return a === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (n === la || n === ca || n === ha)
      if (s = e.get("EXT_texture_compression_bptc"), s !== null) {
        if (n === la) return a === Ze ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (n === ca) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (n === ha) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (n === ua || n === da || n === Nr || n === fa)
      if (s = e.get("EXT_texture_compression_rgtc"), s !== null) {
        if (n === ua) return s.COMPRESSED_RED_RGTC1_EXT;
        if (n === da) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (n === Nr) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (n === fa) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return n === Hi ? i.UNSIGNED_INT_24_8 : i[n] !== void 0 ? i[n] : null;
  }
  return { convert: t };
}
const tg = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, ng = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
class ig {
  /**
   * Constructs a new depth sensing module.
   */
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  /**
   * Inits the depth sensing module
   *
   * @param {XRWebGLDepthInformation} depthData - The XR depth data.
   * @param {XRRenderState} renderState - The XR render state.
   */
  init(e, t) {
    if (this.texture === null) {
      const n = new kl(e.texture);
      (e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = n;
    }
  }
  /**
   * Returns a plane mesh that visualizes the depth texture.
   *
   * @param {ArrayCamera} cameraXR - The XR camera.
   * @return {?Mesh} The plane mesh.
   */
  getMesh(e) {
    if (this.texture !== null && this.mesh === null) {
      const t = e.cameras[0].viewport, n = new Jt({
        vertexShader: tg,
        fragmentShader: ng,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: t.z },
          depthHeight: { value: t.w }
        }
      });
      this.mesh = new Bt(new Wr(20, 20), n);
    }
    return this.mesh;
  }
  /**
   * Resets the module
   */
  reset() {
    this.texture = null, this.mesh = null;
  }
  /**
   * Returns a texture representing the depth of the user's environment.
   *
   * @return {?ExternalTexture} The depth texture.
   */
  getDepthTexture() {
    return this.texture;
  }
}
class rg extends Xn {
  /**
   * Constructs a new WebGL renderer.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGL2RenderingContext} gl - The rendering context.
   */
  constructor(e, t) {
    super();
    const n = this;
    let r = null, s = 1, a = null, o = "local-floor", c = 1, l = null, h = null, d = null, u = null, p = null, _ = null;
    const M = typeof XRWebGLBinding < "u", m = new ig(), f = {}, y = t.getContextAttributes();
    let R = null, S = null;
    const T = [], b = [], A = new Ne();
    let v = null, w = null;
    const D = new kt();
    D.viewport = new lt();
    const F = new kt();
    F.viewport = new lt();
    const V = [D, F], G = new cu();
    let I = null, H = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(q) {
      let Q = T[q];
      return Q === void 0 && (Q = new ss(), T[q] = Q), Q.getTargetRaySpace();
    }, this.getControllerGrip = function(q) {
      let Q = T[q];
      return Q === void 0 && (Q = new ss(), T[q] = Q), Q.getGripSpace();
    }, this.getHand = function(q) {
      let Q = T[q];
      return Q === void 0 && (Q = new ss(), T[q] = Q), Q.getHandSpace();
    };
    function $(q) {
      const Q = b.indexOf(q.inputSource);
      if (Q === -1)
        return;
      const _e = T[Q];
      _e !== void 0 && (_e.update(q.inputSource, q.frame, l || a), _e.dispatchEvent({ type: q.type, data: q.inputSource }));
    }
    function K() {
      r.removeEventListener("select", $), r.removeEventListener("selectstart", $), r.removeEventListener("selectend", $), r.removeEventListener("squeeze", $), r.removeEventListener("squeezestart", $), r.removeEventListener("squeezeend", $), r.removeEventListener("end", K), r.removeEventListener("inputsourceschange", ne);
      for (let q = 0; q < T.length; q++) {
        const Q = b[q];
        Q !== null && (b[q] = null, T[q].disconnect(Q));
      }
      I = null, H = null, m.reset();
      for (const q in f)
        delete f[q];
      if (e.setRenderTarget(R), p = null, u = null, d = null, r = null, S = null, qe.stop(), n.isPresenting = !1, e.setPixelRatio(v), e.setSize(A.width, A.height, !1), w !== null) {
        const q = w.camera;
        q.fov = w.fov, q.zoom = w.zoom, q.updateProjectionMatrix(), w = null;
      }
      n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(q) {
      s = q, n.isPresenting === !0 && Re("WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(q) {
      o = q, n.isPresenting === !0 && Re("WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return l || a;
    }, this.setReferenceSpace = function(q) {
      l = q;
    }, this.getBaseLayer = function() {
      return u !== null ? u : p;
    }, this.getBinding = function() {
      return d === null && M && (d = new XRWebGLBinding(r, t)), d;
    }, this.getFrame = function() {
      return _;
    }, this.getSession = function() {
      return r;
    }, this.setSession = async function(q) {
      if (r = q, r !== null) {
        if (R = e.getRenderTarget(), r.addEventListener("select", $), r.addEventListener("selectstart", $), r.addEventListener("selectend", $), r.addEventListener("squeeze", $), r.addEventListener("squeezestart", $), r.addEventListener("squeezeend", $), r.addEventListener("end", K), r.addEventListener("inputsourceschange", ne), y.xrCompatible !== !0 && await t.makeXRCompatible(), v = e.getPixelRatio(), e.getSize(A), M && "createProjectionLayer" in XRWebGLBinding.prototype) {
          let _e = null, Ce = null, me = null;
          y.depth && (me = y.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, _e = y.stencil ? Hn : Sn, Ce = y.stencil ? Hi : on);
          const Fe = {
            colorFormat: t.RGBA8,
            depthFormat: me,
            scaleFactor: s
          };
          d = this.getBinding(), u = d.createProjectionLayer(Fe), r.updateRenderState({ layers: [u] }), e.setPixelRatio(1), e.setSize(u.textureWidth, u.textureHeight, !1), S = new Gt(
            u.textureWidth,
            u.textureHeight,
            {
              format: Zt,
              type: Ot,
              depthTexture: new Xi(u.textureWidth, u.textureHeight, Ce, void 0, void 0, void 0, void 0, void 0, void 0, _e),
              stencilBuffer: y.stencil,
              colorSpace: e.outputColorSpace,
              samples: y.antialias ? 4 : 0,
              resolveDepthBuffer: u.ignoreDepthValues === !1,
              resolveStencilBuffer: u.ignoreDepthValues === !1,
              storeMultisampledDepthBuffer: u.ignoreDepthValues === !1,
              storeMultisampledStencilBuffer: u.ignoreDepthValues === !1
            }
          );
        } else {
          const _e = {
            antialias: y.antialias,
            alpha: !0,
            depth: y.depth,
            stencil: y.stencil,
            framebufferScaleFactor: s
          };
          p = new XRWebGLLayer(r, t, _e), r.updateRenderState({ baseLayer: p }), e.setPixelRatio(1), e.setSize(p.framebufferWidth, p.framebufferHeight, !1), S = new Gt(
            p.framebufferWidth,
            p.framebufferHeight,
            {
              format: Zt,
              type: Ot,
              colorSpace: e.outputColorSpace,
              stencilBuffer: y.stencil,
              resolveDepthBuffer: p.ignoreDepthValues === !1,
              resolveStencilBuffer: p.ignoreDepthValues === !1,
              storeMultisampledDepthBuffer: p.ignoreDepthValues === !1,
              storeMultisampledStencilBuffer: p.ignoreDepthValues === !1
            }
          );
        }
        S.isXRRenderTarget = !0, this.setFoveation(c), l = null, a = await r.requestReferenceSpace(o), qe.setContext(r), qe.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (r !== null)
        return r.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return m.getDepthTexture();
    };
    function ne(q) {
      for (let Q = 0; Q < q.removed.length; Q++) {
        const _e = q.removed[Q], Ce = b.indexOf(_e);
        Ce >= 0 && (b[Ce] = null, T[Ce].disconnect(_e));
      }
      for (let Q = 0; Q < q.added.length; Q++) {
        const _e = q.added[Q];
        let Ce = b.indexOf(_e);
        if (Ce === -1) {
          for (let Fe = 0; Fe < T.length; Fe++)
            if (Fe >= b.length) {
              b.push(_e), Ce = Fe;
              break;
            } else if (b[Fe] === null) {
              b[Fe] = _e, Ce = Fe;
              break;
            }
          if (Ce === -1) break;
        }
        const me = T[Ce];
        me && me.connect(_e);
      }
    }
    const X = new U(), j = new U();
    function te(q, Q, _e) {
      X.setFromMatrixPosition(Q.matrixWorld), j.setFromMatrixPosition(_e.matrixWorld);
      const Ce = X.distanceTo(j), me = Q.projectionMatrix.elements, Fe = _e.projectionMatrix.elements, mt = me[14] / (me[10] - 1), ze = me[14] / (me[10] + 1), We = (me[9] + 1) / me[5], tt = (me[9] - 1) / me[5], He = (me[8] - 1) / me[0], at = (Fe[8] + 1) / Fe[0], vt = mt * He, It = mt * at, ot = Ce / (-He + at), ht = ot * -He;
      if (Q.matrixWorld.decompose(q.position, q.quaternion, q.scale), q.translateX(ht), q.translateZ(ot), q.matrixWorld.compose(q.position, q.quaternion, q.scale), q.matrixWorldInverse.copy(q.matrixWorld).invert(), me[10] === -1)
        q.projectionMatrix.copy(Q.projectionMatrix), q.projectionMatrixInverse.copy(Q.projectionMatrixInverse);
      else {
        const L = mt + ot, yt = ze + ot, $e = vt - ht, E = It + (Ce - ht), g = We * ze / yt * L, N = tt * ze / yt * L;
        q.projectionMatrix.makePerspective($e, E, g, N, L, yt), q.projectionMatrixInverse.copy(q.projectionMatrix).invert();
      }
    }
    function we(q, Q) {
      Q === null ? q.matrixWorld.copy(q.matrix) : q.matrixWorld.multiplyMatrices(Q.matrixWorld, q.matrix), q.matrixWorldInverse.copy(q.matrixWorld).invert();
    }
    this.updateCamera = function(q) {
      if (r === null) return;
      let Q = q.near, _e = q.far;
      m.texture !== null && (m.depthNear > 0 && (Q = m.depthNear), m.depthFar > 0 && (_e = m.depthFar)), G.near = F.near = D.near = Q, G.far = F.far = D.far = _e, (I !== G.near || H !== G.far) && (r.updateRenderState({
        depthNear: G.near,
        depthFar: G.far
      }), I = G.near, H = G.far), G.layers.mask = q.layers.mask | 6, D.layers.mask = G.layers.mask & -5, F.layers.mask = G.layers.mask & -3;
      const Ce = q.parent, me = G.cameras;
      we(G, Ce);
      for (let Fe = 0; Fe < me.length; Fe++)
        we(me[Fe], Ce);
      me.length === 2 ? te(G, D, F) : G.projectionMatrix.copy(D.projectionMatrix), w === null && q.isPerspectiveCamera && (w = { camera: q, fov: q.fov, zoom: q.zoom }), Ee(q, G, Ce);
    };
    function Ee(q, Q, _e) {
      _e === null ? q.matrix.copy(Q.matrixWorld) : (q.matrix.copy(_e.matrixWorld), q.matrix.invert(), q.matrix.multiply(Q.matrixWorld)), q.matrix.decompose(q.position, q.quaternion, q.scale), q.updateMatrixWorld(!0), q.projectionMatrix.copy(Q.projectionMatrix), q.projectionMatrixInverse.copy(Q.projectionMatrixInverse), q.isPerspectiveCamera && (q.fov = Wi * 2 * Math.atan(1 / q.projectionMatrix.elements[5]), q.zoom = 1);
    }
    this.getCamera = function() {
      return G;
    }, this.getFoveation = function() {
      if (!(u === null && p === null))
        return c;
    }, this.setFoveation = function(q) {
      c = q, u !== null && (u.fixedFoveation = q), p !== null && p.fixedFoveation !== void 0 && (p.fixedFoveation = q);
    }, this.hasDepthSensing = function() {
      return m.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return m.getMesh(G);
    }, this.getCameraTexture = function(q) {
      return f[q];
    };
    let et = null;
    function ke(q, Q) {
      if (h = Q.getViewerPose(l || a), _ = Q, h !== null) {
        const _e = h.views;
        p !== null && (e.setRenderTargetFramebuffer(S, p.framebuffer), e.setRenderTarget(S));
        let Ce = !1;
        _e.length !== G.cameras.length && (G.cameras.length = 0, Ce = !0);
        for (let ze = 0; ze < _e.length; ze++) {
          const We = _e[ze];
          let tt = null;
          if (p !== null)
            tt = p.getViewport(We);
          else {
            const at = d.getViewSubImage(u, We);
            tt = at.viewport, ze === 0 && (e.setRenderTargetTextures(
              S,
              at.colorTexture,
              at.depthStencilTexture
            ), e.setRenderTarget(S));
          }
          let He = V[ze];
          He === void 0 && (He = new kt(), He.layers.enable(ze), He.viewport = new lt(), V[ze] = He), He.matrix.fromArray(We.transform.matrix), He.matrix.decompose(He.position, He.quaternion, He.scale), He.projectionMatrix.fromArray(We.projectionMatrix), He.projectionMatrixInverse.copy(He.projectionMatrix).invert(), He.viewport.set(tt.x, tt.y, tt.width, tt.height), ze === 0 && (G.matrix.copy(He.matrix), G.matrix.decompose(G.position, G.quaternion, G.scale)), Ce === !0 && G.cameras.push(He);
        }
        const me = r.enabledFeatures;
        if (me && me.includes("depth-sensing") && r.depthUsage == "gpu-optimized" && M) {
          d = n.getBinding();
          const ze = d.getDepthInformation(_e[0]);
          ze && ze.isValid && ze.texture && m.init(ze, r.renderState);
        }
        if (me && me.includes("camera-access") && M) {
          e.state.unbindTexture(), d = n.getBinding();
          for (let ze = 0; ze < _e.length; ze++) {
            const We = _e[ze].camera;
            if (We) {
              let tt = f[We];
              tt || (tt = new kl(), f[We] = tt);
              const He = d.getCameraImage(We);
              tt.sourceTexture = He;
            }
          }
        }
      }
      for (let _e = 0; _e < T.length; _e++) {
        const Ce = b[_e], me = T[_e];
        Ce !== null && me !== void 0 && me.update(Ce, Q, l || a);
      }
      et && et(q, Q), Q.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: Q }), _ = null;
    }
    const qe = new $l();
    qe.setAnimationLoop(ke), this.setAnimationLoop = function(q) {
      et = q;
    }, this.dispose = function() {
    };
  }
}
const sg = /* @__PURE__ */ new st(), nc = /* @__PURE__ */ new Pe();
nc.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
function ag(i, e) {
  function t(m, f) {
    m.matrixAutoUpdate === !0 && m.updateMatrix(), f.value.copy(m.matrix);
  }
  function n(m, f) {
    f.color.getRGB(m.fogColor.value, Gl(i)), f.isFog ? (m.fogNear.value = f.near, m.fogFar.value = f.far) : f.isFogExp2 && (m.fogDensity.value = f.density);
  }
  function r(m, f, y, R, S) {
    f.isNodeMaterial ? f.uniformsNeedUpdate = !1 : f.isMeshBasicMaterial ? s(m, f) : f.isMeshLambertMaterial ? (s(m, f), f.envMap && (m.envMapIntensity.value = f.envMapIntensity)) : f.isMeshToonMaterial ? (s(m, f), d(m, f)) : f.isMeshPhongMaterial ? (s(m, f), h(m, f), f.envMap && (m.envMapIntensity.value = f.envMapIntensity)) : f.isMeshStandardMaterial ? (s(m, f), u(m, f), f.isMeshPhysicalMaterial && p(m, f, S)) : f.isMeshMatcapMaterial ? (s(m, f), _(m, f)) : f.isMeshDepthMaterial ? s(m, f) : f.isMeshDistanceMaterial ? (s(m, f), M(m, f)) : f.isMeshNormalMaterial ? s(m, f) : f.isLineBasicMaterial ? (a(m, f), f.isLineDashedMaterial && o(m, f)) : f.isPointsMaterial ? c(m, f, y, R) : f.isSpriteMaterial ? l(m, f) : f.isShadowMaterial ? (m.color.value.copy(f.color), m.opacity.value = f.opacity) : f.isShaderMaterial && (f.uniformsNeedUpdate = !1);
  }
  function s(m, f) {
    m.opacity.value = f.opacity, f.color && m.diffuse.value.copy(f.color), f.emissive && m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity), f.map && (m.map.value = f.map, t(f.map, m.mapTransform)), f.alphaMap && (m.alphaMap.value = f.alphaMap, t(f.alphaMap, m.alphaMapTransform)), f.bumpMap && (m.bumpMap.value = f.bumpMap, t(f.bumpMap, m.bumpMapTransform), m.bumpScale.value = f.bumpScale, f.side === Lt && (m.bumpScale.value *= -1)), f.normalMap && (m.normalMap.value = f.normalMap, t(f.normalMap, m.normalMapTransform), m.normalScale.value.copy(f.normalScale), f.side === Lt && m.normalScale.value.negate()), f.displacementMap && (m.displacementMap.value = f.displacementMap, t(f.displacementMap, m.displacementMapTransform), m.displacementScale.value = f.displacementScale, m.displacementBias.value = f.displacementBias), f.emissiveMap && (m.emissiveMap.value = f.emissiveMap, t(f.emissiveMap, m.emissiveMapTransform)), f.specularMap && (m.specularMap.value = f.specularMap, t(f.specularMap, m.specularMapTransform)), f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
    const y = e.get(f), R = y.envMap, S = y.envMapRotation;
    R && (m.envMap.value = R, m.envMapRotation.value.setFromMatrix4(sg.makeRotationFromEuler(S)).transpose(), R.isCubeTexture && R.isRenderTargetTexture === !1 && m.envMapRotation.value.premultiply(nc), m.reflectivity.value = f.reflectivity, m.ior.value = f.ior, m.refractionRatio.value = f.refractionRatio), f.lightMap && (m.lightMap.value = f.lightMap, m.lightMapIntensity.value = f.lightMapIntensity, t(f.lightMap, m.lightMapTransform)), f.aoMap && (m.aoMap.value = f.aoMap, m.aoMapIntensity.value = f.aoMapIntensity, t(f.aoMap, m.aoMapTransform));
  }
  function a(m, f) {
    m.diffuse.value.copy(f.color), m.opacity.value = f.opacity, f.map && (m.map.value = f.map, t(f.map, m.mapTransform));
  }
  function o(m, f) {
    m.dashSize.value = f.dashSize, m.totalSize.value = f.dashSize + f.gapSize, m.scale.value = f.scale;
  }
  function c(m, f, y, R) {
    m.diffuse.value.copy(f.color), m.opacity.value = f.opacity, m.size.value = f.size * y, m.scale.value = R * 0.5, f.map && (m.map.value = f.map, t(f.map, m.uvTransform)), f.alphaMap && (m.alphaMap.value = f.alphaMap, t(f.alphaMap, m.alphaMapTransform)), f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
  }
  function l(m, f) {
    m.diffuse.value.copy(f.color), m.opacity.value = f.opacity, m.rotation.value = f.rotation, f.map && (m.map.value = f.map, t(f.map, m.mapTransform)), f.alphaMap && (m.alphaMap.value = f.alphaMap, t(f.alphaMap, m.alphaMapTransform)), f.alphaTest > 0 && (m.alphaTest.value = f.alphaTest);
  }
  function h(m, f) {
    m.specular.value.copy(f.specular), m.shininess.value = Math.max(f.shininess, 1e-4);
  }
  function d(m, f) {
    f.gradientMap && (m.gradientMap.value = f.gradientMap);
  }
  function u(m, f) {
    m.metalness.value = f.metalness, f.metalnessMap && (m.metalnessMap.value = f.metalnessMap, t(f.metalnessMap, m.metalnessMapTransform)), m.roughness.value = f.roughness, f.roughnessMap && (m.roughnessMap.value = f.roughnessMap, t(f.roughnessMap, m.roughnessMapTransform)), f.envMap && (m.envMapIntensity.value = f.envMapIntensity);
  }
  function p(m, f, y) {
    m.ior.value = f.ior, f.sheen > 0 && (m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen), m.sheenRoughness.value = f.sheenRoughness, f.sheenColorMap && (m.sheenColorMap.value = f.sheenColorMap, t(f.sheenColorMap, m.sheenColorMapTransform)), f.sheenRoughnessMap && (m.sheenRoughnessMap.value = f.sheenRoughnessMap, t(f.sheenRoughnessMap, m.sheenRoughnessMapTransform))), f.clearcoat > 0 && (m.clearcoat.value = f.clearcoat, m.clearcoatRoughness.value = f.clearcoatRoughness, f.clearcoatMap && (m.clearcoatMap.value = f.clearcoatMap, t(f.clearcoatMap, m.clearcoatMapTransform)), f.clearcoatRoughnessMap && (m.clearcoatRoughnessMap.value = f.clearcoatRoughnessMap, t(f.clearcoatRoughnessMap, m.clearcoatRoughnessMapTransform)), f.clearcoatNormalMap && (m.clearcoatNormalMap.value = f.clearcoatNormalMap, t(f.clearcoatNormalMap, m.clearcoatNormalMapTransform), m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale), f.side === Lt && m.clearcoatNormalScale.value.negate())), f.dispersion > 0 && (m.dispersion.value = f.dispersion), f.retroreflectivity > 0 && (m.retroreflectivity.value = f.retroreflectivity), f.iridescence > 0 && (m.iridescence.value = f.iridescence, m.iridescenceIOR.value = f.iridescenceIOR, m.iridescenceThicknessMinimum.value = f.iridescenceThicknessRange[0], m.iridescenceThicknessMaximum.value = f.iridescenceThicknessRange[1], f.iridescenceMap && (m.iridescenceMap.value = f.iridescenceMap, t(f.iridescenceMap, m.iridescenceMapTransform)), f.iridescenceThicknessMap && (m.iridescenceThicknessMap.value = f.iridescenceThicknessMap, t(f.iridescenceThicknessMap, m.iridescenceThicknessMapTransform))), f.transmission > 0 && (m.transmission.value = f.transmission, m.transmissionSamplerMap.value = y.texture, m.transmissionSamplerSize.value.set(y.width, y.height), f.transmissionMap && (m.transmissionMap.value = f.transmissionMap, t(f.transmissionMap, m.transmissionMapTransform)), m.thickness.value = f.thickness, f.thicknessMap && (m.thicknessMap.value = f.thicknessMap, t(f.thicknessMap, m.thicknessMapTransform)), m.attenuationDistance.value = f.attenuationDistance, m.attenuationColor.value.copy(f.attenuationColor)), f.anisotropy > 0 && (m.anisotropyVector.value.set(f.anisotropy * Math.cos(f.anisotropyRotation), f.anisotropy * Math.sin(f.anisotropyRotation)), f.anisotropyMap && (m.anisotropyMap.value = f.anisotropyMap, t(f.anisotropyMap, m.anisotropyMapTransform))), m.specularIntensity.value = f.specularIntensity, m.specularColor.value.copy(f.specularColor), f.specularColorMap && (m.specularColorMap.value = f.specularColorMap, t(f.specularColorMap, m.specularColorMapTransform)), f.specularIntensityMap && (m.specularIntensityMap.value = f.specularIntensityMap, t(f.specularIntensityMap, m.specularIntensityMapTransform));
  }
  function _(m, f) {
    f.matcap && (m.matcap.value = f.matcap);
  }
  function M(m, f) {
    const y = e.get(f).light;
    m.referencePosition.value.setFromMatrixPosition(y.matrixWorld), m.nearDistance.value = y.shadow.camera.near, m.farDistance.value = y.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: r
  };
}
function og(i, e, t, n) {
  let r = {}, s = {}, a = [];
  const o = i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);
  function c(S, T) {
    const b = T.program;
    n.uniformBlockBinding(S, b);
  }
  function l(S, T) {
    let b = r[S.id];
    b === void 0 && (m(S), b = h(S), r[S.id] = b, S.addEventListener("dispose", y));
    const A = T.program;
    n.updateUBOMapping(S, A);
    const v = e.render.frame;
    s[S.id] !== v && (u(S), s[S.id] = v);
  }
  function h(S) {
    const T = d();
    S.__bindingPointIndex = T;
    const b = i.createBuffer(), A = S.__size, v = S.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, b), i.bufferData(i.UNIFORM_BUFFER, A, v), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, T, b), b;
  }
  function d() {
    for (let S = 0; S < o; S++)
      if (a.indexOf(S) === -1)
        return a.push(S), S;
    return Xe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function u(S) {
    const T = r[S.id], b = S.uniforms, A = S.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, T);
    for (let v = 0, w = b.length; v < w; v++) {
      const D = b[v];
      if (Array.isArray(D))
        for (let F = 0, V = D.length; F < V; F++)
          p(D[F], v, F, A);
      else
        p(D, v, 0, A);
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function p(S, T, b, A) {
    if (M(S, T, b, A) === !0) {
      const v = S.__offset, w = S.value;
      if (Array.isArray(w)) {
        let D = 0;
        for (let F = 0; F < w.length; F++) {
          const V = w[F], G = f(V);
          _(V, S.__data, D), typeof V != "number" && typeof V != "boolean" && !V.isMatrix3 && !ArrayBuffer.isView(V) && (D += G.storage / Float32Array.BYTES_PER_ELEMENT);
        }
      } else
        _(w, S.__data, 0);
      i.bufferSubData(i.UNIFORM_BUFFER, v, S.__data);
    }
  }
  function _(S, T, b) {
    typeof S == "number" || typeof S == "boolean" ? T[0] = S : S.isMatrix3 ? (T[0] = S.elements[0], T[1] = S.elements[1], T[2] = S.elements[2], T[3] = 0, T[4] = S.elements[3], T[5] = S.elements[4], T[6] = S.elements[5], T[7] = 0, T[8] = S.elements[6], T[9] = S.elements[7], T[10] = S.elements[8], T[11] = 0) : ArrayBuffer.isView(S) ? T.set(new S.constructor(S.buffer, S.byteOffset, T.length)) : S.toArray(T, b);
  }
  function M(S, T, b, A) {
    const v = S.value, w = T + "_" + b;
    if (A[w] === void 0)
      return typeof v == "number" || typeof v == "boolean" ? A[w] = v : ArrayBuffer.isView(v) ? A[w] = v.slice() : A[w] = v.clone(), !0;
    {
      const D = A[w];
      if (typeof v == "number" || typeof v == "boolean") {
        if (D !== v)
          return A[w] = v, !0;
      } else {
        if (ArrayBuffer.isView(v))
          return !0;
        if (D.equals(v) === !1)
          return D.copy(v), !0;
      }
    }
    return !1;
  }
  function m(S) {
    const T = S.uniforms;
    let b = 0;
    const A = 16;
    for (let w = 0, D = T.length; w < D; w++) {
      const F = Array.isArray(T[w]) ? T[w] : [T[w]];
      for (let V = 0, G = F.length; V < G; V++) {
        const I = F[V], H = Array.isArray(I.value) ? I.value : [I.value];
        for (let $ = 0, K = H.length; $ < K; $++) {
          const ne = H[$], X = f(ne), j = b % A, te = j % X.boundary, we = j + te;
          b += te, we !== 0 && A - we < X.storage && (b += A - we), I.__data = new Float32Array(X.storage / Float32Array.BYTES_PER_ELEMENT), I.__offset = b, b += X.storage;
        }
      }
    }
    const v = b % A;
    return v > 0 && (b += A - v), S.__size = b, S.__cache = {}, this;
  }
  function f(S) {
    const T = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof S == "number" || typeof S == "boolean" ? (T.boundary = 4, T.storage = 4) : S.isVector2 ? (T.boundary = 8, T.storage = 8) : S.isVector3 || S.isColor ? (T.boundary = 16, T.storage = 12) : S.isVector4 ? (T.boundary = 16, T.storage = 16) : S.isMatrix3 ? (T.boundary = 48, T.storage = 48) : S.isMatrix4 ? (T.boundary = 64, T.storage = 64) : S.isTexture ? Re("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : ArrayBuffer.isView(S) ? (T.boundary = 16, T.storage = S.byteLength) : Re("WebGLRenderer: Unsupported uniform value type.", S), T;
  }
  function y(S) {
    const T = S.target;
    T.removeEventListener("dispose", y);
    const b = a.indexOf(T.__bindingPointIndex);
    a.splice(b, 1), i.deleteBuffer(r[T.id]), delete r[T.id], delete s[T.id];
  }
  function R() {
    for (const S in r)
      i.deleteBuffer(r[S]);
    a = [], r = {}, s = {};
  }
  return {
    bind: c,
    update: l,
    dispose: R
  };
}
const lg = new Uint16Array([
  12469,
  15057,
  12620,
  14925,
  13266,
  14620,
  13807,
  14376,
  14323,
  13990,
  14545,
  13625,
  14713,
  13328,
  14840,
  12882,
  14931,
  12528,
  14996,
  12233,
  15039,
  11829,
  15066,
  11525,
  15080,
  11295,
  15085,
  10976,
  15082,
  10705,
  15073,
  10495,
  13880,
  14564,
  13898,
  14542,
  13977,
  14430,
  14158,
  14124,
  14393,
  13732,
  14556,
  13410,
  14702,
  12996,
  14814,
  12596,
  14891,
  12291,
  14937,
  11834,
  14957,
  11489,
  14958,
  11194,
  14943,
  10803,
  14921,
  10506,
  14893,
  10278,
  14858,
  9960,
  14484,
  14039,
  14487,
  14025,
  14499,
  13941,
  14524,
  13740,
  14574,
  13468,
  14654,
  13106,
  14743,
  12678,
  14818,
  12344,
  14867,
  11893,
  14889,
  11509,
  14893,
  11180,
  14881,
  10751,
  14852,
  10428,
  14812,
  10128,
  14765,
  9754,
  14712,
  9466,
  14764,
  13480,
  14764,
  13475,
  14766,
  13440,
  14766,
  13347,
  14769,
  13070,
  14786,
  12713,
  14816,
  12387,
  14844,
  11957,
  14860,
  11549,
  14868,
  11215,
  14855,
  10751,
  14825,
  10403,
  14782,
  10044,
  14729,
  9651,
  14666,
  9352,
  14599,
  9029,
  14967,
  12835,
  14966,
  12831,
  14963,
  12804,
  14954,
  12723,
  14936,
  12564,
  14917,
  12347,
  14900,
  11958,
  14886,
  11569,
  14878,
  11247,
  14859,
  10765,
  14828,
  10401,
  14784,
  10011,
  14727,
  9600,
  14660,
  9289,
  14586,
  8893,
  14508,
  8533,
  15111,
  12234,
  15110,
  12234,
  15104,
  12216,
  15092,
  12156,
  15067,
  12010,
  15028,
  11776,
  14981,
  11500,
  14942,
  11205,
  14902,
  10752,
  14861,
  10393,
  14812,
  9991,
  14752,
  9570,
  14682,
  9252,
  14603,
  8808,
  14519,
  8445,
  14431,
  8145,
  15209,
  11449,
  15208,
  11451,
  15202,
  11451,
  15190,
  11438,
  15163,
  11384,
  15117,
  11274,
  15055,
  10979,
  14994,
  10648,
  14932,
  10343,
  14871,
  9936,
  14803,
  9532,
  14729,
  9218,
  14645,
  8742,
  14556,
  8381,
  14461,
  8020,
  14365,
  7603,
  15273,
  10603,
  15272,
  10607,
  15267,
  10619,
  15256,
  10631,
  15231,
  10614,
  15182,
  10535,
  15118,
  10389,
  15042,
  10167,
  14963,
  9787,
  14883,
  9447,
  14800,
  9115,
  14710,
  8665,
  14615,
  8318,
  14514,
  7911,
  14411,
  7507,
  14279,
  7198,
  15314,
  9675,
  15313,
  9683,
  15309,
  9712,
  15298,
  9759,
  15277,
  9797,
  15229,
  9773,
  15166,
  9668,
  15084,
  9487,
  14995,
  9274,
  14898,
  8910,
  14800,
  8539,
  14697,
  8234,
  14590,
  7790,
  14479,
  7409,
  14367,
  7067,
  14178,
  6621,
  15337,
  8619,
  15337,
  8631,
  15333,
  8677,
  15325,
  8769,
  15305,
  8871,
  15264,
  8940,
  15202,
  8909,
  15119,
  8775,
  15022,
  8565,
  14916,
  8328,
  14804,
  8009,
  14688,
  7614,
  14569,
  7287,
  14448,
  6888,
  14321,
  6483,
  14088,
  6171,
  15350,
  7402,
  15350,
  7419,
  15347,
  7480,
  15340,
  7613,
  15322,
  7804,
  15287,
  7973,
  15229,
  8057,
  15148,
  8012,
  15046,
  7846,
  14933,
  7611,
  14810,
  7357,
  14682,
  7069,
  14552,
  6656,
  14421,
  6316,
  14251,
  5948,
  14007,
  5528,
  15356,
  5942,
  15356,
  5977,
  15353,
  6119,
  15348,
  6294,
  15332,
  6551,
  15302,
  6824,
  15249,
  7044,
  15171,
  7122,
  15070,
  7050,
  14949,
  6861,
  14818,
  6611,
  14679,
  6349,
  14538,
  6067,
  14398,
  5651,
  14189,
  5311,
  13935,
  4958,
  15359,
  4123,
  15359,
  4153,
  15356,
  4296,
  15353,
  4646,
  15338,
  5160,
  15311,
  5508,
  15263,
  5829,
  15188,
  6042,
  15088,
  6094,
  14966,
  6001,
  14826,
  5796,
  14678,
  5543,
  14527,
  5287,
  14377,
  4985,
  14133,
  4586,
  13869,
  4257,
  15360,
  1563,
  15360,
  1642,
  15358,
  2076,
  15354,
  2636,
  15341,
  3350,
  15317,
  4019,
  15273,
  4429,
  15203,
  4732,
  15105,
  4911,
  14981,
  4932,
  14836,
  4818,
  14679,
  4621,
  14517,
  4386,
  14359,
  4156,
  14083,
  3795,
  13808,
  3437,
  15360,
  122,
  15360,
  137,
  15358,
  285,
  15355,
  636,
  15344,
  1274,
  15322,
  2177,
  15281,
  2765,
  15215,
  3223,
  15120,
  3451,
  14995,
  3569,
  14846,
  3567,
  14681,
  3466,
  14511,
  3305,
  14344,
  3121,
  14037,
  2800,
  13753,
  2467,
  15360,
  0,
  15360,
  1,
  15359,
  21,
  15355,
  89,
  15346,
  253,
  15325,
  479,
  15287,
  796,
  15225,
  1148,
  15133,
  1492,
  15008,
  1749,
  14856,
  1882,
  14685,
  1886,
  14506,
  1783,
  14324,
  1608,
  13996,
  1398,
  13702,
  1183
]);
let tn = null;
function cg() {
  return tn === null && (tn = new Gh(lg, 16, 16, Wn, ln), tn.name = "DFG_LUT", tn.minFilter = At, tn.magFilter = At, tn.wrapS = _n, tn.wrapT = _n, tn.generateMipmaps = !1, tn.needsUpdate = !0), tn;
}
class hg {
  /**
   * Constructs a new WebGL renderer.
   *
   * @param {WebGLRenderer~Options} [parameters] - The configuration parameter.
   */
  constructor(e = {}) {
    const {
      canvas: t = rh(),
      context: n = null,
      depth: r = !0,
      stencil: s = !1,
      alpha: a = !1,
      antialias: o = !1,
      premultipliedAlpha: c = !0,
      preserveDrawingBuffer: l = !1,
      powerPreference: h = "default",
      failIfMajorPerformanceCaveat: d = !1,
      reversedDepthBuffer: u = !1,
      outputBufferType: p = Ot
    } = e;
    this.isWebGLRenderer = !0;
    let _;
    if (n !== null) {
      if (typeof WebGLRenderingContext < "u" && n instanceof WebGLRenderingContext)
        throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      _ = n.getContextAttributes().alpha;
    } else
      _ = a;
    const M = p, m = /* @__PURE__ */ new Set([
      wa,
      Ta,
      Ea
    ]), f = /* @__PURE__ */ new Set([
      Ot,
      on,
      Vi,
      Hi,
      ba,
      ya
    ]), y = new Uint32Array(4), R = new Int32Array(4), S = new U();
    let T = null, b = null;
    const A = [], v = [];
    let w = null;
    this.domElement = t, this.debug = {
      /**
       * Enables error checking and reporting when shader programs are being compiled.
       * @type {boolean}
       */
      checkShaderErrors: !0,
      /**
       * Diagnostics configuration for the shader generation. Only relevant for TSL.
       * @type {Object}
       * @property {boolean} keywords - Whether declaration names that collide with reserved keywords of the shading language should be renamed or not.
       */
      diagnostics: {
        keywords: !1
      },
      /**
       * Callback for custom error reporting.
       * @type {?Function}
       */
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = an, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
    const D = this;
    let F = !1, V = null, G = null, I = null, H = null;
    this._outputColorSpace = Mt;
    let $ = 0, K = 0, ne = null, X = -1, j = null;
    const te = new lt(), we = new lt();
    let Ee = null;
    const et = new Le(0);
    let ke = 0, qe = t.width, q = t.height, Q = 1, _e = null, Ce = null;
    const me = new lt(0, 0, qe, q), Fe = new lt(0, 0, qe, q);
    let mt = !1;
    const ze = new Ua();
    let We = !1, tt = !1;
    const He = new st(), at = new U(), vt = new lt(), It = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let ot = !1;
    function ht() {
      return ne === null ? Q : 1;
    }
    let L = n;
    function yt(x, C) {
      return t.getContext(x, C);
    }
    let $e, E, g, N, z, W, ie, re, Y, J, se, be, ce, ae, ye, Ae, De, P, oe, Z, le, fe, ee;
    try {
      const x = {
        alpha: !0,
        depth: r,
        stencil: s,
        antialias: o,
        premultipliedAlpha: c,
        preserveDrawingBuffer: l,
        powerPreference: h,
        failIfMajorPerformanceCaveat: d
      };
      if ("setAttribute" in t && t.setAttribute("data-engine", `three.js r${xa}`), t.addEventListener("webglcontextlost", nt, !1), t.addEventListener("webglcontextrestored", Ye, !1), t.addEventListener("webglcontextcreationerror", Wt, !1), L === null) {
        const C = "webgl2";
        if (L = yt(C, x), L === null)
          throw yt(C) ? new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.") : new Error("THREE.WebGLRenderer: Error creating WebGL context.");
      }
      Te();
    } catch (x) {
      throw t.removeEventListener("webglcontextlost", nt, !1), t.removeEventListener("webglcontextrestored", Ye, !1), t.removeEventListener("webglcontextcreationerror", Wt, !1), Xe("WebGLRenderer: " + x.message), x;
    }
    function Te() {
      $e = new cp(L), $e.init(), le = new eg(L, $e), E = new jf(L, $e, e, le), g = new Qm(L, $e), E.reversedDepthBuffer && u && g.buffers.depth.setReversed(!0), G = L.createFramebuffer(), I = L.createFramebuffer(), H = L.createFramebuffer(), N = new dp(L), z = new Bm(), W = new jm(L, $e, g, z, E, le, N), ie = new lp(D), re = new fu(L), fe = new Jf(L, re), Y = new hp(L, re, N, fe), J = new pp(L, Y, re, fe, N), P = new fp(L, E, W), ye = new ep(z), se = new Om(D, ie, $e, E, fe, ye), be = new ag(D, z), ce = new Vm(), ae = new qm($e), De = new Zf(D, ie, g, J, _, c), Ae = new Jm(D, J, E), ee = new og(L, N, E, g), oe = new Qf(L, $e, N), Z = new up(L, $e, N), N.programs = se.programs, D.capabilities = E, D.extensions = $e, D.properties = z, D.renderLists = ce, D.shadowMap = Ae, D.state = g, D.info = N;
    }
    M !== Ot && (w = new gp(M, t.width, t.height, o, r, s));
    const Me = new rg(D, L);
    this.xr = Me, this.getContext = function() {
      return L;
    }, this.getContextAttributes = function() {
      return L.getContextAttributes();
    }, this.forceContextLoss = function() {
      const x = $e.get("WEBGL_lose_context");
      x && x.loseContext();
    }, this.forceContextRestore = function() {
      const x = $e.get("WEBGL_lose_context");
      x && x.restoreContext();
    }, this.getPixelRatio = function() {
      return Q;
    }, this.setPixelRatio = function(x) {
      x !== void 0 && (Q = x, this.setSize(qe, q, !1));
    }, this.getSize = function(x) {
      return x.set(qe, q);
    }, this.setSize = function(x, C, k = !0) {
      if (Me.isPresenting) {
        Re("WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      qe = x, q = C, t.width = Math.floor(x * Q), t.height = Math.floor(C * Q), k === !0 && (t.style.width = x + "px", t.style.height = C + "px"), w !== null && w.setSize(t.width, t.height), this.setViewport(0, 0, x, C);
    }, this.getDrawingBufferSize = function(x) {
      return x.set(qe * Q, q * Q).floor();
    }, this.setDrawingBufferSize = function(x, C, k) {
      qe = x, q = C, Q = k, t.width = Math.floor(x * k), t.height = Math.floor(C * k), this.setViewport(0, 0, x, C);
    }, this.setEffects = function(x) {
      if (M === Ot) {
        Xe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");
        return;
      }
      if (x) {
        for (let C = 0; C < x.length; C++)
          if (x[C].isOutputPass === !0) {
            Re("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");
            break;
          }
      }
      w.setEffects(x || []);
    }, this.getCurrentViewport = function(x) {
      return x.copy(te);
    }, this.getViewport = function(x) {
      return x.copy(me);
    }, this.setViewport = function(x, C, k, O) {
      x.isVector4 ? me.set(x.x, x.y, x.z, x.w) : me.set(x, C, k, O), g.viewport(te.copy(me).multiplyScalar(Q).round());
    }, this.getScissor = function(x) {
      return x.copy(Fe);
    }, this.setScissor = function(x, C, k, O) {
      x.isVector4 ? Fe.set(x.x, x.y, x.z, x.w) : Fe.set(x, C, k, O), g.scissor(we.copy(Fe).multiplyScalar(Q).round());
    }, this.getScissorTest = function() {
      return mt;
    }, this.setScissorTest = function(x) {
      g.setScissorTest(mt = x);
    }, this.setOpaqueSort = function(x) {
      _e = x;
    }, this.setTransparentSort = function(x) {
      Ce = x;
    }, this.getClearColor = function(x) {
      return x.copy(De.getClearColor());
    }, this.setClearColor = function() {
      De.setClearColor(...arguments);
    }, this.getClearAlpha = function() {
      return De.getClearAlpha();
    }, this.setClearAlpha = function() {
      De.setClearAlpha(...arguments);
    }, this.clear = function(x = !0, C = !0, k = !0) {
      let O = 0;
      if (x) {
        let B = !1;
        if (ne !== null) {
          const de = ne.texture.format;
          B = m.has(de);
        }
        if (B) {
          const de = ne.texture.type, ge = f.has(de), ue = De.getClearColor(), ve = De.getClearAlpha(), Se = ue.r, Ie = ue.g, Ve = ue.b;
          ge ? (y[0] = Se, y[1] = Ie, y[2] = Ve, y[3] = ve, L.clearBufferuiv(L.COLOR, 0, y)) : (R[0] = Se, R[1] = Ie, R[2] = Ve, R[3] = ve, L.clearBufferiv(L.COLOR, 0, R));
        } else
          O |= L.COLOR_BUFFER_BIT;
      }
      C && (O |= L.DEPTH_BUFFER_BIT, this.state.buffers.depth.setMask(!0)), k && (O |= L.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), O !== 0 && L.clear(O);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.setNodesHandler = function(x) {
      x.setRenderer(this), V = x;
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", nt, !1), t.removeEventListener("webglcontextrestored", Ye, !1), t.removeEventListener("webglcontextcreationerror", Wt, !1), De.dispose(), ce.dispose(), ae.dispose(), z.dispose(), ie.dispose(), J.dispose(), fe.dispose(), ee.dispose(), se.dispose(), Me.dispose(), Me.removeEventListener("sessionstart", qa), Me.removeEventListener("sessionend", Ya), Un.stop();
    };
    function nt(x) {
      x.preventDefault(), lo("WebGLRenderer: Context Lost."), F = !0;
    }
    function Ye() {
      lo("WebGLRenderer: Context Restored."), F = !1;
      const x = N.autoReset, C = Ae.enabled, k = Ae.autoUpdate, O = Ae.needsUpdate, B = Ae.type;
      Te(), N.autoReset = x, Ae.enabled = C, Ae.autoUpdate = k, Ae.needsUpdate = O, Ae.type = B;
    }
    function Wt(x) {
      Xe("WebGLRenderer: A WebGL context could not be created. Reason: ", x.statusMessage);
    }
    function Qt(x) {
      const C = x.target;
      C.removeEventListener("dispose", Qt), pc(C);
    }
    function pc(x) {
      mc(x), z.remove(x);
    }
    function mc(x) {
      const C = z.get(x).programs;
      C !== void 0 && (C.forEach(function(k) {
        se.releaseProgram(k);
      }), x.isShaderMaterial && se.releaseShaderCache(x));
    }
    this.renderBufferDirect = function(x, C, k, O, B, de) {
      C === null && (C = It);
      const ge = B.isMesh && B.matrixWorld.determinantAffine() < 0, ue = vc(x, C, k, O, B);
      g.setMaterial(O, ge);
      let ve = k.index, Se = 1;
      if (O.wireframe === !0) {
        if (ve = Y.getWireframeAttribute(k), ve === void 0) return;
        Se = 2;
      }
      const Ie = k.drawRange, Ve = k.attributes.position;
      let xe = Ie.start * Se, Ke = (Ie.start + Ie.count) * Se;
      de !== null && (xe = Math.max(xe, de.start * Se), Ke = Math.min(Ke, (de.start + de.count) * Se)), ve !== null ? (xe = Math.max(xe, 0), Ke = Math.min(Ke, ve.count)) : Ve != null && (xe = Math.max(xe, 0), Ke = Math.min(Ke, Ve.count));
      const ut = Ke - xe;
      if (ut < 0 || ut === 1 / 0) return;
      fe.setup(B, O, ue, k, ve);
      let rt, je = oe;
      if (ve !== null && (rt = re.get(ve), je = Z, je.setIndex(rt)), B.isMesh)
        O.wireframe === !0 ? (g.setLineWidth(O.wireframeLinewidth * ht()), je.setMode(L.LINES)) : je.setMode(L.TRIANGLES);
      else if (B.isLine) {
        let Et = O.linewidth;
        Et === void 0 && (Et = 1), g.setLineWidth(Et * ht()), B.isLineSegments ? je.setMode(L.LINES) : B.isLineLoop ? je.setMode(L.LINE_LOOP) : je.setMode(L.LINE_STRIP);
      } else B.isPoints ? je.setMode(L.POINTS) : B.isSprite && je.setMode(L.TRIANGLES);
      if (B.isBatchedMesh)
        if ($e.get("WEBGL_multi_draw"))
          je.renderMultiDraw(B._multiDrawStarts, B._multiDrawCounts, B._multiDrawCount);
        else {
          const Et = B._multiDrawStarts, pe = B._multiDrawCounts, Rt = B._multiDrawCount, Ge = ve ? re.get(ve).bytesPerElement : 1, zt = z.get(O).currentProgram.getUniforms();
          for (let jt = 0; jt < Rt; jt++)
            zt.setValue(L, "_gl_DrawID", jt), je.render(Et[jt] / Ge, pe[jt]);
        }
      else if (B.isInstancedMesh)
        je.renderInstances(xe, ut, B.count);
      else if (k.isInstancedBufferGeometry) {
        const Et = k._maxInstanceCount !== void 0 ? k._maxInstanceCount : 1 / 0, pe = Math.min(k.instanceCount, Et);
        je.renderInstances(xe, ut, pe);
      } else
        je.render(xe, ut);
    };
    function Xa(x, C, k, O) {
      V !== null && x.isNodeMaterial && V.setObject(O, x), We === !0 && ye.setState(x, k, !1), x.transparent === !0 && x.side === gn && x.forceSinglePass === !1 ? (x.side = Lt, x.needsUpdate = !0, $i(x, C, O), x.side = In, x.needsUpdate = !0, $i(x, C, O), x.side = gn) : $i(x, C, O);
    }
    this.compile = function(x, C, k = null) {
      k === null && (k = x), V !== null && V.renderStart(x, C, k), b = ae.get(k), b.init(C), v.push(b), k.traverseVisible(function(B) {
        B.isLight && B.layers.test(C.layers) && (b.pushLight(B), B.castShadow && b.pushShadow(B));
      }), x !== k && x.traverseVisible(function(B) {
        B.isLight && B.layers.test(C.layers) && (b.pushLight(B), B.castShadow && b.pushShadow(B));
      }), b.setupLights(), V !== null && V.updateLights(b.state.lightsArray), tt = this.localClippingEnabled, We = ye.init(this.clippingPlanes, tt), We === !0 && ye.setGlobalState(this.clippingPlanes, C), V !== null && Ae.render(b.state.shadowsArray, k, C);
      const O = /* @__PURE__ */ new Set();
      return x.traverse(function(B) {
        if (!(B.isMesh || B.isPoints || B.isLine || B.isSprite))
          return;
        const de = B.material;
        if (de)
          if (Array.isArray(de))
            for (let ge = 0; ge < de.length; ge++) {
              const ue = de[ge];
              Xa(ue, k, C, B), O.add(ue);
            }
          else
            Xa(de, k, C, B), O.add(de);
      }), b = v.pop(), V !== null && V.renderEnd(), O;
    }, this.compileAsync = function(x, C, k = null) {
      const O = this.compile(x, C, k);
      return new Promise((B) => {
        function de() {
          if (O.forEach(function(ge) {
            const ve = z.get(ge).currentProgram;
            (ve === void 0 || ve.isReady()) && O.delete(ge);
          }), O.size === 0) {
            B(x);
            return;
          }
          setTimeout(de, 10);
        }
        $e.get("KHR_parallel_shader_compile") !== null ? de() : setTimeout(de, 10);
      });
    };
    let Kr = null;
    function gc(x) {
      Kr && Kr(x);
    }
    function qa() {
      Un.stop();
    }
    function Ya() {
      Un.start();
    }
    const Un = new $l();
    Un.setAnimationLoop(gc), typeof self < "u" && Un.setContext(self), this.setAnimationLoop = function(x) {
      Kr = x, Me.setAnimationLoop(x), x === null ? Un.stop() : Un.start();
    }, Me.addEventListener("sessionstart", qa), Me.addEventListener("sessionend", Ya), this.render = function(x, C) {
      if (C !== void 0 && C.isCamera !== !0) {
        Xe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (F === !0) return;
      V !== null && V.renderStart(x, C);
      const k = Me.enabled === !0 && Me.isPresenting === !0, O = w !== null && (ne === null || k) && w.begin(D, ne);
      if (x.matrixWorldAutoUpdate === !0 && x.updateMatrixWorld(), C.parent === null && C.matrixWorldAutoUpdate === !0 && C.updateMatrixWorld(), Me.enabled === !0 && Me.isPresenting === !0 && (w === null || w.isCompositing() === !1) && (Me.cameraAutoUpdate === !0 && Me.updateCamera(C), C = Me.getCamera()), x.isScene === !0 && x.onBeforeRender(D, x, C, ne), b = ae.get(x, v.length), b.init(C), b.state.textureUnits = W.getTextureUnits(), v.push(b), He.multiplyMatrices(C.projectionMatrix, C.matrixWorldInverse), ze.setFromProjectionMatrix(He, sn, C.reversedDepth), tt = this.localClippingEnabled, We = ye.init(this.clippingPlanes, tt), T = ce.get(x, A.length), T.init(), A.push(T), Me.enabled === !0 && Me.isPresenting === !0) {
        const ge = D.xr.getDepthSensingMesh();
        ge !== null && $r(ge, C, -1 / 0, D.sortObjects);
      }
      $r(x, C, 0, D.sortObjects), T.finish(), V !== null && V.updateLights(b.state.lightsArray), D.sortObjects === !0 && T.sort(_e, Ce), ot = Me.enabled === !1 || Me.isPresenting === !1 || Me.hasDepthSensing() === !1, ot && De.addToRenderList(T, x), this.info.render.frame++, this.info.autoReset === !0 && this.info.reset(), We === !0 && ye.beginShadows();
      const B = b.state.shadowsArray;
      if (Ae.render(B, x, C), We === !0 && ye.endShadows(), (O && w.hasRenderPass()) === !1) {
        const ge = T.opaque, ue = T.transmissive;
        if (b.setupLights(), C.isArrayCamera) {
          const ve = C.cameras;
          if (ue.length > 0)
            for (let Se = 0, Ie = ve.length; Se < Ie; Se++) {
              const Ve = ve[Se];
              $a(ge, ue, x, Ve);
            }
          ot && De.render(x);
          for (let Se = 0, Ie = ve.length; Se < Ie; Se++) {
            const Ve = ve[Se];
            Ka(T, x, Ve, Ve.viewport);
          }
        } else
          ue.length > 0 && $a(ge, ue, x, C), ot && De.render(x), Ka(T, x, C);
      }
      ne !== null && K === 0 && (W.updateMultisampleRenderTarget(ne), W.updateRenderTargetMipmap(ne)), O && w.end(D), x.isScene === !0 && x.onAfterRender(D, x, C), fe.resetDefaultState(), X = -1, j = null, v.pop(), v.length > 0 ? (b = v[v.length - 1], W.setTextureUnits(b.state.textureUnits), We === !0 && ye.setGlobalState(D.clippingPlanes, b.state.camera)) : b = null, A.pop(), A.length > 0 ? T = A[A.length - 1] : T = null, V !== null && V.renderEnd();
    };
    function $r(x, C, k, O) {
      if (x.visible === !1) return;
      if (x.layers.test(C.layers)) {
        if (x.isGroup)
          k = x.renderOrder;
        else if (x.isLOD)
          x.autoUpdate === !0 && x.update(C);
        else if (x.isLightProbeGrid)
          b.pushLightProbeGrid(x);
        else if (x.isLight)
          b.pushLight(x), x.castShadow && b.pushShadow(x);
        else if (x.isSprite) {
          if (!x.frustumCulled || x.intersectsFrustum(ze)) {
            O && vt.setFromMatrixPosition(x.matrixWorld).applyMatrix4(He);
            const ge = J.update(x), ue = x.material;
            ue.visible && T.push(x, ge, ue, k, vt.z, null, C);
          }
        } else if ((x.isMesh || x.isLine || x.isPoints) && (!x.frustumCulled || x.intersectsFrustum(ze))) {
          const ge = J.update(x), ue = x.material;
          if (O && (x.boundingSphere !== void 0 ? (x.boundingSphere === null && x.computeBoundingSphere(), vt.copy(x.boundingSphere.center)) : (ge.boundingSphere === null && ge.computeBoundingSphere(), vt.copy(ge.boundingSphere.center)), vt.applyMatrix4(x.matrixWorld).applyMatrix4(He)), Array.isArray(ue)) {
            const ve = ge.groups;
            for (let Se = 0, Ie = ve.length; Se < Ie; Se++) {
              const Ve = ve[Se], xe = ue[Ve.materialIndex];
              xe && xe.visible && T.push(x, ge, xe, k, vt.z, Ve, C);
            }
          } else ue.visible && T.push(x, ge, ue, k, vt.z, null, C);
        }
      }
      const de = x.children;
      for (let ge = 0, ue = de.length; ge < ue; ge++)
        $r(de[ge], C, k, O);
    }
    function Ka(x, C, k, O) {
      const { opaque: B, transmissive: de, transparent: ge } = x;
      b.setupLightsView(k), We === !0 && ye.setGlobalState(D.clippingPlanes, k), O && g.viewport(te.copy(O)), B.length > 0 && Ki(B, C, k), de.length > 0 && Ki(de, C, k), ge.length > 0 && Ki(ge, C, k), g.buffers.depth.setTest(!0), g.buffers.depth.setMask(!0), g.buffers.color.setMask(!0), g.setPolygonOffset(!1);
    }
    function $a(x, C, k, O) {
      if ((k.isScene === !0 ? k.overrideMaterial : null) !== null)
        return;
      if (b.state.transmissionRenderTarget[O.id] === void 0) {
        const xe = $e.has("EXT_color_buffer_half_float") || $e.has("EXT_color_buffer_float");
        b.state.transmissionRenderTarget[O.id] = new Gt(1, 1, {
          generateMipmaps: !0,
          type: xe ? ln : Ot,
          minFilter: Vn,
          samples: Math.max(4, E.samples),
          // to avoid feedback loops, the transmission render target requires a resolve, see #26177
          stencilBuffer: s,
          resolveDepthBuffer: !1,
          resolveStencilBuffer: !1,
          storeMultisampledDepthBuffer: !1,
          storeMultisampledStencilBuffer: !1,
          colorSpace: Oe.workingColorSpace
        });
      }
      const de = b.state.transmissionRenderTarget[O.id], ge = O.viewport || te;
      de.setSize(ge.z * D.transmissionResolutionScale, ge.w * D.transmissionResolutionScale);
      const ue = D.getRenderTarget(), ve = D.getActiveCubeFace(), Se = D.getActiveMipmapLevel();
      D.setRenderTarget(de), D.getClearColor(et), ke = D.getClearAlpha(), ke < 1 && D.setClearColor(16777215, 0.5), D.clear(), ot && De.render(k);
      const Ie = D.toneMapping;
      D.toneMapping = an;
      const Ve = O.viewport;
      if (O.viewport !== void 0 && (O.viewport = void 0), b.setupLightsView(O), We === !0 && ye.setGlobalState(D.clippingPlanes, O), Ki(x, k, O), W.updateMultisampleRenderTarget(de), W.updateRenderTargetMipmap(de), $e.has("WEBGL_multisampled_render_to_texture") === !1) {
        let xe = !1;
        for (let Ke = 0, ut = C.length; Ke < ut; Ke++) {
          const rt = C[Ke], { object: je, geometry: Et, material: pe, group: Rt } = rt;
          if (pe.side === gn && je.layers.test(O.layers)) {
            const Ge = pe.side;
            pe.side = Lt, pe.needsUpdate = !0, Za(je, k, O, Et, pe, Rt), pe.side = Ge, pe.needsUpdate = !0, xe = !0;
          }
        }
        xe === !0 && (W.updateMultisampleRenderTarget(de), W.updateRenderTargetMipmap(de));
      }
      D.setRenderTarget(ue, ve, Se), D.setClearColor(et, ke), Ve !== void 0 && (O.viewport = Ve), D.toneMapping = Ie;
    }
    function Ki(x, C, k) {
      const O = C.isScene === !0 ? C.overrideMaterial : null;
      for (let B = 0, de = x.length; B < de; B++) {
        const ge = x[B], { object: ue, geometry: ve, group: Se } = ge;
        let Ie = ge.material;
        Ie.allowOverride === !0 && O !== null && (Ie = O), ue.layers.test(k.layers) && Za(ue, C, k, ve, Ie, Se);
      }
    }
    function Za(x, C, k, O, B, de) {
      V !== null && B.isNodeMaterial && V.setObject(x, B), x.onBeforeRender(D, C, k, O, B, de), x.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse, x.matrixWorld), x.normalMatrix.getNormalMatrix(x.modelViewMatrix), B.onBeforeRender(D, C, k, O, x, de), B.transparent === !0 && B.side === gn && B.forceSinglePass === !1 ? (B.side = Lt, B.needsUpdate = !0, D.renderBufferDirect(k, C, O, B, x, de), B.side = In, B.needsUpdate = !0, D.renderBufferDirect(k, C, O, B, x, de), B.side = gn) : D.renderBufferDirect(k, C, O, B, x, de), x.onAfterRender(D, C, k, O, B, de);
    }
    function $i(x, C, k) {
      C.isScene !== !0 && (C = It);
      const O = z.get(x), B = b.state.lights, de = b.state.shadowsArray, ge = B.state.version, ue = se.getParameters(x, B.state, de, C, k, b.state.lightProbeGridArray), ve = se.getProgramCacheKey(ue);
      let Se = O.programs;
      O.environment = x.isMeshStandardMaterial || x.isMeshLambertMaterial || x.isMeshPhongMaterial ? C.environment : null, O.fog = C.fog;
      const Ie = x.isMeshStandardMaterial || x.isMeshLambertMaterial && !x.envMap || x.isMeshPhongMaterial && !x.envMap;
      O.envMap = ie.get(x.envMap || O.environment, Ie), O.envMapRotation = O.environment !== null && x.envMap === null ? C.environmentRotation : x.envMapRotation, Se === void 0 && (x.addEventListener("dispose", Qt), Se = /* @__PURE__ */ new Map(), O.programs = Se);
      let Ve = Se.get(ve);
      if (Ve !== void 0) {
        if (O.currentProgram === Ve && O.lightsStateVersion === ge)
          return Qa(x, ue), Ve;
      } else
        ue.uniforms = se.getUniforms(x), V !== null && x.isNodeMaterial && V.build(x, k, ue), x.onBeforeCompile(ue, D), Ve = se.acquireProgram(ue, ve), Se.set(ve, Ve), O.uniforms = ue.uniforms;
      const xe = O.uniforms;
      return (!x.isShaderMaterial && !x.isRawShaderMaterial || x.clipping === !0) && (xe.clippingPlanes = ye.uniform), Qa(x, ue), O.needsLights = Mc(x), O.lightsStateVersion = ge, O.needsLights && (xe.ambientLightColor.value = B.state.ambient, xe.lightProbe.value = B.state.probe, xe.sunLights.value = B.state.sun, xe.sunLightShadows.value = B.state.sunShadow, xe.directionalLights.value = B.state.directional, xe.directionalLightShadows.value = B.state.directionalShadow, xe.spotLights.value = B.state.spot, xe.spotLightShadows.value = B.state.spotShadow, xe.rectAreaLights.value = B.state.rectArea, xe.ltc_1.value = B.state.rectAreaLTC1, xe.ltc_2.value = B.state.rectAreaLTC2, xe.pointLights.value = B.state.point, xe.pointLightShadows.value = B.state.pointShadow, xe.hemisphereLights.value = B.state.hemi, xe.sunShadowMatrix.value = B.state.sunShadowMatrix, xe.sunShadowCascade.value = B.state.sunShadowCascade, xe.directionalShadowMatrix.value = B.state.directionalShadowMatrix, xe.spotLightMatrix.value = B.state.spotLightMatrix, xe.spotLightMap.value = B.state.spotLightMap, xe.pointShadowMatrix.value = B.state.pointShadowMatrix), O.lightProbeGrid = b.state.lightProbeGridArray.length > 0, O.currentProgram = Ve, O.uniformsList = null, Ve;
    }
    function Ja(x) {
      if (x.uniformsList === null) {
        const C = x.currentProgram.getUniforms();
        x.uniformsList = Lr.seqWithValue(C.seq, x.uniforms);
      }
      return x.uniformsList;
    }
    function Qa(x, C) {
      const k = z.get(x);
      k.outputColorSpace = C.outputColorSpace, k.batching = C.batching, k.batchingColor = C.batchingColor, k.instancing = C.instancing, k.instancingColor = C.instancingColor, k.instancingMorph = C.instancingMorph, k.skinning = C.skinning, k.morphTargets = C.morphTargets, k.morphNormals = C.morphNormals, k.morphColors = C.morphColors, k.morphTargetsCount = C.morphTargetsCount, k.numClippingPlanes = C.numClippingPlanes, k.numIntersection = C.numClipIntersection, k.vertexAlphas = C.vertexAlphas, k.vertexTangents = C.vertexTangents, k.toneMapping = C.toneMapping;
    }
    function _c(x, C) {
      if (x.length === 0) return null;
      if (x.length === 1)
        return x[0].texture !== null ? x[0] : null;
      S.setFromMatrixPosition(C.matrixWorld);
      for (let k = 0, O = x.length; k < O; k++) {
        const B = x[k];
        if (B.texture !== null && B.boundingBox.containsPoint(S)) return B;
      }
      return null;
    }
    function vc(x, C, k, O, B) {
      C.isScene !== !0 && (C = It), W.resetTextureUnits();
      const de = C.fog, ge = O.isMeshStandardMaterial || O.isMeshLambertMaterial || O.isMeshPhongMaterial ? C.environment : null, ue = ne === null ? D.outputColorSpace : ne.isXRRenderTarget === !0 ? ne.texture.colorSpace : Oe.workingColorSpace, ve = O.isMeshStandardMaterial || O.isMeshLambertMaterial && !O.envMap || O.isMeshPhongMaterial && !O.envMap, Se = ie.get(O.envMap || ge, ve), Ie = O.vertexColors === !0 && !!k.attributes.color && k.attributes.color.itemSize === 4, Ve = !!k.attributes.tangent && (!!O.normalMap || O.anisotropy > 0), xe = !!k.morphAttributes.position, Ke = !!k.morphAttributes.normal, ut = !!k.morphAttributes.color;
      let rt = an;
      O.toneMapped && (ne === null || ne.isXRRenderTarget === !0) && (rt = D.toneMapping);
      const je = k.morphAttributes.position || k.morphAttributes.normal || k.morphAttributes.color, Et = je !== void 0 ? je.length : 0, pe = z.get(O), Rt = b.state.lights;
      if (We === !0 && (tt === !0 || x !== j)) {
        const it = x === j && O.id === X;
        ye.setState(O, x, it);
      }
      let Ge = !1;
      O.version === pe.__version ? (pe.needsLights && pe.lightsStateVersion !== Rt.state.version || pe.outputColorSpace !== ue || B.isBatchedMesh && pe.batching === !1 || !B.isBatchedMesh && pe.batching === !0 || B.isBatchedMesh && pe.batchingColor === !0 && B._colorsTexture === null || B.isBatchedMesh && pe.batchingColor === !1 && B._colorsTexture !== null || B.isInstancedMesh && pe.instancing === !1 || !B.isInstancedMesh && pe.instancing === !0 || B.isSkinnedMesh && pe.skinning === !1 || !B.isSkinnedMesh && pe.skinning === !0 || B.isInstancedMesh && pe.instancingColor === !0 && B.instanceColor === null || B.isInstancedMesh && pe.instancingColor === !1 && B.instanceColor !== null || B.isInstancedMesh && pe.instancingMorph === !0 && B.morphTexture === null || B.isInstancedMesh && pe.instancingMorph === !1 && B.morphTexture !== null || pe.envMap !== Se || O.fog === !0 && pe.fog !== de || pe.numClippingPlanes !== void 0 && (pe.numClippingPlanes !== ye.numPlanes || pe.numIntersection !== ye.numIntersection) || pe.vertexAlphas !== Ie || pe.vertexTangents !== Ve || pe.morphTargets !== xe || pe.morphNormals !== Ke || pe.morphColors !== ut || pe.toneMapping !== rt || pe.morphTargetsCount !== Et || !!pe.lightProbeGrid != b.state.lightProbeGridArray.length > 0) && (Ge = !0) : (Ge = !0, pe.__version = O.version);
      let zt = pe.currentProgram;
      Ge === !0 && (zt = $i(O, C, B), V && O.isNodeMaterial && V.onUpdateProgram(O, zt, pe));
      let jt = !1, yn = !1, Yn = !1;
      const Je = zt.getUniforms(), ct = pe.uniforms;
      if (g.useProgram(zt.program) && (jt = !0, yn = !0, Yn = !0), O.id !== X && (X = O.id, yn = !0), pe.needsLights) {
        const it = _c(b.state.lightProbeGridArray, B);
        pe.lightProbeGrid !== it && (pe.lightProbeGrid = it, yn = !0);
      }
      if (jt || j !== x) {
        g.buffers.depth.getReversed() && x.reversedDepth !== !0 && (x._reversedDepth = !0, x.updateProjectionMatrix()), Je.setValue(L, "projectionMatrix", x.projectionMatrix), Je.setValue(L, "viewMatrix", x.matrixWorldInverse);
        const Tn = Je.map.cameraPosition;
        Tn !== void 0 && Tn.setValue(L, at.setFromMatrixPosition(x.matrixWorld)), E.logarithmicDepthBuffer && Je.setValue(
          L,
          "logDepthBufFC",
          2 / (Math.log(x.far + 1) / Math.LN2)
        ), (O.isMeshPhongMaterial || O.isMeshToonMaterial || O.isMeshLambertMaterial || O.isMeshBasicMaterial || O.isMeshStandardMaterial || O.isShaderMaterial) && Je.setValue(L, "isOrthographic", x.isOrthographicCamera === !0), j !== x && (j = x, yn = !0, Yn = !0);
      }
      if (pe.needsLights && (Rt.state.sunShadowMap.length > 0 && Je.setValue(L, "sunShadowMap", Rt.state.sunShadowMap, W), Rt.state.directionalShadowMap.length > 0 && Je.setValue(L, "directionalShadowMap", Rt.state.directionalShadowMap, W), Rt.state.spotShadowMap.length > 0 && Je.setValue(L, "spotShadowMap", Rt.state.spotShadowMap, W), Rt.state.pointShadowMap.length > 0 && Je.setValue(L, "pointShadowMap", Rt.state.pointShadowMap, W)), B.isSkinnedMesh) {
        Je.setOptional(L, B, "bindMatrix"), Je.setOptional(L, B, "bindMatrixInverse");
        const it = B.skeleton;
        it && (it.boneTexture === null && it.computeBoneTexture(), Je.setValue(L, "boneTexture", it.boneTexture, W));
      }
      B.isBatchedMesh && (Je.setOptional(L, B, "batchingTexture"), Je.setValue(L, "batchingTexture", B._matricesTexture, W), Je.setOptional(L, B, "batchingIdTexture"), Je.setValue(L, "batchingIdTexture", B._indirectTexture, W), Je.setOptional(L, B, "batchingColorTexture"), B._colorsTexture !== null && Je.setValue(L, "batchingColorTexture", B._colorsTexture, W));
      const En = k.morphAttributes;
      if ((En.position !== void 0 || En.normal !== void 0 || En.color !== void 0) && P.update(B, k, zt), (yn || pe.receiveShadow !== B.receiveShadow) && (pe.receiveShadow = B.receiveShadow, Je.setValue(L, "receiveShadow", B.receiveShadow)), (O.isMeshStandardMaterial || O.isMeshLambertMaterial || O.isMeshPhongMaterial) && O.envMap === null && C.environment !== null && (ct.envMapIntensity.value = C.environmentIntensity), ct.dfgLUT !== void 0 && (ct.dfgLUT.value = cg()), yn) {
        if (Je.setValue(L, "toneMappingExposure", D.toneMappingExposure), pe.needsLights && xc(ct, Yn), de && O.fog === !0 && be.refreshFogUniforms(ct, de), be.refreshMaterialUniforms(ct, O, Q, q, b.state.transmissionRenderTarget[x.id]), pe.needsLights && pe.lightProbeGrid) {
          const it = pe.lightProbeGrid;
          ct.probesSH.value = it.texture, ct.probesMin.value.copy(it.boundingBox.min), ct.probesMax.value.copy(it.boundingBox.max), ct.probesResolution.value.copy(it.resolution);
        }
        Lr.upload(L, Ja(pe), ct, W);
      }
      if (O.isShaderMaterial && O.uniformsNeedUpdate === !0 && (Lr.upload(L, Ja(pe), ct, W), O.uniformsNeedUpdate = !1), O.isSpriteMaterial && Je.setValue(L, "center", B.center), Je.setValue(L, "modelViewMatrix", B.modelViewMatrix), Je.setValue(L, "normalMatrix", B.normalMatrix), Je.setValue(L, "modelMatrix", B.matrixWorld), O.uniformsGroups !== void 0) {
        const it = O.uniformsGroups;
        for (let Tn = 0, Kn = it.length; Tn < Kn; Tn++) {
          const eo = it[Tn];
          ee.update(eo, zt), ee.bind(eo, zt);
        }
      }
      return zt;
    }
    function xc(x, C) {
      x.ambientLightColor.needsUpdate = C, x.lightProbe.needsUpdate = C, x.sunLights.needsUpdate = C, x.sunLightShadows.needsUpdate = C, x.directionalLights.needsUpdate = C, x.directionalLightShadows.needsUpdate = C, x.pointLights.needsUpdate = C, x.pointLightShadows.needsUpdate = C, x.spotLights.needsUpdate = C, x.spotLightShadows.needsUpdate = C, x.rectAreaLights.needsUpdate = C, x.hemisphereLights.needsUpdate = C;
    }
    function Mc(x) {
      return x.isMeshLambertMaterial || x.isMeshToonMaterial || x.isMeshPhongMaterial || x.isMeshStandardMaterial || x.isShadowMaterial || x.isShaderMaterial && x.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return $;
    }, this.getActiveMipmapLevel = function() {
      return K;
    }, this.getRenderTarget = function() {
      return ne;
    }, this.setRenderTargetTextures = function(x, C, k) {
      const O = z.get(x);
      O.__autoAllocateDepthBuffer = x.resolveDepthBuffer === !1, O.__autoAllocateDepthBuffer === !1 && (O.__useRenderToTexture = !1), z.get(x.texture).__webglTexture = C, z.get(x.depthTexture).__webglTexture = O.__autoAllocateDepthBuffer ? void 0 : k, O.__hasExternalTextures = !0;
    }, this.setRenderTargetFramebuffer = function(x, C) {
      const k = z.get(x);
      k.__webglFramebuffer = C, k.__useDefaultFramebuffer = C === void 0;
    }, this.setRenderTarget = function(x, C = 0, k = 0) {
      ne = x, $ = C, K = k;
      let O = null, B = !1, de = !1;
      if (x) {
        const ue = z.get(x);
        if (ue.__useDefaultFramebuffer !== void 0) {
          g.bindFramebuffer(L.FRAMEBUFFER, ue.__webglFramebuffer), te.copy(x.viewport), we.copy(x.scissor), Ee = x.scissorTest, g.viewport(te), g.scissor(we), g.setScissorTest(Ee), X = -1;
          return;
        } else if (ue.__webglFramebuffer === void 0)
          W.setupRenderTarget(x);
        else if (ue.__hasExternalTextures)
          W.rebindTextures(x, z.get(x.texture).__webglTexture, z.get(x.depthTexture).__webglTexture);
        else if (x.depthBuffer) {
          const Ie = x.depthTexture;
          if (ue.__boundDepthTexture !== Ie) {
            if (Ie !== null && z.has(Ie) && (x.width !== Ie.image.width || x.height !== Ie.image.height))
              throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");
            W.setupDepthRenderbuffer(x);
          }
        }
        const ve = x.texture;
        (ve.isData3DTexture || ve.isDataArrayTexture || ve.isCompressedArrayTexture) && (de = !0);
        const Se = z.get(x).__webglFramebuffer;
        x.isWebGLCubeRenderTarget ? (Array.isArray(Se[C]) ? O = Se[C][k] : O = Se[C], B = !0) : x.samples > 0 && W.useMultisampledRTT(x) === !1 ? O = z.get(x).__webglMultisampledFramebuffer : Array.isArray(Se) ? O = Se[k] : O = Se, te.copy(x.viewport), we.copy(x.scissor), Ee = x.scissorTest;
      } else
        te.copy(me).multiplyScalar(Q).floor(), we.copy(Fe).multiplyScalar(Q).floor(), Ee = mt;
      if (k !== 0 && (O = G), g.bindFramebuffer(L.FRAMEBUFFER, O) && g.drawBuffers(x, O), g.viewport(te), g.scissor(we), g.setScissorTest(Ee), B) {
        const ue = z.get(x.texture);
        L.framebufferTexture2D(L.FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_CUBE_MAP_POSITIVE_X + C, ue.__webglTexture, k);
      } else if (de) {
        const ue = C;
        for (let ve = 0; ve < x.textures.length; ve++) {
          const Se = z.get(x.textures[ve]);
          L.framebufferTextureLayer(L.FRAMEBUFFER, L.COLOR_ATTACHMENT0 + ve, Se.__webglTexture, k, ue);
        }
      } else if (x !== null && k !== 0) {
        const ue = z.get(x.texture);
        L.framebufferTexture2D(L.FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_2D, ue.__webglTexture, k);
      }
      X = -1;
    };
    function ja(x) {
      const C = z.get(x);
      return (C.__readFormat !== x.format || C.__readType !== x.type) && (C.__readFormat = x.format, C.__readType = x.type, C.__formatReadable = E.textureFormatReadable(x.format), C.__typeReadable = E.textureTypeReadable(x.type)), C;
    }
    this.readRenderTargetPixels = function(x, C, k, O, B, de, ge, ue = 0) {
      if (!(x && x.isWebGLRenderTarget)) {
        Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let ve = z.get(x).__webglFramebuffer;
      if (x.isWebGLCubeRenderTarget && ge !== void 0 && (ve = ve[ge]), ve) {
        g.bindFramebuffer(L.FRAMEBUFFER, ve);
        try {
          const Se = x.textures[ue], Ie = Se.format, Ve = Se.type;
          x.textures.length > 1 && L.readBuffer(L.COLOR_ATTACHMENT0 + ue);
          const xe = ja(Se);
          if (xe.__formatReadable === !1) {
            Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (xe.__typeReadable === !1) {
            Xe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          C >= 0 && C <= x.width - O && k >= 0 && k <= x.height - B && L.readPixels(C, k, O, B, le.convert(Ie), le.convert(Ve), de);
        } finally {
          const Se = ne !== null ? z.get(ne).__webglFramebuffer : null;
          g.bindFramebuffer(L.FRAMEBUFFER, Se);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(x, C, k, O, B, de, ge, ue = 0) {
      if (!(x && x.isWebGLRenderTarget))
        throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let ve = z.get(x).__webglFramebuffer;
      if (x.isWebGLCubeRenderTarget && ge !== void 0 && (ve = ve[ge]), ve)
        if (C >= 0 && C <= x.width - O && k >= 0 && k <= x.height - B) {
          g.bindFramebuffer(L.FRAMEBUFFER, ve);
          const Se = x.textures[ue], Ie = Se.format, Ve = Se.type;
          x.textures.length > 1 && L.readBuffer(L.COLOR_ATTACHMENT0 + ue);
          const xe = ja(Se);
          if (xe.__formatReadable === !1)
            throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
          if (xe.__typeReadable === !1)
            throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
          const Ke = L.createBuffer();
          L.bindBuffer(L.PIXEL_PACK_BUFFER, Ke), L.bufferData(L.PIXEL_PACK_BUFFER, de.byteLength, L.STREAM_READ), L.readPixels(C, k, O, B, le.convert(Ie), le.convert(Ve), 0), L.bindBuffer(L.PIXEL_PACK_BUFFER, null);
          const ut = ne !== null ? z.get(ne).__webglFramebuffer : null;
          g.bindFramebuffer(L.FRAMEBUFFER, ut);
          const rt = L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return L.flush(), await sh(L, rt, 4), L.bindBuffer(L.PIXEL_PACK_BUFFER, Ke), L.getBufferSubData(L.PIXEL_PACK_BUFFER, 0, de), L.bindBuffer(L.PIXEL_PACK_BUFFER, null), L.deleteBuffer(Ke), L.deleteSync(rt), de;
        } else
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
    }, this.copyFramebufferToTexture = function(x, C = null, k = 0) {
      const O = Math.pow(2, -k), B = Math.floor(x.image.width * O), de = Math.floor(x.image.height * O), ge = C !== null ? C.x : 0, ue = C !== null ? C.y : 0;
      W.setTexture2D(x, 0), L.copyTexSubImage2D(L.TEXTURE_2D, k, 0, 0, ge, ue, B, de), g.unbindTexture();
    }, this.copyTextureToTexture = function(x, C, k = null, O = null, B = 0, de = 0) {
      let ge, ue, ve, Se, Ie, Ve, xe, Ke, ut;
      const rt = x.isCompressedTexture ? x.mipmaps[de] : x.image;
      if (k !== null)
        ge = k.max.x - k.min.x, ue = k.max.y - k.min.y, ve = k.isBox3 ? k.max.z - k.min.z : 1, Se = k.min.x, Ie = k.min.y, Ve = k.isBox3 ? k.min.z : 0;
      else {
        const ct = Math.pow(2, -B);
        ge = Math.floor(rt.width * ct), ue = Math.floor(rt.height * ct), x.isDataArrayTexture ? ve = rt.depth : x.isData3DTexture ? ve = Math.floor(rt.depth * ct) : ve = 1, Se = 0, Ie = 0, Ve = 0;
      }
      O !== null ? (xe = O.x, Ke = O.y, ut = O.z) : (xe = 0, Ke = 0, ut = 0);
      const je = le.convert(C.format), Et = le.convert(C.type);
      let pe;
      C.isData3DTexture ? (W.setTexture3D(C, 0), pe = L.TEXTURE_3D) : C.isDataArrayTexture || C.isCompressedArrayTexture ? (W.setTexture2DArray(C, 0), pe = L.TEXTURE_2D_ARRAY) : (W.setTexture2D(C, 0), pe = L.TEXTURE_2D), g.activeTexture(L.TEXTURE0), g.pixelStorei(L.UNPACK_FLIP_Y_WEBGL, C.flipY), g.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL, C.premultiplyAlpha), g.pixelStorei(L.UNPACK_ALIGNMENT, C.unpackAlignment);
      const Rt = g.getParameter(L.UNPACK_ROW_LENGTH), Ge = g.getParameter(L.UNPACK_IMAGE_HEIGHT), zt = g.getParameter(L.UNPACK_SKIP_PIXELS), jt = g.getParameter(L.UNPACK_SKIP_ROWS), yn = g.getParameter(L.UNPACK_SKIP_IMAGES);
      g.pixelStorei(L.UNPACK_ROW_LENGTH, rt.width), g.pixelStorei(L.UNPACK_IMAGE_HEIGHT, rt.height), g.pixelStorei(L.UNPACK_SKIP_PIXELS, Se), g.pixelStorei(L.UNPACK_SKIP_ROWS, Ie), g.pixelStorei(L.UNPACK_SKIP_IMAGES, Ve);
      const Yn = x.isDataArrayTexture || x.isData3DTexture, Je = C.isDataArrayTexture || C.isData3DTexture;
      if (x.isDepthTexture) {
        const ct = z.get(x), En = z.get(C), it = z.get(ct.__renderTarget), Tn = z.get(En.__renderTarget);
        g.bindFramebuffer(L.READ_FRAMEBUFFER, it.__webglFramebuffer), g.bindFramebuffer(L.DRAW_FRAMEBUFFER, Tn.__webglFramebuffer);
        for (let Kn = 0; Kn < ve; Kn++)
          Yn && (L.framebufferTextureLayer(L.READ_FRAMEBUFFER, L.COLOR_ATTACHMENT0, z.get(x).__webglTexture, B, Ve + Kn), L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER, L.COLOR_ATTACHMENT0, z.get(C).__webglTexture, de, ut + Kn)), L.blitFramebuffer(Se, Ie, ge, ue, xe, Ke, ge, ue, L.DEPTH_BUFFER_BIT, L.NEAREST);
        g.bindFramebuffer(L.READ_FRAMEBUFFER, null), g.bindFramebuffer(L.DRAW_FRAMEBUFFER, null);
      } else if (B !== 0 || x.isRenderTargetTexture || z.has(x)) {
        const ct = z.get(x), En = z.get(C);
        g.bindFramebuffer(L.READ_FRAMEBUFFER, I), g.bindFramebuffer(L.DRAW_FRAMEBUFFER, H);
        for (let it = 0; it < ve; it++)
          Yn ? L.framebufferTextureLayer(L.READ_FRAMEBUFFER, L.COLOR_ATTACHMENT0, ct.__webglTexture, B, Ve + it) : L.framebufferTexture2D(L.READ_FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_2D, ct.__webglTexture, B), Je ? L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER, L.COLOR_ATTACHMENT0, En.__webglTexture, de, ut + it) : L.framebufferTexture2D(L.DRAW_FRAMEBUFFER, L.COLOR_ATTACHMENT0, L.TEXTURE_2D, En.__webglTexture, de), B !== 0 ? L.blitFramebuffer(Se, Ie, ge, ue, xe, Ke, ge, ue, L.COLOR_BUFFER_BIT, L.NEAREST) : Je ? L.copyTexSubImage3D(pe, de, xe, Ke, ut + it, Se, Ie, ge, ue) : L.copyTexSubImage2D(pe, de, xe, Ke, Se, Ie, ge, ue);
        g.bindFramebuffer(L.READ_FRAMEBUFFER, null), g.bindFramebuffer(L.DRAW_FRAMEBUFFER, null);
      } else
        Je ? x.isDataTexture || x.isData3DTexture ? L.texSubImage3D(pe, de, xe, Ke, ut, ge, ue, ve, je, Et, rt.data) : C.isCompressedArrayTexture ? L.compressedTexSubImage3D(pe, de, xe, Ke, ut, ge, ue, ve, je, rt.data) : L.texSubImage3D(pe, de, xe, Ke, ut, ge, ue, ve, je, Et, rt) : x.isDataTexture ? L.texSubImage2D(L.TEXTURE_2D, de, xe, Ke, ge, ue, je, Et, rt.data) : x.isCompressedTexture ? L.compressedTexSubImage2D(L.TEXTURE_2D, de, xe, Ke, rt.width, rt.height, je, rt.data) : L.texSubImage2D(L.TEXTURE_2D, de, xe, Ke, ge, ue, je, Et, rt);
      g.pixelStorei(L.UNPACK_ROW_LENGTH, Rt), g.pixelStorei(L.UNPACK_IMAGE_HEIGHT, Ge), g.pixelStorei(L.UNPACK_SKIP_PIXELS, zt), g.pixelStorei(L.UNPACK_SKIP_ROWS, jt), g.pixelStorei(L.UNPACK_SKIP_IMAGES, yn), de === 0 && C.generateMipmaps && L.generateMipmap(pe), g.unbindTexture();
    }, this.initRenderTarget = function(x) {
      z.get(x).__webglFramebuffer === void 0 && W.setupRenderTarget(x);
    }, this.initTexture = function(x) {
      x.isCubeTexture ? W.setTextureCube(x, 0) : x.isData3DTexture ? W.setTexture3D(x, 0) : x.isDataArrayTexture || x.isCompressedArrayTexture ? W.setTexture2DArray(x, 0) : W.setTexture2D(x, 0), g.unbindTexture();
    }, this.resetState = function() {
      $ = 0, K = 0, ne = null, g.reset(), fe.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  /**
   * Defines the coordinate system of the renderer.
   *
   * In `WebGLRenderer`, the value is always `WebGLCoordinateSystem`.
   *
   * @type {WebGLCoordinateSystem|WebGPUCoordinateSystem}
   * @default WebGLCoordinateSystem
   * @readonly
   */
  get coordinateSystem() {
    return sn;
  }
  /**
   * Defines the output color space of the renderer.
   *
   * @type {SRGBColorSpace|LinearSRGBColorSpace}
   * @default SRGBColorSpace
   */
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const t = this.getContext();
    t.drawingBufferColorSpace = Oe._getDrawingBufferColorSpace(e), t.unpackColorSpace = Oe._getUnpackColorSpace();
  }
}
class ug extends Si {
  constructor(e) {
    super(e);
  }
  /**
   * Starts loading from the given URL and passes the loaded MTL asset
   * to the `onLoad()` callback.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(MaterialCreator)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  load(e, t, n, r) {
    const s = this, a = this.path === "" ? ou.extractUrlBase(e) : this.path, o = new ql(this.manager);
    o.setPath(this.path), o.setRequestHeader(this.requestHeader), o.setWithCredentials(this.withCredentials), o.load(e, function(c) {
      try {
        t(s.parse(c, a));
      } catch (l) {
        r ? r(l) : console.error(l), s.manager.itemError(e);
      }
    }, n, r);
  }
  /**
   * Sets the material options.
   *
   * @param {MTLLoader~MaterialOptions} value - The material options.
   * @return {MTLLoader} A reference to this loader.
   */
  setMaterialOptions(e) {
    return this.materialOptions = e, this;
  }
  /**
   * Parses the given MTL data and returns the resulting material creator.
   *
   * @param {string} text - The raw MTL data as a string.
   * @param {string} path - The URL base path.
   * @return {MaterialCreator} The material creator.
   */
  parse(e, t) {
    const n = e.split(`
`);
    let r = {};
    const s = /\s+/, a = {};
    for (let c = 0; c < n.length; c++) {
      let l = n[c];
      if (l = l.trim(), l.length === 0 || l.charAt(0) === "#")
        continue;
      const h = l.indexOf(" ");
      let d = h >= 0 ? l.substring(0, h) : l;
      d = d.toLowerCase();
      let u = h >= 0 ? l.substring(h + 1) : "";
      if (u = u.trim(), d === "newmtl")
        r = { name: u }, a[u] = r;
      else if (d === "ka" || d === "kd" || d === "ks" || d === "ke") {
        const p = u.split(s, 3);
        r[d] = [parseFloat(p[0]), parseFloat(p[1]), parseFloat(p[2])];
      } else
        r[d] = u;
    }
    const o = new dg(this.resourcePath || t, this.materialOptions);
    return o.setCrossOrigin(this.crossOrigin), o.setManager(this.manager), o.setMaterials(a), o;
  }
}
class dg {
  constructor(e = "", t = {}) {
    this.baseUrl = e, this.options = t, this.materialsInfo = {}, this.materials = {}, this.materialsArray = [], this.nameLookup = {}, this.crossOrigin = "anonymous", this.side = this.options.side !== void 0 ? this.options.side : In, this.wrap = this.options.wrap !== void 0 ? this.options.wrap : Ir;
  }
  setCrossOrigin(e) {
    return this.crossOrigin = e, this;
  }
  setManager(e) {
    this.manager = e;
  }
  setMaterials(e) {
    this.materialsInfo = this.convert(e), this.materials = {}, this.materialsArray = [], this.nameLookup = {};
  }
  convert(e) {
    if (!this.options) return e;
    const t = {};
    for (const n in e) {
      const r = e[n], s = {};
      t[n] = s;
      for (const a in r) {
        let o = !0, c = r[a];
        const l = a.toLowerCase();
        switch (l) {
          case "kd":
          case "ka":
          case "ks":
            this.options && this.options.normalizeRGB && (c = [c[0] / 255, c[1] / 255, c[2] / 255]), this.options && this.options.ignoreZeroRGBs && c[0] === 0 && c[1] === 0 && c[2] === 0 && (o = !1);
            break;
        }
        o && (s[l] = c);
      }
    }
    return t;
  }
  preload() {
    for (const e in this.materialsInfo)
      this.create(e);
  }
  getIndex(e) {
    return this.nameLookup[e];
  }
  getAsArray() {
    let e = 0;
    for (const t in this.materialsInfo)
      this.materialsArray[e] = this.create(t), this.nameLookup[t] = e, e++;
    return this.materialsArray;
  }
  create(e) {
    return this.materials[e] === void 0 && this.createMaterial_(e), this.materials[e];
  }
  createMaterial_(e) {
    const t = this, n = this.materialsInfo[e], r = {
      name: e,
      side: this.side
    };
    function s(o, c) {
      return typeof c != "string" || c === "" ? "" : /^https?:\/\//i.test(c) ? c : o + c;
    }
    function a(o, c) {
      if (r[o]) return;
      const l = t.getTextureParams(c, r), h = t.loadTexture(s(t.baseUrl, l.url));
      h.repeat.copy(l.scale), h.offset.copy(l.offset), h.wrapS = t.wrap, h.wrapT = t.wrap, (o === "map" || o === "emissiveMap") && (h.colorSpace = Mt), r[o] = h;
    }
    for (const o in n) {
      const c = n[o];
      let l;
      if (c !== "")
        switch (o.toLowerCase()) {
          // Ns is material specular exponent
          case "kd":
            r.color = Oe.colorSpaceToWorking(new Le().fromArray(c), Mt);
            break;
          case "ks":
            r.specular = Oe.colorSpaceToWorking(new Le().fromArray(c), Mt);
            break;
          case "ke":
            r.emissive = Oe.colorSpaceToWorking(new Le().fromArray(c), Mt);
            break;
          case "map_kd":
            a("map", c);
            break;
          case "map_ks":
            a("specularMap", c);
            break;
          case "map_ke":
            a("emissiveMap", c);
            break;
          case "norm":
            a("normalMap", c);
            break;
          case "map_bump":
          case "bump":
            a("bumpMap", c);
            break;
          case "disp":
            a("displacementMap", c);
            break;
          case "map_d":
            a("alphaMap", c), r.transparent = !0;
            break;
          case "ns":
            r.shininess = parseFloat(c);
            break;
          case "d":
            l = parseFloat(c), l < 1 && (r.opacity = l, r.transparent = !0);
            break;
          case "tr":
            l = parseFloat(c), this.options && this.options.invertTrProperty && (l = 1 - l), l > 0 && (r.opacity = 1 - l, r.transparent = !0);
            break;
        }
    }
    return this.materials[e] = new Fa(r), this.materials[e];
  }
  getTextureParams(e, t) {
    const n = {
      scale: new Ne(1, 1),
      offset: new Ne(0, 0)
    }, r = e.split(/\s+/);
    let s;
    return s = r.indexOf("-bm"), s >= 0 && (t.bumpScale = parseFloat(r[s + 1]), r.splice(s, 2)), s = r.indexOf("-mm"), s >= 0 && (t.displacementBias = parseFloat(r[s + 1]), t.displacementScale = parseFloat(r[s + 2]), r.splice(s, 3)), s = r.indexOf("-s"), s >= 0 && (n.scale.set(parseFloat(r[s + 1]), parseFloat(r[s + 2])), r.splice(s, 4)), s = r.indexOf("-o"), s >= 0 && (n.offset.set(parseFloat(r[s + 1]), parseFloat(r[s + 2])), r.splice(s, 4)), n.url = r.join(" ").trim(), n;
  }
  loadTexture(e, t, n, r, s) {
    const a = this.manager !== void 0 ? this.manager : Xl;
    let o = a.getHandler(e);
    o === null && (o = new nu(a)), o.setCrossOrigin && o.setCrossOrigin(this.crossOrigin);
    const c = o.load(e, n, r, s);
    return t !== void 0 && (c.mapping = t), c;
  }
}
const fg = /^[og]\s*(.+)?/, pg = /^mtllib /, mg = /^usemtl /, gg = /^usemap /, ll = /\s+/, cl = new U(), Cs = new U(), hl = new U(), ul = new U(), Ht = new U(), yr = new Le();
function _g() {
  const i = {
    objects: [],
    object: {},
    vertices: [],
    normals: [],
    colors: [],
    uvs: [],
    materials: {},
    materialLibraries: [],
    startObject: function(e, t) {
      if (this.object && this.object.fromDeclaration === !1) {
        this.object.name = e, this.object.fromDeclaration = t !== !1;
        return;
      }
      const n = this.object && typeof this.object.currentMaterial == "function" ? this.object.currentMaterial() : void 0;
      if (this.object && typeof this.object._finalize == "function" && this.object._finalize(!0), this.object = {
        name: e || "",
        fromDeclaration: t !== !1,
        geometry: {
          vertices: [],
          normals: [],
          colors: [],
          uvs: [],
          hasUVIndices: !1
        },
        materials: [],
        smooth: !0,
        startMaterial: function(r, s) {
          const a = this._finalize(!1);
          a && (a.inherited || a.groupCount <= 0) && this.materials.splice(a.index, 1);
          const o = {
            index: this.materials.length,
            name: r || "",
            mtllib: Array.isArray(s) && s.length > 0 ? s[s.length - 1] : "",
            smooth: a !== void 0 ? a.smooth : this.smooth,
            groupStart: a !== void 0 ? a.groupEnd : 0,
            groupEnd: -1,
            groupCount: -1,
            inherited: !1,
            clone: function(c) {
              const l = {
                index: typeof c == "number" ? c : this.index,
                name: this.name,
                mtllib: this.mtllib,
                smooth: this.smooth,
                groupStart: 0,
                groupEnd: -1,
                groupCount: -1,
                inherited: !1
              };
              return l.clone = this.clone.bind(l), l;
            }
          };
          return this.materials.push(o), o;
        },
        currentMaterial: function() {
          if (this.materials.length > 0)
            return this.materials[this.materials.length - 1];
        },
        _finalize: function(r) {
          const s = this.currentMaterial();
          if (s && s.groupEnd === -1 && (s.groupEnd = this.geometry.vertices.length / 3, s.groupCount = s.groupEnd - s.groupStart, s.inherited = !1), r && this.materials.length > 1)
            for (let a = this.materials.length - 1; a >= 0; a--)
              this.materials[a].groupCount <= 0 && this.materials.splice(a, 1);
          return r && this.materials.length === 0 && this.materials.push({
            name: "",
            smooth: this.smooth
          }), s;
        }
      }, n && n.name && typeof n.clone == "function") {
        const r = n.clone(0);
        r.inherited = !0, this.object.materials.push(r);
      }
      this.objects.push(this.object);
    },
    finalize: function() {
      this.object && typeof this.object._finalize == "function" && this.object._finalize(!0);
    },
    parseVertexIndex: function(e, t) {
      const n = parseInt(e, 10);
      return (n >= 0 ? n - 1 : n + t / 3) * 3;
    },
    parseNormalIndex: function(e, t) {
      const n = parseInt(e, 10);
      return (n >= 0 ? n - 1 : n + t / 3) * 3;
    },
    parseUVIndex: function(e, t) {
      const n = parseInt(e, 10);
      return (n >= 0 ? n - 1 : n + t / 2) * 2;
    },
    addVertex: function(e, t, n) {
      const r = this.vertices, s = this.object.geometry.vertices;
      s.push(r[e + 0], r[e + 1], r[e + 2]), s.push(r[t + 0], r[t + 1], r[t + 2]), s.push(r[n + 0], r[n + 1], r[n + 2]);
    },
    addVertexPoint: function(e) {
      const t = this.vertices;
      this.object.geometry.vertices.push(t[e + 0], t[e + 1], t[e + 2]);
    },
    addVertexLine: function(e) {
      const t = this.vertices;
      this.object.geometry.vertices.push(t[e + 0], t[e + 1], t[e + 2]);
    },
    addNormal: function(e, t, n) {
      const r = this.normals, s = this.object.geometry.normals;
      s.push(r[e + 0], r[e + 1], r[e + 2]), s.push(r[t + 0], r[t + 1], r[t + 2]), s.push(r[n + 0], r[n + 1], r[n + 2]);
    },
    addFaceNormal: function(e, t, n) {
      const r = this.vertices, s = this.object.geometry.normals;
      cl.fromArray(r, e), Cs.fromArray(r, t), hl.fromArray(r, n), Ht.subVectors(hl, Cs), ul.subVectors(cl, Cs), Ht.cross(ul), Ht.normalize(), s.push(Ht.x, Ht.y, Ht.z), s.push(Ht.x, Ht.y, Ht.z), s.push(Ht.x, Ht.y, Ht.z);
    },
    addColor: function(e, t, n) {
      const r = this.colors, s = this.object.geometry.colors;
      r[e] !== void 0 && s.push(r[e + 0], r[e + 1], r[e + 2]), r[t] !== void 0 && s.push(r[t + 0], r[t + 1], r[t + 2]), r[n] !== void 0 && s.push(r[n + 0], r[n + 1], r[n + 2]);
    },
    addUV: function(e, t, n) {
      const r = this.uvs, s = this.object.geometry.uvs;
      s.push(r[e + 0], r[e + 1]), s.push(r[t + 0], r[t + 1]), s.push(r[n + 0], r[n + 1]);
    },
    addDefaultUV: function() {
      const e = this.object.geometry.uvs;
      e.push(0, 0), e.push(0, 0), e.push(0, 0);
    },
    addUVLine: function(e) {
      const t = this.uvs;
      this.object.geometry.uvs.push(t[e + 0], t[e + 1]);
    },
    addFace: function(e, t, n, r, s, a, o, c, l) {
      const h = this.vertices.length;
      let d = this.parseVertexIndex(e, h), u = this.parseVertexIndex(t, h), p = this.parseVertexIndex(n, h);
      if (this.addVertex(d, u, p), this.addColor(d, u, p), o !== void 0 && o !== "") {
        const _ = this.normals.length;
        d = this.parseNormalIndex(o, _), u = this.parseNormalIndex(c, _), p = this.parseNormalIndex(l, _), this.addNormal(d, u, p);
      } else
        this.addFaceNormal(d, u, p);
      if (r !== void 0 && r !== "") {
        const _ = this.uvs.length;
        d = this.parseUVIndex(r, _), u = this.parseUVIndex(s, _), p = this.parseUVIndex(a, _), this.addUV(d, u, p), this.object.geometry.hasUVIndices = !0;
      } else
        this.addDefaultUV();
    },
    addPointGeometry: function(e) {
      this.object.geometry.type = "Points";
      const t = this.vertices.length;
      for (let n = 0, r = e.length; n < r; n++) {
        const s = this.parseVertexIndex(e[n], t);
        this.addVertexPoint(s), this.addColor(s);
      }
    },
    addLineGeometry: function(e, t) {
      this.object.geometry.type = "Line";
      const n = this.vertices.length, r = this.uvs.length;
      for (let s = 0, a = e.length; s < a; s++)
        this.addVertexLine(this.parseVertexIndex(e[s], n));
      for (let s = 0, a = t.length; s < a; s++)
        this.addUVLine(this.parseUVIndex(t[s], r));
    }
  };
  return i.startObject("", !1), i;
}
class vg extends Si {
  /**
   * Constructs a new OBJ loader.
   *
   * @param {LoadingManager} [manager] - The loading manager.
   */
  constructor(e) {
    super(e), this.materials = null;
  }
  /**
   * Starts loading from the given URL and passes the loaded OBJ asset
   * to the `onLoad()` callback.
   *
   * @param {string} url - The path/URL of the file to be loaded. This can also be a data URI.
   * @param {function(Group)} onLoad - Executed when the loading process has been finished.
   * @param {onProgressCallback} onProgress - Executed while the loading is in progress.
   * @param {onErrorCallback} onError - Executed when errors occur.
   */
  load(e, t, n, r) {
    const s = this, a = new ql(this.manager);
    a.setPath(this.path), a.setRequestHeader(this.requestHeader), a.setWithCredentials(this.withCredentials), a.load(e, function(o) {
      try {
        t(s.parse(o));
      } catch (c) {
        r ? r(c) : console.error(c), s.manager.itemError(e);
      }
    }, n, r);
  }
  /**
   * Sets the material creator for this OBJ. This object is loaded via {@link MTLLoader}.
   *
   * @param {MaterialCreator} materials - An object that creates the materials for this OBJ.
   * @return {OBJLoader} A reference to this loader.
   */
  setMaterials(e) {
    return this.materials = e, this;
  }
  /**
   * Parses the given OBJ data and returns the resulting group.
   *
   * @param {string} text - The raw OBJ data as a string.
   * @return {Group} The parsed OBJ.
   */
  parse(e) {
    const t = new _g();
    e.indexOf(`\r
`) !== -1 && (e = e.replace(/\r\n/g, `
`)), e.indexOf(`\\
`) !== -1 && (e = e.replace(/\\\n/g, ""));
    const n = e.split(`
`);
    let r = [];
    for (let o = 0, c = n.length; o < c; o++) {
      const l = n[o].trimStart();
      if (l.length === 0) continue;
      const h = l.charAt(0);
      if (h !== "#")
        if (h === "v") {
          const d = l.split(ll);
          switch (d[0]) {
            case "v":
              t.vertices.push(
                parseFloat(d[1]),
                parseFloat(d[2]),
                parseFloat(d[3])
              ), d.length >= 7 ? (yr.setRGB(
                parseFloat(d[4]),
                parseFloat(d[5]),
                parseFloat(d[6]),
                Mt
              ), t.colors.push(yr.r, yr.g, yr.b)) : t.colors.push(void 0, void 0, void 0);
              break;
            case "vn":
              t.normals.push(
                parseFloat(d[1]),
                parseFloat(d[2]),
                parseFloat(d[3])
              );
              break;
            case "vt":
              t.uvs.push(
                parseFloat(d[1]),
                parseFloat(d[2])
              );
              break;
          }
        } else if (h === "f") {
          const u = l.slice(1).trim().split(ll), p = [];
          for (let M = 0, m = u.length; M < m; M++) {
            const f = u[M];
            if (f.length > 0) {
              const y = f.split("/");
              p.push(y);
            }
          }
          const _ = p[0];
          for (let M = 1, m = p.length - 1; M < m; M++) {
            const f = p[M], y = p[M + 1];
            t.addFace(
              _[0],
              f[0],
              y[0],
              _[1],
              f[1],
              y[1],
              _[2],
              f[2],
              y[2]
            );
          }
        } else if (h === "l") {
          const d = l.substring(1).trim().split(" ");
          let u = [];
          const p = [];
          if (l.indexOf("/") === -1)
            u = d;
          else
            for (let _ = 0, M = d.length; _ < M; _++) {
              const m = d[_].split("/");
              m[0] !== "" && u.push(m[0]), m[1] !== "" && p.push(m[1]);
            }
          t.addLineGeometry(u, p);
        } else if (h === "p") {
          const u = l.slice(1).trim().split(" ");
          t.addPointGeometry(u);
        } else if ((r = fg.exec(l)) !== null) {
          const d = (" " + r[0].slice(1).trim()).slice(1);
          t.startObject(d);
        } else if (mg.test(l))
          t.object.startMaterial(l.substring(7).trim(), t.materialLibraries);
        else if (pg.test(l))
          t.materialLibraries.push(l.substring(7).trim());
        else if (gg.test(l))
          console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');
        else if (h === "s") {
          if (r = l.split(" "), r.length > 1) {
            const u = r[1].trim().toLowerCase();
            t.object.smooth = u !== "0" && u !== "off";
          } else
            t.object.smooth = !0;
          const d = t.object.currentMaterial();
          d && (d.smooth = t.object.smooth);
        } else {
          if (l === "\0") continue;
          console.warn('THREE.OBJLoader: Unexpected line: "' + l + '"');
        }
    }
    t.finalize();
    const s = new Di();
    if (s.materialLibraries = [].concat(t.materialLibraries), !(t.objects.length === 1 && t.objects[0].geometry.vertices.length === 0) === !0)
      for (let o = 0, c = t.objects.length; o < c; o++) {
        const l = t.objects[o], h = l.geometry, d = l.materials, u = h.type === "Line", p = h.type === "Points";
        let _ = !1;
        if (h.vertices.length === 0) continue;
        const M = new Dt();
        M.setAttribute("position", new ft(h.vertices, 3)), h.normals.length > 0 && M.setAttribute("normal", new ft(h.normals, 3)), h.colors.length > 0 && (_ = !0, M.setAttribute("color", new ft(h.colors, 3))), h.hasUVIndices === !0 && M.setAttribute("uv", new ft(h.uvs, 2));
        const m = [];
        for (let y = 0, R = d.length; y < R; y++) {
          const S = d[y], T = S.name + "_" + S.smooth + "_" + _;
          let b = t.materials[T];
          if (this.materials !== null) {
            if (b = this.materials.create(S.name), u && b && !(b instanceof Pr)) {
              const A = new Pr();
              cn.prototype.copy.call(A, b), A.color.copy(b.color), b = A;
            } else if (p && b && !(b instanceof Ii)) {
              const A = new Ii({ size: 10, sizeAttenuation: !1 });
              cn.prototype.copy.call(A, b), A.color.copy(b.color), A.map = b.map, b = A;
            }
          }
          b === void 0 && (u ? b = new Pr() : p ? b = new Ii({ size: 1, sizeAttenuation: !1 }) : b = new Fa(), b.name = S.name, b.flatShading = !S.smooth, b.vertexColors = _, t.materials[T] = b), m.push(b);
        }
        let f;
        if (m.length > 1) {
          for (let y = 0, R = d.length; y < R; y++) {
            const S = d[y];
            M.addGroup(S.groupStart, S.groupCount, y);
          }
          u ? f = new Co(M, m) : p ? f = new Ss(M, m) : f = new Bt(M, m);
        } else
          u ? f = new Co(M, m[0]) : p ? f = new Ss(M, m[0]) : f = new Bt(M, m[0]);
        f.name = l.name, s.add(f);
      }
    else if (t.vertices.length > 0) {
      const o = new Ii({ size: 1, sizeAttenuation: !1 }), c = new Dt();
      c.setAttribute("position", new ft(t.vertices, 3)), t.colors.length > 0 && t.colors[0] !== void 0 && (c.setAttribute("color", new ft(t.colors, 3)), o.vertexColors = !0);
      const l = new Ss(c, o);
      s.add(l);
    }
    return s;
  }
}
class Yr {
  constructor(e, t, n = {}) {
    this.target = e, this.options = n, this.listeners.add(t), n.observeOnly || (this.previousTouchAction = e.style.touchAction, e.style.touchAction = "none"), e.addEventListener("pointerdown", this.onPointerDown), e.addEventListener("pointermove", this.onPointerMove), e.addEventListener("pointerup", this.onPointerUp), e.addEventListener("pointercancel", this.onPointerCancel), e.addEventListener("lostpointercapture", this.onLostPointerCapture), n.observeOnly || (e.addEventListener("wheel", this.onWheel, { passive: !1 }), e.addEventListener("contextmenu", this.onContextMenu));
  }
  target;
  options;
  listeners = /* @__PURE__ */ new Set();
  pointers = /* @__PURE__ */ new Map();
  primaryId;
  primaryStart;
  primaryLast;
  primaryKind = "rotate";
  primaryStarted = !1;
  gestureStarted = !1;
  multiPointer = !1;
  pinchStartDistance = 0;
  pinchStartCenter;
  pinchLastDistance = 0;
  pinchLastCenter;
  pinchStarted = !1;
  pinchFrameId;
  lastTap = Number.NEGATIVE_INFINITY;
  lastTapPosition;
  previousTouchAction;
  wheelTimer;
  get viewportHeight() {
    return this.target.getBoundingClientRect().height;
  }
  subscribe(e) {
    return this.listeners.add(e), () => {
      this.listeners.delete(e);
    };
  }
  onGesture(e) {
    for (const t of this.listeners) t(e);
  }
  dispose() {
    this.previousTouchAction !== void 0 && (this.target.style.touchAction = this.previousTouchAction, this.previousTouchAction = void 0), this.target.removeEventListener("pointerdown", this.onPointerDown), this.target.removeEventListener("pointermove", this.onPointerMove), this.target.removeEventListener("pointerup", this.onPointerUp), this.target.removeEventListener("pointercancel", this.onPointerCancel), this.target.removeEventListener("lostpointercapture", this.onLostPointerCapture), this.target.removeEventListener("wheel", this.onWheel), this.target.removeEventListener("contextmenu", this.onContextMenu), this.wheelTimer !== void 0 && clearTimeout(this.wheelTimer), this.wheelTimer = void 0, this.cancelPinchFrame(), this.pointers.clear(), this.resetPointerState(), this.listeners.clear();
  }
  onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0 && e.button !== 2) return;
    const t = this.position(e);
    if (this.pointers.set(e.pointerId, {
      ...t,
      pointerType: e.pointerType,
      button: e.button
    }), !this.options.observeOnly && typeof this.target.setPointerCapture == "function" && this.target.setPointerCapture(e.pointerId), this.pointers.size === 1) {
      this.primaryId = e.pointerId, this.primaryStart = t, this.primaryLast = t, this.primaryKind = e.button === 2 ? "pan" : "rotate", this.primaryStarted = !1, this.gestureStarted = !1, this.multiPointer = !1;
      return;
    }
    this.multiPointer = !0, this.pointers.size === 2 && (this.syncPinchAnchor(), this.pinchStarted = !1);
  };
  onPointerMove = (e) => {
    if (!this.pointers.has(e.pointerId)) return;
    const t = this.position(e), n = this.pointers.get(e.pointerId);
    if (this.pointers.set(e.pointerId, { ...n, ...t }), this.pointers.size >= 2) {
      this.schedulePinchFrame();
      return;
    }
    if (e.pointerId !== this.primaryId || !this.primaryStart || !this.primaryLast) return;
    const r = t.x - this.primaryStart.x, s = t.y - this.primaryStart.y;
    if (!this.primaryStarted && Math.hypot(r, s) < Qe.dragThresholdPx) {
      this.primaryLast = t;
      return;
    }
    this.primaryStarted ? this.onGesture({
      kind: this.primaryKind,
      dx: t.x - this.primaryLast.x,
      dy: t.y - this.primaryLast.y
    }) : (this.primaryStarted = !0, this.emitStartOnce(), this.onGesture({ kind: this.primaryKind, dx: r, dy: s })), this.primaryLast = t;
  };
  onPointerUp = (e) => {
    this.finishPointer(e, !1);
  };
  onPointerCancel = (e) => {
    this.finishPointer(e, !0);
  };
  onLostPointerCapture = (e) => {
    this.finishPointer(e, !0);
  };
  finishPointer(e, t) {
    const n = this.pointers.get(e.pointerId);
    if (n)
      if (this.flushPinchFrame(), this.pointers.delete(e.pointerId), this.pointers.size === 0)
        !t && !this.multiPointer && !this.primaryStarted && n.button !== 2 && this.handleTap(n), this.resetPointerState();
      else if (this.pointers.size === 1) {
        const [r, s] = [...this.pointers.entries()][0];
        this.primaryId = r, this.primaryStart = s, this.primaryLast = s, this.primaryStarted = this.primaryStarted || this.pinchStarted, this.multiPointer = !0, this.pinchStarted = !1;
      } else this.pointers.size === 2 && this.syncPinchAnchor();
  }
  onWheel = (e) => {
    e.preventDefault(), this.wheelTimer === void 0 ? this.onGesture({ kind: "start" }) : clearTimeout(this.wheelTimer), this.wheelTimer = setTimeout(() => {
      this.wheelTimer = void 0;
    }, Qe.doubleTapMs);
    const t = this.target.getBoundingClientRect();
    this.onGesture({
      kind: "zoom",
      factor: Math.exp(-e.deltaY * Qe.wheelZoomStep),
      cx: e.clientX - t.left,
      cy: e.clientY - t.top
    });
  };
  onContextMenu = (e) => {
    e.preventDefault();
  };
  schedulePinchFrame() {
    this.pinchFrameId === void 0 && (this.pinchFrameId = requestAnimationFrame(() => {
      this.pinchFrameId = void 0, this.moveMultiplePointers();
    }));
  }
  flushPinchFrame() {
    this.pinchFrameId !== void 0 && (this.cancelPinchFrame(), this.moveMultiplePointers());
  }
  cancelPinchFrame() {
    this.pinchFrameId !== void 0 && (cancelAnimationFrame(this.pinchFrameId), this.pinchFrameId = void 0);
  }
  syncPinchAnchor() {
    const [e, t] = [...this.pointers.values()];
    this.pinchLastCenter = this.center(e, t), this.pinchLastDistance = this.distance(e, t), this.pinchStartCenter = this.pinchLastCenter, this.pinchStartDistance = this.pinchLastDistance;
  }
  emitStartOnce() {
    this.gestureStarted || (this.gestureStarted = !0, this.onGesture({ kind: "start" }));
  }
  moveMultiplePointers() {
    if (this.pointers.size < 2) return;
    const [e, t] = [...this.pointers.values()].slice(0, 2), n = this.center(e, t), r = this.distance(e, t), s = this.pinchStarted ? this.pinchLastCenter : this.pinchStartCenter, a = this.pinchStarted ? this.pinchLastDistance : this.pinchStartDistance, o = s ? { dx: n.x - s.x, dy: n.y - s.y } : { dx: 0, dy: 0 }, c = Math.abs(r - a);
    !this.pinchStarted && Math.hypot(o.dx, o.dy) < Qe.dragThresholdPx && c < Qe.dragThresholdPx || (this.pinchStarted || (this.pinchStarted = !0, this.emitStartOnce()), (o.dx !== 0 || o.dy !== 0) && this.onGesture({ kind: "pan", dx: o.dx, dy: o.dy }), a > 0 && Math.abs(r - a) > 1e-9 * a && this.onGesture({
      kind: "zoom",
      factor: r / a,
      cx: n.x,
      cy: n.y
    }), this.pinchLastCenter = n, this.pinchLastDistance = r);
  }
  handleTap(e) {
    const t = Date.now(), n = this.lastTapPosition;
    n !== void 0 && t - this.lastTap <= Qe.doubleTapMs && n.pointerType === e.pointerType && Math.hypot(e.x - n.x, e.y - n.y) <= Qe.doubleTapSlopPx ? (this.lastTap = Number.NEGATIVE_INFINITY, this.lastTapPosition = void 0, this.onGesture({ kind: "reset" })) : (this.lastTap = t, this.lastTapPosition = e, this.onGesture({ kind: "tap" }));
  }
  resetPointerState() {
    this.cancelPinchFrame(), this.primaryId = void 0, this.primaryStart = void 0, this.primaryLast = void 0, this.primaryStarted = !1, this.gestureStarted = !1, this.multiPointer = !1, this.pinchLastCenter = void 0, this.pinchLastDistance = 0, this.pinchStartCenter = void 0, this.pinchStartDistance = 0, this.pinchStarted = !1;
  }
  position(e) {
    const t = this.target.getBoundingClientRect();
    return { x: e.clientX - t.left, y: e.clientY - t.top, pointerType: e.pointerType, button: e.button };
  }
  center(e, t) {
    return { x: (e.x + t.x) / 2, y: (e.y + t.y) / 2, pointerType: "touch", button: 0 };
  }
  distance(e, t) {
    return Math.hypot(t.x - e.x, t.y - e.y);
  }
}
function dl(i) {
  const e = i?.split(",").map((s) => s.trim());
  if (!e || e.length !== 3 || e.some((s) => s === "")) return;
  const [t, n, r] = e.map(Number);
  if ([t, n, r].every(Number.isFinite)) return new U(t, n, r);
}
class xg {
  constructor(e, t) {
    this.camera = e, this.gestures = t, this.homePosition = e.position.clone(), this.unsubscribe = t.subscribe((n) => this.onGesture(n));
  }
  camera;
  gestures;
  focus = new U();
  homePosition;
  homeTarget = new U();
  rotation = new Ne();
  pan = new U();
  offset = new U();
  spherical = new uu();
  unsubscribe;
  get target() {
    return this.focus;
  }
  setHome(e, t) {
    this.homePosition.copy(e), this.homeTarget.copy(t), this.reset();
  }
  reset() {
    this.rotation.set(0, 0), this.pan.set(0, 0, 0), this.target.copy(this.homeTarget), this.camera.position.copy(this.homePosition), this.camera.lookAt(this.target), this.camera.updateMatrixWorld();
  }
  /** Advance pending drag movement. dt is the elapsed time in seconds. */
  update(e) {
    if (e <= 0 || this.rotation.lengthSq() + this.pan.lengthSq() === 0) return;
    const t = Qe.dampingFactor ** (e * Qe.dampingReferenceHz), n = 1 - t;
    this.offset.subVectors(this.camera.position, this.target), this.rotation.lengthSq() > 0 && this.offset.lengthSq() > 0 && (this.spherical.setFromVector3(this.offset), this.spherical.theta += this.rotation.x * n, this.spherical.phi += this.rotation.y * n, this.spherical.makeSafe(), this.offset.setFromSpherical(this.spherical)), this.target.addScaledVector(this.pan, n), this.camera.position.copy(this.target).add(this.offset), this.camera.lookAt(this.target), this.rotation.multiplyScalar(t), this.pan.multiplyScalar(t), this.rotation.lengthSq() < Number.EPSILON ** 2 && this.rotation.set(0, 0), this.pan.lengthSq() < Number.EPSILON ** 2 && this.pan.set(0, 0, 0);
  }
  dispose() {
    this.unsubscribe(), this.rotation.set(0, 0), this.pan.set(0, 0, 0);
  }
  onGesture(e) {
    if (e.kind === "reset")
      this.reset();
    else if (e.kind === "zoom")
      this.zoom(e.factor);
    else if (e.kind === "rotate" || e.kind === "pan") {
      const t = this.gestures.viewportHeight;
      if (t <= 0) return;
      if (e.kind === "rotate") {
        const n = 2 * Math.PI * Qe.rotateSpeed / t;
        this.rotation.x -= e.dx * n, this.rotation.y -= e.dy * n;
      } else
        this.queuePan(e.dx, e.dy, t);
    }
  }
  zoom(e) {
    if (!Number.isFinite(e) || e <= 0 || e === 1) return;
    this.offset.subVectors(this.camera.position, this.target);
    const t = this.offset.length();
    if (t === 0) return;
    const n = Kt.clamp(t / e, this.camera.near, this.camera.far);
    this.camera.position.copy(this.target).addScaledVector(this.offset, n / t);
  }
  queuePan(e, t, n) {
    const r = this.camera.position.distanceTo(this.target), s = Kt.degToRad(this.camera.getEffectiveFOV() / 2), a = 2 * r * Math.tan(s) * Qe.panSpeed / n, o = new U(-e, t, 0).applyQuaternion(this.camera.quaternion);
    this.pan.addScaledVector(o, a);
  }
}
function ic(i, e) {
  const t = /* @__PURE__ */ new Set(), n = new Set(e), r = /* @__PURE__ */ new Set();
  i?.traverse((a) => {
    if (a.geometry && t.add(a.geometry), Array.isArray(a.material))
      for (const o of a.material) n.add(o);
    else a.material && n.add(a.material);
  });
  const s = (a) => {
    a instanceof pt && r.add(a);
  };
  i instanceof Bl && (s(i.background), s(i.environment));
  for (const a of n) {
    for (const o of Object.values(a)) s(o);
    if (a instanceof Jt)
      for (const { value: o } of Object.values(a.uniforms))
        Array.isArray(o) ? o.forEach(s) : s(o);
    a.dispose();
  }
  for (const a of r) a.dispose();
  for (const a of t) a.dispose();
}
class Ba {
  constructor(e, t = (n) => new hg({ canvas: n, antialias: !0 })) {
    this.host = e, this.view = e.ownerDocument.defaultView ?? window;
    const n = e.ownerDocument.createElement("canvas");
    this.renderer = t(n), this.scene.background = new Le(0), n.style.display = "block", n.style.width = "100%", n.style.height = "100%", e.append(n), this.resize(), this.resizeObserver = new ResizeObserver(this.resize), this.resizeObserver.observe(e), this.frameId = this.view.requestAnimationFrame(this.drawFrame);
  }
  host;
  scene = new Bl();
  camera = new kt(75, 1, 0.1, 1e3);
  renderer;
  view;
  resizeObserver;
  frameCallbacks = /* @__PURE__ */ new Set();
  resizeCallbacks = /* @__PURE__ */ new Set();
  retainedMaterials = /* @__PURE__ */ new Set();
  frameId = 0;
  previousTime;
  width = 0;
  height = 0;
  pixelRatio = 0;
  disposed = !1;
  get size() {
    return { width: this.width, height: this.height };
  }
  /** Register a callback that runs before rendering. The elapsed time is in seconds. */
  onFrame(e) {
    this.frameCallbacks.add(e);
  }
  /** Register a callback that runs when the viewport CSS dimensions change. */
  onResize(e) {
    return this.resizeCallbacks.add(e), () => {
      this.resizeCallbacks.delete(e);
    };
  }
  retainMaterial(e) {
    this.retainedMaterials.add(e);
  }
  async capture(e) {
    if (this.disposed) throw new Error("The 3D stage was disposed");
    const t = Math.floor(e);
    if (!Number.isFinite(t) || t < 1) throw new RangeError("Invalid capture size");
    this.resize(), this.renderer.render(this.scene, this.camera);
    const n = this.renderer.domElement, r = Math.min(1, t / Math.max(n.width, n.height)), s = this.host.ownerDocument.createElement("canvas");
    s.width = Math.max(1, Math.round(n.width * r)), s.height = Math.max(1, Math.round(n.height * r));
    const a = s.getContext("2d");
    if (!a) throw new Error("Could not create a capture canvas");
    return a.drawImage(n, 0, 0, s.width, s.height), new Promise((o, c) => {
      s.toBlob((l) => {
        l ? o(l) : c(new Error("Could not capture the 3D stage"));
      });
    });
  }
  dispose() {
    if (!this.disposed) {
      this.disposed = !0, this.view.cancelAnimationFrame(this.frameId), this.resizeObserver.disconnect(), this.frameCallbacks.clear(), this.resizeCallbacks.clear();
      try {
        ic(this.scene, this.retainedMaterials);
      } finally {
        this.retainedMaterials.clear(), this.scene.clear(), this.scene.background = null, this.scene.environment = null;
        try {
          this.renderer.dispose();
        } finally {
          try {
            this.renderer.forceContextLoss();
          } finally {
            this.renderer.domElement.remove();
          }
        }
      }
    }
  }
  resize = () => {
    if (this.disposed) return;
    const { width: e, height: t } = this.host.getBoundingClientRect(), n = this.view.devicePixelRatio || 1;
    if (e <= 0 || t <= 0 || e === this.width && t === this.height && n === this.pixelRatio) return;
    const r = e !== this.width || t !== this.height;
    if (n !== this.pixelRatio && this.renderer.setPixelRatio(n), this.width = e, this.height = t, this.pixelRatio = n, this.camera.aspect = e / t, r)
      for (const s of this.resizeCallbacks) s(e, t);
    this.camera.updateProjectionMatrix(), this.renderer.setSize(e, t, !1);
  };
  drawFrame = (e) => {
    if (this.disposed) return;
    this.frameId = this.view.requestAnimationFrame(this.drawFrame), this.view.devicePixelRatio !== this.pixelRatio && this.resize();
    const t = this.previousTime === void 0 ? 0 : (e - this.previousTime) / 1e3;
    this.previousTime = e;
    for (const n of this.frameCallbacks) n(t);
    this.disposed || this.renderer.render(this.scene, this.camera);
  };
}
const _a = new U(3, 3, 3);
function Mg(i, e) {
  const t = new qn().setFromObject(e), n = t.getCenter(new U());
  if (t.isEmpty()) return { position: _a.clone(), target: n };
  const r = _a.clone().normalize(), s = new st().lookAt(r, new U(), i.up), a = new U().setFromMatrixColumn(s, 0), o = new U().setFromMatrixColumn(s, 1), c = Math.tan(Kt.degToRad(i.getEffectiveFOV() / 2)), l = c * i.aspect, { min: h, max: d } = t, u = new U();
  let p = i.near;
  for (const _ of [h.x, d.x])
    for (const M of [h.y, d.y])
      for (const m of [h.z, d.z]) {
        u.set(_, M, m).sub(n);
        const f = Math.max(
          i.near,
          Math.abs(u.dot(a)) / l,
          Math.abs(u.dot(o)) / c
        );
        p = Math.max(p, u.dot(r) + f * 1.05);
      }
  return { position: n.clone().addScaledVector(r, p), target: n };
}
async function rc(i, e) {
  const t = await fetch(i, { signal: e });
  if (!t.ok) throw new Error(`Failed to load ${i} (HTTP ${t.status})`);
  return t.text();
}
async function Sg(i, e, t) {
  try {
    const n = await rc(i, t), r = new URL(i, e), s = r.protocol === "data:" || r.protocol === "blob:" ? "" : new URL(".", r).href;
    return new ug(new Wl()).parse(n, s);
  } catch {
    t.throwIfAborted();
    return;
  }
}
function bg(i) {
  const e = [], t = /* @__PURE__ */ new Set(), n = i.loadTexture.bind(i);
  return i.loadTexture = (r, s) => {
    let a;
    const o = new Promise((l) => {
      a = l;
    });
    let c;
    try {
      c = n(r, s, () => a(!0), void 0, () => a(!1));
    } catch {
      c = new pt(), a(!1);
    }
    return e.push(o.then((l) => {
      l || t.add(c);
    })), c;
  }, { pending: e, failed: t };
}
function yg(i, e) {
  return new Promise((t) => {
    const n = () => {
      e.removeEventListener("abort", n), t();
    };
    e.addEventListener("abort", n, { once: !0 }), Promise.all(i).then(n);
  });
}
function Eg(i) {
  const e = new qn().setFromObject(i), { x: t, y: n, z: r } = e.getSize(new U()), s = Math.max(t, n, r);
  s > 0 && i.scale.multiplyScalar(3 / s), i.position.addScaledVector(e.getCenter(new U()), -i.scale.x);
}
async function sc(i, e, t) {
  if (t.throwIfAborted(), !e.url) throw new Error("No model URL provided");
  const { materialUrl: n } = e, { baseURI: r } = i.renderer.domElement, [s, a] = await Promise.all([
    rc(e.url, t),
    n ? Sg(n, r, t) : void 0
  ]);
  t.throwIfAborted();
  const o = new vg(), c = a && bg(a);
  a && o.setMaterials(a);
  const l = /* @__PURE__ */ new Set();
  let h;
  try {
    try {
      h = o.parse(s);
    } finally {
      if (a)
        for (const b of Object.values(a.materials)) l.add(b);
    }
    Eg(h);
    const d = dl(e.cameraPosition), u = dl(e.cameraTarget), p = !d && !u && e.fitToContainer ? Mg(i.camera, h) : { position: d ?? _a.clone(), target: u ?? new U() }, _ = /* @__PURE__ */ new Map();
    h.traverse((b) => {
      if (!(b instanceof Bt)) return;
      const A = b.material;
      _.set(b, A);
      for (const v of Array.isArray(A) ? A : [A]) l.add(v);
    });
    const M = new Fa({ color: 13421772 });
    l.add(M);
    const m = !!(n && !a);
    let f = !c?.pending.length, y = e.showTexture !== !1;
    const R = (b) => Object.values(b).some((A) => A instanceof pt && c?.failed.has(A)) ? M : b, S = (b) => {
      y = b;
      for (const [A, v] of _)
        !b || m || !f ? A.material = M : c?.failed.size ? A.material = Array.isArray(v) ? v.map(R) : R(v) : A.material = v;
    };
    if (S(y), t.throwIfAborted(), c && !f) {
      const b = yg(c.pending, t).then(() => {
        t.aborted || (f = !0, y && S(!0));
      });
      y && await b, t.throwIfAborted();
    }
    const T = new su(16777215, 1);
    T.position.set(1, 1, 1), i.camera.position.copy(p.position), i.camera.lookAt(p.target), i.camera.updateMatrixWorld(), i.scene.add(new au(4210752, 2), T, h);
    for (const b of l) i.retainMaterial(b);
    return {
      home: p,
      setTexture: S,
      textureLoadFailed: m || !!c?.failed.size
    };
  } catch (d) {
    throw ic(h, l), d;
  }
}
class Tg {
  stage;
  rig;
  textureButton;
  cleanup;
  loadState = "Idle";
  async mount(e, t, n) {
    this.unmount(), n.signal.throwIfAborted();
    const r = new AbortController(), { signal: s } = r;
    let a, o, c;
    const l = () => {
      this.cleanup === l && (this.cleanup = void 0, n.signal.removeEventListener("abort", l), r.abort(n.signal.reason), c?.dispose(), o?.dispose(), this.textureButton?.remove(), this.textureButton = void 0, this.rig = void 0, this.stage = void 0, this.loadState = "Idle", a?.dispose());
    };
    this.cleanup = l, n.signal.addEventListener("abort", l, { once: !0 });
    try {
      this.loadState = "Loading", a = this.stage = new Ba(e), n.requestDebugRefresh();
      const { home: h, setTexture: d } = await sc(a, t, s);
      s.throwIfAborted(), o = new Yr(e, (m) => {
        m.kind === "start" && n.reportInteraction();
      });
      const u = new xg(a.camera, o);
      c = this.rig = u, u.setHome(h.position, h.target), a.onFrame((m) => u.update(m));
      const p = e.ownerDocument.createElement("button");
      p.type = "button";
      let _ = t.showTexture !== !1;
      const M = () => {
        p.textContent = _ ? "Texture: ON" : "Texture: OFF", p.setAttribute("aria-pressed", String(_));
      };
      M(), p.addEventListener("click", () => {
        _ = !_, d(_), M(), n.reportInteraction();
      }, { signal: s }), this.textureButton = p, this.loadState = "Ready", n.requestDebugRefresh();
    } catch (h) {
      throw this.cleanup === l && (l(), this.loadState = "Error", n.requestDebugRefresh()), h;
    }
  }
  unmount() {
    this.cleanup?.();
  }
  resetView() {
    this.rig?.reset();
  }
  debugEntries() {
    const e = [];
    return this.stage && e.push(
      { label: "Camera Position", value: this.stage.camera.position.toArray().join(",") },
      { label: "Camera Target", value: this.rig?.target.toArray().join(",") ?? "0,0,0" },
      { label: "Field of View", value: String(this.stage.camera.fov) }
    ), [...e, { label: "Load State", value: this.loadState }];
  }
  mediaControls() {
    return this.textureButton ? [this.textureButton] : [];
  }
}
const Dr = { yawDeg: -90, pitchDeg: 0, fovDeg: 80 }, Er = Kt.degToRad(Qe.panoramaMaxPitchDeg);
function ac(i) {
  i.position.set(0, 0, 0), i.rotation.set(
    Kt.degToRad(Dr.pitchDeg),
    -Kt.degToRad(Dr.yawDeg),
    0,
    "YXZ"
  ), i.fov = Dr.fovDeg, i.updateProjectionMatrix(), i.updateMatrixWorld();
}
class wg {
  constructor(e, t) {
    this.camera = e, this.gestures = t, this.reset(), this.unsubscribe = t.subscribe((n) => this.onGesture(n));
  }
  camera;
  gestures;
  rotation = new Ne();
  unsubscribe;
  get yawDeg() {
    return -Kt.radToDeg(this.camera.rotation.y);
  }
  get pitchDeg() {
    return Kt.radToDeg(this.camera.rotation.x);
  }
  get fovDeg() {
    return this.camera.fov;
  }
  reset() {
    this.rotation.set(0, 0), ac(this.camera);
  }
  /** Advance pending drag rotation. dt is the elapsed time in seconds. */
  update(e) {
    if (e <= 0 || this.rotation.lengthSq() === 0) return;
    const t = Qe.dampingFactor ** (e * Qe.dampingReferenceHz), n = 1 - t, { x: r, y: s } = this.camera.rotation;
    this.camera.rotation.set(
      Kt.clamp(r + this.rotation.y * n, -Er, Er),
      s + this.rotation.x * n,
      0
    ), this.rotation.multiplyScalar(t), this.rotation.lengthSq() < Number.EPSILON ** 2 && this.rotation.set(0, 0);
  }
  dispose() {
    this.unsubscribe(), this.rotation.set(0, 0);
  }
  onGesture(e) {
    if (e.kind === "reset")
      this.reset();
    else if (e.kind === "zoom") {
      const { factor: t } = e;
      if (!Number.isFinite(t) || t <= 0 || t === 1) return;
      this.camera.fov = Kt.clamp(this.fovDeg / t, Qe.panoramaMinFovDeg, Qe.panoramaMaxFovDeg), this.camera.updateProjectionMatrix();
    } else if (e.kind === "rotate") {
      const t = this.gestures.viewportHeight;
      if (t <= 0) return;
      const n = 2 * Math.PI * Qe.rotateSpeed / t;
      this.rotation.x += e.dx * n;
      const r = this.camera.rotation.x, s = r + this.rotation.y + e.dy * n;
      this.rotation.y = Kt.clamp(s, -Er, Er) - r;
    }
  }
}
function Ag(i, e, t) {
  const n = i.createElement("img");
  return n.crossOrigin = "anonymous", new Promise((r, s) => {
    const a = () => {
      t.removeEventListener("abort", o), n.onload = null, n.onerror = null;
    }, o = () => {
      a(), n.removeAttribute("src"), s(t.reason);
    };
    n.onload = () => {
      a(), r(n);
    }, n.onerror = () => {
      a(), s(new Error(`Failed to load panorama: ${e}`));
    }, t.addEventListener("abort", o, { once: !0 }), n.setAttribute("src", e);
  });
}
async function oc(i, e, t) {
  if (t.throwIfAborted(), !e.url) throw new Error("No panorama URL provided");
  const n = await Ag(i.renderer.domElement.ownerDocument, e.url, t);
  t.throwIfAborted();
  const r = new pt(n);
  r.colorSpace = Mt, r.needsUpdate = !0;
  const s = new Bt(
    new Na(500, 64, 32),
    new Ia({ map: r, side: Lt, toneMapped: !1 })
  );
  s.scale.x = -1, ac(i.camera), i.scene.add(s);
}
class Rg {
  rig;
  cleanup;
  loadState = "Idle";
  async mount(e, t, n) {
    this.unmount(), n.signal.throwIfAborted();
    const r = new AbortController(), { signal: s } = r;
    let a, o, c;
    const l = () => {
      this.cleanup === l && (this.cleanup = void 0, n.signal.removeEventListener("abort", l), r.abort(n.signal.reason), c?.dispose(), o?.dispose(), this.rig = void 0, this.loadState = "Idle", a?.dispose());
    };
    this.cleanup = l, n.signal.addEventListener("abort", l, { once: !0 });
    try {
      this.loadState = "Loading", a = new Ba(e), n.requestDebugRefresh(), await oc(a, t, s), s.throwIfAborted(), o = new Yr(e, (d) => {
        d.kind === "start" && n.reportInteraction();
      });
      const h = new wg(a.camera, o);
      c = this.rig = h, a.onFrame((d) => h.update(d)), this.loadState = "Ready", n.requestDebugRefresh();
    } catch (h) {
      throw this.cleanup === l && (l(), this.loadState = "Error", n.requestDebugRefresh()), h;
    }
  }
  unmount() {
    this.cleanup?.();
  }
  resetView() {
    this.rig?.reset();
  }
  debugEntries() {
    const e = [];
    if (this.rig || this.loadState === "Loading") {
      const { yawDeg: t, pitchDeg: n, fovDeg: r } = this.rig ?? Dr;
      e.push(
        { label: "Camera Orientation", value: [t, n].join(",") },
        { label: "Field of View", value: String(r) }
      );
    }
    return [...e, { label: "Load State", value: this.loadState }];
  }
}
const Cg = /* @__PURE__ */ new Set(["youtube.com", "www.youtube.com", "m.youtube.com"]), Pg = /* @__PURE__ */ new Set(["youtube-nocookie.com", "www.youtube-nocookie.com"]), Lg = "youtu.be", Dg = /^[A-Za-z0-9_-]+$/;
function lc(i) {
  const e = i.hostname, t = i.pathname.split("/").filter((s) => s !== "");
  let n = null, r = !1;
  return e === Lg ? n = t[0] ?? null : Cg.has(e) ? i.pathname === "/watch" ? n = i.searchParams.get("v") : ["embed", "shorts", "live"].includes(t[0]) && (n = t[1] ?? null) : Pg.has(e) && t[0] === "embed" && (n = t[1] ?? null, r = !0), n === null || !Dg.test(n) ? null : { id: n, nocookie: r };
}
function Ig(i) {
  let e;
  try {
    e = new URL(i);
  } catch {
    return null;
  }
  if (e.protocol === "http:" || e.protocol === "https:") {
    const t = lc(e);
    if (t)
      return t.nocookie ? `https://www.youtube-nocookie.com/embed/${t.id}` : `https://www.youtube.com/embed/${t.id}`;
  }
  return e.protocol === "https:" ? e.href : null;
}
const Ug = 3, pi = 256, Ng = 720;
function Fg(i) {
  const e = Math.floor(i ?? pi);
  if (!Number.isFinite(e) || e < 1) throw new RangeError("Invalid thumbnail size");
  return e;
}
function za(i, e, t) {
  if (i <= 0 || e <= 0) throw new Error("The media has no drawable dimensions");
  const n = Math.min(1, t / Math.max(i, e));
  return {
    width: Math.max(1, Math.round(i * n)),
    height: Math.max(1, Math.round(e * n))
  };
}
async function cc(i) {
  return i.convertToBlob({ type: "image/webp", quality: 0.85 });
}
function hc(i, e) {
  if (typeof OffscreenCanvas > "u") throw new Error("OffscreenCanvas is unavailable");
  return new OffscreenCanvas(i, e);
}
async function Og(i, e, t) {
  if (typeof createImageBitmap != "function" || typeof OffscreenCanvas > "u")
    throw new Error("Image thumbnail APIs are unavailable");
  const n = await fetch(i.url, { signal: t });
  if (!n.ok) throw new Error(`Failed to load image (HTTP ${n.status})`);
  const r = await createImageBitmap(await n.blob());
  try {
    t.throwIfAborted();
    const { width: s, height: a } = za(r.width, r.height, e), o = hc(s, a), c = o.getContext("2d");
    if (!c) throw new Error("Could not create a thumbnail canvas");
    return c.drawImage(r, 0, 0, s, a), cc(o);
  } finally {
    r.close();
  }
}
function fl(i, e, t) {
  return new Promise((n, r) => {
    const s = () => {
      i.removeEventListener(e, a), i.removeEventListener("error", o), t.removeEventListener("abort", c);
    }, a = () => {
      s(), n();
    }, o = () => {
      s(), r(new Error("Failed to load video"));
    }, c = () => {
      s(), r(t.reason);
    };
    i.addEventListener(e, a, { once: !0 }), i.addEventListener("error", o, { once: !0 }), t.addEventListener("abort", c, { once: !0 });
  });
}
async function Bg(i, e, t) {
  const n = document.createElement("video");
  n.crossOrigin = "anonymous", n.preload = "auto", n.muted = !0;
  try {
    const r = fl(n, "loadeddata", t);
    n.setAttribute("src", i.url), n.load(), await r, t.throwIfAborted();
    const s = Number.isFinite(n.duration) ? Math.max(0, n.duration - 1e-3) : 0.5, a = Math.min(0.5, s);
    if (a > 0) {
      const d = fl(n, "seeked", t);
      n.currentTime = a, await d, t.throwIfAborted();
    }
    const { width: o, height: c } = za(n.videoWidth, n.videoHeight, e), l = hc(o, c), h = l.getContext("2d");
    if (!h) throw new Error("Could not create a thumbnail canvas");
    return h.drawImage(n, 0, 0, o, c), cc(l);
  } finally {
    n.pause(), n.removeAttribute("src"), n.load();
  }
}
function uc(i) {
  try {
    const e = lc(new URL(i));
    return e ? `https://i.ytimg.com/vi/${e.id}/hqdefault.jpg` : null;
  } catch {
    return null;
  }
}
async function zg(i, e) {
  const t = uc(i.url);
  if (!t) throw new Error("No YouTube video ID provided");
  const n = await fetch(t, { signal: e });
  if (!n.ok) throw new Error(`Failed to load YouTube thumbnail (HTTP ${n.status})`);
  return n.blob();
}
function Vg(i, e) {
  const t = document.createElement("img");
  return t.crossOrigin = "anonymous", new Promise((n, r) => {
    const s = () => {
      t.onload = null, t.onerror = null, e.removeEventListener("abort", a);
    }, a = () => {
      s(), t.removeAttribute("src"), r(e.reason);
    };
    t.onload = () => {
      const o = t.naturalWidth / t.naturalHeight;
      s(), Number.isFinite(o) && o > 0 ? n(o) : r(new Error("Invalid panorama dimensions"));
    }, t.onerror = () => {
      s(), r(new Error("Failed to load panorama"));
    }, e.addEventListener("abort", a, { once: !0 }), t.setAttribute("src", i);
  });
}
async function Hg(i, e, t) {
  const n = i.type === "panorama" ? await Vg(i.url, t) : 1;
  t.throwIfAborted();
  const { width: r, height: s } = za(e * n, e, e), a = document.createElement("div");
  a.style.position = "fixed", a.style.left = "-100000px", a.style.top = "0", a.style.width = `${r}px`, a.style.height = `${s}px`, a.style.visibility = "hidden", a.style.pointerEvents = "none", a.setAttribute("aria-hidden", "true"), document.body.append(a);
  let o;
  const c = () => {
    try {
      o?.dispose();
    } finally {
      o = void 0, a.remove();
    }
  };
  t.addEventListener("abort", c, { once: !0 });
  try {
    const l = new Ba(a);
    if (o = l, i.type === "panorama")
      await oc(l, i, t);
    else if (i.type === "3dmodel") {
      const d = await sc(l, i, t);
      if (i.showTexture !== !1 && d.textureLoadFailed)
        throw new Error("Failed to load a required model texture");
    } else {
      const { prepareGaussianScene: d } = await import("./gaussian-renderer-Djlgc7HR.js");
      t.throwIfAborted(), await d(l, i, t, Ng);
    }
    t.throwIfAborted();
    const h = await l.capture(e);
    return t.throwIfAborted(), h;
  } finally {
    t.removeEventListener("abort", c), c();
  }
}
async function kg(i, e = {}) {
  const t = Fg(e.maxSize), n = e.signal ?? new AbortController().signal;
  switch (n.throwIfAborted(), i.type) {
    case "image":
      return Og(i, t, n);
    case "video":
      return Bg(i, t, n);
    case "youtube":
      return zg(i, n);
    case "panorama":
    case "3dmodel":
    case "gaussian":
      return Hg(i, t, n);
  }
}
const Gg = "chuci-thumbnails", ci = "thumbnails", Wg = 50 * 1024 * 1024;
function kn(i, e) {
  return JSON.stringify([
    i.url,
    i.type,
    i.cameraPosition,
    i.cameraTarget,
    i.materialUrl,
    i.showTexture,
    i.fitToContainer,
    e,
    Ug
  ]);
}
class Hr {
  constructor(e, t) {
    this.db = e, this.limitBytes = t;
  }
  db;
  limitBytes;
  static async open(e = Wg) {
    return new Promise((t) => {
      let n = !1;
      const r = () => {
        n || (n = !0, t(new Hr(void 0, e)));
      };
      try {
        if (typeof indexedDB > "u") {
          r();
          return;
        }
        const s = indexedDB.open(Gg, 1);
        s.onupgradeneeded = () => {
          const a = s.result;
          a.objectStoreNames.contains(ci) || a.createObjectStore(ci, { keyPath: "key" });
        }, s.onerror = r, s.onblocked = r, s.onsuccess = () => {
          if (n) {
            s.result.close();
            return;
          }
          n = !0, t(new Hr(s.result, e));
        };
      } catch {
        r();
      }
    });
  }
  get(e) {
    return this.db ? new Promise((t, n) => {
      const r = this.db.transaction(ci, "readwrite"), s = r.objectStore(ci), a = s.get(e);
      let o;
      a.onsuccess = () => {
        const c = a.result;
        c && (o = c.blob, c.lastUsed = Date.now(), s.put(c));
      }, r.oncomplete = () => t(o), r.onerror = () => n(r.error), r.onabort = () => n(r.error);
    }) : Promise.resolve(void 0);
  }
  put(e, t) {
    return this.db ? new Promise((n, r) => {
      const s = this.db.transaction(ci, "readwrite"), a = s.objectStore(ci);
      a.put({ key: e, blob: t, size: t.size, lastUsed: Date.now() });
      const o = a.getAll();
      o.onsuccess = () => {
        const c = o.result.sort((h, d) => h.lastUsed - d.lastUsed);
        let l = c.reduce((h, d) => h + d.size, 0);
        for (const h of c) {
          if (l <= this.limitBytes) break;
          a.delete(h.key), l -= h.size;
        }
      }, s.oncomplete = () => n(), s.onerror = () => r(s.error), s.onabort = () => r(s.error);
    }) : Promise.resolve();
  }
}
const Xg = {
  image: '<path d="M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M8 9h.01"/>',
  panorama: '<ellipse cx="12" cy="12" rx="9" ry="5"/><path d="M12 7c3 3 3 7 0 10M12 7c-3 3-3 7 0 10M3 12h18"/>',
  youtube: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M10 9l5 3-5 3z"/>',
  video: '<rect x="3" y="5" width="14" height="14" rx="2"/><path d="M17 10l4-2v8l-4-2M8 9l5 3-5 3z"/>',
  "3dmodel": '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9"/>',
  gaussian: '<circle cx="8" cy="9" r="3"/><circle cx="15" cy="8" r="2.5"/><circle cx="13" cy="15" r="4"/><circle cx="6" cy="16" r="2"/>'
};
function qg(i) {
  const e = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#e5e7eb"/><g fill="none" stroke="#6b7280" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${Xg[i]}</g></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(e)}`;
}
const Yg = 50, Kg = 3e4;
class $g {
  generate;
  cache;
  maxSize;
  memoryCacheEntries;
  tasks = [];
  byKey = /* @__PURE__ */ new Map();
  blobs = /* @__PURE__ */ new Map();
  failedKeys = /* @__PURE__ */ new Set();
  draining = !1;
  constructor(e = {}) {
    this.generate = e.generate ?? kg, this.cache = Promise.resolve(e.cache ?? Hr.open()).catch(() => {
    }), this.maxSize = e.maxSize ?? pi, this.memoryCacheEntries = Math.max(
      0,
      Math.floor(e.memoryCacheEntries ?? Yg)
    );
  }
  request(e, t, n) {
    if (n?.aborted) return Promise.resolve(null);
    const r = kn(e, this.maxSize);
    if (this.failedKeys.has(r)) return Promise.resolve(this.failureFallback(e));
    const s = this.byKey.get(r), a = s ?? { item: e, key: r, priority: t, controller: new AbortController(), waiters: /* @__PURE__ */ new Set() };
    a.priority = Math.min(a.priority, t), s || (this.byKey.set(r, a), this.tasks.push(a));
    const o = new Promise((c) => {
      const l = (d) => {
        n?.removeEventListener("abort", h), a.waiters.delete(l), c(d);
      }, h = () => {
        if (l(null), a.waiters.size !== 0) return;
        this.byKey.delete(r);
        const d = this.tasks.indexOf(a);
        d !== -1 && this.tasks.splice(d, 1), a.controller.abort();
      };
      a.waiters.add(l), n?.addEventListener("abort", h, { once: !0 });
    });
    return this.startDrain(), o;
  }
  readMemoryBlob(e) {
    const t = this.blobs.get(e);
    return t && (this.blobs.delete(e), this.blobs.set(e, t)), t;
  }
  storeMemoryBlob(e, t) {
    for (this.blobs.delete(e), this.blobs.set(e, t); this.blobs.size > this.memoryCacheEntries; ) {
      const n = this.blobs.keys().next().value;
      if (n === void 0) break;
      this.blobs.delete(n);
    }
  }
  getMemoryUrl(e) {
    const t = this.readMemoryBlob(kn(e, this.maxSize));
    if (!t) return null;
    try {
      return URL.createObjectURL(t);
    } catch {
      return null;
    }
  }
  updatePriority(e, t) {
    const n = this.byKey.get(kn(e, this.maxSize));
    n && this.tasks.includes(n) && (n.priority = t);
  }
  startDrain() {
    this.draining || (this.draining = !0, queueMicrotask(() => {
      this.drain();
    }));
  }
  async drain() {
    for (; this.tasks.length > 0; ) {
      this.tasks.sort((t, n) => t.priority - n.priority);
      const e = this.tasks.shift();
      await this.run(e);
    }
    this.draining = !1;
  }
  async run(e) {
    const { signal: t } = e.controller, n = setTimeout(() => e.controller.abort(), Kg);
    let r;
    const s = new Promise((o, c) => {
      r = () => c(t.reason), t.addEventListener("abort", r, { once: !0 });
    });
    let a;
    try {
      a = await Promise.race([this.load(e, t), s]), t.throwIfAborted(), this.storeMemoryBlob(e.key, a);
    } catch {
      a = void 0, t.aborted || this.failedKeys.add(e.key);
    } finally {
      clearTimeout(n), t.removeEventListener("abort", r), this.byKey.get(e.key) === e && this.byKey.delete(e.key);
    }
    for (const o of e.waiters)
      try {
        o(a ? URL.createObjectURL(a) : this.failureFallback(e.item));
      } catch {
        o(null);
      }
  }
  async load(e, t) {
    const n = await this.cache;
    t.throwIfAborted();
    let r;
    try {
      r = await n?.get(e.key);
    } catch {
    }
    if (t.throwIfAborted(), r ??= this.readMemoryBlob(e.key), r) return r;
    r = await this.generate(e.item, { maxSize: this.maxSize, signal: t }), t.throwIfAborted();
    try {
      await n?.put(e.key, r);
    } catch {
    }
    return r;
  }
  failureFallback(e) {
    return e.type === "youtube" ? uc(e.url) : null;
  }
}
const Zg = new $g();
function f_(i) {
  return i.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}
class Ft extends va {
  static activeViewerOwner;
  static handledViewerCloseEvents = /* @__PURE__ */ new WeakSet();
  currentIndex = 0;
  timer;
  observer;
  drag;
  dragFrame;
  panelPositions = /* @__PURE__ */ new WeakMap();
  transitionEnd;
  width = 0;
  pointerHandlers;
  slidesObserver;
  observedSlides = [];
  viewerOpen = !1;
  viewerIndex = 0;
  thumbnailQueue = Zg;
  thumbnailSources = /* @__PURE__ */ new Map();
  pendingThumbnails = /* @__PURE__ */ new Map();
  thumbnailTargets = /* @__PURE__ */ new WeakMap();
  stopHostPropagation = (e) => e.stopPropagation();
  static get observedAttributes() {
    return ["has-thumb", "autoplay"];
  }
  get hasThumb() {
    return this.hasAttribute("has-thumb");
  }
  get autoplay() {
    return this.hasAttribute("autoplay");
  }
  get items() {
    return this.slides.map(yi);
  }
  get slides() {
    return Array.from(this.querySelectorAll("cc-swiper-slide"));
  }
  get index() {
    return di(this.currentIndex, this.items.length, this.loop);
  }
  get loop() {
    return this.items.length >= 2;
  }
  viewerTagName() {
    return "cc-viewer";
  }
  setThumbnailSource(e, t, n, r) {
    if (n && r) {
      for (const o of this.queryAll(".viewer, .gallery-thumb")) {
        const c = this.thumbnailTargets.get(o);
        c?.slide === n && c.key === r && o.setAttribute("src", t);
      }
      return;
    }
    const s = this.query(`[data-thumb-index="${e}"]`);
    s && s.setAttribute("src", t);
    const a = this.query(`.viewer[data-index="${e}"]`);
    a && a.setAttribute("src", t);
  }
  render() {
    if (!this.isConnected) return;
    this.cleanup(), this.tabIndex = 0;
    const e = this.css`
      :host { display:block; width:100%; height:100%; --navigation-color:var(--cc-slider-navigation-color,#007aff); }
      #layout { display:flex; flex-direction:column; width:100%; height:100%; background:white; overflow:hidden; }
      #viewport { position:relative; flex:1 1 auto; min-height:0; overflow:hidden; touch-action:pan-y; }
      .cc-slide { position:absolute; inset:0; width:100%; height:100%; background:white; display:flex; align-items:center; justify-content:center; }
      .cc-slide img { width:100%; height:100%; object-fit:contain; user-select:none; -webkit-user-drag:none; cursor:pointer; }
      .nav { position:absolute; z-index:2; top:50%; transform:translateY(-50%); width:44px;height:44px;border:0;padding:0;background:transparent;color:var(--navigation-color);cursor:pointer;font-size:0; }
      .nav::after { content:'';display:block;width:100%;height:100%;background-color:var(--navigation-color);mask-size:contain;mask-repeat:no-repeat;mask-position:center; }
      #previous { left:4px; } #previous::after { mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cpath d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z'/%3E%3C/svg%3E"); }
      #next { right:4px; } #next::after { mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black'%3E%3Cpath d='M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z'/%3E%3C/svg%3E"); }
      #caption { flex:0 0 auto; min-height:0; box-sizing:border-box; padding:5px; color:white; background:#000; font-size:.6rem; font-weight:700; }
      ${_l}
      .cc-bar--slider { min-height:1.5rem; }
      .cc-bar-dot { color:white; }
      .cc-bar-dot[aria-current="true"] { color:var(--cc-slider-theme-color,#007aff); }
      #gallery { flex:0 0 90px; display:flex; gap:10px; overflow-x:auto; padding:5px; box-sizing:border-box; }
      #gallery[hidden], #caption[hidden] { display:none; }
      .gallery-thumb { flex:0 0 min(22%,100px);height:100%;object-fit:cover;opacity:.35;cursor:pointer; }
      .gallery-thumb[aria-current="true"] { opacity:1; }
    `;
    this.updateShadowRoot(
      `${e}<div id="layout"><div id="viewport"><div id="track"></div><button id="previous" class="nav" type="button" aria-label="Previous"></button><button id="next" class="nav" type="button" aria-label="Next"></button></div><div id="caption"></div><div id="gallery" hidden></div></div>`
    ), this.buildSlides(), this.bindEvents(), this.observeSlides(), this.observeSize(), this.viewerOpen || this.startAutoplay(), this.updateLayout();
  }
  cleanup() {
    this.cancelDragFrame(), this.drag = void 0, this.cancelTransitionEnd(), this.pointerHandlers?.abort(), this.pointerHandlers = void 0, this.observer?.disconnect(), this.observer = void 0, this.timer !== void 0 && clearInterval(this.timer), this.timer = void 0;
    for (const e of ["pointerdown", "pointermove", "pointerup", "pointercancel", "wheel", "click"])
      this.removeEventListener(e, this.stopHostPropagation);
    for (const e of ["pointerdown", "pointermove", "pointerup", "pointercancel", "wheel", "click"])
      this.shadowRoot?.removeEventListener(e, this.stopHostPropagation);
    this.slidesObserver?.disconnect(), this.slidesObserver = void 0;
  }
  disconnectedCallback() {
    for (const { controller: e } of this.pendingThumbnails.values()) e.abort();
    this.pendingThumbnails.clear(), this.releaseThumbnailSources(), this.cleanup(), Ft.activeViewerOwner === this && (Ft.activeViewerOwner = void 0, this.viewerOpen = !1), super.disconnectedCallback();
  }
  buildSlides() {
    const e = this.query("#track"), t = this.query("#gallery");
    !e || !t || (this.resetThumbnailSources(), e.replaceChildren(), t.replaceChildren(), this.slides.forEach((n, r) => {
      const s = yi(n), a = kn(s, pi), o = { slide: n, key: a }, c = s.thumbnailUrl ? null : this.thumbnailQueue.getMemoryUrl(s);
      c && this.thumbnailSources.set(n, c);
      const l = s.thumbnailUrl || this.thumbnailSources.get(n) || qg(s.type), h = document.createElement("div");
      h.className = "cc-slide", h.dataset.index = String(r);
      const d = document.createElement("img");
      if (d.className = "viewer", d.setAttribute("src", l), d.setAttribute("data-image-url", s.url), d.setAttribute("data-image-type", s.type), d.setAttribute("data-index", String(r)), d.setAttribute("alt", s.caption), this.thumbnailTargets.set(d, o), h.append(d), e.append(h), this.hasThumb) {
        const u = document.createElement("img");
        u.className = "gallery-thumb", u.dataset.thumbIndex = String(r), u.setAttribute("src", l), u.setAttribute("alt", s.caption), this.thumbnailTargets.set(u, o), u.addEventListener("click", () => this.goTo(r)), t.append(u);
      }
    }), t.hidden = !this.hasThumb, this.requestThumbnails());
  }
  resetThumbnailSources() {
    const e = new Set(this.slides);
    for (const [t, n] of this.thumbnailSources)
      (n.startsWith("blob:") || !e.has(t)) && (this.revokeThumbnailUrl(n), this.thumbnailSources.delete(t));
  }
  releaseThumbnailSources() {
    for (const e of this.thumbnailSources.values()) this.revokeThumbnailUrl(e);
    this.thumbnailSources.clear();
  }
  revokeThumbnailUrl(e) {
    e?.startsWith("blob:") && typeof URL.revokeObjectURL == "function" && URL.revokeObjectURL(e);
  }
  requestThumbnails() {
    const e = this.slides, t = e.length, n = this.index, r = e.map((a, o) => ({
      slide: a,
      item: yi(a),
      priority: (o - n + t) % t
    })).filter(({ slide: a, item: o }) => !o.thumbnailUrl && !this.thumbnailSources.has(a)).sort((a, o) => a.priority - o.priority), s = new Map(this.pendingThumbnails);
    for (const { slide: a, item: o, priority: c } of r) {
      const l = kn(o, pi);
      if (this.pendingThumbnails.get(a)?.key === l) {
        s.delete(a);
        continue;
      }
      const h = { key: l, controller: new AbortController() };
      this.pendingThumbnails.set(a, h), this.thumbnailQueue.request(o, c, h.controller.signal).then((d) => {
        if (this.pendingThumbnails.get(a) !== h) {
          this.revokeThumbnailUrl(d);
          return;
        }
        if (this.pendingThumbnails.delete(a), !d) return;
        const u = this.slides.indexOf(a), p = u >= 0 ? yi(a) : void 0;
        if (!this.isConnected || !p || kn(p, pi) !== l) {
          this.revokeThumbnailUrl(d);
          return;
        }
        const _ = this.thumbnailSources.get(a);
        _ !== d && this.revokeThumbnailUrl(_ ?? null), this.thumbnailSources.set(a, d), this.setThumbnailSource(u, d, a, l);
      });
    }
    for (const [a, o] of s)
      this.pendingThumbnails.get(a) === o && this.pendingThumbnails.delete(a), o.controller.abort();
  }
  updateThumbnailPriorities() {
    const e = this.slides, t = e.length;
    if (!t) return;
    const n = /* @__PURE__ */ new Map();
    e.forEach((r, s) => {
      if (!this.pendingThumbnails.has(r)) return;
      const a = yi(r), o = kn(a, pi), c = (s - this.index + t) % t, l = n.get(o);
      l ? l.priority = Math.min(l.priority, c) : n.set(o, { item: a, priority: c });
    });
    for (const { item: r, priority: s } of n.values())
      this.thumbnailQueue.updatePriority(r, s);
  }
  bindEvents() {
    const e = this.query("#viewport"), t = this.query("#previous"), n = this.query("#next");
    if (!e) return;
    const r = new AbortController();
    this.pointerHandlers = r;
    const s = { signal: r.signal };
    for (const a of [
      "pointerdown",
      "pointermove",
      "pointerup",
      "pointercancel",
      "wheel"
    ])
      e.addEventListener(a, (o) => o.stopPropagation(), s);
    e.addEventListener(
      "pointerdown",
      (a) => this.onPointerDown(a),
      s
    ), e.addEventListener(
      "pointermove",
      (a) => this.onPointerMove(a),
      s
    ), e.addEventListener(
      "pointerup",
      (a) => this.onPointerUp(a),
      s
    ), e.addEventListener(
      "pointercancel",
      () => {
        this.drag = void 0, this.moveTo(this.index, !0);
      },
      s
    ), e.addEventListener("wheel", () => {
    }, s), t?.addEventListener(
      "click",
      () => this.step(-1),
      s
    ), n?.addEventListener(
      "click",
      () => this.step(1),
      s
    ), this.addEventListener("keydown", this.onKeyDown, s), document.addEventListener(
      "cc-viewer-index-change",
      this.onViewerIndexChange,
      s
    ), document.addEventListener("cc-viewer-close", this.onViewerClose, s);
    for (const a of ["pointerdown", "pointermove", "pointerup", "pointercancel", "wheel", "click"])
      this.addEventListener(a, this.stopHostPropagation);
    for (const a of ["pointerdown", "pointermove", "pointerup", "pointercancel", "wheel", "click"])
      this.shadowRoot?.addEventListener(a, this.stopHostPropagation);
  }
  onKeyDown = (e) => {
    e.key === "ArrowRight" ? (e.preventDefault(), this.step(1)) : e.key === "ArrowLeft" && (e.preventDefault(), this.step(-1));
  };
  onViewerIndexChange = (e) => {
    Ft.activeViewerOwner === this && (this.viewerIndex = e.detail.index, this.goTo(this.viewerIndex, { animate: !1 }));
  };
  onViewerClose = (e) => {
    Ft.activeViewerOwner !== this || Ft.handledViewerCloseEvents.has(e) || (Ft.handledViewerCloseEvents.add(e), Ft.activeViewerOwner = void 0, this.viewerOpen = !1, this.index !== this.viewerIndex && this.goTo(this.viewerIndex, { animate: !1 }), this.resumeAutoplay());
  };
  onPointerDown(e) {
    if (e.target.closest("button") || e.button !== 0 && e.pointerType !== "touch") return;
    this.cancelDragFrame(), this.cancelTransitionEnd();
    const t = this.query("#viewport");
    try {
      t?.setPointerCapture(e.pointerId);
    } catch {
    }
    this.drag = {
      pointerId: e.pointerId,
      x: e.clientX,
      displayPx: 0,
      startedAt: performance.now(),
      moved: !1,
      index: Number(
        e.target.closest("[data-index]")?.getAttribute("data-index") ?? this.index
      )
    };
  }
  onPointerMove(e) {
    const t = this.drag;
    if (!t || e.pointerId !== t.pointerId) return;
    const n = e.clientX - t.x;
    Math.abs(n) > Qe.dragThresholdPx && (t.moved = !0), t.displayPx = this.displayDragPx(n), this.dragFrame === void 0 && (this.dragFrame = requestAnimationFrame(() => {
      this.dragFrame = void 0, this.drawDrag(t);
    }));
  }
  cancelDragFrame() {
    this.dragFrame !== void 0 && (cancelAnimationFrame(this.dragFrame), this.dragFrame = void 0);
  }
  onPointerUp(e) {
    const t = this.drag;
    if (!t || e.pointerId !== t.pointerId) return;
    const n = e.clientX - t.x, r = t.moved || Math.abs(n) > Qe.dragThresholdPx;
    if (this.cancelDragFrame(), this.drag = void 0, !r)
      this.moveTo(this.index, !0), this.openViewer(t.index);
    else {
      const s = Math.max(1, performance.now() - t.startedAt), a = Math.abs(n) / s > Qe.swipeVelocityPxPerMs;
      n !== 0 && (Math.abs(n) >= this.width * Qe.swipeCommitRatio || a) ? this.step(n < 0 ? 1 : -1) : this.moveTo(this.index, !0);
    }
  }
  displayDragPx(e) {
    return !this.loop && (this.index === 0 && e > 0 || this.index === this.items.length - 1 && e < 0) ? e : Math.max(-this.width, Math.min(this.width, e));
  }
  observeSlides() {
    typeof MutationObserver > "u" || (this.observedSlides = this.slides, this.slidesObserver = new MutationObserver(() => {
      const e = this.slides;
      e.length === this.observedSlides.length && e.every((t, n) => t === this.observedSlides[n]) || (this.observedSlides = e, this.drag = void 0, this.currentIndex = di(this.currentIndex, this.items.length, this.loop), this.buildSlides(), this.updateLayout(), this.viewerOpen || this.startAutoplay());
    }), this.slidesObserver.observe(this, { childList: !0, subtree: !0 }));
  }
  observeSize() {
    const e = this.query("#viewport");
    if (!e || typeof ResizeObserver > "u") return;
    this.observer = new ResizeObserver((n) => {
      const r = n[0]?.contentRect.width ?? e.getBoundingClientRect().width;
      r > 0 && r !== this.width && (this.width = r, this.drag && (this.drag.positions = void 0), this.updateLayout());
    }), this.observer.observe(e);
    const t = e.getBoundingClientRect().width;
    t > 0 && (this.width = t);
  }
  updateLayout() {
    this.cancelDragFrame(), this.cancelTransitionEnd();
    const e = this.queryAll(".cc-slide"), t = Zi(this.index, e.length, this.loop);
    this.width > 0 && e.forEach((n, r) => {
      n.style.transition = "none", this.setPanelPosition(n, t[r]);
    }), this.updateChrome();
  }
  readPanelPositions(e, t) {
    return e.map((n, r) => {
      const s = getComputedStyle(n).transform;
      return typeof DOMMatrixReadOnly == "function" && s && s !== "none" ? new DOMMatrixReadOnly(s).m41 : this.panelPositions.get(n) ?? t[r] * this.width;
    });
  }
  dragStartPositions(e, t) {
    const { width: n, loop: r } = this, s = this.readPanelPositions(e, Zi(t, e.length, r)), a = s.filter((o) => Math.abs(o) < n - 0.01);
    if (a.length === 0) return s;
    for (const o of [-1, 1]) {
      let c = o === -1 ? Math.min(...a) : Math.max(...a);
      const l = s.map((h, d) => ({ x: h, i: d })).filter(({ x: h }) => o * h >= n - 0.01).sort((h, d) => o * (h.x - d.x));
      for (const { i: h } of l)
        c = o * Math.max(n, o * c + n), s[h] = c;
    }
    return s;
  }
  drawDrag(e) {
    const { width: t } = this;
    if (t <= 0) return;
    const n = this.index, r = Array.from(this.queryAll(".cc-slide")), s = e.positions ??= this.dragStartPositions(r, n), a = s[n] ?? 0, o = this.loop ? Math.max(-t - a, Math.min(t - a, e.displayPx)) : e.displayPx, c = r.length * t;
    r.forEach((l, h) => {
      let d = s[h] / t;
      const u = d * t + o;
      this.loop && u > t && u - c >= -t ? d -= r.length : this.loop && u < -t && u + c <= t && (d += r.length), l.style.transition = "none", this.setPanelPosition(l, d, o);
    });
  }
  setPanelPosition(e, t, n = 0) {
    e.style.transform = `translateX(calc(${t * 100}% + ${n}px))`, this.panelPositions.set(e, t * this.width + n);
  }
  updateChrome() {
    const e = this.slides.length;
    this.queryAll(".nav").forEach((n) => {
      n.hidden = e < 2;
    });
    const t = this.query("#caption");
    if (t) {
      const n = ml(
        this.items.length,
        this.items[this.index]?.caption ?? "",
        this.hasThumb
      );
      gl(
        t,
        n,
        this.index,
        this.items.length,
        (r) => this.goTo(r),
        "slider"
      ), t.hidden = !n.showBar;
    }
    this.queryAll(".gallery-thumb").forEach((n, r) => {
      r === this.index ? n.setAttribute("aria-current", "true") : n.removeAttribute("aria-current");
    });
  }
  cancelTransitionEnd() {
    this.transitionEnd?.abort(), this.transitionEnd = void 0;
  }
  moveTo(e, t, n) {
    this.cancelDragFrame(), this.drag = void 0, this.cancelTransitionEnd();
    const r = this.index, s = Array.from(this.queryAll(".cc-slide")), { width: a } = this, o = Zi(r, s.length, this.loop), c = t && a > 0 ? this.readPanelPositions(s, o) : [];
    if (this.currentIndex = e, !c.length || !s[e]) {
      this.updateLayout();
      return;
    }
    const l = Zi(e, s.length, this.loop), h = (M) => Math.abs(M) < a - 0.01;
    if (r !== e && !h(c[e])) {
      let M = n ?? Math.sign(o[e]);
      const m = c.filter(h), f = c.find((S, T) => T !== r && h(S)), y = c[r];
      h(y) && f !== void 0 && (M = Math.sign(y - f) || M);
      const R = m.length > 0 ? Math.max(...m.map((S) => M * S)) : 0;
      c[e] = M * Math.max(a, a + R);
    }
    const d = c[e], u = c.map((M, m) => {
      if (m === e || !h(M)) return l[m];
      const f = (M - d) / a;
      return Math.sign(f || l[m]) * Math.max(1, Math.round(Math.abs(f)));
    }), p = this.query("#viewport");
    let _;
    if (s.forEach((M, m) => {
      M.style.transition = "none", this.panelPositions.get(M) !== c[m] && this.setPanelPosition(M, 0, c[m]);
    }), p?.getBoundingClientRect(), s.forEach((M, m) => {
      const f = u[m] * a;
      (h(c[m]) || h(f)) && (M.style.transition = `transform ${Qe.slideTransitionMs}ms ease`, Math.abs(c[m] - f) > 0.01 && (_ = M)), this.setPanelPosition(M, u[m]);
    }), _) {
      const M = new AbortController();
      this.transitionEnd = M, _.addEventListener("transitionend", (m) => {
        m.propertyName === "transform" && this.updateLayout();
      }, { signal: M.signal });
    }
    this.updateChrome();
  }
  step(e) {
    this.selectSlide(pl(this.index, e, this.items.length, this.loop), !0, e);
  }
  selectSlide(e, t, n) {
    this.moveTo(e, t, n), this.updateThumbnailPriorities(), this.dispatch("cc-swiper-index-change", { index: this.index });
  }
  goTo(e, t = {}) {
    this.selectSlide(di(e, this.items.length, this.loop), t.animate ?? !0);
  }
  pauseAutoplay() {
    this.timer !== void 0 && clearInterval(this.timer), this.timer = void 0;
  }
  resumeAutoplay() {
    this.startAutoplay();
  }
  startAutoplay() {
    this.pauseAutoplay(), this.isConnected && !this.viewerOpen && this.autoplay && this.items.length > 1 && (this.timer = setInterval(() => {
      this.drag || this.step(1);
    }, Qe.slideAutoplayMs));
  }
  async openViewer(e) {
    if (!this.isConnected || this.slides.length === 0) return;
    const t = Ft.activeViewerOwner;
    t && t !== this && (t.viewerOpen = !1, t.resumeAutoplay()), Ft.activeViewerOwner = this, this.viewerOpen = !0, this.pauseAutoplay();
    const n = this.viewerTagName();
    let r = document.querySelector(n);
    if (r || (r = document.createElement(n), document.body.append(r)), await customElements.whenDefined(n), !this.isConnected || Ft.activeViewerOwner !== this) return;
    const s = this.items;
    if (s.length === 0) {
      Ft.activeViewerOwner = void 0, this.viewerOpen = !1, this.resumeAutoplay();
      return;
    }
    const a = di(
      Number.isFinite(e) ? Math.trunc(e) : 0,
      s.length,
      this.loop
    );
    this.viewerIndex = a, r.open(s, a, { loop: this.loop });
  }
}
customElements.get("cc-swiper") || customElements.define("cc-swiper", Ft);
class Jg extends va {
  static get observedAttributes() {
    return ["thumbnail-url", "image-url", "image-type", "caption"];
  }
  get thumbnailUrl() {
    return this.getAttribute("thumbnail-url") || "";
  }
  get imageUrl() {
    return this.getAttribute("image-url") || "";
  }
  get imageType() {
    return this.getAttribute("image-type") || "";
  }
  get caption() {
    return this.getAttribute("caption") || "";
  }
  render() {
    const e = this.css`
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        background-size: cover !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
      }
    `;
    this.updateShadowRoot(e);
  }
}
customElements.get("cc-swiper-slide") || customElements.define("cc-swiper-slide", Jg);
class Qg {
  constructor(e, t = (r, s) => setTimeout(r, s), n = (r) => clearTimeout(r)) {
    this.onChange = e, this.setTimer = t, this.clearTimer = n;
  }
  onChange;
  setTimer;
  clearTimer;
  visible = !1;
  timer;
  shown() {
    this.showAndSchedule();
  }
  interacted() {
    this.clearScheduledHide(), this.setVisible(!1);
  }
  poked() {
    this.showAndSchedule();
  }
  dispose() {
    this.clearScheduledHide();
  }
  showAndSchedule() {
    this.setVisible(!0), this.clearScheduledHide(), this.timer = this.setTimer(() => {
      this.timer = void 0, this.setVisible(!1);
    }, Qe.barHideDelayMs);
  }
  clearScheduledHide() {
    this.timer !== void 0 && (this.clearTimer(this.timer), this.timer = void 0);
  }
  setVisible(e) {
    this.visible !== e && (this.visible = e, this.onChange(e));
  }
}
function dc(i, e, t) {
  return i / t <= e ? { width: i, height: i / t } : { width: e * t, height: e };
}
function fc(i, e, t) {
  const n = () => {
    const { width: s, height: a } = i.getBoundingClientRect(), o = dc(s, a, t);
    e.style.width = `${o.width}px`, e.style.height = `${o.height}px`;
  };
  n();
  const r = new ResizeObserver(n);
  return r.observe(i), () => r.disconnect();
}
function jg(i, e, t, n, r) {
  const s = Math.min(r.max, Math.max(r.min, i.scale * e)), a = s / i.scale;
  return {
    scale: s,
    x: t - (t - i.x) * a,
    y: n - (n - i.y) * a
  };
}
class e_ {
  dispose;
  view = { scale: 1, x: 0, y: 0 };
  image;
  mount(e, t, n) {
    if (n.signal.aborted) return Promise.reject(n.signal.reason);
    if (!t.url) return Promise.reject(new Error("No image URL provided"));
    const r = e.ownerDocument.createElement("img");
    return r.alt = "", r.draggable = !1, r.style.position = "relative", r.style.display = "block", r.style.maxWidth = "none", r.style.maxHeight = "none", r.style.userSelect = "none", r.style.touchAction = "none", r.style.transformOrigin = "center center", r.style.willChange = "transform", r.style.cursor = "grab", this.image = r, this.view = { scale: 1, x: 0, y: 0 }, new Promise((s, a) => {
      const o = new AbortController(), c = { signal: o.signal };
      let l = !1, h = !1, d;
      const u = (R) => {
        h || (h = !0, a(R));
      }, p = () => {
        if (!r.naturalWidth || !r.naturalHeight) return;
        const R = e.getBoundingClientRect(), S = dc(
          R.width,
          R.height,
          r.naturalWidth / r.naturalHeight
        );
        r.style.width = `${S.width}px`, r.style.height = `${S.height}px`, this.resetView();
      }, _ = () => {
        if (!r.naturalWidth || !r.naturalHeight) {
          M();
          return;
        }
        l = !0, h = !0, p(), d = new ResizeObserver(p), d.observe(e), s();
      }, M = () => {
        const R = new Error(`Failed to load image: ${t.url}`);
        if (l) {
          n.reportError(R);
          return;
        }
        u(R);
      }, m = (R) => {
        if (R.kind === "start")
          n.reportInteraction();
        else if (R.kind === "rotate" || R.kind === "pan")
          this.view = {
            ...this.view,
            x: this.view.x + R.dx * Qe.panSpeed,
            y: this.view.y + R.dy * Qe.panSpeed
          }, this.renderView();
        else if (R.kind === "zoom") {
          const S = e.getBoundingClientRect();
          this.view = jg(
            this.view,
            R.factor,
            R.cx - S.width / 2,
            R.cy - S.height / 2,
            { min: Qe.imageMinZoom, max: Qe.imageMaxZoom }
          ), this.renderView();
        } else R.kind === "reset" && this.resetView();
      }, f = new Yr(e, m), y = () => {
        this.dispose === y && (this.dispose = void 0), o.abort(), f.dispose(), d?.disconnect(), r.removeAttribute("src"), r.remove(), this.image = void 0, u(new DOMException("Image load aborted", "AbortError"));
      };
      this.dispose = y, r.addEventListener("load", _, { ...c, once: !0 }), r.addEventListener("error", M, c), n.signal.addEventListener("abort", y, { ...c, once: !0 }), e.append(r), r.setAttribute("src", t.url);
    });
  }
  unmount() {
    this.dispose?.();
  }
  resetView() {
    this.view = { scale: 1, x: 0, y: 0 }, this.renderView();
  }
  renderView() {
    this.image && (this.image.style.transform = `translate3d(${this.view.x}px, ${this.view.y}px, 0) scale(${this.view.scale})`);
  }
}
class t_ {
  reservesBottomBar = !0;
  dispose;
  mount(e, t, n) {
    if (n.signal.aborted) return Promise.reject(n.signal.reason);
    if (!t.url) return Promise.reject(new Error("No video URL provided"));
    const r = e.ownerDocument.createElement("video");
    return r.controls = !0, r.setAttribute("controlslist", "nodownload"), r.preload = "auto", r.style.objectFit = "contain", r.textContent = "Your browser does not support the video tag.", new Promise((s, a) => {
      const o = new AbortController(), c = { signal: o.signal };
      let l, h = !1;
      const d = () => {
        !r.videoWidth || !r.videoHeight || (l = fc(
          e,
          r,
          r.videoWidth / r.videoHeight
        ));
      }, u = () => {
        h = !0, s();
      }, p = () => {
        const M = new Error(`Failed to load video: ${t.url}`);
        if (h) {
          n.reportError(M);
          return;
        }
        r.removeEventListener("loadeddata", u), a(M);
      }, _ = () => {
        this.dispose = void 0, o.abort(), l?.(), a(new DOMException("Video load aborted", "AbortError")), r.paused || r.pause(), r.removeAttribute("src"), r.networkState !== r.NETWORK_EMPTY && r.load(), r.remove();
      };
      this.dispose = _, r.addEventListener("loadedmetadata", d, { ...c, once: !0 }), r.addEventListener("loadeddata", u, { ...c, once: !0 }), r.addEventListener("error", p, c), r.addEventListener("play", n.reportInteraction, c), n.signal.addEventListener("abort", _, { ...c, once: !0 }), r.setAttribute("src", t.url), e.append(r);
    });
  }
  unmount() {
    this.dispose?.();
  }
}
const n_ = 16 / 9;
class i_ {
  reservesBottomBar = !0;
  dispose;
  mount(e, t, n) {
    if (n.signal.aborted) return Promise.reject(n.signal.reason);
    const r = e.ownerDocument.createElement("iframe");
    r.title = "YouTube video", r.setAttribute("allowfullscreen", ""), r.style.border = "0";
    const s = Ig(t.url);
    return s === null ? (r.hidden = !0, this.dispose = () => {
      r.remove(), this.dispose = void 0;
    }, e.append(r), Promise.reject(new Error("Invalid YouTube URL"))) : new Promise((a, o) => {
      const c = new AbortController(), l = { signal: c.signal }, h = fc(e, r, n_), d = () => {
        r.removeEventListener("error", u), a();
      }, u = () => {
        r.removeEventListener("load", d), o(new Error("Failed to load YouTube iframe"));
      }, p = () => {
        r.getRootNode().activeElement === r && n.reportInteraction();
      }, _ = () => {
        this.dispose = void 0, c.abort(), h(), o(new DOMException("YouTube load aborted", "AbortError")), r.remove();
      };
      this.dispose = _, r.addEventListener("load", d, { ...l, once: !0 }), r.addEventListener("error", u, { ...l, once: !0 }), e.ownerDocument.defaultView?.addEventListener("blur", p, l), n.signal.addEventListener("abort", _, { ...l, once: !0 }), r.setAttribute("src", s), e.append(r);
    });
  }
  unmount() {
    this.dispose?.();
  }
}
class r_ {
  constructor(e) {
    this.type = e;
  }
  type;
  async mount() {
    throw new Error(`Unsupported media type: ${this.type}`);
  }
  unmount() {
  }
}
async function s_(i) {
  switch (i) {
    case "image":
      return new e_();
    case "panorama":
      return new Rg();
    case "video":
      return new t_();
    case "youtube":
      return new i_();
    case "3dmodel":
      return new Tg();
    case "gaussian": {
      const { GaussianRenderer: e } = await import("./gaussian-renderer-Djlgc7HR.js");
      return new e();
    }
    default:
      return new r_(i);
  }
}
const a_ = 250;
class o_ extends va {
  items = [];
  currentIndex = 0;
  loop = !1;
  activeMount;
  barVisibility;
  gestures;
  debugTimer;
  previousFocus;
  get index() {
    return this.currentIndex;
  }
  open(e, t, n) {
    if (e.length === 0) {
      this.close();
      return;
    }
    this.render();
    const r = this.query(".backdrop"), s = !this.activeMount;
    if (s) {
      const a = this.ownerDocument.activeElement;
      a instanceof HTMLElement && (this.previousFocus = a), this.gestures = new Yr(
        this.query(".content"),
        (o) => {
          o.kind === "tap" && this.barVisibility?.poked();
        },
        { observeOnly: !0 }
      ), this.ownerDocument.defaultView?.addEventListener(
        "keydown",
        this.onKeyDown,
        !0
      ), r.hidden = !1;
    }
    this.items = e.slice(), this.loop = n?.loop ?? !1, this.showItem(
      di(
        Number.isFinite(t) ? Math.trunc(t) : 0,
        e.length,
        this.loop
      )
    ), s && this.query(".nav-close").focus();
  }
  close() {
    if (!this.activeMount) return;
    this.gestures?.dispose(), this.gestures = void 0, this.ownerDocument.defaultView?.removeEventListener(
      "keydown",
      this.onKeyDown,
      !0
    ), this.clearRenderer(), this.items = [], this.query(".backdrop").hidden = !0, this.query(".caption").replaceChildren();
    const e = this.previousFocus;
    this.previousFocus = void 0, e?.isConnected && e.focus(), this.dispatch("cc-viewer-close");
  }
  disconnectedCallback() {
    this.close(), super.disconnectedCallback();
  }
  firstUpdated() {
    this.dispatch("load");
  }
  render() {
    this.query(".backdrop") || (this.updateShadowRoot(`
      <style>
        .backdrop {
          position: fixed;
          inset: 0;
          background: #000;
          color: #fff;
          z-index: var(--cc-viewer-z-index, 1000);
        }
        .viewport {
          position: absolute;
          inset: env(safe-area-inset-top, 0px) env(safe-area-inset-right, 0px)
            env(safe-area-inset-bottom, 0px) env(safe-area-inset-left, 0px);
          isolation: isolate;
        }
        .content, .renderer-host {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .content { z-index: 0; }
        .renderer-host {
          display: grid;
          place-items: center;
        }
        .caption, .nav-button, .media-controls, .debug-panel {
          position: absolute;
          z-index: 2;
        }
        .caption {
          bottom: 0;
          left: 0;
          right: 0;
          padding: 8px 12px;
          max-height: 30vh;
          overflow: auto;
          background: rgba(0, 0, 0, .75);
        }
        .reserve-bottom-bar {
          display: grid;
          grid-template-rows: minmax(0, 1fr) auto;
        }
        .reserve-bottom-bar .content {
          position: relative;
          inset: auto;
          grid-row: 1;
        }
        .reserve-bottom-bar .caption {
          position: static;
          grid-row: 2;
        }
        /* 帯を確保するときは、前後ボタンを帯を除いた描画領域の中央に置く（再生ボタンと重ねない） */
        .reserve-bottom-bar .nav-prev,
        .reserve-bottom-bar .nav-next {
          grid-row: 1 / 2;
          grid-column: 1 / 2;
        }
        .nav-button {
          display: grid;
          place-items: center;
          min-width: 44px;
          min-height: 44px;
          padding: 0 8px;
          border: 1px solid rgba(255, 255, 255, .45);
          border-radius: 4px;
          color: inherit;
          background: rgba(0, 0, 0, .75);
          font: 26px/1 sans-serif;
          cursor: pointer;
        }
        .bar-hidden :is(.nav-prev, .nav-next, .nav-close) { opacity: .25; }
        .nav-prev, .nav-next { top: 50%; transform: translateY(-50%); }
        .nav-prev { left: 12px; }
        .nav-next, .nav-close { right: 12px; }
        .nav-close { top: 12px; }
        .media-controls {
          top: 12px;
          right: 64px;
          display: flex;
          gap: 8px;
        }
        .media-controls > .nav-button { position: static; font: inherit; }
        .debug-panel {
          top: 12px;
          left: 12px;
          max-width: calc(100% - 76px);
          box-sizing: border-box;
          padding: 8px;
          background: rgba(0, 0, 0, .75);
          font: 12px/1.4 monospace;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
          pointer-events: none;
        }
        .spinner, .viewer-error {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 1;
          translate: -50% -50%;
          pointer-events: none;
        }
        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(255, 255, 255, .35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: cc-viewer-spin .8s linear infinite;
        }
        .viewer-error {
          max-width: 80%;
          padding: 8px 12px;
          background: rgba(0, 0, 0, .85);
          text-align: center;
          overflow-wrap: anywhere;
        }
        @keyframes cc-viewer-spin { to { transform: rotate(1turn); } }
        @media (prefers-reduced-motion: reduce) { .spinner { animation: none; } }
        ${_l}
        [hidden] { display: none; }
      </style>
      <div class="backdrop" role="dialog" aria-label="Media viewer" hidden>
        <div class="viewport">
          <div class="content"></div>
          <div class="spinner" role="status" aria-label="Loading" hidden></div>
          <div class="viewer-error" role="alert" hidden></div>
          <div class="debug-panel" hidden></div>
          <div class="media-controls"></div>
          <button class="nav-button nav-prev" type="button" aria-label="Previous" hidden>‹</button>
          <button class="nav-button nav-next" type="button" aria-label="Next" hidden>›</button>
          <button class="nav-button nav-close" type="button" aria-label="Close">×</button>
          <div class="caption" hidden></div>
        </div>
      </div>
    `), this.query(".nav-prev").addEventListener("click", () => this.step(-1)), this.query(".nav-next").addEventListener("click", () => this.step(1)), this.query(".nav-close").addEventListener("click", () => this.close()), this.query(".backdrop").addEventListener("pointermove", (e) => {
      e.pointerType === "mouse" && e.buttons === 0 && this.barVisibility?.poked();
    }));
  }
  onKeyDown = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        this.step(-1);
        break;
      case "ArrowRight":
        this.step(1);
        break;
      case "Escape":
        this.close();
        break;
      default:
        return;
    }
    e.preventDefault(), e.stopPropagation();
  };
  step(e) {
    this.goTo(pl(this.index, e, this.items.length, this.loop));
  }
  goTo(e) {
    !this.activeMount || e === this.index || (this.showItem(e), this.dispatch("cc-viewer-index-change", { index: e }));
  }
  setBarVisible = (e) => {
    const t = this.query(".caption");
    t.hidden = !e || !t.firstElementChild, this.query(".backdrop").classList.toggle("bar-hidden", !e);
  };
  showItem(e) {
    this.clearRenderer(), this.currentIndex = e;
    const t = this.items[e], n = this.items.length, r = this.query(".caption"), s = ml(n, t.caption, !1);
    gl(
      r,
      s,
      e,
      n,
      (c) => this.goTo(c),
      "viewer"
    ), this.setBarVisible(!0), this.query(".nav-prev").hidden = n <= 1 || !this.loop && e === 0, this.query(".nav-next").hidden = n <= 1 || !this.loop && e === n - 1;
    const a = this.ownerDocument.createElement("div");
    a.className = "renderer-host", this.query(".content").append(a);
    const o = { host: a, controller: new AbortController() };
    this.activeMount = o, this.query(".spinner").hidden = !1, t.debugMode && (this.refreshDebug(o), this.debugTimer = setInterval(
      () => this.refreshDebug(o),
      a_
    )), this.mountRenderer(o, t);
  }
  async mountRenderer(e, t) {
    try {
      const n = await s_(t.type);
      if (this.activeMount !== e) {
        n.unmount();
        return;
      }
      if (e.renderer = n, n.reservesBottomBar ? this.query(".viewport").classList.add("reserve-bottom-bar") : (this.barVisibility = new Qg(this.setBarVisible), this.barVisibility.shown()), await n.mount(e.host, t, {
        signal: e.controller.signal,
        reportInteraction: () => {
          this.activeMount === e && this.barVisibility?.interacted();
        },
        reportError: (s) => this.reportRendererError(e, s),
        requestDebugRefresh: () => {
          t.debugMode && this.activeMount === e && this.refreshDebug(e);
        }
      }), this.activeMount !== e) return;
      const r = n.mediaControls?.() ?? [];
      for (const s of r) s.classList.add("nav-button");
      this.query(".media-controls").replaceChildren(...r), t.debugMode && this.refreshDebug(e);
    } catch (n) {
      this.reportRendererError(e, n);
    } finally {
      this.activeMount === e && (this.query(".spinner").hidden = !0);
    }
  }
  reportRendererError(e, t) {
    if (this.activeMount !== e) return;
    const n = this.query(".viewer-error");
    n.textContent = t instanceof Error ? t.message : String(t), n.hidden = !1;
  }
  refreshDebug(e) {
    const t = this.query(".debug-panel"), n = e.renderer?.debugEntries?.() ?? [], s = (this.ownerDocument.defaultView?.navigator.language ?? "").startsWith("ja") ? to.ja : to.en, a = n.map(({ label: o, value: c }) => `${o}: ${c}`);
    t.replaceChildren(
      ...[...a, s].map((o) => {
        const c = this.ownerDocument.createElement("div");
        return c.textContent = o, c;
      })
    ), t.hidden = !1;
  }
  clearRenderer() {
    const e = this.activeMount;
    this.activeMount = void 0, this.barVisibility?.dispose(), this.barVisibility = void 0, this.query(".viewport").classList.remove("reserve-bottom-bar"), e && (e.controller.abort(), e.renderer?.unmount(), e.host.remove()), clearInterval(this.debugTimer), this.debugTimer = void 0;
    const t = this.query(".debug-panel");
    t.hidden = !0, t.replaceChildren(), this.query(".media-controls").replaceChildren(), this.query(".spinner").hidden = !0;
    const n = this.query(".viewer-error");
    n.hidden = !0, n.textContent = "";
  }
}
customElements.get("cc-viewer") || customElements.define("cc-viewer", o_);
export {
  Jg as $,
  ql as A,
  Dt as B,
  Oe as C,
  gn as D,
  xa as E,
  ft as F,
  ao as G,
  Bo as H,
  u_ as I,
  Ba as J,
  Yr as K,
  Or as L,
  Bt as M,
  bt as N,
  Oa as O,
  kt as P,
  Mi as Q,
  Zt as R,
  Jt as S,
  d_ as T,
  Ot as U,
  Ne as V,
  Gt as W,
  xg as X,
  Kt as Y,
  dl as Z,
  Ft as _,
  U as a,
  o_ as a0,
  va as a1,
  Ug as a2,
  f_ as a3,
  kg as a4,
  yi as a5,
  Mt as b,
  Pe as c,
  lt as d,
  st as e,
  Gh as f,
  wa as g,
  on as h,
  Jl as i,
  At as j,
  l_ as k,
  lu as l,
  Kl as m,
  Ho as n,
  h_ as o,
  Le as p,
  qn as q,
  Mn as r,
  La as s,
  c_ as t,
  Jh as u,
  Ta as v,
  pt as w,
  St as x,
  Ue as y,
  Si as z
};
