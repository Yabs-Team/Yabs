<template>
  <v-form @submit="onSubmit">
    <v-card>
      <v-text-field
        v-model="form.barcode"
        label="Barcode"
        autocomplete="off"
        data-cy="barcode"
        required
      ></v-text-field>
      <v-autocomplete    
        v-model="form.title_id"
        :items="titlesModule.allAsArray"
        item-text="name"
        item-value="id"
        label="Select a favorite activity or create a new one"
        autocomplete="off"
        data-cy="titlename"
      ></v-autocomplete>
      <v-text-field
        v-model="form.status"
        label="Status: tex 'ok', 'framsida saknas'"
        autocomplete="off"
        data-cy="status"
        required
      ></v-text-field>
      <v-btn class="mr-4" type="submit" data-cy="addBook" color="primary">Lägg till</v-btn>
      <v-btn @click.prevent="onReset" data-cy="resetbookfield" color="error">Rensa fält</v-btn>
    </v-card>
  </v-form>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import TitlesModule from '../store/modules/TitlesModule';
  import BooksModule from '../store/modules/BooksModule';

  @Component
  export default class CreateBookFormComponent extends Vue {
    private form = {
      barcode: '',
      title_id: 0,
      status: '',
    };
    private titlesModule = TitlesModule;

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
