<template lang="pug">
    .base
        b-navbar(type='dark', variant='primary', toggleable='')
            b-navbar-toggle(target='nav_dropdown_collapse')
            b-collapse#nav_dropdown_collapse(is-nav='')
                b-navbar-nav
                    b-nav-item
                        router-link.link(to='/') Start
                    b-nav-item
                        router-link.link(to='/users') Profil
                    b-nav-item
                        router-link.link(to='/add') Lägg till
                    b-nav-item
                        router-link.link(to='/find') Hitta
            b-navbar-brand Yabs
            b-navbar-brand.material-icons account_circle
              GoogleLogin
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import GoogleLogin from "@/components/GoogleLogin.vue";

@Component({
  components: {
    GoogleLogin,
  }
})
export default class HeaderNav extends Vue {}
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

