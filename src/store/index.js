import { createStore, createLogger } from "vuex";
import api from "../api.js";

export default createStore({
  state: {
    isAuth: false,
    clubs: [],
    currentClub: {
      players: [],
      history: {
        duels: [],
        tournaments: [],
      },
    },
  },
  mutations: {
    verifyAuth(state, isAuth) {
      state.isAuth = isAuth;
    },
    setClubs(state, clubs) {
      state.clubs = clubs;
    },
    setClubPlayers(state, players) {
      state.currentClub.players = players;
    },
    setClubDuels(state, duels) {
      state.currentClub.history.duels = duels;
    },
    setClubTournaments(state, tournaments) {
      state.currentClub.history.tournaments = tournaments;
    },
  },
  actions: {
    async loginAsAdmin({ commit }) {
      let params = {
        login: "test2",
        password: "3223",
      };

      await api.requestToApi("POST", "auth/login", params).then((data) => {
        localStorage.setItem("clubToken", JSON.stringify(data.access_token));
        // commit("setToken", data.data);
      });
    },
    async verifyAuth({ commit }, idClub) {
      let token = localStorage.getItem("clubToken");

      if (token) {
        console.log(token);
        await api
          .requestToApiByAdmin("POST", "auth/me", JSON.parse(token))
          .then((data) => {
            commit("verifyAuth", data.id == idClub);
          });
      }
    },
    logout({ commit }) {
      localStorage.removeItem("clubToken");
      commit("verifyAuth", false);
    },

    // club
    async getClubs({ commit }) {
      await api.requestToApi("GET", "clubs").then((data) => {
        commit("setClubs", data.data);
      });
    },
    async getPlayers({ commit }, idClub) {
      await api.requestToApi("GET", `${idClub}/players`).then((data) => {
        commit("setClubPlayers", data.data);
      });
    },
    async getDuels({ commit }, idClub) {
      await api.requestToApi("GET", `${idClub}/duels`).then((data) => {
        commit("setClubDuels", data.data);
      });
    },
    async getTournaments({ commit }, idClub) {
      await api.requestToApi("GET", `${idClub}/tournaments`).then((data) => {
        commit("setClubTournaments", data.data);
      });
    },
  },
});
