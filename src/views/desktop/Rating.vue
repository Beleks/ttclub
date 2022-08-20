<template>
  <div class="w-full">
    <div class="px-2 flex justify-between items-center mb-3">
      <div class="flex">
        <div class="w-8 text-center">№</div>
        <div class="ml-2 w-60 text-left">Игрок</div>
      </div>
      <div>Рейтинг</div>
    </div>
    <PlayerCard
      v-for="(player, index) in players"
      :key="player.id"
      :player="player"
      :position="index + 1"
    />
  </div>
</template>

<script>
import PlayerCard from "../../components/desktop/PlayerCard.vue";

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