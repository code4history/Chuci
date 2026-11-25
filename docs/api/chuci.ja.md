# Chuci Components

`@c4h/chuci` が提供する Web Components とブラウザ API。

## サポートされるメディアタイプ

- **image**: 通常の画像（JPEG・PNG・GIF など）。不明な `image-type` も `image` として扱う。
- **panorama**: three.js で描画する 360° 正距円筒画像。
- **youtube**: YouTube 動画、またはその他の HTTPS の iframe コンテンツ。
- **video**: ブラウザ標準の再生操作を使う HTML5 動画（MP4・WebM など）。
- **3dmodel**: OBJ モデル（MTL マテリアルを指定可能）。
- **gaussian**: 必要時に読み込む Spark で描画する Gaussian スプラッティングファイル。

カルーセルと画像ビューアは Chuci 自身が実装しており、Swiper.js・viewer.js・
gsplat・A-Frame は使用しません。

## コンポーネント

### `<cc-swiper>`

カルーセルのコンテナです。2 件以上でループし、常に 1 件ずつスナップします。
自動送りは 5 秒間隔で、このカルーセルのビューアを開いている間は停止し、
閉じるとビューアで最後に選んだ項目から再開します。

**属性:**

- `has-thumb`: 点の列の代わりにサムネイルギャラリーを表示。
- `autoplay`: 自動送りを有効化。

**プロパティ:**

- `index`（number）: 現在の 0 始まりのスライド番号。
- `items`（`MediaItem[]`）: スライドから読み取ったメディア項目。
- `slides`（`Element[]`）: 現在の `cc-swiper-slide` 子要素。
- `loop`（boolean）: 現在ループするかどうか。

**メソッド:**

- `goTo(index: number, opts?: { animate?: boolean })`: 0 始まりのスライド番号へ移動。
- `openViewer(index: number): Promise<void>`: 0 始まりのスライド番号で全画面ビューアを開く。
- `pauseAutoplay()`: 自動送りのタイマーを停止。
- `resumeAutoplay()`: `autoplay` 属性がある場合に自動送りを再開。

**イベント:**

- `cc-swiper-index-change`: スライド番号の変更後、または `goTo` の呼び出し後に発火。
  - `detail.index`: 現在の 0 始まりのスライド番号。

### `<cc-swiper-slide>`

1 件のメディアを定義します。同じ属性を表示とサムネイル生成の両方に使います。

| 属性 | 意味 |
|---|---|
| `image-url` | 元メディアの URL（必須）。 |
| `image-type` | `image`・`panorama`・`youtube`・`video`・`3dmodel`・`gaussian`（必須）。 |
| `thumbnail-url` | 明示するサムネイル URL。保存済み・生成済みのサムネイルより優先。 |
| `caption` | カルーセルとビューアに表示するキャプション。 |
| `material-url` | `3dmodel` の MTL マテリアル URL。 |
| `camera-position` | `3dmodel`・`gaussian` の初期カメラ位置（`"x,y,z"`）。 |
| `camera-target` | `3dmodel`・`gaussian` の初期注視点（`"x,y,z"`）。 |
| `show-texture` | `"false"` で 3D モデルのテクスチャを隠し、それ以外では表示。ビューアを開いたときにも設定を反映。 |
| `fit-to-container` | 真偽属性。3D モデル全体を領域に収める。明示したカメラ位置・注視点を優先。 |
| `debug-mode` | 真偽属性。共通のデバッグ欄を表示。3D メディアでは視点・読み込み状態なども表示。 |

`fit-to-container` と `debug-mode` は、値が空でも属性が存在すれば有効です。
Gaussian の `camera-position`・`camera-target` と、3D モデルの
`show-texture`・`fit-to-container` は、実際の表示へ反映されます。

### `<cc-viewer>`

すべてのメディアで共用する全画面ビューアです。`cc-swiper` が必要時に自動で
作成します。以前のメディア別 `cc-viewer-*` 要素は公開 API ではありません。

**プロパティ:**

- `index`（number）: 現在の 0 始まりの項目番号。

**メソッド:**

- `open(items: MediaItem[], index: number, opts?: { loop?: boolean })`: メディア一覧を 0 始まりの番号で開く。
- `close()`: ビューアを閉じ、可能な場合は元のフォーカスへ戻す。

**イベント:**

- `cc-viewer-index-change`: ビューアが別の項目へ移ったときに発火。
  - `detail.index`: 現在の 0 始まりの項目番号。
- `cc-viewer-close`: ビューアを閉じたときに発火。

番号変更イベントはどちらもバブルし、Shadow DOM の境界も越えます。ビューアは
左右矢印キーで前後へ移動し、Escape で閉じます。スワイプによる前後移動はなく、
ボタンとキーボードを使います。

### メディア項目の補助 API

`readMediaItem(element: Element): MediaItem` は、スライドを
`cc-viewer.open` と `generateThumbnail` が使うオブジェクトへ変換します。
TypeScript の `MediaItem`・`MediaType` 型も `@c4h/chuci` から公開しています。

## 使用例

### プログラムからカルーセルとビューアを操作

