import { createRouter, createWebHistory } from "vue-router";

function widthCheck(to) {
  let width = window.innerWidth;
  if (to.matched[0].name == "Mobile" && width > 800) {
    // How change only matched[0] from m to d ?
    return { name: "Desktop" };
  } else if (to.matched[0].name == "Desktop" && width < 800) {
    return { name: "Mobile" };
  }
}

const routes = [
  {
    path: "/m",
    name: "Mobile",
    beforeEnter: [widthCheck],
    redirect: () => {
      return { name: "Hello" };
    },
    component: () => import("../views/mobile/Mobile.vue"),
    children: [
      {
        path: "hello",
        name: "Hello",
        component: () => import("../views/Hello.vue"),
      },
      {
        path: ":id",
        name: "Club",
        redirect: () => {
          return { name: "Rating" };
        },
        component: () => import("../views/mobile/Club.vue"),
        children: [
          {
            path: "rating",
            name: "Rating",
            component: () => import("../views/mobile/Rating.vue"),
          },
          {
            path: "history",
            name: "History",
            component: () => import("../views/mobile/History.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/",
    name: "Desktop",
    beforeEnter: [widthCheck],
    component: () => import("../views/desktop/Desktop.vue"),
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
