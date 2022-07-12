<template>
  <div>
    <template v-if="!anyDataPlayers"> Загрузка... </template>
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script>
import { getCurrentIdClub } from "../../mixins/index";

export default {
  mixins: [getCurrentIdClub],
  computed: {
    anyDataPlayers() {
      return this.$store.state.currentClub.players.length;
    },
  },
  mounted() {
    const idClub = this.getCurrentIdClub();

    this.$store.dispatch("verifyAuth", idClub);
    this.$store.dispatch("getPlayers", idClub);
  },
};
</script>

<style>
</style>