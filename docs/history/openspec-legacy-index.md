# Chuci openspec 時代の開発履歴索引

> 本ファイルは openspec ワークフロー（〜2026年）時代に作成された開発提案・記録を、那由多開発サイクル形式の履歴として集約した索引です。
> 原文は `docs/history/openspec-legacy/<change-id>/` 配下にそのまま保存されています（内容は変更していません）。
> 那由多開発サイクルについては `docs/superpowers/`（存在する場合）を参照してください。
>
> 「推定時期」は、各 change の `proposal.md` に対して `git log --follow --diff-filter=A -1` を実行して得た**作成日**（そのファイルが最初にリポジトリへ追加されたコミットの日付）を記載しています。archive 化の際にディレクトリ名へ日付プレフィックスが付与される・リネームされるケースがあるため、ディレクトリ単位ではなくファイル単位で `--follow` を適用し、archive 日ではなく作成日を実測しています。

## 開発提案一覧（openspec/changes、archive済み + 未archive、計3件）

| change-id | 由来 | 推定時期 | 目的 | 実装状況 | 現在の扱い | 原文 |
|---|---|---|---|---|---|---|
| 2025-12-22-init-dev-env | archive済み | 2025-12-22（dabe900） | Issue #1「開発環境初期化」対応。Lint・フォーマット・テスト・CI・git hooksを整備し、Chuciのコード品質と開発生産性の基盤を確立する。 | 完了 | 完了・削除対象 | [原文](openspec-legacy/2025-12-22-init-dev-env/) |
| 2025-12-23-cjs-dist-ghpages | archive済み | 2025-12-23（6792172） | CommonJSを廃してESM化し、`dist`をライブラリ専用に整理、デモサイトをGitHub Pagesへ容易にデプロイできるようにする。 | 完了 | 完了・削除対象 | [原文](openspec-legacy/2025-12-23-cjs-dist-ghpages/) |
| 2025-12-23-remove-husky | archive済み | 2025-12-23（739662d） | Windows環境での実行ポリシー問題等を避けるためローカルgit hooks（husky/lint-staged）を廃止し、CI（`ci.yml`）による品質担保へ一本化する。 | 完了 | 完了・削除対象 | [原文](openspec-legacy/2025-12-23-remove-husky/) |

## 当時のプロジェクト概要（参考・陳腐化済み）

| 項目 | 推定時期 | 目的 | 現状との乖離 | 原文 |
|---|---|---|---|---|
| project.md | 2025-12-22（dabe900） | openspecワークフロー導入時点でのChuciプロジェクト概要・規約を記述したもの。 | 那由多開発サイクル移行（本索引作成）により、開発プロセス・ドキュメント体系は本ファイル群へ置き換わっている。参考情報として保存。 | [原文](openspec-legacy/_project-snapshot/project.md) |
| specs/linting/spec.md | 2025-12-22（dabe900） | Lint設定に関する仕様（init-dev-env由来）。 | 完了済み変更の仕様記録として保存。 | [原文](openspec-legacy/_project-snapshot/specs/linting/spec.md) |
| specs/packaging/spec.md | 2025-12-23（6792172） | dist成果物整理に関する仕様（cjs-dist-ghpages由来）。 | 完了済み変更の仕様記録として保存。 | [原文](openspec-legacy/_project-snapshot/specs/packaging/spec.md) |
| specs/dev-server/spec.md | 2025-12-23（6792172） | devサーバのルートURL動作に関する仕様（cjs-dist-ghpages由来）。 | 完了済み変更の仕様記録として保存。 | [原文](openspec-legacy/_project-snapshot/specs/dev-server/spec.md) |
| specs/git-hooks/spec.md | 2025-12-22（dabe900） | git hooksに関する仕様（init-dev-env由来、後にremove-huskyで廃止方針へ更新）。 | remove-husky完了によりローカルgit hooksは廃止済み。当時の仕様記録として保存。 | [原文](openspec-legacy/_project-snapshot/specs/git-hooks/spec.md) |
| specs/deployment/spec.md | 2025-12-23（6792172） | GitHub Pagesデプロイに関する仕様（cjs-dist-ghpages由来）。 | 完了済み変更の仕様記録として保存。 | [原文](openspec-legacy/_project-snapshot/specs/deployment/spec.md) |
| specs/formatting/spec.md | 2025-12-22（dabe900） | フォーマット設定に関する仕様（init-dev-env由来）。 | 完了済み変更の仕様記録として保存。 | [原文](openspec-legacy/_project-snapshot/specs/formatting/spec.md) |
| specs/vscode/spec.md | 2025-12-22（dabe900） | VSCode設定に関する仕様（init-dev-env由来）。 | 完了済み変更の仕様記録として保存。 | [原文](openspec-legacy/_project-snapshot/specs/vscode/spec.md) |
