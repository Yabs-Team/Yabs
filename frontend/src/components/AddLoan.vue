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
            v-model="inputText"
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
import { ref, defineComponent, SetupContext, watch } from '@vue/composition-api';

export default defineComponent({
  name: 'AddLoan',
  setup(_ : object, { root } : SetupContext) {
    
    let inputText = ref(''),
      inputState = ref(false),
      inputReturn = ref(''),
      popoverShow = ref(false),
      button = ref(null),
      input = ref(null);
      
    function onClose() : void{
      popoverShow.value = false;
    }

    function onOk() : void{
      if(!inputText.value){
        inputState.value = false;
      }
      if(!inputText.value){
        onClose();
        inputReturn.value = inputText.value;
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

    console.log(popoverShow);

    return{
      input,
      inputState,
      inputReturn,
      popoverShow,
      onClose,
      button,
      inputText,
      onOk,
      onShow,
      onShown,
      onHidden
    };
  }
});
</script>


<style lang="sass" scoped>
    .icon
        font-size: 30px
</style>
