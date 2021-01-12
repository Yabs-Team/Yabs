<template>
  <v-container> 
    <ReturnLoanComponent />
    <h2>Add loan</h2>
    <LibraryLoanComponent />
    <h2>Your loans</h2>
    <LoanListComponent />
    <h2>Search for a book</h2> 
    <TitleListComponent />
  </v-container>
</template>

<script lang='ts'>
import { SetupContext } from '@vue/composition-api';
import LoanListComponent from '@/components/LoanListComponent.vue';
import LibraryLoanComponent from '@/components/LibraryLoanComponent.vue';
import TitleListComponent from '@/components/TitleListComponent.vue';
import ReturnLoanComponent from '@/components/ReturnLoanComponent.vue';
import LoansModule from '../store/modules/LoansModule';
import TitlesModule from '../store/modules/TitlesModule';
import BooksModule from '../store/modules/BooksModule';
import { VuexModule } from 'vuex-module-decorators';

export default ({
  name: 'LibraryView',
  components: {
    LoanListComponent,
    LibraryLoanComponent,
    TitleListComponent,
    ReturnLoanComponent,
  },
  setup(_ : object, { root } : SetupContext) : object {
    const loansModule: VuexModule = LoansModule;
    const titlesModule: VuexModule = TitlesModule;
    const booksModule: VuexModule = BooksModule;

    function created() : void {
      LoansModule.fetchAll(); 
      TitlesModule.fetchAll();
      BooksModule.fetchAll();
    }

    created();

    return { loansModule, titlesModule, booksModule, created };
  }
});
</script>

<style>

</style>