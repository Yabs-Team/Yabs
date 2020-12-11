<template>
  <v-form
    v-if="show"
    data-jest="form"
    @submit.prevent="onSubmit"
    @reset.prevent="onReset"
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
    <v-select
      v-model="form.subject_id"
      data-jest="subjectId"
      data-cy="subjectId"
      :items="subjects"
      label="Välj ämne av titel"
      outlined
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
import { ref, defineComponent, SetupContext } from '@vue/composition-api';
import TitlesModule from '../store/modules/TitlesModule';
import { Title, TitleForm, Subject } from '../types';
import Subjects from '../services/api/subjects';


// This is the child component of the earlier named parent element and catches the information
// passed down the component tree to render the table

export default defineComponent({
  name: 'TitleFormComponent',
  setup(_ : object, { root, emit } : SetupContext) {
    const form = ref({
      name: '',
      cost: '',
      isbn: '',
      title_type: '', //eslint-disable-line camelcase
      subject_id: '',  //eslint-disable-line camelcase
    } as TitleForm);

    const show = ref(true);

    const options : object[] = [
      { value: 'Kurslitteratur', text: 'Kurslitteratur' },
      { value: 'Bibloteksbok', text: 'Bibloteksbok' },
      { value: 'Skönlitteratur', text: 'Skönlitteratur' },
    ];

    const subjects = ref([]);

    // Collects all subjects from the backend to provide them in the dropdown
    // This should be moved to a subject store module in the future
    async function updateSubject(): Promise<void> {
      const temp: Subject[] = await Subjects.all();
      subjects.value = temp.map((x: Subject) => ({ value: x.id, text: x.name }));
    };
    updateSubject();

    // The onSubmit eventlistener calls the titlesmodule and recreates the form when the submit has been
    // successfull

    function onSubmit(evt: Event): void {
      if (!Object.values(form.value).some(prop => prop === '')) {
        TitlesModule.create(form.value)
          .then((title: Title) => {
            emit('title-added', title);
          })
          .catch((failure: object) => console.log(failure));
      } else {
        console.log('Missing data');
      }
    }

    // onReset eventlistener is used to reset the form if the user has written in the wrong
    // information about the title

    function onReset(evt: Event): void {
      form.value.name = '';
      form.value.cost = '';
      form.value.isbn = '';
      show.value = false;
      root.$nextTick(() => {
        show.value = true;
      });
    }

    return { form, show, options, onSubmit, onReset, subjects };
  }
});
</script>
