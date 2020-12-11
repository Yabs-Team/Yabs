<template>
  <div id="myContainer">
    <div class="my-3">
      <v-btn
        id="exPopoverReactive1" 
        ref="button"
        :disabled="popoverShow"
        variant="primary"
      >
        <h1 class="material-icons icon">
          add
        </h1>
      </v-btn>
    </div>
    <v-tooltip
      ref="popover"
      target="exPopoverReactive1"
      triggers="click"
      :show.sync="popoverShow"
      placement="bottom"
      container="myContainer"
      @show="onShow"
      @shown="onShown"
      @hidden="onHidden"
    >
      <template slot="title">
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
          @click="onClose"
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
    </v-tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from 'vue-property-decorator';
import { ref } from '@vue/composition-api';

export default {
  name: 'AddLoan',
  setup(_ : object , ctx : object) : object{
    
    let input = ref(''),
      inputState = ref(false),
      inputReturn = ref(''),
      popoverShow = ref(false); 

    function onClose() : void{
      popoverShow.value = false;
    }

    function onOk() : void{
      if(!input.value){
        inputState.value = false;
      }
      if(!input.value){
        onClose();
        inputReturn.value = input.value;
      }
    }

    function onShow() : void {
      input.value = '';
      inputState.value = false;
      inputReturn.value = '';
    }

    // function onShown(){
      
    // }

    console.log(input);
    alert('tjofan');

    return{
      input,
      inputState,
      inputReturn,
      popoverShow,
      onClose,
      onOk,
      onShow,
      // onShown,
      // onHidden,
      // focusRef,
    };
  }
};

//   public onShown(): void {
//     /* Called just after the popover has been shown */
//     /* Transfer focus to the first input */
//     this.focusRef(this.$refs.input);
//   }

//   public onHidden(): void {
//     /* Called just after the popover has finished hiding */
//     /* Bring focus back to the button */
//     this.focusRef(this.$refs.button);
//   }

//   public focusRef(ref: any): void { //eslint-disable-line @typescript-eslint/no-explicit-any
//     /* Some references may be a component, functional component, or plain element */
//     /* This handles that check before focusing, assuming a focus() method exists */
//     /* We do this in a double nextTick to ensure components have updated & popover positioned first */
//     this.$nextTick(() => {
//       this.$nextTick(() => {
//         (ref.$el || ref).focus();
//       });
//     });
//   }

//   @Watch('input')
//   public onInputChange(val: string, oldVal: string): void {
//     if (val) {
//       this.inputState = true;
//     }
//   }
// }
</script>


<style lang="sass" scoped>
    .icon
        font-size: 30px
</style>

