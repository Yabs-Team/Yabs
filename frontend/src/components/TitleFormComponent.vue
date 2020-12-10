<template>
  <v-form
    v-if="show"
    data-jest="form"
    @submit="onSubmit"
    @reset="onReset"
  >
    <v-item-group
      vertical=""
      label-class="text-sm-right"
      label-for="nestedBid"
    >
      <v-text-field
        id="nestedBid"
        v-model="form.name"
        data-jest="name"
        label="Namn"
        outlined
        data-cy="name"
      />
    </v-item-group>
    <v-item-group
      vertical=""
      label-class="text-sm-right"
      label-for="nestedBid"
    >
      <v-text-field
        id="nestedBid"
        v-model="form.cost"
        data-jest="cost"
        label="Kostnad"
        outlined
        data-cy="cost"
      />
    </v-item-group>
    <v-item-group
      vertical=""
      label-class="text-sm-right"
      label-for="nestedBid"
    >
      <v-text-field
        id="nestedBid"
        v-model="form.isbn"
        data-jest="isbn"
        label="isbn"
        outlined
        data-cy="isbn"
      />
    </v-item-group>
    <v-select
      v-model="form.title_type"
      data-jest="titleType"
      :items="options"
      label="Välj typ av titel"
      outlined
      data-cy="titleType"
    />
    <v-btn
      type="submit"
      color="primary"
      class="mr-4"
      large
      data-cy="submit"
    >
      Lägg till
    </v-btn>
    <v-btn
      type="reset"
      large
      data-cy="reset"
    >
      Rensa Fältet
    </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TitlesModule from '../store/modules/TitlesModule';
import { Title, TitleForm } from '../types';


// This is the child component of the earlier named parent element and catches the information
// passed down the component tree to render the table 

@Component
export default class TitleFormComponent extends Vue {
  public form: TitleForm = {
    name: '',
    cost: '',
    isbn: '',
    title_type: '', //eslint-disable-line camelcase
  };
  public show: boolean = true;

  public options: object[] = [
    { value: 'Kurslitteratur', text: 'Kurslitteratur' },
    { value: 'Bibloteksbok', text: 'Bibloteksbok' },
    { value: 'Skönlitteratur', text: 'Skönlitteratur' },
  ];

  // The onSubmit eventlistener calls the titlesmodule and recreates the form when the submit has been
  // successfull

  public onSubmit(evt: Event): void {
    evt.preventDefault();
    if (!!this.form.name && !!this.form.cost && !! this.form.isbn && !!this.form.title_type) {
      TitlesModule.create(this.form)
        .then((title: Title) => this.$emit('title-added', title))
        .catch((failure: object) => console.log(failure));
    }
  }

  // onReset eventlistener is used to reset the form if the user has written in the wrong
  // information about the title

  public onReset(evt: Event): void {
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
