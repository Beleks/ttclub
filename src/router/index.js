import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/hello", component: () => import("../components/HelloWorld.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  // base: process.env.BASE_URL,
  routes,
});

export default router;
