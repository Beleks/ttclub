<template>
  <div class="">
    <HeaderDuel />
    <div class="height-calc p-3 flex flex-col justify-between">
      <div>
        <div>
          <div class="text-left px-3 text-xs mb-1">Игрок 1</div>
          <div
            :class="[
              { 'border-indigo-500': selectedInput === 'player1' },
              'rounded border bg-slate-100 py-2 px-3 flex justify-between mb-3',
            ]"
            @click="selectedInput = 'player1'"
          >
            <span v-if="!player1.surname" class="opacity-0">Player</span>
            <template v-else>
              <span>{{ player1.surname }} {{ player1.name }}</span>
              <span>{{ Math.floor(player1.rating) }}</span>
            </template>
          </div>
        </div>
        <div>
          <div class="text-left px-3 text-xs mb-1">Игрок 2</div>
          <div
            :class="[
              { 'border-indigo-500': selectedInput === 'player2' },
              'rounded border bg-slate-100 py-2 px-3 flex justify-between mb-3',
            ]"
            @click="selectedInput = 'player2'"
          >
            <span v-if="!player2.surname" class="opacity-0">Player</span>
            <template v-else>
              <span>{{ player2.surname }} {{ player2.name }}</span>
              <span>{{ Math.floor(player2.rating) }}</span>
            </template>
          </div>
        </div>
      </div>
      <PlayerList
        @choosePlayer="setPlayer"
        :selectedPlayers="selectedPlayers"
      />
      <div
        :class="[
          accessToCreate ? ' bg-indigo-500' : 'bg-slate-300',
          'mt-4 py-2 px-3 rounded text-white',
        ]"
        @click="createDuel()"
      >
        Создать
      </div>
    </div>
  </div>
</template>

<script>
import HeaderDuel from "../../components/mobile/create/HedaerDuel.vue";
import PlayerList from "../../components/mobile/create/PlayerList.vue";

export default {
  components: {
    HeaderDuel,
    PlayerList,
  },
  data() {
    return {
      player1: {},
      player2: {},
      selectedInput: "player1",
    };
  },
  computed: {
    selectedPlayers() {
      return [this.player1, this.player2];
    },
    accessToCreate() {
      return this.player1.id && this.player2.id;
    },
  },
  methods: {
    setPlayer(player) {
      this[this.selectedInput] = player;
    },
    createDuel() {
      if (this.accessToCreate) {
        // set players to record into state
        this.$store.commit("recordDuel", {
          player1: this.player1,
          player2: this.player2,
        });
        this.$router.replace({ name: "CreateDuelResult" });
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
