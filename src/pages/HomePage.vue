<script setup lang="ts">
import { RouterLink } from "vue-router";
import { toolRoutes } from "../router/tools";
</script>

<template>
  <section class="panel">
    <h1>Mahjong Toolkit</h1>
    <p class="muted">スマホ向け麻雀ツール集。各ツールはメニューまたは下のカードから選べます。</p>
  </section>

  <section class="panel">
    <h2>ツール一覧</h2>
    <div class="cards">
      <RouterLink
        v-for="route in toolRoutes"
        :key="route.path"
        :to="route.path"
        class="card"
        style="text-decoration: none; color: inherit"
      >
        <strong>{{ route.meta?.title }}</strong>
        <p class="muted">{{ route.path }}</p>
      </RouterLink>
    </div>
  </section>
</template>
