<!-- 
  This is the Start and root view for all of the application and includes three links, "Profil", "Admin"
  and "Hitta". It fetches all the loans and all the users from their modules in order to 
  render them in the bottom of the page
 -->

<template>
  <div class="view">
    <div id="left" />
    <v-container>
      <h1 class="text-center display-3">
        Välkommen till YABS!
      </h1>
      <br>
      <p class="title">
        Denna applikation kommer att användas för att underlätta hantering/utlåningen av olika sorters litteratur och utskrivning av passerkort.
      </p>
      <v-row>
        <v-col>
          <router-link
            class="link row-btn"
            :to="'/users/'+ usersModule.currentUserID"
          >
            <v-btn
              class="row-btn"
              :size="size"
              :color="primary"
            >
              Profil
            </v-btn>
          </router-link>
        </v-col>
      </v-row>
      <p class="title">
        På profil-sidan så ser du all relevant information angående din profil som tex antal aktiva lån.
      </p>
      <v-row>
        <v-col>
          <router-link
            class="link row-btn"
            to="/admin"
          >
            <v-btn
              class="row-btn"
              :size="size"
              :color="primary"
              data-cy="addPage"
            >
              Admin
            </v-btn>
          </router-link>
        </v-col>
      </v-row>
      <p class="title">
        Admin-sidan används för att skapa nya passerkort, registera nya lån och lägga till nya böcker.
      </p>
      <v-row>
        <v-col>
          <router-link
            class="link row-btn"
            to="/find"
          >
            <v-btn
              class="row-btn"
              :size="size"
              :color="primary"
            >
              Hitta
            </v-btn>
          </router-link>
        </v-col>
      </v-row>
      <p class="title">
        På hitta-sidan kan du söka på allting som YABS hanterar, tex elever, specifika lån eller böcker.
      </p>
    </v-container>
    <div id="right">
      <h5>Böcker som ska inlämnas snart:</h5>
      <br>
      <LoanListComponent />
    </div>
  </div>
</template>

<!-- 
  Since this is the starting page, many modules are imported but also one component called 
  LoanListComponent in order to render the loans that soon are to expire
-->
<script lang="ts">
import { SetupContext } from '@vue/composition-api';
import LoanListComponent from '@/components/LoanListComponent.vue';
import UsersModule from '../store/modules/UsersModule';
import TitlesModule from '../store/modules/TitlesModule';
import LoansModule from '../store/modules/LoansModule';
import BooksModule from '../store/modules/BooksModule';
import { VuexModule } from 'vuex-module-decorators';

export default ({
  name: '',
  components: {
    LoanListComponent
  },
  setup(_ : object, { root } : SetupContext): object {
    const size: string = 'lg';
    const primary: string = 'primary';
    const loading: boolean = true;
    const usersModule: VuexModule = UsersModule;

    // The users module is imported and used in order to get information about the current user
    // but also so that the possibility for a user to monitor its soon expiring loans.
    // The Loans Module is imported so that we can fetch all info about the loans and since
    // there is a relation between loans and users the constructor instantiates the class
    // by fetching all the information from the two modules

    function created(): void {
      if(UsersModule.currentUserID) {
        UsersModule.fetchAll();
        LoansModule.fetchAll();
      }
    }

    return {
      size,
      primary,
      loading,
      usersModule,
      created
    };
  }
});
</script>

<style lang="sass">

.info
    font-size: 1.2em


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


#wrapper
    display: flex
    flex-direction: row
    justify-content: space-between


#left
    display: flex
    flex-direction: column
    margin: 100px


#right
    margin: 100px


.container
    margin-top: 100px


.row-btn
    width: inherit
    margin-bottom: 10px


</style>
