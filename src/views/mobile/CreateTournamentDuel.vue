<template>
  <div>
    <div class="flex justify-between p-3 w-full">
      <div>{{ $t("duel") }}</div>
      <div @click="goBack()">Отмена</div>
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
            <span>{{ players.p1.surname }} {{ players.p1.name }}</span>
            <span>{{ Math.floor(players.p1.rating) }}</span>
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
            <span>{{ players.p2.surname }} {{ players.p2.name }}</span>
            <span>{{ Math.floor(players.p2.rating) }}</span>
          </div>
        </div>

        <div>
          <ScoreDuel
            :player1="players.p1"
            :player2="players.p2"
            @changeScore="changeScore"
          />
        </div>
      </div>
      <div
        :class="[
          accessToSaveDuel ? ' bg-indigo-500' : 'bg-slate-300',
          'mt-4 py-2 px-3 rounded text-white',
        ]"
        @click="saveResult()"
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
  data() {
    return {
      result: {
        score1: null,
        score2: null,
      },
    };
  },
  computed: {
    duel() {
      let currentStage = this.$route.query.stage;
      let currentDuelIndex = this.$route.query.index;

      return this.$store.state.record.tournament.stages[currentStage][
        currentDuelIndex
      ];
    },
    players() {
      let p1 = this.$store.getters.getPlayerById(this.duel.id1);
      let p2 = this.$store.getters.getPlayerById(this.duel.id2);
      return {
        p1,
        p2,
      };
    },
    accessToSaveDuel() {
      if (this.result.score1 === this.result.score2) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    changeScore(result) {
      this.result = result;
    },
    saveResult() {
      if (this.accessToSaveDuel) {
        let winnerId = null;
        if (this.result.score1 > this.result.score2) {
          winnerId = this.players.p1.id;
        } else {
          winnerId = this.players.p2.id;
        }
        this.$store.dispatch("handlingTournamentDuelResult", {
          score: this.result,
          stage: this.$route.query.stage,
          indexDuel: this.$route.query.index,
          winnerId,
        });
        this.goBack();
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