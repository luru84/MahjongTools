import type { RouteRecordRaw } from "vue-router";

export const toolRoutes: RouteRecordRaw[] = [
  { path: "/tools/score", name: "score", component: () => import("../pages/ScorePage.vue"), meta: { title: "点数計算" } },
  { path: "/tools/ukeire", name: "ukeire", component: () => import("../pages/UkeirePage.vue"), meta: { title: "受け入れ" } },
  { path: "/tools/yaku", name: "yaku", component: () => import("../pages/YakuPage.vue"), meta: { title: "役一覧" } },
  { path: "/tools/endgame", name: "endgame", component: () => import("../pages/EndgamePage.vue"), meta: { title: "点差逆転" } },
  { path: "/tools/practice", name: "practice", component: () => import("../pages/PracticePage.vue"), meta: { title: "何切る練習" } },
  { path: "/tools/shape", name: "shape", component: () => import("../pages/ShapePage.vue"), meta: { title: "牌理可視化" } },
  { path: "/tools/ref", name: "ref", component: () => import("../pages/RefPage.vue"), meta: { title: "点数早見表" } },
  { path: "/tools/ev", name: "ev", component: () => import("../pages/EvPage.vue"), meta: { title: "リーチ判断" } },
  { path: "/tools/tracker", name: "tracker", component: () => import("../pages/TrackerPage.vue"), meta: { title: "点棒管理" } },
  { path: "/tools/replay", name: "replay", component: () => import("../pages/ReplayPage.vue"), meta: { title: "牌譜ビューア" } },
];

export const allRoutes: RouteRecordRaw[] = [
  { path: "/", name: "home", component: () => import("../pages/HomePage.vue"), meta: { title: "Mahjong Toolkit" } },
  ...toolRoutes,
];
