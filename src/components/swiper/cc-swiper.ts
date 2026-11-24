import { ChuciElement } from "@/utils/base-element";
import { readMediaItem, type MediaItem } from "@/core/media-item";
import { slideOffsets, stepIndex, normalizeIndex } from "@/core/carousel-math";
import {
  captionBarModel,
  renderCaptionBar,
  captionBarStyles
} from "@/core/caption-bar";
import { FEEL } from "@/core/feel";

export function escapeCssUrl(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

interface ViewerLike {
  open(items: MediaItem[], index: number, opts?: { loop?: boolean }): void;
}
interface DragState {
  pointerId: number;
  x: number;
  displayPx: number;
  hasRenderedFrame: boolean;
  startedAt: number;
  moved: boolean;
  index: number;
}

export class CcSwiper extends ChuciElement {
  private static activeViewerOwner: CcSwiper | undefined;
  private currentIndex = 0;
  private timer?: ReturnType<typeof setInterval>;
  private observer?: ResizeObserver;
  private drag?: DragState;
  private dragFrame?: number;
  private readonly panelPositions = new WeakMap<HTMLElement, number>();
  private width = 0;
  private pointerHandlers?: AbortController;
  private slidesObserver?: MutationObserver;
  private observedSlides: Element[] = [];
  private viewerOpen = false;
  private stopHostPropagation = (event: Event) => event.stopPropagation();

  static get observedAttributes() {
    return ["has-thumb", "autoplay"];
  }
  get hasThumb() {
    return this.hasAttribute("has-thumb");
  }
  get autoplay() {
    return this.hasAttribute("autoplay");
  }
  get items(): MediaItem[] {
    return this.slides.map(readMediaItem);
  }
  get slides(): Element[] {
    return Array.from(this.querySelectorAll("cc-swiper-slide"));
  }
  get index() {
    return normalizeIndex(this.currentIndex, this.items.length, this.loop);
  }
  get loop() {
    return this.items.length >= 2;
  }

  protected viewerTagName(): string {
    return "cc-viewer";
  }
  protected setThumbnailSource(index: number, src: string): void {
    const img = this.query<HTMLImageElement>(`[data-thumb-index="${index}"]`);
    if (img) img.setAttribute("src", src);
  }

  protected render() {
    this.cleanup();
    this.tabIndex = 0;
    const style = this.css`
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
      ${captionBarStyles}
      .cc-bar--slider { min-height:1.5rem; }
      .cc-bar-dot { color:var(--cc-slider-theme-color,#007aff); }
      #gallery { flex:0 0 90px; display:flex; gap:10px; overflow-x:auto; padding:5px; box-sizing:border-box; }
      #gallery[hidden], #caption[hidden] { display:none; }
      .gallery-thumb { flex:0 0 min(22%,100px);height:100%;object-fit:cover;opacity:.35;cursor:pointer; }
      .gallery-thumb[aria-current="true"] { opacity:1; }
    `;
    this.updateShadowRoot(
      `${style}<div id="layout"><div id="viewport"><div id="track"></div><button id="previous" class="nav" type="button" aria-label="Previous"></button><button id="next" class="nav" type="button" aria-label="Next"></button></div><div id="caption"></div><div id="gallery" hidden></div></div>`
    );
    this.buildSlides();
    this.bindEvents();
    this.observeSlides();
    this.observeSize();
    if (!this.viewerOpen) this.startAutoplay();
    this.updateLayout(false);
  }

  private cleanup() {
    this.cancelDragFrame();
    this.drag = undefined;
    this.pointerHandlers?.abort();
    this.pointerHandlers = undefined;
    this.observer?.disconnect();
    this.observer = undefined;
    if (this.timer !== undefined) clearInterval(this.timer);
    this.timer = undefined;
    for (const name of ["pointerdown", "pointermove", "pointerup", "pointercancel", "wheel", "click"])
      this.removeEventListener(name, this.stopHostPropagation);
    for (const name of ["pointerdown", "pointermove", "pointerup", "pointercancel", "wheel", "click"])
      this.shadowRoot?.removeEventListener(name, this.stopHostPropagation);
    this.slidesObserver?.disconnect();
    this.slidesObserver = undefined;
  }

  disconnectedCallback() {
    this.cleanup();
    if (CcSwiper.activeViewerOwner === this) {
      CcSwiper.activeViewerOwner = undefined;
      this.viewerOpen = false;
    }
    super.disconnectedCallback();
  }

  private buildSlides() {
    const track = this.query<HTMLDivElement>("#track");
    const gallery = this.query<HTMLDivElement>("#gallery");
    if (!track || !gallery) return;
    track.replaceChildren();
    gallery.replaceChildren();
    this.slides.forEach((slide, index) => {
      const item = readMediaItem(slide);
      const panel = document.createElement("div");
      panel.className = "cc-slide";
      panel.dataset.index = String(index);
      const image = document.createElement("img");
      image.className = "viewer";
      image.setAttribute("src", item.thumbnailUrl || item.url);
      image.setAttribute("data-image-url", item.url);
      image.setAttribute("data-image-type", item.type);
      image.setAttribute("data-index", String(index));
      image.setAttribute("alt", item.caption);
      panel.append(image);
      track.append(panel);
      if (this.hasThumb) {
        const thumb = document.createElement("img");
        thumb.className = "gallery-thumb";
        thumb.dataset.thumbIndex = String(index);
        thumb.setAttribute("src", item.thumbnailUrl || item.url);
        thumb.setAttribute("alt", item.caption);
        thumb.addEventListener("click", () => this.goTo(index));
        gallery.append(thumb);
      }
    });
    gallery.hidden = !this.hasThumb;
  }

  private bindEvents() {
    const viewport = this.query<HTMLDivElement>("#viewport");
    const prev = this.query<HTMLButtonElement>("#previous");
    const next = this.query<HTMLButtonElement>("#next");
    if (!viewport) return;
    const controller = new AbortController();
    this.pointerHandlers = controller;
    const opts = { signal: controller.signal };
    for (const name of [
      "pointerdown",
      "pointermove",
      "pointerup",
      "pointercancel",
      "wheel"
    ]) {
      viewport.addEventListener(name, (event) => event.stopPropagation(), opts);
    }
    viewport.addEventListener(
      "pointerdown",
      (event) => this.onPointerDown(event as PointerEvent),
      opts
    );
    viewport.addEventListener(
      "pointermove",
      (event) => this.onPointerMove(event as PointerEvent),
      opts
    );
    viewport.addEventListener(
      "pointerup",
      (event) => this.onPointerUp(event as PointerEvent),
      opts
    );
    viewport.addEventListener(
      "pointercancel",
      () => {
        this.drag = undefined;
        this.updateLayout(true);
      },
      opts
    );
    viewport.addEventListener("wheel", () => {}, opts);
    prev?.addEventListener(
      "click",
      () => this.goTo(stepIndex(this.index, -1, this.items.length, this.loop)),
      opts
    );
    next?.addEventListener(
      "click",
      () => this.goTo(stepIndex(this.index, 1, this.items.length, this.loop)),
      opts
    );
    this.addEventListener("keydown", this.onKeyDown, opts);
    document.addEventListener(
      "cc-viewer-index-change",
      this.onViewerIndexChange as EventListener,
      opts
    );
    document.addEventListener("cc-viewer-close", this.onViewerClose, opts);
    for (const name of ["pointerdown", "pointermove", "pointerup", "pointercancel", "wheel", "click"])
      this.addEventListener(name, this.stopHostPropagation);
    for (const name of ["pointerdown", "pointermove", "pointerup", "pointercancel", "wheel", "click"])
      this.shadowRoot?.addEventListener(name, this.stopHostPropagation);
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.goTo(stepIndex(this.index, 1, this.items.length, this.loop));
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.goTo(stepIndex(this.index, -1, this.items.length, this.loop));
    }
  };
  private onViewerIndexChange = (event: CustomEvent<{ index: number }>) => {
    if (CcSwiper.activeViewerOwner === this)
      this.goTo(event.detail.index, { animate: false });
  };
  private onViewerClose = () => {
    if (CcSwiper.activeViewerOwner !== this) return;
    CcSwiper.activeViewerOwner = undefined;
    this.viewerOpen = false;
    this.resumeAutoplay();
  };

  private onPointerDown(event: PointerEvent) {
    if ((event.target as HTMLElement).closest("button")) return;
    if (event.button !== 0 && event.pointerType !== "touch") return;
    this.cancelDragFrame();
    const viewport = this.query<HTMLElement>("#viewport");
    try {
      viewport?.setPointerCapture(event.pointerId);
    } catch {
      /* capture may be unavailable in DOM shims */
    }
    this.drag = {
      pointerId: event.pointerId,
      x: event.clientX,
      displayPx: 0,
      hasRenderedFrame: false,
      startedAt: performance.now(),
      moved: false,
      index: Number(
        (event.target as HTMLElement)
          .closest("[data-index]")
          ?.getAttribute("data-index") ?? this.index
      )
    };
  }
  private onPointerMove(event: PointerEvent) {
    const drag = this.drag;
    if (!drag || event.pointerId !== drag.pointerId) return;
    const dx = event.clientX - drag.x;
    if (Math.abs(dx) > FEEL.dragThresholdPx) drag.moved = true;
    drag.displayPx = this.displayDragPx(dx);
    if (this.dragFrame !== undefined) return;
    this.dragFrame = requestAnimationFrame(() => {
      this.dragFrame = undefined;
      this.updateLayout(false, drag.displayPx);
      drag.hasRenderedFrame = this.width > 0;
    });
  }
  private cancelDragFrame() {
    if (this.dragFrame === undefined) return;
    cancelAnimationFrame(this.dragFrame);
    this.dragFrame = undefined;
  }
  private onPointerUp(event: PointerEvent) {
    const drag = this.drag;
    if (!drag || event.pointerId !== drag.pointerId) return;
    const dx = event.clientX - drag.x;
    const moved = drag.moved || Math.abs(dx) > FEEL.dragThresholdPx;
    this.cancelDragFrame();
    this.drag = undefined;
    if (!moved) {
      this.updateLayout(true);
      void this.openViewer(drag.index);
    }
    else {
      const elapsed = Math.max(1, performance.now() - drag.startedAt);
      const fast = Math.abs(dx) / elapsed > FEEL.swipeVelocityPxPerMs;
      if (Math.abs(dx) >= this.width * FEEL.swipeCommitRatio || fast) {
        const firstFrameDragPx = drag.hasRenderedFrame ? undefined : this.displayDragPx(dx);
        this.commitSwipe(dx < 0 ? -1 : 1, firstFrameDragPx);
      } else this.updateLayout(true);
    }
  }

  private displayDragPx(dx: number): number {
    const atUnloopedEdge =
      !this.loop &&
      ((this.index === 0 && dx > 0) ||
        (this.index === this.items.length - 1 && dx < 0));
    return atUnloopedEdge ? dx : Math.max(-this.width, Math.min(this.width, dx));
  }

  private observeSlides() {
    if (typeof MutationObserver === "undefined") return;
    this.observedSlides = this.slides;
    this.slidesObserver = new MutationObserver(() => {
      const slides = this.slides;
      if (
        slides.length === this.observedSlides.length &&
        slides.every((slide, index) => slide === this.observedSlides[index])
      )
        return;
      this.observedSlides = slides;
      this.currentIndex = normalizeIndex(this.currentIndex, this.items.length, this.loop);
      this.buildSlides();
      this.updateLayout(false);
      if (!this.viewerOpen) this.startAutoplay();
    });
    this.slidesObserver.observe(this, { childList: true, subtree: true });
  }

  private observeSize() {
    const viewport = this.query<HTMLElement>("#viewport");
    if (!viewport || typeof ResizeObserver === "undefined") return;
    this.observer = new ResizeObserver((entries) => {
      const width =
        entries[0]?.contentRect.width ?? viewport.getBoundingClientRect().width;
      if (width > 0 && width !== this.width) {
        this.width = width;
        this.updateLayout(false);
      }
    });
    this.observer.observe(viewport);
    const initialWidth = viewport.getBoundingClientRect().width;
    if (initialWidth > 0) this.width = initialWidth;
  }

  private updateLayout(animate: boolean, dragPx = 0) {
    this.cancelDragFrame();
    const panels = Array.from(this.queryAll<HTMLElement>(".cc-slide"));
    const offsets = slideOffsets(this.index, panels.length, this.loop);
    if (this.width > 0)
      panels.forEach((panel, i) => {
        let offset = offsets[i];
        if (this.loop && panels.length === 2 && dragPx > 0 && i !== this.index)
          offset = -1;
        panel.style.transition = animate
          ? `transform ${FEEL.slideTransitionMs}ms ease`
          : "none";
        this.setPanelPosition(panel, offset, dragPx);
      });
    this.updateChrome();
  }

  private setPanelPosition(panel: HTMLElement, offset: number, dragPx: number) {
    panel.style.transform = `translateX(calc(${offset * 100}% + ${dragPx}px))`;
    this.panelPositions.set(panel, offset * this.width + dragPx);
  }

  private updateChrome() {
    const caption = this.query<HTMLDivElement>("#caption");
    if (caption) {
      const model = captionBarModel(
        this.items.length,
        this.items[this.index]?.caption ?? "",
        this.hasThumb
      );
      renderCaptionBar(
        caption,
        model,
        this.index,
        this.items.length,
        (i) => this.goTo(i),
        "slider"
      );
      caption.hidden = !model.showBar;
    }
    this.queryAll<HTMLImageElement>(".gallery-thumb").forEach((thumb, i) => {
      if (i === this.index) thumb.setAttribute("aria-current", "true");
      else thumb.removeAttribute("aria-current");
    });
  }

  private finishSwipeTransition = (event: TransitionEvent) => {
    if (event.propertyName !== "transform") return;
    this.queryAll<HTMLElement>(".cc-slide").forEach((panel) =>
      panel.removeEventListener("transitionend", this.finishSwipeTransition)
    );
    this.updateLayout(false);
  };

  private commitSwipe(direction: -1 | 1, firstFrameDragPx?: number) {
    const previousIndex = this.index;
    const nextIndex = stepIndex(
      previousIndex,
      direction === -1 ? 1 : -1,
      this.items.length,
      this.loop
    );
    this.currentIndex = nextIndex;
    const panels = Array.from(this.queryAll<HTMLElement>(".cc-slide"));
    const nextOffsets = slideOffsets(nextIndex, panels.length, this.loop);
    const renderedDragPx = this.panelPositions.get(panels[previousIndex]) ?? 0;
    const transitions: { panel: HTMLElement; targetOffset: number }[] = [];

    panels.forEach((panel, index) => {
      const renderedX = this.panelPositions.get(panel);
      const targetOffset = panels.length === 2 && index === previousIndex
        ? direction
        : nextOffsets[index];
      const toX = targetOffset * this.width;
      let fromX = renderedX;
      const entering = index === nextIndex && nextIndex !== previousIndex;
      if (entering && (fromX === undefined || fromX * direction >= 0)) {
        // A release before the first frame can supply the drag distance for this placement.
        fromX = toX - direction * this.width + (firstFrameDragPx ?? renderedDragPx);
      }

      panel.removeEventListener("transitionend", this.finishSwipeTransition);
      panel.style.transition = "none";
      const startsVisible = fromX !== undefined && Math.abs(fromX) < this.width;
      if (startsVisible || Math.abs(toX) < this.width) {
        if (fromX !== undefined && fromX !== renderedX)
          this.setPanelPosition(panel, 0, fromX);
        transitions.push({ panel, targetOffset });
      } else {
        this.setPanelPosition(panel, targetOffset, 0);
      }
    });

    // Commit the starting positions before enabling transitions and writing their targets.
    if (transitions.length > 0) void transitions[0].panel.offsetWidth;
    transitions.forEach(({ panel, targetOffset }) => {
      panel.addEventListener("transitionend", this.finishSwipeTransition);
      panel.style.transition = `transform ${FEEL.slideTransitionMs}ms ease`;
      this.setPanelPosition(panel, targetOffset, 0);
    });
    this.updateChrome();
    this.dispatch("cc-swiper-index-change", { index: this.index });
  }

  goTo(index: number, opts: { animate?: boolean } = {}) {
    this.currentIndex = normalizeIndex(index, this.items.length, this.loop);
    this.updateLayout(opts.animate ?? true);
    this.dispatch("cc-swiper-index-change", { index: this.index });
  }
  pauseAutoplay() {
    if (this.timer !== undefined) clearInterval(this.timer);
    this.timer = undefined;
  }
  resumeAutoplay() {
    this.startAutoplay();
  }
  private startAutoplay() {
    this.pauseAutoplay();
    if (!this.viewerOpen && this.autoplay && this.items.length > 1)
      this.timer = setInterval(
        () => this.goTo(stepIndex(this.index, 1, this.items.length, this.loop)),
        5000
      );
  }

  async openViewer(index: number): Promise<void> {
    const previousOwner = CcSwiper.activeViewerOwner;
    if (previousOwner && previousOwner !== this) {
      previousOwner.viewerOpen = false;
      previousOwner.resumeAutoplay();
    }
    CcSwiper.activeViewerOwner = this;
    this.viewerOpen = true;
    this.pauseAutoplay();
    const tag = this.viewerTagName();
    let viewer = document.querySelector(tag) as (Element & ViewerLike) | null;
    if (!viewer) {
      viewer = document.createElement(tag) as unknown as Element & ViewerLike;
      document.body.append(viewer);
    }
    await customElements.whenDefined(tag);
    (viewer as ViewerLike).open(this.items, index, { loop: this.loop });
  }
}

if (!customElements.get("cc-swiper"))
  customElements.define("cc-swiper", CcSwiper);

declare global {
  interface HTMLElementTagNameMap {
    "cc-swiper": CcSwiper;
  }
}
