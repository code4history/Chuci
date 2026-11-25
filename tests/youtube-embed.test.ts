import { describe, it, test, expect, beforeEach } from "vitest";
import { toYouTubeIframeSrc } from "../src/utils/youtube-embed";
import { readMediaItem } from "../src/index";

const EMBED = "https://www.youtube.com/embed/abc123XYZ";

describe("落とす（https でない・解釈できない値は null）", () => {
  it.each([
    ["javascript:alert(1)"],
    ["JaVaScRiPt:alert(1)"],
    [" javascript:alert(1)"],
    ["\tjavascript:alert(1)"],
    ["\u0001javascript:alert(1)"],
    ["data:text/html,<script>alert(1)</script>"],
    ["vbscript:msgbox(1)"],
    ["http://example.com/"],
    ["foo/bar"],
    ["//example.com/"],
    ["javascript://www.youtube.com/watch?v=abc"],
    ['x" onmouseover="alert(1)'],
    // レビューの指摘: スキームの無い YouTube URL は従来は埋め込みへ変換していたが、
    // https ではないので表示しない（利用者に見える退行。CHANGELOG に記載）
    ["www.youtube.com/watch?v=abc123XYZ"],
  ])("%j → null", (input) => {
    expect(toYouTubeIframeSrc(input)).toBeNull();
  });
});

describe("変換（YouTube の URL は https の埋め込み形式へ）", () => {
  it.each([
    ["https://www.youtube.com/watch?v=abc123XYZ", EMBED],
    ["https://www.youtube.com/watch?feature=share&v=abc123XYZ", EMBED],
    ["https://www.youtube.com/watch?v=abc123XYZ&t=30s", EMBED],
    ["https://youtu.be/abc123XYZ", EMBED],
    ["https://youtu.be/abc123XYZ?t=30", EMBED],
    ["https://www.youtube.com/embed/abc123XYZ", EMBED],
    ["https://m.youtube.com/watch?v=abc123XYZ", EMBED],
    ["https://youtube.com/shorts/abc123XYZ", EMBED],
    ["https://www.youtube.com/live/abc123XYZ", EMBED],
    ["HTTPS://WWW.YOUTUBE.COM/watch?v=abc123XYZ", EMBED],
    ["http://www.youtube.com/watch?v=abc123XYZ", EMBED],
    ["http://youtu.be/abc123XYZ", EMBED],
    [
      "https://www.youtube-nocookie.com/embed/abc123XYZ",
      "https://www.youtube-nocookie.com/embed/abc123XYZ",
    ],
  ])("%s → %s", (input, expected) => {
    expect(toYouTubeIframeSrc(input)).toBe(expected);
  });
});

describe("有効な YouTube 動画 ID が取れない HTTPS は拒否", () => {
  it.each([
    ["https://example.com/"],
    ["https://evil.example/youtube.com/watch?v=abc"],
    ["https://www.youtube.com.evil.example/watch?v=abc"],
    ['https://www.youtube.com/watch?v=a"b'],
    ["https://www.youtube.com/"],
    [" https://example.com/"],
  ])("%s → null", (input) => {
    expect(toYouTubeIframeSrc(input)).toBeNull();
  });
});

// 共通ビューアと YouTube 描画部への結線。描画部の生成を待つ。
const flush = () => new Promise<void>((r) => setTimeout(r, 0));

function openYoutube(url: string): HTMLElement {
  const slide = document.createElement("cc-swiper-slide");
  slide.setAttribute("image-type", "youtube");
  slide.setAttribute("image-url", url);
  const el = document.createElement("cc-viewer");
  document.body.append(el);
  el.open([readMediaItem(slide)], 0);
  return el;
}

function iframeOf(el: Element): HTMLIFrameElement | null {
  return el.shadowRoot!.querySelector("iframe");
}

describe("結線（cc-viewer の YouTube iframe src）", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("javascript: を open すると src を付けない", async () => {
    const el = openYoutube("javascript:alert(1)");
    await flush();
    const iframe = iframeOf(el);
    expect(iframe, "iframe が生成されていること").not.toBeNull();
    expect(iframe!.getAttribute("src")).toBeNull();
  });

  test("YouTube 以外の HTTPS ページは共通のエラー表示になる", async () => {
    const el = openYoutube("https://example.com/");
    await flush();
    expect(iframeOf(el)?.getAttribute("src") ?? null).toBeNull();
    expect(el.shadowRoot!.querySelector<HTMLElement>(".viewer-error")!.hidden).toBe(false);
  });
});
