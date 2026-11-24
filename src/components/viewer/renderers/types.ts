import type { MediaItem } from "@/core/media-item";

export interface DebugEntry {
  label: string;
  value: string;
}

export interface RendererContext {
  signal: AbortSignal;
  reportInteraction(): void;
  reportError(error: unknown): void;
  requestDebugRefresh(): void;
}

export interface MediaRenderer {
  /** Keep the caption bar visible below the media's available area. */
  readonly reservesBottomBar?: boolean;
  /** Resolve when the media is ready, or reject on load failure or cancellation. */
  mount(
    host: HTMLElement,
    item: MediaItem,
    ctx: RendererContext
  ): Promise<void>;
  /** Release resources even if mount has not settled yet. */
  unmount(): void;
  resetView?(): void;
  /** Supply applicable entries in order: camera, target, field of view, load state. */
  debugEntries?(): DebugEntry[];
  mediaControls?(): HTMLElement[];
}
