<template>
  <div class="flex justify-between p-3 fixed w-full bg-slate-50">
    <div>Club</div>
    <div v-if="isMenuOpen" @click="closeMenu()">Назад</div>
    <div v-if="mainPage" @click="openMenu()">Меню</div>
    <div v-if="pagePlayers" @click="backToMenu()">Назад</div>
  </div>
</template>

<script>
export default {
  computed: {
    isMenuOpen() {
      return this.$route.name === "Menu";
    },
    mainPage() {
      return this.$route.name == "History" || this.$route.name == "Rating";
    },
    pagePlayers() {
      return this.$route.name === "MenuPlayers";
    },
  },
  methods: {
    openMenu() {
      this.$router.replace({ name: "Menu" });
    },
    closeMenu() {
      this.$router.replace({ name: "Rating" });
    },
    backToMenu() {
      this.$router.replace({ name: "Menu" });
    },
  },
};
</script>

<style>
</style>