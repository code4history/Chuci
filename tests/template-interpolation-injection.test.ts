// 生テンプレート補間による注入の回帰テスト
//
// 起票元: 包括セキュリティレビューの指摘（Major）
//
// なぜ「送り手側（@maplat/core）が守っているから不要」ではないか:
//   Chuci は独立した公開パッケージであり、@maplat/core を介さず直接使われ得る。
//   利用者が別版の @maplat/core を引けば送り手側の防御は消える。
//   したがって本テストは **属性へ直接 payload を置く**。送り手が守ってくれるという
//   前提を置かないことが是正の趣旨そのものである。
//
// cc-swiper の生成 DOM に対して、外部由来値が HTML として解釈されないことを確認する。

import { describe, test, expect, beforeEach } from "vitest";
import { readMediaItem } from "../src/index";

/** 属性文脈用の payload。ダブルクォートで属性を閉じて別属性を注入する */
const ATTR_PAYLOAD = 'x" onmouseover="alert(1)';
/** CSS 文脈用の payload。シングルクォートで url() を閉じて別宣言を注入する */
const CSS_PAYLOAD = "x') ; background: url('y";
/** HTML コンテンツ文脈用の payload。innerHTML では script は動かないが img の onerror は動く */
const HTML_PAYLOAD = '<img src=x onerror="alert(1)">';
/** 正系。壊してはならない実在しうる URL */
const BENIGN_URL = "https://example.com/path/a%20b.jpg?q=1&r=2";

function buildSwiper(attrs: Record<string, string>): HTMLElement {
  const swiper = document.createElement("cc-swiper");
  // has-thumb so that the gallery thumbnails (thumbnail-url) are built too
  swiper.setAttribute("has-thumb", "");
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

describe("cc-swiper の注入対策", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("S1: thumbnail-url が img の src を破って別属性を注入できない", () => {
    const el = buildSwiper({ "thumbnail-url": ATTR_PAYLOAD });
    const img = shadow(el).querySelector(".cc-slide img");
    expect(img, "スライドの img が生成されていること").not.toBeNull();
    // 属性ブレイクアウトが成立していれば onmouseover 属性が生えている
    expect(img!.hasAttribute("onmouseover")).toBe(false);
    // 値そのものは失われず属性値として保持されること
    expect(img!.getAttribute("src")).toBe(ATTR_PAYLOAD);
  });

  test("S2: image-url が img の data-image-url を破って別属性を注入できない", () => {
    const el = buildSwiper({ "image-url": ATTR_PAYLOAD });
    const img = shadow(el).querySelector(".cc-slide img");
    expect(img).not.toBeNull();
    expect(img!.hasAttribute("onmouseover")).toBe(false);
    expect(img!.getAttribute("data-image-url")).toBe(ATTR_PAYLOAD);
  });

  test("S3: thumbnail-url がサムネイル要素へ HTML を注入できない", () => {
    // S3 の安全性は「外部値が HTML として解釈されず、値を属性値として保持する」こと。
    const el = buildSwiper({ "thumbnail-url": CSS_PAYLOAD });
    const thumb = shadow(el).querySelector<HTMLImageElement>(".gallery-thumb");
    expect(thumb, "gallery のサムネイルが生成されていること").not.toBeNull();
    expect(thumb!.getAttribute("onerror")).toBeNull();
    expect(thumb!.getAttribute("src")).toBe(CSS_PAYLOAD);
    expect(shadow(el).querySelectorAll(".gallery-thumb img")).toHaveLength(0);
  });

  test("has-thumb の img src で属性境界文字列が別属性にならない", () => {
    const payload = 'x" onerror="alert(1)';
    const el = buildSwiper({ "thumbnail-url": payload });
    const thumb = shadow(el).querySelector<HTMLImageElement>(".gallery-thumb");
    expect(thumb).not.toBeNull();
    expect(thumb!.hasAttribute("onerror")).toBe(false);
    expect(thumb!.getAttribute("src")).toBe(payload);
  });

  test("S7: caption が HTML として解釈されない", () => {
    const el = buildSwiper({ caption: HTML_PAYLOAD });
    const root = shadow(el);
    // 注入が成立していれば caption 由来の img が生える。
    // スライド本体の img.viewer は正規のものなので除外して数える。
    const injected = Array.from(root.querySelectorAll("img")).filter(
      (i) =>
        !i.classList.contains("viewer") &&
        !i.classList.contains("gallery-thumb")
    );
    expect(injected.length, "caption 由来の img が生成されていないこと").toBe(
      0
    );
    // テキストとしては保持されること
    const p = root.querySelector(".cc-bar-caption");
    expect(p, "caption の要素が生成されていること").not.toBeNull();
    expect(p!.textContent).toBe(HTML_PAYLOAD);
  });

  test("正系: 通常の URL と caption が従来どおり描画される（cc-swiper）", () => {
    const el = buildSwiper({
      "thumbnail-url": BENIGN_URL,
      "image-url": BENIGN_URL,
      "image-type": "panorama",
      caption: "普通のキャプション"
    });
    const root = shadow(el);
    const img = root.querySelector(".cc-slide img");
    expect(img).not.toBeNull();
    expect(img!.getAttribute("src")).toBe(BENIGN_URL);
    expect(img!.getAttribute("data-image-url")).toBe(BENIGN_URL);
    expect(img!.getAttribute("data-image-type")).toBe("panorama");
    expect(img!.getAttribute("data-index")).toBe("0");

    const p = root.querySelector(".cc-bar-caption");
    expect(p!.textContent).toBe("普通のキャプション");

    const thumb = root.querySelector<HTMLImageElement>(".gallery-thumb");
    expect(thumb!.getAttribute("src")).toBe(BENIGN_URL);
  });
});

