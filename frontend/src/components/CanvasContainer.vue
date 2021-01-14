<template>
  <div
    class="cig-card"
  >
    <CigCanvas
      v-for="(image, index) in images"
      :key="index"
      class="canvas mt-5 mb-5"
      :image="image"
      :index="index"
      :send-canvas="downloadAll"
      :save-picture-trigger="saveAllPictures"
      @deleteCard="$emit('deleteCard', index)"
      @imageSent="cardGateKeeper"
      @falsifySendCanvas="$emit('falsifySendCanvas')"
    />

    <BaseModal
      :show-modal="showModal"
      :header="'Ett av dina kort du vill ladda ner saknar användare'"
      :body="'Något eller några av passerkorten du försöker ladda ner saknar användare. Vill du ladda ner alla bilder, oavsett om de är kopplade till en användare?'"
      :actions="dialogButtons"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, SetupContext } from '@vue/composition-api';
import CigCanvas from '@/components/CigCanvas.vue';
import FileSaver from 'file-saver';
import JSZip from 'jszip';
import BaseModal from '@/components/BaseModal.vue';

// This is the canvas container component for the cards for the users (students)

interface CanvasContainerProps {
  images: File[]
}

export default defineComponent({
  name: 'CanvasContainer',
  components: {
    CigCanvas, BaseModal
  },

  props: {
    images: {type: Array, default: []},
    saveAllPictures: {type: Boolean, default: false},
    downloadAll: {type: Boolean, default: false}
  },

  setup(props : CanvasContainerProps, { emit, root }: SetupContext){
    let imageBlobs: Blob[] = [];
    let showModal = ref(false);
    let emptyCardExists: boolean = false;
    let dialogButtons = [
      {text: 'Nej', action: ():void => { showModal.value = false; downloadAll(true);}},
      {text: 'Ja', action: ():void => {showModal.value = false; downloadAll(false);}},
    ];

    let imageBlobsWithData: Blob[] = [];
    
    // The onImageReceived method takes an image and then compares it to the instance of images 
    // and if they are the same length, the ZIP file of that image is being downloaded 
    // through the donwloadAll method using the JSZIP dependency.

    function cardGateKeeper(args : {image: Blob, isEmpty: boolean}):void {
      if(args.isEmpty){
        emptyCardExists = true;
      }else{
        imageBlobsWithData.push(args.image);
      }
      
      imageBlobs.push(args.image);

      if (props.images.length === imageBlobs.length) {
        
        if(emptyCardExists){
          showModal.value = true;
        }else{
          downloadAll(false);
        }
        
        emptyCardExists = false;
      }
    }

    function downloadAll(onlyUsers : boolean): void {
      let selectedImages: Blob[] = [];
      if(onlyUsers){
        selectedImages = imageBlobsWithData;
      }else{
        selectedImages = imageBlobs;
      }

      const zip = new JSZip();
      let count: number = 0;

      selectedImages.forEach((image) => {
        count++;
        zip.file(count + '.png', image);

        if (count === selectedImages.length) {
          zip.generateAsync({ type: 'blob' }).then((zipFile: string | Blob) => {
            FileSaver.saveAs(zipFile, 'cards.zip');
          });
        }
      });

      imageBlobsWithData = [];
      imageBlobs = [];
    }

    return {
      cardGateKeeper, showModal, dialogButtons
    };
  }

});
</script>

<style lang="sass" scoped>

    .cig-card
        margin-top: 20px
        width: 100%
        height: 100%
        overflow-y: auto
        position: relative
        min-width: 0
        background-color: #fff
        background-clip: border-box
        border: 1px solid rgba(0, 0, 0, 0.125)
        border-radius: 0.25rem
        display: flex
        flex-direction: row
        flex-wrap: wrap 
        justify-content: space-evenly

    .grid-container
        margin-top: 10px
        margin-bottom: 10px
        width: 90%
        height: auto
        display: inline-grid
        grid-template-columns: 50% 50%
        grid-template-rows: auto
        grid-column-gap: 10px
        grid-row-gap: 10px

    .canvas
        place-self: center

</style>

