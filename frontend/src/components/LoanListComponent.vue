<template>
  <ListComponent
    :headers="headers"
    :items="loansModule"
    class="elevation-1"
  />
</template>

<script lang="ts">
import { Prop } from 'vue-property-decorator';
import LoansModule from '../store/modules/LoansModule';
import { VuexModule } from 'vuex-module-decorators';
import ListComponent from '@/components/ListComponent.vue';
import { ref, defineComponent} from '@vue/composition-api';

// This component is used as a Parent element and therefore has the headers object to 
// send down the component tree using props in Vue and in this specific example, sending 
// down the headers for the loan table

export default defineComponent({
  name: 'TitleFormComponent',
  components: {
    ListComponent
  },
  setup(_ : object, ctx : object) : object {

    const loansModule : any = LoansModule.allAsArray ;
  
    const headers : object[] = [
      { text: 'Lånad av', value: 'loaned_by.name' },
      { text: 'Utlånad av', value: 'lent_by.name' },
      { text: 'Boktitel', value: 'book.title.name' },
      { text: 'Utgångsdatum', value: 'expiration_date' },
      { text: 'Streckkod', value: 'book_id' }
    ];
    return { loansModule, headers };
  }
});
</script>

<style lang="sass" scoped>
    .card
        width: 100%
        height: 100%
        overflow-y: auto
</style>