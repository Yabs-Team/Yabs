<template>
  <v-form @submit="onSubmit">
    <v-text-field
      v-model="form.barcode"
      label="Barcode"
      autocomplete="off"
      required
      outlined
      data-cy="barcode"
    />
    <v-autocomplete    
      v-model="form.title_id"
      :items="titlesModule.allAsArray"
      item-text="name"
      item-value="id"
      label="Välj titel"
      autocomplete="off"
      outlined
      data-cy="chooseTitle"
    />
    <v-text-field
      v-model="form.status"
      label="Status: tex 'ok', 'framsida saknas'"
      autocomplete="off"
      required
      outlined
      data-cy="status"
    />
    <v-btn
      class="mr-4"
      type="submit"
      color="primary"
      large
      data-cy="addBook"
    >
      Lägg till
    </v-btn>
    <v-btn
      large
      @click.prevent="onReset"
      data-cy="reset"
    >
      Rensa fält
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TitlesModule from '../store/modules/TitlesModule';
import BooksModule from '../store/modules/BooksModule';
import { VuexModule } from 'vuex-module-decorators';

@Component
export default class BookFormComponent extends Vue {
  private form: {} = {
    barcode: '',
    title_id: 0,
    status: '',
  };
  private titlesModule: VuexModule = TitlesModule;

  private onSubmit(evt: Event) {
    evt.preventDefault();
    BooksModule.create(this.form);
    this.onReset();
  }

  private onReset() {
    this.form = {
      barcode: '',
      title_id: 0,
      status: '',
    };
  }
}
</script>
