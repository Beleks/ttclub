<template>
  <div>
    <router-view></router-view>
  </div>
  <ClubFooter />
</template>

<script>
// @ - not working
import ClubFooter from "../../components/mobile/ClubFooter.vue";

export default {
  components: { ClubFooter },
  mounted() {},
};
</script>

<style>
</style>