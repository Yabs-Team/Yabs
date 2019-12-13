import Vue from 'vue';
import Router from 'vue-router';
import * as views from '@/views';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
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
      path: '/admin',
      name: 'admin',
      component: views.AdminView,
      children: [
        {path: '', component: views.AdminDashboardView},
        {path: 'loans', component: views.AdminLoansView},
        {path: 'titles', component: views.AdminTitlesView},
        {path: 'books', component: views.AdminBooksView},
        {path: 'cards', component: views.AdminCardsView},

      ]
    },
    {
      path: '/find',
      name: 'find',
      component: views.Find,
    }
  ],
});
