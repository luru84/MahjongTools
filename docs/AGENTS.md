# AGENTS ガイド

開発エージェント向けの運用メモです。人手と協調しやすいよう最低限のルールをまとめています。

## 環境/コマンド
- 依存インストール: `npm ci`
- ビルド: `npm run build`
- 開発サーバ: `npm run dev`
- Lint: `npm run lint`
- 型チェック: `npm run typecheck`
- テスト: `npm run test`（将来的に `vitest` を追加予定）

## コード方針
- Vue 3 + TypeScript + Vite。Composition API（`<script setup>`）を基本とする。
- ルーティングは Vue Router（`/` + `/tools/:id`）を前提。ルートは遅延 import。
- モバイル幅を最優先（360–430px）。PC でもモバイル幅を維持。
- GitHub Pages 配信を想定し、`vite.config.ts` の `base` をリポジトリ名に合わせる。Service Worker は base を考慮して登録。
- オフライン前提のため、ネットワーク依存の機能追加は避ける。

## 編集ルール
- ESLint/TypeScript が通ること。不要な import は削除。ref の `.value` を徹底。
- 非 ASCII は必要な場合のみ使用（日本語 UI は可）。
- ルーティング追加時は meta.title を設定する。
- 共有ロジックは `src/lib/` へ分離し、UI はコンポーネント側で呼び出す。
- CSS は `src/assets/main.css` に共通スタイルを置き、ページ固有の微調整はコンポーネント内スタイルで最小限に。

## 禁止/注意
- `node_modules` や生成物へのコミット禁止。
- 破壊的な Git 操作（reset --hard 等）は行わない。
- GitHub Pages を無効化している場合、`pages.yml` の失敗は無視してよい。公開時に Pages を有効化。
- 広告/トラッキングの追加は禁止（非機能要件）。

## 作業の流れ（推奨）
1. docs/ISSUE.md を見てタスクを確認。
2. 変更前に最新を pull/rebase。
3. コード変更 → lint/typecheck（可能なら test）→ コミット。
4. コミットメッセージは簡潔に（例: `feat: ...`, `fix: ...`, `docs: ...`）。
