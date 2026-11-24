# スライダーとビューアの作り直し 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Chuci のスライダーを自作し、全ビューアを共通の外枠・共通の操作規則の上に作り直す。あわせてサムネイル生成 API を加え、Quyuan をそれに追随させる。

**Architecture:** 共通の土台を Chuci の `src/core/` に置く。中身は、項目の型、番号の計算、帯の規則、手の操作の解釈、操作感の定数。`cc-swiper` は土台の上の自作スライダー、`cc-viewer` は外枠そのもので、メディアごとの「描画部」（`src/components/viewer/renderers/`）を差し替えて表示する。3D 系は three.js の共通の舞台（`three-stage.ts`）に載せ、Gaussian だけは Spark を動的 import する。Quyuan は継承して `qy-` の名前を与えるだけにする。

**Tech Stack:** TypeScript 6、素の Custom Elements（`ChuciElement`）、three.js 0.186、`@sparkjsdev/spark` 2.4、Vite 7（ライブラリ build）、vitest 5＋jsdom、Playwright（Quyuan の e2e）、IndexedDB。

**Spec:** `docs/superpowers/specs/2026-11-25-viewer-renewal-design.md`（このファイルと同じリポジトリ。各作業者は計画と設計書の両方を読む）

## Global Constraints

- 作業場所：`~/zcode/viewer-renewal-work/Chuci` と `~/zcode/viewer-renewal-work/Quyuan`。ブランチはどちらも `viewer-renewal`。NayutaProducts の中の Chuci・Quyuan には触らない。
- 初回の準備（各 clone で 1 回だけ）：`cp ci/pnpm-workspace.ci.yaml pnpm-workspace.yaml && echo pnpm-workspace.yaml >> .git/info/exclude && pnpm install`。`--ignore-workspace` は付けない。
- 試験・型検査・lint・build は **rtk を付けず**、**`pnpm run` も使わず**に直接起動する。`pnpm run` は単独 clone で勝手に install が走るため。
  - 型検査：`node_modules/.bin/tsc --noEmit`
  - 単体試験：`node_modules/.bin/vitest run <file>`
  - lint：`node_modules/.bin/eslint src tests`
  - build：`BUILD_MODE=package node_modules/.bin/vite build`
- タグ名は維持する：`cc-swiper`・`cc-swiper-slide`・`cc-viewer`・`qy-swiper`・`qy-swiper-slide`・`qy-viewer`。
- 読む属性は増やさない。スライド：`image-url`・`image-type`・`thumbnail-url`・`caption`・`material-url`・`camera-position`・`camera-target`・`show-texture`・`fit-to-container`・`debug-mode`。スライダー：`has-thumb`・`autoplay`。
- `image-type` の値：`image`・`panorama`・`youtube`・`video`・`3dmodel`・`gaussian`。不明な値は `image` として扱う（今と同じ）。
- 維持する CSS 変数：`--cc-slider-theme-color`・`--cc-slider-navigation-color`・`--cc-viewer-z-index`（Quyuan は `--qy-viewer-z-index`）。
- 外部由来の値は HTML の文字列補間に入れない。`setAttribute`・`textContent`・`style.setProperty`＋`escapeCssUrl` を使う。`utils/youtube-embed.ts` は変えない。
- 数値は設計書のとおり：
  - ビューアの背景 `#000`（3D のシーン背景も同じ）
  - 8 件を超えたら点の列を `n / N` の数字に切り替える
  - 帯は操作がなければ 3 秒で隠す
  - 自動送りは 5000 ms
  - YouTube の縦横比は 16:9
- 操作感の定数（慣性・速度・拡大の刻み）は `src/core/feel.ts` の 1 か所だけに置く。
- 依存の出入り：swiper・viewerjs・gsplat を削除し、A-Frame の CDN 参照も消す。`@sparkjsdev/spark` を追加する。
- commit は作業ごと。push は Task の終わりに `git push origin viewer-renewal`。
- 文書はすべて日本語と英語の両方（README・`docs/api`・CHANGELOG の Unreleased）。

## Review Focus

1. **描画後にスライドが増減する**（Quyuan の MutationObserver、Maplat がポップアップを描き直す場合）。スライダーは作り直されるべきで、古いリスナやタイマ（自動送り）が残ってはならない。→ Task 2 の試験 `rebuilds on slide change without leaking timers`。
2. **幅 0 で初期化される**（Leaflet のポップアップが開く前に要素ができる）。大きさが付いた時点で位置を正しく計算し直すべき。→ Task 2 の試験 `recomputes layout when width becomes non-zero`。
3. **重い描画部の読み込み中に、ビューアで前後を連打する**。古い読み込みは中断され、canvas や WebGL コンテキストが二重に残ってはならない。→ Task 4 の試験 `aborts stale mount on rapid navigation`。
4. **ビューアの開閉を何十回も繰り返す**。WebGL コンテキストが解放され、ブラウザの上限（約 16）に達しないべき。→ Task 6 の e2e `opens and closes 3D viewer 30 times without context loss`。
5. **メディアの URL が 404 や CORS で失敗する**。外枠のエラー表示が出て、サムネイルはアイコンのまま。未処理の Promise 拒否が出てはならない。→ Task 4 の試験 `shows error when renderer mount rejects`、Task 9 の試験 `keeps icon and records failure on CORS error`。

---

## ファイル構成（Chuci）

