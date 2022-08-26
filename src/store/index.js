import { createStore, createLogger } from "vuex";
import api from "../api.js";

export default createStore({
  state: {
    admin: {
      id: null,
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
        type: "classic",
        players: [],
        stages: [],
        currentDuel: {
          id1: 0,
          id2: 0,
        },
        readyToSave: false,
      },
    },
  },
  getters: {
    getPlayerById: (state) => (idPlayer) => {
      return state.currentClub.players.find((player) => player.id === idPlayer);
    },
    getTournamentById: (state) => (idTournament) => {
      return state.currentClub.history.tournaments.find((tournament) => tournament.id == idTournament);
    },
  },
  mutations: {
    verifyAuth(state, { isAuth, clubInfo }) {
      state.admin = clubInfo;
      state.isAuth = isAuth;
    },
    setClubId(state, id) {
      state.admin.id = id;
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
    setClubTournamentsInfo(state, { idTournament, stages }) {
      state.currentClub.history.tournaments.find((tournament) => tournament.id == idTournament).stages = stages;
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
      state.record.tournament.players = tournamentPlayers;
    },
    fillTournamentStage(state, stageDuels) {
      state.record.tournament.stages.push(stageDuels);
    },
    setTournamentCurrentDuel(state, duel) {
      state.record.tournament.currentDuel = duel;
    },
    setResultTournamentDuel(state, { score, stage, indexDuel }) {
      Object.assign(state.record.tournament.stages[stage][indexDuel], score);
    },
    movingPlayerToNextStage(state, { nextStage, indexDuel, winnerId, pos }) {
      state.record.tournament.stages[nextStage][indexDuel][pos] = winnerId;
    },
    //
    // ???
    tournamentCanSave(state, canSave) {
      state.record.tournament.readyToSave = canSave;
    },
    /// END ???
    resetTornamentRecord(state) {
      state.record.tournament = {
        type: "classic",
        players: [],
        stages: [],
        currentDuel: {
          id1: 0,
          id2: 0,
        },
        readyToSave: false,
      };
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
        await api.requestToApiByAdmin("POST", "auth/me", JSON.parse(token)).then((data) => {
          commit("verifyAuth", { isAuth: data.id == idClub, clubInfo: data });
        });
      }
    },
    async logout({ commit }) {
      let token = localStorage.getItem("clubToken");

      await api.requestToApiByAdmin("POST", "auth/logout", JSON.parse(token)).then((data) => {
        localStorage.removeItem("clubToken");
        commit("verifyAuth", { isAuth: false, clubInfo: data });
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
    async getTournamentInfo({ commit, state }, idTournament) {
      await api.requestToApi("GET", `tournaments/${idTournament}/duelsinfo`).then((data) => {
        let begin = 1;
        let duelsInStage = 1;
        let editedDuels = 0;
        let stages = data.data;

        // change keys
        stages.forEach((duel) => {
          duel.id1 = duel.id_first;
          duel.id2 = duel.id_second;
          duel.score1 = duel.score_first;
          duel.score2 = duel.score_second;
          // delete
          delete duel.id_first;
          delete duel.id_second;
          delete duel.score_first;
          delete duel.score_second;
        });
        // ===

        stages.reverse();

        let duels = [];
        do {
          editedDuels = editedDuels + duelsInStage;
          let stageDuels = stages.slice(begin - 1, begin + duelsInStage - 1);
          duels.push(stageDuels);
          duelsInStage *= 2;
          begin *= 2;
        } while (editedDuels < stages.length);

        stages = duels;
        stages.reverse();

        commit("setClubTournamentsInfo", {
          idTournament,
          stages,
        });
      });
    },

    // club create
    async createPlayer({ commit }, player) {
      let token = localStorage.getItem("clubToken");

      await api.requestToApiByAdmin("POST", `create/player`, JSON.parse(token), player).then((data) => {
        console.log("created");
      });
    },

    async createDuel({ commit }, duel) {
      let token = localStorage.getItem("clubToken");

      await api.requestToApiByAdmin("POST", `create/duel`, JSON.parse(token), duel).then((data) => {
        console.log("created");
      });
    },

    async createTournament({ state, commit }) {
      let tournament = {
        number_participants: state.record.tournament.players.length,
        type: state.record.tournament.type,
        duels: [],
      };
      state.record.tournament.stages.forEach((duels) => {
        tournament.duels = tournament.duels.concat(duels);
      });
      for (let index = 0; index < tournament.duels.length; index++) {
        tournament.duels[index] = {
          id_first: tournament.duels[index].id1,
          id_second: tournament.duels[index].id2,
          score_first: tournament.duels[index].score1,
          score_second: tournament.duels[index].score2,
          index_duel: index,
        };
      }

      let token = localStorage.getItem("clubToken");

      await api.requestToApiByAdmin("POST", "create/tournament", JSON.parse(token), tournament).then((data) => {
        commit("resetTornamentRecord");
      });
    },

    // record Duels, Tournaments into store
    // recordDuel({ commit }, duel) {},
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
        commit("fillTournamentStage", stageDuels);
        playersLeft = playersLeft / 2;
        currentStage++;
      } while (!(playersLeft == 1));
    },
    handlingTournamentDuelResult({ commit, state }, { score, stage, indexDuel, winnerId }) {
      commit("setResultTournamentDuel", {
        score,
        stage,
        indexDuel,
      });
      let pos = "";
      if (indexDuel % 2 == 0) {
        pos = "id1";
      } else {
        pos = "id2";
      }
      if (Number(stage) + 1 == state.record.tournament.stages.length) {
        commit("tournamentCanSave", true);
      } else {
        commit("movingPlayerToNextStage", {
          nextStage: Number(stage) + 1,
          indexDuel: Math.floor(indexDuel / 2),
          winnerId,
          pos,
        });
      }
    },
  },
});
