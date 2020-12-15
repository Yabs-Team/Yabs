<template>
  <ListComponent
    :headers="headers"
    :items="titlesModule.allAsArray"
    route-path="admin/titles"
    route-specifier="isbn"
    :use-actions="true"
    class="elevation-1"
  />
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api';
import TitlesModule from '../store/modules/TitlesModule';
import { VuexModule } from 'vuex-module-decorators';
import ListComponent from '@/components/ListComponent.vue';

// The TitleListComponent inherits the information about the titles from the titles module
// and the headers that are created in the headers object

export default defineComponent({
  name: 'TitleListComponent',
  components: {
    ListComponent
  },
  setup(_: object, { root }: SetupContext) {
    const titlesModule: VuexModule = TitlesModule;

    const headers: object[] = [
      { text: 'Titel', value: 'name' },
      { text: 'Kostnad', value: 'cost' },
      { text: 'Typ', value: 'title_type' },
      { text: 'ISBN', value: 'isbn' }
    ];
    
    return { titlesModule, headers };
  }
});
</script>

<style lang="sass" scoped>
    .card
        width: 100%
        height: 100%
        overflow-y: auto
</style>
