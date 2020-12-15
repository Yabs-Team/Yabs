import Vue from 'vue';
import VueRouter, { RouterOptions } from 'vue-router';
import { RouteConfig } from 'vue-router/types/router';
import * as views from '@/views';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'start',
    component: views.Start,
  },
  {
    path: '/users/:id',
    name: 'profile',
    component: views.Profile,
  },
  {
    path: '/books/:id',
    name: 'edit book',
    component: views.EditBook,
  },
  {
    path: '/admin',
    name: 'admin',
    component: views.AdminView,
    children: [
      {path: '', component: views.AdminDashboardView},
      {path: 'loans', component: views.AdminLoansView},
      {path: 'titles', component: views.AdminTitlesView},
      {path: 'books', component: views.AdminBooksView},
      {path: 'cards', component: views.AdminCardsView},
      {path: 'users', component: views.AdminUsersView},
    ]
  },
  {
    path: '/find',
    name: 'find',
    component: views.Find,
  },
  {
    path: '/library',
    name: 'library',
    component: views.Library,
  }
];
const options: RouterOptions = {
  base: process.env.BASE_URL,
  mode: 'history',
  routes,
};
export default new VueRouter(options);