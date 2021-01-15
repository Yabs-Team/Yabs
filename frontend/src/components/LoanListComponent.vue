<template>
  <ListComponent
    :headers="headers"
    :items="LoansModule.allAsArray"
    class="elevation-1"
  />
</template>

<script lang="ts">
import LoansModule from '../store/modules/LoansModule';

import ListComponent from '@/components/ListComponent.vue';
import { defineComponent, SetupContext } from '@vue/composition-api';

export default defineComponent({
  name: 'LoanListComponent',
  components: {
    ListComponent
  },
  setup(_ : object, ctx : SetupContext) {
    const headers: object[] = [
      { text: 'Lånad av', value: 'loaned_by.name' },
      { text: 'Utlånad av', value: 'lent_by.name' },
      { text: 'Boktitel', value: 'book.title.name' },
      { text: 'Utgångsdatum', value: 'expiration_date' },
      { text: 'Streckkod', value: 'book_id' }
    ];
    return { LoansModule, headers };
  }
});
</script>

<style lang="sass" scoped>
    .card
        width: 100%
        height: 100%
        overflow-y: auto
</style>
