<template lang="pug">
  div
    div#signin2
    a(href="#" @click="signOut();") Sign out
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UsersAPI from '../api/users';

@Component
export default class GoogleLogin extends Vue {

  response = "";

  // public options = {
  //   response_type: 'code',
  //   cookie_policy: 'single_host_origin',
  //   client_id: '959028814295-ojio0nureo15e2l4uj2lng0goeef0k27.apps.googleusercontent.com',
  //   scope: 'profile email',
  // };

  public mounted() {
    // // @ts-ignore: gpAsyncInit
    // window.gpAsyncInit = () => {
    //   // @ts-ignore: gapi
    //   gapi.auth.authorize(Object.assign(this.options, {immediate: true}), (response: any) => {
    //     return;
    //   });
    // };
    // @ts-ignore: gapi
    gapi.signin2.render('signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onSignIn,
      'onfailure': this.onFailure
    });
  }

  public onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    let id_token = googleUser.getAuthResponse().id_token;
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    UsersAPI.signIn(id_token).then((response: any) => {
      console.log(response);
    });
  }

  public onFailure(error) {
    console.error(error);
  }

  public signOut() {
    // @ts-ignore: gapi
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  // public signIn() {
  //   this.axios.get('https://www.googleapis.com/plus/v1/people/me/openIdConnect&key=959028814295-ojio0nureo15e2l4uj2lng0goeef0k27.apps.googleusercontent.com').then((response: any) => {
  //     this.response = response;
  //     console.log(response);
  //   });
//     let that = this;
// /*
//     // @ts-ignore: gapi
//     let options = new gapi.auth2.SigninOptionsBuilder();
//     options.setAppPackageName('johanneberg.loan.app');
//     //options.setFetchBasicProfile(true);
//     options.set
//     options.setPrompt('select_account');
//     options.setScope('profile').setScope('email');

//     console.log(gapi.auth2);*/

//     // @ts-ignore: gapi
//     gapi.auth.authorize(Object.assign(this.options, {immediate: false})).then((response: any) => {
//       console.log("got here");
//       if (response && !response.error) {
//         // google authentication succeed, now post data to server.
//         delete response['g-oauth-window'];
//         that.axios.post('auth/google_oauth2', JSON.stringify(response), {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }).then((data: any) => {
//           console.log(data);
//         }).catch((error: any) => {
//           console.log(error);
//         });
//       } else {
//         console.log(response);
//         // google authentication failed
//       }
//     });
  //}
}
</script>

<style lang="sass" scoped>
</style>
