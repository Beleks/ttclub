<template>
  <div class="py-7">
    <div class="mb-7 flex flex-1 flex-col items-center">
      <div class="font-medium text-2xl">
        Club <span class="text-indigo-500">TT</span>
      </div>
      <div
        class="my-3 py-0.5 px-4 bg-indigo-100 rounded text-sm text-indigo-500"
      >
        v 0.1.14
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
    <div>
      <div class="mb-2">{{ $t("chooseClub") }}</div>
      <div
        class="
          flex
          justify-between
          mx-8
          bg-indigo-100
          rounded
          px-4
          py-2
          shadow-lg shadow-indigo-100/50
        "
        @click="chooseClub('1234')"
      >
        <div class="text-indigo-500">Elecard tt club</div>
        <div class="text-indigo-500">-></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeLocaleClass: "font-medium text-indigo-500",
    };
  },
  computed: {
    locale() {
      return this.$i18n.locale;
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
};
</script>

<style scoped>
</style>
