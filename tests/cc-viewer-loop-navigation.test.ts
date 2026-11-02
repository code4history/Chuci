// In loop mode Swiper reorders the slide DOM, so the internal index used by
// slideTo() no longer matches the real slide number (realIndex). These tests
// keep the viewer and the swiper behind it pointing at the same slide.

import { describe, test, expect, beforeEach, vi } from "vitest";
import "../src/index";

function fakeSlides(count: number): HTMLElement[] {
  return Array.from({ length: count }, (_, i) => {
    const slide = document.createElement("div");
    slide.setAttribute("image-url", `https://example.com/${i}.jpg`);
    slide.setAttribute("image-type", "image");
    return slide;
  });
}

function fakeSlider(loop: boolean) {
  return {
    params: { loop },
    slideTo: vi.fn(),
    slideToLoop: vi.fn(),
  };
}

function flush(ms = 20): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe("cc-viewer moves the swiper to the real slide number", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("navigate-next in loop mode uses slideToLoop and not slideTo", () => {
    const viewer = document.createElement("cc-viewer");
    document.body.appendChild(viewer);
    const slider = fakeSlider(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (viewer as any).setSwiper({ slides: fakeSlides(5), slider });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (viewer as any).setCurrentSlideIndex(0);

    viewer.dispatchEvent(new CustomEvent("navigate-next"));

    expect(slider.slideToLoop).toHaveBeenCalledWith(1);
    expect(slider.slideTo).not.toHaveBeenCalled();
  });

  test("navigate-prev in loop mode wraps around with slideToLoop", () => {
    const viewer = document.createElement("cc-viewer");
    document.body.appendChild(viewer);
    const slider = fakeSlider(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (viewer as any).setSwiper({ slides: fakeSlides(5), slider });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (viewer as any).setCurrentSlideIndex(0);

    viewer.dispatchEvent(new CustomEvent("navigate-prev"));

    expect(slider.slideToLoop).toHaveBeenCalledWith(4);
    expect(slider.slideTo).not.toHaveBeenCalled();
  });

  test("navigate-next without loop keeps using slideTo", () => {
    const viewer = document.createElement("cc-viewer");
    document.body.appendChild(viewer);
    const slider = fakeSlider(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (viewer as any).setSwiper({ slides: fakeSlides(5), slider });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (viewer as any).setCurrentSlideIndex(0);

    viewer.dispatchEvent(new CustomEvent("navigate-next"));

    expect(slider.slideTo).toHaveBeenCalledWith(1);
    expect(slider.slideToLoop).not.toHaveBeenCalled();
  });
});

describe("cc-swiper with loop", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  function buildThumbSwiper(count: number): HTMLElement {
    const swiper = document.createElement("cc-swiper");
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

  /**
   * The pointer sequence a browser sends for a mouse click on a thumbnail.
   * pointerdown / pointerup go through Swiper's touch handling (which emits
   * "tap"), and the trailing click reaches plain click listeners.
   */
  function tap(el: Element, pointerId: number) {
    const pos = { clientX: 10, clientY: 10, pageX: 10, pageY: 10 };
    const init = { bubbles: true, composed: true, cancelable: true, pointerId, pointerType: "mouse", button: 0, isPrimary: true, ...pos };
    el.dispatchEvent(new PointerEvent("pointerdown", init));
    el.dispatchEvent(new PointerEvent("pointerup", init));
    el.dispatchEvent(new MouseEvent("click", { bubbles: true, composed: true, cancelable: true, button: 0, ...pos }));
  }

  test("tapping a thumbnail moves the swiper only through slideToLoop", async () => {
    const el = buildThumbSwiper(5);
    await flush();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const slider = (el as any).slider;
    expect(slider?.params?.loop).toBe(true);
    // slideToLoop itself calls slideTo with the internal index, so it is
    // stubbed here: any slideTo call left over comes from somewhere else.
    const slideToLoop = vi.spyOn(slider, "slideToLoop").mockImplementation(() => slider);
    const slideTo = vi.spyOn(slider, "slideTo");

    const thumbs = el.shadowRoot!.querySelectorAll<HTMLElement>(".gallery-thumb");
    tap(thumbs[2], 1);
    // The Thumbs module defers its slideToLoop call to the next animation frame.
    await flush(50);

    expect(slideToLoop).toHaveBeenCalledTimes(1);
    expect(slideToLoop).toHaveBeenCalledWith(2);
    expect(slideTo).not.toHaveBeenCalledWith(2);
  });

  test("no thumbnails are built without has-thumb", async () => {
    const el = buildThumbSwiper(5);
    el.removeAttribute("has-thumb");
    await flush();

    expect(el.shadowRoot!.querySelectorAll(".gallery-thumb").length).toBe(0);
  });

  test("openViewer without an index uses realIndex, not activeIndex", async () => {
    const viewer = document.createElement("cc-viewer");
    document.body.appendChild(viewer);
    const el = buildThumbSwiper(5);
    await flush();

    const setIndex = vi.spyOn(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      viewer as any,
      "setCurrentSlideIndex",
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (el as any).slider = { activeIndex: 3, realIndex: 1, params: { loop: true } };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (el as any).openViewer("https://example.com/1.jpg", "image");

    expect(setIndex).toHaveBeenCalledWith(1);
  });
});
