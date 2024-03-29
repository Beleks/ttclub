<template>
  <div
    class="
      flex
      h-screen
      flex-col
      justify-between
      py-8
      px-14
      bg-slate-50
      dark:bg-[#2f3136]
    "
  >
    <div class="flex justify-between items-center">
      <div class="flex items-center">
        <div class="font-medium text-2xl font-bold dark:text-[#ddd]">
          Club <span class="text-indigo-500">TT</span>
        </div>
        <div
          class="
            ml-4
            py-0.5
            px-4
            bg-indigo-100
            dark:bg-[#383a3f]
            rounded
            text-sm text-indigo-500
            font-medium
          "
        >
          {{ app_version }}
        </div>
        <div class="ml-3 flex h-3 w-3">
          <span
            class="
              animate-ping
              absolute
              inline-flex
              h-3
              w-3
              rounded-full
              bg-indigo-400
              opacity-75
            "
          ></span>
          <span
            class="relative inline-flex rounded-full h-3 w-3 bg-indigo-400"
          ></span>
        </div>
        <div class="ml-3 text-slate-600 font-bold dark:text-[#8d8d8d]">
          In development
        </div>
      </div>
      <div class="flex items-center">
        <div
          class="
            mr-6
            cursor-pointer
            transition
            hover:stroke-slate-900
            stroke-[#8d8d8d]
            dark:hover:stroke-[#ddd]
          "
          @click="changeColorTheme"
        >
          <SunSvg v-if="darkThemeOn" :height="24" :width="24" />
          <MoonSvg v-else :height="24" :width="24" />
        </div>
        <template v-if="!verification">
          <div>
            <Transition name="adm" mode="out-in" appear>
              <div
                v-if="!adminLogin.id"
                class="
                  bg-indigo-500
                  py-1
                  px-6
                  rounded
                  cursor-pointer
                  text-white
                  mr-6
                  transition
                  hover:bg-indigo-600
                  font-medium
                "
                @click="toCreateClub()"
              >
                Создать клуб
              </div>
            </Transition>
          </div>
          <Transition name="adm" mode="out-in" appear>
            <div v-if="adminLogin.id" class="flex text-[#8d8d8d]">
              <div class="mr-4">{{ adminLogin.login }}</div>
              <div
                class="
                  transition
                  cursor-pointer
                  hover:text-slate-900
                  font-medium
                  dark:text-[#ddd] dark:hover:text-indigo-500
                "
                @click="logout()"
              >
                <!-- Заменить иконкой -->
                Выход
              </div>
            </div>
            <div
              v-else
              class="
                transition
                cursor-pointer
                text-slate-500
                hover:text-slate-900
                font-medium
                dark:text-[#ddd] dark:hover:text-indigo-500
              "
              @click="goLogin()"
            >
              Вход
            </div>
          </Transition>
        </template>
      </div>
    </div>
    <div class="club_w mx-auto -mt-16">
      <div class="mb-2 font-medium dark:text-[#ddd]">
        {{ $t("chooseClub") }}
      </div>
      <div class="mb-4">
        <div class="relative">
          <input
            type="text"
            class="
              bg-white
              dark:bg-[#383a3f]
              border border-gray-300
              dark:border-[#1e1f22] dark:text-[#a6a7b3]
              rounded
              focus:ring-indigo-500 focus:border-indigo-500
              dark:focus:ring-indigo-500 dark:focus:border-indigo-500
              w-full
              px-4
              py-2
              pr-16
              placeholder:text-[#8d8d8d]
            "
            placeholder="Поиск пока не пригодится"
          />
          <dir
            class="
              absolute
              flex
              items-center
              justify-center
              right-6
              -top-1.5
              w-6
            "
          >
            <SearchSvg class="cursor-pointer" />
          </dir>
        </div>
        <!-- <div>Значок поиска</div> -->
      </div>
      <div v-if="clubs.length">
        <div
          v-for="club in clubs"
          :key="club.id"
          class="
            flex
            justify-between
            cursor-pointer
            bg-white
            rounded
            px-4
            py-2
            mb-3
            dark:border-[#1e1f22] dark:bg-[#383a3f]
            transition
            dark:fill-[#ddd]
            hover:fill-indigo-500
            dark:hover:fill-indigo-500

          "
          @click="chooseClub(club.id)"
        >
          <div class="dark:text-[#ddd]">{{ club.name }}</div>
          <ArrowRight1Svg class="" />
        </div>
      </div>
      <template v-else>
        <div
          class="
            animate-pulse
            dark:bg-[#79798025]
            bg-slate-200
            h-10
            rounded
            px-4
            py-2
            mb-3
          "
        ></div>
        <div
          class="
            animate-pulse
            dark:bg-[#79798025]
            bg-slate-200
            h-10
            rounded
            px-4
            py-2
            mb-3
          "
        ></div>
      </template>
    </div>
    <div class="text-slate-400 mx-auto dark:text-[#8d8d8d]">
      By Aleksey Beletsky, Maxim Proidakov
    </div>
  </div>
</template>

<script>
import ArrowRight1Svg from "../../components/svg/ArrowRight1Svg.vue";
import SearchSvg from "../../components/svg/SearchSvg.vue";
import SunSvg from "../../components/svg/SunSvg.vue";
// MoonSvg
import MoonSvg from "../../components/svg/MoonSvg.vue";

export default {
  components: {
    ArrowRight1Svg,
    SearchSvg,
    SunSvg,
    MoonSvg,
  },
  data() {
    return {
      verification: true,
      app_version: __APP_VERSION__,
      activeLocaleClass: "text-indigo-500",
    };
  },
  computed: {
    adminLogin() {
      return this.$store.state.admin;
    },
    locale() {
      return this.$i18n.locale;
    },
    clubs() {
      return this.$store.state.clubs;
    },
    darkThemeOn() {
      return this.$store.state.darkThemeOn;
    },
  },
  methods: {
    toCreateClub() {
      this.$router.push({ name: "NewClub" });
    },
    changeLocale(locale) {
      this.$i18n.locale = locale;
    },
    chooseClub(idClub) {
      // SET REPLACE
      this.$router.push({ name: "Club_d", params: { id: idClub } });
    },
    changeColorTheme() {
      this.$store.commit("changeColorTheme");
    },

    // ===
    goLogin() {
      this.$router.push({
        name: "Login",
      });
    },
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.replace({ name: "Login" });
      });
    },
  },
  mounted() {
    this.$store.dispatch("verifyAuth", null).then(() => {
      this.verification = false;
    });
    this.$store.dispatch("getClubs");
  },
};
</script>

<style scoped>
.club_w {
  min-width: 32rem;
}
.adm-enter-active {
  transition: opacity 0.5s ease;
}

.adm-enter-from,
.adm-leave-to {
  opacity: 0;
}
</style>