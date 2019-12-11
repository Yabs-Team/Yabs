<template>
    <div id="myContainer">
    <div class="my-3">
        <v-btn
          id="exPopoverReactive1" 
          :disabled="popoverShow"
          variant="primary"
          ref="button"
        >
          <h1 class="material-icons icon">add</h1>
        </v-btn>
    </div>
    <v-tooltip
      target="exPopoverReactive1"
      triggers="click"
      :show.sync="popoverShow"
      placement="bottom"
      container="myContainer"
      ref="popover"
      @show="onShow"
      @shown="onShown"
      @hidden="onHidden"
    >
      <template slot="title">Skanna boken du vill låna</template>
        <div>
            <v-item-group
              class="mb-1"
              label="Bok ID"
              label-for="pop1"
              :state="inputState"
              horizontal=""
              invalid-feedback="This field is required"
            >
              <v-text-field id="pop1" ref="input" :state="inputState" size="sm" v-model="input"></v-text-field>
            </v-item-group>
            <v-btn @click="onClose" size="sm" variant="danger">Cancel</v-btn>
            <v-btn @click="onOk" size="sm" variant="primary">Ok</v-btn>
        </div>
    </v-tooltip>
</div>

</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AddLoan extends Vue {
  public input = '';
  public inputState: boolean | null = null;
  public options = [
    { text: '- Choose 1 -', value: '' },
    'Red',
    'Green',
    'Blue',
  ];
  public inputReturn = '';
  public popoverShow = false;

  public onClose() {
    this.popoverShow = false;
  }

  public onOk() {
    if (!this.input) {
      this.inputState = false;
    }
    if (this.input) {
      this.onClose();
      /* "Return" our popover "form" results */
      this.inputReturn = this.input;
    }
  }

  public onShow() {
    /* This is called just before the popover is shown */
    /* Reset our popover "form" variables */
    this.input = '';
    this.inputState = null;
    this.inputReturn = '';
  }

  public onShown() {
    /* Called just after the popover has been shown */
    /* Transfer focus to the first input */
    this.focusRef(this.$refs.input);
  }

  public onHidden() {
    /* Called just after the popover has finished hiding */
    /* Bring focus back to the button */
    this.focusRef(this.$refs.button);
  }

  public focusRef(ref: any) {
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
  public onInputChange(val: any, oldVal: any) {
    if (val) {
      this.inputState = true;
    }
  }
}
</script>


<style lang="sass" scoped>
    .icon
        font-size: 30px
</style>

