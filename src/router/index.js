import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Hello",
    component: () => import("../views/Hello.vue"),
  },
  {
    path: "/:id",
    name: "Club",
    redirect: () => {
      return { name: "Rating" };
    },
    component: () => import("../views/Club.vue"),
    children: [
      {
        path: "rating",
        name: "Rating",
        component: () => import("../views/Rating.vue"),
      },
      {
        path: "history",
        name: "History",
        component: () => import("../views/History.vue"),
      },
    ],
  },
  {
    path: "/404",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(),
  // base: process.env.BASE_URL,
  routes,
});

export default router;
