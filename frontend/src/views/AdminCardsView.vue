<template>
  <div>
    <h1 class="display-2">Cards</h1>
    <div class="flex">
      <div style="margin-right: 50px">
        <CardFormComponent @sendImages="onSendImages($event)" />  
      </div>
      <div>
        <CanvasContainer :images="images" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import CardFormComponent from '@/components/CardFormComponent.vue';
import CanvasContainer from '@/components/CanvasContainer.vue';

@Component({
  components: {
    CardFormComponent,
    CanvasContainer
  }
})
export default class AdminCardsViews extends Vue {

  public images: File[] = [];

  public onSendImages(images: any[]) {
    this.images = images;
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
