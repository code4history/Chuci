# Chuci Components

`@c4h/chuci` が提供する Web Components とその属性・メソッド・イベント・使用例。

## サポートされるメディアタイプ

- **image**: 通常の画像（jpg, png, gif など）
- **panorama**: 360°パノラマ画像
- **youtube**: YouTube 動画（https の URL を指定。YouTube の URL は http も含め https の埋め込み形式に変換する。https でない URL は表示しない）
- **video**: HTML5 動画（mp4, webm など）
- **3dmodel**: 3Dモデル（OBJ/MTL形式）
- **gaussian**: Gaussian スプラッティングファイル（.splat, .ply）

## コンポーネント

### `<cc-swiper>`

メインのカルーセルコンポーネント。

**属性:**
- `has-thumb`: サムネイルギャラリーを表示
- `autoplay`: 自動再生を有効化

**メソッド:**
- `openViewer(imageUrl: string, imageType: string, slideIndex?: number)`: プログラムでビューアを開く
  - `imageUrl`: 表示するメディアの URL
  - `imageType`: メディアのタイプ（上記のサポートされるタイプを参照）
  - `slideIndex`: オプションのスライドインデックス（デフォルト: 0）

**イベント:**
- `slidechange`: スライドが変更されたときに発火
  - `detail.activeIndex`: 現在のアクティブなスライドインデックス

**プロパティ:**
- `slider`: 基盤となる Swiper インスタンスへのアクセス

### `<cc-swiper-slide>`

個別のスライドコンポーネント。

**属性:**
- `thumbnail-url`: サムネイル画像の URL（省略可。省略時は元メディアから生成）
- `image-url`: フルメディアの URL（必須）
- `image-type`: メディアタイプ（上記のサポートされるタイプを参照）（必須）
- `caption`: オプションのキャプションテキスト

**3Dモデルと Gaussian スプラット用の属性:**
- `material-url`: 3Dモデル用のマテリアルファイル URL（OBJ/MTL）
- `debug-mode`: デバッグ情報の表示を有効化（`"true"` または `"false"`）
- `camera-position`: 初期カメラ位置を `"x,y,z"` 形式で指定（例: `"0,1,5"`）
- `camera-target`: カメラターゲット位置を `"x,y,z"` 形式で指定（例: `"0,0,0"`）
- `show-texture`: 3Dモデルのテクスチャの表示/非表示（`"true"` または `"false"`）
- `fit-to-container`: モデルをコンテナサイズに合わせる（`"true"` または `"false"`）

### ビューアコンポーネント

すべてのビューアコンポーネントは `CcViewerBase` を継承し、以下をサポートします:

**メソッド:**
- `open(url: string)`: メディア URL でビューアを開く
- `close()`: ビューアを閉じる

**プロパティ:**
- `showPrevButton` (boolean): 前へナビゲーションボタンの表示/非表示
- `showNextButton` (boolean): 次へナビゲーションボタンの表示/非表示

**イベント:**
- `close`: ビューアが閉じられたときに発火
- `navigate-prev`: 前へボタンがクリックされたときに発火
- `navigate-next`: 次へボタンがクリックされたときに発火

---

## 使用例

### プログラムによる使用

```javascript
import '@c4h/chuci';

// スワイパー要素を取得
const swiper = document.querySelector('cc-swiper');

// プログラムでビューアを開く
swiper.openViewer('path/to/image.jpg', 'image', 0);

// スライド変更イベントをリッスン
swiper.addEventListener('slidechange', (e) => {
  console.log('現在のスライド:', e.detail.activeIndex);
});
```

### サムネイルギャラリー付き

```html
<cc-swiper has-thumb>
  <cc-swiper-slide thumbnail-url="..." image-url="..." image-type="image"></cc-swiper-slide>
  <cc-swiper-slide thumbnail-url="..." image-url="..." image-type="image"></cc-swiper-slide>
</cc-swiper>
```

### 自動再生

```html
<cc-swiper autoplay>
  <!-- スライド -->
</cc-swiper>
```

### 3Dモデルビューア

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

### Gaussian スプラッティングビューア

```html
<cc-swiper-slide
  thumbnail-url="thumb.jpg"
  image-url="scene.splat"
  image-type="gaussian"
  debug-mode="true"
  camera-position="0,0,10">
</cc-swiper-slide>
```

### YouTube 動画

```html
<cc-swiper-slide
  thumbnail-url="thumb.jpg"
  image-url="https://www.youtube.com/watch?v=VIDEO_ID"
  image-type="youtube">
</cc-swiper-slide>
```

YouTube の URL（`youtube.com`・`youtu.be`・`youtube-nocookie.com`。http・https とも）は https の埋め込み形式に変換する。それ以外の https の URL はそのまま埋め込む。https でない URL は表示しない（`javascript:` や、`www.youtube.com/watch?v=...` のようなスキームの無い URL を含む）。

---

## サムネイル生成 API

`generateThumbnail` は、ビューアと同じ初期表示から `Blob` を生成します。カルーセル自身だけでなく、ブラウザ上の作成ツールからも利用できます。

```javascript
import { generateThumbnail, readMediaItem } from '@c4h/chuci';

const slide = document.querySelector('cc-swiper-slide');
const item = readMediaItem(slide); // MediaItem
const controller = new AbortController();
const blob = await generateThumbnail(item, {
  maxSize: 256, // 省略可。既定は長辺 256 px
  signal: controller.signal // 省略可。中断に使用
});
```

- `image`・`video` は WebP、`panorama`・`3dmodel`・`gaussian` は PNG を出力します。`youtube` は公開サムネイルの Blob を返します。
- 動画は 0.5 秒の位置（短い動画ではその直前の利用可能なコマ）を使います。
- canvas への取り出しが必要なメディアでは、配信元の CORS 許可が必要です。360 度・3D モデル・Gaussian は WebGL が必要で、Node だけの環境では利用できません。
- `thumbnail-url` がない場合、カルーセルは IndexedDB（`chuci-thumbnails`）を先に調べ、なければ表示中のスライドを優先して裏で 1 件ずつ生成します。失敗時は種類のアイコンのままとし、失敗はページの寿命の間だけ記憶します。

---

## スタイリング

CSS カスタムプロパティ:

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

## 関連

- [API インデックス](README.ja.md) — インストール / クイックスタート / エコシステム
- [メイン README](../README.ja.md) — インストール / クイックスタート / エコシステム
