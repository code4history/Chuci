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

  test("a thumbnail click does not call slideTo with the thumbnail number", async () => {
    const el = buildThumbSwiper(5);
    await flush();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const slider = (el as any).slider;
    expect(slider).toBeTruthy();
    const slideTo = vi.spyOn(slider, "slideTo");

    // The Thumbs module already moves the main swiper with slideToLoop.
    // A second slideTo(index) would start moving to a different slide.
    const thumbs = el.shadowRoot!.querySelectorAll<HTMLElement>(".gallery-thumb");
    thumbs[0].click();

    expect(slideTo).not.toHaveBeenCalledWith(0);
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
