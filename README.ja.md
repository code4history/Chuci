# Chuci (楚辞)

[Quyuan](https://github.com/code4history/Quyuan)から抽出されたスタンドアロンのマルチメディアスワイパーとビューアWebコンポーネントライブラリです。フレームワークに依存せず、タッチ対応のカルーセルとマルチメディアビューアを提供します。

## 特徴

- 🚀 **フレームワーク非依存**: 純粋なWeb Components、任意のフレームワークまたはバニラJSで動作
- 📱 **タッチ対応**: Swiper.jsをベースとしたスムーズなタッチ操作
- 🎬 **複数のメディアタイプ**: 画像、パノラマ、動画、YouTube、3Dモデル、Gaussianスプラットに対応
- 🔧 **ゼロ依存関係**: すべての依存関係がバンドル済み（Lit依存なし）
- 📦 **軽量**: tree-shakingサポートによる最適化されたバンドルサイズ
- 🛠️ **TypeScript**: 型定義付きの完全なTypeScriptサポート

## インストール

```bash
npm install @c4h/chuci
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

### `<cc-swiper-slide>`

個別のスライドコンポーネント。

**属性:**
- `thumbnail-url`: サムネイル画像のURL
- `image-url`: フルメディアのURL
- `image-type`: メディアタイプ（上記のサポートされるタイプを参照）
- `caption`: オプションのキャプションテキスト

### ビューア固有の属性

3DモデルとGaussianスプラット用:
- `fit-to-container`: モデルをコンテナサイズに合わせる
- `debug-mode`: デバッグ情報を表示
- `camera-position`: 初期カメラ位置を設定（例: "0,0,5"）
- `camera-target`: カメラターゲットを設定（例: "0,0,0"）
- `show-texture`: テクスチャの表示/非表示（3Dモデル用）

## スタイリング

CSSカスタムプロパティ:

```css
cc-swiper {
  --cc-slider-theme-color: #007aff;
  --cc-slider-navigation-color: #007aff;
}

cc-viewer {
  --cc-viewer-z-index: 1000;
}
```

## ブラウザサポート

Web Componentsをサポートするすべてのモダンブラウザで動作:
- Chrome/Edge 79+
- Firefox 63+
- Safari 12.1+

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

MIT License - 詳細はLICENSEファイルを参照してください。

## クレジット

Code for Historyによる[Quyuan](https://github.com/code4history/Quyuan)から抽出。