<script setup lang="ts">
import { computed, ref } from "vue";

type Yaku = {
  name: string;
  han: string;
  timing: string;
  condition: string;
  tags: string[];
};

const yakuList: Yaku[] = [
  { name: "立直", han: "1", timing: "門前", condition: "面前で1,000点供託して宣言", tags: ["攻撃", "終盤"] },
  { name: "ダブル立直", han: "2", timing: "門前", condition: "第一ツモ前にリーチ宣言", tags: ["レア"] },
  { name: "平和", han: "1", timing: "門前", condition: "順子のみ・両面待ち・役牌なし・雀頭は役牌以外", tags: ["リーチ好相性"] },
  { name: "タンヤオ", han: "1", timing: "両方", condition: "2-8のみで構成（字牌なし）", tags: ["速度"] },
  { name: "一盃口", han: "1", timing: "門前", condition: "同じ順子2組", tags: ["面前"] },
  { name: "三色同順", han: "1/2", timing: "両方", condition: "萬筒索で同じ順子を3つ揃える", tags: ["手役"] },
  { name: "一気通貫", han: "1/2", timing: "両方", condition: "123・456・789の3連続順子", tags: ["手役"] },
  { name: "対々和", han: "2", timing: "両方", condition: "刻子/槓子4組＋雀頭", tags: ["鳴き強"] },
  { name: "三暗刻", han: "2", timing: "両方", condition: "暗刻3つ", tags: ["防御"] },
  { name: "混一色", han: "2/3", timing: "両方", condition: "一色＋字牌", tags: ["鳴き強", "高打点"] },
  { name: "清一色", han: "5/6", timing: "両方", condition: "一色のみ", tags: ["高打点"] },
  { name: "役牌", han: "1", timing: "両方", condition: "三元牌・場風・自風の刻子/槓子", tags: ["安定"] },
  { name: "混老頭", han: "2", timing: "両方", condition: "老頭牌＋字牌のみ", tags: ["鳴き強"] },
  { name: "純全帯么九", han: "2/3", timing: "両方", condition: "全ての面子と雀頭に1・9を含む（字牌なし）", tags: ["高打点"] },
  { name: "七対子", han: "2", timing: "門前", condition: "7つの対子で構成", tags: ["単騎待ち"] },
  { name: "国士無双", han: "役満", timing: "門前", condition: "么九牌13種＋雀頭", tags: ["役満"] },
  { name: "大三元", han: "役満", timing: "両方", condition: "白發中の刻子", tags: ["役満"] },
  { name: "小三元", han: "2", timing: "両方", condition: "三元2組の刻子＋残り1組の雀頭", tags: ["高打点"] },
  { name: "四暗刻", han: "役満", timing: "門前", condition: "暗刻4つ＋ツモ", tags: ["役満"] },
  { name: "緑一色", han: "役満", timing: "両方", condition: "索子の23468と發のみ", tags: ["役満"] },
];

const query = ref("");
const tagFilter = ref<string | null>(null);

const filtered = computed(() =>
  yakuList.filter((y) => {
    const hitQuery =
      !query.value ||
      y.name.includes(query.value) ||
      y.condition.includes(query.value) ||
      y.tags.some((t) => t.includes(query.value));
    const hitTag = !tagFilter.value || y.tags.includes(tagFilter.value);
    return hitQuery && hitTag;
  }),
);

const tags = Array.from(new Set(yakuList.flatMap((y) => y.tags)));
</script>

<template>
  <section class="panel">
    <header class="toolbar" style="justify-content: space-between">
      <div>
        <h2>役一覧 + 検索</h2>
        <p class="muted">条件と翻数をぱっと確認。タグフィルタで絞り込み。</p>
      </div>
      <span class="tag">役カタログ</span>
    </header>
    <div class="toolbar">
      <input v-model="query" placeholder="役名・条件・タグで検索（例: 速度、高打点）" />
      <div class="pill-nav">
        <button class="pill" :class="{ active: !tagFilter }" @click="tagFilter = null">すべて</button>
        <button
          v-for="tag in tags"
          :key="tag"
          class="pill"
          :class="{ active: tagFilter === tag }"
          @click="tagFilter = tag"
        >
          {{ tag }}
        </button>
      </div>
    </div>
    <div class="list">
      <div v-for="y in filtered" :key="y.name" class="list-item">
        <div class="toolbar" style="justify-content: space-between">
          <strong>{{ y.name }}</strong>
          <span class="badge">{{ y.han }}</span>
        </div>
        <div class="muted">{{ y.condition }}</div>
        <div class="muted">門前/副露: {{ y.timing }}</div>
        <div class="toolbar">
          <span v-for="t in y.tags" :key="t" class="tag">{{ t }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
