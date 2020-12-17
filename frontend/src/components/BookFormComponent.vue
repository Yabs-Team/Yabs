<template>
  <v-form
    data-jest="form"
    @submit="onSubmit"
  >
    <v-text-field
      v-model="form.barcode"
      data-jest="barcode"
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
      v-model="form.condition"
      data-jest="condition"
      label="condition: tex 'ok', 'framsida saknas'"
      autocomplete="off"
      required
      outlined
      data-cy="condition"
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
      data-cy="reset"
      @click.prevent="onReset"
    >
      Rensa fält
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TitlesModule from '../store/modules/TitlesModule';
import BooksModule from '../store/modules/BooksModule';
import { BookForm } from '../types';
import { VuexModule } from 'vuex-module-decorators';

// This is the component for the book form which includes all the information for the book
// form and therfore alternatives for the user to choose from

@Component
export default class BookFormComponent extends Vue {
  private form: BookForm = {
    barcode: '',
    title_id: 0, //eslint-disable-line camelcase
    condition: '',
  };

  // This is defining the title module as a module in order to use the module in the vue
  // components

  private titlesModule: VuexModule = TitlesModule;

  // Submit is the event listener that takes the event and prevents the site to reload when
  // the method is run and also creates the book with the inforamtion from the form instance

  private onSubmit(evt: Event): void {
    evt.preventDefault();
    const multiBookInput = this.form.barcode.split(',');
    if (multiBookInput.length > 1) {
      for (let bookBarcode of multiBookInput) {
        const tempBook = {...this.form};
        tempBook.barcode = bookBarcode.trim();
        BooksModule.create(tempBook);
      };
    } else {
      BooksModule.create(this.form);
    };
    this.onReset();
  }

  // Reset method to take the form based on the properties defined in the component 
  // BookFormComponent

  private onReset(): void {
    this.form = {
      barcode: '',
      title_id: 0, //eslint-disable-line camelcase
      condition: '',
    };
  }
}
</script>
