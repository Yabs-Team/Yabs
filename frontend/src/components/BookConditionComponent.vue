<template>
  <v-card>
    <v-text-field
      v-model="title"
      label="Regular"
      single-line
      readonly
    />
    <v-text-field
      v-model="barcode"
      label="Regular"
      single-line
      readonly
    />
    <v-overflow-btn
      v-model="form.condition"
      class="my-2"
      :items="statuses"
      label="Overflow Btn"
    />
    <v-text-field
      v-model="note"
      label="Regular"
      single-line
    />
    <v-btn
      color="primary"
      @click="submit"
    >
      Update Book
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
  status: string,
  note: string
};

export default defineComponent({
  name: 'BookStatusComponent',
  props: {
    title:{type:String, default:'No Data'},
    title_id:{type:Number, default:0}, //eslint-disable-line camelcase
    barcode:{type:String, default:''},
    status:{type:String, default:'Unavailable'},
    note:{type:String, default:''}
  },
  setup(props:BookConditionProps){
    const statuses: string [] = ['Damaged', 'OK', 'Other'];
    let form: BookForm = {
      condition: props.status,
      title_id: props.title_id, //eslint-disable-line camelcase
      barcode: props.barcode
    };

    function submit(): void {
      BooksModule.update(form);
      alert('Book Updated');
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

</style>
