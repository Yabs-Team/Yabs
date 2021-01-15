<template>
  <v-btn
    class="ml-2"
    text
    color="grey"
  >
    <div
      id="signin2"
      ref="signin2"
    />
  </v-btn>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, SetupContext } from '@vue/composition-api';
import UsersModule from '../store/modules/UsersModule';

export default defineComponent({
  name: 'GoogleLogin',
  setup(_: Object, {root}: SetupContext){
    const signin2: Ref<HTMLDivElement | null> = ref(null);
    // renderLoginButton is used to set the information about the button without having to
    // include any css, which is forbidden in this project, based on the class signin2

    function renderLoginButton(): void {
      // @ts-ignore: gapi
      gapi.signin2.render('signin2', {
        scope: 'profile email',
        width: 200,
        height: 50,
        longtitle: false,
        theme: 'dark',
        onsuccess: onSignIn,
        onfailure: onFailure,
      });
    }


    // onSignIn takes a user from the google Api and sets the users profile with the information
    // fetched from the google api but also takes the token that is generated and setting it
    // to the id token so that the authentication is made possbile

    function onSignIn(googleUser: any): void { //eslint-disable-line @typescript-eslint/no-explicit-any
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
          signOut();
        });
    }

    // onfailure is a standard method used to render the error message when a process has failed

    function onFailure(error: object): void {
      // TODO: show this in a notification
      console.error(error);
    }

    // signOut takes the the authentication instance and then log out the user that matches
    // that description

    function signOut(): void {
      // @ts-ignore: gapi
      const auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        UsersModule.signOut();
      });
    };

    // mounted is a getter to reveive the information about the renderloginbutton

    root.$nextTick(() => {
      renderLoginButton();
    });

    return{
      renderLoginButton, onSignIn, onFailure, signin2
    };
  },
});
</script>

<style lang="sass" scoped>
</style>