| ファイル | 責務 | 状態 |
|---|---|---|
| `src/core/media-item.ts` | `MediaItem` 型・`MediaType`・`readMediaItem(el)` | 新規 |
| `src/core/carousel-math.ts` | 番号の正規化・前後・ループ時の各スライドの位置 | 新規 |
| `src/core/caption-bar.ts` | 帯の規則 `captionBarModel()` と DOM 生成 `renderCaptionBar()`（スライダーとビューアで共用） | 新規 |
| `src/core/feel.ts` | 操作感の定数 `FEEL` | 新規 |
| `src/core/gesture.ts` | ポインタ・ホイールを `GestureEvent` に変換する `GestureInterpreter` | 新規 |
| `src/core/bar-visibility.ts` | V2 の帯の表示・非表示を決める状態機械 `BarVisibility` | 新規 |
| `src/components/swiper/cc-swiper.ts` | 自作スライダー（全面書き換え） | 書き換え |
| `src/components/swiper/cc-swiper-slide.ts` | 変更なし | 維持 |
| `src/components/viewer/cc-viewer.ts` | 外枠（背景・ボタン・帯・スピナー・エラー・デバグ欄・キーボード・描画部の差し替え） | 書き換え |
| `src/components/viewer/renderers/types.ts` | `MediaRenderer`・`RendererContext`・`DebugEntry` | 新規 |
| `src/components/viewer/renderers/registry.ts` | 種類から描画部を作る `createRenderer()` | 新規 |
| `src/components/viewer/renderers/fit.ts` | `containSize()`（動画の初期サイズ） | 新規 |
| `src/components/viewer/renderers/video-renderer.ts` | MP4 | 新規 |
| `src/components/viewer/renderers/youtube-renderer.ts` | YouTube | 新規 |
| `src/components/viewer/renderers/image-renderer.ts` | 2D 画像（拡大・移動） | 新規 |
| `src/components/viewer/renderers/three-stage.ts` | three.js の共通の舞台（描画ループ・大きさの追随・背景・破棄・撮影） | 新規 |
| `src/components/viewer/renderers/orbit-rig.ts` | 注視点の周りを回るカメラ操作（3D メッシュ・Gaussian） | 新規 |
| `src/components/viewer/renderers/look-rig.ts` | 内側から見回すカメラ操作（360 度） | 新規 |
| `src/components/viewer/renderers/model-renderer.ts` | OBJ＋MTL | 新規 |
| `src/components/viewer/renderers/panorama-renderer.ts` | 正距円筒画像 | 新規 |
| `src/components/viewer/renderers/gaussian-renderer.ts` | Spark | 新規 |
| `src/thumbnails/generate.ts` | `generateThumbnail()`（公開 API） | 新規 |
| `src/thumbnails/cache.ts` | IndexedDB の保存・LRU・`thumbnailCacheKey()` | 新規 |
| `src/thumbnails/queue.ts` | 1 件ずつ順に生成する `ThumbnailQueue` | 新規 |
| `src/components/viewer/cc-viewer-*.ts`（6 種類と base・styles） | — | 削除（各描画部の Task で） |

---

### Task 1: 土台（項目の型・番号の計算・帯の規則）

**Files:**
- Create: `src/core/media-item.ts`, `src/core/carousel-math.ts`, `src/core/caption-bar.ts`
- Test: `tests/core-media-item.test.ts`, `tests/core-carousel-math.test.ts`, `tests/core-caption-bar.test.ts`

**Interfaces:**
- Produces:
  ```ts
  export type MediaType = 'image' | 'panorama' | 'youtube' | 'video' | '3dmodel' | 'gaussian'
  export interface MediaItem {
    url: string; type: MediaType; thumbnailUrl: string; caption: string
    materialUrl?: string; cameraPosition?: string; cameraTarget?: string
    showTexture?: boolean; fitToContainer: boolean; debugMode: boolean
  }
  export function readMediaItem(el: Element): MediaItem
  export function normalizeIndex(i: number, count: number, loop: boolean): number   // loop=false は端で止める
  export function stepIndex(i: number, delta: -1 | 1, count: number, loop: boolean): number
  export function slideOffsets(current: number, count: number, loop: boolean): number[] // 各スライドの位置（幅単位）。loop 時は current の前後に回り込ませる
  export type Indicator = 'dots' | 'counter' | 'none'
  export interface CaptionBarModel { showBar: boolean; caption: string; indicator: Indicator }
  export const COUNTER_THRESHOLD = 8
  export function captionBarModel(count: number, caption: string, hasThumb: boolean): CaptionBarModel
  export function renderCaptionBar(host: HTMLElement, model: CaptionBarModel, index: number, count: number, onJump: (i: number) => void, mode: 'slider' | 'viewer'): void
  ```

- [ ] **Step 1: 失敗する試験を書く**

```ts
// core-media-item.test.ts
test('reads all allowed attributes', () => {
  const el = document.createElement('cc-swiper-slide')
  el.setAttribute('image-url', 'https://e.x/a.splat'); el.setAttribute('image-type', 'gaussian')
  el.setAttribute('camera-position', '1,2,3'); el.setAttribute('show-texture', 'false'); el.setAttribute('fit-to-container', '')
  expect(readMediaItem(el)).toMatchObject({ url: 'https://e.x/a.splat', type: 'gaussian', cameraPosition: '1,2,3', showTexture: false, fitToContainer: true, debugMode: false })
})
test('unknown image-type falls back to image', () => { /* image-type="foo" → type 'image' */ })
test('show-texture absent is undefined, not true', () => { /* showTexture === undefined */ })

// core-carousel-math.test.ts
test('stepIndex wraps only when loop', () => {
  expect(stepIndex(4, 1, 5, true)).toBe(0); expect(stepIndex(4, 1, 5, false)).toBe(4)
  expect(stepIndex(0, -1, 5, true)).toBe(4)
})
test('slideOffsets places neighbours of current at -1 and +1 in loop mode', () => {
  expect(slideOffsets(0, 4, true)).toEqual([0, 1, 2, -1])
  expect(slideOffsets(0, 4, false)).toEqual([0, 1, 2, 3])
})
test('single slide never loops', () => { expect(slideOffsets(0, 1, true)).toEqual([0]) })

// core-caption-bar.test.ts（設計書 5.7 の表）
test.each([
  [1, '', false, { showBar: false, indicator: 'none' }],
  [1, 'cap', false, { showBar: true, indicator: 'none' }],
  [2, '', false, { showBar: true, indicator: 'dots' }],
  [8, 'cap', false, { showBar: true, indicator: 'dots' }],
  [9, 'cap', false, { showBar: true, indicator: 'counter' }],
  [5, 'cap', true, { showBar: true, indicator: 'none' }],
])('captionBarModel(%i, %s, hasThumb=%s)', (n, cap, thumb, exp) => { expect(captionBarModel(n, cap, thumb)).toMatchObject(exp) })
test('renderCaptionBar uses textContent for caption', () => { /* caption '<img src=x onerror=1>' → host.querySelector('img') === null */ })
test('counter shows "2 / 12"', () => { /* index 1, count 12 → textContent '2 / 12' */ })
test('dot click calls onJump with its index', () => {})
```

