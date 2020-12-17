<template>
  <v-card v-if="!UsersModule.currentUser">
    <v-card-text>
      Du är inte inloggad
    </v-card-text>
  </v-card>
  <v-container v-else>
    <v-row>
      <v-col col="12">
        <v-card>
          <v-card-title>{{ getUser().name }}</v-card-title>
          <v-card-subtitle>{{ getUser().role }} - {{ getUser().klass }}</v-card-subtitle>
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
import { ref, defineComponent, SetupContext } from '@vue/composition-api';
import CigCanvas from '@/components/CigCanvas.vue';
import AddLoan from '@/components/AddLoan.vue';
import LoanListComponent from '@/components/LoanListComponent.vue';
import UsersModule from '../store/modules/UsersModule';
import LoansModule from '../store/modules/LoansModule';
import RoleChecker from '@/helpers/RoleChecker';
import roleToText from '@/helpers/roleToText';
import { User, UserModuleType } from '@/types';


export default defineComponent({
  name: 'Profile',
  components: {
    CigCanvas,
    AddLoan,
    LoanListComponent,
  },
  setup(_ : object, { root } : SetupContext) {

    function created() : void {
      LoansModule.fetchAll();
    } 

    function getUser():User {
      return UsersModule.all[+root.$route.params.id];
    }
    return{
      UsersModule,
      RoleChecker,
      created,
      getUser
    };
  }


})
</script>