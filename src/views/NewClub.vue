<template>
  <div class="pt-4">Страница в разработке</div>
  <div class="mt-4 underline cursor-pointer" @click="back()">На главную</div>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>

<style>
</style>