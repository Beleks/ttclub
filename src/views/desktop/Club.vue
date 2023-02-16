<template>
  <div class="flex">
    <ClubSidebar :verification="verification" />
    <div class="ml-56 w-full">
      <div class="border-b-2 border-white dark:border-[#1e1f22]">
        <div class="container-maxw flex items-center justify-between px-8 h-20">
          <template v-if="!verification">
            <div>
              <Transition name="adm" mode="out-in" appear>
                <div
                  v-if="isAuth"
                  class="
                    bg-gray-400
                    py-1
                    px-3
                    w-36
                    rounded
                    text-gray-300
                    cursor-not-allowed
                  "
                >
                  Создать
                </div>
                <div v-else class="text-gray-300 dark:text-[#8d8d8d]">
                  Вы вошли как гость
                </div>
              </Transition>
            </div>
            <Transition name="adm" mode="out-in" appear>
              <div v-if="isAuth" class="flex">
                <div class="mr-4">{{ adminLogin.login }}</div>
                <div
                  class="
                    cursor-pointer
                    text-slate-500
                    hover:text-slate-900
                    dark:text-[#8d8d8d] dark:hover:text-[#ddd]
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
                  cursor-pointer
                  text-slate-500
                  hover:text-slate-900
                  dark:text-[#8d8d8d] dark:hover:text-[#ddd]
                "
                @click="goLogin()"
              >
                Вход
              </div>
            </Transition>
          </template>
        </div>
      </div>
      <div class="flex p-6 px-8 container-maxw">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import ClubSidebar from "../../components/desktop/ClubSidebar.vue";

import { getCurrentIdClub } from "../../mixins/index";

export default {
  components: { ClubSidebar },
  mixins: [getCurrentIdClub],
  data() {
    return {
      verification: true,
    };
  },
  computed: {
    isAuth() {
      return this.$store.state.isAuth;
    },
    isClubHomePage() {
      const routeName = this.$route.name;
      return routeName === "Rating" || routeName === "History";
    },
    adminLogin() {
      return this.$store.state.admin;
    },
  },
  methods: {
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
    const idClub = this.getCurrentIdClub();

    this.$store.dispatch("verifyAuth", idClub).then(() => {
      this.verification = false;
    });
    this.$store.dispatch("getPlayers", idClub);
    this.$store.dispatch("getDuels", idClub);
    this.$store.dispatch("getTournaments", idClub);
  },
  beforeRouteLeave(to, from) {
    this.$store.commit("clearClubInfo");
  },
};
</script>

<style scoped>
.container-maxw {
  margin: 0 auto;
  max-width: 1200px;
}
.off {
  color: rgba(128, 128, 128, 0.5);
}

.adm-enter-active {
  transition: opacity 0.5s ease;
}

.adm-enter-from,
.adm-leave-to {
  opacity: 0;
}
</style>

