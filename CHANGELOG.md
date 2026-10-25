# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2-rc.1] - 2026-10-25

### Security
- `cc-viewer-youtube`（`image-type="youtube"`）は https の URL だけを受け付けるようにした。YouTube の URL は埋め込み形式に直す（http の YouTube URL も https の埋め込みにする）。https でない URL（`http:` の YouTube 以外のページ・`javascript:` 等）は表示しない。スキームの無い URL（`www.youtube.com/watch?v=...`・`youtu.be/...` など。従来は埋め込みに変換していた）も表示しない。http のページを指定していた場合は https の URL に、スキームの無い URL には `https://` を付けて書き換えてください

## [1.0.1] - 2026-10-05

1.0.1-rc.2 と同じ内容の正式版です（版番号のみ変更）。変更点は 1.0.1-rc.2 までの各項を参照してください。

## [1.0.1-rc.2] - 2026-10-01

### Fixed
- `cc-swiper has-thumb` で、サムネイルをクリックするたびに `TypeError: Cannot read properties of undefined (reading 'swiper')` が出る不具合を修正（#5）

## [1.0.1-rc.1] - 2026-09-28

### Fixed
- swiper 12 で cc-swiper のナビゲーション矢印が二重に表示される不具合を修正

### Changed
- 依存関係を更新

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