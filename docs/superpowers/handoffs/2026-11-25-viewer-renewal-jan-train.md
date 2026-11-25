# スライダーとビューアの作り直し — 1 月トレインへの引き継ぎ

- 作成：2026-11-25
- 合流先：1 月トレイン（人間の決定、2026-11-25）。12 月トレインには入れない。
- ブランチ：Chuci・Quyuan とも `viewer-renewal`（どちらも GitHub に push 済み）
- 設計書：`docs/superpowers/specs/2026-11-25-viewer-renewal-design.md`
- 実装計画：`docs/superpowers/plans/2026-11-25-viewer-renewal.md`
- 証拠画像（作り直し前後の初期画面・サムネイル）：`docs/superpowers/plans/evidence/`
- 人間の画面確認：2026-11-25 にデモで確認し「大丈夫そう」。

## 1. 合流の条件と順序

1. **Chuci を先に公開する。** Chuci 2.0.0 を npm に出す（版番号はトレインのリリース手順で決める。ブランチでは package.json の version と README の release-pinned ブロックを変えていない）。
2. **Quyuan の依存を戻す。** Quyuan の `devDependencies` の `"@c4h/chuci": "link:../Chuci"` を `^2.0.0` に戻し、lockfile を作り直す。peer はすでに `^2.0.0`。これをしないと、Quyuan を単独で clone する CI が Chuci を解決できない。
3. **Quyuan を単独の clone で検証する。** 型検査・単体試験・build・e2e（chromium と `playwright-ci.config.ts`）。
4. **Maplat・MaplatCore で確かめる。** 既存の POI テンプレート（`qy-swiper`・`qy-swiper-slide` と属性）がそのまま動くこと、旧 Chuci が先に登録されるページ（Maplat の `spec/element-media-preregistered-chuci.spec.ts`）で開閉できること。MaplatCore の許可リストは変えていない。
5. **dist を確かめる。** Chuci の dist には Spark を含む別チャンク（ESM）が入る。UMD には Spark が内包される。

## 2. 利用者に見える変化（CHANGELOG の Unreleased に日英で記載済み）

- 破壊的変更：`cc-viewer-*` 要素の削除、`cc-viewer.open(items, index, opts)` への変更、`setSwiper`・`setCurrentSlideIndex` の削除、依存の入れ替え（Swiper・viewer.js・A-Frame・gsplat を外し、Spark を追加）。移行手順は docs/api（日英）。
- 不具合の修正：Gaussian の `camera-position`・`camera-target`、3D メッシュの `show-texture`・`fit-to-container` が効くようになった。属性を書いていないデータの見え方は変わらない。
- 新機能：サムネイルの自動生成と `generateThumbnail`（閲覧時は IndexedDB に保存）。

## 3. 既知の問題（合流を止めないと判断したもの）

- **遷移の序盤の連続スワイプ**：次の画像が約 15px しか入っていない遷移の序盤にもう一度スワイプすると、送り元の画像が一瞬中央に出る。見た目だけで、データは壊さない。
- **実データの Gaussian の e2e**：約 20 MB の `okuman.splat` を開く試験が、ヘッドレスのブラウザで止まることがあった。原因は未確定（GPU を使わないソフトウェア描画の可能性）。試験は小さな代用データに替えて通している。実機のブラウザでは表示できる。
- **動画の帯**：MP4・YouTube では、再生バーへの入力を遮らないよう帯を常に表示し、メディアを帯の上の領域に収めている（設計の V2 の例外。人間に報告済み）。

## 4. 後回しにした軽微な点（最終レビューで「後回し可」と判定）

- GestureInterpreter の dispose が、元の `touch-action` の `!important` を復元しない。
- メモリから同期復元したとき、IndexedDB の最終利用時刻が更新されない。
- 別のスライダーから、同じサムネイルの鍵の優先度を後から下げられる。
- 矢印で送っている途中に点へ移したフォーカスが、遷移の完了で消える。
- 自動送りの単体試験が、単独で実行すると失敗する（サムネイルの期限タイマも数えるため。ファイル全体の実行では通る）。
- `@types/geojson` がない利用者で、Quyuan のテンプレート型が TS2307（既存の問題）。
- 試験・build の出力に、jsdom の未実装 API・WebGL の警告と、API Extractor の TypeScript 版差の警告が出る。

## 5. 実装中に設計者（Claude）が判断したこと

判断が誤っていた場合の影響を括弧に書く。

1. 旧ビューアのファイルは作業 4 で一括削除し、旧版の既定値は master から読んで引き継いだ（影響は小さい）。
2. 2 枚構成のループでは、後ろへドラッグしている間、もう一方の画像を左側に置き直す（2 枚のときのドラッグの見た目のみ）。
3. 動画と YouTube は帯を常に表示する（動画が帯の高さぶん小さくなる。§3）。
4. YouTube の iframe 内の読み込み失敗は検出しない。設計どおりで、別サイトの iframe からは検出できない。
5. 描画部の口に `reportError` を足した。
6. 2 本指の操作を描画 1 回ごとにまとめて処理する。拡大縮小の上限・下限でずれないようにするため（1 フレームの遅れのみ）。
7. Gaussian のサムネイルの画角は、表示の高さ 720px を基準に計算する。出力サイズで構図が変わらないようにするため。
8. 最終レビューの後に見つかった「ドラッグ中の自動送りでスワイプが無視される」問題は、ドラッグ中は自動送りを見送る形で直した。
9. 版番号と release-pinned ブロックは変えず、Quyuan の `link:../Chuci` は合流の条件として残した（§1）。
10. デモの 3D メッシュのカメラ位置（`0,0.48,1.62` → `0,0,0.3`）は、Gaussian の既定の視点に目で合わせた。OBJ と splat は別々に復元したデータで座標系が違うので、データごとにカメラ位置を書く必要がある（人間の了承済み）。

