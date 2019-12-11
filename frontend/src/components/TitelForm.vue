<template lang="pug">
    v-form(@submit='onSubmit', @reset='onReset', v-if='show')
        v-card(bg-variant='light')
            v-item-group(vertical='' label-class='text-sm-right' label-for='nestedBid')
                v-text-field#nestedBid(placeholder='Namn' v-model="form.name")
            v-item-group(vertical='' label-class='text-sm-right' label-for='nestedBid')
                v-text-field#nestedBid(placeholder='Kostnad' v-model="form.cost")
            v-item-group(vertical='' label-class='text-sm-right' label-for='nestedBid')
                v-text-field#nestedBid(placeholder='isbn' v-model="form.isbn")
            v-select(v-model="form.title_type" :items="options" label="Välj typ av titel")
            v-btn(type='submit', color='primary') Lägg till
            v-btn(type='reset', color='error') Rensa Fältet

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TitlesModule from '../store/modules/TitlesModule';

@Component
export default class TitleForm extends Vue {
  public form = {
    name: '',
    cost: '',
    isbn: '',
    title_type: '',
  };
  public show = true;

  public options = [
    { value: 'Kurslitteratur', text: 'Kurslitteratur' },
    { value: 'Bibloteksbok', text: 'Bibloteksbok' },
    { value: 'Skönlitteratur', text: 'Skönlitteratur' },
  ];

  public onSubmit(evt: Event) {
    evt.preventDefault();
    TitlesModule.create(this.form)
      .then((title: any) => this.$emit('title-added', title))
      .catch((failure: any) => console.log(failure));
  }

  public onReset(evt: Event) {
    evt.preventDefault();
    this.form.name = '';
    this.form.cost = '';
    this.form.isbn = '';
    this.show = false;
    this.$nextTick(() => {
      this.show = true;
    });
  }
}
</script>
