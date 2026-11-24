import { expect, test } from "vitest";
import "../src/index";

test("the shared viewer backdrop uses --cc-viewer-z-index with a default of 1000", () => {
  const viewer = document.createElement("cc-viewer");
  document.body.append(viewer);

  const root = viewer.shadowRoot!;
  const styles = root.querySelector("style")!.textContent;
  expect(root.querySelector(".backdrop .nav-close")).not.toBeNull();
  expect(styles).toMatch(
    /\.backdrop\s*\{[^}]*z-index:\s*var\(--cc-viewer-z-index,\s*1000\)/
  );
});