// スライド属性から読み取った値を、共通外枠を通して描画部へ渡す。
const flush = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

function openViewer(type: string, url: string, caption = "") {
  const slide = document.createElement("cc-swiper-slide");
  slide.setAttribute("image-type", type);
  slide.setAttribute("image-url", url);
  slide.setAttribute("caption", caption);
  const viewer = document.createElement("cc-viewer");
  document.body.append(viewer);
  viewer.open([readMediaItem(slide)], 0);
  return shadow(viewer);
}

describe("共通ビューアと描画部の注入対策", () => {
  test.each([ATTR_PAYLOAD, BENIGN_URL])("S5: youtube は不正な URL %s を iframe に設定しない", async (url) => {
    const root = openViewer("youtube", url);
    await flush();

    const iframe = root.querySelector("iframe");
    expect(iframe, "iframe が生成されていること").not.toBeNull();
    expect(iframe!.hasAttribute("onmouseover")).toBe(false);
    expect(iframe!.hasAttribute("src")).toBe(false);
    expect(root.querySelector<HTMLElement>(".viewer-error")!.hidden).toBe(false);
  });

  test("S6: video の src が属性を破って別属性を注入できない", async () => {
    const root = openViewer("video", ATTR_PAYLOAD);
    await flush();

    const video = root.querySelector("video");
    expect(video, "video が生成されていること").not.toBeNull();
    expect(video!.hasAttribute("onmouseover")).toBe(false);
    expect(video!.getAttribute("src")).toBe(ATTR_PAYLOAD);
  });

  test("S6: video のエラー表示が HTML として解釈されない", async () => {
    const root = openViewer("video", HTML_PAYLOAD);
    await flush();

    const video = root.querySelector("video");
    expect(video).not.toBeNull();
    video!.dispatchEvent(new Event("error"));
    await flush();

    const error = root.querySelector<HTMLElement>(".viewer-error");
    expect(error, "エラー表示が出ていること").not.toBeNull();
    expect(error!.hidden).toBe(false);
    expect(error!.querySelectorAll("img")).toHaveLength(0);
    expect(error!.textContent).toContain(HTML_PAYLOAD);
  });

  test("外枠の caption が HTML として解釈されない", () => {
    const root = openViewer("video", BENIGN_URL, HTML_PAYLOAD);
    expect(root.querySelector(".cc-bar-caption")!.textContent).toBe(HTML_PAYLOAD);
    expect(root.querySelector(".cc-bar-caption img")).toBeNull();
  });

  test("正系: 通常の URL で youtube / video が従来どおり描画される", async () => {
    const yt = openViewer("youtube", "https://www.youtube.com/watch?v=abc123XYZ");
    await flush();
    expect(yt.querySelector("iframe")!.getAttribute("src")).toBe(
      "https://www.youtube.com/embed/abc123XYZ"
    );

    const vd = openViewer("video", BENIGN_URL);
    await flush();
    expect(vd.querySelector("video")!.getAttribute("src")).toBe(BENIGN_URL);
  });

  test.each([ATTR_PAYLOAD, BENIGN_URL])(
    "S4: panorama は URL %s から iframe やスクリプトを生成しない",
    async (url) => {
      const root = openViewer("panorama", url);
      await flush();

      const host = root.querySelector(".renderer-host");
      expect(host).not.toBeNull();
      expect(host!.querySelector("iframe, [srcdoc], script, img, [onmouseover]")).toBeNull();
    }
  );
});
