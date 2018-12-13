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
      path: '/users',
      name: 'profile',
      component: views.Profile,
    },
    {
      path: '/add',
      name: 'add',
      component: views.Add,
    },
    {
      path: '/find',
      name: 'find',
      component: views.Find,
    },
  ],
});
