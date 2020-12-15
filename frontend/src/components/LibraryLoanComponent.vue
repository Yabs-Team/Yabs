<template>
  <div>
    <v-card data-cy="libraryLoanCard">
      <v-card-title>
        Scan the book barcode
      </v-card-title>
      <v-form
        v-if="show"
        @submit="onSubmit"
        @reset="onReset"
      >
        <!-- <v-item-group
          vertical=""
          label-class="text-sm-right"
          label-for="nestedUid"
        >
          <v-text-field
            id="nestedUid"
            v-model="form.loaned_by_id"
            data-cy="student_barcode"
            label="Din mammas Streckkod"
            outlined
          />
        </v-item-group> -->
        <v-item-group
          vertical=""
          label-class="text-sm-right"
          label-for="nestedBid"
        >
          <v-text-field
            id="nestedBid"
            v-model="form.book_id"
            data-cy="book_barcode"
            label="Bokens Streckkod"
            outlined
          />
        </v-item-group>
        <v-card-actions>
          <v-spacer />
          <v-btn
            data-cy="loanOutBook"
            type="submit"
            color="primary"
            class="mr-4"
            large
          >
            Låna Ut
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Prop } from 'vue-property-decorator';
import LoansModule from '../store/modules/LoansModule';
import { Loan, LoanForm } from '../types';
import UsersModule from '../store/modules/UsersModule';
import { ref, defineComponent, SetupContext } from '@vue/composition-api';
import LoanFormComponent from './LoanFormComponent.vue';

export default defineComponent ({
  name: 'LibraryLoanComponent',
  components: {
    LoanFormComponent
  },
  setup(_: object, { root, emit }: SetupContext) {
    const form = ref({
      lent_by_id: 0, //eslint-disable-line camelcase
      loaned_by_id: 0, //eslint-disable-line camelcase
      book_id: 0, //eslint-disable-line camelcase
    } as LoanForm);

    const show = ref(true);

    function onSubmit(evt: Event): void {
      evt.preventDefault();
      form.value.lent_by_id = 2054282603; //eslint-disable-line camelcase
      form.value.loaned_by_id = UsersModule.currentUserID; //eslint-disable-line camelcase
      if (!!form.value.lent_by_id && !!form.value.loaned_by_id && !!form.value.book_id) {
        LoansModule.create(form.value)
          .then((payload: Loan) => emit('loan-added', payload))
          .catch((failure: boolean) => console.log(failure));
      }
    }

    function onReset(evt: Event): void {
      evt.preventDefault();
      form.value.loaned_by_id = 0; //eslint-disable-line camelcase
      form.value.book_id = 0; //eslint-disable-line camelcase
      show.value = false;
      root.$nextTick(() => {
        show.value = true;
      });
    }
    return { form, show, LoanFormComponent, onSubmit, onReset };
  }
});
</script>
