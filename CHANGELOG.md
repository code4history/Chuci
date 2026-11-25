# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### 日本語

#### 2.0 の破壊的変更
- メディア別の `cc-viewer-base`・`cc-viewer-image`・`cc-viewer-panorama`・`cc-viewer-youtube`・`cc-viewer-video`・`cc-viewer-3dmodel`・`cc-viewer-gaussian` 要素を削除し、全メディアで `cc-viewer` に統一した。
- `cc-viewer.open(url, type, attributes)` を `open(items, index, { loop })` に変更した。`setSwiper`・`setCurrentSlideIndex` と、基盤の Swiper を返す `cc-swiper.slider` を削除した。`cc-swiper.openViewer` は `openViewer(index)` となり、スライド変更イベントは `slidechange` から `cc-swiper-index-change`（`detail.index`）へ変わった。ビューアの連携には `cc-viewer-index-change`・`cc-viewer-close` を使う。
- カルーセルと画像・360 度ビューアを自前の実装へ替え、Gaussian の描画を Spark へ移した。これに伴い Swiper・viewer.js・gsplat と A-Frame の CDN 読み込みをなくし、`@sparkjsdev/spark` を追加した。three.js は引き続き使う。
- `youtube` 種別は YouTube の動画だけを表示する。以前は YouTube と判定できない HTTPS ページもそのまま枠に表示していた。

#### 2.0 の追加
- 元メディアからサムネイルを生成する `generateThumbnail` API を追加。`thumbnail-url` がないスライドでは IndexedDB の保存済みサムネイルを使い、なければ裏で 1 件ずつ生成する。ブラウザ上の作成ツールからも同じ API を呼べる。

#### 2.0 の修正
- 送り操作で現在の描画位置からスライドを動かし、画面外のスライドの回り込みを描画しないよう修正。0〜1 枚では前後ボタンを隠し、黒い帯の非選択の点を見やすくした。
- スライダーを外したときに不要なサムネイル生成を中止し、応答が止まった生成は期限後に次へ進めるよう修正。Gaussian のサムネイルの構図を出力解像度から分離した。
- Gaussian で `camera-position`・`camera-target` を読むだけでカメラへ適用していなかった問題を修正。
- 3D メッシュで `show-texture` が開くたびに初期値へ戻っていた問題と、`fit-to-container` が表示へ反映されなかった問題を修正。
- 1.0.2 の「既知の問題」で告知し、次の月次で直すと約束していた不具合を修正（#28）。`cc-swiper` を「前へ」で 1 回戻したあと `cc-viewer` で画像を送ると裏の `realIndex` が 1 つずれ、閉じたときに別の画像が表示される問題で、ループ中は `slideToLoop` を使うようになり、サムネイルクリックで起きる余分な移動もなくなった。なお、この修正は Swiper 前提のもので、2.0 では Swiper を外したため修正対象だった `realIndex`・`slideToLoop` の仕組み自体がなくなる。

### English

#### 2.0 breaking changes
- Removed the media-specific `cc-viewer-base`, `cc-viewer-image`, `cc-viewer-panorama`, `cc-viewer-youtube`, `cc-viewer-video`, `cc-viewer-3dmodel`, and `cc-viewer-gaussian` elements. All media now use `cc-viewer`.
- Replaced `cc-viewer.open(url, type, attributes)` with `open(items, index, { loop })`. Removed `setSwiper`, `setCurrentSlideIndex`, and `cc-swiper.slider`, which exposed the underlying Swiper instance. `cc-swiper.openViewer` is now `openViewer(index)`, and the slide-change event is `cc-swiper-index-change` (`detail.index`) instead of `slidechange`. Use `cc-viewer-index-change` and `cc-viewer-close` for viewer integration.
- Replaced the carousel and image/panorama viewers with Chuci's own implementations and moved Gaussian rendering to Spark. Removed Swiper, viewer.js, gsplat, and the A-Frame CDN dependency; added `@sparkjsdev/spark`. three.js remains in use.
- The `youtube` type now displays YouTube videos only. Previously it embedded other HTTPS pages directly in the frame.

#### 2.0 added
- Added the `generateThumbnail` API for creating thumbnails from source media. Slides without `thumbnail-url` use cached thumbnails from IndexedDB or generate them sequentially in the background. Browser-based authoring tools can call the same API.

#### 2.0 fixed
- Slide navigation starts at the current rendered positions and wraps offscreen slides outside the viewport. Navigation arrows are hidden for zero or one slide, and inactive dots are easier to see on the black bar.
- Removing a carousel cancels thumbnail work that nobody else is waiting for, and a stalled task gives way to the next one after its deadline. Gaussian thumbnail framing stays consistent across output resolutions.
- Applied Gaussian `camera-position` and `camera-target` to the camera instead of merely reading them.
- Honored 3D model `show-texture` when reopening the viewer and made `fit-to-container` affect the rendered view.
- Fixed the bug announced under "Known issues" in 1.0.2 and promised for the next monthly release (#28). After going back once with "previous" in `cc-swiper` and then navigating in `cc-viewer`, the underlying `realIndex` drifted by one and a different image was shown on close. Loop mode now uses `slideToLoop`, and the extra move on thumbnail click is gone. This fix applied to the Swiper-based implementation; in 2.0, removing Swiper also removes the `realIndex` / `slideToLoop` mechanism that contained the bug.

## [1.0.2] - 2026-11-02

1.0.2-rc.1 と同じ内容の正式版です（版番号のみ変更）。変更点は 1.0.2-rc.1 までの各項を参照してください。

### 既知の問題
- `cc-swiper` を「前へ」で 1 回戻したあと `cc-viewer` で画像を送ると、裏の `realIndex` が 1 つずれ、閉じたときに別の画像が表示されます。1.0.1 から存在する不具合で、次の月次リリースで修正します。

### Known issues
- After going back once with "previous" in `cc-swiper` and then navigating in `cc-viewer`, the underlying `realIndex` is off by one, and a different image is shown on close. This bug has existed since 1.0.1 and will be fixed in the next monthly release.

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