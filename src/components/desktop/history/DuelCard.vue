<template>
  <div>
    <div class="text-left mb-1 pl-4 text-xs text-slate-400">
      {{ item.created_at }}
    </div>
    <div class="flex items-center">
      <div class="player-w flex items-center">
        <div
          class="
            flex
            justify-between
            bg-white
            rounded
            w-full
            px-4
            py-2
            text-left
          "
          :class="[{ 'border-b-2 border-b-indigo-500': isWinner }]"
        >
          <span>{{ players.p1.surname }} {{ players.p1.name }}</span>
          <span>{{ Math.floor(item.rating_first) }}</span>
        </div>
        <div :class="[{ 'text-indigo-500 font-medium': isWinner }, 'mx-2']">
          {{ item.score_first }}
        </div>
      </div>
      <div class="w-14">vs</div>
      <div class="player-w flex items-center">
        <div :class="[{ 'text-indigo-500 font-medium': !isWinner }, 'mx-2']">
          {{ item.score_second }}
        </div>
        <div
          class="
            flex
            justify-between
            bg-white
            rounded
            w-full
            px-4
            py-2
            text-left
          "
          :class="[{ 'border-b-2 border-b-indigo-500': !isWinner }]"
        >
          <span>{{ players.p2.surname }} {{ players.p2.name }}</span>
          <span>{{ Math.floor(item.rating_second) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  data() {
    return {
      winnerClass: "bg-indigo-100 text-indigo-500",
    };
  },
  computed: {
    players() {
      return {
        p1: this.$store.getters.getPlayerById(this.item.id_first),
        p2: this.$store.getters.getPlayerById(this.item.id_second),
      };
    },
    isWinner() {
      return this.item.score_first > this.item.score_second;
    },
  },
};
</script>

<style scoped>
.player-w {
  width: calc(100% - 3.5rem);
}
</style>