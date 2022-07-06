<template>
  <div class="p-3 pt-14 flex flex-col justify-between h-screen">
    <div>
      <div class="text-xs text-slate-600">Клуб</div>
      <div class="">
        <div class="flex justify-between bg-white py-2 px-3 rounded mt-3">
          <div class="flex">
            <UserSvg />
            <span class="ml-2">Игроки</span>
          </div>
          <div class="text-slate-600">12/50</div>
        </div>
        <router-link
          :to="{ name: 'Hello' }"
          class="flex text-slate-100 bg-indigo-500 py-2 px-3 rounded mt-3"
        >
          <SearchSvg />
          <div class="ml-2">Найти больше клубов</div>
        </router-link>
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
      <div
        v-if="isAuth"
        class="mt-3 bg-red-500 text-slate-100 py-2 px-3 rounded"
        @click="logout()"
      >
        Выход из аккаунта
      </div>
      <div
        v-else
        class="mt-3 bg-indigo-500 text-slate-100 py-2 px-3 rounded"
        @click="loginAsAdmin()"
      >
        Войти как админ
      </div>
    </div>
    <div class="flex justify-between text-slate-600">
      <div>v 0.1.14</div>
      <div><MoonSvg /></div>
    </div>
  </div>
</template>

<script>
import MoonSvg from "../../components/svg/MoonSvg.vue";
import SearchSvg from "../../components/svg/SearchSvg.vue";
import UserSvg from "../../components/svg/UserSvg.vue";

import { authMixin } from "../../mixins/auth";
import { getCurrentIdClub } from "../../mixins/index";

export default {
  components: {
    MoonSvg,
    UserSvg,
    SearchSvg,
  },
  mixins: [authMixin, getCurrentIdClub],
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
    loginAsAdmin() {
      // change on replace
      this.$router.push({ name: "Login" });
    },
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.replace({ name: "Login" });
      });
    },
  },
};
</script>

<style>
.width50 {
  width: calc((100% - 1rem) / 2);
}
</style>