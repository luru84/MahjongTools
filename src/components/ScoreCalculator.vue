<script setup lang="ts">
import { computed, ref } from "vue";
import { calcPoints } from "../lib/mahjong";

const han = ref(3);
const fu = ref(40);

const result = computed(() => calcPoints(han.value, fu.value));
</script>

<template>
  <section class="panel">
    <header class="toolbar" style="justify-content: space-between">
      <div>
        <h2>点数計算 / 符計算</h2>
        <p class="muted">翻・符を入れると支払い例を即時計算</p>
      </div>
      <span v-if="result.limitName" class="tag"> {{ result.limitName }} </span>
    </header>
    <div class="grid two">
      <div class="list">
        <label>
          翻
          <input v-model.number="han" min="1" max="13" step="1" type="number" />
        </label>
        <label>
          符
          <input v-model.number="fu" min="20" max="110" step="10" type="number" />
        </label>
        <p class="muted">役満以上も翻入力で対応します（13翻＝役満換算）。</p>
      </div>
      <div class="list">
        <div class="card">
          <strong>親ロン</strong>
          <div>{{ result.dealerRon.toLocaleString() }} 点</div>
        </div>
        <div class="card">
          <strong>子ロン</strong>
          <div>{{ result.childRon.toLocaleString() }} 点</div>
        </div>
        <div class="card">
          <strong>親ツモ</strong>
          <div>全員 {{ result.dealerTsumoEach.toLocaleString() }} 点オール</div>
        </div>
        <div class="card">
          <strong>子ツモ</strong>
          <div>親 {{ result.childTsumoDealer.toLocaleString() }} / 子 {{ result.childTsumoNonDealer.toLocaleString() }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
