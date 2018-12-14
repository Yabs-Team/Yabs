<template lang="pug">
    b-card.card(bg-variant='light')
        b-table(:sort-by.sync='sortBy', :sort-desc.sync='sortDesc', :items='items', :fields='fields')

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from '../decorators';

@Component
export default class RecentLoan extends Vue {
  @Getter('loans/all') public loans: any;
  public sortBy = 'Utgångsdatum';
  public sortDesc = false;
  public fields = [
    { key: 'loaned_by.name', sortable: false, label: 'Lånad av' },
    { key: 'lent_by.name', sortable: false, label: 'Utlånad av' },
    { key: 'book.title.name', sortable: false, label: 'Boktitel' },
    { key: 'expiration_date', sortable: false, label: 'Utgångsdatum' },
  ];

  get items() {
    return Object.entries(this.loans)
      .filter(([k, v]) => {
        // @ts-ignore: returned at
        return !v.returned_at;
      })
      .map(([k, v]) => Object.assign(v, { '.key': k }));
  }

  public created() {
    this.$store
      .dispatch('loans/all')
      .then((loans: any) => this.$emit('loans-loaded', loans))
      .catch((failure: any) => console.log(failure));
  }
}
</script>

<style lang="sass" scoped>
    .card
        width: 100%
        height: 100%
        overflow-y: auto
</style>
