<script setup lang="ts">
import { computed, ref } from "vue";
import { calcPoints } from "../lib/mahjong";

const han = ref(2);
const fuList = [20, 25, 30, 40, 50, 60, 70, 80, 90, 100, 110];

const rows = computed(() => fuList.map((fu) => ({ fu, ...calcPoints(han.value, fu) })));
</script>

<template>
  <section class="panel">
    <header class="toolbar" style="justify-content: space-between">
      <div>
        <h2>点数早見表（インタラクティブ）</h2>
        <p class="muted">翻数を決めると各符の支払い早見表が出ます</p>
      </div>
      <span class="tag">親/子両対応</span>
    </header>
    <div class="toolbar">
      <label style="min-width: 120px">
        翻
        <input v-model.number="han" type="range" min="1" max="8" />
        <div>{{ han }} 翻</div>
      </label>
      <p class="muted">5翻以上は自動で満貫以上に繰り上げています。</p>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>符</th>
          <th>親ロン</th>
          <th>子ロン</th>
          <th>親ツモ</th>
          <th>子ツモ（親/子）</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.fu">
          <td>{{ row.fu }}</td>
          <td>{{ row.dealerRon.toLocaleString() }}</td>
          <td>{{ row.childRon.toLocaleString() }}</td>
          <td>{{ row.dealerTsumoEach.toLocaleString() }} オール</td>
          <td>{{ row.childTsumoDealer.toLocaleString() }} / {{ row.childTsumoNonDealer.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
