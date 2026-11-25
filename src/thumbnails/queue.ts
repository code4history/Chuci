import type { MediaItem } from "@/core/media-item";
import { ThumbnailCache, thumbnailCacheKey } from "./cache";
import {
  DEFAULT_THUMBNAIL_SIZE,
  generateThumbnail,
  youtubeThumbnailUrl,
} from "./generate";

export const THUMBNAIL_MEMORY_CACHE_ENTRIES = 50;
export const THUMBNAIL_TASK_TIMEOUT_MS = 30_000;

type Generator = typeof generateThumbnail;
type Waiter = (value: string | null) => void;
type Task = {
  item: MediaItem;
  key: string;
  priority: number;
  controller: AbortController;
  waiters: Set<Waiter>;
};

export interface ThumbnailQueueOptions {
  generate?: Generator;
  cache?: ThumbnailCache | Promise<ThumbnailCache>;
  maxSize?: number;
  memoryCacheEntries?: number;
}

/** Serial generation queue. Lower priority values run first. */
export class ThumbnailQueue {
  private readonly generate: Generator;
  private readonly cache: Promise<ThumbnailCache | undefined>;
  private readonly maxSize: number;
  private readonly memoryCacheEntries: number;
  private readonly tasks: Task[] = [];
  private readonly byKey = new Map<string, Task>();
  private readonly blobs = new Map<string, Blob>();
  private readonly failedKeys = new Set<string>();
  private draining = false;

  constructor(options: ThumbnailQueueOptions = {}) {
    this.generate = options.generate ?? generateThumbnail;
    this.cache = Promise.resolve(options.cache ?? ThumbnailCache.open()).catch(() => undefined);
    this.maxSize = options.maxSize ?? DEFAULT_THUMBNAIL_SIZE;
    this.memoryCacheEntries = Math.max(
      0,
      Math.floor(options.memoryCacheEntries ?? THUMBNAIL_MEMORY_CACHE_ENTRIES)
    );
  }

  request(item: MediaItem, priority: number, signal?: AbortSignal): Promise<string | null> {
    if (signal?.aborted) return Promise.resolve(null);
    const key = thumbnailCacheKey(item, this.maxSize);
    if (this.failedKeys.has(key)) return Promise.resolve(this.failureFallback(item));
    const existing = this.byKey.get(key);
    const task = existing ?? { item, key, priority, controller: new AbortController(), waiters: new Set<Waiter>() };
    task.priority = Math.min(task.priority, priority);
    if (!existing) {
      this.byKey.set(key, task);
      this.tasks.push(task);
    }
    const result = new Promise<string | null>((resolve) => {
      const finish: Waiter = (value) => {
        signal?.removeEventListener("abort", cancel);
        task.waiters.delete(finish);
        resolve(value);
      };
      const cancel = () => {
        finish(null);
        if (task.waiters.size !== 0) return;
        this.byKey.delete(key);
        const pending = this.tasks.indexOf(task);
        if (pending !== -1) this.tasks.splice(pending, 1);
        task.controller.abort();
      };
      task.waiters.add(finish);
      signal?.addEventListener("abort", cancel, { once: true });
    });
    this.startDrain();
    return result;
  }

  private readMemoryBlob(key: string): Blob | undefined {
    const blob = this.blobs.get(key);
    if (blob) {
      this.blobs.delete(key);
      this.blobs.set(key, blob);
    }
    return blob;
  }

  private storeMemoryBlob(key: string, blob: Blob): void {
    this.blobs.delete(key);
    this.blobs.set(key, blob);
    while (this.blobs.size > this.memoryCacheEntries) {
      const oldest = this.blobs.keys().next().value;
      if (oldest === undefined) break;
      this.blobs.delete(oldest);
    }
  }

  getMemoryUrl(item: MediaItem): string | null {
    const blob = this.readMemoryBlob(thumbnailCacheKey(item, this.maxSize));
    if (!blob) return null;
    try {
      return URL.createObjectURL(blob);
    } catch {
      return null;
    }
  }

  updatePriority(item: MediaItem, priority: number): void {
    const task = this.byKey.get(thumbnailCacheKey(item, this.maxSize));
    if (task && this.tasks.includes(task)) task.priority = priority;
  }

  private startDrain(): void {
    if (this.draining) return;
    this.draining = true;
    queueMicrotask(() => void this.drain());
  }

  private async drain(): Promise<void> {
    while (this.tasks.length > 0) {
      this.tasks.sort((a, b) => a.priority - b.priority);
      const task = this.tasks.shift()!;
      await this.run(task);
    }
    this.draining = false;
  }

  private async run(task: Task): Promise<void> {
    const { signal } = task.controller;
    const deadline = setTimeout(() => task.controller.abort(), THUMBNAIL_TASK_TIMEOUT_MS);
    let onAbort!: () => void;
    const aborted = new Promise<never>((_resolve, reject) => {
      onAbort = () => reject(signal.reason);
      signal.addEventListener("abort", onAbort, { once: true });
    });
    let blob: Blob | undefined;
    try {
      blob = await Promise.race([this.load(task, signal), aborted]);
      signal.throwIfAborted();
      this.storeMemoryBlob(task.key, blob);
    } catch {
      blob = undefined;
      // A real generation failure is remembered for the page. Abandonment
      // and timeouts may succeed when a later consumer requests the same key.
      if (!signal.aborted) this.failedKeys.add(task.key);
    } finally {
      clearTimeout(deadline);
      signal.removeEventListener("abort", onAbort);
      if (this.byKey.get(task.key) === task) this.byKey.delete(task.key);
    }
    for (const finish of task.waiters) {
      try {
        finish(blob ? URL.createObjectURL(blob) : this.failureFallback(task.item));
      } catch {
        finish(null);
      }
    }
  }

  private async load(task: Task, signal: AbortSignal): Promise<Blob> {
    const cache = await this.cache;
    signal.throwIfAborted();
    let blob: Blob | undefined;
    try {
      blob = await cache?.get(task.key);
    } catch {
      // Persistent storage can fail independently of thumbnail generation.
    }
    signal.throwIfAborted();
    blob ??= this.readMemoryBlob(task.key);
    if (blob) return blob;

    blob = await this.generate(task.item, { maxSize: this.maxSize, signal });
    signal.throwIfAborted();
    try {
      await cache?.put(task.key, blob);
    } catch {
      // A generated picture remains usable when persistent storage fails.
    }
    return blob;
  }

  private failureFallback(item: MediaItem): string | null {
    return item.type === "youtube" ? youtubeThumbnailUrl(item.url) : null;
  }
}

/** Page-wide queue: generation, memory cache, and failure memory are shared by all sliders. */
export const sharedThumbnailQueue = new ThumbnailQueue();
