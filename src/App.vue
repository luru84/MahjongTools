<script setup lang="ts">
import { ref } from "vue";
import EndgameHelper from "./components/EndgameHelper.vue";
import PointQuickRef from "./components/PointQuickRef.vue";
import RiichiDecision from "./components/RiichiDecision.vue";
import PaifuViewer from "./components/PaifuViewer.vue";
import ScoreCalculator from "./components/ScoreCalculator.vue";
import Scoreboard from "./components/Scoreboard.vue";
import TileVisualizer from "./components/TileVisualizer.vue";
import WaitUkeire from "./components/WaitUkeire.vue";
import WhatToDiscard from "./components/WhatToDiscard.vue";
import YakuList from "./components/YakuList.vue";

const navs = [
  { id: "score", label: "点数計算" },
  { id: "ukeire", label: "受け入れ" },
  { id: "yaku", label: "役一覧" },
  { id: "endgame", label: "オーラス" },
  { id: "practice", label: "何切る" },
  { id: "replay", label: "牌譜ビューア" },
  { id: "shape", label: "牌理" },
  { id: "ref", label: "早見表" },
  { id: "ev", label: "リーチ判断" },
  { id: "tracker", label: "点棒管理" },
];

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};
</script>

<template>
  <main>
    <header class="panel" style="position: sticky; top: 0; z-index: 10">
      <h1>Mahjong Toolkit</h1>
      <p class="muted">
        Vue + TypeScript で動くブラウザ麻雀ツール集。Github Pages でそのまま公開できます。
      </p>
      <div class="pill-nav">
        <button v-for="n in navs" :key="n.id" class="pill" @click="scrollTo(n.id)">
          {{ n.label }}
        </button>
      </div>
    </header>

    <div id="score">
      <ScoreCalculator />
    </div>
    <div id="ukeire">
      <WaitUkeire />
    </div>
    <div id="yaku">
      <YakuList />
    </div>
    <div id="endgame">
      <EndgameHelper />
    </div>
    <div id="practice">
      <WhatToDiscard />
    </div>
    <div id="replay">
      <PaifuViewer />
    </div>
    <div id="shape">
      <TileVisualizer />
    </div>
    <div id="ref">
      <PointQuickRef />
    </div>
    <div id="ev">
      <RiichiDecision />
    </div>
    <div id="tracker">
      <Scoreboard />
    </div>
  </main>
</template>
