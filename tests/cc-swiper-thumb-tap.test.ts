// Issue #5: cc-swiper has-thumb でサムネイルを tap するたびに
// TypeError: Cannot read properties of undefined (reading 'swiper') が出る件の回帰テスト
//
// 原因: 要素の upgrade 時に attributeChangedCallback(has-thumb) と connectedCallback が続けて
// render() を呼び、initializeSwiper() が同じ DOM に対して 2 回走る。2 回目は 1 回目の main を
// destroy() するが、thumbs に Swiper インスタンスを渡した場合 Swiper の Thumbs モジュールは
// thumbs 側を破棄しない。1 回目の thumbs Swiper は同じ #divGallery に pointerdown を残したまま
// 生き続け、その tap で破棄済み main の onThumbClick が呼ばれて `swiper.thumbs.swiper` で落ちる。
//
// `element.click()` では Swiper の tap が発火しないため、pointerdown / pointerup を送って
// Swiper のタッチ処理（onTouchStart → onTouchEnd → emit('tap')）を通す。

import { describe, test, expect, beforeEach, afterEach } from "vitest";
import "../src/index";

function buildThumbSwiper(count: number): HTMLElement {
  const swiper = document.createElement("cc-swiper");
  // デモ（パーサ生成）と同じく、接続前に has-thumb が付いている状態にする
  swiper.setAttribute("has-thumb", "");
  for (let i = 0; i < count; i++) {
    const slide = document.createElement("cc-swiper-slide");
    slide.setAttribute("image-url", `https://example.com/${i}.jpg`);
    slide.setAttribute("thumbnail-url", `https://example.com/thumb-${i}.jpg`);
    swiper.appendChild(slide);
  }
  document.body.appendChild(swiper);
  return swiper;
}

/** render() が積む setTimeout(initializeSwiper) をすべて消化させる */
function flushInit(): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, 20));
}

/** Swiper のタッチ処理を通るポインター操作（マウスの左ボタンで押して離す） */
function tap(el: Element, pointerId: number) {
  const rect = { clientX: 10, clientY: 10, pageX: 10, pageY: 10 };
  const init = { bubbles: true, composed: true, cancelable: true, pointerId, pointerType: "mouse", button: 0, isPrimary: true, ...rect };
  el.dispatchEvent(new PointerEvent("pointerdown", init));
  el.dispatchEvent(new PointerEvent("pointerup", init));
}

describe("Issue #5: has-thumb のサムネイル tap で破棄済み Swiper のハンドラが呼ばれない", () => {
  const errors: unknown[] = [];
  const onError = (e: ErrorEvent) => {
    errors.push(e.error ?? e.message);
    e.preventDefault();
  };

  beforeEach(() => {
    document.body.innerHTML = "";
    errors.length = 0;
    window.addEventListener("error", onError);
  });

  afterEach(() => {
    window.removeEventListener("error", onError);
  });

  test("サムネイルを順に tap してもエラーが出ない", async () => {
    const el = buildThumbSwiper(4);
    await flushInit();

    const thumbs = Array.from(el.shadowRoot!.querySelectorAll(".gallery-thumb"));
    expect(thumbs.length).toBe(4);

    thumbs.forEach((thumb, i) => tap(thumb, i + 1));

    expect(errors.map(e => String(e))).toEqual([]);
  });

  test("サムネイルの tap を受ける Swiper は現役の thumbs Swiper 1 つだけ", async () => {
    const el = buildThumbSwiper(4);
    await flushInit();

    // 現役の thumbs Swiper は #divGallery.swiper に載る（破棄された Swiper は el.swiper を null にする）。
    // 同じ要素に別の Swiper の残骸が pointerdown を張っていれば、1 回の tap で tap が 2 回 emit される。
    const gallery = el.shadowRoot!.querySelector<HTMLElement>("#divGallery")!;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const current = (gallery as any).swiper;
    expect(current).toBeTruthy();

    const proto = Object.getPrototypeOf(current);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const origEmit = proto.emit as (...a: any[]) => unknown;
    const tapped = new Set<unknown>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    proto.emit = function (this: unknown, ...args: any[]) {
      if (typeof args[0] === "string" && args[0].split(" ").includes("tap")) tapped.add(this);
      return origEmit.apply(this, args);
    };
    try {
      tap(el.shadowRoot!.querySelectorAll(".gallery-thumb")[2], 99);
    } finally {
      proto.emit = origEmit;
    }
    expect(tapped.size).toBe(1);
    expect(tapped.has(current)).toBe(true);
  });

  test("再初期化の後もサムネイルの background-image が残っている", async () => {
    const el = buildThumbSwiper(4);
    await flushInit();

    const thumbs = Array.from(el.shadowRoot!.querySelectorAll<HTMLElement>(".gallery-thumb"));
    expect(thumbs.length).toBe(4);
    thumbs.forEach((thumb, i) => {
      expect(thumb.style.getPropertyValue("background-image")).toContain(`thumb-${i}.jpg`);
    });
  });
});
