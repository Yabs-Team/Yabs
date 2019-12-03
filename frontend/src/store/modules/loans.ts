import Vue from 'vue';
import LoansAPI from '../../api/loans';

export interface Loan {
  book: object;
  book_id: number;
  created_at: string;
  expiration_date: string;
  id: number;
  lent_by: object;
  lent_by_id: number;
  loaned_by: object;
  loaned_by_id: number;
  returned_at: string|null;
  updated_at: string;
}
export interface LoanObject {[id: number]: Loan; }

export interface LoanState {
  loans: LoanObject;
  failure: any;
}

// initial state
export const loanState: LoanState = {loans: {}, failure: null};

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
          console.log(response);
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
