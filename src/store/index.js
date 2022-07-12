import { createStore, createLogger } from "vuex";
import api from "../api.js";

export default createStore({
  state: {
    admin: {
      idClub: null,
    },
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
  getters: {
    getPlayerById: (state) => (idPlayer) => {
      return state.currentClub.players.find((player) => player.id === idPlayer);
    },
  },
  mutations: {
    verifyAuth(state, isAuth) {
      state.isAuth = isAuth;
    },
    setClubId(state, id) {
      state.admin.idClub = id;
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
    async loginAsAdmin({ commit }, params) {
      await api.requestToApi("POST", "auth/login", params).then((data) => {
        commit("setClubId", data.id);
        localStorage.setItem("clubToken", JSON.stringify(data.access_token));
      });
    },
    async verifyAuth({ commit }, idClub) {
      let token = localStorage.getItem("clubToken");

      if (token) {
        await api
          .requestToApiByAdmin("POST", "auth/me", JSON.parse(token))
          .then((data) => {
            commit("verifyAuth", data.id == idClub);
          });
      }
    },
    async logout({ commit }) {
      let token = localStorage.getItem("clubToken");

      await api
        .requestToApiByAdmin("POST", "auth/logout", JSON.parse(token))
        .then((data) => {
          localStorage.removeItem("clubToken");
          commit("verifyAuth", false);
        });
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
