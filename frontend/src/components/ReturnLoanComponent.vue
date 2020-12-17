<template>
  <div>
    <v-card data-cy="returnCard">
      <v-card-title>
        Scan your book barcode
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="scannedBookId"
            data-jest="book_barcode_return"
            data-cy="book_barcode_return"
            label="Bokens Streckkod"
            outlined
          />
          <v-text-field 
            v-model="scannedBookStatus"
            data-jest="book_condition"
            data-cy="book_condition"
            label="Bokens Status"
            outlined
          />
          <v-card-actions>
            <v-spacer />
            <v-btn
              data-cy="ReturnBook"
              data-jest="ReturnBook"
              type="submit"
              color="primary"
              class="mr-4"
              large
              @click="onSubmit"
            >
              Return
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang='ts'>
import { ref, defineComponent, SetupContext, watch } from '@vue/composition-api';
import LoansModule from '../store/modules/LoansModule';
import { Loan } from '../types';
import BooksModule from '../store/modules/BooksModule';
import { BookForm } from '@/types';

export default defineComponent({
  name: 'ReturnLoanComponent',
  setup(_: object, { root }: SetupContext) {
    const scannedBookId = ref('');
    const scannedBookStatus = ref('');
    const updatedBookCondition : BookForm = {
      barcode: '',
      title_id: 0, //eslint-disable-line camelcase
      condition: ''  
    };

    function onSubmit(evt: Event): void {
      evt.preventDefault();

      const targetLoan = LoansModule.allAsArray.find((loan: Loan) => {
        return loan.book_id == Number(scannedBookId.value);
      });

      if(targetLoan) {
        const existingBook = BooksModule.allAsArray.find(x => (x.barcode == scannedBookId.value));
        if(existingBook){
          updatedBookCondition.title_id = existingBook.title_id; //eslint-disable-line camelcase
          updatedBookCondition.barcode = existingBook.barcode;
        }
        updatedBookCondition.condition = scannedBookStatus.value;
        LoansModule.delete(targetLoan);
        BooksModule.update(updatedBookCondition);
        scannedBookId.value = '';
        scannedBookStatus.value = '';
      };
    }

    watch(() => scannedBookId.value, (newVal, _) => {
      const book = BooksModule.allAsArray.find(x => (x.barcode == newVal));
      if(book) {
        scannedBookStatus.value = book.condition;
      }else {
        scannedBookStatus.value = '';
      }
    });
    return { scannedBookId, onSubmit, scannedBookStatus };
  }
});

// @Component
// export default class ReturnLoanComponent extends Vue{
//   private scannedBookId: string = '';

//   private onSubmit(evt: Event): void {
//     evt.preventDefault();
//     const targetLoan = LoansModule.allAsArray.find((loan: Loan) => {return loan.book_id == Number(this.scannedBookId);});

//     if (targetLoan) {LoansModule.delete(targetLoan);}; 
//   }

// }
</script>

<style>

</style>