<template>
    <v-data-table
      :headers="headers"
      :items="titlesModule.allAsArray"
      :items-per-page="5"
      class="elevation-1"
    />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TitlesModule from '../store/modules/TitlesModule';
import { VuexModule } from 'vuex-module-decorators';

@Component
export default class TitleListComponent extends Vue {
  private titlesModule: VuexModule = TitlesModule;
  private headers: object[] = [
    { text: 'Titel', value: 'name', sortable: false },
    { text: 'Kostnad', value: 'cost', sortable: false },
    { text: 'Typ', values: 'title_type', sortable: false },
    { text: 'ISBN', values: 'isbn', sortable: false },
  ]
}
</script>

<style lang="sass" scoped>
    .card
        width: 100%
        height: 100%
        overflow-y: auto
</style>
