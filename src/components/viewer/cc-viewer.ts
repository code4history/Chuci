import { BarVisibility } from "@/core/bar-visibility";
import { normalizeIndex, stepIndex } from "@/core/carousel-math";
import {
  captionBarModel,
  captionBarStyles,
  renderCaptionBar
} from "@/core/caption-bar";
import { CONTROLS_HINT } from "@/core/feel";
import { GestureInterpreter } from "@/core/gesture";
import type { MediaItem } from "@/core/media-item";
import { ChuciElement } from "@/utils/base-element";
import { createRenderer } from "./renderers/registry";
import type { MediaRenderer } from "./renderers/types";

const DEBUG_REFRESH_MS = 250;

interface ActiveMount {
  host: HTMLElement;
  controller: AbortController;
  renderer?: MediaRenderer;
}

export class CcViewer extends ChuciElement {
  private items: MediaItem[] = [];
  private currentIndex = 0;
  private loop = false;
  private activeMount?: ActiveMount;
  private barVisibility?: BarVisibility;
  private gestures?: GestureInterpreter;
  private debugTimer?: ReturnType<typeof setInterval>;
  private previousFocus?: HTMLElement;

  get index(): number {
    return this.currentIndex;
  }

  open(items: MediaItem[], index: number, opts?: { loop?: boolean }): void {
    if (items.length === 0) {
      this.close();
      return;
    }

    this.render();
    const backdrop = this.query(".backdrop")!;
    const opening = !this.activeMount;
    if (opening) {
      const focused = this.ownerDocument.activeElement;
      if (focused instanceof HTMLElement) this.previousFocus = focused;
      this.gestures = new GestureInterpreter(
        this.query(".content")!,
        (gesture) => {
          if (gesture.kind === "tap") this.barVisibility?.poked();
        },
        { observeOnly: true }
      );
      this.ownerDocument.defaultView?.addEventListener(
        "keydown",
        this.onKeyDown,
        true
      );
      backdrop.hidden = false;
    }

    this.items = items.slice();
    this.loop = opts?.loop ?? false;
    this.showItem(
      normalizeIndex(
        Number.isFinite(index) ? Math.trunc(index) : 0,
        items.length,
        this.loop
      )
    );
    if (opening) this.query(".nav-close")!.focus();
  }

  close(): void {
    if (!this.activeMount) return;

    this.gestures?.dispose();
    this.gestures = undefined;
    this.ownerDocument.defaultView?.removeEventListener(
      "keydown",
      this.onKeyDown,
      true
    );
    this.clearRenderer();
    this.items = [];
    this.query(".backdrop")!.hidden = true;
    this.query(".caption")!.replaceChildren();

    const previousFocus = this.previousFocus;
    this.previousFocus = undefined;
    if (previousFocus?.isConnected) previousFocus.focus();
    this.dispatch("cc-viewer-close");
  }

  disconnectedCallback(): void {
    this.close();
    super.disconnectedCallback();
  }

  protected firstUpdated(): void {
    this.dispatch("load");
  }

