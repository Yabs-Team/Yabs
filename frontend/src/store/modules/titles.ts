import Vue from 'vue';
import TitlesAPI from '../../api/titles';

export interface Title {
  cost: number;
  created_at: string;
  id: number;
  isbn: string;
  name: string;
  title_type: string;
  updated_at: string;
}

export interface TitleObject { [id: number]: Title; }

export interface TitleState {
  titles: TitleObject;
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
    TitlesAPI.all()
             .then((response: any) => response.forEach((title: any) => context.commit('setTitle', title)))
             .catch((error: any) => context.commit('failure', error));
  },
  create(context: any, request: any) {
    TitlesAPI.create(request)
             .then((response: any) => context.commit('setTitle', response))
             .catch((error: any) => context.commit('failure', error));
  },
  update(context: any, request: any) {
    TitlesAPI.update(request)
             .then((response: any) => context.commit('setTitle', response))
             .catch((error: any) => context.commit('failure', error));
  },
  delete(context: any, request: any) {
    TitlesAPI.delete(request)
             .then((response: any) => context.commit('removeTitle', response))
             .catch((error: any) => context.commit('failure', error));
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
