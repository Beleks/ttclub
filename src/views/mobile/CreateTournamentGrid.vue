<template>
  <div>
    <HeaderTournament />
    <div class="flex justify-between items-center m-3">
      <div
        :class="{ ['opacity-0']: !chooseStage }"
        class="left rounded bg-slate-100 px-3 py-1"
        @click="stageChange(-1)"
      >
        <ArrowRight1Svg />
      </div>
      <div>{{ stageTitle }}</div>
      <div
        :class="{ ['opacity-0']: chooseStage == stages.length - 1 }"
        class="rounded bg-slate-100 px-3 py-1"
        @click="stageChange(1)"
      >
        <ArrowRight1Svg />
      </div>
    </div>
    <div class="px-3">
      <div
        v-for="(duel, index) in currentStage"
        :key="index"
        @click="chooseDuel(duel, index)"
        class="mb-3"
      >
        <TournamentDuelCard :duel="duel" />
      </div>
    </div>
    <div
      v-if="showSaveBtn"
      :class="[
        accessToSaveTournament ? ' bg-indigo-500' : 'bg-slate-300',
        'm-3 py-2 px-3 rounded text-white button-calc fixed bottom-0',
      ]"
      @click="saveTournament()"
    >
      Сохранить
    </div>
  </div>
</template>

<script>
import HeaderTournament from "../../components/mobile/create/HeaderTournament.vue";
import TournamentDuelCard from "../../components/mobile/history/TournamentDuelCard.vue";
import ArrowRight1Svg from "../../components/svg/ArrowRight1Svg.vue";

export default {
  components: {
    HeaderTournament,
    ArrowRight1Svg,
    TournamentDuelCard,
  },
  computed: {
    chooseStage() {
      return Number(this.$route.query.stage);
    },

    stageTitle() {
      let stages = this.stages.length;
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
    stages() {
      return this.$store.state.record.tournament.stages;
    },
    currentStage() {
      return this.stages[this.chooseStage];
    },
    showSaveBtn() {
      return this.chooseStage == this.stages.length - 1;
    },
    accessToSaveTournament() {
      return this.$store.state.record.tournament.readyToSave;
    },
  },
  methods: {
    stageChange(step) {
      if (
        this.chooseStage + step >= this.stages.length ||
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
    chooseDuel(duel, index) {
      if (duel.score1 || duel.score2) {
        // Score is already set
        return;
      }
      if (!(duel.id1 && duel.id2)) {
        // Players are not ready
        return;
      } else {
        this.$store.commit("setTournamentCurrentDuel", {
          id1: duel.id1,
          id2: duel.id2,
        });
        this.$router.push({
          path: "duel",
          append: false,
          query: Object.assign(this.$route.query, { index }),
        });
      }
    },
    saveTournament() {
      this.$store.dispatch("createTournament").then(() => {
        this.$router.replace({
          name: "Club",
        });
      });
    },
  },
};
</script>

<style scoped>
.left {
  transform: rotate(180deg);
}
.button-calc {
  width: calc(100% - 1.5rem);
}
</style>