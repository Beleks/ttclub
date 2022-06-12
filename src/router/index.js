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
    component: () => import("../views/Club.vue"),
    children: [
      {
        path: "/rating",
        name: "Rating",
        component: () => import("../views/Rating.vue"),
      },
      {
        path: "/history",
        name: "History",
        component: () => import("../views/History.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  // base: process.env.BASE_URL,
  routes,
});

export default router;
