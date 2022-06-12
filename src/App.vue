<template>
  <div class="bg-slate-50">
    <!-- <div
      class="
        text-3xl
        font-bold
        bg-indigo-600
        text-slate-100
        px-2
        py-1
        rounded-lg
      "
    >
      {{ $t("hello") }}
    </div>
    <div class="flex mt-3">
      <div class="mr-4" @click="changeLocales('ru')">Ru</div>
      <div @click="changeLocales('en')">En</div>
    </div>
    <div>{{ text }}</div> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    text() {
      return this.$store.state.textFromState;
    },
  },
  methods: {
    changeLocales(locale) {
      this.$i18n.locale = locale;
    },
  },
};
</script>

<style>
#app {
  /* margin-top: 60px; */
}
</style>
