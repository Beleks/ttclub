import { createStore, createLogger } from "vuex";
import api from "../api.js";

export default createStore({
  state: {
    clubs: [],
    currentClub: {
      players: [],
    },
  },
  mutations: {
    setClubs(state, clubs) {
      state.clubs = clubs;
    },
    setClubPlayers(state, players) {
      state.currentClub.players = players;
    },
  },
  actions: {
    async getClubs({ commit }) {
      await api.requestToApi("GET", "clubs").then((data) => {
        commit("setClubs", data.data);
      });
    },
    async getPlayers({ commit }, idClub) {
      await api.requestToApi("GET", `players/${idClub}`).then((data) => {
        commit("setClubPlayers", data.data);
      });
    },
  },
});
