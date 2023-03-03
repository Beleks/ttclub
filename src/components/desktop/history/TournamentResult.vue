<template>
  <div class="mt-4">
    <div
      class="
        bg-white
        py-2
        px-2
        mb-3
        rounded
        flex
        justify-between
        items-center
        dark:bg-[#383a3f]
        border
        dark:border-[#1e1f22]
      "
      v-for="player in tournament.results"
      :key="player.id"
    >
      <div class="flex">
        <div class="w-12 text-center text-indigo-500 dark:text-[#a6a7b3]">
          {{ player.place }}
        </div>
        <div class="ml-2 w-60 text-left">
          {{ currentPlayer(player.id).surname }}
          {{ currentPlayer(player.id).name }}
        </div>
      </div>
      <div>
        <div>{{ Math.floor(player.rating) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tournament: Object,
  },
  methods: {
    currentPlayer(idPlayer) {
      return this.$store.getters.getPlayerById(idPlayer);
    },
  },
};
</script>

<style>
</style>