## 6. 検証の記録（2026-11-25 時点）

- Chuci：単体試験 251 件、型検査、lint、package build。
- Quyuan：単体試験 176 件、e2e（chromium）22 件、CI 設定の e2e 3 件、型検査、lint、package build。
- 実ブラウザでの目視：作り直し前後の初期画面（3D メッシュ・360 度・Gaussian）、6 種類のサムネイルの自動生成、Leaflet のポップアップ内のスワイプ。
- セキュリティレビュー：§7 を参照（Medium 4 件は対処済み）。

## 7. セキュリティレビュー（2026-11-25、Codex gpt-6.2-sol）

対象：Chuci 07d6cf5..9eb6bfd、Quyuan e53f10f..8574809。前提は「第三者が書いた POI テンプレートを MaplatCore が無害化してから表示する」。**Critical・High はなし。Medium 4・Low 2。**

確認できた良い点：キャプション・エラー・デバグ表示は textContent で、属性の生文字列はデバグ表示に渡らない。サムネイルは DOM API で img.src に入り、CSS の url() への補間はない。`pnpm audit --prod` は両リポジトリの BASE・HEAD とも警報 0 件（開発依存を含めても 0 件）。Spark 2.4.0 は lockfile の SHA-512 と一致。Semgrep（Chuci 47・Quyuan 17 ファイル）で検出 0 件。

### 合流の前に直すもの（Medium）
1. **裏のサムネイル生成に上限がない。** thumbnail-url を省いて大きな OBJ・MTL・splat を指すと、POI を表示しただけで全量の取得・解析が始まる（OBJ はメインスレッドで同期解析。30 秒の期限では同期解析を止められない）。対処案：取得バイト数とデコード後の規模に上限を設け、表示中と近傍だけを生成する。間に合わなければ、重い形式はアイコンに留める。
2. **別のメディアのサムネイルが IndexedDB から返りうる。** 鍵に image-url・material-url の生の文字列を使っているため、同じオリジンの別のディレクトリのページで同じ相対名を使うと、取得先が違っても先に保存した画像が出る（fake-indexeddb で実測）。対処案：基準 URL で解決した絶対 URL を、取得と鍵の両方に使い、生成の版を上げる。
3. **YouTube 枠に任意の https ページを表示できる**（旧版から引き継いだ仕様）。sandbox のない iframe なので、第三者が動画枠の中に偽のログイン画面などを出せる。対処案：第三者の POI では正規化した YouTube の埋め込み先に絞る。互換のために残すなら、フォールバックだけに sandbox を付ける。**人間の判断が要る。**
4. **Spark の CSP の要件が文書にない。** 利用側の CSP で `worker-src blob:`・`script-src 'wasm-unsafe-eval'`（Worker の作成が失敗したときの data: フォールバックも）、生成画像のための `img-src blob:` が要る。両 README に書き、Maplat の配備のポリシーで確かめる。あわせて Quyuan の公開ビルドで同梱する Chuci の出どころを固定する（§1 の手順 2）。

### 後回しでよいもの（Low）
- MTL の中のテクスチャの URL（map_Kd）は POI の URL 検査を通らない。第三者のデータ用に、取得直前に http(s) と許可先を検査する仕組みを用意する。
- IndexedDB の書き込みのたびに全件を読む。上限より大きい Blob も一度書く。失敗した鍵と保持中の Blob URL に上限がない。

### 未確認
- 実際に配備する同じオリジンに、第三者が HTML を置ける場所があるか（あれば 3 の重大度を見直す）。
- 認証で内容が変わるメディアの URL や、副作用のある同じオリジンの GET が、実際の配備にあるか。

### 対処の結果（2026-11-25）
- Medium 4 件を修正した（Chuci 81539e3・87e7209、Quyuan 9c59d1b）。Kimi K3.1 Pro のレビューで承認。
  - 生成は表示中と前後 1 枚だけ。元のメディアの取得は 64 MiB まで（Content-Length あり・なしの両方）。上限を超えたものは保存しない。ビューアで開く表示には上限なし。
  - 保存の鍵は、基準 URL で解決した絶対 URL。生成の版は 4。
  - YouTube の枠は YouTube の動画だけ（人間の決定）。YouTube 以外の URL はエラー表示。CHANGELOG の破壊的変更に記載。
  - CSP の要件を両 README・docs/api（日英）に記載。配布物と一致することをレビューで確認。実際の配備のヘッダーでの確認は合流時に行う。
- **合流前に検討したい点**：サムネイル生成の 30 秒の期限は、取得全体にかかっている。28 MB の OBJ を 30 秒で取るには約 11 Mbps が要り、遅い回線では正常なデータでもアイコンのままになる。レビューの提案は「30 秒を無通信の期限にして読み取りのたびに延長し、別に 120〜300 秒の総合の上限を置く」。
