<template>
  <div class="h-screen md:w-96 md:m-auto p-6 flex flex-col justify-between">
    <div>
      <div class="text-2xl font-semibold">
        <span class="text-indigo-500">TT</span> Club
      </div>
      <div class="mt-4 px-2 rounded text-indigo-500 w-max m-auto bg-indigo-200">
        {{ app_version }}
      </div>
      <div class="mt-12">
        <div class="mb-2">
          <div class="text-left">Логин</div>
          <input
            class="py-1 px-2 border rounded focus:border-indigo-500 focus:outline-none"
            type="text"
            v-model="login"
          />
        </div>
        <div class="mb-2">
          <div class="text-left">Пароль</div>
          <input
            class="py-1 px-2 border rounded focus:border-indigo-500 focus:outline-none"
            type="password"
            v-model="password"
          />
        </div>
      </div>
      <div
        class="mt-6 w-max m-auto underline cursor-pointer"
        @click="loginAsGuest()"
      >
        Войти как гость
      </div>
    </div>
    <div>
      <!-- + Ошбика входа -->
      <div
        class="md:w-80 md:m-auto cursor-pointer text-slate-100 bg-indigo-500 py-2 rounded"
        @click="loginAsAdmin()"
      >
        {{ status }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: false,
      login: "",
      password: "",
      status: "Вход",
      app_version: __APP_VERSION__,
    };
  },
  methods: {
    loginAsGuest() {
      this.$router.replace({
        name: "Mobile",
      });
    },
    loginAsAdmin() {
      this.status = "Выполняется вход...";

      this.$store
        .dispatch("loginAsAdmin", {
          login: this.login,
          password: this.password,
        })
        .then(() => {
          let id = this.$store.state.admin.id;
          this.$router.replace({ name: "Club", params: { id } });
        })
        .catch((error) => {
          this.status = "Вход";
          // Показать уведомление об ошибке
        });
    },
  },
};
</script>

<style scoped>
input {
  /* min-width: calc(100% - 1.5rem); */
  min-width: 100%;
}
/* @media screen and (min-width: 800px) {
  
} */
</style>