<template>
  <div class="p-3 flex justify-between">
    <div>{{ $t("duel") }}</div>
    <div @click="cancelCreate()">Отмена</div>
  </div>
</template>

<script>
export default {
  computed: {},
  methods: {
    cancelCreate() {
      this.$router.replace({ name: "Club" });
    },
  },
};
</script>

<style>
</style>