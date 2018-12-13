<template lang="pug">
    div
        b-card(bg-variant='light')
            //- lable(for="file", name="file") Välj en eller flera billder/zipfiler
            input.input-file(multiple type="file" id="file" name="file" accept="image/*, .zip" @change="onFileSelect")
            br
            br
            b-button(@click='submit' variant='primary') Lägg till

</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from 'vue-property-decorator';
import { Getter } from '../decorators';
import JSZip from 'jszip';

@Component
export default class CigForm extends Vue {
    public files: string[] = [];
    public fileList: File[] = [];

    @Getter('users/all') public users: any;

    public created() {
      this.$store.dispatch('users/all');
      this.$emit('sendUserData', this.users);
    }

    public submit() {
      this.$emit('sendImages', this.files);
      const formData = new FormData();
      formData.append('uid', '1804583927');
      formData.append('image', this.fileList[0]);
      console.log(this.$store.dispatch('users/update', formData));
    }

    public onFileSelect(event: any) {
      this.fileList = event.srcElement.files;

      for (const fileObject of this.fileList) {
        if (fileObject.type === 'application/zip') {
          this.extractFiles(fileObject);
        } else {
          this.files.push(URL.createObjectURL(fileObject));
        }
      }
    }

    public loadFileData(files: any[], fileIndex: number, fileData: any) {
      const file = new File([fileData], files[fileIndex].name, { type: 'image/jpeg' });
      this.files.push(URL.createObjectURL(file));
    }

    public loadFiles(extZip: any) {
      const files: any = Object.values(extZip.files);
      for (let i = 0; i < files.length; i++) {
        if (files[i].name.includes('__MACOSX/') === false) {
          extZip.files[files[i].name].async('blob')
            .then((fileData: any) => this.loadFileData(files, i, fileData))
            .catch((error: any) => {
                console.log('Error2: ' + error);
            });
        }
      }
    }

    public extractFiles(zip: any) {
      const newZip = new JSZip();

      newZip.loadAsync(zip)
        .then(this.loadFiles)
        .catch( (error: any) => {
            console.log('Error1: ' + error);
        });
    }

}
</script>

<style lang="sass">
    img
        height: 200px

</style>
