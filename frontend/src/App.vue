<template>
  <v-app>
    <NavbarComponent />
    <div class="main">
      <v-content>
        <router-view />
      </v-content>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavbarComponent from '@/components/NavbarComponent.vue';

@Component({
  components: {
    NavbarComponent,
  },
})
export default class App extends Vue {}
</script>

<style lang="sass">

.app
  width: 100vw
  height: 100vh

.main
  margin-top: 66px
  padding: 50px !important

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
