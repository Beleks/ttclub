<template>
  <div class="w-full dark:text-[#ddd]">
    <template v-if="players">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center">
          <div class="rotate-45 cursor-pointer" @click="cancelEdit()">
            <CreateSvg class="dark:fill-[#ddd]" />
          </div>
          <div class="ml-2">Редактирование...</div>
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
            class="
              px-4
              py-2
              w-full
              rounded
              border
              dark:bg-[#383a3f]
              placeholder:text-[#8d8d8d]
              dark:border-[#1e1f22]
              focus:ring-indigo-500 focus:border-indigo-500
              dark:focus:ring-indigo-500 dark:focus:border-indigo-500
            "
            type="text"
            v-model="player.surname"
            placeholder="Фамилия*"
          />
        </div>
        <div class="grow pr-4">
          <input
            class="
              px-4
              py-2
              w-full
              rounded
              border
              dark:bg-[#383a3f]
              placeholder:text-[#8d8d8d]
              dark:border-[#1e1f22]
              focus:ring-indigo-500 focus:border-indigo-500
              dark:focus:ring-indigo-500 dark:focus:border-indigo-500
            "
            type="text"
            v-model="player.name"
            placeholder="Имя*"
          />
        </div>
        <div class="grow">
          <input
            class="
              px-4
              py-2
              w-full
              rounded
              border
              dark:bg-[#383a3f]
              placeholder:text-[#8d8d8d]
              dark:border-[#1e1f22]
              focus:ring-indigo-500 focus:border-indigo-500
              dark:focus:ring-indigo-500 dark:focus:border-indigo-500
            "
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