- [ ] **Step 2: 失敗を確かめる** — `node_modules/.bin/vitest run tests/core-*.test.ts` → モジュールが見つからず FAIL
- [ ] **Step 3: 実装する** — 帯の HTML 構造：`.cc-bar` > `.cc-bar-caption` ＋ `.cc-bar-indicator`。`mode` は CSS のクラス（`cc-bar--slider` / `cc-bar--viewer`）だけを変える。スライダーではキャプションを 1 行で省略し、ビューアでは折り返す。CSS は `captionBarStyles`（文字列）として同じファイルから export する。
- [ ] **Step 4: 通ることを確かめる** — 同じコマンドで PASS
- [ ] **Step 5: commit** — `git add src/core tests/core-*.test.ts && git commit -m "feat(core): 項目の型・番号の計算・帯の規則を追加"`

---

### Task 2: 自作スライダー（`cc-swiper` の書き換えと Swiper の削除）

**Files:**
- Modify (全面): `src/components/swiper/cc-swiper.ts`
- Create: `src/core/feel.ts`（最初の 3 項目）
- Delete: `src/components/swiper/swiper-styles.css`, `src/components/swiper/cc-swiper-styles.ts`, `tests/cc-swiper-navigation-icon.test.ts`, `tests/cc-swiper-thumb-tap.test.ts`
- Modify: `package.json`（`swiper` を削除）, `tests/m1-t9-injection.test.ts`（Swiper 前提のセレクタを新しい DOM に合わせる。**検査内容は弱めない**）
- Test: `tests/cc-swiper.test.ts`

**Interfaces:**
- Consumes: Task 1 の `readMediaItem`, `stepIndex`, `slideOffsets`, `captionBarModel`, `renderCaptionBar`
- Produces:
  ```ts
  export class CcSwiper extends ChuciElement {
    get items(): MediaItem[]; get index(): number; get loop(): boolean   // loop = items.length >= 2
    goTo(index: number, opts?: { animate?: boolean }): void              // 'cc-swiper-index-change' {index} を dispatch
    pauseAutoplay(): void; resumeAutoplay(): void
    protected viewerTagName(): string                                    // 既定 'cc-viewer'。Quyuan は 'qy-viewer'
    protected setThumbnailSource(index: number, src: string): void       // Task 9 が使う
    openViewer(index: number): Promise<void>                             // viewer.open(items, index, { loop }) を呼ぶ
  }
  export function escapeCssUrl(value: string): string                    // 今と同じものを残す
  ```
  - ビューアから `cc-viewer-index-change`（detail `{index}`）を受けたら `goTo(index, { animate: false })`。`cc-viewer-close` を受けたら `resumeAutoplay()`。`openViewer` の中で `pauseAutoplay()`。

- [ ] **Step 1: 失敗する試験を書く**（`tests/cc-swiper.test.ts`）
  - `goTo wraps in loop mode and clamps otherwise`
  - `click without movement opens viewer at that index`：要素の `openViewer` を spy し、`pointerdown`→`pointerup`（移動 0）で呼ばれる
  - `drag beyond threshold moves to next and does not open viewer`：`FEEL.dragThresholdPx` を超える移動
  - `pointer events do not propagate to the map container`：外側の div の `pointerdown` リスナが呼ばれない
  - `autoplay advances every 5000 ms and pauses while viewer open`：`vi.useFakeTimers()`
  - `ArrowRight key moves next`
  - `dots jump; >8 items shows counter; has-thumb hides dots and shows thumb strip`
  - `rebuilds on slide change without leaking timers`（Review Focus 1）：スライドを足して再描画した後、`vi.getTimerCount()` が 1（自動送り 1 本）
  - `recomputes layout when width becomes non-zero`（Review Focus 2）：ResizeObserver のモックからコールバックを呼ぶと、トラックの `transform` が更新される
  - `caption is not interpreted as HTML`（既存の注入試験と同じ値）
- [ ] **Step 2: 失敗を確かめる** — `node_modules/.bin/vitest run tests/cc-swiper.test.ts` → FAIL
- [ ] **Step 3: 実装する**
  - トラックの各スライドは `slideOffsets` が返す値で `translateX(calc(offset*100% + dragPx))` に置き、DOM の複製はしない。
  - ドラッグは Pointer Events で受け、`setPointerCapture` を使う。`touch-action: pan-y`。ポインタ系とホイールのイベントは `stopPropagation`。
  - 送りの判定は、移動量 ≥ 幅 × `FEEL.swipeCommitRatio`、または速度で決める。
  - 大きさの変化は `ResizeObserver` で追う。
  - 矢印と白い背景は今の見た目のまま。CSS 変数も維持する。
  - キャプションの帯は画像の下に場所を取る（`display:flex; flex-direction:column`）。
  - `FEEL` はこの Task で `src/core/feel.ts` に最初の項目（`dragThresholdPx`・`swipeCommitRatio`・`slideTransitionMs`）を入れる。Task 3 が項目を足す。
