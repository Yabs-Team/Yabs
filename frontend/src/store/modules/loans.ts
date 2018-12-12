import Vue from 'vue';
import LoansAPI from '../../api/loans';

interface LoanState {
  loans: {};
  failure: any;
}

// initial state
const loanState: LoanState = {loans: {}, failure: null};

// getters
const getters = {
  all: (state: LoanState) => {
    return state.loans;
  },
};

// actions
const actions = {
  all(context: any, request: any) {
    return new Promise((resolve, reject) => {
      LoansAPI.all()
        .then((response: any) => {
          response.forEach((loan: any) => context.commit('setLoan', loan));
          resolve();
        })
        .catch((error: any) => {
          context.commit('failure', error);
          reject(error);
        });
    });
  },
  create(context: any, request: any) {
    return new Promise((resolve, reject) => {
      LoansAPI.create(request)
        .then((response: any) => {
          context.commit('setLoan', response);
          resolve(response);
        })
        .catch((error: any) => {
          context.commit('failure', error);
          reject(error);
        });
    });
  },
  update(context: any, request: any) {
    return new Promise((resolve, reject) => {
      LoansAPI.update(request)
        .then((response: any) => {
          context.commit('setLoan', response);
          resolve(response);
        })
        .catch((error: any) => {
          context.commit('failure', error);
          reject(error);
        });
    });
  },
  delete(context: any, request: any) {
    return new Promise((resolve, reject) => {
      LoansAPI.delete(request)
        .then((response: any) => {
          context.commit('removeLoan', response);
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
  setLoan(state: LoanState, payload: any) {
    Vue.set(state.loans, payload.id, payload);
  },
  removeLoan(state: LoanState, loanId: string) {
    Vue.delete(state.loans, loanId);
  },
  failure(state: LoanState, payload: any) {
    state.failure = payload;
  },
};

export default {
  namespaced: true,
  state: loanState,
  getters,
  actions,
  mutations,
};
