<template>
  <div>
    <div class="flex justify-between p-3 w-full">
      <div>{{ $t("duel") }}</div>
      <div @click="cancelCreate()">Отмена</div>
    </div>
    <div class="height-calc p-3 flex flex-col justify-between">
      <div>
        <div>
          <div class="text-left px-3 text-xs mb-1">Игрок 1</div>
          <div
            class="
              rounded
              border
              bg-slate-100
              py-2
              px-3
              flex
              justify-between
              mb-3
            "
          >
            <span>{{ duel.player1.surname }} {{ duel.player1.name }}</span>
            <span>{{ Math.floor(duel.player1.rating) }}</span>
          </div>
          <div class="text-left px-3 text-xs mb-1">Игрок 2</div>
          <div
            class="
              rounded
              border
              bg-slate-100
              py-2
              px-3
              flex
              justify-between
              mb-3
            "
          >
            <span>{{ duel.player2.surname }} {{ duel.player2.name }}</span>
            <span>{{ Math.floor(duel.player2.rating) }}</span>
          </div>
        </div>

        <div>
          <ScoreDuel
            :player1="duel.player1"
            :player2="duel.player2"
            @changeScore="changeScore"
          />
        </div>
      </div>
      <div
        :class="[
          accessToCreate ? ' bg-indigo-500' : 'bg-slate-300',
          'mt-4 py-2 px-3 rounded text-white',
        ]"
        @click="saveDuel()"
      >
        Сохранить
      </div>
    </div>
  </div>
</template>

<script>
import ScoreDuel from "../../components/mobile/create/ScoreDuel.vue";

export default {
  components: {
    ScoreDuel,
  },
  computed: {
    duel() {
      return this.$store.state.record.duel;
    },
    accessToCreate() {
      let score1 = this.$store.state.record.duel.score1;
      let score2 = this.$store.state.record.duel.score2;

      if (score1 == score2) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    cancelCreate() {
      this.$router.replace({ name: "Club" });
    },
    changeScore(result) {
      this.$store.commit("recordScoreDuel", {
        score1: result.score1,
        score2: result.score2,
      });
    },
    saveDuel() {
      if (!this.accessToCreate) {
        return;
      }
      let duel = {
        id_first: this.duel.player1.id,
        id_second: this.duel.player2.id,
        score_first: this.duel.score1,
        score_second: this.duel.score2,
        index_duel: null,
      };
      this.$store.dispatch("createDuel", duel).then(() => {
        this.$router.replace({ name: "Rating" });
      });
    },
  },
};
</script>

<style scoped>
.height-calc {
  height: calc(100vh - 48px);
}
</style>