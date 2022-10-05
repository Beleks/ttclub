<template>
  <div class="bg-slate-50 min-h-screen text-center">
    <ReloadPrompt />
    <router-view></router-view>
  </div>
</template>

<script>
import ReloadPrompt from "./components/ReloadPrompt.vue";

export default {
  components: {
    ReloadPrompt,
  },
  data() {
    return {
      width: 0,
    };
  },
  computed: {
    text() {
      return this.$store.state.textFromState;
    },
  },
  methods: {
    changeLocales(locale) {
      this.$i18n.locale = locale;
    },
    updateWidth() {
      this.width = window.innerWidth;
    },
  },
  watch: {
    width(newWidth, oldWidth) {
      if (oldWidth >= 800 && newWidth < 800) {
        this.$router.replace({ name: "Mobile" });
      } else if (oldWidth <= 800 && newWidth > 800) {
        this.$router.replace({ name: "Desktop" });
      }
    },
  },
  created() {
    window.addEventListener("resize", this.updateWidth);
  },
};
</script>

<style>
#app {
  /* margin-top: 60px; */
}
input {
  /* all: unset; */
  outline: none;
}
.svg {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
