<template>
  <v-card
    id="canvas-container"
    justify="center"
    align="center"
  >
    <div
      id="canvasContainer"
      ref="canvasContainer"
    >
      <canvas
        id="canvas"
        ref="canvas"
        height="500"
      />
    </div>
    <v-form>
      <v-item-group>
        <v-autocomplete
          v-model="name"
          :items="userNames"
          @change="onNameInput"
          data-cy="user-selector"
        />
        <v-btn
          class="btn"
          @click="savePicture"
        >
          Spara Bild
        </v-btn>
        <v-btn
          class="btn"
          data-cy="download-btn"
          @click="downloadCanvas"
        >
          Ladda ned kort
        </v-btn>
      </v-item-group>
    </v-form>
    <img
      ref="bg"
      src="../assets/background.png"
      hidden="hidden"
    >
    <img
      ref="logo"
      src="../assets/logo.png"
      hidden="hidden"
    >
  </v-card>
</template>

<!-- 
  There are some uncommon imports in this file such as resize and JsBarcode. 
  resize is used to manipulate pixel width on images,
  Jsbarcode is a dependency used for interpreting the barcode information on the 
  cards
--> 

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import JsBarcode from 'jsbarcode';
import JSZip from 'jszip';
import JQuery from 'jquery';
import FileSaver from 'file-saver';
import resize from 'vue-resize-directive';
import { setTimeout } from 'timers';
import UsersModule from '../store/modules/UsersModule';
import { User } from '@/types';

@Component({
  directives: {
    resize,
  },
})
export default class CigCanvas extends Vue {
  @Prop({ default: null }) public image!: File | null;
  @Prop({ default: false }) public sendCanvas!: boolean;

  public name: string = '';
  public barcode: string = '';
  public role: number = 0;
  public email: string = '';
  public width: number = 0;
  public height: number = 0;
  public size: number = 1;
  public context: CanvasRenderingContext2D | null = null;

  
  // Method userNames is used in order to filter out the users that are not deleted to verify
  // that the user that you are trying to render on the card is an actual active user
  
  private get userNames(): string[] {

    return Object.entries(UsersModule.all)
      .filter(([key, user]) => !user.name.includes('Deleted User'))
      .map(([key, user]) => user.name);
  }


  // checkUserData is used to fill the instances of the class with information from the 
  // UsersModule so that the card has the right inforamtion

  public checkUserData(): void { // TODO: don't compare name to find the user. Instead compare the uid.

    for (const user in UsersModule.all) {
      if (this.name === UsersModule.all[user].name) {
        this.barcode = user;
        this.email = UsersModule.all[user].email;
        this.role = UsersModule.all[user].role;
      }
    }
  }

  // The generateCanvas method does exactly what its called and uses the resize dependency 
  // to cut the canvas into a good format

  public generateCanvas(): void {

    this.getCanvasContainerSize();
    this.setCanvasSize();
    if (this.context !== null) {
      this.context.clearRect(0, 0, this.width, this.height);

      setTimeout(() => {
        const bg = this.$refs.bg as HTMLImageElement;
        if (bg && this.context) {
          this.context.drawImage(bg, 0, 0, this.width, this.height);
          
          const logo = this.$refs.logo as HTMLImageElement;
          this.context.drawImage(logo, this.width / 2 - 75, 25);
          this.drawText();
          this.drawImages();
        }
      }, 200);
    }
  }

  // Sets the instance of the height and width to the client hight and width to standardise 
  // the structure of the canvas

  public getCanvasContainerSize(): void {
    const canvasContainer = this.$refs.canvasContainer as HTMLDivElement;

    this.width = canvasContainer.clientWidth;
    this.height = canvasContainer.clientHeight;
  }

  // the setCanvasSize method basically does the same thing but sets the dimensions to 2d 

