# Task 2 実装報告

## 実装内容

- `cc-swiper` を Swiper 依存の構成から、Pointer Events・`slideOffsets`・`ResizeObserver` を使う自作スライダーへ置き換えた。
- `readMediaItem`、番号計算、共有キャプション帯を利用し、クリックでビューアを開く処理、前後・キーボード操作、ドット・サムネイル、5秒間隔の自動送りを実装した。
- ビューアとの口を `ViewerLike.open(items, index, { loop })` にし、インデックス変更・閉じるイベントを購読する。自動送りはビューアを開くと止め、閉じると再開する。
- `src/core/feel.ts` に `dragThresholdPx`・`swipeCommitRatio`・`slideTransitionMs` を追加した。
- Swiper の CSS と Swiper 専用試験を削除し、`package.json` と `pnpm-lock.yaml` から依存を取り除いた。
- 注入対策試験のセレクタを新 DOM に合わせ、外部値が HTML として解釈されず属性値・テキストとして保たれる確認を残した。

## TDD 証跡

- RED: `node_modules/.bin/vitest run tests/cc-swiper.test.ts` — 10件すべて失敗。旧実装に `goTo` や新 DOM がなく、要求動作をまだ満たさないための失敗。
- GREEN: `node_modules/.bin/vitest run tests/cc-swiper.test.ts` — 10/10 成功。
- 注入試験: `node_modules/.bin/vitest run tests/cc-swiper.test.ts tests/template-interpolation-injection.test.ts` — 24/24 成功。

## 最終確認

- `node_modules/.bin/vitest run` — 9 test files のうち8成功。113件中111件成功。失敗2件はいずれも変更禁止指定の `tests/cc-viewer-loop-navigation.test.ts` 内の旧 cc-swiper ケースで、Swiper の `slider.params.loop`・`slideToLoop` と旧 `openViewer(url, type)` / `setCurrentSlideIndex` を期待している。今回の要件は Swiper を除去し、`openViewer(index)` から `ViewerLike.open(items, index, { loop })` を呼ぶことなので、この旧期待とは両立しない。指定に従い当該試験と旧ビューアは変更していない。ファイル内の cc-viewer に関する4件は成功。
- `node_modules/.bin/tsc --noEmit` — 成功。
- `node_modules/.bin/eslint src tests` — 成功。
- `git diff --check` — 成功。
- `rg -n "swiper" package.json pnpm-lock.yaml` — 該当なし。

## 変更ファイル

- 変更: `src/components/swiper/cc-swiper.ts`、`package.json`、`pnpm-lock.yaml`、`tests/template-interpolation-injection.test.ts`
- 追加: `src/core/feel.ts`、`tests/cc-swiper.test.ts`
- 削除: `src/components/swiper/swiper-styles.css`、`src/components/swiper/cc-swiper-styles.ts`、`tests/cc-swiper-navigation-icon.test.ts`、`tests/cc-swiper-thumb-tap.test.ts`

## 自己レビュー・懸念

- 公開インターフェースと Swiper 依存の削除は要件どおり。外部由来値を HTML テンプレートへ差し込まず、DOM API で属性・テキストを設定している。
- 全体試験は上記の旧 Swiper 期待2件が残るため完全成功ではない。コントローラ側でどちらの契約を優先するか判断が必要。
- 指定により Quyuan と旧 cc-viewer は変更していない。push もしていない。

---

# Task 2 レビュー指摘（第 1 回）修正報告

## 修正内容

- `#gallery[hidden]` と `#caption[hidden]` を明示的に `display:none` にし、空のサムネイル列・キャプション帯が flex の行を占有しないようにした。
- `goTo()` はパネルやサムネイルを再生成せず、既存ノードの位置と transition を更新する。小さな横移動でタップと判定した場合も、ビューアを開く前にスライド位置へ戻す。
- ビューアを開いたインスタンスを所有者として記録し、そのインスタンスだけが番号変更・close 通知を処理する。再描画とスライド増減時は所有者状態を保ち、自動送りを再開しない。
- スライド子要素の増減を `MutationObserver` で検知し、実 DOM の再構築・自動送りの開始停止を同期する。通常の番号移動ではタイマーを増やさない。
- host および shadow root で pointer・wheel・click の伝播を止め、縦方向の既定操作を妨げない。
- サムネイルの属性境界 payload を使う注入回帰試験を追加した。
- スワイプ速度 `0.35` を `FEEL.swipeVelocityPxPerMs` に移し、旧版の SVG chevron を CSS mask で復元してナビゲーション色を CSS 変数に追従させた。

## 検証

- 関連試験: `node_modules/.bin/vitest run tests/cc-swiper.test.ts tests/template-interpolation-injection.test.ts` — 2 files / 30 tests passed。
- 全体試験: `node_modules/.bin/vitest run` — 9 files / 116 tests passed。
- 型検査: `node_modules/.bin/tsc --noEmit` — 成功。
- lint: `node_modules/.bin/eslint src tests` — 成功。
- 型検査の初回は試験から `protected` メソッドを直接呼んだ型エラーを検出した。試験の呼び出し方を修正し、再実行で成功した。

## 変更ファイル

- 変更: `src/components/swiper/cc-swiper.ts`、`src/core/feel.ts`、`tests/cc-swiper.test.ts`、`tests/template-interpolation-injection.test.ts`

## 懸念

- なし。push はしていない。
