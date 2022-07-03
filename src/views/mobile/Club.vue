<template>
  <ClubHeader />
  <div>
    <router-view></router-view>
  </div>
  <ClubFooter />
</template>

<script>
// @ - not working
import ClubHeader from "../../components/mobile/ClubHeader.vue";
import ClubFooter from "../../components/mobile/ClubFooter.vue";

export default {
  components: { ClubHeader, ClubFooter },
  mounted() {},
};
</script>

<style>
</style>