<template>
  <div class="">
    <div
      v-if="duel.id1"
      class="flex"
      :class="{ 'text-indigo-500': duel.score1 > duel.score2 }"
    >
      <div class="py-1 px-3">{{ duel.score1 }}</div>
      <div
        class="rounded-t flex justify-between grow px-2 py-1"
        :class="[duel.score1 > duel.score2 ? 'bg-indigo-100' : 'bg-white']"
      >
        <span> {{ players.p1.name }} {{ players.p1.surname }} </span>
        <span v-if="duel.rating_first">
          {{ Math.floor(duel.rating_first) }}
        </span>
        <span v-else>
          {{ Math.floor(players.p1.rating) }}
        </span>
      </div>
    </div>
    <div v-else class="flex">
      <div class="py-1 px-3 opacity-80">{{ duel.score1 }}</div>
      <div
        class="
          rounded-t
          opacity-80
          bg-white
          flex
          justify-between
          grow
          px-2
          py-1
        "
      >
        Игрок не выявлен
      </div>
    </div>
    <div
      v-if="duel.id2"
      class="flex"
      :class="{ 'text-indigo-500': duel.score2 > duel.score1 }"
    >
      <div class="py-1 px-3">{{ duel.score2 }}</div>
      <div
        class="
          rounded-b
          flex
          justify-between
          grow
          px-2
          py-1
          shadow-lg shadow-slate-100/50
        "
        :class="[duel.score2 > duel.score1 ? 'bg-indigo-100' : 'bg-white']"
      >
        <span> {{ players.p2.name }} {{ players.p2.surname }} </span>
        <span v-if="duel.rating_second">
          {{ Math.floor(duel.rating_second) }}
        </span>
        <span v-else>
          {{ Math.floor(players.p2.rating) }}
        </span>
      </div>
    </div>
    <div v-else class="flex">
      <div class="py-1 px-3 opacity-80">{{ duel.score2 }}</div>
      <div
        class="
          rounded-b
          opacity-80
          bg-white
          flex
          justify-between
          grow
          px-2
          py-1
        "
      >
        Игрок не выявлен
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    duel: Object,
  },
  computed: {
    players() {
      let p1 = this.$store.getters.getPlayerById(this.duel.id1);
      let p2 = this.$store.getters.getPlayerById(this.duel.id2);
      return {
        p1,
        p2,
      };
    },
  },
};
</script>

<style>
</style>