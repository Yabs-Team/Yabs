<template lang="pug">
    div
        #canvasContainer(ref="canvasContainer")
            canvas#canvas(ref='canvas')
        b-form
            b-form-group
                vue-bootstrap-typeahead(v-model="name" :data="userNames" @hit="onNameInput")
                b-button(@click="savePicture") Spara Bild
                b-button(@click="downloadCanvas") Ladda ned kort
        img(src="../assets/background.png" hidden ref="bg")
        img(src="../assets/logo.png" hidden ref="logo")
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import JsBarcode from 'jsbarcode';
import JSZip from 'jszip';
import JQuery from 'jquery';
import FileSaver from 'file-saver';
import resize from 'vue-resize-directive';
import { setTimeout } from 'timers';
import { UserObject } from '../store/modules/users';

@Component({
  directives: {
    resize,
  },
})
export default class CigCanvas extends Vue {
  @Prop({ default: {} }) public userData!: UserObject;
  @Prop({ default: '' }) public image!: string;
  @Prop({ default: false }) public sendCanvas!: boolean;

  public name: string = '';
  public barcode: string = '';
  public role: string = '';
  public email: string = '';
  public width: number = 0;
  public height: number = 0;
  public size: number = 1;
  public context: any = null;

  public get userNames() {
    return Object.entries(this.userData)
      .filter(([k, user]) => !user.name.includes('Deleted User'))
      .map(([k, user]) => user.name);
  }

  public checkUserData() {
    for (const user in this.userData) {
      if (this.name === this.userData[user].name) {
        this.barcode = user;
        this.email = this.userData[user].email;
        this.role = this.userData[user].role;
      }
    }
  }

  public generateCanvas() {
    this.getCanvasContainerSize();
    this.setCanvasSize();
    if (this.context !== null) {
      this.context.clearRect(0, 0, this.width, this.height);

      setTimeout(() => {
        const bg: any = this.$refs.bg;
        this.context.drawImage(bg, 0, 0, this.width, this.height);

        const logo: any = this.$refs.logo;
        this.context.drawImage(logo, this.width / 2 - 75, 25);
        this.drawText();
        this.drawImages();
      }, 200);
    }
  }

  public getCanvasContainerSize() {
    const canvasContainer: any = this.$refs.canvasContainer;
    this.width = canvasContainer.clientWidth;
    this.height = canvasContainer.clientHeight;
  }

  public setCanvasSize() {
    const htmlCanvasElement: HTMLCanvasElement | any = this.$refs.canvas;
    this.context = htmlCanvasElement.getContext('2d');

    htmlCanvasElement.width = this.width;
    htmlCanvasElement.height = this.height;
  }

  public drawImages() {
    const barcode = new Image();
    const profileImage = new Image();
    profileImage.src = this.image;

    if (this.barcode !== '') {
      JsBarcode(barcode, this.barcode);
    }

    setTimeout(() => {
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
    }, 200);
  }

  public drawText() {
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
      this.role,
      this.width / 2,
      this.height / 1.7 + this.height / 8,
      this.width,
    );
  }

  @Watch('sendCanvas')
  public sendThisCanvas() {
    const zip = new JSZip();
    const canvas: HTMLCanvasElement | any = this.$refs.canvas;
    canvas.toBlob((blob: any) => {
      this.$emit('imageSent', blob);
    });
  }

  public downloadCanvas() {
    const zip = new JSZip();
    const canvas: HTMLCanvasElement | any = this.$refs.canvas;
    canvas.toBlob((blob: any) => {
      zip.file(this.name + '.png', blob);
      zip.generateAsync({ type: 'blob' }).then((zipBlob: any) => {
        FileSaver.saveAs(zipBlob, 'cards.zip');
      });
    });
  }

  public savePicture() {
    // save to database
  }

  public onNameInput() {
    this.checkUserData();
    this.generateCanvas();
  }

  public mounted() {
    this.generateCanvas();
  }
}
</script>

<style lang="sass" scoped>
    #canvasContainer
        width: 19vw
        height: 29.64vw
        display: flex !important
        margin-bottom: 1%
        margin-right: 1%
        justify-self: center

    @media only screen and (max-width: 808px)
        #canvasContainer
            width: 38vw
            height: 59.28vw

</style>
