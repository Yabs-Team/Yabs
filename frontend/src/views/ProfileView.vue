<template>
  <v-card v-if="!usersModule.currentUser">
    <v-card-text>
      Du är inte inloggad
    </v-card-text>
  </v-card>
  <v-container v-else>
    <v-row>
      <v-col col="12">
        <v-card>
          <v-card-title>{{ usersModule.currentUser.name }}</v-card-title>
          <v-card-subtitle>{{ RoleChecker.roleAsText() }} - {{ usersModule.currentUser.klass }}</v-card-subtitle>
          <v-img
            v-if="usersModule.currentUser.photo_path"
            :src="usersModule.currentUser.photo_path"
          />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col col="12">
        <v-card>
          <v-card-actions>
            <v-card-title>Lån</v-card-title>
            <v-spacer />
            <AddLoan />
          </v-card-actions>
          <LoanListComponent />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import CigCanvas from '@/components/CigCanvas.vue';
import AddLoan from '@/components/AddLoan.vue';
import LoanListComponent from '@/components/LoanListComponent.vue';
import UsersModule from '../store/modules/UsersModule';
import { VuexModule } from 'vuex-module-decorators';
import LoansModule from '../store/modules/LoansModule';
import RoleChecker from '@/helpers/RoleChecker';

@Component({
  components: {
    CigCanvas,
    AddLoan,
    LoanListComponent,
  },
})
export default class Profile extends Vue {
  private usersModule: VuexModule = UsersModule;
  private RoleChecker: RoleChecker = RoleChecker;

  private created(): void {
    console.log(this.usersModule);
    LoansModule.fetchAll();
  }
}
</script>

<style lang="scss">

</style>