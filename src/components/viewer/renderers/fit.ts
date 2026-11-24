export function containSize(
  boxW: number,
  boxH: number,
  aspect: number
): { width: number; height: number } {
  if (boxW / aspect <= boxH) {
    return { width: boxW, height: boxW / aspect };
  }
  return { width: boxH * aspect, height: boxH };
}

export function observeContainedSize(
  host: HTMLElement,
  media: HTMLElement,
  aspect: number
): () => void {
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    const size = containSize(width, height, aspect);
    media.style.width = `${size.width}px`;
    media.style.height = `${size.height}px`;
  };
  resize();
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  return () => observer.disconnect();
}