  protected render(): void {
    if (this.query(".backdrop")) return;
    this.updateShadowRoot(`
      <style>
        .backdrop {
          position: fixed;
          inset: 0;
          background: #000;
          color: #fff;
          z-index: var(--cc-viewer-z-index, 1000);
        }
        .viewport {
          position: absolute;
          inset: env(safe-area-inset-top, 0px) env(safe-area-inset-right, 0px)
            env(safe-area-inset-bottom, 0px) env(safe-area-inset-left, 0px);
          isolation: isolate;
        }
        .content, .renderer-host {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .content { z-index: 0; }
        .renderer-host {
          display: grid;
          place-items: center;
        }
        .caption, .nav-button, .media-controls, .debug-panel {
          position: absolute;
          z-index: 2;
        }
        .caption {
          bottom: 0;
          left: 0;
          right: 0;
          padding: 8px 12px;
          max-height: 30vh;
          overflow: auto;
          background: rgba(0, 0, 0, .75);
        }
        .reserve-bottom-bar {
          display: grid;
          grid-template-rows: minmax(0, 1fr) auto;
        }
        .reserve-bottom-bar .content {
          position: relative;
          inset: auto;
          grid-row: 1;
        }
        .reserve-bottom-bar .caption {
          position: static;
          grid-row: 2;
        }
        .nav-button {
          display: grid;
          place-items: center;
          min-width: 44px;
          min-height: 44px;
          padding: 0 8px;
          border: 1px solid rgba(255, 255, 255, .45);
          border-radius: 4px;
          color: inherit;
          background: rgba(0, 0, 0, .75);
          font: 26px/1 sans-serif;
          cursor: pointer;
        }
        .bar-hidden .nav-button { opacity: .25; }
        .nav-prev, .nav-next { top: 50%; transform: translateY(-50%); }
        .nav-prev { left: 12px; }
        .nav-next, .nav-close { right: 12px; }
        .nav-close { top: 12px; }
        .media-controls {
          top: 12px;
          right: 64px;
          display: flex;
          gap: 8px;
        }
        .media-controls > .nav-button { position: static; font: inherit; }
        .debug-panel {
          top: 12px;
          left: 12px;
          max-width: calc(100% - 76px);
          box-sizing: border-box;
          padding: 8px;
          background: rgba(0, 0, 0, .75);
          font: 12px/1.4 monospace;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
          pointer-events: none;
        }
        .spinner, .viewer-error {
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 1;
          translate: -50% -50%;
          pointer-events: none;
        }
        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(255, 255, 255, .35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: cc-viewer-spin .8s linear infinite;
        }
        .viewer-error {
          max-width: 80%;
          padding: 8px 12px;
          background: rgba(0, 0, 0, .85);
          text-align: center;
          overflow-wrap: anywhere;
        }
        @keyframes cc-viewer-spin { to { transform: rotate(1turn); } }
        @media (prefers-reduced-motion: reduce) { .spinner { animation: none; } }
        ${captionBarStyles}
        [hidden] { display: none; }
      </style>
      <div class="backdrop" role="dialog" aria-label="Media viewer" hidden>
        <div class="viewport">
          <div class="content"></div>
          <div class="spinner" role="status" aria-label="Loading" hidden></div>
          <div class="viewer-error" role="alert" hidden></div>
          <div class="debug-panel" hidden></div>
          <div class="media-controls"></div>
          <button class="nav-button nav-prev" type="button" aria-label="Previous" hidden>‹</button>
          <button class="nav-button nav-next" type="button" aria-label="Next" hidden>›</button>
          <button class="nav-button nav-close" type="button" aria-label="Close">×</button>
          <div class="caption" hidden></div>
        </div>
      </div>
    `);

    this.query(".nav-prev")!.addEventListener("click", () => this.step(-1));
    this.query(".nav-next")!.addEventListener("click", () => this.step(1));
    this.query(".nav-close")!.addEventListener("click", () => this.close());
    this.query(".backdrop")!.addEventListener("pointermove", (event) => {
      if (event.pointerType === "mouse" && event.buttons === 0)
        this.barVisibility?.poked();
    });
  }

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case "ArrowLeft":
        this.step(-1);
        break;
      case "ArrowRight":
        this.step(1);
        break;
      case "Escape":
        this.close();
        break;
      default:
        return;
    }
    event.preventDefault();
    event.stopPropagation();
  };

  private step(delta: -1 | 1): void {
    this.goTo(stepIndex(this.index, delta, this.items.length, this.loop));
  }

  private goTo(index: number): void {
    if (!this.activeMount || index === this.index) return;
    this.showItem(index);
    this.dispatch("cc-viewer-index-change", { index });
  }

  private readonly setBarVisible = (visible: boolean): void => {
    const caption = this.query(".caption")!;
    caption.hidden = !visible || !caption.firstElementChild;
    this.query(".backdrop")!.classList.toggle("bar-hidden", !visible);
  };

  private showItem(index: number): void {
    this.clearRenderer();
    this.currentIndex = index;
    const item = this.items[index];
    const count = this.items.length;
    const caption = this.query(".caption")!;
    const model = captionBarModel(count, item.caption, false);
    renderCaptionBar(
      caption,
      model,
      index,
      count,
      (i) => this.goTo(i),
      "viewer"
    );
    this.setBarVisible(true);
    this.query(".nav-prev")!.hidden = count <= 1 || (!this.loop && index === 0);
    this.query(".nav-next")!.hidden =
      count <= 1 || (!this.loop && index === count - 1);

    const host = this.ownerDocument.createElement("div");
    host.className = "renderer-host";
    this.query(".content")!.append(host);

    const mount = { host, controller: new AbortController() };
    this.activeMount = mount;
    this.query(".spinner")!.hidden = false;
    if (item.debugMode) {
      this.refreshDebug(mount);
      this.debugTimer = setInterval(
        () => this.refreshDebug(mount),
        DEBUG_REFRESH_MS
      );
    }
    void this.mountRenderer(mount, item);
  }

  private async mountRenderer(
    mount: ActiveMount,
    item: MediaItem
  ): Promise<void> {
    try {
      const renderer = await createRenderer(item.type);
      if (this.activeMount !== mount) {
        renderer.unmount();
        return;
      }
      mount.renderer = renderer;
      if (renderer.reservesBottomBar) {
        this.query(".viewport")!.classList.add("reserve-bottom-bar");
      } else {
        this.barVisibility = new BarVisibility(this.setBarVisible);
        this.barVisibility.shown();
      }
      await renderer.mount(mount.host, item, {
        signal: mount.controller.signal,
        reportInteraction: () => {
          if (this.activeMount === mount) this.barVisibility?.interacted();
        },
        reportError: (error) => this.reportRendererError(mount, error),
        requestDebugRefresh: () => {
          if (item.debugMode && this.activeMount === mount)
            this.refreshDebug(mount);
        }
      });
      if (this.activeMount !== mount) return;

      const controls = renderer.mediaControls?.() ?? [];
      for (const control of controls) control.classList.add("nav-button");
      this.query(".media-controls")!.replaceChildren(...controls);
      if (item.debugMode) this.refreshDebug(mount);
    } catch (error) {
      this.reportRendererError(mount, error);
    } finally {
      if (this.activeMount === mount) this.query(".spinner")!.hidden = true;
    }
  }

  private reportRendererError(mount: ActiveMount, error: unknown): void {
    if (this.activeMount !== mount) return;
    const message = this.query(".viewer-error")!;
    message.textContent = error instanceof Error ? error.message : String(error);
    message.hidden = false;
  }

  private refreshDebug(mount: ActiveMount): void {
    const panel = this.query(".debug-panel")!;
    const entries = mount.renderer?.debugEntries?.() ?? [];
    const lang = this.ownerDocument.defaultView?.navigator.language ?? "";
    const hint = lang.startsWith("ja") ? CONTROLS_HINT.ja : CONTROLS_HINT.en;
    const lines = entries.map(({ label, value }) => `${label}: ${value}`);
    panel.replaceChildren(
      ...[...lines, hint].map((line) => {
        const row = this.ownerDocument.createElement("div");
        row.textContent = line;
        return row;
      })
    );
    panel.hidden = false;
  }

  private clearRenderer(): void {
    const mount = this.activeMount;
    this.activeMount = undefined;
    this.barVisibility?.dispose();
    this.barVisibility = undefined;
    this.query(".viewport")!.classList.remove("reserve-bottom-bar");
    if (mount) {
      mount.controller.abort();
      mount.renderer?.unmount();
      mount.host.remove();
    }

    clearInterval(this.debugTimer);
    this.debugTimer = undefined;
    const panel = this.query(".debug-panel")!;
    panel.hidden = true;
    panel.replaceChildren();
    this.query(".media-controls")!.replaceChildren();
    this.query(".spinner")!.hidden = true;
    const error = this.query(".viewer-error")!;
    error.hidden = true;
    error.textContent = "";
  }
}

if (!customElements.get("cc-viewer")) {
  customElements.define("cc-viewer", CcViewer);
}

declare global {
  interface HTMLElementTagNameMap {
    "cc-viewer": CcViewer;
  }
}
