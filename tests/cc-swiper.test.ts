import { afterEach, describe, expect, test, vi } from "vitest";
import "../src/index";
import type { CcSwiper } from "../src/components/swiper/cc-swiper";

function makeSwiper(count = 3, attrs: Record<string, string> = {}): CcSwiper {
  const el = document.createElement("cc-swiper");
  for (const [name, value] of Object.entries(attrs))
    el.setAttribute(name, value);
  for (let i = 0; i < count; i++) {
    const slide = document.createElement("cc-swiper-slide");
    slide.setAttribute("image-url", `https://example.com/${i}.jpg`);
    slide.setAttribute(
      "caption",
      i === 0 ? "<img src=x onerror=1>" : `Caption ${i}`
    );
    el.append(slide);
  }
  document.body.append(el);
  return el;
}

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = "";
});

describe("CcSwiper", () => {
  test("goTo wraps in loop mode and clamps otherwise", () => {
    const loop = makeSwiper(3);
    loop.goTo(-1);
    expect(loop.index).toBe(2);
    const fixed = makeSwiper(1);
    fixed.goTo(4);
    expect(fixed.index).toBe(0);
    expect(fixed.loop).toBe(false);
  });

  test("click without movement opens viewer at that index", () => {
    const el = makeSwiper(2);
    const open = vi.spyOn(el, "openViewer").mockResolvedValue();
    const slide =
      el.shadowRoot!.querySelector<HTMLElement>('[data-index="1"]')!;
    slide.dispatchEvent(
      new PointerEvent("pointerdown", {
        bubbles: true,
        pointerId: 1,
        clientX: 10
      })
    );
    slide.dispatchEvent(
      new PointerEvent("pointerup", {
        bubbles: true,
        pointerId: 1,
        clientX: 10
      })
    );
    expect(open).toHaveBeenCalledWith(1);
  });

  test("small tap movement returns the track to its slide position", () => {
    const el = makeSwiper(2);
    vi.spyOn(el, "openViewer").mockResolvedValue();
    Reflect.set(el, "width", 100);
    const slide = el.shadowRoot!.querySelector<HTMLElement>('[data-index="0"]')!;
    slide.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, pointerId: 2, clientX: 20 }));
    slide.dispatchEvent(new PointerEvent("pointermove", { bubbles: true, pointerId: 2, clientX: 24 }));
    expect(slide.style.transform).toContain("4px");
    slide.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, pointerId: 2, clientX: 24 }));
    expect(slide.style.transform).not.toContain("4px");
  });

  test("drag beyond threshold moves to next and does not open viewer", () => {
    const el = makeSwiper(3);
    const open = vi.spyOn(el, "openViewer").mockResolvedValue();
    const viewport = el.shadowRoot!.querySelector<HTMLElement>("#viewport")!;
    Object.defineProperty(viewport, "getBoundingClientRect", {
      value: () => ({
        width: 100,
        height: 100,
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        right: 100,
        bottom: 100,
        toJSON() {}
      })
    });
    Reflect.set(el, "width", 100);
    const slide =
      el.shadowRoot!.querySelector<HTMLElement>('[data-index="0"]')!;
    slide.dispatchEvent(
      new PointerEvent("pointerdown", {
        bubbles: true,
        pointerId: 1,
        clientX: 90
      })
    );
    slide.dispatchEvent(
      new PointerEvent("pointermove", {
        bubbles: true,
        pointerId: 1,
        clientX: 40
      })
    );
    slide.dispatchEvent(
      new PointerEvent("pointerup", {
        bubbles: true,
        pointerId: 1,
        clientX: 40
      })
    );
    expect(el.index).toBe(1);
    expect(open).not.toHaveBeenCalled();
  });

  test("pointer events do not propagate to the map container", () => {
    const outer = document.createElement("div");
    const listener = vi.fn();
    document.body.append(outer);
    const el = makeSwiper(2);
    outer.append(el);
    outer.addEventListener("pointerdown", listener);
    el.shadowRoot!.querySelector("#viewport")!.dispatchEvent(
      new PointerEvent("pointerdown", { bubbles: true, composed: true })
    );
    expect(listener).not.toHaveBeenCalled();
  });

  test("pointer, wheel, and click from controls do not reach the map", () => {
    const outer = document.createElement("div");
    const listener = vi.fn();
    document.body.append(outer);
    const el = makeSwiper(2, { "has-thumb": "" });
    outer.append(el);
    for (const name of ["pointerdown", "wheel", "click"])
      outer.addEventListener(name, listener);
    const thumb = el.shadowRoot!.querySelector<HTMLElement>(".gallery-thumb")!;
    thumb.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, composed: true }));
    thumb.dispatchEvent(new WheelEvent("wheel", { bubbles: true, composed: true }));
    thumb.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true }));
    expect(listener).not.toHaveBeenCalled();
  });

  test("autoplay advances every 5000 ms and pauses while viewer open", async () => {
    vi.useFakeTimers();
    const el = makeSwiper(3, { autoplay: "" });
    vi.advanceTimersByTime(5000);
    expect(el.index).toBe(1);
    await el.openViewer(0);
    vi.advanceTimersByTime(5000);
    expect(el.index).toBe(1);
    el.setAttribute("has-thumb", "");
    expect(vi.getTimerCount()).toBe(0);
    document.dispatchEvent(new CustomEvent("cc-viewer-close"));
    vi.advanceTimersByTime(5000);
    expect(el.index).toBe(2);
  });

  test("ArrowRight key moves next", () => {
    const el = makeSwiper(3);
    el.dispatchEvent(
      new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true })
    );
    expect(el.index).toBe(1);
  });

  test("dots jump; >8 items shows counter; has-thumb hides dots and shows thumb strip", () => {
    const dots = makeSwiper(3);
    dots
      .shadowRoot!.querySelector<HTMLButtonElement>(".cc-bar-dot:last-child")!
      .click();
    expect(dots.index).toBe(2);
    expect(
      makeSwiper(9).shadowRoot!.querySelector(".cc-bar-counter")?.textContent
    ).toBe("1 / 9");
    const thumbs = makeSwiper(3, { "has-thumb": "" });
    expect(thumbs.shadowRoot!.querySelector(".cc-bar-dot")).toBeNull();
    expect(thumbs.shadowRoot!.querySelectorAll(".gallery-thumb")).toHaveLength(
      3
    );
  });

  test("rebuilds on slide change without leaking timers", async () => {
    vi.useFakeTimers();
    const el = makeSwiper(1, { autoplay: "" });
    expect(vi.getTimerCount()).toBe(0);
    const slide = document.createElement("cc-swiper-slide");
    slide.setAttribute("image-url", "https://example.com/1.jpg");
    el.append(slide);
    await Promise.resolve();
    expect(el.items).toHaveLength(2);
    expect(el.shadowRoot!.querySelectorAll(".cc-slide")).toHaveLength(2);
    expect(vi.getTimerCount()).toBe(1);
    el.goTo(1);
    expect(el.shadowRoot!.querySelectorAll(".cc-slide")).toHaveLength(2);
    expect(vi.getTimerCount()).toBe(1);
    el.removeChild(slide);
    await Promise.resolve();
    expect(el.items).toHaveLength(1);
    expect(el.shadowRoot!.querySelectorAll(".cc-slide")).toHaveLength(1);
    expect(vi.getTimerCount()).toBe(0);
  });

  test("goTo retains panels and thumbnail sources while animating", () => {
    const el = makeSwiper(2, { "has-thumb": "" });
    Reflect.set(el, "width", 100);
    Reflect.get(el, "setThumbnailSource").call(
      el,
      1,
      "https://example.com/generated.jpg"
    );
    const panel = el.shadowRoot!.querySelector(".cc-slide");
    el.goTo(1);
    expect(el.shadowRoot!.querySelector(".cc-slide")).toBe(panel);
    expect(el.shadowRoot!.querySelector<HTMLImageElement>('[data-thumb-index="1"]')!.getAttribute("src"))
      .toBe("https://example.com/generated.jpg");
    expect((panel as HTMLElement).style.transition).toContain("250ms");
  });

  test("viewer index notifications only update the owning swiper", async () => {
    const first = makeSwiper(3, { autoplay: "" });
    const second = makeSwiper(3, { autoplay: "" });
    await first.openViewer(0);
    await second.openViewer(0);
    document.dispatchEvent(new CustomEvent("cc-viewer-index-change", { detail: { index: 2 } }));
    expect(first.index).toBe(0);
    expect(second.index).toBe(2);
    document.dispatchEvent(new CustomEvent("cc-viewer-close"));
  });

  test("recomputes layout when width becomes non-zero", () => {
    let callback: ResizeObserverCallback | undefined;
    class TestResizeObserver {
      constructor(cb: ResizeObserverCallback) {
        callback = cb;
      }
      observe() {}
      disconnect() {}
    }
    vi.stubGlobal("ResizeObserver", TestResizeObserver);
    const el = makeSwiper(2);
    const track = el.shadowRoot!.querySelector<HTMLElement>(".cc-slide")!;
    const before = track.style.transform;
    callback?.(
      [{ contentRect: { width: 300 } } as ResizeObserverEntry],
      {} as ResizeObserver
    );
    expect(track.style.transform).not.toBe(before);
    vi.unstubAllGlobals();
  });

  test("caption is not interpreted as HTML", () => {
    const el = makeSwiper(1);
    const root = el.shadowRoot!;
    expect(root.querySelector(".cc-bar-caption")?.textContent).toBe(
      "<img src=x onerror=1>"
    );
    expect(root.querySelectorAll(".cc-bar-caption img")).toHaveLength(0);
  });

  test("empty caption and gallery do not occupy layout rows", () => {
    const one = makeSwiper(1);
    one.querySelector("cc-swiper-slide")!.removeAttribute("caption");
    one.goTo(0);
    const root = one.shadowRoot!;
    expect(root.querySelector<HTMLElement>("#caption")!.hidden).toBe(true);
    expect(root.querySelector<HTMLElement>("#gallery")!.hidden).toBe(true);
    expect(root.querySelector("style")!.textContent).toContain("#gallery[hidden]");
  });
});
