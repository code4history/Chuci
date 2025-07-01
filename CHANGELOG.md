# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-01-13

### Added
- Initial release of Chuci Web Components library
- `cc-swiper` component for creating multimedia carousels
- `cc-swiper-slide` component for individual carousel slides
- `cc-viewer` base viewer component with navigation support
- `cc-viewer-image` for displaying images with ViewerJS integration
- `cc-viewer-video` for HTML5 video playback
- `cc-viewer-youtube` for YouTube video embedding
- `cc-viewer-panorama` for 360° panoramic images
- `cc-viewer-3dmodel` for 3D model viewing with Three.js
- `cc-viewer-gaussian` for Gaussian Splatting visualization
- TypeScript type definitions
- ESM, CommonJS, and UMD build outputs

### Fixed
- Shadow DOM rendering issues for WebGL-based viewers (3D Model and Gaussian)
- Navigation button event handling across all viewer types
- Duplicate event listener registration
- ViewerJS timing issues in image viewer

### Changed
- Unified viewer implementation using Template Method pattern
- Simplified 3D model data format from pipe-separated to separate attributes
- Migrated to Code4History standards with @c4h scope