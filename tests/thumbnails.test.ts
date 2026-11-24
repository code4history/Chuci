import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { IDBFactory } from "fake-indexeddb";
import { Blob as NodeBlob } from "node:buffer";
import type { MediaItem } from "../src/core/media-item";
import {
  THUMBNAIL_GENERATOR_VERSION,
  generateThumbnail
} from "../src/thumbnails/generate";
import { ThumbnailCache, thumbnailCacheKey } from "../src/thumbnails/cache";
import { ThumbnailQueue } from "../src/thumbnails/queue";
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

function makeSwiper(item: MediaItem): CcSwiper {
  const el = document.createElement("cc-swiper");
  const slide = document.createElement("cc-swiper-slide");
  slide.setAttribute("image-url", item.url);
  slide.setAttribute("image-type", item.type);
  if (item.thumbnailUrl) slide.setAttribute("thumbnail-url", item.thumbnailUrl);
  el.append(slide);
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
  vi.resetModules();
});

describe("thumbnailCacheKey", () => {
  test("thumbnailCacheKey changes when camera-position changes and when version changes", async () => {
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
});

describe("ThumbnailQueue", () => {
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
