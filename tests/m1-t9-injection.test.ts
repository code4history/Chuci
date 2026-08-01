// m1-t9: 生テンプレート補間による注入の回帰テスト
//
// 起票元: m1 包括セキュリティレビュー SRH-1（Major）
// 設計書: docs/superpowers/specs/2026-08-01-m1-t9-chuci-template-interpolation-design.md v1.2
//
// なぜ「送り手側（@maplat/core）が守っているから不要」ではないか（設計 §2.2 / §7.1）:
//   Chuci は独立した公開パッケージであり、@maplat/core を介さず直接使われ得る。
//   利用者が別版の @maplat/core を引けば送り手側の防御は消える。
//   したがって本テストは **属性へ直接 payload を置く**。送り手が守ってくれるという
//   前提を置かないことが是正の趣旨そのものである。
//
// 対象シンク（設計 §2.3 の S1〜S7 のうち cc-swiper 配下の4件）:
//   S1 cc-swiper.ts:237 img の src="${thumbnailUrl}"        … HTML 属性
//   S2 cc-swiper.ts:237 img の data-image-url="${imageUrl}" … HTML 属性
//   S3 cc-swiper.ts:246 style="background-image: url('…')"  … CSS
//   S7 cc-swiper.ts:238 <p class="slider-caption">${caption}</p> … HTML コンテンツ

import { describe, test, expect, beforeEach } from "vitest";
import "../src/index";

/** 属性文脈用の payload。ダブルクォートで属性を閉じて別属性を注入する */
const ATTR_PAYLOAD = 'x" onmouseover="alert(1)';
/** CSS 文脈用の payload。シングルクォートで url() を閉じて別宣言を注入する */
const CSS_PAYLOAD = "x') ; background: url('y";
/** HTML コンテンツ文脈用の payload。innerHTML では script は動かないが img の onerror は動く */
const HTML_PAYLOAD = '<img src=x onerror="alert(1)">';
/** 正系（AC4）。壊してはならない実在しうる URL */
const BENIGN_URL = "https://example.com/path/a%20b.jpg?q=1&r=2";

function buildSwiper(attrs: Record<string, string>): HTMLElement {
  const swiper = document.createElement("cc-swiper");
  const slide = document.createElement("cc-swiper-slide");
  for (const [k, v] of Object.entries(attrs)) slide.setAttribute(k, v);
  swiper.appendChild(slide);
  document.body.appendChild(swiper);
  return swiper;
}

const shadow = (el: HTMLElement): ShadowRoot => {
  const root = el.shadowRoot;
  if (!root) throw new Error("shadowRoot が生成されていない");
  return root;
};

