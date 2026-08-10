<!-- SECTION 1: Header (badges, title) -->
<h1 align="center">Chuci</h1>

<p align="center">
  <a href="https://github.com/code4history/Chuci/actions/workflows/ci.yml"><img src="https://github.com/code4history/Chuci/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
  <a href="https://www.npmjs.com/package/@c4h/chuci"><img src="https://img.shields.io/npm/v/@c4h/chuci" alt="npm version" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/@c4h/chuci" alt="License" /></a>
</p>

<!-- SECTION 2: Elevator Pitch -->
## Chuci について

Chuci は [Quyuan](https://github.com/code4history/Quyuan) から抽出されたスタンドアロンのマルチメディアスワイパー・ビューア Web Components ライブラリです。
フレームワークに依存せず、タッチ対応のカルーセルとマルチメディアビューア（画像・パノラマ・動画・YouTube・3Dモデル・Gaussian スプラット）を提供します。
プロジェクト名は、中国古代の詩集
[楚辞 (Chuci)](https://en.wikipedia.org/wiki/Chu_Ci) に由来しています。

Chuci は MIT License のオープンソースソフトウェアです。

<!-- SECTION 3: Language switch link -->
**[英語版はこちら / Read this document in English](README.md)**

<!-- SECTION 4: Key Features -->
## 主な特徴

- フレームワーク非依存: 純粋な Web Components・任意のフレームワークやバニラ JS で動作
- Swiper.js ベースのタッチ対応カルーセル
- 複数メディアタイプ: 画像・パノラマ・動画・YouTube・3Dモデル・Gaussian スプラット
- ゼロ依存関係: すべての依存関係がバンドル済み（Lit 依存なし）
- 軽量・tree-shaking サポート・完全な TypeScript 型定義

<!-- SECTION 5: Quick Start -->
## クイックスタート

> 特定リリースに紐づく情報（ADR-0012）。下記の CDN 例は `@latest` を使用しています。
> 本番環境では具体的なバージョンを固定してください。

### インストール

```bash
# pnpm（推奨）
pnpm add @c4h/chuci

# npm
npm install @c4h/chuci
```

### 最小利用例

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

### CDN（jsDelivr）

```html
<script src="https://cdn.jsdelivr.net/npm/@c4h/chuci@latest/dist/chuci.umd.js"></script>
<script>
  // コンポーネントはグローバルに Chuci として利用可能
  // HTML で直接カスタム要素を使用できます
</script>
```

### API リファレンス

- **API シグネチャ**（リリース依存）: [`docs/api/`](docs/api/) を参照

### 開発

#### 準備
リポジトリをクローンし、依存関係をインストールします。

```bash
git clone https://github.com/code4history/Chuci.git
cd Chuci
pnpm install
```

#### 開発サーバー

```bash
pnpm run dev
```

#### ビルド

```bash
pnpm run build
```

#### テスト

```bash
pnpm test
```

<!-- SECTION 6: Prerequisites -->
## 動作環境

> ランタイム要件（ADR-0012: 特定リリースに紐づく）。

- Node.js: `20` 以上
- pnpm: `9.0.0` 以上（推奨）
- ブラウザ: Web Components をサポートするモダンブラウザ
  - Chrome / Edge 79+
  - Firefox 63+
  - Safari 12.1+

<!-- SECTION 7: Peer Dependencies -->
<!-- Chuci は依存関係ゼロ（すべてバンドル済み）のため、本節は省略します。 -->

<!-- SECTION 8: Ecosystem / Related Repositories -->
## エコシステム

Chuci は [Code for History](https://github.com/code4history) が運営する
Maplat エコシステムの一部です。全容は下記エコシステム図を参照してください。

📖 **エコシステム図** — *（図は現在外部非公開の計画リポジトリにあります。
公開ビューアからは下記の姉妹リポジトリ表で代替します）*

### 姉妹リポジトリ

| リポジトリ | ライセンス | npm | 役割 |
|---|---|---|---|
| [Maplat](https://github.com/code4history/Maplat) | Apache 2.0 | `@maplat/ui` | メインビューア |
| [MaplatCore](https://github.com/code4history/MaplatCore) | Apache 2.0 | `@maplat/core` | コアライブラリ |
| [MaplatTin](https://github.com/code4history/MaplatTin) | Apache 2.0 | `@maplat/tin` | TIN 変換 |
| [MaplatTransform](https://github.com/code4history/MaplatTransform) | Apache 2.0 | `@maplat/transform` | 座標変換 |
| [MaplatEditor](https://github.com/code4history/MaplatEditor) | Apache 2.0 | — | データ作成ツール（デスクトップ） |
| [Chuci](https://github.com/code4history/Chuci) | MIT | `@c4h/chuci` | マルチメディアスワイパー/ビューア Web Components |
| [Quyuan](https://github.com/code4history/Quyuan) | MIT | `@c4h/quyuan` | GeoJSON テンプレートエンジン＋マルチメディアビューア Web Components |
| [Weiwudi](https://github.com/code4history/Weiwudi) | MIT | `@c4h/weiwudi` | タイルキャッシュ用 Service Worker |

> MaplatEditor は上記ビューアライブラリが描画する地図・POI を作成する
> データ作成ツールです。Maplat エコシステムはエンドツーエンド:
> MaplatEditor で作成し、いずれかのビューアライブラリで公開、という流れになります。

<!-- SECTION 9: Nayuta links -->
<!-- MIT ライセンスのリポジトリ（Weiwudi / Quyuan / Chuci）へは那由多社リンクを置きません（ADR-0012）。 -->

<!-- SECTION 10: License -->
## License

MIT License — 詳細は [LICENSE](LICENSE) を参照。

```
Copyright (c) 2024-2026 Code for History

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

<!-- SECTION 11: Contributors / Sponsors (optional) -->
<!-- Chuci には Contributors / Sponsors 節はありません。 -->

---

## Quyuan からの移行

元の Quyuan 実装から移行する場合:

1. インポートを `quyuan` から `@c4h/chuci` に変更
2. コンポーネント名は同じまま（`cc-swiper`・`cc-swiper-slide` 等）
3. 3Dモデルの URL はパイプ区切り形式を使用しなくなりました:
   ```html
   <!-- 旧 -->
   <cc-swiper-slide image-url="model.obj|model.mtl" ...>

   <!-- 新 -->
   <cc-swiper-slide image-url="model.obj" material-url="model.mtl" ...>
   ```

## クレジット

Code for History による [Quyuan](https://github.com/code4history/Quyuan) から抽出。
