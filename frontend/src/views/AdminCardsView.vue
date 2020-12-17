<!--
  This template has some events and eventlisteners that are created and listed below such
  as the sendimages and is the parent component to the cardformcomponent and the canvas
  container component
 -->

<template>
  <div>
    <h1 class="display-2">
      Cards
    </h1>
    <div class="flex">
      <div style="margin-right: 50px">
        <CardFormComponent @sendImages="onSendImages($event)" />  
      </div>
      <div v-if="images.length > 0">
        <CanvasContainer :images="images" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, SetupContext } from '@vue/composition-api';
import CardFormComponent from '@/components/CardFormComponent.vue';
import CanvasContainer from '@/components/CanvasContainer.vue';
import UsersModule from '../store/modules/UsersModule';

export default defineComponent({
  name: 'AdminCardsView',
  components: {
    CardFormComponent,
    CanvasContainer
  },
  setup(_: object, { root }: SetupContext) {
    const images: File[] = ref([]);
  
    // The on send images getter takes the image from the event target and sets it to the instance
    // of the image
  
    function onSendImages(sendImages: File[]): void {
      this.images = sendImages;
    }
  
    function created(): void {
      UsersModule.fetchAll();
    }

    created();
    return {
      images, onSendImages
    };
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
