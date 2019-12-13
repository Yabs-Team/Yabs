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
            to="/users"
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
        På profil sidan så ser du all relevant information angående din profil tex antal aktiva lån från dig.
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
            >
              Admin
            </v-btn>
          </router-link>
        </v-col>
      </v-row>
      <p class="title">
        Admin delen används för att skapa nya passerkort, registera nya lån och lägga till nya böcker.
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
        På hitta delen så kan du söka på allting som denna sida hanterar, Tex Elever, specifika lån eller böcker.
      </p>
    </v-container>
    <div id="right">
      <h5>Böcker som ska inlämnas snart:</h5>
      <br>
      <LoanListComponent />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoanListComponent from '@/components/LoanListComponent.vue';
import LoadingIcon from '@/components/LoadingIcon.vue';
import UsersModule from '../store/modules/UsersModule';
import TitlesModule from '../store/modules/TitlesModule';
import LoansModule from '../store/modules/LoansModule';
import BooksModule from '../store/modules/BooksModule';

@Component({
  components: {
    LoanListComponent,
    LoadingIcon,
  },
})
export default class Start extends Vue {
  public size: string = 'lg';
  public primary: string = 'primary';
  public loading: boolean = true;

  public created() {
    UsersModule.fetchAll();
    LoansModule.fetchAll();
  }
}
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
