import { createStore, createLogger } from "vuex";
import api from "../api.js";

export default createStore({
  state: {
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
    async getDuels({ commit }, idClub) {
      await api.requestToApi("GET", `duels/${idClub}`).then((data) => {
        commit("setClubDuels", data.data);
      });
    },
    async getTournaments({ commit }, idClub) {
      await api.requestToApi("GET", `tournaments/${idClub}`).then((data) => {
        commit("setClubTournaments", data.data);
      });
    },
  },
});
