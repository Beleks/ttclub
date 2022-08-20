<template>
  <div class="flex">
    <ClubSidebar />
    <div class="w-full">
      <div
        class="
          flex
          items-center
          justify-between
          h-20
          px-8
          border-b-2 border-white
        "
      >
        <div>
          <div
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
        </div>
        <div class="off cursor-not-allowed">Вход</div>
      </div>
      <div class="flex p-6 px-8">
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
  computed: {
    isClubHomePage() {
      const routeName = this.$route.name;
      return routeName === "Rating" || routeName === "History";
    },
  },
  mounted() {
    const idClub = this.getCurrentIdClub();

    // this.$store.dispatch("verifyAuth", idClub);
    this.$store.dispatch("getPlayers", idClub);
    this.$store.dispatch("getDuels", idClub);
    this.$store.dispatch("getTournaments", idClub);
  },
};
</script>

<style scoped>
.off {
  color: rgba(128, 128, 128, 0.5);
}
</style>