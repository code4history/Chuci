# Chuci Components

Web Components provided by `@c4h/chuci` and their attributes, methods, events,
and usage examples.

## Supported Media Types

- **image**: Regular images (jpg, png, gif, etc.)
- **panorama**: 360° panoramic images
- **youtube**: YouTube videos (provide YouTube URL)
- **video**: HTML5 videos (mp4, webm, etc.)
- **3dmodel**: 3D models (OBJ/MTL format)
- **gaussian**: Gaussian splatting files (.splat, .ply)

## Components

### `<cc-swiper>`

Main carousel component.

**Attributes:**
- `has-thumb`: Show thumbnail gallery
- `autoplay`: Enable autoplay

**Methods:**
- `openViewer(imageUrl: string, imageType: string, slideIndex?: number)`: Programmatically open viewer
  - `imageUrl`: URL of the media to display
  - `imageType`: Type of media (see supported types above)
  - `slideIndex`: Optional slide index (default: 0)

**Events:**
- `slidechange`: Fired when slide changes
  - `detail.activeIndex`: Current active slide index

**Properties:**
- `slider`: Access to underlying Swiper instance

### `<cc-swiper-slide>`

Individual slide component.

**Attributes:**
- `thumbnail-url`: URL for thumbnail image (required)
- `image-url`: URL for full media (required)
- `image-type`: Media type (see supported types above) (required)
- `caption`: Optional caption text

**3D Model & Gaussian Splatting Attributes:**
- `material-url`: Material file URL for 3D models (OBJ/MTL)
- `debug-mode`: Enable debug information display (`"true"` or `"false"`)
- `camera-position`: Initial camera position as `"x,y,z"` (e.g., `"0,1,5"`)
- `camera-target`: Camera target position as `"x,y,z"` (e.g., `"0,0,0"`)
- `show-texture`: Show/hide texture for 3D models (`"true"` or `"false"`)
- `fit-to-container`: Fit model to container size (`"true"` or `"false"`)

### Viewer Components

All viewer components inherit from `CcViewerBase` and support:

**Methods:**
- `open(url: string)`: Open viewer with media URL
- `close()`: Close viewer

**Properties:**
- `showPrevButton` (boolean): Show/hide previous navigation button
- `showNextButton` (boolean): Show/hide next navigation button

**Events:**
- `close`: Fired when viewer is closed
- `navigate-prev`: Fired when previous button is clicked
- `navigate-next`: Fired when next button is clicked

---

## Usage Examples

### Programmatic Usage

```javascript
import '@c4h/chuci';

// Get swiper element
const swiper = document.querySelector('cc-swiper');

// Open viewer programmatically
swiper.openViewer('path/to/image.jpg', 'image', 0);

// Listen to slide changes
swiper.addEventListener('slidechange', (e) => {
  console.log('Current slide:', e.detail.activeIndex);
});
```

### With Thumbnails Gallery

```html
<cc-swiper has-thumb>
  <cc-swiper-slide thumbnail-url="..." image-url="..." image-type="image"></cc-swiper-slide>
  <cc-swiper-slide thumbnail-url="..." image-url="..." image-type="image"></cc-swiper-slide>
</cc-swiper>
```

### Autoplay

```html
<cc-swiper autoplay>
  <!-- slides -->
</cc-swiper>
```

### 3D Model Viewer

```html
<cc-swiper-slide
  thumbnail-url="thumb.jpg"
  image-url="model.obj"
  image-type="3dmodel"
  material-url="model.mtl"
  debug-mode="true"
  camera-position="0,1,5"
  camera-target="0,0,0"
  show-texture="true">
</cc-swiper-slide>
```

### Gaussian Splatting Viewer

```html
<cc-swiper-slide
  thumbnail-url="thumb.jpg"
  image-url="scene.splat"
  image-type="gaussian"
  debug-mode="true"
  camera-position="0,0,10">
</cc-swiper-slide>
```

### YouTube Video

```html
<cc-swiper-slide
  thumbnail-url="thumb.jpg"
  image-url="https://www.youtube.com/watch?v=VIDEO_ID"
  image-type="youtube">
</cc-swiper-slide>
```

---

## Styling

CSS Custom Properties:

```css
cc-swiper {
  --cc-slider-theme-color: #007aff;
  --cc-slider-navigation-color: #007aff;
}

cc-viewer-base,
cc-viewer-image,
cc-viewer-panorama,
cc-viewer-youtube,
cc-viewer-video,
cc-viewer-3dmodel,
cc-viewer-gaussian {
  --cc-viewer-z-index: 1000;
}
```

---

## See also

- [API index](README.md) — install / quick start / ecosystem
- [Main README](../README.md) — install / quick start / ecosystem
