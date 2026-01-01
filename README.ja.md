# Chuci (楚辞)

[![CI](https://github.com/code4history/Chuci/actions/workflows/ci.yml/badge.svg)](https://github.com/code4history/Chuci/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/@c4h%2Fchuci.svg)](https://www.npmjs.com/package/@c4h/chuci)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


[Quyuan](https://github.com/code4history/Quyuan)から抽出されたスタンドアロンのマルチメディアスワイパーとビューアWebコンポーネントライブラリです。フレームワークに依存せず、タッチ対応のカルーセルとマルチメディアビューアを提供します。

## 特徴

- 🚀 **フレームワーク非依存**: 純粋なWeb Components、任意のフレームワークまたはバニラJSで動作
- 📱 **タッチ対応**: Swiper.jsをベースとしたスムーズなタッチ操作
- 🎬 **複数のメディアタイプ**: 画像、パノラマ、動画、YouTube、3Dモデル、Gaussianスプラットに対応
- 🔧 **ゼロ依存関係**: すべての依存関係がバンドル済み（Lit依存なし）
- 📦 **軽量**: tree-shakingサポートによる最適化されたバンドルサイズ
- 🛠️ **TypeScript**: 型定義付きの完全なTypeScriptサポート

## 要件

- **Node.js**: 20以降
- **パッケージマネージャー**: pnpm 9.0.0以降（推奨）
- **ブラウザ**: Web Componentsをサポートするモダンブラウザ
  - Chrome/Edge 79+
  - Firefox 63+
  - Safari 12.1+

## インストール

### pnpmを使用（推奨）

```bash
pnpm add @c4h/chuci
```

### npmを使用

```bash
npm install @c4h/chuci
```

### CDN（ブラウザ）

```html
<script src="https://cdn.jsdelivr.net/npm/@c4h/chuci@latest/dist/chuci.umd.js"></script>
<script>
  // コンポーネントはグローバルにChuciとして利用可能
  // HTMLで直接カスタム要素を使用できます
</script>
```

## 使用方法

### 基本的なスワイパー

```html
<cc-swiper>
  <cc-swiper-slide 
    thumbnail-url="thumb1.jpg" 
    image-url="full1.jpg" 
    image-type="image"
    caption="最初の画像">
  </cc-swiper-slide>
  <cc-swiper-slide 
    thumbnail-url="thumb2.jpg" 
    image-url="full2.jpg" 
    image-type="image"
    caption="2番目の画像">
  </cc-swiper-slide>
</cc-swiper>

<script type="module">
  import '@c4h/chuci'
</script>
```

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

## サポートされるメディアタイプ

- **image**: 通常の画像（jpg, png, gif など）
- **panorama**: 360°パノラマ画像
- **youtube**: YouTube動画（YouTube URLを提供）
- **video**: HTML5動画（mp4, webm など）
- **3dmodel**: 3Dモデル（OBJ/MTL形式）
- **gaussian**: Gaussianスプラッティングファイル（.splat, .ply）

## コンポーネント

### `<cc-swiper>`

メインのカルーセルコンポーネント。

**属性:**
- `has-thumb`: サムネイルギャラリーを表示
- `autoplay`: 自動再生を有効化

**メソッド:**
- `openViewer(imageUrl: string, imageType: string, slideIndex?: number)`: プログラムでビューアを開く
  - `imageUrl`: 表示するメディアのURL
  - `imageType`: メディアのタイプ（上記のサポートされるタイプを参照）
  - `slideIndex`: オプションのスライドインデックス（デフォルト: 0）

**イベント:**
- `slidechange`: スライドが変更されたときに発火
  - `detail.activeIndex`: 現在のアクティブなスライドインデックス

**プロパティ:**
- `slider`: 基盤となるSwiperインスタンスへのアクセス

### `<cc-swiper-slide>`

個別のスライドコンポーネント。

**属性:**
- `thumbnail-url`: サムネイル画像のURL（必須）
- `image-url`: フルメディアのURL（必須）
- `image-type`: メディアタイプ（上記のサポートされるタイプを参照）（必須）
- `caption`: オプションのキャプションテキスト

**3DモデルとGaussianスプラット用の属性:**
- `material-url`: 3Dモデル用のマテリアルファイルURL（OBJ/MTL）
- `debug-mode`: デバッグ情報の表示を有効化（`"true"` または `"false"`）
- `camera-position`: 初期カメラ位置を `"x,y,z"` 形式で指定（例: `"0,1,5"`）
- `camera-target`: カメラターゲット位置を `"x,y,z"` 形式で指定（例: `"0,0,0"`）
- `show-texture`: 3Dモデルのテクスチャの表示/非表示（`"true"` または `"false"`）
- `fit-to-container`: モデルをコンテナサイズに合わせる（`"true"` または `"false"`）

### ビューアコンポーネント

すべてのビューアコンポーネントは`CcViewerBase`を継承し、以下をサポートします:

**メソッド:**
- `open(url: string)`: メディアURLでビューアを開く
- `close()`: ビューアを閉じる

**プロパティ:**
- `showPrevButton` (boolean): 前へナビゲーションボタンの表示/非表示
- `showNextButton` (boolean): 次へナビゲーションボタンの表示/非表示

**イベント:**
- `close`: ビューアが閉じられたときに発火
- `navigate-prev`: 前へボタンがクリックされたときに発火
- `navigate-next`: 次へボタンがクリックされたときに発火

### メディア固有の例

#### 3Dモデルビューア
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

#### Gaussianスプラッティングビューア
```html
<cc-swiper-slide
  thumbnail-url="thumb.jpg"
  image-url="scene.splat"
  image-type="gaussian"
  debug-mode="true"
  camera-position="0,0,10">
</cc-swiper-slide>
```

#### YouTube動画
```html
<cc-swiper-slide
  thumbnail-url="thumb.jpg"
  image-url="https://www.youtube.com/watch?v=VIDEO_ID"
  image-type="youtube">
</cc-swiper-slide>
```

## スタイリング

CSSカスタムプロパティ:

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

## ブラウザサポート

ブラウザ互換性の詳細については、[要件](#要件)セクションを参照してください。

## 開発

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm run dev

# テストの実行
pnpm test

# ライブラリのビルド
pnpm run build
```

## ライセンス

MIT License

Copyright (c) 2024-2026 Code for History

詳細は[LICENSE](LICENSE)ファイルを参照してください。

## Quyuanからの移行

元のQuyuan実装から移行する場合:

1. インポートを`quyuan`から`@c4h/chuci`に変更
2. コンポーネント名は同じまま（`cc-swiper`、`cc-swiper-slide`など）
3. 3DモデルのURLはパイプ区切り形式を使用しなくなりました:
   ```html
   <!-- 旧 -->
   <cc-swiper-slide image-url="model.obj|model.mtl" ...>
   
   <!-- 新 -->
   <cc-swiper-slide image-url="model.obj" material-url="model.mtl" ...>
   ```

## クレジット

Code for Historyによる[Quyuan](https://github.com/code4history/Quyuan)から抽出。