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
import { Component, Watch, Prop, Vue } from 'vue-property-decorator';
import LoansModule from '../store/modules/LoansModule';
import { Loan, AddLoan } from '../types';
import UsersModule from '../store/modules/UsersModule';

@Component
export default class AddLoan extends Vue {
  public input: string = '';
  public inputState: boolean | null = null;
  public menu: boolean = false;
  public inputReturn: string = '';

  public form: AddLoan = {
    book_id: 0, //eslint-disable-line camelcase
    /* Hardcoded value atm for the school */
    lent_by_id: 2054282603, //eslint-disable-line camelcase
    loaned_by_id: 0 //eslint-disable-line camelcase
  };


  public onCancel(): void {
    this.menu = false;
  }

  public onOk(): void {
    if (!this.input) {
      this.inputState = false;
    }
    if (this.input) {
      this.onCancel();
      /* "Return" our popover "form" results */
      this.inputReturn = this.input;
      this.form.book_id = parseInt(this.input); //eslint-disable-line camelcase
      this.form.loaned_by_id = UsersModule.currentUserID; //eslint-disable-line camelcase
      /* This Checks if the form contains the necessary data  */
      if (!!this.form.lent_by_id && !!this.form.loaned_by_id && !!this.form.book_id) {
        LoansModule.create(this.form)
          .then((payload: Loan) => this.$emit('loan-added', payload))
          .catch((failure: boolean) => console.log(failure));
        this.input = '';
      }

    
    }
  }

  public onShow(): void {
    /* This is called just before the popover is shown */
    /* Reset our popover "form" variables */
    this.input = '';
    this.inputState = null;
    this.inputReturn = '';
  }

  public onShown(): void {
    /* Called just after the popover has been shown */
    /* Transfer focus to the first input */
    this.focusRef(this.$refs.input);
  }

  public onHidden(): void {
    /* Called just after the popover has finished hiding */
    /* Bring focus back to the button */
    this.focusRef(this.$refs.button);
  }

  public focusRef(ref: any): void { //eslint-disable-line @typescript-eslint/no-explicit-any
    /* Some references may be a component, functional component, or plain element */
    /* This handles that check before focusing, assuming a focus() method exists */
    /* We do this in a double nextTick to ensure components have updated & popover positioned first */
    this.$nextTick(() => {
      this.$nextTick(() => {
        (ref.$el || ref).focus();
      });
    });
  }

  @Watch('input')
  public onInputChange(val: string, oldVal: string): void {
    if (val) {
      this.inputState = true;
    }
  }
}
</script>

