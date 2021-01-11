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
          v-model="menu"
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
              v-on="on"
            />
          </template>
          <v-date-picker
            ref="picker"
            v-model="form.expiration_date"
            :min="new Date().toISOString().substr(0, 10)"
            @change="save"
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import LoansModule from '../store/modules/LoansModule';
import { Loan, LoanForm } from '../types';
import UsersModule from '../store/modules/UsersModule';

// loan form component is used to user interface for the user to create a loan and is later 
// authorized by the pundit dependency 
@Component
export default class LoanFormComponent extends Vue {
  public form: LoanForm = {
    lent_by_id: 0, //eslint-disable-line camelcase
    loaned_by_id: 0, //eslint-disable-line camelcase
    book_id: 0,//eslint-disable-line camelcase
    expiration_date: ''//eslint-disable-line camelcase
  };
  public show: boolean = true;

  // Eventlistener that does not reload the page when executed, sets the lent by id to the 
  // current user that has been logged in and then rerenders the loan form for the 
  // user to recreate a loan

  public onSubmit(evt: Event): void {

    evt.preventDefault();
    this.form.lent_by_id = UsersModule.currentUserID; //eslint-disable-line camelcase
    if (!!this.form.lent_by_id && !!this.form.loaned_by_id && !!this.form.book_id && !!this.form.expiration_date) {
      LoansModule.create(this.form)
        .then((payload: Loan) => this.$emit('loan-added', payload))
        .catch((failure: boolean) => console.log(failure));
    }

  }


  // this is the Eventlistener for the user to reset the form if the user has entered the 
  // wrong information about the loan

  public onReset(evt: Event): void {
    evt.preventDefault();
    this.form.loaned_by_id = 0; //eslint-disable-line camelcase
    this.form.book_id = 0; //eslint-disable-line camelcase
    this.show = false;
    this.$nextTick(() => {
      this.show = true;
    });
  }
}
</script>
