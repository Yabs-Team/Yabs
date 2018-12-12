<template lang="pug">
  div
    button(@click="signIn") Sign In
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GoogleLogin extends Vue {

  public options = {
    response_type: 'code',
    cookie_policy: 'single_host_origin',
    client_id: '959028814295-ojio0nureo15e2l4uj2lng0goeef0k27.apps.googleusercontent.com',
    scope: 'profile email',
  };

  public mounted() {
    // @ts-ignore: gpAsyncInit
    window.gpAsyncInit = () => {
      // @ts-ignore: gapi
      gapi.auth.authorize(Object.assign(this.options, {immediate: true}), (response: any) => {
        return;
      });
    };
  }

  public signIn() {
    let that = this;
/*
    // @ts-ignore: gapi
    let options = new gapi.auth2.SigninOptionsBuilder();
    options.setAppPackageName('johanneberg.loan.app');
    //options.setFetchBasicProfile(true);
    options.set
    options.setPrompt('select_account');
    options.setScope('profile').setScope('email');

    console.log(gapi.auth2);*/

    // @ts-ignore: gapi
    gapi.auth.authorize(Object.assign(this.options, {immediate: false})).then((response: any) => {
      console.log("got here");
      if (response && !response.error) {
        // google authentication succeed, now post data to server.
        delete response['g-oauth-window'];
        that.axios.post('auth/google_oauth2', JSON.stringify(response), {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((data: any) => {
          console.log(data);
        }).catch((error: any) => {
          console.log(error);
        });
      } else {
        console.log(response);
        // google authentication failed
      }
    });
  }
}
</script>

<style lang="sass" scoped>
</style>
