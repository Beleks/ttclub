<template>
  <ClubHeader />
  <div>
    <router-view></router-view>
  </div>
  <template v-if="isClubHomePage">
    <ClubFooter />
  </template>
</template>

<script>
// @ - not working
import ClubHeader from "../../components/mobile/ClubHeader.vue";
import ClubFooter from "../../components/mobile/ClubFooter.vue";

import { getCurrentIdClub } from "../../mixins/index";

export default {
  components: { ClubHeader, ClubFooter },
  mixins: [getCurrentIdClub],
  data() {
    return {
      verification: true,
    };
  },
  computed: {
    isClubHomePage() {
      const routeName = this.$route.name;
      return routeName === "Rating" || routeName === "History";
    },
  },
  mounted() {
    const idClub = this.getCurrentIdClub();

    this.$store.dispatch("verifyAuth", idClub).then(() => {
      this.verification = false;
    });
    this.$store.dispatch("getPlayers", idClub);
    this.$store.dispatch("getDuels", idClub);
    this.$store.dispatch("getTournaments", idClub);
  },
  beforeRouteLeave(to, from) {
    this.$store.commit("clearClubInfo");
  },
};
</script>

<style>
</style>