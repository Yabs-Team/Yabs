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
          <v-card-subtitle>{{ roleToText(getUser().role) }} - {{ getUser().klass }}</v-card-subtitle>
          <v-img
            v-if="getUser().photo_path != ''"
            class="ma-a image pb-10"
            contain
            :src="`http://localhost:3000/${getUser().photo_path}`"
          >
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                  color="black lighten-5"
                />
              </v-row>
            </template>
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-card
      v-if="currentUserIsAdmin"
      class="d-flex align-start justify-center pa-4 pt-7 pb-1"
    >
      <v-file-input
        v-model="image"
        class="pa-0"
        color="deep-purple accent-4"
        label="File input"
        multiple
        placeholder="Update image"
        prepend-icon="mdi-paperclip"
        outlined
      />
      <v-btn
        class="mt-1 ml-10"
        color="primary"
        large
        @click="savePicture"
      >
        Uppdatera
      </v-btn>
    </v-card>

    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <template>
        <v-btn
          color="primary"
          text
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

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
import { User } from '@/types';


export default defineComponent({
  name: 'Profile',
  components: {
    CigCanvas,
    AddLoan,
    LoanListComponent,
  },
  setup(_ : object, { root } : SetupContext) {
    const image = ref([] as Array<File>);
    const snackbar = ref(false);
    const snackbarText = ref('');

    const currentUserIsAdmin = RoleChecker.isAdmin();

    function created() : void {
      LoansModule.fetchAll();
    } 

    function getUser():User {
      return UsersModule.all[+root.$route.params.id];
    }

    function savePicture(): void {
      let errorText = '';

      if(image.value.length == 0){
        errorText = 'No files selected. Please select an image!';
      }else if(image.value.length > 1){
        errorText = 'Too many files selected! Please select only one!';
      }

      if(errorText != ''){
        snackbarText.value = errorText;
        snackbar.value = true;
        return;
      }

      const formData = new FormData();
      formData.append('uid', root.$route.params.id);
      formData.append('image', image.value[0] as Blob);
      UsersModule.update(formData).then((response: User) => {
        snackbarText.value = 'Users image has been updated!';
      }).catch((error: object) => {
        snackbarText.value = error.toString();
      });
      
      snackbar.value = true;
    }
    return{
      UsersModule,
      currentUserIsAdmin,
      created,
      getUser,
      savePicture,
      snackbar,
      snackbarText,
      roleToText,
      image

    };
  }
});

</script>

<style lang="scss">

  .image{
    width: 50%;
    margin: auto;
  }
</style>