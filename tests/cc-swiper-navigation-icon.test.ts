// oct26-m9-t1 AC-9: swiper 12 のナビゲーション矢印が二重に描かれる件の回帰テスト
//
// 設計書: docs/superpowers/specs/2026-09-14-oct26-m9-t1-design.md v2 §6
//
// swiper 12 の Navigation モジュールは addIcons: true（既定）のとき、空の
// .swiper-button-prev / .swiper-button-next に <svg class="swiper-navigation-icon"> を挿入する。
// cc-swiper は swiper 11 までのアイコンフォントの置き換えとして ::after に chevron を描いているため、
// 両方が描かれて矢印が 2 本ずつになる。swiper の SVG を display: none にする 1 規則で単一化する。
//
// 本テストは shadowRoot の <style> 本文の文字列照合である（見た目は jsdom では判定できない）。
// 見た目（computed display・::after の寸法）は Maplat の e2e/oct26-m9-t1-chuci-arrow.spec.ts
// （monorepo 経路）が判定する。

import { describe, test, expect, beforeEach } from "vitest";
import "../src/index";

function buildSwiper(count: number): HTMLElement {
  const swiper = document.createElement("cc-swiper");
  for (let i = 0; i < count; i++) {
    const slide = document.createElement("cc-swiper-slide");
    slide.setAttribute("image-url", `https://example.com/${i}.jpg`);
    slide.setAttribute("thumbnail-url", `https://example.com/${i}.jpg`);
    swiper.appendChild(slide);
  }
  document.body.appendChild(swiper);
  return swiper;
}

/** shadowRoot 内の全 <style> 本文を連結し、CSS コメントを除いて空白を正規化する（空白・注記の差で結果が変わらないようにする） */
function styleText(el: HTMLElement): string {
  const root = el.shadowRoot;
  if (!root) throw new Error("shadowRoot が生成されていない");
  return Array.from(root.querySelectorAll("style"))
    .map(s => s.textContent || "")
    .join("\n")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ");
}

/** セレクタ群とその宣言ブロックを持つ規則を探す（空白正規化済みの本文に対して） */
function findRule(css: string, selector: string): string[] {
  const blocks: string[] = [];
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(css)) !== null) {
    const selectors = m[1].split(",").map(s => s.trim());
    if (selectors.includes(selector)) blocks.push(m[2]);
  }
  return blocks;
}

describe("oct26-m9-t1 AC-9: cc-swiper のナビゲーション矢印の単一化", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("swiper 12 の SVG アイコン（prev）を display: none にする規則がある", () => {
    const css = styleText(buildSwiper(2));
    const blocks = findRule(css, ".swiper-button-prev .swiper-navigation-icon");
    expect(blocks.some(b => /display\s*:\s*none/.test(b))).toBe(true);
  });

  test("swiper 12 の SVG アイコン（next）を display: none にする規則がある", () => {
    const css = styleText(buildSwiper(2));
    const blocks = findRule(css, ".swiper-button-next .swiper-navigation-icon");
    expect(blocks.some(b => /display\s*:\s*none/.test(b))).toBe(true);
  });

  test("既存の ::after の chevron 規則（prev / next）は残っている", () => {
    const css = styleText(buildSwiper(2));
    for (const sel of [".swiper-button-prev:after", ".swiper-button-next:after"]) {
      const blocks = findRule(css, sel);
      expect(blocks.length, `${sel} の規則`).toBeGreaterThan(0);
      expect(blocks.some(b => /background-image\s*:\s*url\("data:image\/svg\+xml/.test(b))).toBe(true);
      expect(blocks.some(b => /content\s*:\s*''/.test(b))).toBe(true);
    }
  });
});
