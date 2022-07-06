export const authMixin = {
  computed: {
    isAuth() {
      return this.$store.state.isAuth;
    },
  },
};
