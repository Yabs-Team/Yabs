<template lang="pug">
    .view
        #left
        v-container
            h1.text-center Välkommen till YABS!
            br
            p.info Denna applikation kommer att användas för att underlätta hantering/utlåningen av olika sorters litteratur och utskrivning av passerkort.
            br
            v-row
                v-col
                    router-link.link.row-btn(to='/users')
                        v-btn.row-btn(:size="size" :color="primary") Profil
            p.info På profil sidan så ser du all relevant information angående din profil tex antal aktiva lån från dig.
            br
            v-row
                v-col
                    router-link.link.row-btn(to='/add')
                        v-btn.row-btn(:size="size" :color="primary") Lägg till
            p.info Lägg till delen används för att skapa nya passerkort, registera nya lån och lägga till nya böcker.
            br
            v-row
                v-col
                    router-link.link.row-btn(to='/find')
                        v-btn.row-btn(:size="size" :color="primary") Hitta
            p.info På hitta delen så kan du söka på allting som denna sida hanterar, Tex Elever, specifika lån eller böcker.

        #right
            h5 Böcker som ska inlämnas snart:
            br
            LoadingIcon(v-show='loading')
            .myCard(v-show='!loading')
                RecentLoan(@loans-loaded='onLoaded')

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import RecentLoan from '@/components/RecentLoan.vue';
import LoadingIcon from '@/components/LoadingIcon.vue';
import UsersModule from '../store/modules/UsersModule';
import TitlesModule from '../store/modules/TitlesModule';
import LoansModule from '../store/modules/LoansModule';
import BooksModule from '../store/modules/BooksModule';

@Component({
  components: {
    RecentLoan,
    LoadingIcon,
  },
})
export default class Start extends Vue {
  public size = 'lg';
  public primary = 'primary';
  public loading = true;

  public onLoaded() {
    this.loading = false;
  }
  public created() {
    UsersModule.fetchAll();
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
