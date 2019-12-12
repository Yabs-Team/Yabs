<template>
  <div>
    <p v-if="!usersModule.currentUser">
      Du är inte inloggad
    </p>
    <div
      v-else
      class="view"
    >
      <div class="left">
        <h1>{{ usersModule.currentUser.name }}</h1>
        <h1>{{ usersModule.currentUser.role }} - {{ usersModule.currentUser.klass }}</h1>
        <img :src="`http://localhost:3000/${usersModule.currentUser.photo_path}`">
      </div>
      <div class="right">
        <div class="header">
          <AddLoan />
          <div class="loanText">
            <h1>Lån</h1>
          </div>
        </div>
        <div class="myCard">
          <RecentLoan />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import CigCanvas from '@/components/CigCanvas.vue';
import AddLoan from '@/components/AddLoan.vue';
import RecentLoan from '@/components/RecentLoan.vue';
import UsersModule, { User } from '../store/modules/UsersModule';

@Component({
  components: {
    CigCanvas,
    AddLoan,
    RecentLoan,
  },
})
export default class Profile extends Vue {
  private usersModule = UsersModule;
}
</script>

<style lang="sass" scoped>
    .myCard
        width: 100%
        height: 90%
        overflow-y: auto
        position: relative
        min-width: 0
        background-color: #fff
        background-clip: border-box
        border: 1px solid rgba(0, 0, 0, 0.125)
        border-radius: 0.25rem
        display: flex
        flex-direction: row
        justify-content: center

    .header
        display: flex
        flex-direction: row
        justify-content: flex-end
        margin-bottom: 10px

    .header h1
        margin: 0

    .loanText
        height: inherit
        width: auto
        display: flex
        flex-direction: column
        justify-content: center
        margin-left: 5%
        margin-right: 5%

    .right
        padding-top: 2%
</style>
