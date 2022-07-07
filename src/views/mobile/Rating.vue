<template>
  <div class="p-3 py-14">
    <PlayerCard
      v-for="(player, index) in players"
      :key="player.id"
      :player="player"
      :position="index + 1"
    />
  </div>
</template>

<script>
import PlayerCard from "../../components/mobile/PlayerCard.vue";

export default {
  components: {
    PlayerCard,
  },
  data() {
    return {};
  },
  computed: {
    players() {
      return this.$store.state.currentClub.players;
    },
  },
};
</script>

<style>
</style>