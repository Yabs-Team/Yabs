<template>
  <b-card
    class="card"
    bg-variant="light"
  >
    <b-table
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :items="items"
      :fields="fields"
    />
  </b-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TitlesModule from '../store/modules/TitlesModule';

@Component
export default class RecentTitel extends Vue {
  public sortBy = 'Title';
  public sortDesc = false;
  public fields = [
    { key: 'name', sortable: false, label: 'Titel' },
    { key: 'cost', sortable: false, label: 'Kostnad' },
    { key: 'title_type', sortable: false, label: 'Typ' },
    { key: 'isbn', sortable: false, label: 'ISBN' },
  ];

  get items() {
    return Object.entries(TitlesModule.all)
      .filter(([key, value]) => {
        return !value.returned_at;
      })
      .map(([key, value]) => Object.assign(value, { '.key': key }));
  }

  public created() {
    TitlesModule.fetchAll();
  }
}
</script>

<style lang="sass" scoped>
    .card
        width: 100%
        height: 100%
        overflow-y: auto
</style>
