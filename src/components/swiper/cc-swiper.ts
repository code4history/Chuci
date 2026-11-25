import { ChuciElement } from "@/utils/base-element";
import { readMediaItem, type MediaItem } from "@/core/media-item";
import { slideOffsets, stepIndex, normalizeIndex } from "@/core/carousel-math";
import {
  captionBarModel,
  renderCaptionBar,
  captionBarStyles
} from "@/core/caption-bar";
import { FEEL } from "@/core/feel";
import { thumbnailCacheKey } from "@/thumbnails/cache";
import { DEFAULT_THUMBNAIL_SIZE } from "@/thumbnails/generate";
import { mediaTypeIcon } from "@/thumbnails/icons";
import { sharedThumbnailQueue } from "@/thumbnails/queue";
import { readThumbnailItem } from "@/thumbnails/urls";

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
  startedAt: number;
  moved: boolean;
  index: number;
  positions?: number[];
}

export class CcSwiper extends ChuciElement {
  private static activeViewerOwner: CcSwiper | undefined;
  private static readonly handledViewerCloseEvents = new WeakSet<Event>();
  private currentIndex = 0;
  private timer?: ReturnType<typeof setInterval>;
  private observer?: ResizeObserver;
  private drag?: DragState;
  private dragFrame?: number;
  private readonly panelPositions = new WeakMap<HTMLElement, number>();
  private transitionEnd?: AbortController;
  private width = 0;
  private pointerHandlers?: AbortController;
  private slidesObserver?: MutationObserver;
  private observedSlides: Element[] = [];
  private viewerOpen = false;
  private viewerIndex = 0;
  private readonly thumbnailQueue = sharedThumbnailQueue;
  private readonly thumbnailSources = new Map<Element, { key: string; src: string }>();
  private readonly pendingThumbnails = new Map<Element, {
    key: string; controller: AbortController; generate: boolean
  }>();
  private readonly thumbnailTargets = new WeakMap<HTMLImageElement, { slide: Element; key: string }>();
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
  protected setThumbnailSource(index: number, src: string, slide?: Element, key?: string): void {
    if (slide && key) {
      for (const image of this.queryAll<HTMLImageElement>(".viewer, .gallery-thumb")) {
        const target = this.thumbnailTargets.get(image);
        if (target?.slide === slide && target.key === key) image.setAttribute("src", src);
      }
      return;
    }
    const img = this.query<HTMLImageElement>(`[data-thumb-index="${index}"]`);
    if (img) img.setAttribute("src", src);
    const viewer = this.query<HTMLImageElement>(`.viewer[data-index="${index}"]`);
    if (viewer) viewer.setAttribute("src", src);
  }

