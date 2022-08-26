<template>
  <div class="w-full">
    <template v-if="players">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center">
          <div class="rotate-45 cursor-pointer" @click="cancelEdit()">
            <CreateSvg class="fill-slate-900" />
          </div>
          <div class="ml-2 text-slate-500">Редактирование...</div>
        </div>
        <div
          class="bg-indigo-500 py-1 px-6 w-36 rounded cursor-pointer text-white"
          @click="saveChange()"
        >
          Сохранить
        </div>
      </div>
      <div class="flex mb-4">
        <div class="grow pr-4">
          <input
            class="px-4 py-2 w-full"
            type="text"
            v-model="player.surname"
            placeholder="Фамилия*"
          />
        </div>
        <div class="grow pr-4">
          <input
            class="px-4 py-2 w-full"
            type="text"
            v-model="player.name"
            placeholder="Имя*"
          />
        </div>
        <div class="grow">
          <input
            class="px-4 py-2 w-full"
            type="text"
            v-model="player.patronymic"
            placeholder="Отчество"
          />
        </div>
      </div>
    </template>
    <template v-else>Загрузка...</template>
  </div>
</template>

<script>
import CreateSvg from "../../components/svg/CreateSvg.vue";

export default {
  components: {
    CreateSvg,
  },
  data() {
    return {
      idPlayer: null,
      player: {
        name: "",
        surname: "",
        patronymic: "",
      },
    };
  },
  computed: {
    players() {
      // ?????? Костыль ??????

      this.idPlayer = this.$route.params.idPlayer;
      if (this.$store.state.currentClub.players.length) {
        let player = this.$store.getters.getPlayerById(Number(this.idPlayer));
        this.player = {
          name: player.name,
          surname: player.surname,
          patronymic: player.patronymic,
        };
        return this.$store.state.currentClub.players.length;
      } else {
        return false;
      }
    },
  },
  methods: {
    cancelEdit() {
      this.$router.back();
    },
    saveChange() {
      this.$store
        .dispatch("editPlayer", {
          idPlayer: this.idPlayer,
          player: this.player,
        })
        .then(() => {
          this.$router.back();
        });
    },
    getPlayer() {
      let idPlayer = this.$route.params.idPlayer;
      this.player = this.$store.getters.getPlayerById(idPlayer);
    },
  },
};
</script>

<style>
</style>