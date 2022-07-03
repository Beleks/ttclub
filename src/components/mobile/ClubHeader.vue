<template>
  <div class="flex justify-between p-3 fixed w-full bg-slate-50">
    <div>Club</div>
    <div v-if="isMenuOpen" @click="closeMenu()">Назад</div>
    <div v-else @click="openMenu()">Меню</div>
  </div>
</template>

<script>
export default {
  computed: {
    isMenuOpen() {
      return this.$route.name === "Menu";
    },
  },
  methods: {
    openMenu() {
      this.$router.replace({ name: "Menu" });
    },
    closeMenu() {
      this.$router.replace({ name: "Rating" });
    },
  },
};
</script>

<style>
</style>