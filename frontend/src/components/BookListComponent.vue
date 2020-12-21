<!--
  This vue template takes all the books and places them into an array due to the prop
  "items" from the parent component.
-->

<template>
  <ListComponent
    :headers="headers"
    :items="BooksModule.allAsArray"
    :route-path="'books'"
    :route-specifier="'barcode'"
    class="elevation-1"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import BooksModule from '../store/modules/BooksModule';
import ListComponent from '@/components/ListComponent.vue';
import { defineComponent } from '@vue/composition-api';


export default defineComponent ({
  name: 'BookListComponent',
  components: { ListComponent },
  setup(){
    const headers: object[] = [
      { text: 'Titel', value: 'title.name' },
      { text: 'Skick', value: 'condition' },
      { text: 'Sträckkod', value: 'barcode' },
      { text: 'Tillgänglighet', value: 'availability' },
    ];
    return {
      BooksModule,
      headers,
    };
  }
});


</script>

<style lang="sass" scoped>
    .card
        width: 100%
        height: 100%
        overflow-y: auto
</style>
