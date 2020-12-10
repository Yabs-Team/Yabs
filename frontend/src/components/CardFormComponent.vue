<template>
  <div>
    <v-file-input
      data-cy="file-input"
      id="file"
      class="input-file"
      multiple
      outlined
      accept="image/*, .zip"
      @change="onFileSelect"
    />
    <v-btn
      data-cy="add-file"
      color="primary"
      large
      @click="submit"
    >
      Lägg till
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from 'vue-property-decorator';
import UsersModule from '../store/modules/UsersModule';
import JSZip, { JSZipObject } from 'jszip';

// Component for the card form for the user to insert information about them such as
// role, name and uid

@Component
export default class CardFormComponent extends Vue {
  public files: File[] = [];

  // Constructor for instantiating the class and fetching all the users from the userModule

  public created(): void {
    UsersModule.fetchAll();
  }

  // Eventlistener that emits the informations about that specific event higher up in the 
  // component tree

  public submit(): void {
    this.$emit('sendImages', this.files);
  }

  // Eventlistener that takes a list of instances of the object File and checks the type
  // of the file and confirms that it is a zip file and then extracts the content to render
  // else simply pushes the content into the instance this.files

  public onFileSelect(fileList: File[]): void {
    for (const fileObject of fileList) {
      if (fileObject.type === 'application/zip') {
        this.extractFiles(fileObject);
      } else {
        this.files.push(fileObject);
      }
    }
  }

  // loadFileData takes three arguments, a list of files, the index of the list of files
  // and the data of that file as the third argument. It then loads the file by creating 
  // a new file with the correct data, "files[fileIndex].name" to get the correct name.

  public loadFileData(files: JSZipObject[], fileIndex: number, fileData: BlobPart): void {
    const file = new File([fileData], files[fileIndex].name, {
      type: 'image/jpeg',
    });
    this.files.push(file);
  }

  // loadFiles takes a extracted zip file and loops through the content in order to 
  // make sure that the zip file has support for MACOSX then inserts the content into the
  // load file data in order to make the format correct

  public loadFiles(extZip: JSZip): void {
    const files: JSZipObject[] = Object.values(extZip.files);
    for (let i = 0; i < files.length; i++) {
      if (files[i].name.includes('__MACOSX/') === false) {
        extZip.files[files[i].name]
          .async('blob')
          .then((fileData: BlobPart) => this.loadFileData(files, i, fileData))
          .catch((error: object) => {
            console.log('Error2: ' + error);
          });
      }
    }
  }

  // The extractFiles method takes a zip file and creates a new instance of the class JSZip
  // and then asyncronasily loads the files into the instance of loadFiles

  public extractFiles(zip: File): void {
    const newZip = new JSZip();

    newZip
      .loadAsync(zip)
      .then(this.loadFiles)
      .catch((error: object) => {
        console.log('Error1: ' + error);
      });
  }
}
</script>

<style lang="sass">
    img
        height: 200px

</style>
