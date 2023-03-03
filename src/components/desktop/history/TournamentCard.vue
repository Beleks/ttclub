<template>
  <div
    class="
      flex
      py-2
      px-4
      rounded
      justify-between
      items-center
      cursor-pointer
      border
      bg-white
      dark:bg-[#383a3f] dark:border-[#1e1f22] dark:fill-[#ddd] dark:text-[#ddd]
    "
  >
    <div class="flex items-center">
      <CupSvg :size="32" />
      <div class="ml-2">Турнир от {{ item.created_at }}</div>
      <span class="ml-4 text-slate-500 dark:text-[#8d8d8d]"
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