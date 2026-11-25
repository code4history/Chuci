# Chuci Components

Web Components and browser APIs provided by `@c4h/chuci`.

## Supported Media Types

- **image**: Regular images (JPEG, PNG, GIF, etc.). Unknown `image-type` values are also treated as `image`.
- **panorama**: 360° equirectangular images rendered with three.js.
- **youtube**: YouTube videos or other HTTPS iframe content.
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

YouTube URLs (`youtube.com`, `youtu.be`, and `youtube-nocookie.com`, using HTTP
or HTTPS) are converted to HTTPS embed URLs. Any other HTTPS URL is embedded as
is. Non-HTTPS URLs, including `javascript:` and URLs without a scheme, are not
displayed.

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

async function createAndStoreThumbnail(slide, storeBlob) {
  const controller = new AbortController();
  const blob = await generateThumbnail(readMediaItem(slide), {
    maxSize: 256,
    signal: controller.signal
  });
  const storedUrl = await storeBlob(blob);
  slide.setAttribute('thumbnail-url', storedUrl);

  // When cancelling an unfinished operation:
  // controller.abort();
}
```

- `image` and `video` produce WebP. `panorama`, `3dmodel`, and `gaussian` produce PNG. `youtube` returns the public YouTube thumbnail Blob.
- Video thumbnails use the frame at 0.5 seconds, or the nearest available earlier frame for shorter videos.
- This is a browser API, not a Node-only API. Panorama, 3D model, and Gaussian thumbnails require WebGL; image thumbnails require the browser's bitmap/canvas APIs.
- The media server must permit CORS whenever media pixels are fetched or copied to a canvas. This includes cross-origin images, video frames, textures, models, and splats. YouTube's public thumbnail must also be fetchable from the page.
- Gaussian generation loads Spark on demand, just like Gaussian viewing.

When `thumbnail-url` is omitted, the carousel checks IndexedDB
(`chuci-thumbnails`), temporarily shows a media-type icon if necessary, and
generates missing thumbnails in the background. The current slide has priority,
and generation proceeds one item at a time. Failures leave the icon in place
and are remembered only for the page lifetime.

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
- [Main README](../README.md) — install / quick start / ecosystem
