import type { MediaItem } from "@/core/media-item";
import { THUMBNAIL_GENERATOR_VERSION } from "./generate";

const DATABASE_NAME = "chuci-thumbnails";
const STORE_NAME = "thumbnails";
const DEFAULT_LIMIT_BYTES = 50 * 1024 * 1024;

interface ThumbnailRecord {
  key: string;
  blob: Blob;
  size: number;
  lastUsed: number;
}

/** Stable key for every input that can change the generated picture. */
export function thumbnailCacheKey(item: MediaItem, maxSize: number): string {
  return JSON.stringify([
    item.url,
    item.type,
    item.cameraPosition,
    item.cameraTarget,
    item.materialUrl,
    item.showTexture,
    item.fitToContainer,
    maxSize,
    THUMBNAIL_GENERATOR_VERSION,
  ]);
}

/** IndexedDB-backed LRU cache. Storage failures never prevent media browsing. */
export class ThumbnailCache {
  private constructor(
    private readonly db: IDBDatabase | undefined,
    private readonly limitBytes: number,
  ) {}

  static async open(limitBytes = DEFAULT_LIMIT_BYTES): Promise<ThumbnailCache> {
    return new Promise((resolve) => {
      let settled = false;
      const fallback = () => {
        if (settled) return;
        settled = true;
        resolve(new ThumbnailCache(undefined, limitBytes));
      };
      try {
        if (typeof indexedDB === "undefined") {
          fallback();
          return;
        }
        const request = indexedDB.open(DATABASE_NAME, 1);
        request.onupgradeneeded = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: "key" });
          }
        };
        request.onerror = fallback;
        request.onblocked = fallback;
        request.onsuccess = () => {
          if (settled) {
            request.result.close();
            return;
          }
          settled = true;
          resolve(new ThumbnailCache(request.result, limitBytes));
        };
      } catch {
        fallback();
      }
    });
  }

  get(key: string): Promise<Blob | undefined> {
    if (!this.db) return Promise.resolve(undefined);
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);
      let blob: Blob | undefined;
      request.onsuccess = () => {
        const record = request.result as ThumbnailRecord | undefined;
        if (!record) return;
        blob = record.blob;
        record.lastUsed = Date.now();
        store.put(record);
      };
      transaction.oncomplete = () => resolve(blob);
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  }

  put(key: string, blob: Blob): Promise<void> {
    if (!this.db) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      store.put({ key, blob, size: blob.size, lastUsed: Date.now() } satisfies ThumbnailRecord);
      const request = store.getAll();
      request.onsuccess = () => {
        const records = (request.result as ThumbnailRecord[]).sort((a, b) => a.lastUsed - b.lastUsed);
        let total = records.reduce((sum, record) => sum + record.size, 0);
        for (const record of records) {
          if (total <= this.limitBytes) break;
          store.delete(record.key);
          total -= record.size;
        }
      };
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  }
}
