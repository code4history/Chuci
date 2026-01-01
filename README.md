# Chuci (楚辞)

[![CI](https://github.com/code4history/Chuci/actions/workflows/ci.yml/badge.svg)](https://github.com/code4history/Chuci/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/@c4h%2Fchuci.svg)](https://www.npmjs.com/package/@c4h/chuci)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A standalone multimedia swiper and viewer web components library extracted from [Quyuan](https://github.com/code4history/Quyuan). Provides touch-enabled carousel and multimedia viewers without any framework dependencies.

## Features

- 🚀 **Framework-agnostic**: Pure Web Components, works with any framework or vanilla JS
- 📱 **Touch-enabled**: Built on Swiper.js for smooth touch interactions
- 🎬 **Multiple media types**: Support for images, panoramas, videos, YouTube, 3D models, and Gaussian splats
- 🔧 **Zero dependencies**: All dependencies are bundled (no Lit dependency)
- 📦 **Lightweight**: Optimized bundle size with tree-shaking support
- 🛠️ **TypeScript**: Full TypeScript support with type definitions

## Requirements

- **Node.js**: 20 or higher
- **Package Manager**: pnpm 9.0.0 or higher (recommended)
- **Browser**: Any modern browser supporting Web Components
  - Chrome/Edge 79+
  - Firefox 63+
  - Safari 12.1+

## Installation

### Using pnpm (recommended)

```bash
pnpm add @c4h/chuci
```

### Using npm

```bash
npm install @c4h/chuci
```

### CDN (Browser)

```html
<script src="https://cdn.jsdelivr.net/npm/@c4h/chuci@latest/dist/chuci.umd.js"></script>
<script>
  // Components are available globally as Chuci
  // Use custom elements directly in HTML
</script>
```

## Usage

### Basic Swiper

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

### Media-specific Examples

#### 3D Model Viewer
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

#### Gaussian Splatting Viewer
```html
<cc-swiper-slide
  thumbnail-url="thumb.jpg"
  image-url="scene.splat"
  image-type="gaussian"
  debug-mode="true"
  camera-position="0,0,10">
</cc-swiper-slide>
```

#### YouTube Video
```html
<cc-swiper-slide
  thumbnail-url="thumb.jpg"
  image-url="https://www.youtube.com/watch?v=VIDEO_ID"
  image-type="youtube">
</cc-swiper-slide>
```

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

## Browser Support

See [Requirements](#requirements) section for browser compatibility details.

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Run tests
pnpm test

# Build library
pnpm run build
```

## License

MIT License

Copyright (c) 2024-2026 Code for History

See [LICENSE](LICENSE) file for details.

## Migration from Quyuan

If you're migrating from the original Quyuan implementation:

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