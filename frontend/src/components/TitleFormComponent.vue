<template>
  <v-form
    v-if="show"
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
          label="Namn"
          outlined
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
          label="Kostnad"
          outlined
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
          label="isbn"
          outlined
        />
      </v-item-group>
      <v-select
        v-model="form.title_type"
        :items="options"
        label="Välj typ av titel"
        outlined
      />
      <v-btn
        type="submit"
        color="primary"
        class="mr-4"
        large
      >
        Lägg till
      </v-btn>
      <v-btn
        type="reset"
        color="error"
        large
      >
        Rensa Fältet
      </v-btn>
  </v-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import TitlesModule, { TitleForm } from '../store/modules/TitlesModule';

@Component
export default class TitleFormComponent extends Vue {
  public form: TitleForm = {
    name: '',
    cost: '',
    isbn: '',
    title_type: '',
  };
  public show: boolean = true;

  public options: object[] = [
    { value: 'Kurslitteratur', text: 'Kurslitteratur' },
    { value: 'Bibloteksbok', text: 'Bibloteksbok' },
    { value: 'Skönlitteratur', text: 'Skönlitteratur' },
  ];

  public onSubmit(evt: Event) {
    evt.preventDefault();
    if (!!this.form.name && !!this.form.cost && !! this.form.isbn && !!this.form.title_type) {
      TitlesModule.create(this.form)
        .then((title: any) => this.$emit('title-added', title))
        .catch((failure: any) => console.log(failure));
    }
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
