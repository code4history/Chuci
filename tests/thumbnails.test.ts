import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { IDBFactory } from "fake-indexeddb";
import { Blob as NodeBlob } from "node:buffer";
import type { MediaItem } from "../src/core/media-item";
import {
  THUMBNAIL_GENERATOR_VERSION,
  generateThumbnail
} from "../src/thumbnails/generate";
import { ThumbnailCache, thumbnailCacheKey } from "../src/thumbnails/cache";
import { ThumbnailQueue, sharedThumbnailQueue } from "../src/thumbnails/queue";
import "../src/index";
import type { CcSwiper } from "../src/components/swiper/cc-swiper";

const NativeURL = URL;
let revokedUrls: string[] = [];

function makeItem(overrides: Partial<MediaItem> = {}): MediaItem {
  return {
    url: "https://example.com/image.jpg",
    type: "image",
    thumbnailUrl: "",
    caption: "",
    fitToContainer: false,
    debugMode: false,
    ...overrides
  };
}

function makeSwiper(input: MediaItem | MediaItem[]): CcSwiper {
  const el = document.createElement("cc-swiper");
  const items = Array.isArray(input) ? input : [input];
  for (const item of items) {
    const slide = document.createElement("cc-swiper-slide");
    slide.setAttribute("image-url", item.url);
    slide.setAttribute("image-type", item.type);
    if (item.thumbnailUrl) slide.setAttribute("thumbnail-url", item.thumbnailUrl);
    el.append(slide);
  }
  document.body.append(el);
  return el;
}

