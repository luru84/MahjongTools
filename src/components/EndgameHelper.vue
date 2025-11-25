<script setup lang="ts">
import { computed, ref } from "vue";
import { requiredCombosForGap } from "../lib/mahjong";

const myPoint = ref(24000);
const targetPoint = ref(32000);
const dealer = ref(false);
const tsumo = ref(true);

const gap = computed(() => Math.max(0, targetPoint.value - myPoint.value + 1));
const combos = computed(() => requiredCombosForGap(gap.value, { dealer: dealer.value, tsumo: tsumo.value }));
</script>

<template>
  <section class="panel">
    <header class="toolbar" style="justify-content: space-between">
      <div>
        <h2>点差逆転シミュレーター</h2>
        <p class="muted">逆転に必要な打点（翻・符の例）をざっくり提案</p>
      </div>
      <span class="tag">オーラス検討</span>
    </header>
    <div class="grid two">
      <div class="list">
        <label>
          自分の持ち点
          <input v-model.number="myPoint" min="0" step="100" type="number" />
        </label>
        <label>
          追いかけたい相手の持ち点（またはトップ）
          <input v-model.number="targetPoint" min="0" step="100" type="number" />
        </label>
        <div class="toolbar">
          <button class="pill" :class="{ active: dealer }" @click="dealer = true">親番</button>
          <button class="pill" :class="{ active: !dealer }" @click="dealer = false">子</button>
          <button class="pill" :class="{ active: tsumo }" @click="tsumo = true">ツモ想定</button>
          <button class="pill" :class="{ active: !tsumo }" @click="tsumo = false">ロン想定</button>
        </div>
        <p class="muted">相手が下がる点数は考慮せず「自分が何点アガれば届くか」を表示します。</p>
      </div>
      <div class="list">
        <div class="callout">必要加点（暫定）: {{ gap.toLocaleString() }} 点以上</div>
        <div v-if="combos.length" class="list">
          <div v-for="c in combos" :key="`${c.han}-${c.fu}`" class="list-item">
            <strong>{{ c.han }} 翻 {{ c.fu }} 符</strong>
            <div class="muted">{{ c.label }}</div>
            <div class="muted">概算: {{ c.points.toLocaleString() }} 点</div>
          </div>
        </div>
        <p v-else class="muted">条件に合う組み合わせが見つかりませんでした。</p>
      </div>
    </div>
  </section>
</template>
