<template>
  <div class="base">
    <b-navbar
      type="dark"
      variant="primary"
      toggleable
    >
      <b-navbar-toggle target="nav_dropdown_collapse" />
      <b-collapse
        id="nav_dropdown_collapse"
        is-nav
      >
        <b-navbar-nav>
          <b-nav-item>
            <router-link
              class="link"
              to="/"
            >
              Start
            </router-link>
          </b-nav-item>
          <b-nav-item v-if="usersModule.currentUser">
            <router-link
              class="link"
              :to="`/users/${usersModule.currentUser.uid}`"
            >
              Profil
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link
              class="link"
              to="/add"
            >
              Lägg till
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link
              class="link"
              to="/find"
            >
              Hitta
            </router-link>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-brand>Yabs</b-navbar-brand>
      <GoogleLogin />
    </b-navbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import GoogleLogin from '@/components/GoogleLogin.vue';
import UsersModule from '../store/modules/UsersModule';

@Component({
  components: {
    GoogleLogin,
  },
})
export default class HeaderNav extends Vue {
  public usersModule = UsersModule;
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

