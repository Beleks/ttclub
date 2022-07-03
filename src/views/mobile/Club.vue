<template>
  <ClubHeader />
  <div>
    <router-view></router-view>
  </div>
  <template v-if="isClubHomePage">
    <ClubFooter />
  </template>
</template>

<script>
// @ - not working
import ClubHeader from "../../components/mobile/ClubHeader.vue";
import ClubFooter from "../../components/mobile/ClubFooter.vue";

export default {
  components: { ClubHeader, ClubFooter },
  computed: {
    isClubHomePage() {
      const routeName = this.$route.name;
      return routeName === "Rating" || routeName === "History";
    },
  },
  mounted() {},
};
</script>

<style>
</style>