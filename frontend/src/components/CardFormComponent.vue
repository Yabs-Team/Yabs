<template>
  <div>
    <v-file-input
      id="file"
      data-cy="file-input"
      class="input-file"
      multiple
      label="Välj bilder eller zip-filer..."
      hide-details
      outlined
      accept="image/*, .zip"
      @change="onFileSelect"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api';
import UsersModule from '../store/modules/UsersModule';
import JSZip, { JSZipObject } from 'jszip';

// Component for the card form for the user to insert information about them such as
// role, name and uid

export default defineComponent({
  name: 'CardFormComponent',
  setup(_: object, { root, emit }: SetupContext){
    let files: File[] = [];
  
    // Constructor for instantiating the class and fetching all the users from the userModule
  
    UsersModule.fetchAll();

    // Eventlistener that takes a list of instances of the object File and checks the type
    // of the file and confirms that it is a zip file and then extracts the content to render
    // else simply pushes the content into the instance this.files

    function onFileSelect(fileList: File[]): void {
      for (const fileObject of fileList) {
        if (fileObject.type === 'application/zip') {
          extractFiles(fileObject);
        } else {
          files.push(fileObject);
        }
      }

      emit('sendImages', files);
      files = [];
    }

    // loadFileData takes three arguments, a list of files, the index of the list of files
    // and the data of that file as the third argument. It then loads the file by creating 
    // a new file with the correct data, "files[fileIndex].name" to get the correct name.

    function loadFileData(loadFiles: JSZipObject[], fileIndex: number, fileData: BlobPart): void {
      const file = new File([fileData], loadFiles[fileIndex].name, {
        type: 'image/jpeg',
      });
      files.push(file);
    }

    // loadFiles takes a extracted zip file and loops through the content in order to 
    // make sure that the zip file has support for MACOSX then inserts the content into the
    // load file data in order to make the format correct

    function loadFiles(extZip: JSZip): void {
      const files: JSZipObject[] = Object.values(extZip.files);
      for (let i = 0; i < files.length; i++) {
        if (files[i].name.includes('__MACOSX/') === false) {
          extZip.files[files[i].name]
            .async('blob')
            .then((fileData: BlobPart) => loadFileData(files, i, fileData))
            .catch((error: object) => {
              console.log('Error2: ' + error);
            });
        }
      }
    }
    
    // The extractFiles method takes a zip file and creates a new instance of the class JSZip
    // and then asyncronasily loads the files into the instance of loadFiles

    function extractFiles(zip: File): void {
      const newZip = new JSZip();
      newZip
        .loadAsync(zip)
        .then(loadFiles)
        .catch((error: object) => {
          console.log('Error1: ' + error);
        });
    }
    return {
      files, onFileSelect
    };
  }
});
</script>

<style lang="sass">
    img
        height: 200px

</style>
