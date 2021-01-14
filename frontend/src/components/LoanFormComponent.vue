<template>
  <div>
    <v-form
      v-if="show"
      data-jest="form"
      @submit="onSubmit"
      @reset="onReset"
    >
      <v-item-group
        vertical=""
        label-class="text-sm-right"
        label-for="nestedUid"
      >
        <v-text-field
          id="nestedUid"
          v-model="form.loaned_by_id"
          data-jest="student_barcode"
          data-cy="student_barcode"
          label="Elevens Streckkod"
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
          v-model="form.book_id"
          data-jest="book_barcode"
          data-cy="book_barcode"
          label="Bokens Streckkod"
          outlined
        />
      </v-item-group>

      <v-item-group
        vertical=""
        label-class="text-sm-right"
        label-for="nestedBid"
      >
        <v-menu
          ref="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.expiration_date"
              label="Expire date"
              outlined
              v-bind="attrs"
              data-jest="expirationDate"
              v-on="on"
            />
          </template>
          <v-date-picker
            ref="picker"
            v-model="form.expiration_date"
            :min="new Date().toISOString().substr(0, 10)"
          />
        </v-menu>
      </v-item-group>

      <v-btn
        data-cy="loanOutBook"
        type="submit"
        color="primary"
        class="mr-4"
        large
      >
        Låna Ut
      </v-btn>
      <v-btn
        type="reset"
        large
      >
        Rensa Fälten
      </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import LoansModule from '../store/modules/LoansModule';
import { Loan, LoanForm } from '../types';
import UsersModule from '../store/modules/UsersModule';
import { ref, defineComponent, SetupContext} from '@vue/composition-api';


// loan form component is used to user interface for the user to create a loan and is later
// authorized by the pundit dependency

export default defineComponent({
  name: 'LoanFormComponent',
  setup(_ : object, {root, emit} : SetupContext) {
    const form = {
      lent_by_id: 0, //eslint-disable-line camelcase
      loaned_by_id: 0, //eslint-disable-line camelcase
      book_id: 0, //eslint-disable-line camelcase
      expiration_date: '' //eslint-disable-line camelcase
    } as LoanForm;

    const show = ref(true);

    function onSubmit(evt: Event): void{
      evt.preventDefault();
      form.lent_by_id = UsersModule.currentUserID; //eslint-disable-line camelcase
      if (!!form.lent_by_id && !!form.loaned_by_id && !!form.book_id && !!form.expiration_date) {
        LoansModule.create(form)
          .then((payload: Loan) => emit('loan-added', payload))
          .catch((failure: boolean) => console.log(failure));
      }
    }

    //   // this is the Eventlistener for the user to reset the form if the user has entered the
    //   // wrong information about the loan

    function onReset(evt: Event): void {
      evt.preventDefault();
      form.loaned_by_id = 0; //eslint-disable-line camelcase
      form.book_id = 0; //eslint-disable-line camelcase
      show.value = false;
      root.$nextTick(() => {
        show.value = true;
      });
    }
    return{
      show,
      onSubmit,
      form,
      onReset
    };
  }
});
</script>
