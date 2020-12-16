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
          <v-card-title>{{ getUser().name }}</v-card-title>
          <v-card-subtitle>{{ roleToText(getUser().role) }} - {{ getUser().klass }}</v-card-subtitle>
          <img
            v-if="getUser().photo_path"
            :src="`http://localhost:3000/${getUser().photo_path}`"
          >
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
import LoansModule from '../store/modules/LoansModule';
import RoleChecker from '@/helpers/RoleChecker';
import roleToText from '@/helpers/roleToText';
import { User, UserModuleType } from '@/types';

@Component({
  components: {
    CigCanvas,
    AddLoan,
    LoanListComponent,
  },
})
export default class Profile extends Vue {
  private usersModule: UserModuleType = UsersModule;
  private RoleChecker: RoleChecker = RoleChecker;
  private roleToText: Function = roleToText;

  private created(): void {
    LoansModule.fetchAll();
  }

  private getUser(): User {
    let id: number = parseInt(this.$route.params.id);
    return this.usersModule.all[id];
  }
}
</script>
