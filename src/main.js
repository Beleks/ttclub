import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";
import store from "./store/index.js";
import router from "./router";
import "./index.css";

import en from "./locales/en.json";
import ru from "./locales/ru.json";

// ! add export
const i18n = createI18n({
  locale: "ru",
  messages: {
    en,
    ru,
  },
});

createApp(App).use(router).use(store).use(i18n).mount("#app");