- [ ] **Step 4: 通ることを確かめる** — `node_modules/.bin/vitest run`（全体）と `node_modules/.bin/tsc --noEmit` が PASS。`grep -r "swiper" package.json` で依存が残っていないこと。
- [ ] **Step 5: commit と push** — `git commit -m "feat(swiper)!: Swiper をやめて自作のスライダーに置き換える"` → push

---

### Task 3: 手の操作の解釈と帯の表示制御

**Files:**
- Modify: `src/core/feel.ts`
- Create: `src/core/gesture.ts`, `src/core/bar-visibility.ts`
- Test: `tests/core-gesture.test.ts`, `tests/core-bar-visibility.test.ts`

**Interfaces:**
- Produces:
  ```ts
  export const FEEL: {
    dragThresholdPx: number; swipeCommitRatio: number; slideTransitionMs: number
    dampingFactor: number; rotateSpeed: number; panSpeed: number; wheelZoomStep: number
    doubleTapMs: number; barHideDelayMs: 3000
  }
  export const CONTROLS_HINT: { ja: string; en: string }   // デバグ欄の最後の行。設計書 5.5 の表の要約
  export type GestureEvent =
    | { kind: 'rotate' | 'pan'; dx: number; dy: number }          // 画面 px
    | { kind: 'zoom'; factor: number; cx: number; cy: number }    // factor>1 で拡大。cx,cy は要素内座標
    | { kind: 'reset' } | { kind: 'tap' } | { kind: 'start' }     // start = 操作の開始（帯を隠す合図）
  export class GestureInterpreter {
    constructor(target: HTMLElement, onGesture: (e: GestureEvent) => void)
    dispose(): void
  }
  export class BarVisibility {
    constructor(onChange: (visible: boolean) => void, setTimer?: typeof setTimeout, clearTimer?: typeof clearTimeout)
    shown(): void        // 開いた時・前後へ移った時 → 表示し 3 秒の計時を始める
    interacted(): void   // 操作の開始 → すぐ隠す
    poked(): void        // タップ・マウス移動 → 表示し 3 秒の計時を始め直す
    dispose(): void
  }
  ```
  - 割り当ては設計書 5.5 の表のとおり。1 本指・左ドラッグ → `rotate`。2 本指・右ドラッグ → `pan`。ホイール・ピンチ → `zoom`。ダブルクリック・ダブルタップ → `reset`。移動量が `dragThresholdPx` 未満の単発 → `tap`。

- [ ] **Step 1: 失敗する試験を書く**
  - `left drag emits start then rotate with deltas`
  - `right drag emits pan`, `two-pointer move emits pan and pinch emits zoom with factor>1 when spreading`
  - `wheel deltaY<0 emits zoom factor>1 centred at pointer`
  - `double click within doubleTapMs emits reset`, `short press without movement emits tap and not start`
  - `BarVisibility: shown → visible, hidden after 3000 ms`（偽のタイマ）、`interacted hides immediately`、`poked shows and restarts timer`
- [ ] **Step 2: 失敗を確かめる** → FAIL
- [ ] **Step 3: 実装する** — 慣性は描画部側（rig）で `dampingFactor` を使う。解釈器は差分だけを出す。
- [ ] **Step 4: 通ることを確かめる** → PASS
- [ ] **Step 5: commit** — `git commit -m "feat(core): 手の操作の解釈と帯の表示制御を追加"`

---

### Task 4: 外枠（`cc-viewer` の書き換え）と動画・YouTube の描画部

**Files:**
- Modify (全面): `src/components/viewer/cc-viewer.ts`
- Create: `src/components/viewer/renderers/types.ts`, `registry.ts`, `fit.ts`, `video-renderer.ts`, `youtube-renderer.ts`
- Delete: `src/components/viewer/cc-viewer-base.ts`, `cc-viewer-video.ts`, `cc-viewer-youtube.ts`, `cc-viewer-styles.ts`（ほかの `cc-viewer-*` は各 Task で削除。それまでは registry が該当する種類に `UnsupportedRenderer`（エラーを出す）を返す）
- Modify: `src/index.ts`（削除した要素の export を外し、`MediaItem` 型・`generateThumbnail`（Task 9 で追加）用の枠を整える）, `tests/cc-viewer-loop-navigation.test.ts`（削除して `tests/cc-viewer.test.ts` に置き換え）, `tests/z_index.test.ts`（新しい DOM に合わせる）
- Test: `tests/cc-viewer.test.ts`, `tests/renderers-fit.test.ts`

