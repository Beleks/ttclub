<template>
  <div class="w-60 bg-white h-screen pb-6 px-4 flex flex-col">
    <div class="text-2xl my-6 cursor-pointer" @click="goHome()">Club Title</div>
    <div class="mt-6">
      <div
        v-for="menuItem in menuItems"
        :key="menuItem.name"
        :class="[
          menuItem.name.includes(activeMenuItem)
            ? 'bg-indigo-100 text-indigo-500 stroke-indigo-500 fill-indigo-500'
            : 'stroke-slate-900',

          'flex cursor-pointer px-4 py-1 rounded mb-2',
        ]"
        @click="choseTab(menuItem.name[0])"
      >
        <component :is="menuItem.svg"></component>
        <div class="ml-2">
          <!-- translate menuItem ?-->
          {{ menuItem.title }}
        </div>
      </div>
    </div>
    <div>
      <!-- footer -->
    </div>
  </div>
</template>

<script>
import RatingSvg from "../svg/RatingSvg.vue";
import HistorySvg from "../svg/HistorySvg.vue";
import UserSvg from "../svg/UserSvg.vue";

export default {
  components: {
    RatingSvg,
    HistorySvg,
    UserSvg,
  },
  data() {
    return {
      menuItems: [
        {
          name: ["Rating_d"],
          svg: "RatingSvg",
          title: "Рейтинг",
        },
        {
          name: ["History_d"],
          svg: "HistorySvg",
          title: "История",
        },
        {
          name: ["Players_d", "PlayerEdit_d"],
          svg: "UserSvg",
          title: "Игроки",
        },
      ],
      // activeMenuItem: "rating",
    };
  },
  computed: {
    activeMenuItem() {
      return this.$route.name;
    },
  },
  methods: {
    choseTab(pathName) {
      if (this.$route.name !== pathName) {
        this.$router.replace({
          name: pathName,
        });
      }
    },
    goHome() {
      this.$router.replace({
        name: "Hello_d",
      });
    },
  },
};
</script>

<style>
</style>