<template>
  <div :class="darkThemeOn ? 'dark' : 'light'">
    <div class="bg-slate-50 min-h-screen text-center dark:bg-[#2f3136]">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      width: 0,
    };
  },
  computed: {
    text() {
      return this.$store.state.textFromState;
    },
    darkThemeOn() {
      return this.$store.state.darkThemeOn;
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