describe("m1-t9: cc-swiper の注入対策", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("S1: thumbnail-url が img の src を破って別属性を注入できない", () => {
    const el = buildSwiper({ "thumbnail-url": ATTR_PAYLOAD });
    const img = shadow(el).querySelector("img.viewer");
    expect(img, "スライドの img が生成されていること").not.toBeNull();
    // 属性ブレイクアウトが成立していれば onmouseover 属性が生えている
    expect(img!.hasAttribute("onmouseover")).toBe(false);
    // 値そのものは失われず属性値として保持されること
    expect(img!.getAttribute("src")).toBe(ATTR_PAYLOAD);
  });

  test("S2: image-url が img の data-image-url を破って別属性を注入できない", () => {
    const el = buildSwiper({ "image-url": ATTR_PAYLOAD });
    const img = shadow(el).querySelector("img.viewer");
    expect(img).not.toBeNull();
    expect(img!.hasAttribute("onmouseover")).toBe(false);
    expect(img!.getAttribute("data-image-url")).toBe(ATTR_PAYLOAD);
  });

  test("S3: thumbnail-url が gallery の background-image を破って別宣言を注入できない", () => {
    const el = buildSwiper({ "thumbnail-url": CSS_PAYLOAD });
    const thumb = shadow(el).querySelector<HTMLElement>(".gallery-thumb");
    expect(thumb, "gallery のサムネイルが生成されていること").not.toBeNull();
    // S3 の安全性は「**別の CSS 宣言が注入されていない**」ことである。
    // 宣言の件数で直接測る。注入が成立していれば background 等が増える。
    //
    // 注意: payload 自体が `url('` という文字列を含むため、値の中の "url(" を
    // 数える測り方は誤りである（是正済みでも 2 件と数えてしまう）。
    expect(
      Array.from(thumb!.style),
      "設定されている CSS 宣言は background-image の1件だけであること"
    ).toEqual(["background-image"]);
    expect(thumb!.style.getPropertyValue("background")).toBe("");
    // 値は url("…") ひとつで、中身は payload そのもの（欠落も分割もしていない）
    const bgImage = thumb!.style.getPropertyValue("background-image");
    expect(bgImage.startsWith('url("')).toBe(true);
    expect(bgImage.endsWith('")')).toBe(true);
    expect(bgImage.slice(5, -2)).toBe(CSS_PAYLOAD);
  });

  test("S7: caption が HTML として解釈されない", () => {
    const el = buildSwiper({ caption: HTML_PAYLOAD });
    const root = shadow(el);
    // 注入が成立していれば caption 由来の img が生える。
    // スライド本体の img.viewer は正規のものなので除外して数える。
    const injected = Array.from(root.querySelectorAll("img")).filter(
      (i) => !i.classList.contains("viewer")
    );
    expect(injected.length, "caption 由来の img が生成されていないこと").toBe(0);
    // テキストとしては保持されること
    const p = root.querySelector(".slider-caption");
    expect(p, "caption の要素が生成されていること").not.toBeNull();
    expect(p!.textContent).toBe(HTML_PAYLOAD);
  });

  test("AC4 正系: 通常の URL と caption が従来どおり描画される（cc-swiper）", () => {
    const el = buildSwiper({
      "thumbnail-url": BENIGN_URL,
      "image-url": BENIGN_URL,
      "image-type": "panorama",
      caption: "普通のキャプション"
    });
    const root = shadow(el);
    const img = root.querySelector("img.viewer");
    expect(img).not.toBeNull();
    expect(img!.getAttribute("src")).toBe(BENIGN_URL);
    expect(img!.getAttribute("data-image-url")).toBe(BENIGN_URL);
    expect(img!.getAttribute("data-image-type")).toBe("panorama");
    expect(img!.getAttribute("data-index")).toBe("0");

    const p = root.querySelector(".slider-caption");
    expect(p!.textContent).toBe("普通のキャプション");

    const thumb = root.querySelector<HTMLElement>(".gallery-thumb");
    const bgImage = thumb!.style.getPropertyValue("background-image");
    // URL が欠けたり壊れたりしていないこと（CSS.escape を使うとここが落ちる）
    expect(bgImage).toContain(BENIGN_URL);
  });
});

// ─────────────────────────────────────────────────────────────
// S5 / S6: 各ビューアが URL を生補間するシンク
//
// 配線（設計 §2.3 で実測）: cc-swiper が getAttribute で読んだ値を
// openViewer → ccView.open → 各ビューアの doOpen(url) へ渡す。
// したがって image-type の値しだいで同じ POI 由来値がここへ到達する。
//
// open() は doOpen を microtask 後に render するため、assert の前に待つ。
const flush = () => new Promise<void>(r => setTimeout(r, 0));

