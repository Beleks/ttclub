<template>
  <div class="bg-white p-2 rounded shadow-lg shadow-gray-100/50">
    <div class="flex">
      <CupSvg :size="32" :color="'#0F172A'" />
      <div class="ml-2">Турнир от {{ item.created_at }}</div>
    </div>
    <div class="text-left mt-2 text-slate-500">
      <span>Участников: {{ item.number_participants }} </span>
    </div>
  </div>
</template>

<script>
import CupSvg from "../../svg/CupSvg.vue";

export default {
  components: {
    CupSvg,
  },
  props: {
    item: Object,
  },
};
</script>

<style>
</style>