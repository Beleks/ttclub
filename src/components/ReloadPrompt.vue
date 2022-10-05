

<template>
  <div v-if="needRefresh" class="pwa-toast w-60" role="alert">
    <div class="message">
      <!-- <span v-if="offlineReady"> App ready to work offline </span> -->
      <span> Обновление готово :) </span>
    </div>
    <div class="flex items-center">
      <div
        class="py-1 px-3 bg-indigo-500 rounded text-white mr-3 cursor-pointer"
        v-if="!needRefresh"
        @click="updateServiceWorker()"
      >
        Загрузить
      </div>
      <div class="cursor-pointer" @click="close">Позже</div>
    </div>
  </div>
</template>

<script>
import useRegisterSW from "../mixins/useRegisterSW";

export default {
  name: "ReloadPrompt",
  mixins: [useRegisterSW],
};
</script>

<style>
.pwa-toast {
  position: fixed;
  right: 0;
  bottom: 0;
  /* width: 300px; */
  margin: 16px;
  padding: 12px;
  border: 1px solid #8885;
  border-radius: 4px;
  z-index: 1;
  text-align: left;
  box-shadow: 3px 4px 5px 0 #8885;
}
.pwa-toast .message {
  margin-bottom: 8px;
}
.pwa-toast button {
  border: 1px solid #8885;
  outline: none;
  margin-right: 5px;
  border-radius: 2px;
  padding: 3px 10px;
}
</style>