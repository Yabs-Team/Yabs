<!--
  This template has some events and eventlisteners that are created and listed below such
  as the sendimages and is the parent component to the cardformcomponent and the canvas
  container component
 -->

<template>
  <v-container>
    <h1 class="display-2">
      Cards
    </h1>
    <v-row>
      <v-col>
        <CardFormComponent @sendImages="onSendImages($event)" />  
      </v-col>
      <v-col class="btn-parent">
        <v-btn class="ma-auto" @click="">Ladda ner alla kort</v-btn>
        <v-btn class="ma-auto">Spara alla bilder</v-btn>
        <v-btn class="ma-auto">Ta bort alla kort</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <CanvasContainer 
        v-if="images.length > 0"
        :images="images" 
        @deleteCard="removeCardByIndex"
      />
    </v-row>

    <div class="flex">
    </div>
  </v-container>
</template>

<script lang="ts">
import { ref, defineComponent, SetupContext, Ref } from '@vue/composition-api';
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
    const images: Ref<File[]> = ref([]);
  
    // The on send images getter takes the image from the event target and sets it to the instance
    // of the image
  
    function onSendImages(sendImages: File[]): void {
      console.log(sendImages);
      images.value = images.value.concat(sendImages);
      console.log(images.value);
    }

    function removeCardByIndex(index : number): void{
      images.value.splice(index, 1);
    }
  
    UsersModule.fetchAll();

    return {
      images, onSendImages, removeCardByIndex
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

.btn-parent{
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
}
</style>