**Interfaces:**
- Consumes: Task 1 の `MediaItem`・`stepIndex`・`captionBarModel`・`renderCaptionBar`。Task 3 の `BarVisibility`・`GestureInterpreter`。
- Produces:
  ```ts
  export interface DebugEntry { label: string; value: string }
  export interface RendererContext { signal: AbortSignal; reportInteraction(): void; requestDebugRefresh(): void }
  export interface MediaRenderer {
    mount(host: HTMLElement, item: MediaItem, ctx: RendererContext): Promise<void>  // 読み込み完了で resolve、失敗で reject
    unmount(): void                    // GPU 資源・リスナ・タイマをすべて解放
    resetView?(): void
    debugEntries?(): DebugEntry[]
    mediaControls?(): HTMLElement[]    // 3D メッシュのテクスチャ切り替えなど。外枠が共通の見た目で並べる
  }
  export function createRenderer(type: MediaType): Promise<MediaRenderer>
  export function containSize(boxW: number, boxH: number, aspect: number): { width: number; height: number }
  export class CcViewer extends ChuciElement {
    open(items: MediaItem[], index: number, opts?: { loop?: boolean }): void
    close(): void
    get index(): number
    // events: 'cc-viewer-index-change' {index}, 'cc-viewer-close'
  }
  ```
  - デバグ欄は左上・等幅。`debugMode` が真の項目だけに出し、`debugEntries()` を `requestDebugRefresh()` の合図か 250 ms ごとに描き直す。項目名は設計書 5.3 の順。最後の行は全ビューア共通の操作方法の一行で、文面は `src/core/feel.ts` の `CONTROLS_HINT`（日英。`navigator.language` が `ja` で始まれば日本語）。
  - スピナーは `mount` の Promise が決着するまで出す。エラー表示は reject 時に出す。
  - キーボードは ← → と Esc。

- [ ] **Step 1: 失敗する試験を書く**（`tests/cc-viewer.test.ts`。描画部は `vi.mock` で registry を差し替えた偽物）
  - `open shows backdrop with background #000 and spinner until mount resolves`
  - `shows error when renderer mount rejects`（Review Focus 5）：`unhandledrejection` が起きないことも確かめる
  - `next/prev buttons and arrow keys change index and dispatch cc-viewer-index-change`
  - `Esc closes and dispatches cc-viewer-close; renderer.unmount called once`
  - `aborts stale mount on rapid navigation`（Review Focus 3）：1 件目の mount が未決着のまま next を 2 回押す。1・2 件目の `ctx.signal.aborted === true` で、`unmount` が各 1 回。host 内の子要素は 1 つだけ
  - `caption bar hides on reportInteraction and returns on tap`
  - `debug panel lists entries from renderer in top-left only when debug-mode`
  - `single item hides prev/next`
  - `renderers-fit.test.ts`：`containSize(1600, 900, 16/9)` → `{1600, 900}`、`containSize(1000, 1000, 16/9)` → `{1000, 562.5}`
  - `youtube renderer sizes iframe with containSize at 16:9 and keeps youtube-embed validation`（`toYouTubeIframeSrc` が null のとき src を付けない）
  - `video renderer hides bar on play event`
- [ ] **Step 2: 失敗を確かめる** → FAIL
- [ ] **Step 3: 実装する**
  - 外枠のコンテンツ領域は画面いっぱい（`inset: env(safe-area-inset-*)`）。帯とボタンは上に重ねる。
  - 帯を隠したとき、ボタンは `opacity: .25` にする（押せるまま）。
  - YouTube は `window` の `blur` で、`document.activeElement` が自分の iframe なら `reportInteraction()` を呼ぶ。
- [ ] **Step 4: 通ることを確かめる** — 全単体試験＋`tsc --noEmit` が PASS
- [ ] **Step 5: commit と push** — `git commit -m "feat(viewer)!: 共通の外枠と動画・YouTube の描画部に置き換える"`

---

### Task 5: 2D 画像の描画部と viewer.js の削除

**Files:**
- Create: `src/components/viewer/renderers/image-renderer.ts`
- Delete: `src/components/viewer/cc-viewer-image.ts`
- Modify: `registry.ts`, `package.json`（`viewerjs` を削除）
- Test: `tests/renderers-image.test.ts`

**Interfaces:**
- Consumes: `MediaRenderer`（Task 4）、`GestureInterpreter`・`FEEL`（Task 3）、`containSize`（Task 4）
- Produces: `export class ImageRenderer implements MediaRenderer`。純関数 `export function zoomAt(state: View2D, factor: number, cx: number, cy: number, limits: { min: number; max: number }): View2D`（`View2D = { scale: number; x: number; y: number }`）

- [ ] **Step 1: 失敗する試験を書く**
  - `zoomAt keeps the point under the cursor fixed`：(cx,cy) の画像上の位置が拡大前後で同じ
  - `zoomAt clamps to limits`
  - `initial view fits the image inside the box`（`naturalWidth/Height` をモック）
  - `reset gesture restores the initial view`, `rotate gesture (1 本指ドラッグ) pans the image`
  - `mount rejects when image fails to load`
- [ ] **Step 2: 失敗を確かめる** → FAIL
- [ ] **Step 3: 実装する** — img 要素に `transform: translate() scale()` をかける（方式は作業者の判断でよい。ただし `zoomAt` を通す）。拡大の上限は作業者が決める。
- [ ] **Step 4: 通ることを確かめる** → PASS。`viewerjs` が依存から消えていること。
- [ ] **Step 5: commit** — `git commit -m "feat(viewer): 2D 画像を自前の描画部にして viewer.js を外す"`

---

### Task 6: three.js の共通の舞台と 3D メッシュ

**Files:**
- Create: `src/components/viewer/renderers/three-stage.ts`, `orbit-rig.ts`, `model-renderer.ts`
- Delete: `src/components/viewer/cc-viewer-3dmodel.ts`
- Modify: `registry.ts`
- Test: `tests/renderers-orbit-rig.test.ts`, `tests/renderers-model.test.ts`；Quyuan 側 e2e は Task 10 でまとめる

