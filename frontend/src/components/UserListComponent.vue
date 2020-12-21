<template>
  <ListComponent
    :headers="headers"
    :items="usersModule.allAsArray"
    :items-per-page="5"
    :route-path="routePath"
    :route-specifier="routeSpecifier"
    :use-actions="true"
    class="elevation-1"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import UsersModule from '../store/modules/UsersModule';
import { VuexModule } from 'vuex-module-decorators';
import ListComponent from '@/components/ListComponent.vue';

export default defineComponent({
  name: 'LoanListComponent',
  components: {
    ListComponent
  },
  setup() {
    const usersModule: VuexModule = UsersModule;
    const headers: object[] = [
      { text: 'Namn', value: 'name' },
      { text: 'Email', value: 'email' },
      { text: 'Klass', value: 'klass' },
    ];
    const routePath: string = 'users';
    const routeSpecifier: string = 'uid'; // Placeholder

    return {
      usersModule,
      headers,
      routePath,
      routeSpecifier
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