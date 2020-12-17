<template>
  <div>
    <h1 class="display-2">
      Titles
    </h1>
    <div class="flex">
      <div style="margin-right: 50px">
        <TitleFormComponent />
      </div>
      <div>
        <TitleListComponent />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import TitlesModule from '../store/modules/TitlesModule';
import TitleFormComponent from '@/components/TitleFormComponent.vue';
import TitleListComponent from '@/components/TitleListComponent.vue';

// This component is a parent view for the components TitleFormComponent and the
// TitleListComponent

export default defineComponent({
  name: 'AdminTitlesView',
  components: {
    TitleFormComponent,
    TitleListComponent
  },
  setup() {

    // The created() function is the constructor in vue and instantiates the class by fetching
    // all the titles from the backend
  
    function created(): void {
      TitlesModule.fetchAll();
    }

    created();
  }
});
</script>

<style scoped>
.flex {
  display: flex;
}

.flex > div {
  flex: 1;
}
</style>
