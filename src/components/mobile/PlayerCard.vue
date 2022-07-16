<template>
  <div class="relative">
    <div class="bg-white py-2 px-3 rounded mt-3 flex justify-between">
      <div>{{ player.surname }} {{ player.name }}</div>
      <div>{{ Math.floor(player.rating) }}</div>
    </div>
    <div
      class="absolute player_pos text-xs"
      :class="{
        pos_1: position === 1,
        pos_2: position === 2,
        pos_3: position === 3,
        pos: position > 3,
      }"
    >
      {{ position }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    position: Number,
    player: Object,
  },
};
</script>

<style scoped>
.player_pos {
  font-weight: bold;
  border-radius: 3px;
  margin-left: 0.625rem;
  padding: 0 0.6rem;
  position: absolute;
  top: -7px;
  width: max-content;
}
.pos {
  background-color: #eeeeee;
}
.pos_1 {
  color: #030406;
  background: linear-gradient(90deg, #f7df1e -21.15%, #ffffff 178.12%);
}
.pos_2 {
  color: #030406;
  background: linear-gradient(90deg, #8c8c8c -21.15%, #ffffff 178.12%);
}
.pos_3 {
  color: #030406;
  background: linear-gradient(90deg, #a66f45 -21.15%, #ffffff 178.12%);
}
</style>