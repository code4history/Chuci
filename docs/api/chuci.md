# Chuci Components

Web Components and browser APIs provided by `@c4h/chuci`.

## Supported Media Types

- **image**: Regular images (JPEG, PNG, GIF, etc.). Unknown `image-type` values are also treated as `image`.
- **panorama**: 360° equirectangular images rendered with three.js.
- **youtube**: YouTube videos.
- **video**: HTML5 videos (MP4, WebM, etc.) with native playback controls.
- **3dmodel**: OBJ models with an optional MTL material.
- **gaussian**: Gaussian splatting files rendered with Spark, loaded on demand.

The carousel and image viewer are implemented by Chuci itself. It does not use
Swiper.js, viewer.js, gsplat, or A-Frame.

## Components

### `<cc-swiper>`

The carousel container. Two or more slides loop; slides always snap one item at
a time. Autoplay advances every 5 seconds, pauses while this carousel's viewer
is open, and resumes at the viewer's last selected item after it closes.

**Attributes:**

- `has-thumb`: Show the thumbnail gallery instead of the dot indicator.
- `autoplay`: Enable automatic advancement.

**Properties:**

- `index` (number): Current zero-based slide index.
- `items` (`MediaItem[]`): Media items read from the slides.
- `slides` (`Element[]`): Current `cc-swiper-slide` children.
- `loop` (boolean): Whether the carousel currently loops.

**Methods:**

- `goTo(index: number, opts?: { animate?: boolean })`: Move to a zero-based slide index.
- `openViewer(index: number): Promise<void>`: Open the fullscreen viewer at a zero-based slide index.
- `pauseAutoplay()`: Pause the autoplay timer.
- `resumeAutoplay()`: Resume autoplay when the `autoplay` attribute is present.

**Events:**

- `cc-swiper-index-change`: Fired after the slide index changes or `goTo` is called.
  - `detail.index`: Current zero-based slide index.

### `<cc-swiper-slide>`

Defines one media item. The same attributes are used for display and thumbnail
generation.

| Attribute | Meaning |
|---|---|
| `image-url` | URL of the full media (required). |
| `image-type` | `image`, `panorama`, `youtube`, `video`, `3dmodel`, or `gaussian` (required). |
| `thumbnail-url` | Explicit thumbnail URL. It takes precedence over cached and generated thumbnails. |
| `caption` | Caption shown in the carousel and viewer. |
| `material-url` | MTL material URL for a `3dmodel`. |
| `camera-position` | Initial camera position as `"x,y,z"` for `3dmodel` and `gaussian`. |
| `camera-target` | Initial camera target as `"x,y,z"` for `3dmodel` and `gaussian`. |
| `show-texture` | Set to `"false"` to hide a 3D model's texture; any other value shows it. The setting is honored when the viewer opens. |
| `fit-to-container` | Boolean attribute. Fit the whole 3D model in the container. Explicit camera position/target values take precedence. |
| `debug-mode` | Boolean attribute. Show the shared debug panel; 3D media include view and loading values. |

`fit-to-container` and `debug-mode` are true when present, including when their
value is empty. Gaussian `camera-position` and `camera-target`, and 3D model
`show-texture` and `fit-to-container`, are applied to the rendered view.

### `<cc-viewer>`

The single fullscreen viewer used for every media type. A `cc-swiper` creates it
automatically when needed. The former media-specific `cc-viewer-*` elements are
not part of the public API.

**Properties:**

- `index` (number): Current zero-based item index.

**Methods:**

- `open(items: MediaItem[], index: number, opts?: { loop?: boolean })`: Open a media list at a zero-based index.
- `close()`: Close the viewer and restore focus when possible.

**Events:**

- `cc-viewer-index-change`: Fired when the viewer moves to another item.
  - `detail.index`: Current zero-based item index.
- `cc-viewer-close`: Fired when the viewer closes.

Both index-change events bubble and cross shadow DOM boundaries. The Left and
Right Arrow keys navigate the viewer, and Escape closes it. Viewer navigation
uses the buttons and keyboard rather than swipe gestures.

### Media item helpers

`readMediaItem(element: Element): MediaItem` reads a slide into the object used
by `cc-viewer.open` and `generateThumbnail`. The `MediaItem` and `MediaType`
TypeScript types are exported from `@c4h/chuci`.

## Migrating to 2.0

### HTML-only use

Existing `cc-swiper` and `cc-swiper-slide` markup needs no API changes. Review the
new shared appearance and dependency/deployment changes: Swiper.js, viewer.js,
gsplat, and the A-Frame CDN are gone; three.js is bundled. With the ESM build,
keep every file in `dist/` together so the separate Spark chunk can load on
demand. The UMD/CDN build contains Spark instead of loading a separate chunk.

