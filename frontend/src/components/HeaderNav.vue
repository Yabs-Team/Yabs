<template lang="pug">
    .base
        b-navbar(type='dark', variant='primary', toggleable='')
            b-navbar-toggle(target='nav_dropdown_collapse')
            b-collapse#nav_dropdown_collapse(is-nav='')
                b-navbar-nav
                    b-nav-item
                        router-link.link(to='/') Start
                    b-nav-item
                        router-link.link(:to="`/users/${currentUser.uid}`") Profil
                    b-nav-item
                        router-link.link(to='/add') Lägg till
                    b-nav-item
                        router-link.link(to='/find') Hitta
            b-navbar-brand Yabs
            GoogleLogin
            //- b-navbar-brand.material-icons account_circle

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import GoogleLogin from "@/components/GoogleLogin.vue";
import { Getter } from '../decorators';

@Component({
  components: {
    GoogleLogin
  }
})
export default class HeaderNav extends Vue {
  @Getter("users/currentUser") public currentUser!: any;
}
</script>

<style lang="sass" scoped>
    .link
        color: white
        font-decoration: none

    .base
        position: absolute
        z-index: 1000
        left: 0px
        right: 0px

</style>

