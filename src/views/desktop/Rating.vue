<template>
  <div class="w-full">
    <div class="px-2 flex justify-between items-center mb-3 dark:text-[#ddd]">
      <div class="flex">
        <div class="w-8 text-center">№</div>
        <div class="ml-2 w-60 text-left">Игрок</div>
      </div>
      <div>Рейтинг</div>
    </div>
    <div v-if="players.length">
      <PlayerCard
        v-for="(player, index) in players"
        :key="player.id"
        :player="player"
        :position="index + 1"
      />
    </div>
    <div v-else>
      <div
        v-for="n in 4"
        :key="n"
        class="
          animate-pulse
          dark:bg-[#79798025]
          rounded
          bg-slate-200
          py-2
          px-2
          mb-3
          h-10
        "
      ></div>
    </div>
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