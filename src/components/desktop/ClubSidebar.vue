<template>
  <div class="w-60 bg-white h-screen pb-6 px-4 flex flex-col">
    <div class="text-2xl py-6">Club Title</div>
    <div>
      <div v-for="menuItem in menuItems" :key="menuItem.name" :class="['flex']">
        <!-- translate menuItem ?-->
        <component :is="menuItem.svg"></component>
        {{ menuItem.title }}
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
          name: "rating",
          svg: "RatingSvg",
          title: "Рейтинг",
        },
        {
          name: "rating",
          svg: "HistorySvg",
          title: "История",
        },
        {
          name: "rating",
          svg: "UserSvg",
          title: "Игроки",
        },
      ],
      activeMenuItem: "rating",
    };
  },
};
</script>

<style>
</style>