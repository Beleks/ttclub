<template>
  <div class="mt-2">
    <div class="mb-4 text-sm opacity-60">Укажите счет по партиям</div>
    <div class="flex justify-between items-center">
      <div class="overflow-hidden w-14 text-xs">{{ player1.name }}</div>
      <div class="text-4xl flex justify-between items-center">
        <div>
          <div class="arrow_up" @click="changeScore('score1', 1)">
            <ArrowDownSvg :color="'#000000'" />
          </div>
          <div class="mx-2 mb-1">{{ result.score1 }}</div>
          <div class="arrow_down" @click="changeScore('score1', -1)">
            <ArrowDownSvg :color="'#000000'" />
          </div>
        </div>
        <span class="mx-6 mb-2">:</span>
        <div>
          <div class="arrow_up" @click="changeScore('score2', 1)">
            <ArrowDownSvg :color="'#000000'" />
          </div>
          <div class="mx-2 mb-1">{{ result.score2 }}</div>
          <div class="arrow_down" @click="changeScore('score2', -1)">
            <ArrowDownSvg :color="'#000000'" />
          </div>
        </div>
      </div>
      <div class="overflow-hidden w-14 text-xs">{{ player2.name }}</div>
    </div>
  </div>
</template>

<script>
import ArrowDownSvg from "../../svg/ArrowDownSvg.vue";

export default {
  components: {
    ArrowDownSvg,
  },
  props: {
    player1: Object,
    player2: Object,
  },
  data() {
    return {
      result: {
        score1: 0,
        score2: 0,
      },
    };
  },
  methods: {
    changeScore(score, value) {
      if (this.result[score] + value < 0) {
        return;
      } else if (this.result[score] + value > 9) {
        return;
      }
      this.result[score] = this.result[score] + value;
      this.$emit("changescore", this.result);
      this.$store.commit("recordScoreDuel", {
        score1: this.result.score1,
        score2: this.result.score2,
      });
    },
  },
};
</script>

<style scoped>
.arrow_up {
  transform: rotate(180deg);
  padding: 0.2em;
}
.arrow_down {
  padding: 0.2em;
}
</style>