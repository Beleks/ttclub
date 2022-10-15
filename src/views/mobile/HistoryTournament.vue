<template>
  <div class="py-14 p-3">
    <div v-if="!loaded">Загрузка турнира...</div>
    <div v-else>
      <div class="flex mb-4">
        <div
          :class="[
            'py-1 px-3 shadow-lg shadow-gray-100/50 rounded mr-3',
            { [activeTabClass]: activeTab === tab },
            { 'bg-white': activeTab !== tab },
          ]"
          v-for="tab in tabs"
          :key="tab"
          @click="changeTab(tab)"
        >
          {{ $t(`${tab}`) }}
        </div>
      </div>
      <component :is="tabComponent" :tournament="tournament"></component>
    </div>
  </div>
</template>

<script>
import TournamentGrid from "../../components/mobile/history/TournamentGrid.vue";
import TournamentResult from "../../components/mobile/history/TournamentResult.vue";

export default {
  components: {
    TournamentGrid,
    TournamentResult,
  },
  data() {
    return {
      loaded: false,
      tabs: ["results", "grid"],
      activeTab: "results",
      activeTabClass: "bg-indigo-100 text-indigo-500",
    };
  },
  computed: {
    idTournament() {
      return this.$route.params.idTournament;
    },
    tournament() {
      return this.$store.getters.getTournamentById(this.idTournament);
    },
    tabComponent() {
      let tab = "";
      switch (this.activeTab) {
        case "results":
          tab = "TournamentResult";
          break;

        case "grid":
          tab = "TournamentGrid";
          break;

        default:
          break;
      }
      return tab;
    },
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab;
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
</style>