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
import { defineComponent } from '@vue/composition-api';
import BooksModule from '../store/modules/BooksModule';
import ListComponent from '@/components/ListComponent.vue';
import { VuexModule } from 'vuex-module-decorators';

export default defineComponent({
  name: 'BookListComponent',
  components: {
    ListComponent
  },
  setup() {
    const booksModule: VuexModule = BooksModule;
    const headers = [
      { text: 'Titel', value: 'title.name' },
      { text: 'Skick', value: 'condition' },
      { text: 'Sträckkod', value: 'barcode' },
    ] as object;

    return {
      booksModule,
      headers
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
