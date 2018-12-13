<template lang="pug">
    .root
        b-button(@click="getAllCanvases") Ladda ned alla kort
        .card
            .grid-container
                CigCanvas.canvas(@imageSent='onImageReceived($event)' v-for="(image, index) in images" :key="index" v-bind:userData="userData" v-bind:image="image" v-bind:sendCanvas="sendCanvas")
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import CigCanvas from '@/components/CigCanvas.vue';
import FileSaver from 'file-saver';
import JSZip from 'jszip';
import { UserObject } from '../store/modules/users';

@Component({
    components: {
        CigCanvas,
    },
})
export default class CanvasContainer extends Vue {

    @Prop({default: null}) public userData!: UserObject;
    @Prop({default: []}) public images!: string[];

    public sendCanvas: boolean = false;
    public imageBlobs: any[] = [];

    public getAllCanvases() {
        this.sendCanvas = !this.sendCanvas;
    }

    public onImageReceived(image: any) {
        this.imageBlobs.push(image);
        if (this.images.length === this.imageBlobs.length) {
            this.downloadAll();
        }
    }

    public downloadAll() {
        const zip = new JSZip();
        let count: number = 0;

        this.imageBlobs.forEach( (image) => {
            count++;
            zip.file(count + '.png', image);

            if (count === this.imageBlobs.length) {
                zip.generateAsync({type: 'blob'}).then((zipFile: any) => {
                    FileSaver.saveAs(zipFile, 'cards.zip');
                });
            }
        });

    }


}
</script>

<style lang="sass" scoped>
    .root
        display: flex
        flex-direction: column
        height: 100%
        width: 100%

    .card
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
        justify-content: center
        
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