**Interfaces:**
- Produces:
  ```ts
  export class ThreeStage {
    constructor(host: HTMLElement, createRenderer?: (canvas: HTMLCanvasElement) => THREE.WebGLRenderer)  // 試験で偽物を差し込む。背景 #000、devicePixelRatio 追随、ResizeObserver、描画ループ
    readonly scene: THREE.Scene; readonly camera: THREE.PerspectiveCamera; readonly renderer: THREE.WebGLRenderer
    onFrame(cb: (dt: number) => void): void
    capture(maxSize: number): Promise<Blob> // 今の視点を撮影（Task 9 が使う）
    dispose(): void                          // renderer.dispose() と forceContextLoss() を必ず呼ぶ
  }
  export class OrbitRig {
    constructor(camera: THREE.PerspectiveCamera, gestures: GestureInterpreter)
    setHome(position: THREE.Vector3, target: THREE.Vector3): void
    reset(): void; update(dt: number): void; get target(): THREE.Vector3; dispose(): void
  }
  export function parseVec3(s: string | undefined): THREE.Vector3 | undefined  // "1,2,3"。不正値は undefined
  export function fitCameraToObject(camera: THREE.PerspectiveCamera, object: THREE.Object3D): { position: THREE.Vector3; target: THREE.Vector3 }
  export async function prepareModelScene(stage: ThreeStage, item: MediaItem, signal: AbortSignal): Promise<{ home: { position: THREE.Vector3; target: THREE.Vector3 }; setTexture(on: boolean): void }>
  ```
  - `prepareModelScene` はビューアとサムネイル生成の両方が使う、初期化の唯一の入口。
  - 初期視点の優先順位：`camera-position`/`camera-target` → `fit-to-container` → 今の 3D メッシュの既定（`cc-viewer-3dmodel.ts` の現行の初期カメラ。削除前に値を写す）。
  - `show-texture="false"` のときは、テクスチャなしで始める（不具合の修正）。テクスチャ切り替えボタンは `mediaControls()` で外枠に渡す。

- [ ] **Step 1: 失敗する試験を書く**
  - `parseVec3("1,2,3")`／`parseVec3("a,b")` → undefined
  - `OrbitRig rotate moves camera around target keeping distance`, `zoom factor 2 halves distance`, `pan moves camera and target together`, `reset returns to home`, `damping uses FEEL.dampingFactor`
  - `initial camera priority: explicit attrs > fit-to-container > legacy default`（`prepareModelScene` を three の偽ローダで）
  - `show-texture=false starts untextured`（Review の不具合修正）
  - `dispose calls renderer.dispose and forceContextLoss`
- [ ] **Step 2: 失敗を確かめる** → FAIL
- [ ] **Step 3: 実装する** — WebGL は jsdom で動かないので、`ThreeStage` は renderer を差し込める形（コンストラクタの第 2 引数 `createRenderer?`）にして試験では偽物を入れる。
- [ ] **Step 4: 通ることを確かめる** → PASS
- [ ] **Step 5: commit と push** — `git commit -m "feat(viewer): three.js の共通の舞台と 3D メッシュの描画部を追加し、show-texture と fit-to-container を効かせる"`

---

### Task 7: 360 度（A-Frame の削除）

**Files:**
- Create: `src/components/viewer/renderers/look-rig.ts`, `panorama-renderer.ts`
- Delete: `src/components/viewer/cc-viewer-panorama.ts`
- Modify: `registry.ts`
- Test: `tests/renderers-look-rig.test.ts`

**Interfaces:**
- Produces:
  ```ts
  export class LookRig {
    constructor(camera: THREE.PerspectiveCamera, gestures: GestureInterpreter)
    // rotate=見回す（掴んで動かす向き）、zoom=視野角、pan=無視、reset=初期の向き
    get yawDeg(): number; get pitchDeg(): number; get fovDeg(): number
    reset(): void; update(dt: number): void; dispose(): void
  }
  export const PANORAMA_INITIAL: { yawDeg: number; pitchDeg: 0; fovDeg: 80 }   // yawDeg は A-Frame 版（a-sky rotation="0 -90 0"）と同じ絵になる値を実測で決めて書く
  export async function preparePanoramaScene(stage: ThreeStage, item: MediaItem, signal: AbortSignal): Promise<void>
  ```

- [ ] **Step 1: 失敗する試験を書く**
  - `drag right turns view left (grab direction)`：yaw の符号
  - `pitch clamps to ±85°`, `zoom changes fov within [30, 100]`, `pan is ignored`, `reset restores PANORAMA_INITIAL`
- [ ] **Step 2: 失敗を確かめる** → FAIL
- [ ] **Step 3: 実装する** — 球（`SphereGeometry`、`side: BackSide`、または `scale(-1,1,1)`）に正距円筒画像を貼る。`PANORAMA_INITIAL.yawDeg` は、旧版（`master` の `cc-viewer-panorama.ts`）と新版で同じ画像の初期画面を撮り、目で比べて決める。比べた 2 枚の画像は `docs/superpowers/plans/evidence/panorama-initial-{old,new}.png` に保存する。
- [ ] **Step 4: 通ることを確かめる** — PASS。`grep -rn "aframe" src` が 0 件。
- [ ] **Step 5: commit と push** — `git commit -m "feat(viewer): 360 度を three.js の描画部にして A-Frame を外す"`

---

### Task 8: Gaussian（Spark へ移行・遅延読み込み・視点の互換）

**Files:**
- Create: `src/components/viewer/renderers/gaussian-renderer.ts`
- Delete: `src/components/viewer/cc-viewer-gaussian.ts`
- Modify: `registry.ts`（`gaussian` は `await import('./gaussian-renderer')`）, `package.json`（`gsplat` を削除し `@sparkjsdev/spark@^2.4.0` を追加）, `vite.config.ts`（ES 形式は動的 import を別チャンクに分ける。UMD は従来どおり 1 ファイルに含める）
- Test: `tests/renderers-gaussian.test.ts`

