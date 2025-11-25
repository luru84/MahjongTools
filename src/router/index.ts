import { createRouter, createWebHistory } from "vue-router";
import { allRoutes } from "./tools";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: allRoutes,
  scrollBehavior: () => ({ top: 0 }),
});

const baseTitle = "Mahjong Toolkit";

router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = `${to.meta.title} | ${baseTitle}`;
  } else {
    document.title = baseTitle;
  }
});

export default router;
