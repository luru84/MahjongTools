# アーキテクチャ方針

## 技術スタック
- Vue 3 + TypeScript + Vite
- Vue Router（ルーティング単位でツールを分割し、遅延ロードを想定）
- PWA: Service Worker/manifest を維持（BASE URL は `vite.config.ts` の `base` に従う）

## ルーティング案
- `/` : Home（ツール一覧）
- `/tools/score`, `/tools/ukeire`, `/tools/yaku`, `/tools/endgame`, `/tools/practice`, `/tools/shape`, `/tools/ref`, `/tools/ev`, `/tools/tracker`, `/tools/replay`
- ルートごとにコンポーネントを遅延 import し、モバイルでの初期バンドルを削減。各ルート meta に `title`（後で `<title>` へ反映）を設定。

### ルート定義例
```ts
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: "/", name: "home", component: () => import("./pages/Home.vue"), meta: { title: "Mahjong Toolkit" } },
    { path: "/tools/score", name: "score", component: () => import("./pages/ScorePage.vue"), meta: { title: "点数計算" } },
    // ...以下各ツール
  ],
});

router.afterEach((to) => {
  const base = "Mahjong Toolkit";
  if (to.meta?.title) document.title = `${to.meta.title} | ${base}`;
  else document.title = base;
});
```

## 状態管理
- 現状はローカルステートのみで十分。必要になれば軽量なコンテキスト（provide/inject）で共通設定（テーマ/言語など）を共有。
- 永続化は不要（ページ内のみ保持）。点棒などを永続化する場合は localStorage を検討。

## ロジック
- `src/lib/mahjong.ts` に手牌解析/点数計算ロジックを集約。ユニットテスト追加予定。
- 役判定/牌譜パーサの拡張が必要になれば同ディレクトリにモジュールを分割。

## ビルド/配信
- GitHub Pages を想定し、`base: "/MahjongTools/"` を設定。リポジトリ名変更時はここを更新。
- `pages.yml` で `npm ci && npm run build` → `dist` をデプロイ。

## テスト戦略（将来）
- vitest で `src/lib/mahjong.ts` の関数に対するユニットテストを追加。
- ルーティングのスモークテスト（各ページがマウントできるか）を最低限用意。
- ESLint + vue-tsc を CI で実行済み。
