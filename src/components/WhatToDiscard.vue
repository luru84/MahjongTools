<script setup lang="ts">
import { computed, ref } from "vue";
import { bestDiscardByUkeire, parseHand, tileLabel, winningTilesForTenpai } from "../lib/mahjong";

type Problem = {
  title: string;
  hand: string;
  scenario: string;
  options: string[];
  answer: number; // index
  reason: string;
};

const problems: Problem[] = [
  {
    title: "門前・ピンフ目指し",
    hand: "123m456p678s77p45s",
    scenario: "東1局・親番。巡目は中盤、ドラは5sが1枚。門前リーチ優先。",
    options: ["1m", "7p", "5s", "9s"],
    answer: 1,
    reason: "7p切りで両面×2を残し、ドラ受けと赤5sを活かす。1m/9sは片方がカンチャン残り。",
  },
  {
    title: "ドラ重視か好形か",
    hand: "233m456p678s55m白白",
    scenario: "南2局・子。ドラは白。安全牌は少なめ。",
    options: ["2m", "3m", "5m", "白"],
    answer: 2,
    reason: "5m切りでターツオーバーを解消しつつ三色とドラポンの両天秤。白切りは打点ダウン。",
  },
  {
    title: "副露前提の速度勝負",
    hand: "234m66p678p789s北北",
    scenario: "オーラス子、ラス目。安い出アガリでも可。北は役牌。",
    options: ["北", "6p", "2m", "3m"],
    answer: 0,
    reason: "役牌北を鳴けるようキープ。6p切りで4p/7p受けを伸ばしつつ仕掛けやすさを確保。",
  },
];

const selectedIndex = ref(0);
const chosen = ref<number | null>(null);

const current = computed(() => problems[selectedIndex.value]);

const quickSuggestion = computed(() => {
  const handCounts = parseHand(current.value.hand);
  const best = bestDiscardByUkeire(handCounts);
  if (!best) return null;
  return {
    discard: tileLabel(best.discardIndex),
    waits: best.waits.map((w) => tileLabel(w.tile)).join(" / "),
    ukeire: best.ukeire,
  };
});

const waitsPreview = computed(() => {
  const waits = winningTilesForTenpai(parseHand(current.value.hand));
  if (!waits.length) return null;
  return waits.map((w) => tileLabel(w.tile)).join(" / ");
});
</script>

<template>
  <section class="panel">
    <header class="toolbar" style="justify-content: space-between">
      <div>
        <h2>何切る練習（サンプル問題）</h2>
        <p class="muted">軽い想定問答と簡易形解析</p>
      </div>
      <span class="tag">ドラッグ不要・テキストで学ぶ</span>
    </header>
    <div class="toolbar">
      <select v-model.number="selectedIndex">
        <option v-for="(p, idx) in problems" :key="p.title" :value="idx">{{ p.title }}</option>
      </select>
      <p class="muted">{{ current.scenario }}</p>
    </div>
    <div class="callout">
      手牌: {{ current.hand }} | 簡易待ち: {{ waitsPreview || "聴牌前/計算外" }}
    </div>
    <div class="cards">
      <button
        v-for="(opt, idx) in current.options"
        :key="opt"
        class="card"
        :class="{ selected: chosen === idx }"
        @click="chosen = idx"
      >
        {{ opt }} 切り
      </button>
    </div>
    <div v-if="chosen !== null" class="list-item">
      <div>
        <strong>あなたの選択: {{ current.options[chosen] }}</strong>
        <span class="tag" :style="{ marginLeft: '6px' }">
          {{ chosen === current.answer ? "正解寄り" : "別ルート" }}
        </span>
      </div>
      <p class="muted">推奨: {{ current.options[current.answer] }} / 理由: {{ current.reason }}</p>
      <div v-if="quickSuggestion" class="muted">
        受け入れ最大候補（機械判定）:
        {{ quickSuggestion.discard }} 切り | 受け入れ {{ quickSuggestion.ukeire }} /
        待ち {{ quickSuggestion.waits }}
      </div>
    </div>
  </section>
</template>
