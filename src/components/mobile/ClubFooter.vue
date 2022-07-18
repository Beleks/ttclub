<template>
  <div
    class="fixed bottom-0 w-full h-14 p-3 bg-white max_height"
    :class="{ 'h-48 rounded-t-2xl': popupIsOpen }"
  >
    <transition name="list">
      <div v-if="popupIsOpen" class="popup_list">
        <div
          class="
            flex
            justify-between
            py-2.5
            px-3
            text-white
            my-2
            rounded
            bg-indigo-500
          "
          @click="create('duel')"
        >
          <div>Матч</div>
          <DuelSvg />
        </div>
        <div
          class="
            flex
            justify-between
            py-2.5
            px-3
            text-white
            my-3
            rounded
            bg-indigo-500
          "
          @click="create('tournament')"
        >
          <div>Турнир</div>
          <CupSvg :size="24" :color="'white'" />
        </div>
      </div>
    </transition>

    <div
      class="
        h-14
        items-center
        justify-around
        flex
        absolute
        bottom-0
        left-0
        w-full
      "
    >
      <transition name="list">
        <div
          v-if="!popupIsOpen"
          class="w-16"
          :class="{ 'text-indigo-500 fill-indigo-500': activeTab === 'Rating' }"
          @click="choseTab('Rating')"
        >
          <div><RatingSvg /></div>
          <div class="text-sm">Рейтинг</div>
        </div>
      </transition>

      <div
        class="bg-indigo-500 rounded-full p-2"
        v-if="isAuth"
        @click="openPopup()"
      >
        <template v-if="popupIsOpen">
          <ArrowDownSvg :color="'white'" />
        </template>
        <template v-else>
          <CreateSvg />
        </template>
      </div>
      <transition name="list">
        <div
          v-if="!popupIsOpen"
          class="w-16"
          :class="{
            'text-indigo-500 fill-indigo-500': activeTab === 'History',
          }"
          @click="choseTab('History')"
        >
          <div><HistorySvg /></div>
          <div class="text-sm">Матчи</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import RatingSvg from "../svg/RatingSvg.vue";
import HistorySvg from "../svg/HistorySvg.vue";
import CreateSvg from "../svg/CreateSvg.vue";
import DuelSvg from "../svg/DuelSvg.vue";
import CupSvg from "../svg/CupSvg.vue";
import ArrowDownSvg from "../svg/ArrowDownSvg.vue";

export default {
  components: {
    RatingSvg,
    HistorySvg,
    CreateSvg,
    DuelSvg,
    CupSvg,
    ArrowDownSvg,
  },
  data() {
    return {
      activeTabClass: ["text-indigo-500"],
      popupIsOpen: false,
    };
  },
  computed: {
    activeTab() {
      return this.$route.name;
    },
    isAuth() {
      return this.$store.state.isAuth;
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
    openPopup() {
      this.popupIsOpen = !this.popupIsOpen;
      // this.$store.commit("popupCreateToggle", true);
    },
    create(type) {
      let routeName = "";
      switch (type) {
        case "duel":
          routeName = "CreateDuel";
          break;

        case "tournament":
          routeName = "CreateTournament";
          break;

        default:
          break;
      }
      this.$router.replace({ name: routeName });
    },
  },
};
</script>

<style>
.max_height {
  transition: height 0.3s ease-in-out;
}

.list-enter-active {
  transition: all 0.3s ease-in-out 0.3s;
}

.list-enter-from {
  opacity: 0;
}
</style>