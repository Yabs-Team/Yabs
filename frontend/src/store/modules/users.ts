import Vue from 'vue';
import UsersAPI from '../../api/users';

interface UserState {
  users: {};
  current_user: {} | null;
  failure: any;
}

// initial state
const userState: UserState = {users: {}, current_user: null, failure: null};

// getters
const getters = {
  all: (state: UserState) => {
    return state.users;
  },
  currentUser: (state: UserState) => {
    return state.current_user;
  }
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
  signIn(context: any, request: any) {
    return new Promise((resolve, reject) => {
      UsersAPI.signIn(request)
        .then((response: any) => {
          context.commit('setCurrentUser', response);
          resolve(response);
        })
        .catch((error: any) => {
          context.commit('failure', error);
          reject(error);
        });
    });
  },
  signOut(context: any) {
    return new Promise((resolve, reject) => {
      UsersAPI.signOut()
        .then((response: any) => {
          context.commit('setCurrentUser', null);
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
  setUser(state: UserState, payload: any) {
    Vue.set(state.users, payload.uid, payload);
  },
  setCurrentUser(state: UserState, payload: any) {
    state.current_user = payload;
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
