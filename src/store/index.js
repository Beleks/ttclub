import { createStore, createLogger } from "vuex";
import api from "../api.js";

export default createStore({
  state: {
    clubs: [],
  },
  mutations: {
    setClubs(state, clubs) {
      state.clubs = clubs;
    },
  },
  actions: {
    async getClubs({ commit }) {
      await api.requestToApi("GET", `clubs`).then((data) => {
        commit("setClubs", data.data);
      });
    },
  },
});
