import { FEEL } from "@/core/feel";
import { GestureInterpreter, type GestureEvent } from "@/core/gesture";
import type { MediaItem } from "@/core/media-item";
import { containSize } from "./fit";
import type { MediaRenderer, RendererContext } from "./types";

export interface View2D {
  scale: number;
  x: number;
  y: number;
}

export function zoomAt(
  state: View2D,
  factor: number,
  cx: number,
  cy: number,
  limits: { min: number; max: number }
): View2D {
  const scale = Math.min(limits.max, Math.max(limits.min, state.scale * factor));
  const ratio = scale / state.scale;
  return {
    scale,
    x: cx - (cx - state.x) * ratio,
    y: cy - (cy - state.y) * ratio
  };
}

export class ImageRenderer implements MediaRenderer {
  private dispose?: () => void;
  private view: View2D = { scale: 1, x: 0, y: 0 };
  private image?: HTMLImageElement;

  mount(host: HTMLElement, item: MediaItem, ctx: RendererContext): Promise<void> {
    if (ctx.signal.aborted) return Promise.reject(ctx.signal.reason);
    if (!item.url) return Promise.reject(new Error("No image URL provided"));

    const image = host.ownerDocument.createElement("img");
    image.alt = "";
    image.draggable = false;
    image.style.position = "relative";
    image.style.display = "block";
    image.style.maxWidth = "none";
    image.style.maxHeight = "none";
    image.style.userSelect = "none";
    image.style.touchAction = "none";
    image.style.transformOrigin = "center center";
    image.style.willChange = "transform";
    image.style.cursor = "grab";
    this.image = image;
    this.view = { scale: 1, x: 0, y: 0 };

    return new Promise((resolve, reject) => {
      const listeners = new AbortController();
      const options = { signal: listeners.signal };
      let ready = false;
      let settled = false;
      let resizeObserver: ResizeObserver | undefined;
      const rejectOnce = (error: unknown) => {
        if (settled) return;
        settled = true;
        reject(error);
      };
      const fit = () => {
        if (!image.naturalWidth || !image.naturalHeight) return;
        const rect = host.getBoundingClientRect();
        const size = containSize(
          rect.width,
          rect.height,
          image.naturalWidth / image.naturalHeight
        );
        image.style.width = `${size.width}px`;
        image.style.height = `${size.height}px`;
        this.resetView();
      };
      const loaded = () => {
        if (!image.naturalWidth || !image.naturalHeight) {
          failed();
          return;
        }
        ready = true;
        settled = true;
        fit();
        resizeObserver = new ResizeObserver(fit);
        resizeObserver.observe(host);
        resolve();
      };
      const failed = () => {
        const error = new Error(`Failed to load image: ${item.url}`);
        if (ready) {
          ctx.reportError(error);
          return;
        }
        rejectOnce(error);
      };
      const onGesture = (event: GestureEvent) => {
        if (event.kind === "start") {
          ctx.reportInteraction();
        } else if (event.kind === "rotate" || event.kind === "pan") {
          this.view = {
            ...this.view,
            x: this.view.x + event.dx * FEEL.panSpeed,
            y: this.view.y + event.dy * FEEL.panSpeed
          };
          this.renderView();
        } else if (event.kind === "zoom") {
          const rect = host.getBoundingClientRect();
          this.view = zoomAt(
            this.view,
            event.factor,
            event.cx - rect.width / 2,
            event.cy - rect.height / 2,
            { min: FEEL.imageMinZoom, max: FEEL.imageMaxZoom }
          );
          this.renderView();
        } else if (event.kind === "reset") {
          this.resetView();
        }
      };
      const gestures = new GestureInterpreter(host, onGesture);
      const dispose = () => {
        if (this.dispose === dispose) this.dispose = undefined;
        listeners.abort();
        gestures.dispose();
        resizeObserver?.disconnect();
        image.removeAttribute("src");
        image.remove();
        this.image = undefined;
        rejectOnce(new DOMException("Image load aborted", "AbortError"));
      };
      this.dispose = dispose;

      image.addEventListener("load", loaded, { ...options, once: true });
      image.addEventListener("error", failed, options);
      ctx.signal.addEventListener("abort", dispose, { ...options, once: true });
      host.append(image);
      image.setAttribute("src", item.url);
    });
  }

  unmount(): void {
    this.dispose?.();
  }

  resetView(): void {
    this.view = { scale: 1, x: 0, y: 0 };
    this.renderView();
  }

  private renderView(): void {
    if (!this.image) return;
    this.image.style.transform = `translate3d(${this.view.x}px, ${this.view.y}px, 0) scale(${this.view.scale})`;
  }
}
