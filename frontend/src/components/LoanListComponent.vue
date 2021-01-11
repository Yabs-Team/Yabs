<template>
  <ListComponent
    :headers="headers"
    :items="loansModule.allAsArray"
    class="elevation-1"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LoansModule from '../store/modules/LoansModule';
import { VuexModule } from 'vuex-module-decorators';
import ListComponent from '../components/ListComponent.vue';


// This component is used as a Parent element and therefore has the headers object to 
// send down the component tree using props in Vue and in this specific example, sending 
// down the headers for the loan table

@Component({
  components: {
    ListComponent
  }
})

export default class LoanListComponent extends Vue {
  private loansModule: VuexModule = LoansModule;
  private headers: object[] = [
    { text: 'Lånad av', value: 'loaned_by.name' },
    { text: 'Utlånad av', value: 'lent_by.name' },
    { text: 'Boktitel', value: 'book.title.name' },
    { text: 'Utgångsdatum', value: 'expiration_date' },
  ];
}
</script>

<style lang="sass" scoped>
    .card
        width: 100%
        height: 100%
        overflow-y: auto
</style>
