import Vue from 'vue';
import UsersAPI from '../../api/users';

export interface User {
  created_at: string;
  email: string;
  google_token: string;
  klass: string;
  name: string;
  photo_path: string;
  role: string;
  uid: number;
  updated_at: string;
}

export interface UserObject { [uid: number]: User; }

export interface UserState {
  users: UserObject;
  failure: any;
}

// initial state
export const userState: UserState = {users: {}, failure: null};

// getters
const getters = {
  all: (state: UserState) => {
    return state.users;
  },
};

// actions
const actions = {
  all(context: any, request: any) {
    UsersAPI.all()
             .then((response: any) => response.forEach((user: any) => context.commit('setUser', user)))
             .catch((error: any) => context.commit('failure', error));
  },
  update(context: any, request: any) {
    UsersAPI.update(request)
             .then((response: any) => context.commit('setUser', response))
             .catch((error: any) => context.commit('failure', error));
  },
};

// mutations
const mutations = {
  setUser(state: UserState, payload: any) {
    Vue.set(state.users, payload.uid, payload);
  },
  failure(state: UserState, payload: any) {
    state.failure = payload;
  },
};

export default {
  namespaced: true,
  state: userState,
  getters,
  actions,
  mutations,
};
