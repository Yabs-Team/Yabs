<template>
  <v-app>
    <HeaderNav />
    <router-view />

  </v-app>

</template>

<style lang="sass">

.app
  width: 100vw
  height: 100vh

.app .view
  position: absolute
  z-index: 100
  top: 56px
  bottom: 0
  width: 100vw
  display: flex
  flex-direction: row
  margin: 5000


.view .left
  width: 50%
  height: 100%
  padding: 10%
  padding-top: 5%

.view .right
  width: 50%
  height: 100%
  padding: 5%
  padding-left: 0px

@media only screen and (max-width: 808px)
  .app .view
    flex-direction: column

  .view .right, .left
    width: 100%
    display: flex
    flex-direction: row
    justify-content: center
    padding: 0px
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HeaderNav from '@/components/HeaderNav.vue';

@Component({
  components: {
    HeaderNav,
  },
})
export default class App extends Vue {}
</script>
