<template>
  <div class="mb-3">
    <div>
      <div :class="[{ 'text-indigo-500': isWinner }, 'flex items-center']">
        <div class="px-2">
          {{ item.score_first }}
        </div>
        <div
          :class="[
            isWinner ? winnerClass : 'bg-white',
            'rounded-t flex w-full justify-between py-1 px-3',
          ]"
        >
          <div>{{ players.p1.surname }} {{ players.p1.name }}</div>
          <div>{{ item.rating_first }}</div>
        </div>
      </div>
      <div :class="[{ 'text-indigo-500': !isWinner }, 'flex items-center']">
        <div class="px-2">
          {{ item.score_second }}
        </div>
        <div
          :class="[
            isWinner ? 'bg-white' : winnerClass,
            'rounded-b flex w-full justify-between py-1 px-3',
          ]"
        >
          <div>{{ players.p2.surname }} {{ players.p2.name }}</div>
          <div>{{ item.rating_second }}</div>
        </div>
      </div>
    </div>
    <div class="flex mt-1 pl-9 pr-3 text-xs justify-between text-slate-400">
      <div>На рейтинг</div>
      <div>{{ item.created_at }}</div>
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

<style>
</style>