**Interfaces:**
- Consumes: `ThreeStage`・`OrbitRig`・`parseVec3`（Task 6）
- Produces:
  ```ts
  export const GSPLAT_DEFAULT_VIEW: { position: [number, number, number]; target: [number, number, number] }  // gsplat 1.2.9 の既定カメラを、three の座標系に直した値
  export async function prepareGaussianScene(stage: ThreeStage, item: MediaItem, signal: AbortSignal): Promise<{ home: { position: THREE.Vector3; target: THREE.Vector3 } }>
  ```
  - 初期視点：`camera-position`/`camera-target` があればそれ（今まで効いていなかった。不具合の修正）。なければ `GSPLAT_DEFAULT_VIEW`。
  - 座標系：gsplat と three の軸の向きが違えば、`prepareGaussianScene` の中で splat の向きを変換する（属性の値はそのまま three の座標として解釈する）。

- [ ] **Step 1: 失敗する試験を書く**
  - `no camera attrs uses GSPLAT_DEFAULT_VIEW`, `camera-position and camera-target are applied`
  - `registry loads gaussian renderer lazily`：`createRenderer('image')` の後に Spark のモジュールが import されていないこと（`vi.mock` で import の回数を数える）
- [ ] **Step 2: 失敗を確かめる** → FAIL
- [ ] **Step 3: 実装する**
  - `GSPLAT_DEFAULT_VIEW` は gsplat 1.2.9 のソース（`node_modules/gsplat` の `Camera` の既定値。削除する前に読む）から求める。
  - 実データ `https://t.tilemap.jp/3ddata/okuman.splat` を旧版と新版で開いて初期画面を撮り、同じ見え方になることを目で確かめる。2 枚は `docs/superpowers/plans/evidence/gaussian-initial-{old,new}.png` に保存する。
  - CORS などで取得できなければ、作業を止めて報告する。
- [ ] **Step 4: 通ることを確かめる**
  - 単体試験 PASS。
  - `BUILD_MODE=package node_modules/.bin/vite build` の後、`dist/` に Spark を含む別チャンクができ、`dist/chuci.js` 本体に Spark が入っていないこと（`grep -c sparkjs dist/chuci.js` が 0）。
- [ ] **Step 5: commit と push** — `git commit -m "feat(viewer)!: Gaussian を Spark に移し、開いたときだけ読み込む"`

---

### Task 9: サムネイルの生成・保存・スライダーへの組み込み

**Files:**
- Create: `src/thumbnails/generate.ts`, `cache.ts`, `queue.ts`, `icons.ts`
- Modify: `src/utils/youtube-embed.ts`（`extractVideoId` を export するだけ。判定は変えない）
- Modify: `src/components/swiper/cc-swiper.ts`（`thumbnail-url` がなければキュー経由で差し込む）, `src/index.ts`（`generateThumbnail`・`MediaItem`・`readMediaItem` を公開）, `package.json`（試験用に `fake-indexeddb` を devDependencies へ）
- Test: `tests/thumbnails.test.ts`

**Interfaces:**
- Consumes: `prepareModelScene`・`preparePanoramaScene`・`prepareGaussianScene`・`ThreeStage.capture`（Task 6〜8）、`toYouTubeIframeSrc` と同じ ID 抽出（`utils/youtube-embed.ts` の `extractVideoId` を export して使う）
- Produces:
  ```ts
  export const THUMBNAIL_GENERATOR_VERSION: number
  export function generateThumbnail(item: MediaItem, opts?: { maxSize?: number; signal?: AbortSignal }): Promise<Blob>
  export function thumbnailCacheKey(item: MediaItem, maxSize: number): string
  //  = [url, type, cameraPosition, cameraTarget, materialUrl, showTexture, fitToContainer, maxSize, THUMBNAIL_GENERATOR_VERSION]
  export class ThumbnailCache {
    static open(): Promise<ThumbnailCache>       // DB 名 'chuci-thumbnails'。IndexedDB が使えなければ何もしない実装を返す
    get(key: string): Promise<Blob | undefined>  // 取得時に最終利用時刻を更新
    put(key: string, blob: Blob): Promise<void>  // 上限超過時は最終利用の古い順に削除
  }
  export class ThumbnailQueue {
    request(item: MediaItem, priority: number): Promise<string | null>   // object URL。失敗は null。同時実行は 1
  }
  ```
  - スライダーの優先順位：`thumbnail-url` → 保存済み → 種類のアイコン（その場で表示）→ 裏で生成して差し替え。生成の順番は「表示中のスライド」が先。
  - 失敗した鍵はページの寿命の間だけ覚え、IndexedDB には残さない。
  - YouTube は `https://i.ytimg.com/vi/<id>/hqdefault.jpg` を取得して Blob にする。取得できなければ、その URL を `<img>` にそのまま使う。動画 ID が取れない URL はアイコンのまま（試験 `youtube url without video id keeps icon`）。
  - 種類のアイコンは SVG で `src/thumbnails/icons.ts` に置く（絵柄は作業者が決める）。

- [ ] **Step 1: 失敗する試験を書く**
  - `thumbnailCacheKey changes when camera-position changes and when version changes`
  - `cache evicts least recently used when over limit`（`fake-indexeddb`）
  - `slider uses thumbnail-url when present and never calls generator`
  - `slider shows icon then swaps to generated object URL`
  - `queue runs one at a time, current slide first`
  - `keeps icon and records failure on CORS error`（Review Focus 5）：生成関数が reject → アイコンのまま。2 回目の request で生成関数を呼ばない。IndexedDB に失敗が入らない
  - `ThumbnailCache.open falls back when indexedDB is undefined`
- [ ] **Step 2: 失敗を確かめる** → FAIL
- [ ] **Step 3: 実装する**
  - 撮影は、画面外の `ThreeStage`（大きさ = `maxSize` 四方の範囲で元の縦横比）で 1 フレーム描いて `capture`。
  - 2D 画像は `createImageBitmap`＋`OffscreenCanvas`。MP4 は 0.5 秒の位置のコマ。
  - 画像の形式と `maxSize` の既定値は作業者が決める。
