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
      :items="TitlesModule.allAsArray"
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
    <v-select
      v-model="form.availability"
      :items="availability"
      label="Tillgänglighet"
      item-text="state"
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
import TitlesModule from '../store/modules/TitlesModule';
import BooksModule from '../store/modules/BooksModule';
import { BookForm } from '../types';
import { defineComponent } from '@vue/composition-api';

// This is the component for the book form which includes all the information for the book
// form and therfore alternatives for the user to choose from

export default defineComponent({
  name: 'BookFormComponent',
  setup(){
    let form: BookForm = {
      barcode: '',
      title_id: 0, //eslint-disable-line camelcase
      condition: '',
      availability: true
    };

    //   // Submit is the event listener that takes the event and prevents the site to reload when
    //   // the method is run and also creates the book with the inforamtion from the form instance

    function onSubmit(evt: Event): void {
      evt.preventDefault();
      const multiBookInput = form.barcode.split(',');
      if (multiBookInput.length > 1) {
        for (const bookBarcode of multiBookInput) {
          const tempBook = {...form};
          tempBook.barcode = bookBarcode.trim();
          BooksModule.create(tempBook);
        };
      } else {
        BooksModule.create(form);
      };
      onReset();
    };

    // Reset method to take the form based on the properties defined in the component 
    // BookFormComponent

    function onReset(): void {
      form = {
        barcode: '',
        title_id: 0, //eslint-disable-line camelcase
        condition: '',
        availability: true
      };
    };

    const availability: object[] = [
      { state: 'true', value: true },
      { state: 'false', value: false },
    ];

    return{
      form,
      TitlesModule,
      onSubmit,
      onReset,
      availability
    };
  }
});
</script>
