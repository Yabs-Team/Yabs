<template lang="pug">
  div
    a.text-warning(v-if="currentUser" href="#" @click="signOut();") SIGN OUT
    div#signin2
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from '../decorators';

@Component
export default class GoogleLogin extends Vue {
  @Getter('users/currentUser') public currentUser!: any;

  public mounted() {
    // @ts-ignore: gapi
    gapi.signin2.render('signin2', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: this.onSignIn,
      onfailure: this.onFailure,
    });
  }

  public onSignIn(googleUser: any) {
    const profile = googleUser.getBasicProfile();
    const id_token = googleUser.getAuthResponse().id_token;
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    this.$store.dispatch('users/signIn', id_token).then((response: any) => {
      console.log(response);
    }).catch((error: any) => {
      this.signOut();
    });
  }

  public onFailure(error: any) {
    // TODO: show this in a notification
    console.error(error);
  }

  public signOut() {
    const that = this;
    // @ts-ignore: gapi
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      that.$store.dispatch('users/signOut');
    });
  }
}
</script>

<style lang="sass" scoped>
</style>
