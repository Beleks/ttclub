<template>
  <div>
    <HeaderTournament />
    <template v-if="playersNotSelected">
      <div class="height-calc p-3 flex flex-col justify-between">
        <PlayerList
          :selectedPlayers="selectedPlayers"
          @choosePlayer="setPlayer"
          @notChoosePlayer="removePlayer"
        />
        <div class="text-xs">Кол-во игроков должно быть кратно 8</div>
        <div
          :class="[
            accessToCreate ? ' bg-indigo-500' : 'bg-slate-300',
            'mt-4 py-2 px-3 rounded text-white',
          ]"
          @click="createTournament()"
        >
          Создать
        </div>
      </div>
    </template>
    <template v-else>
      <router-view></router-view>
    </template>
  </div>
</template>

<script>
import HeaderTournament from "../../components/mobile/create/HeaderTournament.vue";
import PlayerList from "../../components/mobile/create/PlayerList.vue";

export default {
  components: {
    HeaderTournament,
    PlayerList,
  },
  data() {
    return {
      selectedPlayers: [],
    };
  },
  computed: {
    playersNotSelected() {
      return !this.$store.state.record.tournament.players.length;
    },
    accessToCreate() {
      if (this.selectedPlayers.length > 0) {
        return !(this.selectedPlayers.length % 8);
      }
      return false;
    },
  },
  methods: {
    setPlayer(player) {
      this.selectedPlayers.push(player);
    },
    removePlayer(player) {
      let index = this.selectedPlayers.findIndex(
        (selectedPlayer) => selectedPlayer.id === player.id
      );

      this.selectedPlayers.splice(index, 1);
    },
    createTournament() {
      if (this.accessToCreate) {
        this.$router.replace({
          name: "CreateTournamentGrid",
          query: { stage: 0 },
        });
        // action to create in store
        this.$store.dispatch("recordTournament", this.selectedPlayers);
      }
    },
  },
};
</script>

<style scoped>
.height-calc {
  height: calc(100vh - 48px);
}
</style>