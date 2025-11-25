<script setup lang="ts">
import { computed, ref } from "vue";
import {
  bestDiscardByUkeire,
  countsToString,
  parseHand,
  tileLabel,
  tileLabels,
  totalTiles,
  winningTilesForTenpai,
} from "../lib/mahjong";

const handInput = ref("123m456p789s東東南南");

const counts = computed(() => {
  const parsed = parseHand(handInput.value);
  return parsed;
});

const tileTotal = computed(() => totalTiles(counts.value));
const waits = computed(() => winningTilesForTenpai(counts.value.slice()));
const bestDiscard = computed(() => bestDiscardByUkeire(counts.value.slice()));

const addTile = (index: number) => {
  const next = counts.value.slice();
  if (next[index] >= 4) return;
  next[index] += 1;
  handInput.value = countsToString(next);
};
</script>

<template>
  <section class="panel">
    <header class="toolbar" style="justify-content: space-between">
      <div>
        <h2>待ち牌 / 受け入れ枚数チェッカー</h2>
        <p class="muted">手牌13枚を入力 → 聴牌時の待ちと残り枚数を表示</p>
      </div>
      <span class="tag">速度と枚数をざっくり把握</span>
    </header>
    <div class="grid two">
      <div class="list">
        <label>
          手牌入力（例: 123m456p789s東東南南）
          <input
            v-model="handInput"
            placeholder="数字とm/p/s/z、または東南西北白發中/E S W N P F C"
          />
        </label>
        <div class="callout">
          <div>牌数: {{ tileTotal }} 枚</div>
          <div class="hand-preview">
            <span v-for="(c, idx) in counts" :key="idx">
              <span v-for="n in c" :key="`${idx}-${n}`" class="hand-tile">
                {{ tileLabel(idx) }}
              </span>
            </span>
          </div>
        </div>
        <div>
          <p class="muted">クリックで追加:</p>
          <div class="tile-grid">
            <button
              v-for="(label, idx) in tileLabels"
              :key="idx"
              class="tile-btn"
              @click="addTile(idx)"
            >
              {{ label }}
            </button>
          </div>
        </div>
      </div>
      <div class="list">
        <template v-if="tileTotal === 13 && waits.length">
          <div class="list-item" v-for="w in waits" :key="w.tile">
            <strong>{{ tileLabel(w.tile) }}</strong>
            <div class="muted">残り {{ w.remaining }} 枚</div>
          </div>
          <p class="muted">合計受け入れ: {{ waits.reduce((a, b) => a + b.remaining, 0) }} 枚</p>
        </template>
        <p v-else-if="tileTotal !== 13" class="muted">13枚に揃えると待ちを計算します。</p>
        <p v-else class="muted">聴牌ではありません（待ち牌なし）。</p>
        <div v-if="tileTotal === 14 && bestDiscard" class="callout">
          <strong>何切る簡易: </strong>
          <span>{{ tileLabel(bestDiscard.discardIndex) }} 切り</span>
          <div class="muted">
            受け入れ {{ bestDiscard.ukeire }} 枚 |
            待ち: {{ bestDiscard.waits.map((w) => tileLabel(w.tile)).join(" / ") }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