Also review attributes that previously did not affect rendering. Gaussian
`camera-position` and `camera-target`, and 3D model `show-texture` and
`fit-to-container`, now work. In particular, `fit-to-container` is a boolean
attribute: `fit-to-container="false"` still enables fitting because the
attribute is present. Remove the attribute to disable it.

### Direct JavaScript viewer control

Convert the old URL/type/attributes call to a `MediaItem[]` and pass the initial
index separately:

```javascript
// Before
const swiper = document.querySelector('cc-swiper');
const viewer = document.querySelector('cc-viewer');
viewer.setSwiper(swiper);
viewer.open('photo.jpg', 'image', { caption: 'A photo' });
viewer.setCurrentSlideIndex(0);

// After
const items = [
  { url: 'photo.jpg', type: 'image', caption: 'A photo' },
  { url: 'next.jpg', type: 'image', caption: 'Next photo' }
];
viewer.open(items, 0, { loop: true });
```

`setSwiper` and `setCurrentSlideIndex` have been removed. For a viewer linked to
a carousel, call `swiper.openViewer(index)`; no separate `setSwiper` call is
needed. Track direct viewer navigation with `cc-viewer-index-change` and its
`detail.index` instead of `setCurrentSlideIndex`:

```javascript
await swiper.openViewer(1);

document.addEventListener('cc-viewer-index-change', (event) => {
  console.log(event.detail.index);
});
```

The old media-specific `cc-viewer-*` elements are no longer available; use the
single `cc-viewer` for direct control.

## Usage Examples

### Programmatic carousel and viewer control

```javascript
import '@c4h/chuci';

const swiper = document.querySelector('cc-swiper');
swiper.goTo(1);
await swiper.openViewer(1);

swiper.addEventListener('cc-swiper-index-change', (event) => {
  console.log('Carousel index:', event.detail.index);
});

document.addEventListener('cc-viewer-index-change', (event) => {
  console.log('Viewer index:', event.detail.index);
});

document.addEventListener('cc-viewer-close', () => {
  console.log('Viewer closed');
});
```

### Thumbnail gallery and autoplay

```html
<cc-swiper has-thumb autoplay>
  <cc-swiper-slide image-url="first.jpg" image-type="image" caption="First"></cc-swiper-slide>
  <cc-swiper-slide image-url="second.jpg" image-type="image" caption="Second"></cc-swiper-slide>
</cc-swiper>
```

### 3D model

```html
<cc-swiper-slide
  image-url="model.obj"
  image-type="3dmodel"
  material-url="model.mtl"
  debug-mode
  camera-position="0,1,5"
  camera-target="0,0,0"
  show-texture="true"
  fit-to-container>
</cc-swiper-slide>
```

### Gaussian splatting

```html
<cc-swiper-slide
  image-url="scene.splat"
  image-type="gaussian"
  debug-mode
  camera-position="0,0,10"
  camera-target="0,0,0">
</cc-swiper-slide>
```

### YouTube

```html
<cc-swiper-slide
  image-url="https://www.youtube.com/watch?v=VIDEO_ID"
  image-type="youtube">
</cc-swiper-slide>
```

The `youtube` type extracts a video ID from an HTTP or HTTPS URL on `youtube.com`,
`youtu.be`, or `youtube-nocookie.com` and converts it to an HTTPS embed URL.
If no valid ID can be extracted, the viewer shows its shared error panel and the
automatic thumbnail remains a media-type icon.

## Thumbnail Generation API

```typescript
generateThumbnail(
  item: MediaItem,
  opts?: { maxSize?: number; signal?: AbortSignal }
): Promise<Blob>
```

`generateThumbnail` uses the same initial scene setup as the viewer. It is
exported for browser-based authoring tools as well as for the carousel itself.
`maxSize` limits the longest side and defaults to 256 pixels. Pass an
`AbortSignal` to cancel loading and generation.

The following example runs in an authoring tool. Its `storeBlob` callback is
supplied by that tool and returns the URL of the stored image.

```javascript
import { generateThumbnail, readMediaItem } from '@c4h/chuci';

async function appendSlideWithThumbnail(swiper, slide, storeBlob, signal) {
  const blob = await generateThumbnail(readMediaItem(slide), {
    maxSize: 256,
    signal
  });
  const storedUrl = await storeBlob(blob);
  slide.setAttribute('thumbnail-url', storedUrl);
  swiper.append(slide); // Set the URL before inserting the slide.
}

const controller = new AbortController();
await appendSlideWithThumbnail(swiper, slide, storeBlob, controller.signal);
// To cancel an unfinished operation: controller.abort();
```

