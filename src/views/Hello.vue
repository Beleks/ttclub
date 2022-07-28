<template>
  <div class="py-7">
    <div class="mb-7 flex flex-1 flex-col items-center">
      <div class="font-medium text-2xl">
        Club <span class="text-indigo-500">TT</span>
      </div>
      <div
        class="my-3 py-0.5 px-4 bg-indigo-100 rounded text-sm text-indigo-500"
      >
        v {{ app_version }}
      </div>
      <div class="mt-2">
        <span
          @click="changeLocale('en')"
          :class="{ [activeLocaleClass]: locale == 'en' }"
          >En</span
        >
        |
        <span
          @click="changeLocale('ru')"
          :class="{ [activeLocaleClass]: locale == 'ru' }"
        >
          Ru
        </span>
      </div>
    </div>
    <div v-if="clubs.length">
      <div class="mb-2">{{ $t("chooseClub") }}</div>
      <div
        v-for="club in clubs"
        :key="club.id"
        class="
          flex
          justify-between
          mx-8
          bg-indigo-100
          rounded
          px-4
          py-2
          mb-3
          shadow-lg shadow-indigo-100/50
        "
        @click="chooseClub(club.id)"
      >
        <div class="text-indigo-500">{{ club.name }}</div>
        <ArrowRight1Svg class="fill-indigo-500" />
      </div>
    </div>
    <template v-else> Загрузка клубов... </template>
  </div>
</template>

<script>
import ArrowRight1Svg from "../components/svg/ArrowRight1Svg.vue";

export default {
  components: { ArrowRight1Svg },
  data() {
    return {
      app_version: __APP_VERSION__,
      activeLocaleClass: "font-medium text-indigo-500",
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
    },
    clubs() {
      return this.$store.state.clubs;
    },
  },
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale;
    },
    chooseClub(idClub) {
      // SET REPLACE
      this.$router.push({ name: "Club", params: { id: idClub } });
    },
  },
  mounted() {
    this.$store.dispatch("getClubs");
  },
};
</script>

<style scoped>
</style>