```javascript
import '@c4h/chuci';

const swiper = document.querySelector('cc-swiper');
swiper.goTo(1);
await swiper.openViewer(1);

swiper.addEventListener('cc-swiper-index-change', (event) => {
  console.log('カルーセルの番号:', event.detail.index);
});

document.addEventListener('cc-viewer-index-change', (event) => {
  console.log('ビューアの番号:', event.detail.index);
});

document.addEventListener('cc-viewer-close', () => {
  console.log('ビューアを閉じました');
});
```

### サムネイルギャラリーと自動送り

```html
<cc-swiper has-thumb autoplay>
  <cc-swiper-slide image-url="first.jpg" image-type="image" caption="最初"></cc-swiper-slide>
  <cc-swiper-slide image-url="second.jpg" image-type="image" caption="2 件目"></cc-swiper-slide>
</cc-swiper>
```

### 3D モデル

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

### Gaussian スプラッティング

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

YouTube の URL（`youtube.com`・`youtu.be`・`youtube-nocookie.com`。HTTP・HTTPS
とも）は HTTPS の埋め込み形式へ変換します。それ以外の HTTPS URL はそのまま
埋め込みます。`javascript:` やスキームのない URL を含め、HTTPS でない URL は
表示しません。

## サムネイル生成 API

```typescript
generateThumbnail(
  item: MediaItem,
  opts?: { maxSize?: number; signal?: AbortSignal }
): Promise<Blob>
```

`generateThumbnail` は、ビューアと同じ初期シーン設定を使います。カルーセル
自身だけでなく、ブラウザ上の作成ツールからも呼び出せます。`maxSize` は長辺の
上限で、既定は 256 ピクセルです。`AbortSignal` を渡すと読み込みと生成を中断
できます。

次は作成ツールで実行する例です。`storeBlob` は作成ツールが用意する関数で、
Blob を保存して、その画像の URL を返します。

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

  // 未完了の処理を中断する場合:
  // controller.abort();
}
```

- `image`・`video` は WebP、`panorama`・`3dmodel`・`gaussian` は PNG を出力します。`youtube` は公開サムネイルの Blob を返します。
- 動画は 0.5 秒の位置を使い、短い動画ではその直前の利用可能なコマを使います。
- Node だけの環境ではなくブラウザ用 API です。パノラマ・3D モデル・Gaussian は WebGL が必要で、画像はブラウザの bitmap・canvas API が必要です。
- メディアのピクセルを fetch または canvas へ取り出す場合は、配信元の CORS 許可が必要です。別サイトの画像・動画フレーム・テクスチャ・モデル・スプラットが対象です。YouTube の公開サムネイルもページから取得できる必要があります。
- Gaussian の生成でも、表示と同じく必要時に Spark を読み込みます。

`thumbnail-url` がない場合、カルーセルは IndexedDB（`chuci-thumbnails`）を調べ、
必要に応じて一時的に種類のアイコンを表示し、不足分を裏で生成します。現在の
スライドを優先し、1 件ずつ生成します。失敗時はアイコンのままとし、失敗は
ページの寿命の間だけ記憶します。

## カルーセルとビューアの操作

| 操作 | 2D 画像 | 3D モデル・Gaussian | 360° パノラマ |
|---|---|---|---|
| 1 本指ドラッグ・左ドラッグ | 移動 | 注視点の周りを回転 | 掴んで動かす向きに見回す |
| ホイール・ピンチ | カーソル・指の位置を中心に拡大縮小 | 寄る・引く | 視野角を変更 |
| 2 本指ドラッグ・右ドラッグ | 移動 | 画面に平行に移動 | 操作なし |
| ダブルクリック・ダブルタップ | 初期表示に戻る | 初期カメラに戻る | 初期の向きに戻る |

閉じるボタンは右上、前後ボタンは左右の端にあります。読み込み中のスピナーと
エラー欄は全メディアで共通です。`debug-mode` のデバッグ欄は左上に表示します。

## キャプションとインジケーターの規則

### カルーセル

- キャプションの帯はメディアに重ねず、下に場所を取ります。
- キャプションは 1 行で、はみ出した部分を省略記号にします。インジケーターは右側です。
- 2 件以上では、キャプションが空でも帯を表示します。
- 1 件だけの場合は、キャプションがあるときだけ帯を表示します。
- 2〜8 件は押せる点の列、8 件を超える場合は `n / N` を表示します。
- `has-thumb` の場合は、点の列・数字の代わりにサムネイルギャラリーを使います。

### ビューア

- キャプションは省略せずに折り返します。8 件を超える場合は点の列の代わりに `n / N` を使います。
- 開いたときと前後へ移ったときに帯を表示します。
- コンテンツに重ねる操作帯では、コンテンツへの操作で帯を隠します。操作がない場合も 3 秒後に隠します。ドラッグを伴わないタップまたはマウスの移動で再表示します。前後・閉じるボタンは薄くなりますが操作できます。
- 動画ビューアでは、帯がブラウザ標準の再生操作に重ならないよう場所を確保します。

## スタイリング

```css
cc-swiper {
  --cc-slider-theme-color: #007aff;
  --cc-slider-navigation-color: #007aff;
}

cc-viewer {
  --cc-viewer-z-index: 1000;
}
```

## 関連

- [API インデックス](README.ja.md) — インストール / クイックスタート / エコシステム
- [メイン README](../README.ja.md) — インストール / クイックスタート / エコシステム
