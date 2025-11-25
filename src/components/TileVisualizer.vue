<script setup lang="ts">
import { computed, ref } from "vue";
import { parseHand, shapeSummary } from "../lib/mahjong";

const input = ref("123m456p789s東東南南");
const summary = computed(() => shapeSummary(parseHand(input.value)));
</script>

<template>
  <section class="panel">
    <header class="toolbar" style="justify-content: space-between">
      <div>
        <h2>牌理可視化</h2>
        <p class="muted">刻子・順子・対子・孤立牌を色分けで俯瞰</p>
      </div>
      <span class="tag">形のスナップショット</span>
    </header>
    <label>
      手牌入力
      <input v-model="input" placeholder="例: 123m456p789s東東南南" />
    </label>
    <div class="grid three">
      <div class="list-item">
        <strong>刻子/槓子</strong>
        <p class="muted" v-if="!summary.triplets.length">なし</p>
        <div class="hand-preview">
          <span v-for="t in summary.triplets" :key="`k-${t}`" class="hand-tile">{{ t }}</span>
        </div>
      </div>
      <div class="list-item">
        <strong>順子</strong>
        <p class="muted" v-if="!summary.sequences.length">なし</p>
        <div class="hand-preview">
          <span v-for="t in summary.sequences" :key="`s-${t}`" class="hand-tile">{{ t }}</span>
        </div>
      </div>
      <div class="list-item">
        <strong>対子</strong>
        <p class="muted" v-if="!summary.pairs.length">なし</p>
        <div class="hand-preview">
          <span v-for="t in summary.pairs" :key="`p-${t}`" class="hand-tile">{{ t }}</span>
        </div>
      </div>
    </div>
    <div class="list-item">
      <strong>孤立牌</strong>
      <p class="muted" v-if="!summary.isolated.length">なし</p>
      <div class="hand-preview">
        <span v-for="t in summary.isolated" :key="`i-${t}`" class="hand-tile">{{ t }}</span>
      </div>
    </div>
  </section>
</template>
