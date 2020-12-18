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
import { Vue, Component } from 'vue-property-decorator';
import TitlesModule from '../store/modules/TitlesModule';
import TitleFormComponent from '@/components/TitleFormComponent.vue';
import TitleListComponent from '@/components/TitleListComponent.vue';

@Component({
  components: {
    TitleFormComponent,
    TitleListComponent
  }
})

// This component is a parent view for the components TitleFormComponent and the
// TitleListComponent

export default class AdminTitlesView extends Vue {

  // The created() function is the constructor in vue and instantiates the class by fetching
  // all the titles from the backend

  private created(): void {
    TitlesModule.fetchAll();
  }
}
</script>

<style scoped>
.flex {
  display: flex;
}

.flex > div {
  flex: 1;
}
</style>
