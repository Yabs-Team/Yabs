import Vue from 'vue';
import TitlesAPI from '../../api/titles';

interface TitleState {
  titles: {};
  failure: any;
}

// initial state
const titleState: TitleState = {titles: {}, failure: null};

// getters
const getters = {
  all: (state: TitleState) => {
    return state.titles;
  },
};

// actions
const actions = {
  all(context: any, request: any) {
    return new Promise(function(resolve, reject) {
      TitlesAPI.all()
        .then((response: any) => {
          response.forEach((title: any) => context.commit('setTitle', title));
          resolve();
        })
        .catch((error: any) => {
          context.commit('failure', error);
          reject(error);
        });
    });
  },
  create(context: any, request: any) {
    return new Promise(function(resolve, reject) {
      TitlesAPI.create(request)
        .then((response: any) => {
          context.commit('setTitle', response);
          resolve(response);
        })
        .catch((error: any) => {
          context.commit('failure', error);
          reject(error);
        });
    });
  },
  update(context: any, request: any) {
    return new Promise(function(resolve, reject) {
      TitlesAPI.update(request)
        .then((response: any) => {
          context.commit('setTitle', response);
          resolve(response);
        })
        .catch((error: any) => {
          context.commit('failure', error);
          reject(error);
        });
    });
  },
  delete(context: any, request: any) {
    return new Promise(function(resolve, reject) {
      TitlesAPI.delete(request)
        .then((response: any) => {
          context.commit('removeTitle', response);
          resolve(response);
        })
        .catch((error: any) => {
          context.commit('failure', error);
          reject(error);
        });
    });
  },
};

// mutations
const mutations = {
  setTitle(state: TitleState, payload: any) {
    Vue.set(state.titles, payload.id, payload);
  },
  removeTitle(state: TitleState, titleId: string) {
    Vue.delete(state.titles, titleId);
  },
  failure(state: TitleState, payload: any) {
    state.failure = payload;
  },
};

export default {
  namespaced: true,
  state: titleState,
  getters,
  actions,
  mutations,
};
