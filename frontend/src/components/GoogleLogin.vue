<template>
  <v-btn
    class="ml-2"
    text
    color="grey"
  >
    <div id="signin2" />
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UsersModule from '../store/modules/UsersModule';
import { VuexModule } from 'vuex-module-decorators';

@Component
export default class GoogleLogin extends Vue {
  public usersModule: VuexModule = UsersModule;

  public mounted() {
    this.renderLoginButton();
  }

  public renderLoginButton() {

    // @ts-ignore: gapi
    gapi.signin2.render('signin2', {
      scope: 'profile email',
      width: 200,
      height: 50,
      longtitle: false,
      theme: 'dark',
      onsuccess: this.onSignIn,
      onfailure: this.onFailure,
    });
  }
  public updated() {
    this.renderLoginButton();
  }

  public onSignIn(googleUser: any) {
    const profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token;
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    UsersModule.signIn(id_token)
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        this.signOut();
      });
  }

  public onFailure(error: any) {
    // TODO: show this in a notification
    console.error(error);
  }
  public signOut() {
    // @ts-ignore: gapi
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      UsersModule.signOut();
    });
  }

}
</script>

<style lang="sass" scoped>
</style>
