<script setup lang="ts">
import { computed, ref } from "vue";
import { calcPoints } from "../lib/mahjong";

const han = ref(3);
const fu = ref(40);
const dealer = ref(false);
const winRate = ref(25); // %
const dealInRate = ref(10); // %
const dealInLoss = ref(8000); // points lost when dealt in

const base = computed(() => calcPoints(han.value, fu.value));

const model = computed(() => {
  const ronPoint = dealer.value ? base.value.dealerRon : base.value.childRon;
  const tsumoGain = dealer.value ? base.value.dealerTsumoEach * 3 : base.value.childTsumoDealer + base.value.childTsumoNonDealer * 2;
  const winP = winRate.value / 100;
  const dealP = dealInRate.value / 100;

  const damaEv = winP * tsumoGain - dealP * dealInLoss.value;
  const riichiEv = winP * (tsumoGain + 1000) - dealP * dealInLoss.value - (1 - winP) * 1000;

  return { ronPoint, tsumoGain, damaEv, riichiEv, diff: riichiEv - damaEv };
});
</script>

<template>
  <section class="panel">
    <header class="toolbar" style="justify-content: space-between">
      <div>
        <h2>リーチ vs ダマ 簡易EV</h2>
        <p class="muted">固定テーブルでざっくり期待値を比較（シミュレーションなし）</p>
      </div>
      <span class="tag">リーチ判断の目安</span>
    </header>
    <div class="grid two">
      <div class="list">
        <label>
          翻
          <input v-model.number="han" type="number" min="1" max="13" />
        </label>
        <label>
          符
          <input v-model.number="fu" type="number" step="10" min="20" max="110" />
        </label>
        <div class="toolbar">
          <button class="pill" :class="{ active: dealer }" @click="dealer = true">親</button>
          <button class="pill" :class="{ active: !dealer }" @click="dealer = false">子</button>
        </div>
        <label>
          和了率 (目安 %)
          <input v-model.number="winRate" type="range" min="5" max="60" />
          <div>{{ winRate }} %</div>
        </label>
        <label>
          放銃率 (目安 %)
          <input v-model.number="dealInRate" type="range" min="1" max="25" />
          <div>{{ dealInRate }} %</div>
        </label>
        <label>
          放銃時失点（平均）
          <input v-model.number="dealInLoss" type="number" step="500" min="2000" max="16000" />
        </label>
      </div>
      <div class="list">
        <div class="list-item">
          <strong>ダマEV</strong>
          <div class="muted">期待値: {{ Math.round(model.damaEv).toLocaleString() }} 点</div>
        </div>
        <div class="list-item">
          <strong>リーチEV</strong>
          <div class="muted">
            期待値: {{ Math.round(model.riichiEv).toLocaleString() }} 点
            <span class="tag" :style="{ marginLeft: '6px' }">
              {{ model.diff >= 0 ? "+リーチ寄り" : "ダマ寄り" }}
            </span>
          </div>
          <p class="muted">内訳: ツモ収入 {{ model.tsumoGain.toLocaleString() }} + 供託戻し1,000</p>
        </div>
        <div class="callout">
          差分: {{ Math.round(model.diff).toLocaleString() }} 点<br />
          ※ 単純モデルです。場況・押し引き・残り巡目は別途考慮してください。
        </div>
      </div>
    </div>
  </section>
</template>
