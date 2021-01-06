<template>
  <div>
    <v-card data-cy="returnCard">
      <v-card-title>
        Scan your book barcode
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-btn @click="toggleReader">
            <v-icon
              v-if="barcode"
              aria-label="Stäng streckkods läsare"
            >
              mdi-barcode-off
            </v-icon>
            <v-icon
              v-else
              aria-label="Läs av Streckkod"
            >
              mdi-barcode-scan
            </v-icon>
          </v-btn>
          <BarcodeReaderComponent
            v-if="barcode"
            @newCodeDetected="newCodeDetected"
          />
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
    <BaseModal
      :body="confirmationBody"
      :header="confirmationHeader"
      :show-modal="showModal"
      :actions="modalActions"
    />
  </div>
</template>

<script lang='ts'>
import { BookForm, Loan, Book } from '@/types';
import { ref, defineComponent, SetupContext, watch } from '@vue/composition-api';
import BarcodeReaderComponent from '@/components/BarcodeReaderComponent.vue';
import BaseModal from '@/components/BaseModal.vue';
import BooksModule from '../store/modules/BooksModule';
import LoansModule from '../store/modules/LoansModule';

export default defineComponent({
  name: 'ReturnLoanComponent',
  components: {BaseModal, BarcodeReaderComponent},
  setup(_: object, { root }: SetupContext) {
    const scannedBookId = ref('');
    const scannedBookStatus = ref('');

    const confirmationBody = ref('');
    const confirmationHeader = ref('');
    const showModal = ref(false);

    const modalActions = ref([{}]);

    async function modal(e: string): Promise<void> {
      try {
        const resp = await BooksModule.fetchSingle(e);
        confirmationHeader.value = 'Bekräfta retur';
        confirmationBody.value = resp.title.name;
        modalActions.value = [
          {text: 'Avbryt', action: ():void => { showModal.value = false;}},
          {text: 'Bekräfta', action: ():void => { showModal.value = false; submitChanges(resp);}},
        ];
        showModal.value = true;
      } catch {
        confirmationHeader.value = 'Något gick fel';
        confirmationBody.value = 'Kunde inte hitta boken. \nVänligen testa igen';
        modalActions.value = [
          {text: 'Stäng', action: ():void => { showModal.value = false;}},
        ];
        showModal.value = true;
      }
      scannedBookId.value = e;
    }

    const barcode = ref(false);
    function toggleReader(): void {
      barcode.value = !barcode.value;
    }

    const foundBook = ref({});
    BooksModule.fetchAll();

    watch(() => scannedBookId.value, (newVal, _) => {
      const book = BooksModule.allAsArray.find(x => (x.barcode == scannedBookId.value));
      console.log(book);
      if (book != null) {
        foundBook.value = book;
        scannedBookStatus.value = book.condition;
      }
    });

    function onSubmit(evt: Event): void {
      evt.preventDefault();
      console.log('hello');
      modal(scannedBookId.value);
    }

    async function submitChanges(changedBook: Book): Promise<void> {
      const updatedBookCondition: BookForm = {
        ...changedBook
      };
      await LoansModule.fetchAll();
      const targetLoan = LoansModule.allAsArray.find(x => x.book_id == updatedBookCondition.barcode);
      if (targetLoan != null) {

        updatedBookCondition.condition = scannedBookStatus.value;
        LoansModule.delete(targetLoan);
        BooksModule.update(updatedBookCondition);
        scannedBookId.value = ''; // Resets values on page to default
        scannedBookStatus.value = ''; // Resets values on page to default
      } else {
        console.log('Something wen\'t wrong');
      }
    }

    function newCodeDetected(e:string): void {
      scannedBookId.value = e;
    }


    return { newCodeDetected, modalActions, scannedBookId, onSubmit, scannedBookStatus, barcode, toggleReader, confirmationBody, confirmationHeader, showModal  };
  }
});
</script>

<style>

</style>
