<script setup lang="ts">
import { RouterView } from "vue-router";
import SiteHeader from "./SiteHeader.vue";
import SiteFooter from "./SiteFooter.vue";
</script>

<template>
  <div class="app-shell">
    <SiteHeader />
    <main class="main-container">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>
