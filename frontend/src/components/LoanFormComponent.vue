<template>
  <div>
    <v-btn
      data-jest="barcodeButton"
      @click="toggleReader"
    >
      <v-icon
        v-if="!show"
        aria-label="Stäng streckkods läsare"
      >
        mdi-barcode-off
      </v-icon>
      <v-icon
        v-else
        aria-label="Läs av Streckkoder"
      >
        mdi-barcode-scan
      </v-icon>
    </v-btn>

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
    <div v-else>
      <BarcodeReaderComponent
        @newCodeDetected="newCodeDetected"
      />
      <p>
        Vänligen scanna {{ currentScan == 'book' ? 'Bokens sträckkod' : 'Elevens passerkort' }}
      </p>
      <v-container>
        <p @click.prevent="currentScan = 'book'">
          Bokens sträckkod: {{ form.book_id }}
        </p>
        <p @click.prevent="currentScan = 'student'">
          Elevens sträckkod: {{ form.loaned_by_id }}
        </p>
        <v-btn
          data-cy="loanOutBook"
          type="submit"
          color="primary"
          class="mr-4"
          large
          @click.prevent="onSubmit"
        >
          Låna Ut
        </v-btn>
      </v-container>
    </div>
  </div>
</template>

<script lang="ts">
import LoansModule from '../store/modules/LoansModule';
import { Loan, LoanForm } from '../types';
import UsersModule from '../store/modules/UsersModule';
import BarcodeReaderComponent from './BarcodeReaderComponent.vue';
import { ref, defineComponent, SetupContext} from '@vue/composition-api';

// loan form component is used to user interface for the user to create a loan and is later
// authorized by the pundit dependency
export default defineComponent({
  name: 'LoanFormComponent',
  components: { BarcodeReaderComponent },
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

    // this is the Eventlistener for the user to clear the forms input fields

    function onReset(evt: Event): void {
      evt.preventDefault();
      form.loaned_by_id = 0; //eslint-disable-line camelcase
      form.book_id = 0; //eslint-disable-line camelcase
      show.value = false;
      root.$nextTick(() => {
        show.value = true;
      });
    }

    const currentScan = ref('book');

    // If the scanner detects a new barcode depending on what is currently being scanned
    // it sets the corresponding form values
    function newCodeDetected(code: string): void {
      if (currentScan.value === 'book') {
        form.book_id = parseInt(code); //eslint-disable-line camelcase
        currentScan.value = 'student';
      } else {
        form.loaned_by_id = parseInt(code); //eslint-disable-line camelcase
        currentScan.value = 'book';
      };
    }

    // Toggles the barcodeReaders precence.
    function toggleReader():void {
      show.value = !show.value;
    }

    return{
      newCodeDetected,
      toggleReader,
      currentScan,
      show,
      onSubmit,
      form,
      onReset
    };
  }
});
</script>
