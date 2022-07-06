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
  computed: {
    isClubHomePage() {
      const routeName = this.$route.name;
      return routeName === "Rating" || routeName === "History";
    },
  },
  mounted() {
    const idClub = this.getCurrentIdClub();
    this.$store.dispatch("getPlayers", idClub);
  },
};
</script>

<style>
</style>