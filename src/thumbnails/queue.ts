import type { MediaItem } from "@/core/media-item";
import { ThumbnailCache, thumbnailCacheKey } from "./cache";
import {
  DEFAULT_THUMBNAIL_SIZE,
  generateThumbnail,
  youtubeThumbnailUrl,
} from "./generate";

type Generator = typeof generateThumbnail;
type Waiter = { resolve: (value: string | null) => void };
type Task = {
  item: MediaItem;
  key: string;
  priority: number;
  waiters: Waiter[];
};

export interface ThumbnailQueueOptions {
  generate?: Generator;
  cache?: ThumbnailCache | Promise<ThumbnailCache>;
  maxSize?: number;
}

/** Serial generation queue. Lower priority values run first. */
export class ThumbnailQueue {
  private readonly generate: Generator;
  private readonly cache: Promise<ThumbnailCache | undefined>;
  private readonly maxSize: number;
  private readonly tasks: Task[] = [];
  private readonly byKey = new Map<string, Task>();
  private readonly blobs = new Map<string, Blob>();
  private readonly failedKeys = new Set<string>();
  private draining = false;

  constructor(options: ThumbnailQueueOptions = {}) {
    this.generate = options.generate ?? generateThumbnail;
    this.cache = Promise.resolve(options.cache ?? ThumbnailCache.open()).catch(() => undefined);
    this.maxSize = options.maxSize ?? DEFAULT_THUMBNAIL_SIZE;
  }

  request(item: MediaItem, priority: number): Promise<string | null> {
    const key = thumbnailCacheKey(item, this.maxSize);
    if (this.failedKeys.has(key)) return Promise.resolve(this.failureFallback(item));
    const existing = this.byKey.get(key);
    if (existing) {
      existing.priority = Math.min(existing.priority, priority);
      return new Promise((resolve) => {
        existing.waiters.push({ resolve });
      });
    }
    const task: Task = { item, key, priority, waiters: [] };
    this.byKey.set(key, task);
    this.tasks.push(task);
    const result = new Promise<string | null>((resolve) => {
      task.waiters.push({ resolve });
    });
    this.startDrain();
    return result;
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
    const cache = await this.cache;
    let blob: Blob | undefined;
    try {
      blob = await cache?.get(task.key);
    } catch {
      blob = undefined;
    }
    blob ??= this.blobs.get(task.key);
    if (!blob) {
      try {
        blob = await this.generate(task.item, { maxSize: this.maxSize });
        try {
          await cache?.put(task.key, blob);
        } catch {
          // A generated picture remains usable when persistent storage fails.
        }
      } catch {
        this.failedKeys.add(task.key);
        this.byKey.delete(task.key);
        for (const waiter of task.waiters) waiter.resolve(this.failureFallback(task.item));
        return;
      }
    }
    this.blobs.set(task.key, blob);
    this.byKey.delete(task.key);
    for (const waiter of task.waiters) {
      try {
        waiter.resolve(URL.createObjectURL(blob));
      } catch {
        waiter.resolve(null);
      }
    }
  }

  private failureFallback(item: MediaItem): string | null {
    return item.type === "youtube" ? youtubeThumbnailUrl(item.url) : null;
  }
}

/** Page-wide queue: generation, memory cache, and failure memory are shared by all sliders. */
export const sharedThumbnailQueue = new ThumbnailQueue();
