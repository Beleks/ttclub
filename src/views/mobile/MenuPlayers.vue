<template>
  <div class="p-3 pt-14">
    <template v-if="playerCreation">
      <div class="h-cal flex flex-col justify-between">
        <div>
          <!-- new player -->
          <div>
            <div class="text-xs text-left mx-2 mb-1">Имя *</div>
            <input
              class="
                py-1
                px-2
                border
                rounded
                focus:border-indigo-500 focus:outline-none
                w-full
                mb-3
              "
              type="text"
              v-model="name"
            />
            <div class="text-xs text-left mx-2 mb-1">Фамилия *</div>
            <input
              class="
                py-1
                px-2
                border
                rounded
                focus:border-indigo-500 focus:outline-none
                w-full
                mb-3
              "
              type="text"
              v-model="surname"
            />
            <div class="text-xs text-left mx-2 mb-1">Отчество</div>
            <input
              class="
                py-1
                px-2
                border
                rounded
                focus:border-indigo-500 focus:outline-none
                w-full
              "
              type="text"
              v-model="patronymic"
            />
          </div>
        </div>
        <div
          :class="[
            accessToCreate ? ' bg-indigo-500' : 'bg-slate-300',
            'mt-4 py-2 px-3 rounded text-white',
          ]"
          @click="createPlayer()"
        >
          Сохранить
        </div>
      </div>
    </template>
    <template v-else>
      <div
        class="py-2 px-3 rounded bg-indigo-500 text-white mb-3"
        @click="playerCreation = true"
      >
        Добавить игрока
      </div>
      <div
        class="bg-white px-3 py-1 mb-2 flex rounded"
        v-for="player in players"
        :key="player.id"
      >
        <div>
          {{ player.surname }} {{ player.name }} {{ player.patronymic }}
        </div>
        <div></div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playerCreation: false,
      name: "",
      surname: "",
      patronymic: "",
    };
  },
  computed: {
    players() {
      return this.$store.state.currentClub.players;
    },
    accessToCreate() {
      // add trim
      return this.name && this.surname;
    },
  },
  methods: {
    createPlayer() {
      this.$store
        .dispatch("createPlayer", {
          surname: this.surname,
          name: this.name,
          patronymic: this.patronymic,
        })
        .then(() => {
          // getPlayers
          this.playerCreation = false;
        });
    },
  },
};
</script>

<style scoped>
.h-cal {
  height: calc(100vh - 3.5rem - 0.75rem);
}
</style>