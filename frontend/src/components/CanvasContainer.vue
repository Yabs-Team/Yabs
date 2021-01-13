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
      @imageSent="onImageReceived($event)"
      @falsifySendCanvas="$emit('falsifySendCanvas')"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, Ref, SetupContext } from '@vue/composition-api';
import CigCanvas from '@/components/CigCanvas.vue';
import FileSaver from 'file-saver';
import JSZip from 'jszip';

// This is the canvas container component for the cards for the users (students)

interface CanvasContainerProps {
  images: File[]
}

export default defineComponent({
  name: 'CanvasContainer',
  components: {
    CigCanvas,
  },

  props: {
    images: {type: Array, default: []},
    saveAllPictures: {type: Boolean, default: false},
    downloadAll: {type: Boolean, default: false}
  },

  setup(props : CanvasContainerProps, { emit, root }: SetupContext){
    let imageBlobs: Blob[] = [];
    
    // Eventlistener GetAllCanvases is simply used in order to fetch all the canvases. 

    function emitIndex(e : number): void{
      emit('deleteCard', e);
    }

    // The onImageReceived method takes an image and then compares it to the instance of images 
    // and if they are the same length, the ZIP file of that image is being downloaded 
    // through the donwloadAll method using the JSZIP dependency.

    function onImageReceived(image: Blob): void {
      imageBlobs.push(image);
      if (props.images.length === imageBlobs.length) {
        downloadAll();
      }
    }

    function downloadAll(): void {
      const zip = new JSZip();
      let count: number = 0;

      imageBlobs.forEach((image) => {
        count++;
        zip.file(count + '.png', image);

        if (count === imageBlobs.length) {
          zip.generateAsync({ type: 'blob' }).then((zipFile: string | Blob) => {
            FileSaver.saveAs(zipFile, 'cards.zip');
          });
        }
      });
    }

    return {
      emitIndex, onImageReceived
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

