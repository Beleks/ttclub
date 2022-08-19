import { createRouter, createWebHistory } from "vue-router";

// after hooks

// befor enter hooks
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
          {
            path: "history/tournament/:idTournament",
            name: "HistoryTournament",
            component: () => import("../views/mobile/HistoryTournament.vue"),
          },
          {
            path: "menu",
            name: "Menu",
            component: () => import("../views/mobile/Menu.vue"),
          },
          {
            path: "menu/players",
            name: "MenuPlayers",
            component: () => import("../views/mobile/MenuPlayers.vue"),
          },
        ],
      },
      {
        path: ":id/create",
        name: "Create",
        component: () => import("../views/mobile/Create.vue"),
        children: [
          {
            path: "duel",
            name: "CreateDuel",
            component: () => import("../views/mobile/CreateDuel.vue"),
          },
          {
            path: "duel/score",
            name: "CreateDuelResult",
            component: () => import("../views/mobile/CreateDuelResult.vue"),
          },
          {
            path: "tournament",
            name: "CreateTournament",
            component: () => import("../views/mobile/CreateTournament.vue"),
            children: [
              {
                path: "grid",
                name: "CreateTournamentGrid",
                component: () => import("../views/mobile/CreateTournamentGrid.vue"),
              },
              {
                path: "duel",
                name: "CreateTournamentDuel",
                component: () => import("../views/mobile/CreateTournamentDuel.vue"),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/",
    name: "Desktop",
    beforeEnter: [widthCheck],
    redirect: () => {
      return { name: "Hello_d" };
    },
    component: () => import("../views/desktop/Desktop.vue"),
    children: [
      {
        path: "hello",
        name: "Hello_d",
        component: () => import("../views/desktop/Hello.vue"),
      },
      {
        path: ":id",
        name: "Club_d",
        component: () => import("../views/desktop/Club.vue"),
        children: [
          {
            path: "rating",
            name: "Rating_d",
            component: () => import("../views/desktop/Rating.vue"),
          },
          {
            path: "history",
            name: "History_d",
            component: () => import("../views/desktop/History.vue"),
          },
          {
            path: "menu/players",
            name: "MenuPlayer_d",
            component: () => import("../views/desktop/MenuPlayers.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
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
