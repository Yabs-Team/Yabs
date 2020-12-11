<template>
  <div class="pb-10">
    <v-app-bar
      fixed
      class="nav"
    >
      <v-toolbar-items>
        <v-btn
          to="/"
          text
        >
          <v-icon class="px-3">
            mdi-home
          </v-icon>Yabs
        </v-btn>
      </v-toolbar-items>
      <v-spacer />
      <v-toolbar-items v-if="usersModule.currentUser">
        <v-btn
          :to="'/users/'+ usersModule.currentUserID"
          text
        >
          <v-icon class="px-3">
            account_circle
          </v-icon>Profil
        </v-btn>
        <v-btn
          to="/admin"
          text
        >
          <v-icon class="px-3">
            add_circle
          </v-icon>Admin
        </v-btn>
        <v-btn
          class="ml-2 mr-5"
          text
          color="grey"
          @click="signOut"
        >
          <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-else>
        <GoogleLogin />
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import GoogleLogin from '@/components/GoogleLogin.vue';
import UsersModule from '../store/modules/UsersModule';
import { VuexModule } from 'vuex-module-decorators';

export default{
  name: 'Navbar',
  components: { GoogleLogin },
  setup() : void{
    async function SignOut() : Promise<void> {
      try {
        // @ts-ignore: gapi
        const auth2 = await gapi.auth2.getAuthInstance();
        await auth2.signOut();
        await UsersModule.signOut();
      } catch (e) {
        UsersModule.signOut();
      }
    }
  }
};
</script>

<style>
a:hover {
  text-decoration: none !important;
}
a:active,
a:focus {
  outline: 0;
  border: none;
  -moz-outline-style: none;
  outline-style: none;
}
button:active,
button:focus {
  outline: 0 !important;
  border: none !important;
  -moz-outline-style: none;
  outline-style: none;
}

input:-webkit-autofill {
  background-color: transparent !important;
  background-image: none !important;
  color: #000000 !important;
}

input:-webkit-autofill {
  -webkit-box-shadow: 200px 200px 100px white inset;
  box-shadow: 200px 200px 100px white inset;
}
</style>

