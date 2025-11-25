<script setup lang="ts">
import { computed, ref, watch } from "vue";

type Action = { player: string; type: string; tile?: string; note?: string };
type Paifu = { title: string; actions: Action[] };

const sample: Paifu = {
  title: "東1局 0本場 / ドラ: 發 / サンプル牌譜",
  actions: [
    { player: "東", type: "配牌", note: "123m456p678s東東南南" },
    { player: "南", type: "配牌", note: "345m456p789s白白白北" },
    { player: "西", type: "配牌", note: "224m678p456s發發中中" },
    { player: "北", type: "配牌", note: "123m345p789s北北北南" },
    { player: "東", type: "ツモ", tile: "5m" },
    { player: "東", type: "打", tile: "南" },
    { player: "南", type: "ツモ", tile: "9p" },
    { player: "南", type: "打", tile: "北" },
    { player: "西", type: "ツモ", tile: "1s" },
    { player: "西", type: "打", tile: "中" },
    { player: "北", type: "ツモ", tile: "1p" },
    { player: "北", type: "打", tile: "1p" },
    { player: "東", type: "ロン", tile: "1p", note: "タンヤオドラ1 3,900" },
  ],
};

const logInput = ref(JSON.stringify(sample, null, 2));
const currentStep = ref(0);

const paifu = computed<Paifu | null>(() => {
  try {
    const obj = JSON.parse(logInput.value);
    if (obj && Array.isArray(obj.actions)) {
      return obj as Paifu;
    }
  } catch (e) {
    return null;
  }
  return null;
});

watch(paifu, () => {
  currentStep.value = 0;
});

const current = computed(() => paifu.value?.actions[currentStep.value]);
</script>

<template>
  <section class="panel">
    <header class="toolbar" style="justify-content: space-between">
      <div>
        <h2>牌譜ビューア（簡易）</h2>
        <p class="muted">JSON形式のシンプル牌譜を1行ずつ再生。Tenhou牌譜は一旦自前で整形してください。</p>
      </div>
      <span class="tag">リプレイ雛形</span>
    </header>
    <div class="grid two">
      <div class="list">
        <p class="muted">サンプルJSONをベースに編集・貼り付けできます。</p>
        <textarea v-model="logInput" rows="14" />
        <p class="muted">
          形式: <code>{ title: string, actions: [{ player, type, tile?, note? }] }</code>
        </p>
      </div>
      <div class="list">
        <div class="callout" v-if="paifu">
          <strong>{{ paifu.title }}</strong>
          <div class="muted">ステップ {{ currentStep + 1 }} / {{ paifu.actions.length }}</div>
        </div>
        <div v-if="current" class="list-item">
          <strong>{{ current.player }}</strong> - {{ current.type }}
          <div class="muted" v-if="current.tile">牌: {{ current.tile }}</div>
          <div class="muted" v-if="current.note">{{ current.note }}</div>
        </div>
        <div class="toolbar">
          <button class="pill" @click="currentStep = Math.max(0, currentStep - 1)">◀ 前へ</button>
          <button
            class="pill"
            @click="currentStep = Math.min((paifu?.actions.length || 1) - 1, currentStep + 1)"
          >
            次へ ▶
          </button>
        </div>
        <div class="list-item" v-if="paifu">
          <strong>全アクション</strong>
          <ol>
            <li v-for="(a, idx) in paifu.actions" :key="idx">
              {{ idx + 1 }}. {{ a.player }} - {{ a.type }} {{ a.tile || "" }} {{ a.note || "" }}
            </li>
          </ol>
        </div>
        <p v-else class="muted">JSONが読み取れません。フォーマットを確認してください。</p>
      </div>
    </div>
  </section>
</template>
