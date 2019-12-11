<template>
  <b-card class="card" bg-variant="light">
    <b-table :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :items="items" :fields="fields" />
  </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BooksModule from '../store/modules/BooksModule';

@Component
export default class RecentTitel extends Vue {
  public sortBy = 'Title';
  public sortDesc = false;
  public fields = [
    { key: 'title.name', sortable: false, label: 'Titel' },
    { key: 'status', sortable: false, label: 'Status' },
    { key: 'barcode', sortable: false, label: 'Sträckkod' },
  ];

  get items() {
    return Object.entries(BooksModule.all)
      .filter(([key, value]) => {
        // @ts-ignore: returned at
        return !value.returned_at;
      })
      .map(([key, value]) => Object.assign(value, { '.key': key }));
  }

  public created() {
    BooksModule.fetchAll();
  }
}
</script>

<style lang="sass" scoped>
    .card
        width: 100%
        height: 100%
        overflow-y: auto
</style>
