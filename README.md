# Chuci (楚辞)

A standalone multimedia swiper and viewer web components library extracted from [Quyuan](https://github.com/code4history/Quyuan). Provides touch-enabled carousel and multimedia viewers without any framework dependencies.

## Features

- 🚀 **Framework-agnostic**: Pure Web Components, works with any framework or vanilla JS
- 📱 **Touch-enabled**: Built on Swiper.js for smooth touch interactions
- 🎬 **Multiple media types**: Support for images, panoramas, videos, YouTube, 3D models, and Gaussian splats
- 🔧 **Zero dependencies**: All dependencies are bundled (no Lit dependency)
- 📦 **Lightweight**: Optimized bundle size with tree-shaking support
- 🛠️ **TypeScript**: Full TypeScript support with type definitions

## Installation

```bash
npm install @c4h/chuci
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

### `<cc-swiper-slide>`

Individual slide component.

**Attributes:**
- `thumbnail-url`: URL for thumbnail image
- `image-url`: URL for full media
- `image-type`: Media type (see supported types above)
- `caption`: Optional caption text

### Viewer-specific Attributes

For 3D models and Gaussian splats:
- `fit-to-container`: Fit model to container size
- `debug-mode`: Show debug information
- `camera-position`: Set initial camera position (e.g., "0,0,5")
- `camera-target`: Set camera target (e.g., "0,0,0")
- `show-texture`: Show/hide textures (for 3D models)

## Styling

CSS Custom Properties:

```css
cc-swiper {
  --cc-slider-theme-color: #007aff;
  --cc-slider-navigation-color: #007aff;
}

cc-viewer {
  --cc-viewer-z-index: 1000;
}
```

## Browser Support

Works in all modern browsers that support Web Components:
- Chrome/Edge 79+
- Firefox 63+
- Safari 12.1+

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

MIT License - see LICENSE file for details.

## Credits

Extracted from [Quyuan](https://github.com/code4history/Quyuan) by Code for History.