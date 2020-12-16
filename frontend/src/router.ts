import Vue from 'vue';
import VueRouter, { RouterOptions } from 'vue-router';
import { RouteConfig } from 'vue-router/types/router';
import * as views from '@/views';

Vue.use(VueRouter);

function loadView(view: string): object {
  return (): object => import(`@/views/${view}.vue`);
};

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'start',
    component: loadView('Start'),
  },
  {
    path: '/users/:id',
    name: 'profile',
    component: loadView('ProfileView'),
  },
  {
    path: '/books/:id',
    name: 'edit book',
    component: loadView('EditBook'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: loadView('AdminView'),
    children: [
      {path: '', component: views.AdminDashboardView},
      {path: 'loans', component: views.AdminLoansView},
      {path: 'titles', component: views.AdminTitlesView},
      {path: 'titles/:id', component: views.AdminTitlesEditView},
      {path: 'books', component: views.AdminBooksView},
      {path: 'cards', component: views.AdminCardsView},
      {path: 'users', component: views.AdminUsersView},
    ]
  },
  {
    path: '/find',
    name: 'find',
    component: loadView('FindView'),
  },
  {
    path: '/library',
    name: 'library',
    component: loadView('LibraryView')
  }
];
const options: RouterOptions = {
  base: process.env.BASE_URL,
  mode: 'history',
  routes,
};
export default new VueRouter(options);
