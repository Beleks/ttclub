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
    record: {
      duel: {},
      tournament: {
        players: [],
        stages: [],
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

    // record Duels, Tournaments into store
    recordDuel(state, duelPlayers) {
      let duel = {
        score1: 0,
        score2: 0,
        // assign player1, player2
      };
      state.record.duel = Object.assign(duel, duelPlayers);
    },
    recordScoreDuel(state, { score1, score2 }) {
      state.record.duel.score1 = score1;
      state.record.duel.score2 = score2;
    },
    recordTournamentPlayers(state, tournamentPlayers) {
      state.record.tournament.players.push(tournamentPlayers);
    },
    fillTournamentStage(state, stageDuels) {
      state.record.tournament.stages.push(stageDuels);
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

    // club create
    async createPlayer({ commit }, player) {
      let token = localStorage.getItem("clubToken");

      await api
        .requestToApiByAdmin("POST", `create/player`, JSON.parse(token), player)
        .then((data) => {
          console.log("created");
        });
    },

    async createDuel({ commit }, duel) {
      let token = localStorage.getItem("clubToken");

      await api
        .requestToApiByAdmin("POST", `create/duel`, JSON.parse(token), duel)
        .then((data) => {
          console.log("created");
        });
    },

    // record Duels, Tournaments into store
    recordDuel({ commit }, duel) {},
    recordTournament({ commit }, tournamentPlayers) {
      commit("recordTournamentPlayers", tournamentPlayers);
      let currentStage = 0;
      let playersLeft = tournamentPlayers.length;
      do {
        let stageDuels = [];
        for (let index = 0; index < playersLeft; index += 2) {
          let pair = {};
          if (currentStage == 0) {
            pair = {
              id1: tournamentPlayers[index].id,
              id2: tournamentPlayers[index + 1].id,
              score1: 0,
              score2: 0,
            };
          } else {
            pair = {
              id1: null,
              id2: null,
              score1: 0,
              score2: 0,
            };
          }
          stageDuels.push(pair);
        }
        commit("fillTournamentStages", stageDuels);
        playersLeft = playersLeft / 2;
        currentStage++;
      } while (!(playersLeft == 1));
    },
  },
});
