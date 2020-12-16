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
            class="ma-a image pb-10"
            contain
            :src="`http://localhost:3000/${usersModule.currentUser.photo_path}`"
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

    <v-card class="d-flex align-start justify-center pa-4 pt-7 pb-1" v-if="RoleChecker.isAdmin()">
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
import { Component, Vue, Watch } from 'vue-property-decorator';
import CigCanvas from '@/components/CigCanvas.vue';
import AddLoan from '@/components/AddLoan.vue';
import LoanListComponent from '@/components/LoanListComponent.vue';
import UsersModule from '../store/modules/UsersModule';
import { VuexModule } from 'vuex-module-decorators';
import LoansModule from '../store/modules/LoansModule';
import RoleChecker from '@/helpers/RoleChecker';
import { User } from '@/types';

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
  public image: File[] = [];
  public snackbar: Boolean = false;
  public snackbarText: String = '';

  private created(): void {
    LoansModule.fetchAll();
  }

  public savePicture(): void {
    let errorText = '';

    if(this.image.length == 0){
      errorText = 'No files selected. Please select an image!';
    }else if(this.image.length > 1){
      errorText = 'Too many files selected! Please select only one!';
    }

    if(errorText != ''){
      this.snackbarText = errorText;
      this.snackbar = true;
      return;
    }

    const formData = new FormData();
    formData.append('uid', this.$route.params.id);
    formData.append('image', this.image[0] as Blob);
    UsersModule.update(formData).then((response: User) => {
      console.log('user updated profile!');
    }).catch((error: object) => {
      // TODO: show in notification to user
      this.snackbarText = error.toString();
      this.snackbar = true;
      console.error(error);
    });
  }
}
</script>

<style lang="scss">

  .image{
    width: 50%;
    margin: auto;
  }
</style>
