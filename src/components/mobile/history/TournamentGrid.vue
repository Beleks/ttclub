<template>
  <div class="flex justify-between items-center my-6">
    <div
      :class="{ ['opacity-0']: !chooseStage }"
      class="left rounded bg-slate-100 px-3 py-1"
      @click="stageChange(-1)"
    >
      <ArrowRight1Svg />
    </div>
    <div>{{ stageTitle }}</div>
    <div
      :class="{
        ['opacity-0']: chooseStage == tournament.stages.length - 1,
      }"
      class="rounded bg-slate-100 px-3 py-1"
      @click="stageChange(1)"
    >
      <ArrowRight1Svg />
    </div>
  </div>
  <div>
    <div v-for="(duel, index) in currentStage" :key="index" class="mb-3">
      <TournamentDuelCard :duel="duel" />
    </div>
  </div>
</template>

<script>
import ArrowRight1Svg from "../../svg/ArrowRight1Svg.vue";
import TournamentDuelCard from "./TournamentDuelCard.vue";

export default {
  props: {
    tournament: Object,
  },
  components: {
    TournamentDuelCard,
    ArrowRight1Svg,
  },
  computed: {
    stageTitle() {
      let stages = this.tournament.stages.length;
      this.chooseStage;
      let title = "";
      switch (stages - this.chooseStage) {
        case 1:
          title = "Финал";
          break;
        case 2:
          title = "Полуфинал";
          break;
        default:
          title = `1/${Math.pow(2, stages - this.chooseStage - 1)}`;
          break;
      }
      return title;
    },
    chooseStage() {
      return Number(this.$route.query.stage);
    },
    currentStage() {
      return this.tournament.stages[this.chooseStage];
    },
  },
  methods: {
    stageChange(step) {
      if (
        this.chooseStage + step >= this.tournament.stages.length ||
        this.chooseStage + step < 0
      ) {
        return;
      } else {
        let currentPath = this.$route.path;
        this.$router.replace({
          path: currentPath,
          query: { stage: Number(this.$route.query.stage) + step },
        });
      }
    },
  },
};
</script>

<style scoped>
.left {
  transform: rotate(180deg);
}
</style>