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

  test("AC4 正系: 通常の URL と caption が従来どおり描画される", () => {
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
