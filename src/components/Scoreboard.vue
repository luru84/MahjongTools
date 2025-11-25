<script setup lang="ts">
import { reactive, ref } from "vue";

type Player = { name: string; score: number };

const players = reactive<Player[]>([
  { name: "東", score: 25000 },
  { name: "南", score: 25000 },
  { name: "西", score: 25000 },
  { name: "北", score: 25000 },
]);

const delta = ref(1000);

const bump = (index: number, amount: number) => {
  players[index].score += amount;
};

const reset = () => {
  players.forEach((p) => {
    p.score = 25000;
  });
};
</script>

<template>
  <section class="panel">
    <header class="toolbar" style="justify-content: space-between">
      <div>
        <h2>点棒管理ミニアプリ</h2>
        <p class="muted">4人の点棒を手動で増減。スマホでも押しやすい。</p>
      </div>
      <div class="toolbar">
        <input v-model.number="delta" type="number" min="100" step="100" style="width: 100px" />
        <button class="ghost" @click="reset">リセット</button>
      </div>
    </header>
    <div class="grid two">
      <div v-for="(p, idx) in players" :key="p.name" class="list-item">
        <div class="toolbar" style="justify-content: space-between">
          <input v-model="p.name" />
          <strong>{{ p.score.toLocaleString() }} 点</strong>
        </div>
        <div class="toolbar">
          <button class="pill" @click="bump(idx, delta)">+{{ delta.toLocaleString() }}</button>
          <button class="pill" @click="bump(idx, -delta)">-{{ delta.toLocaleString() }}</button>
          <button class="pill" @click="bump(idx, 1000)">+1,000</button>
          <button class="pill" @click="bump(idx, -1000)">-1,000</button>
        </div>
      </div>
    </div>
  </section>
</template>
