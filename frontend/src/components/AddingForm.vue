<template lang="pug">
   div
    b-form(@submit='onSubmit', @reset='onReset', v-if='show')
        b-card(bg-variant='light')
            b-form-group(vertical='' id="streckkod" label-class='text-sm-right' label-for='nestedBid')
                b-form-input#nestedBid(placeholder='Bokens Streckkod'  v-model="form.barcode")
            b-form-group(vertical='' id="titlenamn" label-class='text-sm-right' label-for='nestedBid')
                vue-bootstrap-typeahead(v-model="name" :data="titleNames" @hit="toId()" placeholder='Titel namn')
            b-form-group(vertical='' id="status" label-class='text-sm-right' label-for='nestedBid')
                b-form-input#nestedBid(placeholder='Status: tex "ok", "framsida saknas"' v-model="form.status")
            b-button(type='submit', id="addBook" variant='primary') Lägg till
            b-button(type='reset', id="resetbookfield" variant='danger') Rensa Fältet

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TitlesModule from '../store/modules/TitlesModule';
import BooksModule from '../store/modules/BooksModule';

@Component
export default class AddingForm extends Vue {
  public form = {
    barcode: '',
    title_id: 0,
    status: '',
  };
  public name: string = '';
  public show = true;

  get titleNames() {
    return Object.entries(TitlesModule.all).map(([key, title]) => title.name);
  }

  public toId() {
    for (const title in TitlesModule.all) {
      if (this.name === TitlesModule.all[title].name) {
        this.form.title_id = TitlesModule.all[title].id;
      }
    }
  }

  public onSubmit(evt: Event) {
    evt.preventDefault();
    BooksModule.create(this.form);
  }

  public onReset(evt: Event) {
    evt.preventDefault();
    this.form.barcode = '';
    this.form.title_id = 0;
    this.form.status = '';
    this.show = false;
    this.$nextTick(() => {
      this.show = true;
    });
  }
}
</script>
