<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="300"
      offset-y
      @show="onShow"
      @shown="onShown"
      @hidden="onHidden"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="none"
          v-bind="attrs"
          v-on="on"
        >
          Låna bok
        </v-btn>
      </template>

      <v-card>
        <template>
          Skanna boken du vill låna
        </template>
        <div>
          <v-item-group
            class="mb-1"
            label="Bok ID"
            label-for="pop1"
            :state="inputState"
            horizontal=""
            invalid-feedback="This field is required"
          >
            <v-text-field
              id="pop1"
              ref="input"
              v-model="input"
              :state="inputState"
              size="sm"
            />
          </v-item-group>
          <v-btn
            size="sm"
            variant="danger"
            @click="onCancel"
          >
            Cancel
          </v-btn>
          <v-btn
            size="sm"
            variant="primary"
            @click="onOk"
          >
            Ok
          </v-btn>
        </div>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts">
import LoansModule from '../store/modules/LoansModule';
import { Loan, AddLoanForm } from '../types';
import UsersModule from '../store/modules/UsersModule';
import { defineComponent, ref, Ref, SetupContext, watch } from '@vue/composition-api';
export default defineComponent({
  name: 'AddLoan',
  setup(_ : object, { root, emit } : SetupContext ) {

    const inputText = ref(''),
      inputState = ref(false),
      inputReturn = ref(''),
      button = ref(null),
      input = ref(''),
      menu = ref(false);

    const form: Ref < AddLoanForm > = ref ({
      book_id: 0, //eslint-disable-line camelcase
      /* Hardcoded value atm for the school */
      lent_by_id: 1854282603, //eslint-disable-line camelcase
      loaned_by_id: 0, //eslint-disable-line camelcase
      expiration_date: '2020/02/12' //eslint-disable-line camelcase
  
    });

    function onCancel(): void {
      menu.value = false;
    }

    function onOk() : void{
      if(!inputText.value){
        inputState.value = false;
      }
      if (!input.value) {
        onCancel();
        /* "Return" our popover "form" results */
        inputReturn.value = input.value;
        form.value.book_id = parseInt(input.value); //eslint-disable-line camelcase
        form.value.loaned_by_id = UsersModule.currentUserID; //eslint-disable-line camelcase
        /* This Checks if the form contains the necessary data  */
        if (!!form.value.lent_by_id && !!form.value.loaned_by_id && !!form.value.book_id) {
          LoansModule.create(form.value)
            .then((payload: Loan) => emit('loan-added', payload))
            .catch((failure: boolean) => console.log(failure));
          input.value = '';
        }
      }
    }

    function onShow() : void {
      inputText.value = '';
      inputState.value = false;
      inputReturn.value = '';
    }
    
    function onShown(): void {
      focusRef(input);
    }

    function onHidden() : void {
      focusRef(button);
    }
    
    function focusRef(ref : any) : void { //eslint-disable-line @typescript-eslint/no-explicit-any
      root.$nextTick(() => {
        root.$nextTick(() => {
          (ref.$el || ref).focus();
        });
      });
    }
    
    watch(input,(value, prevValue) => {
      if (value) {
        inputState.value = true;
      }
    });
    
    return{
      input,
      inputState,
      inputReturn,
      onCancel,
      button,
      inputText,
      onOk,
      onShow,
      onShown,
      onHidden,
      menu
    };
  }
});
</script>
