# Coding Guidelines

プロジェクト共通のコーディングルールです。ESLint に加え、設計方針を補足します。

## TypeScript / Vue
- `<script setup lang="ts">` を基本とし、Composition API を利用する。
- `ref` 値は `.value` を明示して参照/更新する。`computed` は必要最低限。
- 型は可能な限り具体的に定義し、`any` は避ける。ユーティリティ型は `src/lib/` に集約。
- コンポーネント名はマルチワード（例: `PointsTracker`）。`defineOptions` で明示すること。
- プロップス/emit を使う場合は `defineProps`/`defineEmits` で型付けする。

## 構造 / レイアウト
- モバイル 1 カラムを前提。`max-width` は CSS で 480–560px 程度に固定し、左右余白は 12–16px。
- ナビ/共通レイアウトはヘッダー+フッターに集約し、各ページは独立ルートとする。
- ルートは遅延 import し、`meta.title` を設定する。

## スタイル
- グローバルスタイルは `src/assets/main.css` にまとめる。複雑なテーマは変数で管理。
- カード/ボタンの角丸・シャドウは現行トーンに合わせる。タップ領域は最小 44px。
- 非 ASCII は必要な場合のみ。色/テーマ切替を追加する場合はトークン化する。

## ロジック
- 牌操作や点数計算などのロジックは `src/lib/mahjong.ts` へ集約し、UI から呼び出す。
- 共有の定数/型も lib 側で管理。UI 層では表示変換のみ行う。

## テスト / CI
- ユニットテストは `vitest` を使う。ロジック層を優先的にテスト。
- CI では lint / typecheck / test / build を流す（GitHub Actions）。
- 手動確認: モバイル幅での表示崩れと遷移を優先的にチェック。

## 禁止事項
- `node_modules` 等の生成物をコミットしない。
- 破壊的な Git 操作は実行しない（reset --hard 等）。
- ネットワーク依存の機能追加は避け、オフライン完結を守る。
