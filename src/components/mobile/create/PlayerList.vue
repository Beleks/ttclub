<template>
  <div class="overflow-y-auto basis-4 grow shrink">
    <div
      v-for="player in playerList"
      :key="player"
      :class="[
        player.isSelect ? selectedPlayer : 'bg-white',
        'py-2 px-3 rounded mt-2 flex justify-between ',
      ]"
      @click="choosePlayer(player)"
    >
      <div>{{ player.surname }} {{ player.name }}</div>
      <div>{{ player.rating }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedPlayers: Array,
  },
  data() {
    return {
      selectedPlayer: "bg-indigo-500 text-white",
    };
  },
  computed: {
    playerList() {
      let clubPlayerList = this.$store.state.currentClub.players;
      clubPlayerList.forEach((player) => {
        player.isSelect = false;
        this.selectedPlayers.forEach((selectedPlayer) => {
          if (player.id === selectedPlayer.id) {
            player.isSelect = true;
          }
        });
      });
      return clubPlayerList;
    },
    isSelect() {
      return true;
    },
    
  },
  methods: {
    choosePlayer(player) {
      if (player.isSelect) {
        return;
      }
      this.$emit("choosePlayer", player);
    },
  },
};
</script>

<style>
</style>