<template lang="pug">
    b-card.card(bg-variant='light')
        b-table(:sort-by.sync='sortBy', :sort-desc.sync='sortDesc', :items='items', :fields='fields')

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from '../decorators';
import { TitleObject } from '../store/modules/titles';

@Component
export default class RecentTitel extends Vue {
      @Getter('titles/all') public titles!: TitleObject;
      public sortBy = 'Title';
      public sortDesc = false;
      public fields = [
        { key: 'name', sortable: false, label: 'Titel' },
        { key: 'cost', sortable: false, label: 'Kostnad'},
        { key: 'title_type', sortable: false, label: 'Typ' },
        { key: 'isbn', sortable: false, label: 'ISBN' },
      ];

    get items() {
        return Object.entries(this.titles).filter(([k, v]) => {
          return !v.returned_at;
        }).map(([k, v]) => Object.assign(v, {'.key': k}));
    }

      public created() {
        this.$store.dispatch('titles/all');
      }
    }
</script>

<style lang="sass" scoped>
    .card
        width: 100%
        height: 100%
        overflow-y: auto
</style>
