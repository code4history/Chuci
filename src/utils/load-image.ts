export function loadImage(
  document: Document,
  url: string,
  signal: AbortSignal,
  description = "image",
): Promise<HTMLImageElement> {
  signal.throwIfAborted();
  const image = document.createElement("img");
  image.crossOrigin = "anonymous";
  return new Promise((resolve, reject) => {
    const cleanup = () => {
      signal.removeEventListener("abort", abort);
      image.onload = null;
      image.onerror = null;
    };
    const abort = () => {
      cleanup();
      image.removeAttribute("src");
      reject(signal.reason);
    };
    image.onload = () => {
      cleanup();
      resolve(image);
    };
    image.onerror = () => {
      cleanup();
      reject(new Error(`Failed to load ${description}: ${url}`));
    };
    signal.addEventListener("abort", abort, { once: true });
    image.setAttribute("src", url);
  });
}
