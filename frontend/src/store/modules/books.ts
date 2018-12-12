import Vue from 'vue';
import BooksAPI from '../../api/books';

interface BookState {
  books: {};
  failure: any;
}

// initial state
const bookState: BookState = {books: {}, failure: null};

// getters
const getters = {
  all: (state: BookState) => {
    return state.books;
  },
};

// actions
const actions = {
  all(context: any, request: any) {
    return new Promise((resolve, reject) => {
      BooksAPI.all()
        .then((response: any) => {
          response.forEach((book: any) => context.commit('setBook', book));
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
      BooksAPI.create(request)
        .then((response: any) => {
          context.commit('setBook', response);
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
      BooksAPI.update(request)
        .then((response: any) => {
          context.commit('setBook', response);
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
      BooksAPI.delete(request)
        .then((response: any) => {
          context.commit('removeBook', response);
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
  setBook(state: BookState, payload: any) {
    Vue.set(state.books, payload.barcode, payload);
  },
  removeBook(state: BookState, bookId: string) {
    Vue.delete(state.books, bookId);
  },
  failure(state: BookState, payload: any) {
    state.failure = payload;
  },
};

export default {
  namespaced: true,
  state: bookState,
  getters,
  actions,
  mutations,
};
