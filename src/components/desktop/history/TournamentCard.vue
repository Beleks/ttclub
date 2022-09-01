<template>
  <div
    class="
      flex
      bg-white
      py-2
      px-4
      rounded
      shadow-lg shadow-gray-100/50
      justify-between
      items-center
      cursor-pointer
    "
  >
    <div class="flex items-center">
      <CupSvg :size="32" :color="'#0F172A'" />
      <div class="ml-2">Турнир от {{ item.created_at }}</div>
      <span class="ml-4 text-slate-500"
        >Участников: {{ item.number_participants }}
      </span>
    </div>
    <div class="text-left">
      <ArrowRight1Svg />
    </div>
  </div>
</template>

<script>
import CupSvg from "../../svg/CupSvg.vue";
import ArrowRight1Svg from "../../svg/ArrowRight1Svg.vue";

export default {
  components: {
    CupSvg,
    ArrowRight1Svg,
  },
  props: {
    item: Object,
  },
};
</script>

<style>
</style>