  protected render() {
    if (!this.isConnected) return;
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
      .cc-bar-dot { color:white; }
      .cc-bar-dot[aria-current="true"] { color:var(--cc-slider-theme-color,#007aff); }
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
    this.updateLayout();
  }

  private cleanup() {
    this.cancelDragFrame();
    this.drag = undefined;
    this.cancelTransitionEnd();
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
    for (const { controller } of this.pendingThumbnails.values()) controller.abort();
    this.pendingThumbnails.clear();
    this.releaseThumbnailSources();
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
    this.resetThumbnailSources();
    track.replaceChildren();
    gallery.replaceChildren();
    this.slides.forEach((slide, index) => {
      const item = readThumbnailItem(slide);
      const key = thumbnailCacheKey(item, DEFAULT_THUMBNAIL_SIZE);
      const target = { slide, key };
      if (this.thumbnailSources.get(slide)?.key !== key || item.thumbnailUrl) {
        this.thumbnailSources.delete(slide);
      }
      const memorySrc = item.thumbnailUrl ? null : this.thumbnailQueue.getMemoryUrl(item);
      if (memorySrc) this.thumbnailSources.set(slide, { key, src: memorySrc });
      const src = item.thumbnailUrl || this.thumbnailSources.get(slide)?.src || mediaTypeIcon(item.type);
      const panel = document.createElement("div");
      panel.className = "cc-slide";
      panel.dataset.index = String(index);
      const image = document.createElement("img");
      image.className = "viewer";
      image.setAttribute("src", src);
      image.setAttribute("data-image-url", slide.getAttribute("image-url") ?? "");
      image.setAttribute("data-image-type", item.type);
      image.setAttribute("data-index", String(index));
      image.setAttribute("alt", item.caption);
      this.thumbnailTargets.set(image, target);
      panel.append(image);
      track.append(panel);
      if (this.hasThumb) {
        const thumb = document.createElement("img");
        thumb.className = "gallery-thumb";
        thumb.dataset.thumbIndex = String(index);
        thumb.setAttribute("src", src);
        thumb.setAttribute("alt", item.caption);
        this.thumbnailTargets.set(thumb, target);
        thumb.addEventListener("click", () => this.goTo(index));
        gallery.append(thumb);
      }
    });
    gallery.hidden = !this.hasThumb;
    this.requestThumbnails(true);
  }

  private resetThumbnailSources(): void {
    const slides = new Set(this.slides);
    for (const [slide, { src }] of this.thumbnailSources) {
      if (src.startsWith("blob:") || !slides.has(slide)) {
        this.revokeThumbnailUrl(src);
        this.thumbnailSources.delete(slide);
      }
    }
  }

  private releaseThumbnailSources(): void {
    for (const { src } of this.thumbnailSources.values()) this.revokeThumbnailUrl(src);
    this.thumbnailSources.clear();
  }

  private revokeThumbnailUrl(src: string | null): void {
    if (src?.startsWith("blob:") && typeof URL.revokeObjectURL === "function") {
      URL.revokeObjectURL(src);
    }
  }

  private requestThumbnails(restoreDistant = false): void {
    if (!this.isConnected) return;
    const slides = this.slides;
    const count = slides.length;
    const first = this.index;
    const nearby = new Map<number, number>();
    if (count) {
      const loop = this.loop;
      for (const offset of [0, 1, -1]) {
        const index = normalizeIndex(first + offset, count, loop);
        if (!nearby.has(index)) nearby.set(index, nearby.size);
      }
    }
    const requests = Array.from(nearby, ([index, priority]) => ({ slide: slides[index], priority }));
    // Cache-only reads for other slides are independent of the generation queue.
    if (restoreDistant) {
      slides.forEach((slide, index) => {
        if (!nearby.has(index)) requests.push({ slide, priority: Infinity });
      });
    }

    const stale = new Map(this.pendingThumbnails);
    if (!restoreDistant) {
      for (const [slide, pending] of stale) {
        if (!pending.generate) stale.delete(slide);
      }
    }
    const priorities = new Map<string, { item: MediaItem; priority: number }>();
    for (const { slide, priority } of requests) {
      const item = readThumbnailItem(slide);
      const key = thumbnailCacheKey(item, DEFAULT_THUMBNAIL_SIZE);
      if (item.thumbnailUrl || this.thumbnailSources.get(slide)?.key === key) continue;
      const generate = Number.isFinite(priority);
      if (generate && !priorities.has(key)) priorities.set(key, { item, priority });

      const existing = this.pendingThumbnails.get(slide);
      stale.delete(slide);
      if (existing?.key === key && existing.generate === generate) continue;
      const pending = { key, controller: new AbortController(), generate };
      this.pendingThumbnails.set(slide, pending);
      existing?.controller.abort();
      const signal = pending.controller.signal;
      const request = generate
        ? this.thumbnailQueue.request(item, priority, signal)
        : this.thumbnailQueue.getCachedUrl(item, signal);
      void request.then((src) => {
        if (this.pendingThumbnails.get(slide) !== pending) {
          this.revokeThumbnailUrl(src);
          return;
        }
        this.pendingThumbnails.delete(slide);
        if (!src) return;
        const index = this.slides.indexOf(slide);
        const currentItem = index >= 0 ? readThumbnailItem(slide) : undefined;
        if (
          !this.isConnected ||
          !currentItem ||
          currentItem.thumbnailUrl ||
          thumbnailCacheKey(currentItem, DEFAULT_THUMBNAIL_SIZE) !== key
        ) {
          this.revokeThumbnailUrl(src);
          return;
        }
        const previous = this.thumbnailSources.get(slide)?.src;
        if (previous !== src) this.revokeThumbnailUrl(previous ?? null);
        this.thumbnailSources.set(slide, { key, src });
        this.setThumbnailSource(index, src, slide, key);
      });
    }
    for (const [slide, pending] of stale) {
      if (this.pendingThumbnails.get(slide) === pending) this.pendingThumbnails.delete(slide);
      pending.controller.abort();
    }
    for (const { item, priority } of priorities.values()) {
      this.thumbnailQueue.updatePriority(item, priority);
    }
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
        this.moveTo(this.index, true);
      },
      opts
    );
    viewport.addEventListener("wheel", () => {}, opts);
    prev?.addEventListener(
      "click",
      () => this.step(-1),
      opts
    );
    next?.addEventListener(
      "click",
      () => this.step(1),
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
      this.step(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.step(-1);
    }
  };
  private onViewerIndexChange = (event: CustomEvent<{ index: number }>) => {
    if (CcSwiper.activeViewerOwner === this) {
      this.viewerIndex = event.detail.index;
      this.goTo(this.viewerIndex, { animate: false });
    }
  };
  private onViewerClose = (event: Event) => {
    if (
      CcSwiper.activeViewerOwner !== this ||
      CcSwiper.handledViewerCloseEvents.has(event)
    )
      return;
    CcSwiper.handledViewerCloseEvents.add(event);
    CcSwiper.activeViewerOwner = undefined;
    this.viewerOpen = false;
    if (this.index !== this.viewerIndex)
      this.goTo(this.viewerIndex, { animate: false });
    this.resumeAutoplay();
  };

  private onPointerDown(event: PointerEvent) {
    if ((event.target as HTMLElement).closest("button")) return;
    if (event.button !== 0 && event.pointerType !== "touch") return;
    this.cancelDragFrame();
    this.cancelTransitionEnd();
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
      this.drawDrag(drag);
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
      this.moveTo(this.index, true);
      void this.openViewer(drag.index);
    } else {
      const elapsed = Math.max(1, performance.now() - drag.startedAt);
      const fast = Math.abs(dx) / elapsed > FEEL.swipeVelocityPxPerMs;
      if (dx !== 0 && (Math.abs(dx) >= this.width * FEEL.swipeCommitRatio || fast))
        this.step(dx < 0 ? 1 : -1);
      else this.moveTo(this.index, true);
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
      this.drag = undefined;
      this.currentIndex = normalizeIndex(this.currentIndex, this.items.length, this.loop);
      this.buildSlides();
      this.updateLayout();
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
        if (this.drag) this.drag.positions = undefined;
        this.updateLayout();
      }
    });
    this.observer.observe(viewport);
    const initialWidth = viewport.getBoundingClientRect().width;
    if (initialWidth > 0) this.width = initialWidth;
  }

  private updateLayout() {
    this.cancelDragFrame();
    this.cancelTransitionEnd();
    const panels = this.queryAll<HTMLElement>(".cc-slide");
    const offsets = slideOffsets(this.index, panels.length, this.loop);
    if (this.width > 0) {
      panels.forEach((panel, i) => {
        panel.style.transition = "none";
        this.setPanelPosition(panel, offsets[i]);
      });
    }
    this.updateChrome();
  }

  private readPanelPositions(panels: HTMLElement[], offsets: number[]): number[] {
    return panels.map((panel, i) => {
      const transform = getComputedStyle(panel).transform;
      if (typeof DOMMatrixReadOnly === "function" && transform && transform !== "none")
        return new DOMMatrixReadOnly(transform).m41;
      // DOM shims don't resolve a calc transform into a matrix.
      return this.panelPositions.get(panel) ?? offsets[i] * this.width;
    });
  }

  private dragStartPositions(panels: HTMLElement[], index: number): number[] {
    const { width, loop } = this;
    const positions = this.readPanelPositions(panels, slideOffsets(index, panels.length, loop));
    const visible = positions.filter((x) => Math.abs(x) < width - 0.01);
    if (visible.length === 0) return positions;

    // Offscreen panels can still be at their resting offsets while the
    // visible ones are animating. Line up each hidden edge with the painted
    // strip before dragging, so an entering panel cannot overlap its neighbor.
    for (const side of [-1, 1]) {
      let edge = side === -1 ? Math.min(...visible) : Math.max(...visible);
      const hidden = positions
        .map((x, i) => ({ x, i }))
        .filter(({ x }) => side * x >= width - 0.01)
        .sort((a, b) => side * (a.x - b.x));
      for (const { i } of hidden) {
        edge = side * Math.max(width, side * edge + width);
        positions[i] = edge;
      }
    }
    return positions;
  }

  private drawDrag(drag: DragState) {
    const { width } = this;
    if (width <= 0) return;
    const index = this.index;
    const panels = Array.from(this.queryAll<HTMLElement>(".cc-slide"));
    const positions = drag.positions ??= this.dragStartPositions(panels, index);
    const source = positions[index] ?? 0;
    const dx = this.loop
      ? Math.max(-width - source, Math.min(width - source, drag.displayPx))
      : drag.displayPx;
    const cycle = panels.length * width;
    panels.forEach((panel, i) => {
      let offset = positions[i] / width;
      const x = offset * width + dx;
      // The same panel can come in from the other edge once it is outside.
      if (this.loop && x > width && x - cycle >= -width) offset -= panels.length;
      else if (this.loop && x < -width && x + cycle <= width) offset += panels.length;
      panel.style.transition = "none";
      this.setPanelPosition(panel, offset, dx);
    });
  }

  private setPanelPosition(panel: HTMLElement, offset: number, dragPx = 0) {
    panel.style.transform = `translateX(calc(${offset * 100}% + ${dragPx}px))`;
    this.panelPositions.set(panel, offset * this.width + dragPx);
  }

  private updateChrome() {
    const count = this.slides.length;
    this.queryAll<HTMLButtonElement>(".nav").forEach((button) => {
      button.hidden = count < 2;
    });
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

  private cancelTransitionEnd() {
    this.transitionEnd?.abort();
    this.transitionEnd = undefined;
  }

  private moveTo(index: number, animate: boolean, step?: -1 | 1) {
    this.cancelDragFrame();
    this.drag = undefined;
    this.cancelTransitionEnd();
    const previous = this.index;
    const panels = Array.from(this.queryAll<HTMLElement>(".cc-slide"));
    const { width } = this;
    const oldOffsets = slideOffsets(previous, panels.length, this.loop);
    const positions = animate && width > 0 ? this.readPanelPositions(panels, oldOffsets) : [];
    this.currentIndex = index;
    if (!positions.length || !panels[index]) {
      this.updateLayout();
      return;
    }

    const offsets = slideOffsets(index, panels.length, this.loop);
    const visible = (x: number) => Math.abs(x) < width - 0.01;
    if (previous !== index && !visible(positions[index])) {
      let entry = step ?? Math.sign(oldOffsets[index]);
      const painted = positions.filter(visible);
      const neighbor = positions.find((x, i) => i !== previous && visible(x));
      const source = positions[previous];
      // If a previous transition still straddles the viewport, enter next
      // to its visible source instead of cutting across the other panel.
      if (visible(source) && neighbor !== undefined)
        entry = Math.sign(source - neighbor) || entry;
      const edge = painted.length > 0 ? Math.max(...painted.map((x) => entry * x)) : 0;
      // Reposition only the hidden incoming panel, before the new animation.
      positions[index] = entry * Math.max(width, width + edge);
    }
    const incoming = positions[index];
    const targets = positions.map((x, i) => {
      if (i === index || !visible(x)) return offsets[i];
      const distance = (x - incoming) / width;
      // Keep each visible panel on its side of the incoming one until it
      // is out of view. The canonical offsets can then be restored safely.
      return Math.sign(distance || offsets[i]) * Math.max(1, Math.round(Math.abs(distance)));
    });

    const viewport = this.query<HTMLElement>("#viewport");
    let lastMoving: HTMLElement | undefined;
    panels.forEach((panel, i) => {
      panel.style.transition = "none";
      if (this.panelPositions.get(panel) !== positions[i])
        this.setPanelPosition(panel, 0, positions[i]);
    });
    viewport?.getBoundingClientRect(); // Commit the start positions before setting targets.
    panels.forEach((panel, i) => {
      const to = targets[i] * width;
      if (visible(positions[i]) || visible(to)) {
        panel.style.transition = `transform ${FEEL.slideTransitionMs}ms ease`;
        if (Math.abs(positions[i] - to) > 0.01) lastMoving = panel;
      }
      this.setPanelPosition(panel, targets[i]);
    });
    if (lastMoving) {
      const controller = new AbortController();
      this.transitionEnd = controller;
      lastMoving.addEventListener("transitionend", (event) => {
        if (event.propertyName === "transform") this.updateLayout();
      }, { signal: controller.signal });
    }
    this.updateChrome();
  }

  private step(delta: -1 | 1) {
    this.selectSlide(stepIndex(this.index, delta, this.items.length, this.loop), true, delta);
  }

  private selectSlide(index: number, animate: boolean, step?: -1 | 1) {
    this.moveTo(index, animate, step);
    this.requestThumbnails();
    this.dispatch("cc-swiper-index-change", { index: this.index });
  }

  goTo(index: number, opts: { animate?: boolean } = {}) {
    this.selectSlide(normalizeIndex(index, this.items.length, this.loop), opts.animate ?? true);
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
    if (this.isConnected && !this.viewerOpen && this.autoplay && this.items.length > 1)
      // ドラッグ中は自動送りを見送る（操作中のスワイプを打ち消さない）
      this.timer = setInterval(() => { if (!this.drag) this.step(1); }, FEEL.slideAutoplayMs);
  }

  async openViewer(index: number): Promise<void> {
    if (!this.isConnected || this.slides.length === 0) return;
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
    if (!this.isConnected || CcSwiper.activeViewerOwner !== this) return;
    const items = this.items;
    if (items.length === 0) {
      CcSwiper.activeViewerOwner = undefined;
      this.viewerOpen = false;
      this.resumeAutoplay();
      return;
    }
    const normalizedIndex = normalizeIndex(
      Number.isFinite(index) ? Math.trunc(index) : 0,
      items.length,
      this.loop
    );
    this.viewerIndex = normalizedIndex;
    (viewer as ViewerLike).open(items, normalizedIndex, { loop: this.loop });
  }
}

if (!customElements.get("cc-swiper"))
  customElements.define("cc-swiper", CcSwiper);

declare global {
  interface HTMLElementTagNameMap {
    "cc-swiper": CcSwiper;
  }
}
