<template lang="pug">
    b-card.card(bg-variant='light')
        b-table(:sort-by.sync='sortBy', :sort-desc.sync='sortDesc', :items='items', :fields='fields')

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from '../decorators';

@Component
export default class RecentTitel extends Vue {
      @Getter('books/all') public books: any;
      public sortBy = 'Title';
      public sortDesc = false;
      public fields = [
        { key: 'title.name', sortable: false, label: 'Titel' },
        { key: 'status', sortable: false, label: 'Status'},
        { key: 'barcode', sortable: false, label: 'Sträckkod' },
      ];

    get items() {
        return Object.entries(this.books).filter(([k, v]) => {
          // @ts-ignore: returned at
          return !v.returned_at;
        }).map(([k, v]) => Object.assign(v, {'.key': k}));
    }

    public created() {
        this.$store.dispatch('books/all');
      }
    }
</script>

<style lang="sass" scoped>
    .card
        width: 100%
        height: 100%
        overflow-y: auto
</style>