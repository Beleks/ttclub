<template>
  <div class="w-full">
    <template v-if="!anyDataHistory">Загрузка...</template>
    <template v-else>
      <div class="flex mb-4">
        <div
          :class="[
            'py-1 px-3 w-36 cursor-pointer shadow-lg shadow-gray-100/50 rounded mr-3',
            { [activeCategoryClass]: activeCategory === category },
            { 'bg-white': activeCategory !== category },
          ]"
          v-for="category in categories"
          :key="category"
          @click="changeCategory(category)"
        >
          {{ $t(`${category}`) }}
        </div>
      </div>
      <div class="mb-4" v-for="item in categoryItems" :key="item.id">
        <component
          :is="categoryItemsComponent"
          :item="item"
          @click="moreInfo(item)"
        />
      </div>
    </template>
  </div>
</template>

<script>
import DuelCard from "../../components/desktop/history/DuelCard.vue";
import TournamentCard from "../../components/desktop/history/TournamentCard.vue";

export default {
  components: { DuelCard, TournamentCard },
  data() {
    return {
      categories: ["duels", "tournaments"],
      activeCategory: "duels",
      activeCategoryClass: "bg-indigo-100 text-indigo-500",
    };
  },
  computed: {
    categoryItems() {
      return this.$store.state.currentClub.history[this.activeCategory];
    },
    categoryItemsComponent() {
      let typeComponent = "";
      switch (this.activeCategory) {
        case "duels":
          typeComponent = "DuelCard";
          break;
        case "tournaments":
          typeComponent = "TournamentCard";
          break;
        default:
          typeComponent = "DuelCard";
          break;
      }
      return typeComponent;
    },
    anyDataHistory() {
      return (
        this.$store.state.currentClub.history.duels.length &&
        this.$store.state.currentClub.players.length
      );
    },
  },
  methods: {
    changeCategory(category) {
      this.activeCategory = category;
    },
    moreInfo(item) {
      if (this.activeCategory === "tournaments") {
        this.$router.push({
          path: `history/tournament/${item.id}`,
          // query: { stage: 0 },
        });
      }
    },
  },
};
</script>

<style>
</style>