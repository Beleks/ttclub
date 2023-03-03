<template>
  <div class="w-full dark:fill-[#ddd] dark:text-[#ddd]">
    <div v-if="!loaded">Загрузка турнира ...</div>
    <div v-else>
      <div class="flex items-center text-lg font-medium">
        <div class="left cursor-pointer mr-4" @click="exit()">
          <ArrowRight1Svg />
        </div>
        <div>Турнир от {{ tournament.created_at }}</div>
      </div>
      <div>
        <div class="flex stroke-slate-900 dark:stroke-[#ddd] mt-4 items-center">
          <UserSvg />
          <div class="ml-2">{{ tournament.number_participants }}</div>
        </div>
        <div class="flex mt-6 font-medium">
          <div
            :class="[
              'py-1 px-3 w-36 cursor-pointer rounded mr-3 transition',
              { [activeTabClass]: activeTab === tab },
              {
                'dark:hover:bg-[#383a3f] dark:text-[#8d8d8d] text-[#8d8d8d] hover:bg-[#e5e7eb]':
                  activeTab !== tab,
              },
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
  </div>
</template>

<script>
import ArrowRight1Svg from "../../components/svg/ArrowRight1Svg.vue";
import UserSvg from "../../components/svg/UserSvg.vue";

import TournamentResult from "../../components/desktop/history/TournamentResult.vue";
import TournamentGrid from "../../components/desktop/history/TournamentGrid.vue";

export default {
  components: {
    ArrowRight1Svg,
    UserSvg,
    TournamentResult,
    TournamentGrid,
  },
  data() {
    return {
      loaded: false,
      tabs: ["results", "grid"],
      activeTab: "results",
      activeTabClass: "dark:bg-[#383a3f] dark:text-[#ddd] bg-[#e5e7eb] text-slate-700",
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
    exit() {
      this.$router.back();
    },
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
.left {
  transform: rotate(180deg);
}
</style>