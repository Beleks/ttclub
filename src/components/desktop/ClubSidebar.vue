<template>
  <div
    class="
      w-56
      bg-white
      dark:bg-[#242629]
      h-screnn
      fixed
      top-0
      bottom-0
      pb-6
      px-4
      flex flex-col
      select-none
    "
  >
    <div class="text-2xl my-6 cursor-pointer dark:text-[#ddd]" @click="goHome()">Club Title</div>
    <div v-if="!verification" class="mt-6">
      <TransitionGroup name="tab" appear>
        <div
          v-for="menuItem in menuItems"
          :key="menuItem.name[0]"
          :class="[
            menuItem.name.includes(activeMenuItem)
              ? 'bg-indigo-100 text-indigo-500 stroke-indigo-500 fill-indigo-500 dark:bg-[#383a3f] dark:fill-[#ddd] dark:text-[#ddd]'
              : 'stroke-slate-500 fill-slate-500 text-slate-700 dark:fill-[#ddd] dark:text-[#ddd]',

            'flex cursor-pointer px-4 py-1 rounded mb-2',
          ]"
          @click="choseTab(menuItem.name[0])"
        >
          <component :is="menuItem.svg" :height="22" :width="22"></component>
          <div class="ml-2 font-medium">
            <!-- translate menuItem ?-->
            {{ menuItem.title }}
          </div>
        </div>
      </TransitionGroup>

      <TransitionGroup name="tab" appear>
        <template v-if="isAuth">
          <div
            v-for="menuItem in menuItemsAdmin"
            :key="menuItem.name[0]"
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
        </template>
      </TransitionGroup>
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

import { authMixin } from "../../mixins/auth";

export default {
  props: {
    verification: Boolean,
  },
  mixins: [authMixin],
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
          name: ["History_d", "HistoryTournament_d"],
          svg: "HistorySvg",
          title: "История",
        },
      ],
      menuItemsAdmin: [
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

<style scoped>
.tab-enter-active,
.tab-leave-active {
  transition: opacity 0.5s ease;
}

.tab-enter-from,
.tab-leave-to {
  opacity: 0;
}
</style>