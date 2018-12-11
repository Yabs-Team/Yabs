<template lang="pug">
  div
    button(@click="signIn") Sign In
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GoogleLogin extends Vue {
  public mounted() {
    // @ts-ignore: gpAsyncInit
    window.gpAsyncInit = () => {
      // @ts-ignore: gapi
      gapi.auth.authorize({
        immediate: true,
        response_type: 'code',
        cookie_policy: 'single_host_origin',
        client_id: '959028814295-m3lldg1saq9l6tliujprr7rir6jmohqb.apps.googleusercontent.com',
        scope: 'profile email https://www.googleapis.com/auth/plus.login',
      }, (response: any) => {
        return;
      });
    };
  }

  public signIn() {
    // @ts-ignore: gapi
    gapi.auth.authorize({
      immediate: false,
      response_type: 'code',
      cookie_policy: 'single_host_origin',
      client_id: '959028814295-m3lldg1saq9l6tliujprr7rir6jmohqb.apps.googleusercontent.com',
      scope: 'profile email https://www.googleapis.com/auth/plus.login',
    }, (response: any) => {
      if (response && !response.error) {
        // google authentication succeed, now post data to server.
        this.axios.post('/auth/google_oauth2/callback', response).then((data: any) => {
          console.log(data);
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
