<template>
  <div class="p-3 flex justify-between">
    <div>{{ $t("tournament") }}</div>
    <div @click="cancelCreate()">Отмена</div>
  </div>
</template>

<script>
export default {
  computed: {},
  methods: {
    cancelCreate() {
      this.$store.commit("resetTornamentRecord");
      this.$router.replace({ name: "Club" });
    },
  },
};
</script>

<style>
</style>