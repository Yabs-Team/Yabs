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

  // mounted is a getter to reveive the information about the renderloginbutton

  public mounted(): void {
    this.renderLoginButton();
  }

  // renderLoginButton is used to set the information about the button without having to 
  // include any css, which is forbidden in this project, based on the class signin2 

  public renderLoginButton(): void {

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

  // Getter to get the updated version of the instance renderLoginButton

  public updated(): void {
    this.renderLoginButton();
  }

  // onSignIn takes a user from the google Api and sets the users profile with the information
  // fetched from the google api but also takes the token that is generated and setting it
  // to the id token so that the authentication is made possbile

  public onSignIn(googleUser: any): void { //eslint-disable-line @typescript-eslint/no-explicit-any
    console.log(typeof googleUser);
    const profile = googleUser.getBasicProfile();
    const idToken: string = googleUser.getAuthResponse().id_token;
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    UsersModule.signIn(idToken)
      .then((response: object) => {
        console.log(response);
      })
      .catch((error: object) => {
        console.log(error);
        this.signOut();
      });
  }

  // onfailure is a standard method used to render the error message when a process has failed

  public onFailure(error: object): void {

    // TODO: show this in a notification

    console.error(error);
  }

  // signOut takes the the authentication instance and then log out the user that matches
  // that description

  public signOut(): void {
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
