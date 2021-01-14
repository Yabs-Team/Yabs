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
        <v-btn
          class="ma-auto"
          @click="getAllCanvas"
        >
          Ladda ner alla kort
        </v-btn>
        <v-btn
          class="ma-auto"
          @click="saveAll"
        >
          Spara alla bilder
        </v-btn>
        <v-btn
          class="ma-auto"
          @click="images = []"
        >
          Ta bort alla kort
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <CanvasContainer 
        v-if="images.length > 0"
        :images="images" 
        :download-all="downloadAll"
        :save-all-pictures="saveAllPictures"
        @deleteCard="removeCardByIndex"
      />
    </v-row>

    <div class="flex" />
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
    const saveAllPictures: Ref<boolean> = ref(false);
    const downloadAll: Ref<boolean> = ref(false);
    
  
    // The on send images getter takes the image from the event target and sets it to the instance
    // of the image
  
    function onSendImages(sendImages: File[]): void {
      images.value = images.value.concat(sendImages);
    }

    function getAllCanvas(): void{
      downloadAll.value = true;
      root.$nextTick(() => {
        downloadAll.value = false;
      });
    }

    function saveAll(): void{
      saveAllPictures.value = true;
      root.$nextTick(() => {
        saveAllPictures.value = false;
      });
    }

    function removeCardByIndex(index : number): void{
      images.value.splice(index, 1);
    }
  
    UsersModule.fetchAll();

    return {
      images, onSendImages, removeCardByIndex, downloadAll, saveAll, saveAllPictures, getAllCanvas
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
