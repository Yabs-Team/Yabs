<template>
  <ListComponent
    :headers="headers"
    :items="booksModule.allAsArray"
    :items-per-page="5"
    class="elevation-1"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BooksModule from '../store/modules/BooksModule';
import { VuexModule } from 'vuex-module-decorators';
import ListComponent from '@/components/ListComponent.vue';

@Component({
  components: {
    ListComponent
  }
})
export default class BookListComponent extends Vue {
  private booksModule: VuexModule = BooksModule;
  public headers: object[] = [
    { text: 'Titel', value: 'title.name', sortable: false },
    { text: 'Status', value: 'status', sortable: false },
    { text: 'Sträckkod', value: 'barcode', sortable: false },
  ];
}
</script>

<style lang="sass" scoped>
    .card
        width: 100%
        height: 100%
        overflow-y: auto
</style>
