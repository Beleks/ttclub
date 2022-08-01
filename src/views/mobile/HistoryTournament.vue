<template>
  <div class="pt-12">
    <div v-if="!loaded">Загрузка турнира...</div>
    <div v-else>
      <div class="flex justify-between items-center m-3">
        <div
          :class="{ ['opacity-0']: !chooseStage }"
          class="left rounded bg-slate-200 px-2 py-0.5"
          @click="stageChange(-1)"
        >
          <ArrowRight1Svg />
        </div>
        <div>{{ stageTitle }}</div>
        <div
          :class="{
            ['opacity-0']: chooseStage == tournament.stages.length - 1,
          }"
          class="rounded bg-slate-200 px-2 py-0.5"
          @click="stageChange(1)"
        >
          <ArrowRight1Svg />
        </div>
      </div>
      <div class="px-3">
        <div v-for="(duel, index) in currentStage" :key="index" class="mb-3">
          <TournamentDuelCard :duel="duel" />
        </div>
      </div>
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
  data() {
    return {
      loaded: false,
    };
  },
  computed: {
    idTournament() {
      return this.$route.params.idTournament;
    },
    tournament() {
      return this.$store.getters.getTournamentById(this.idTournament);
    },
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
  watch: {
    "$store.state.currentClub.history.tournaments": {
      handler() {
        if (this.$store.state.currentClub.history.tournaments.length) {
          this.$store
            .dispatch("getTournamentInfo", this.idTournament)
            .then(() => {
              this.loaded = true;
            });
        }
      },
      immediate: true,
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