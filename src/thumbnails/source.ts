import { loadImage } from "@/utils/load-image";

export const THUMBNAIL_MAX_SOURCE_BYTES = 64 * 1024 * 1024;

// Progress listeners keyed by the generation signal. The queue uses them to
// tell a slow but moving download from a stalled one without widening the
// public generateThumbnail options.
const progressListeners = new WeakMap<AbortSignal, () => void>();

/** Call `listener` whenever a thumbnail source read on `signal` receives data. */
export function onThumbnailProgress(signal: AbortSignal, listener: () => void): void {
  progressListeners.set(signal, listener);
}

/** Forward progress reported on `to` (a derived signal) to the listener of `from`. */
export function forwardThumbnailProgress(from: AbortSignal | undefined, to: AbortSignal): void {
  const listener = from && progressListeners.get(from);
  if (listener) progressListeners.set(to, listener);
}

function reportThumbnailProgress(signal: AbortSignal): void {
  progressListeners.get(signal)?.();
}

export class ThumbnailSourceTooLargeError extends Error {
  constructor() {
    super("Thumbnail source exceeds 64 MiB");
  }
}

/** Read at most 64 MiB of the response, including when the length is unknown or compressed. */
export async function fetchThumbnailSource(url: string, signal: AbortSignal): Promise<Blob> {
  signal.throwIfAborted();
  if (!url) throw new Error("No thumbnail source URL provided");
  const response = await fetch(url, { signal });
  if (!response.ok || Number(response.headers.get("Content-Length")) > THUMBNAIL_MAX_SOURCE_BYTES) {
    void response.body?.cancel().catch(() => {});
    if (!response.ok) throw new Error(`Failed to load thumbnail source (HTTP ${response.status})`);
    throw new ThumbnailSourceTooLargeError();
  }

  const chunks: BlobPart[] = [];
  const reader = response.body?.getReader();
  if (reader) {
    let bytes = 0;
    const cancel = () => { void reader.cancel().catch(() => {}); };
    signal.addEventListener("abort", cancel, { once: true });
    try {
      signal.throwIfAborted();
      for (;;) {
        const { value, done } = await reader.read();
        signal.throwIfAborted();
        if (done) break;
        reportThumbnailProgress(signal);
        bytes += value.byteLength;
        if (bytes > THUMBNAIL_MAX_SOURCE_BYTES) throw new ThumbnailSourceTooLargeError();
        chunks.push(value);
      }
    } catch (error) {
      cancel();
      throw error;
    } finally {
      signal.removeEventListener("abort", cancel);
      reader.releaseLock();
    }
  }
  signal.throwIfAborted();
  return new Blob(chunks, { type: response.headers.get("Content-Type") ?? "" });
}

export async function loadThumbnailImage(
  document: Document,
  url: string,
  signal: AbortSignal,
): Promise<HTMLImageElement> {
  const source = await fetchThumbnailSource(url, signal);
  const objectUrl = URL.createObjectURL(source);
  try {
    return await loadImage(document, objectUrl, signal);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
