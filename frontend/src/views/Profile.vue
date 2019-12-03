<template lang="pug">
    div
      p(v-if="!currentUser") Du är inte inloggad
      .view(v-else)
          .left
              h1 {{currentUser.name}}
              h1 {{currentUser.role}} - {{currentUser.klass}}
              img(:src="`http://localhost:3000/${currentUser.photo_path}`")
          .right
              .header
                  AddLoan
                  .loanText
                      h1 Lån
              .myCard
                  RecentLoan
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import CigCanvas from '@/components/CigCanvas.vue';
import AddLoan from '@/components/AddLoan.vue';
import RecentLoan from '@/components/RecentLoan.vue';
import { User, UserObject } from '../store/modules/users';
import { Getter } from '../decorators';

@Component({
    components: {
        CigCanvas,
        AddLoan,
        RecentLoan,
    },
})
export default class Profile extends Vue {
  @Getter('users/all') public users!: UserObject;

  public currentUser: User | null = null;

  public created() {
    this.$store.dispatch('users/all').then(() => {
      const users: any[] = Object.entries(this.users);
      console.log(users);
      if (users) { this.currentUser = users.find(([k, user]) => user.uid == this.$route.params.id)[1]; }
    });
  }
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