  public setCanvasSize(): void {
    const htmlCanvasElement = this.$refs.canvas as HTMLCanvasElement;

    this.context = htmlCanvasElement.getContext('2d');

    htmlCanvasElement.width = this.width;
    htmlCanvasElement.height = this.height;
  }

  // the draw image instantiates new classes of the image based on the barcode and also 
  // on the extracted zip file that is the profile image

  public drawImages(): void {

    const barcode = new Image();
    const profileImage = new Image();

    if (this.image != null) {
      profileImage.src = URL.createObjectURL(this.image);
    }

    if (this.barcode !== '') {
      JsBarcode(barcode, this.barcode);
    }

    setTimeout(() => {
      if (this.context){
        this.context.save();
        this.context.beginPath();
        this.context.arc(
          this.width / 4 + this.width / 4,
          this.height / 4 + this.width / 4,
          this.width / 4,
          0,
          Math.PI * 2,
          true,
        );
      
        this.context.closePath();
        this.context.clip();
  
        this.context.drawImage(
          profileImage,
          this.width / 4,
          this.height / 4,
          this.width / 2,
          this.width / 1.5,
        );

        this.context.beginPath();
        this.context.arc(
          this.width / 4,
          this.height / 4,
          this.width / 2,
          0,
          Math.PI * 2,
          true,
        );
        this.context.clip();
        this.context.closePath();
        this.context.restore();

        this.context.drawImage(
          barcode,
          this.width / 4,
          this.width * 1.15,
          this.width / 2,
          this.width / 3,
        );
      }
    }, 200);
  }

  // draw text method renders the text on the canvas in order to style it and also get
  // good fonts and such

  public drawText(): void {
    if (this.context){
      const firstFontSize = this.width / 10;
      const secondFontSize = this.width / 20;

      this.context.font = firstFontSize + 'px Arial';
      this.context.textAlign = 'center';
      this.context.fillStyle = '#ffffff';
      this.context.fillText(
        this.name,
        this.width / 2,
        this.height / 2 + this.height / 8,
        this.width,
      );
      this.context.fillText(
        this.role.toString(),
        this.width / 2,
        this.height / 1.7 + this.height / 8,
        this.width,
      );
    } 200;
  }

  /* 
  This is a watch action that monitors the send the instance sendCanvas to see if the 
  boolean is being mutated in any way and also blobs the image to send it via the 
  emit method built in Vue to the parent component
  */

  @Watch('sendCanvas')
  public sendThisCanvas(): void {
    const zip = new JSZip();
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    canvas.toBlob((blob) => {
      this.$emit('imageSent', blob);
    });
  }

  // the download canvas method is used to download and also save the donwloaded zip to
  // the new instance of a JSZIP to later blob it so that it can be used in Vue

  public downloadCanvas(): void {
    const zip = new JSZip();
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    canvas.toBlob((blob) => {
      if (blob){
        zip.file(this.name + '.png', blob);
        zip.generateAsync({ type: 'blob' }).then((zipBlob) => {
          FileSaver.saveAs(zipBlob, 'cards.zip');
        });
      }
    });
  }

  // savePicture method instantiates a new object of FormData to send the uid and the image
  // so that the new picture so that it later can be updated and watched by the earlier 
  // mentioned watch action 

  public savePicture(): void {
    const formData = new FormData();
    formData.append('uid', this.barcode);
    formData.append('image', this.image as Blob);
    UsersModule.update(formData).then((response: User) => {
      console.log('user updated profile!');
    }).catch((error: object) => {
      // TODO: show in notification to user
      console.error(error);
    });
  }

  // onNameInput is a getter to receive the information stored in the instance of checkUserData
  // and the generate Canvas 

  public onNameInput(): void {
    this.checkUserData();
    this.generateCanvas();
  }

  // this is also a getter to receive information simply from the generate canvas instance

  public mounted(): void {
    this.generateCanvas();
  }
}
</script>

<style lang="css" scoped>
#canvas-container{
  padding: 10px;
  margin: 5px;
}
.btn{
  margin: 5px;
}
</style>
