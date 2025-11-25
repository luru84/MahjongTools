# Mahjong Toolkit (Vue + TypeScript)

ブラウザだけで使える麻雀ツール集。Vue 3 + Vite + TypeScript で構築し、GitHub Pages で公開しやすい構成です。スマホ専用 UI を前提（PC でもモバイル幅で表示）。

## 収録ツール
- 点数計算/符計算と翻・符別の早見表
- 待ち牌/受け入れ枚数チェッカー + 簡易何切る提案
- 役一覧・検索
- 点差逆転シミュレーター（オーラス条件の目安）
- 何切る練習（サンプル問題＋形解析）
- 牌理可視化（刻子/順子/対子/孤立牌）
- リーチ vs ダマ 簡易EV
- 点棒管理ミニアプリ

## セットアップ
```bash
npm install
npm run dev
```

## ビルド/配信
- 本番ビルド: `npm run build`
- ローカル確認: `npm run preview`
- GitHub Pages: `vite.config.ts` の `base` をリポジトリ名に合わせて変更（デフォルト: `/MahjongTools/`）。Pages の `docs/` 配信なら `dist/` をそのまま指定可能。

## 開発メモ
- ルーティングを導入し、トップページ + 各ツール個別ページに分割する予定（詳細は `docs/PLAN.md`）。
- 主なロジックは `src/lib/mahjong.ts` に集約（待ち判定、点数計算など）。
- UI は各ツールを小さなコンポーネントに分割しています。必要に応じてタブ/ページ分割してください。