- `image` and `video` produce WebP. `panorama`, `3dmodel`, and `gaussian` produce PNG. `youtube` returns the public YouTube thumbnail Blob as fetched, without resizing it to `maxSize`; a URL without an extractable YouTube video ID rejects.
- Gaussian thumbnails use a 720 CSS-pixel reference height for the field of view, keeping the same framing at a given aspect ratio across `maxSize` values.
- Video thumbnails use the frame at 0.5 seconds, or the nearest available earlier frame for shorter videos.
- This is a browser API, not a Node-only API. Image and video generation requires `OffscreenCanvas` (images also require `createImageBitmap`). Panorama, 3D model, and Gaussian generation requires WebGL 2. YouTube thumbnail retrieval requires neither `OffscreenCanvas` nor WebGL.
- The media server must permit CORS whenever media pixels are fetched or copied to a canvas. This includes cross-origin images, video frames, textures, models, and splats. YouTube's public thumbnail must also be fetchable from the page.
- Gaussian generation loads Spark on demand, just like Gaussian viewing.

An explicit `thumbnail-url` takes precedence, followed by cached results from IndexedDB
(`chuci-thumbnails`). The carousel generates missing thumbnails one at a time for the
current slide and its immediate neighbors. Other slides become eligible as you navigate.
The cache key and fetch use the same absolute source and material URLs, resolved against
the document's base URL.

Thumbnail generation limits each fetched response to 64 MiB, including OBJ, MTL, and
texture responses. Over-limit sources keep the media-type icon and are never stored in
IndexedDB. If fetching a YouTube thumbnail fails because of CORS or a similar error,
the carousel can use the public image URL directly when a video ID is available.
Other failures leave the media-type icon in place. Failures are remembered for the
page lifetime.

## Content Security Policy

If the host page sets a CSP, add the source expressions needed by the features you use.

- Gaussian (Spark) uses `'wasm-unsafe-eval'` in `script-src` and `blob:` in `worker-src`. If creating the Blob worker throws, Spark tries a `data:` worker. Allow `data:` in `worker-src` only if you need that fallback.
- Automatic thumbnails use `blob:` for generated images and `data:` for media-type icons in `img-src`. The panorama and model texture decoders also use Blob images. Video thumbnail generation uses `blob:` in `media-src`. The carousel also uses `data:` image masks for its navigation arrows.
- YouTube playback uses `frame-src https://www.youtube.com https://www.youtube-nocookie.com`. For YouTube thumbnails, allow `https://i.ytimg.com` in `connect-src` for the fetch and in `img-src` for the direct-image fallback.
- Allow the origins that serve the package and its lazy-loaded chunks in `script-src`, fetched media in `connect-src`, and directly loaded images and video in `img-src` and `media-src` respectively. Use the actual source scheme for any `blob:` or `data:` media you supply.
- The components insert inline `<style>` blocks in their shadow roots. Permit those blocks in `style-src-elem` (or `style-src` if it governs style elements), for example by allowing hashes that match the bundled style text.

## Viewer and Carousel Controls

| Input | 2D image | 3D model / Gaussian | 360° panorama |
|---|---|---|---|
| One-finger drag / left-mouse drag | Pan | Rotate around the target | Look around in the grab direction |
| Mouse wheel / pinch | Zoom around the pointer or fingers | Move closer or farther | Change the field of view |
| Two-finger drag / right-mouse drag | Pan | Pan parallel to the view | No action |
| Double-click / double-tap | Reset the initial view | Reset the initial camera | Reset the initial direction |

The close button is at the top right and navigation buttons are at the left and
right edges. A shared spinner and error panel are used for all media. The debug
panel, when enabled, appears at the top left.

## Caption and Indicator Rules

### Carousel

- The caption bar occupies space below the media rather than covering it.
- The caption is one line with overflow ellipsis; indicators are on the right.
- Two or more slides show the bar, even when the caption is empty.
- One slide shows the bar only when it has a caption.
- Two through eight slides show clickable dots. More than eight show `n / N`.
- `has-thumb` replaces dots or the counter with the thumbnail gallery.

### Viewer

- The caption wraps instead of being truncated. More than eight items use `n / N` instead of dots.
- The bar is shown when the viewer opens and after navigation.
- For overlaid viewer controls, content interaction hides the bar; without further interaction it also hides after 3 seconds. A tap without dragging or mouse movement shows it again. Navigation and close buttons fade but remain usable.
- Video viewers reserve space for the bar so it does not cover native playback controls.

## Styling

```css
cc-swiper {
  --cc-slider-theme-color: #007aff;
  --cc-slider-navigation-color: #007aff;
}

cc-viewer {
  --cc-viewer-z-index: 1000;
}
```

## See also

- [API index](README.md) — install / quick start / ecosystem
- [Main README](../../README.md) — install / quick start / ecosystem
