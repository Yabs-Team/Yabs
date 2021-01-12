<template>
  <div>
    <h1 class="display-2">
      Titles
    </h1>
    <div>
      <TitleFormComponent
        :form-data="data"
        mode="edit"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, SetupContext } from '@vue/composition-api';
import TitlesModule from '../store/modules/TitlesModule';
import TitleFormComponent from '@/components/TitleFormComponent.vue';
import { Title } from '../types';

export default defineComponent({
  name: 'AdminTitlesEditView',
  components: {
    TitleFormComponent
  },
  setup(_: object, { root }: SetupContext) {
    const data = ref();
    TitlesModule.fetchSingleByISBN(root.$route.params.id).then((response: Title) => {
      data.value = response;
    });
    return { data };
  }
});
</script>

<style scoped>
</style>
