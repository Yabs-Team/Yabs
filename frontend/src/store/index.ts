import Vue from 'vue';
import titles from './modules/titles';
import books from './modules/books';
import loans from './modules/loans';
import users from './modules/users';
import Vuex from 'vuex';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    titles,
    books,
    loans,
    users,
  },
  strict: debug
})
