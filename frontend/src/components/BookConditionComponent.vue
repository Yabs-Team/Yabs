<template>
  <v-card class="csSad">
    <h1 class="display-2">
      Böcker
    </h1>
    <v-card-text
      v-model="title"
      class="display-2"
    />
    <v-text-field
      v-model="title"
      label="Titel"
      readonly
      outlined
    />
    <v-text-field
      v-model="barcode"
      label="Streckkod"
      outlined
    />
    <v-select
      v-model="form.condition"
      :items="statuses"
      label="Bokens Status"
      outlined
    />
    <v-text-field
      v-model="notes"
      label="Övrig Anteckning"
      outlined
    />
    <v-btn
      color="primary"
      @click="submit"
    >
      Uppdatera Bok
    </v-btn>
  </v-card>
</template>

<script lang="ts">
import BooksModule from '../store/modules/BooksModule';
import { BookForm } from '@/types';
import { defineComponent } from '@vue/composition-api';

interface BookConditionProps {
  title: string,
  title_id: number, //eslint-disable-line camelcase
  barcode: string,
  status: string
};

export default defineComponent({
  name: 'BookStatusComponent',
  props: {
    title:{type:String, default:'Ingen Data'},
    title_id:{type:Number, default:0}, //eslint-disable-line camelcase
    barcode:{type:String, default:''},
    status:{type:String, default:'Otillgänglig'},
    notes:{type:String, default:''}
  },
  setup(props:BookConditionProps){
    const statuses: string [] = ['Trasig', 'OK', 'Annat'];
    let form: BookForm = {
      condition: props.status,
      title_id: props.title_id, //eslint-disable-line camelcase
      barcode: props.barcode,
    };

    function submit(): void {
      BooksModule.update(form);
      alert('Bok Uppdaterad!');
    }
    return{
      form,
      statuses,
      submit
    };
  }
  
});
</script>

<style scoped>
/* css so sad */
.csSad {
  padding: 10px;
  box-shadow: none;
}
</style>