describe("m1-t9: 各ビューアの注入対策", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("S5: youtube の iframe src が属性を破って別属性を注入できない", async () => {
    const el = document.createElement("cc-viewer-youtube") as HTMLElement & {
      open(url: string): void;
    };
    document.body.appendChild(el);
    // YouTube ID として抽出できない値は生 URL がそのまま videoUrl になる（:23）
    el.open(ATTR_PAYLOAD);
    await flush();

    const iframe = shadow(el).querySelector("iframe.iframe");
    expect(iframe, "iframe が生成されていること").not.toBeNull();
    expect(iframe!.hasAttribute("onmouseover")).toBe(false);
    expect(iframe!.getAttribute("src")).toBe(ATTR_PAYLOAD);
  });

  test("S6: video の src が属性を破って別属性を注入できない", async () => {
    const el = document.createElement("cc-viewer-video") as HTMLElement & {
      open(url: string): void;
    };
    document.body.appendChild(el);
    el.open(ATTR_PAYLOAD);
    await flush();

    const video = shadow(el).querySelector("video");
    expect(video, "video が生成されていること").not.toBeNull();
    expect(video!.hasAttribute("onmouseover")).toBe(false);
    expect(video!.getAttribute("src")).toBe(ATTR_PAYLOAD);
  });

  test("S6(:95): video のエラー表示が HTML として解釈されない", async () => {
    const el = document.createElement("cc-viewer-video") as HTMLElement & {
      open(url: string): void;
    };
    document.body.appendChild(el);
    el.open(HTML_PAYLOAD);
    await flush();

    const video = shadow(el).querySelector("video");
    expect(video).not.toBeNull();
    // 読み込み失敗を発火させてエラー表示経路へ入る
    video!.dispatchEvent(new Event("error"));

    const err = shadow(el).querySelector(".video-error");
    expect(err, "エラー表示が出ていること").not.toBeNull();
    expect(err!.querySelectorAll("img").length, "payload が img として生成されていないこと").toBe(0);
    expect(err!.textContent).toContain(HTML_PAYLOAD);
  });

  test("AC4 正系: 通常の URL で youtube / video が従来どおり描画される", async () => {
    const yt = document.createElement("cc-viewer-youtube") as HTMLElement & { open(u: string): void };
    document.body.appendChild(yt);
    yt.open("https://www.youtube.com/watch?v=abc123XYZ");
    await flush();
    expect(shadow(yt).querySelector("iframe.iframe")!.getAttribute("src")).toBe(
      "https://www.youtube.com/embed/abc123XYZ"
    );

    const vd = document.createElement("cc-viewer-video") as HTMLElement & { open(u: string): void };
    document.body.appendChild(vd);
    vd.open(BENIGN_URL);
    await flush();
    expect(shadow(vd).querySelector("video")!.getAttribute("src")).toBe(BENIGN_URL);
  });
});

// ─────────────────────────────────────────────────────────────
// S4: panorama の iframe srcdoc
//
// 契約（設計 §5 D1 の S4）: **srcdoc に外部由来値を一切埋めない**。
// 値の受け渡しは postMessage に確定している（contentDocument は採らない。
// sandbox="allow-scripts" では opaque origin になり遮断されるため）。
//
// onAfterRender は setTimeout(…, 0) 経由なので待つ。
describe("m1-t9: panorama の srcdoc 契約（S4）と SRI（D5）", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  const openPanorama = async (url: string) => {
    const el = document.createElement("cc-viewer-panorama") as HTMLElement & {
      open(u: string): void;
    };
    el.setAttribute("show", "true");
    document.body.appendChild(el);
    el.open(url);
    await new Promise<void>(r => setTimeout(r, 10));
    return el;
  };

  test("S4: srcdoc に外部由来値が一切含まれない", async () => {
    const el = await openPanorama(ATTR_PAYLOAD);
    const iframe = shadow(el).querySelector<HTMLIFrameElement>("iframe.iframe");
    expect(iframe, "iframe が生成されていること").not.toBeNull();
    const srcdoc = iframe!.getAttribute("srcdoc") || "";
    expect(srcdoc.length, "srcdoc が組み立てられていること").toBeGreaterThan(0);
    // payload の断片すら現れないこと（分割して埋めていないことも見る）
    expect(srcdoc).not.toContain(ATTR_PAYLOAD);
    expect(srcdoc).not.toContain("onmouseover");
  });

  test("S4: 正常な URL でも srcdoc には埋めない（契約は値によらない）", async () => {
    const el = await openPanorama(BENIGN_URL);
    const iframe = shadow(el).querySelector<HTMLIFrameElement>("iframe.iframe");
    const srcdoc = iframe!.getAttribute("srcdoc") || "";
    expect(srcdoc).not.toContain(BENIGN_URL);
  });

  test("D5: aframe の script に integrity と crossorigin が付与されている", async () => {
    const el = await openPanorama(BENIGN_URL);
    const iframe = shadow(el).querySelector<HTMLIFrameElement>("iframe.iframe");
    const srcdoc = iframe!.getAttribute("srcdoc") || "";
    expect(srcdoc).toContain("aframe.min.js");
    expect(srcdoc).toContain(
      "sha384-rrkicQnp5c3ysj7SGZ2b/wF2W7mu6NQQMy4w63/dfRnMLkCL1d0IX4i3IOkYi2pj"
    );
    expect(srcdoc).toContain('crossorigin="anonymous"');
  });
});