- [ ] **Step 4: 通ることを確かめる** → 全単体試験・`tsc --noEmit`・lint が PASS
- [ ] **Step 5: commit と push** — `git commit -m "feat(thumbnails): サムネイル生成 API と IndexedDB への保存を追加"`

---

### Task 10: Quyuan の追随と e2e

**Files（Quyuan の clone）:**
- Modify: `package.json`（devDependencies に `"@c4h/chuci": "link:../Chuci"` を追加。peerDependencies は `^2.0.0` にする）, `src/components/swiper/qy-swiper.ts`（`viewerTagName()` を `'qy-viewer'` にし、`openViewer` の上書きを消す。`slides` の上書きと MutationObserver は残す）, `src/components/viewer/qy-viewer.ts`（`open(items, index, opts)` を内側の `cc-viewer` に渡すだけにする。`setSwiper`・`setCurrentSlideIndex` は消す。`currenttype`・`currentslideindex` 属性と `--qy-viewer-z-index` は残す）
- Modify: `src/components/viewer/qy-viewer.navigation.test.ts` ほか、新しい口に合わせる
- Create: `e2e/renewal.spec.ts`, `renewal-demo.html`（Leaflet のポップアップと、全 6 種類を並べたスライダー）

**Interfaces:**
- Consumes: Chuci の `CcSwiper.viewerTagName()`・`CcViewer.open(items, index, opts)`・イベント `cc-viewer-index-change`・`cc-viewer-close`（composed なので `qy-viewer` の外へ届く）

- [ ] **Step 1: 失敗する e2e を書く**（`e2e/renewal.spec.ts`。chromium だけで足りる）
  - `swipe in leaflet popup changes slide and map center stays the same`
  - `click opens viewer; next in viewer moves slider behind; close resumes autoplay`
  - `all six media types open with black background and the same spinner element`
  - `caption bar hides on drag and returns on tap`
  - `opens and closes 3D viewer 30 times without context loss`（Review Focus 4）：`webglcontextlost` が 0 回、`console.error` が 0 件
  - `thumbnail generated for slide without thumbnail-url and reused from IndexedDB after reload`
  - `gaussian camera-position changes the initial view`（属性あり／なしで撮影結果が違うこと）
- [ ] **Step 2: 失敗を確かめる** — `node_modules/.bin/playwright test e2e/renewal.spec.ts --project=chromium` → FAIL
- [ ] **Step 3: Quyuan を直す**
- [ ] **Step 4: 通ることを確かめる** — Quyuan の `node_modules/.bin/vitest run`・`tsc --noEmit`・上の e2e と既存の `e2e/leaflet-popup.spec.ts`・`viewer-integration.spec.ts` が PASS（既存 e2e の Swiper 前提のセレクタは新しい DOM に合わせる。**検査内容は弱めない**）
- [ ] **Step 5: 画面を自分の目で確かめる** — e2e のスクリーンショットと、`renewal-demo.html` で全種類を切り替えた画面を、作り直し前（`master`）と後で撮る。`e2e/screenshots/renewal-{before,after}-*.png` として保存し、外枠・背景・スピナー・帯・初期サイズがそろっていることを画像を見て確かめる。
- [ ] **Step 6: commit と push** — `git commit -m "feat!: Chuci 2.0 の新しいスライダーとビューアに追随する"`

---

### Task 11: 文書・スクリーンショット・版

**Files:**
- Chuci：`README.md`・`README.ja.md`・`docs/api/chuci.md`・`docs/api/chuci.ja.md`・`CHANGELOG.md`・`package.json`（`version: 2.0.0`）・`index.html`（デモに全種類と `debug-mode` の例を入れる）
- Quyuan：`README.md`・`README.ja.md`・`docs/api/*`・`CHANGELOG.md`・`package.json`（`version: 2.0.0`、peer `^2.0.0`。`link:` は**残さず**、devDependencies も `^2.0.0` に戻す）・`e2e/screenshots/*` の差し替え

- [ ] **Step 1: 文書を書く**（rule-0001・rule-0002）
  - CHANGELOG の Unreleased（日英を分ける）に次を書く。
    - **破壊的変更**：`cc-viewer-*` 要素の削除、`cc-viewer.open` の引数の変更、`setSwiper`・`setCurrentSlideIndex` の削除、依存の入れ替え
    - **不具合の修正**：Gaussian の `camera-position`・`camera-target`、3D メッシュの `show-texture`・`fit-to-container`
    - **新機能**：サムネイルの自動生成と `generateThumbnail`
  - `docs/api` には `generateThumbnail` の使い方（作成時のツールから呼ぶ例を含む。WebGL が必要なことも明記）と、操作の規則の表（設計書 5.5）を書く。
- [ ] **Step 2: 確かめる**
  - Chuci：`node_modules/.bin/eslint src tests`・`tsc --noEmit`・`vitest run`・`BUILD_MODE=package node_modules/.bin/vite build` がすべて通る。
  - Quyuan：同じものに加え、e2e 全体が通る。
  - `grep -rn -E "swiper|viewerjs|gsplat|aframe" Chuci/src Chuci/package.json` が 0 件（`cc-swiper` の名前は除く）。
- [ ] **Step 3: commit と push** — `git commit -m "docs: 2.0.0 の README・API 文書・CHANGELOG・スクリーンショットを更新"`

Quyuan の `link:` を `^2.0.0` に戻した後は、Chuci 2.0.0 が npm に出るまで Quyuan の CI が通らない。この点は合流の時期を決めるときに扱う。今回の計画の範囲は、ブランチ上で完結するところまでとする。
