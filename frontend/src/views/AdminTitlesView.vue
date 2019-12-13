<template>
  <div>
    <h1 class="display-2">Titles</h1>
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
import { Vue, Component, Prop } from 'vue-property-decorator';
import TitleFormComponent from '@/components/TitleFormComponent.vue';
import TitleListComponent from '@/components/TitleListComponent.vue';

@Component({
  components: {
    TitleFormComponent,
    TitleListComponent
  }
})
export default class AdminTitlesView extends Vue {}
</script>

<style scoped>
.flex {
  display: flex;
}

.flex > div {
  flex: 1;
}
</style>
