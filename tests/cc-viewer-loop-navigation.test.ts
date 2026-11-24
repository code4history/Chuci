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
