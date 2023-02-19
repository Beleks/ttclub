<template>
  <div class="w-full dark:text-[#ddd]">
    <template v-if="playerCreation">
      <!-- created -->
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center">
          <div class="rotate-45 cursor-pointer" @click="cancelCreation()">
            <CreateSvg class="dark:fill-[#ddd]" />
          </div>
          <div class="ml-2">Добавление новых игроков...</div>
        </div>
        <div
          class="py-1 px-6 w-36 rounded"
          :class="[
            isFilled
              ? 'bg-indigo-500 text-white cursor-pointer'
              : 'bg-gray-400 text-gray-300',
          ]"
          @click="createPlayer()"
        >
          Создать
        </div>
      </div>
      <div
        class="flex mb-4"
        v-for="(player, index) in playerForCreated"
        :key="index"
      >
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
      <div>
        <!-- more player -->
      </div>
    </template>
    <template v-else>
      <div class="flex justify-between items-center pr-4 mb-4">
        <div
          class="bg-indigo-500 py-1 px-6 rounded cursor-pointer text-white"
          @click="toCreatePlayer()"
        >
          Добавить игрока
        </div>
        <div class="text-[#8d8d8d]">{{ players.length }}/50</div>
      </div>
      <div
        v-for="player in players"
        :key="player.id"
        class="
          rounded
          group
          bg-white
          py-2
          px-4
          mb-3
          flex
          justify-between
          dark:bg-[#383a3f]
          border
          dark:border-[#1e1f22]
        "
      >
        <div class="">
          {{ player.surname }} {{ player.name }} {{ player.patronymic }}
        </div>
        <div>
          <EditSvg
            class="
              stroke-slate-600
              dark:stroke-[#ddd]
              group-hover:opacity-100
              opacity-0
              cursor-pointer
              transition-opacity
              ease-in-out
            "
            @click="toEditPlayer(player.id)"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import EditSvg from "../../components/svg/EditSvg.vue";
import CreateSvg from "../../components/svg/CreateSvg.vue";

export default {
  components: {
    CreateSvg,
    EditSvg,
  },
  data() {
    return {
      playerCreation: false,
      playerForCreated: [{ name: "", surname: "", patronymic: "" }],
    };
  },
  computed: {
    players() {
      return this.$store.state.currentClub.players;
    },
    isFilled() {
      // If one of them does not have name or surname filled in, it will return false
      return !this.playerForCreated.some(
        (player) => !player.name || !player.surname
      );
    },
  },
  methods: {
    toCreatePlayer() {
      this.playerCreation = true;
    },
    toEditPlayer(idPlayer) {
      this.$router.push({
        name: "PlayerEdit_d",
        params: {
          idPlayer,
        },
      });
    },
    createPlayer() {
      if (this.isFilled) {
        this.$store
          .dispatch("createPlayer", {
            surname: this.playerForCreated[0].surname,
            name: this.playerForCreated[0].name,
            patronymic: this.playerForCreated[0].patronymic,
          })
          .then(() => {
            // getPlayers
            this.playerCreation = false;
          });
      }
    },
    cancelCreation() {
      this.playerCreation = false;
    },
  },
};
</script>

<style>
</style>