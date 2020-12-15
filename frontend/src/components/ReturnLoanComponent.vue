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
            data-cy="book_barcode_return"
            label="Bokens Streckkod"
            outlined
          />
          <v-card-actions>
            <v-spacer />
            <v-btn
              data-cy="ReturnBook"
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
import {Vue, Component, Prop} from 'vue-property-decorator';
import LoansModule from '../store/modules/LoansModule';
import { Loan } from '../types';


@Component
export default class ReturnLoanComponent extends Vue{
  private scannedBookId: string = '';

  private onSubmit(evt: Event): void {
    evt.preventDefault();
    const targetLoan = LoansModule.allAsArray.find((loan: Loan) => {return loan.book_id == Number(this.scannedBookId);});

    if (targetLoan) {LoansModule.delete(targetLoan);}; 
  }

}
</script>

<style>

</style>