<template lang="pug">
  div
    a.text-warning(v-if="current_user" href="#" @click="signOut();") SIGN OUT
    div#signin2
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from "../decorators";

@Component
export default class GoogleLogin extends Vue {
  @Getter("users/currentUser") public current_user: any;

  public mounted() {
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
    this.$store.dispatch("users/signIn", id_token).then((response: any) => {
      console.log(response);
    });
  }

  public onFailure(error) {
    // TODO: show this in a notification
    console.error(error);
  }

  public signOut() {
    let that = this;
    // @ts-ignore: gapi
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      that.$store.dispatch("users/signOut");
    });
  }
}
</script>

<style lang="sass" scoped>
</style>
