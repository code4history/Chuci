<!-- SECTION 1: Header (badges, title) -->
<h1 align="center">Chuci</h1>

<p align="center">
  [![CI](https://github.com/code4history/Chuci/actions/workflows/ci.yml/badge.svg)](https://github.com/code4history/Chuci/actions/workflows/ci.yml)
  [![npm version](https://img.shields.io/npm/v/@c4h/chuci)](https://www.npmjs.com/package/@c4h/chuci)
  [![License](https://img.shields.io/npm/l/@c4h/chuci)](LICENSE)
</p>

<!-- SECTION 2: Elevator Pitch -->
## About Chuci

Chuci is a standalone multimedia swiper and viewer Web Components library,
extracted from [Quyuan](https://github.com/code4history/Quyuan).
It provides a touch-enabled carousel and multimedia viewers (images, panoramas,
videos, YouTube, 3D models, Gaussian splats) without any framework dependencies.
The project name comes from
[楚辞 (Chuci)](https://en.wikipedia.org/wiki/Chu_Ci), an ancient Chinese
anthology of poems.

Chuci is open-source under the MIT License.

<!-- SECTION 3: Language switch link -->
**[Read this document in Japanese / 日本語で読む](README.ja.md)**

<!-- SECTION 4: Key Features -->
## Key Features

- Framework-agnostic: pure Web Components, works with any framework or vanilla JS
- Touch-enabled carousel built on Swiper.js
- Multiple media types: images, panoramas, videos, YouTube, 3D models, Gaussian splats
- Zero dependencies: all dependencies bundled (no Lit dependency)
- Lightweight with tree-shaking support and full TypeScript definitions

<!-- SECTION 5: Quick Start -->
## Quick Start

> Release-dependent information (ADR-0012). The CDN example below uses `@latest`;
> pin a specific version for production use.

### Install

```bash
# pnpm (recommended)
pnpm add @c4h/chuci

# npm
npm install @c4h/chuci
```

### Minimal usage

```html
<cc-swiper>
  <cc-swiper-slide
    thumbnail-url="thumb1.jpg"
    image-url="full1.jpg"
    image-type="image"
    caption="First image">
  </cc-swiper-slide>
  <cc-swiper-slide
    thumbnail-url="thumb2.jpg"
    image-url="full2.jpg"
    image-type="image"
    caption="Second image">
  </cc-swiper-slide>
</cc-swiper>

<script type="module">
  import '@c4h/chuci'
</script>
```

### CDN (jsDelivr)

```html
<script src="https://cdn.jsdelivr.net/npm/@c4h/chuci@latest/dist/chuci.umd.js"></script>
<script>
  // Components are available globally as Chuci
  // Use custom elements directly in HTML
</script>
```

### API reference

- **API signatures** (release-dependent): see [`docs/api/`](docs/api/)

### Development

#### Setup
Clone the repository and install dependencies.

```bash
git clone https://github.com/code4history/Chuci.git
cd Chuci
pnpm install
```

#### Development Server

```bash
pnpm run dev
```

#### Build

```bash
pnpm run build
```

#### Test

```bash
pnpm test
```

<!-- SECTION 6: Prerequisites -->
## Prerequisites

> Runtime requirements (ADR-0012: release-dependent).

- Node.js: `20` or higher
- pnpm: `9.0.0` or higher (recommended)
- Browser: any modern browser supporting Web Components
  - Chrome / Edge 79+
  - Firefox 63+
  - Safari 12.1+

<!-- SECTION 7: Peer Dependencies -->
<!-- Chuci has zero dependencies (all bundled). This section is omitted. -->

<!-- SECTION 8: Ecosystem / Related Repositories -->
## Ecosystem

Chuci is part of the Maplat ecosystem by [Code for History](https://github.com/code4history).
See the full ecosystem map (8 repositories + product/corporate sites):

📖 **Ecosystem Map** — *(the diagram is currently kept in a private planning
repository; the Sister repositories table below is the public substitute)*

### Sister repositories

| Repository | License | npm | Role |
|---|---|---|---|
| [Maplat](https://github.com/code4history/Maplat) | Apache 2.0 | `@maplat/ui` | Main viewer |
| [MaplatCore](https://github.com/code4history/MaplatCore) | Apache 2.0 | `@maplat/core` | Core library |
| [MaplatTin](https://github.com/code4history/MaplatTin) | Apache 2.0 | `@maplat/tin` | TIN conversion |
| [MaplatTransform](https://github.com/code4history/MaplatTransform) | Apache 2.0 | `@maplat/transform` | Coordinate transform |
| [MaplatEditor](https://github.com/code4history/MaplatEditor) | Apache 2.0 | — | Data authoring tool (desktop) |

> MaplatEditor is the data authoring tool used to create the maps and POIs
> that the viewers above render. The Maplat ecosystem is end-to-end:
> author with MaplatEditor, serve with any of the viewer libraries.

<!-- SECTION 9: Nayuta links -->
<!-- MIT-licensed repositories (Weiwudi / Quyuan / Chuci) carry no Nayuta link (ADR-0012). -->

<!-- SECTION 10: License -->
## License

MIT License — see [LICENSE](LICENSE).

```
Copyright (c) 2024-2026 Code for History

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

<!-- SECTION 11: Contributors / Sponsors (optional) -->
<!-- Chuci has no Contributors / Sponsors section. -->

---

## Migration from Quyuan

If you are migrating from the original Quyuan implementation:

1. Change imports from `quyuan` to `@c4h/chuci`
2. Component names remain the same (`cc-swiper`, `cc-swiper-slide`, etc.)
3. 3D model URLs no longer use pipe-separated format:
   ```html
   <!-- Old -->
   <cc-swiper-slide image-url="model.obj|model.mtl" ...>

   <!-- New -->
   <cc-swiper-slide image-url="model.obj" material-url="model.mtl" ...>
   ```

## Credits

Extracted from [Quyuan](https://github.com/code4history/Quyuan) by Code for History.
