<template>
  <div class="p-3 pt-14">
    <div class="text-xs text-slate-600">Клуб</div>
    <div class="">
      <div class="flex justify-between bg-white py-2 px-3 rounded mt-3">
        <div>Игроки</div>
        <div>12/50</div>
      </div>
      <div
        class="
          flex
          justify-between
          text-slate-100
          bg-indigo-500
          py-2
          px-3
          rounded
          mt-3
        "
      >
        <div>Найти больше клубов</div>
      </div>
    </div>
    <div class="text-xs text-slate-600 py-3">Основные настройки</div>
    <div class="flex justify-between">
      <div
        class="
          bg-white
          rounded
          mr-1
          py-2
          px-3
          flex
          justify-center
          width50
          border
        "
        @click="changeLocale('ru')"
        :class="{ [activeLocaleClass]: locale == 'ru' }"
      >
        <img src="../../assets/ru.png" alt="" class="mr-2" />
        Русский
      </div>
      <div
        class="
          bg-white
          rounded
          ml-1
          py-2
          px-3
          flex
          justify-center
          width50
          border
        "
        @click="changeLocale('en')"
        :class="{ [activeLocaleClass]: locale == 'en' }"
      >
        <img src="../../assets/uk.png" alt="" class="mr-2" />
        English
      </div>
    </div>
    <div class="mt-3 bg-red-500 text-slate-100 py-2 px-3 rounded">
      Выход из аккаунта
    </div>

    <!-- <img src="../../assets/russia.png" alt="" /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeLocaleClass: " border-indigo-500 text-indigo-500",
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
  },
};
</script>

<style>
.width50 {
  width: calc((100% - 1rem) / 2);
}
</style>