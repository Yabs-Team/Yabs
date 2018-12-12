import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuthenticate from 'vue-authenticate';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:3000',

  providers: {
    google: {
      clientId: '959028814295-ojio0nureo15e2l4uj2lng0goeef0k27.apps.googleusercontent.com',
      redirectUri: 'http://localhost:3000/auth/callback'
    }
  }
})

const app = new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});

