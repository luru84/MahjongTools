<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { toolRoutes } from "../router/tools";

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const closeMenu = () => {
  menuOpen.value = false;
};
</script>

<template>
  <header class="site-header">
    <div class="brand">
      <RouterLink to="/">Mahjong Toolkit</RouterLink>
    </div>
    <button class="menu-btn" @click="toggleMenu" aria-label="ツール一覧を開く">
      ☰
    </button>
    <nav class="menu" :class="{ open: menuOpen }">
      <RouterLink v-for="route in toolRoutes" :key="route.path" :to="route.path" @click="closeMenu">
        {{ route.meta?.title || route.name }}
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #ffffffdd;
  backdrop-filter: blur(6px);
  border-bottom: 1px solid #e2e8f0;
}
.brand a {
  font-weight: 800;
  text-decoration: none;
  color: #0b1030;
}
.menu-btn {
  background: #0f172a;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 8px 12px;
  cursor: pointer;
}
.menu {
  display: none;
  position: absolute;
  top: 56px;
  right: 16px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 12px 30px -20px rgba(15, 23, 42, 0.45);
  flex-direction: column;
  gap: 8px;
}
.menu a {
  text-decoration: none;
  color: #0b1030;
}
.menu.open {
  display: flex;
}
@media (min-width: 640px) {
  .menu {
    position: static;
    display: flex;
    flex-direction: row;
    gap: 12px;
    border: none;
    box-shadow: none;
    padding: 0;
    background: transparent;
  }
  .menu-btn {
    display: none;
  }
}
</style>
