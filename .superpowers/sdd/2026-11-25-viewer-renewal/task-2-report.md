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

# Task 2 レビュー指摘（第 2 回）修正報告

## 修正内容

- スワイプ確定時、ドラッグ中の配置を起点にして、出ていくパネルはスワイプ方向へ、次のパネルは 0% へ transition するよう変更した。3 枚以上で間に合わないパネルは transition を `none` にして新しい配置へ移す。transition 完了時は正規の `slideOffsets` 配置へ transition なしで整える。
- 別のスライダーが同じビューアを開いた場合、前の所有者の `viewerOpen` を解除して自動送りを再開する。ビューアの close 後は新しい所有者も再開する。
- スライド監視を `subtree: true` にし、列挙されるスライド要素の配列が変わった場合だけ再構築する。スライド以外の子要素追加ではサムネイル設定や自動送りタイマーを更新しない。
- 所有中のスライダーが DOM から切断された場合、disconnect 時に viewer ownership を解除する。再接続時には viewerOpen が残らず、自動送りを開始できる。
- 2 枚・3 枚のスワイプ遷移、ビューア所有者の順次切替、ラッパー内の 1→2→1 枚変更と span 追加、ビューア表示中の切断・close・再接続を回帰試験に追加した。

## 検証

- RED: `node_modules/.bin/vitest run tests/cc-swiper.test.ts` — 新規回帰試験を含む 20 件中 5 件が失敗。逆走・余分なパネルの transition・所有者移譲・子孫監視・disconnect 後の自動送り再開が未実装であるための失敗を確認。
- GREEN: `node_modules/.bin/vitest run tests/cc-swiper.test.ts` — 1 file / 20 tests passed。
- 全体: `node_modules/.bin/vitest run` — 9 files / 121 tests passed。Vitest は jsdom 環境の生成時間に関する案内を出力したが、失敗・警告はなし。
- 型検査: `node_modules/.bin/tsc --noEmit` — 成功。
- lint: `node_modules/.bin/eslint src tests` — 成功。
- 差分形式: `git diff --check` — 成功。

## 変更ファイル

- 変更: `src/components/swiper/cc-swiper.ts`、`tests/cc-swiper.test.ts`

## 自己レビュー・懸念

- 指摘 2・3・5 と新規 Important の再現試験を追加し、指摘のタイマー状態・DOM パネル数・遷移先も検査した。
- 追加の懸念なし。push はしていない。

# Task 2 レビュー指摘（第 3 回）修正報告

## 修正内容

- ドラッグ中の横移動量を `±width` に制限し、`pointerup` 時も同じ制限値で配置を確定するようにした。`loop=false` の端から外向きにドラッグする場合は、従来どおり制限しない。
- スワイプ確定時に各パネルの解放位置と遷移先をピクセルで求め、どちらかが `|x| < width` の表示領域に入るパネルだけに transition を付ける。表示領域外のパネルは transition なしで再配置する。
- 2枚構成では `slideOffsets` の値が送り方向を表さないため、退出パネルの遷移先を送り方向で補正した。ドラッグ方向が右の場合の既存の2枚配置も維持した。
- 2・3・4枚で左へ120pxドラッグする試験を追加し、ドラッグ量の制限、transition 対象と表示領域の一致、左送りでの逆走防止を確認する。
- transition 完了時は対象パネルすべてのリスナーを解除して正規配置へ戻す。

## 検証

- 対象試験: `node_modules/.bin/vitest run tests/cc-swiper.test.ts` — 1 file / 23 tests passed。
- 全体試験: `node_modules/.bin/vitest run` — 9 files / 124 tests passed。
- 型検査: `node_modules/.bin/tsc --noEmit` — 成功。
- lint: `node_modules/.bin/eslint src tests` — エラーなし。実行時に追加試験の未使用引数 warning が1件出たため、その引数を削除した。指定どおり lint は1回のみ実行し、編集後の再実行はしていない。

## 変更ファイル

- 変更: `src/components/swiper/cc-swiper.ts`、`tests/cc-swiper.test.ts`

## 自己レビュー・懸念

- 試験で2・3・4枚の境界ケースと可視パネルの transition 判定を確認した。全体試験・型検査は通過。
- lint はコード上のwarningを報告後に解消したが、指定の1回制限に従い修正後の再実行をしていない。push はしていない。

# Task 2 レビュー指摘（第 4 回）修正報告

## 修正内容

- ドラッグ中の座標を `pointermove` で従来どおり ±幅に制限し、フレームごとに最新の値を DOM に書く。指を離した時は保留中のフレームを取り消し、リリース座標は送りの方向と確定条件に使う。
- 各パネルの横位置を transform の書き込み時に記録し、最後に書いた位置と送り後の位置のどちらかが `|x| < 幅` を満たす場合に transition を付ける。リリース時に開始位置を再計算すると未描画の入力が混ざるため、記録済みの位置を共通の書き込み処理から取得する。遷移先を書く直前にブラウザーへ開始位置のスタイル計算を促す。
- 幅100px・4枚で −20px を1フレーム表示し、−120px の move と up を同じフレーム内で送る回帰試験を追加した。退出パネルの transition、開始座標が −20px のまま遷移先を設定したこと、次のフレームで保留されていた座標が書かれないことを確認した。

## 検証

- RED　`node_modules/.bin/vitest run tests/cc-swiper.test.ts` — 23件成功、追加した1件が失敗。退出パネルの transition で `expected 'none' to contain '250ms'` を確認。
- GREEN　`node_modules/.bin/vitest run tests/cc-swiper.test.ts` — `1 passed (1)` ファイル、`24 passed (24)` 件。40px・120px のドラッグ、所有者、子孫監視、切り離しの既存試験を含む。
- ローカル Chrome の追加確認　esbuild でコンポーネントを一時ディレクトリに束ね、`node <一時ディレクトリ>/verify-swipe.mjs` で同じ操作を実行。計算済み transform の X 座標は遷移開始時 −20px、125ms 時点 −84.1923px、250ms 時点 −100px。送り後のインデックスは1。
- 全体　`node_modules/.bin/vitest run` — `9 passed (9)` ファイル、`125 passed (125)` 件。jsdom の環境作成時間に関する案内が出力された。
- 型検査　`node_modules/.bin/tsc --noEmit` — 終了コード0、出力なし。
- lint　`node_modules/.bin/eslint src tests` — 終了コード0、出力なし。
- 差分形式　`git diff --check` — 終了コード0、出力なし。

## 変更ファイル

- `src/components/swiper/cc-swiper.ts`
- `tests/cc-swiper.test.ts`
- `.superpowers/sdd/2026-11-25-viewer-renewal/task-2-report.md`

## 自己レビュー

- 指を離す場合、キャンセルで通常配置に戻す場合、再描画・切り離しで後処理する場合に保留フレームが取り消されることを差分で確認した。追加の懸念なし。
