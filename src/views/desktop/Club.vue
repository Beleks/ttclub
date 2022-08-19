<template>
  <div class="flex">
    <ClubSidebar />
    <div class="w-full">
      <div class="flex items-center h-20 px-8 border-b-2 border-white">
        header
      </div>
      <div class="flex p-8">
        <!-- <span></span> -->
        <div class="px-2 bg-indigo-500 text-white rounded">В разработке</div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import ClubSidebar from "../../components/desktop/ClubSidebar.vue";

export default {
  components: {
    ClubSidebar,
  },
};
</script>

<style>
</style>