<template>
  <ListComponent
    :headers="headers"
    :items="loansModule.allAsArray"
    :items-per-page="5"
    class="elevation-1"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LoansModule from '../store/modules/LoansModule';
import { VuexModule } from 'vuex-module-decorators';
import ListComponent from '@/components/ListComponent.vue';

@Component({
  components: {
    ListComponent
  }
})
export default class LoanListComponent extends Vue {
  private loansModule: VuexModule = LoansModule;
  private headers: object[] = [
    { text: 'Lånad av', value: 'loaned_by.name', sortable: false },
    { text: 'Utlånad av', value: 'lent_by.name', sortable: false },
    { text: 'Boktitel', value: 'book.title.name', sortable: false },
    { text: 'Utgångsdatum', value: 'expiration_date', sortable: false },
  ];
}
</script>

<style lang="sass" scoped>
    .card
        width: 100%
        height: 100%
        overflow-y: auto
</style>
