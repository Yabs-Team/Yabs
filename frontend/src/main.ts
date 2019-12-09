import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead);

const app = new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  render: (h) => h(App),
});

