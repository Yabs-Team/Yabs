<template>
    <v-data-table
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

@Component
export default class LoanListComponent extends Vue {
  private loansModule: VuexModule = LoansModule;
  private headers: object[] = [
    { text: 'Lånad av', key: 'loaned_by.name', sortable: false },
    { text: 'Utlånad av', key: 'lent_by.name', sortable: false },
    { text: 'Boktitel', key: 'book.title.name', sortable: false },
    { text: 'Utgångsdatum', key: 'expiration_date', sortable: false },
  ];
}
</script>

<style lang="sass" scoped>
    .card
        width: 100%
        height: 100%
        overflow-y: auto
</style>