function flush(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

beforeEach(() => {
  vi.stubGlobal("Blob", NodeBlob);
  vi.stubGlobal("indexedDB", new IDBFactory());
  let sequence = 0;
  revokedUrls = [];
  class TestURL extends NativeURL {
    static createObjectURL(_blob: Blob): string {
      return `blob:test-${++sequence}`;
    }
    static revokeObjectURL(url: string): void {
      revokedUrls.push(url);
    }
  }
  vi.stubGlobal("URL", TestURL);
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.doUnmock("../src/thumbnails/generate");
  vi.doUnmock("../src/components/viewer/renderers/model-renderer");
  vi.doUnmock("../src/components/viewer/renderers/three-stage");
  vi.resetModules();
});

describe("thumbnailCacheKey", () => {
  test("thumbnailCacheKey changes when camera-position changes and when version changes", async () => {
    expect(THUMBNAIL_GENERATOR_VERSION).toBe(2);
    const item = makeItem({ cameraPosition: "1,2,3" });
    const original = thumbnailCacheKey(item, 256);
    expect(thumbnailCacheKey({ ...item, cameraPosition: "4,5,6" }, 256)).not.toBe(original);

    vi.resetModules();
    vi.doMock("../src/thumbnails/generate", () => ({
      THUMBNAIL_GENERATOR_VERSION: THUMBNAIL_GENERATOR_VERSION + 1
    }));
    const changed = await import("../src/thumbnails/cache");
    expect(changed.thumbnailCacheKey(item, 256)).not.toBe(original);
  });
});

describe("ThumbnailCache", () => {
  test("cache evicts least recently used when over limit", async () => {
    let now = 0;
    vi.spyOn(Date, "now").mockImplementation(() => ++now);
    const cache = await ThumbnailCache.open(6);
    const a = new Blob(["aaa"]);
    const b = new Blob(["bbb"]);
    const c = new Blob(["ccc"]);
    await cache.put("a", a);
    await cache.put("b", b);
    expect(await (await cache.get("a"))!.text()).toBe("aaa");
    await cache.put("c", c);

    expect(await (await cache.get("a"))!.text()).toBe("aaa");
    expect(await cache.get("b")).toBeUndefined();
    expect(await (await cache.get("c"))!.text()).toBe("ccc");
  });

  test("ThumbnailCache.open falls back when indexedDB is undefined", async () => {
    vi.stubGlobal("indexedDB", undefined);
    const cache = await ThumbnailCache.open();
    await expect(cache.put("key", new Blob(["value"]))).resolves.toBeUndefined();
    await expect(cache.get("key")).resolves.toBeUndefined();
  });

  test("ThumbnailCache.open falls back when the indexedDB getter throws", async () => {
    Object.defineProperty(globalThis, "indexedDB", {
      configurable: true,
      get() {
        throw new DOMException("Access denied", "SecurityError");
      }
    });
    const cache = await ThumbnailCache.open();
    await expect(cache.put("key", new Blob(["value"]))).resolves.toBeUndefined();
    await expect(cache.get("key")).resolves.toBeUndefined();
  });
});

describe("ThumbnailQueue", () => {
  test("continues generating when opening the cache rejects", async () => {
    const generate = vi.fn().mockResolvedValue(new Blob(["generated"]));
    const queue = new ThumbnailQueue({
      generate,
      cache: Promise.reject(new Error("IndexedDB unavailable"))
    });

    await expect(queue.request(makeItem(), 0)).resolves.toMatch(/^blob:/);
    expect(generate).toHaveBeenCalledOnce();
  });

  test("queue runs one at a time, current slide first", async () => {
    const starts: string[] = [];
    const resolvers = new Map<string, () => void>();
    let active = 0;
    let maxActive = 0;
    const generate = vi.fn((item: MediaItem) => {
      starts.push(item.url);
      active++;
      maxActive = Math.max(maxActive, active);
      return new Promise<Blob>((resolve) => {
        resolvers.set(item.url, () => {
          active--;
          resolve(new Blob([item.url]));
        });
      });
    });
    const queue = new ThumbnailQueue({ generate });
    const background = queue.request(makeItem({ url: "https://example.com/background.jpg" }), 2);
    const current = queue.request(makeItem({ url: "https://example.com/current.jpg" }), 0);
    const last = queue.request(makeItem({ url: "https://example.com/last.jpg" }), 3);

    await vi.waitFor(() => expect(starts).toEqual(["https://example.com/current.jpg"]));
    resolvers.get("https://example.com/current.jpg")!();
    await vi.waitFor(() => expect(starts).toEqual([
      "https://example.com/current.jpg",
      "https://example.com/background.jpg"
    ]));
    resolvers.get("https://example.com/background.jpg")!();
    await vi.waitFor(() => expect(starts).toHaveLength(3));
    resolvers.get("https://example.com/last.jpg")!();
    await Promise.all([background, current, last]);
    expect(maxActive).toBe(1);
  });

  test("reuses an in-memory Blob with a fresh object URL when IndexedDB is absent", async () => {
    vi.stubGlobal("indexedDB", undefined);
    const cache = await ThumbnailCache.open();
    const generate = vi.fn().mockResolvedValue(new Blob(["generated"]));
    const queue = new ThumbnailQueue({ generate, cache });
    const item = makeItem();

    const first = await queue.request(item, 0);
    URL.revokeObjectURL(first!);
    const second = await queue.request(item, 0);

    expect(first).toMatch(/^blob:/);
    expect(second).toMatch(/^blob:/);
    expect(second).not.toBe(first);
    expect(generate).toHaveBeenCalledOnce();
  });

  test("evicts least recently used memory Blobs without revoking live object URLs", async () => {
    vi.stubGlobal("indexedDB", undefined);
    const cache = await ThumbnailCache.open();
    const generate = vi.fn((item: MediaItem) => Promise.resolve(new Blob([item.url])));
    const queue = new ThumbnailQueue({ generate, cache, memoryCacheEntries: 2 });
    const a = makeItem({ url: "https://example.com/memory-a.jpg" });
    const b = makeItem({ url: "https://example.com/memory-b.jpg" });
    const c = makeItem({ url: "https://example.com/memory-c.jpg" });
    const aUrl = await queue.request(a, 0);
    const bUrl = await queue.request(b, 0);
    await queue.request(a, 0);
    await queue.request(c, 0);

    await queue.request(a, 0);
    expect(generate).toHaveBeenCalledTimes(3);
    await queue.request(b, 0);
    expect(generate).toHaveBeenCalledTimes(4);
    expect(revokedUrls).not.toContain(aUrl);
    expect(revokedUrls).not.toContain(bUrl);
  });

  test("reorders requests that have not started when their priority changes", async () => {
    const starts: string[] = [];
    const resolvers = new Map<string, () => void>();
    const generate = vi.fn((item: MediaItem) => {
      starts.push(item.url);
      return new Promise<Blob>((resolve) => {
        resolvers.set(item.url, () => resolve(new Blob([item.url])));
      });
    });
    const queue = new ThumbnailQueue({ generate });
    const a = makeItem({ url: "https://example.com/a.jpg" });
    const b = makeItem({ url: "https://example.com/b.jpg" });
    const c = makeItem({ url: "https://example.com/c.jpg" });
    const first = queue.request(a, 0);
    const second = queue.request(b, 1);
    const third = queue.request(c, 2);
    await vi.waitFor(() => expect(starts).toEqual([a.url]));

    queue.updatePriority(c, 0);
    resolvers.get(a.url)!();
    await vi.waitFor(() => expect(starts).toEqual([a.url, c.url]));
    resolvers.get(c.url)!();
    await vi.waitFor(() => expect(starts).toEqual([a.url, c.url, b.url]));
    resolvers.get(b.url)!();
    await Promise.all([first, second, third]);
  });

  test("keeps icon and records failure on CORS error", async () => {
    const generate = vi.fn().mockRejectedValue(new Error("CORS"));
    const cache = await ThumbnailCache.open();
    const put = vi.spyOn(cache, "put");
    const queue = new ThumbnailQueue({ generate, cache });
    const item = makeItem();

    const first = await queue.request(item, 0);
    const second = await queue.request(item, 0);
    expect(first).toBeNull();
    expect(second).toBeNull();
    expect(generate).toHaveBeenCalledTimes(1);
    expect(put).not.toHaveBeenCalled();
  });
});

describe("thumbnail slider integration", () => {
  test("all sliders on the page share one thumbnail queue", async () => {
    const queues = new Set<ThumbnailQueue>();
    vi.spyOn(ThumbnailQueue.prototype, "request").mockImplementation(function (
      this: ThumbnailQueue,
    ) {
      queues.add(this);
      return Promise.resolve(null);
    });
    makeSwiper(makeItem({ url: "https://example.com/first.jpg" }));
    makeSwiper(makeItem({ url: "https://example.com/second.jpg" }));
    await flush();

    expect(queues.size).toBe(1);
  });

  test("goTo reprioritizes thumbnail requests around the visible slide", async () => {
    vi.spyOn(ThumbnailQueue.prototype, "request").mockReturnValue(new Promise(() => {}));
    const updatePriority = vi.spyOn(ThumbnailQueue.prototype, "updatePriority");
    const items = ["a", "b", "c"].map((name) => makeItem({ url: `https://example.com/${name}.jpg` }));
    const el = makeSwiper(items);

    el.goTo(2);

    expect(updatePriority).toHaveBeenCalledWith(items[2], 0);
    expect(updatePriority).toHaveBeenCalledWith(items[0], 1);
    expect(updatePriority).toHaveBeenCalledWith(items[1], 2);
  });

  test("duplicate slides keep their highest priority for a shared thumbnail key", async () => {
    vi.stubGlobal("indexedDB", undefined);
    const originalGenerate = Reflect.get(sharedThumbnailQueue, "generate");
    const originalCache = Reflect.get(sharedThumbnailQueue, "cache");
    const starts: string[] = [];
    const resolvers = new Map<string, () => void>();
    const generate = vi.fn((item: MediaItem) => {
      starts.push(item.url);
      return new Promise<Blob>((resolve) => {
        resolvers.set(item.url, () => resolve(new Blob([item.url])));
      });
    });
    Reflect.set(sharedThumbnailQueue, "generate", generate);
    Reflect.set(sharedThumbnailQueue, "cache", ThumbnailCache.open());
    const items = ["a", "b", "c", "d", "c"].map((name) =>
      makeItem({ url: `https://example.com/duplicate-${name}.jpg` })
    );
    try {
      const el = makeSwiper(items);
      await vi.waitFor(() => expect(starts).toEqual([items[0].url]));
      el.goTo(2);
      resolvers.get(items[0].url)!();
      await vi.waitFor(() => expect(starts).toHaveLength(2));

      expect(starts[1]).toBe(items[2].url);
      for (const index of [2, 3, 1]) {
        await vi.waitFor(() => expect(starts).toContain(items[index].url));
        resolvers.get(items[index].url)!();
      }
      await flush();
    } finally {
      for (const resolve of resolvers.values()) resolve();
      await flush();
      Reflect.set(sharedThumbnailQueue, "generate", originalGenerate);
      Reflect.set(sharedThumbnailQueue, "cache", originalCache);
    }
  });

  test("slider uses thumbnail-url when present and never calls generator", async () => {
    const request = vi.spyOn(ThumbnailQueue.prototype, "request");
    const el = makeSwiper(makeItem({ thumbnailUrl: "https://example.com/thumb.jpg" }));
    await flush();
    expect(el.shadowRoot!.querySelector<HTMLImageElement>(".viewer")!.getAttribute("src"))
      .toBe("https://example.com/thumb.jpg");
    expect(request).not.toHaveBeenCalled();
  });

  test("slider shows icon then swaps to generated object URL", async () => {
    vi.spyOn(ThumbnailQueue.prototype, "request").mockResolvedValue("blob:generated");
    const el = makeSwiper(makeItem());
    const image = el.shadowRoot!.querySelector<HTMLImageElement>(".viewer")!;
    expect(image.getAttribute("src")).toMatch(/^data:image\/svg\+xml/);
    await vi.waitFor(() => expect(image.getAttribute("src")).toBe("blob:generated"));
  });

  test("youtube url without video id keeps icon", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const el = makeSwiper(makeItem({
      type: "youtube",
      url: "https://www.youtube.com/watch"
    }));
    const image = el.shadowRoot!.querySelector<HTMLImageElement>(".viewer")!;
    const icon = image.getAttribute("src");
    await flush();
    expect(image.getAttribute("src")).toBe(icon);
    expect(icon).toMatch(/^data:image\/svg\+xml/);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  test("applies a completion to its own slide when reordering precedes the rebuild", async () => {
    class DeferredMutationObserver {
      constructor(_callback: MutationCallback) {}
      observe() {}
      disconnect() {}
    }
    vi.stubGlobal("MutationObserver", DeferredMutationObserver);
    const items = ["a", "b"].map((name) => makeItem({ url: `https://example.com/${name}.jpg` }));
    const resolvers = new Map<string, (value: string | null) => void>();
    vi.spyOn(ThumbnailQueue.prototype, "request").mockImplementation((item) =>
      new Promise<string | null>((resolve) => resolvers.set(item.url, resolve))
    );
    const el = makeSwiper(items);
    const [firstSlide, secondSlide] = el.slides;
    const images = Array.from(el.shadowRoot!.querySelectorAll<HTMLImageElement>(".viewer"));
    const secondIcon = images[1].getAttribute("src");

    resolvers.get(items[0].url)!("blob:first");
    el.insertBefore(secondSlide, firstSlide);
    await flush();

    expect(images[0].getAttribute("src")).toBe("blob:first");
    expect(images[1].getAttribute("src")).toBe(secondIcon);
  });

  test("revokes object URLs on rebuild and restores a fresh thumbnail", async () => {
    const request = vi.spyOn(ThumbnailQueue.prototype, "request")
      .mockResolvedValueOnce("blob:old")
      .mockResolvedValue("blob:new");
    const el = makeSwiper(makeItem());
    await vi.waitFor(() => expect(
      el.shadowRoot!.querySelector<HTMLImageElement>(".viewer")!.getAttribute("src")
    ).toBe("blob:old"));

    const second = document.createElement("cc-swiper-slide");
    second.setAttribute("image-url", "https://example.com/second.jpg");
    second.setAttribute("thumbnail-url", "https://example.com/second-thumb.jpg");
    el.append(second);
    await vi.waitFor(() => expect(
      el.shadowRoot!.querySelector<HTMLImageElement>(".viewer")!.getAttribute("src")
    ).toBe("blob:new"));
    expect(revokedUrls).toContain("blob:old");
    expect(request).toHaveBeenCalledTimes(2);
  });

  test("rebuild restores a generated thumbnail from memory without IndexedDB", async () => {
    vi.stubGlobal("indexedDB", undefined);
    const originalGenerate = Reflect.get(sharedThumbnailQueue, "generate");
    const originalCache = Reflect.get(sharedThumbnailQueue, "cache");
    const generate = vi.fn().mockResolvedValue(new Blob(["generated"]));
    Reflect.set(sharedThumbnailQueue, "generate", generate);
    Reflect.set(sharedThumbnailQueue, "cache", ThumbnailCache.open());
    try {
      const el = makeSwiper(makeItem({ url: "https://example.com/rebuild-memory.jpg" }));
      const image = el.shadowRoot!.querySelector<HTMLImageElement>(".viewer")!;
      await vi.waitFor(() => expect(image.getAttribute("src")).toMatch(/^blob:/));
      const firstSource = image.getAttribute("src")!;

      const second = document.createElement("cc-swiper-slide");
      second.setAttribute("image-url", "https://example.com/rebuild-other.jpg");
      second.setAttribute("thumbnail-url", "https://example.com/rebuild-other-thumb.jpg");
      el.append(second);
      await vi.waitFor(() => {
        expect(image.isConnected).toBe(false);
        const current = el.shadowRoot!.querySelector<HTMLImageElement>(".viewer")!;
        expect(current.getAttribute("src")).toMatch(/^blob:/);
        expect(current.getAttribute("src")).not.toBe(firstSource);
      });

      expect(generate).toHaveBeenCalledOnce();
      expect(revokedUrls).toContain(firstSource);
    } finally {
      Reflect.set(sharedThumbnailQueue, "generate", originalGenerate);
      Reflect.set(sharedThumbnailQueue, "cache", originalCache);
    }
  });

  test("rebuild restores memory thumbnails synchronously while another generation is pending", async () => {
    vi.stubGlobal("indexedDB", undefined);
    const originalGenerate = Reflect.get(sharedThumbnailQueue, "generate");
    const originalCache = Reflect.get(sharedThumbnailQueue, "cache");
    let finishPending!: (blob: Blob) => void;
    const pending = new Promise<Blob>((resolve) => { finishPending = resolve; });
    const generate = vi.fn((item: MediaItem) =>
      item.url.includes("pending") ? pending : Promise.resolve(new Blob(["generated"]))
    );
    Reflect.set(sharedThumbnailQueue, "generate", generate);
    Reflect.set(sharedThumbnailQueue, "cache", ThumbnailCache.open());
    try {
      const el = makeSwiper(makeItem({ url: "https://example.com/sync-rebuild.jpg" }));
      const oldImage = el.shadowRoot!.querySelector<HTMLImageElement>(".viewer")!;
      await vi.waitFor(() => expect(oldImage.getAttribute("src")).toMatch(/^blob:/));
      const firstSource = oldImage.getAttribute("src")!;

      makeSwiper(makeItem({ url: "https://example.com/pending.jpg" }));
      await vi.waitFor(() => expect(generate).toHaveBeenCalledWith(
        expect.objectContaining({ url: "https://example.com/pending.jpg" }),
        expect.anything()
      ));
      const second = document.createElement("cc-swiper-slide");
      second.setAttribute("image-url", "https://example.com/sync-other.jpg");
      second.setAttribute("thumbnail-url", "https://example.com/sync-other-thumb.jpg");
      el.append(second);
      await vi.waitFor(() => expect(oldImage.isConnected).toBe(false));

      const current = el.shadowRoot!.querySelector<HTMLImageElement>(".viewer")!;
      expect(current.getAttribute("src")).toMatch(/^blob:/);
      expect(current.getAttribute("src")).not.toBe(firstSource);
      expect(revokedUrls).toContain(firstSource);
    } finally {
      finishPending(new Blob(["pending"]));
      await flush();
      Reflect.set(sharedThumbnailQueue, "generate", originalGenerate);
      Reflect.set(sharedThumbnailQueue, "cache", originalCache);
    }
  });

  test("does not apply an old result to a replacement slide", async () => {
    let resolveOld!: (value: string | null) => void;
    const oldResult = new Promise<string | null>((resolve) => { resolveOld = resolve; });
    vi.spyOn(ThumbnailQueue.prototype, "request").mockImplementation((item) =>
      item.url.includes("old") ? oldResult : Promise.resolve("blob:replacement")
    );
    const el = makeSwiper(makeItem({ url: "https://example.com/old.jpg" }));
    const oldSlide = el.querySelector("cc-swiper-slide")!;
    oldSlide.setAttribute("image-url", "https://example.com/replacement.jpg");
    oldSlide.remove();
    const replacement = document.createElement("cc-swiper-slide");
    replacement.setAttribute("image-url", "https://example.com/replacement.jpg");
    el.append(replacement);
    resolveOld("blob:old-result");

    await vi.waitFor(() => expect(
      el.shadowRoot!.querySelector<HTMLImageElement>(".viewer")!.getAttribute("src")
    ).toBe("blob:replacement"));
    expect(revokedUrls).toContain("blob:old-result");
  });

  test("revokes generated object URLs when disconnected", async () => {
    vi.spyOn(ThumbnailQueue.prototype, "request").mockResolvedValue("blob:generated");
    const el = makeSwiper(makeItem());
    await vi.waitFor(() => expect(
      el.shadowRoot!.querySelector<HTMLImageElement>(".viewer")!.getAttribute("src")
    ).toBe("blob:generated"));
    el.remove();
    expect(revokedUrls).toContain("blob:generated");
  });
});

describe("generateThumbnail", () => {
  test("rejects a 3D thumbnail when a required texture failed to load", async () => {
    vi.resetModules();
    const capture = vi.fn().mockResolvedValue(new Blob(["gray"]));
    const prepareModelScene = vi.fn().mockResolvedValue({ textureLoadFailed: true });
    vi.doMock("../src/components/viewer/renderers/model-renderer", () => ({ prepareModelScene }));
    vi.doMock("../src/components/viewer/renderers/three-stage", () => ({
      ThreeStage: class {
        capture = capture;
        dispose = vi.fn();
      }
    }));
    const { generateThumbnail: generate } = await import("../src/thumbnails/generate");

    await expect(generate(makeItem({
      type: "3dmodel",
      url: "https://example.com/model.obj",
      materialUrl: "https://example.com/model.mtl"
    }))).rejects.toThrow("texture");
    expect(capture).not.toHaveBeenCalled();
  });

  test("closes an ImageBitmap when aborted while createImageBitmap is pending", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(new Blob(["image"])));
    vi.stubGlobal("OffscreenCanvas", class {});
    let finishBitmap!: (bitmap: ImageBitmap) => void;
    const close = vi.fn();
    vi.stubGlobal("createImageBitmap", vi.fn(() => new Promise<ImageBitmap>((resolve) => {
      finishBitmap = resolve;
    })));
    const controller = new AbortController();
    const pending = generateThumbnail(makeItem(), { signal: controller.signal });
    await vi.waitFor(() => expect(createImageBitmap).toHaveBeenCalledOnce());
    controller.abort();
    finishBitmap({ width: 100, height: 100, close } as unknown as ImageBitmap);

    await expect(pending).rejects.toMatchObject({ name: "AbortError" });
    expect(close).toHaveBeenCalledOnce();
  });

  test("fetches the public YouTube thumbnail as a Blob", async () => {
    const blob = new Blob(["thumbnail"], { type: "image/jpeg" });
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(blob, { status: 200 }));
    const result = await generateThumbnail(makeItem({
      type: "youtube",
      url: "https://youtu.be/abc123"
    }));
    expect(result).toEqual(blob);
    expect(fetch).toHaveBeenCalledWith(
      "https://i.ytimg.com/vi/abc123/hqdefault.jpg",
      expect.objectContaining({ signal: expect.any(AbortSignal) })
    );
  });
});
