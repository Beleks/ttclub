<template>
  <div
    class="
      bg-white
      py-2
      px-2
      mb-3
      rounded
      dark:bg-[#383a3f]
      border
      dark:border-[#1e1f22]
    "
  >
    <div
      @click.prevent="openCard()"
      :class="[
        { ' cursor-pointer': !isOpen },
        'flex justify-between items-center',
      ]"
    >
      <div class="flex dark:text-[#ddd]">
        <div class="w-8 text-center text-indigo-500 dark:text-[#a6a7b3]">
          {{ position }}
        </div>
        <div class="ml-2 w-60 text-left">
          {{ player.surname }} {{ player.name }}
        </div>
      </div>
      <div class="dark:text-[#ddd]">
        <div>{{ Math.floor(player.rating) }}</div>

        <!-- <div v-if="!isOpen">{{ Math.floor(player.rating) }}</div>
        <div v-else @click.stop="isOpen = false" class="cursor-pointer">
          close
        </div> -->
      </div>
    </div>
    <!-- <div v-if="isOpen">chart</div> -->
  </div>
</template>

<script>
export default {
  props: {
    position: Number,
    player: Object,
  },
  data() {
    return {
      isOpen: true,
    };
  },
  methods: {
    openCard() {
      // this.isOpen = true;
    },
  },
};
</script>

<style>
</style>