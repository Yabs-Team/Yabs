<template lang="pug">
    div(@click='changeType')
        b-dropdown#ddown1.m-md-2(:text="type")
            b-dropdown-item(@click='changeToLoan') Utlånade
            b-dropdown-item(@click='changeToCig') Alla Böcker

</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DropdownFind extends Vue {
  @Prop({ default: '' }) public selectedType!: string;

  public type = this.selectedType;

  public changeType() {
    this.$emit('change-type', this.type);
  }

  public changeToLoan() {
    this.type = 'Utlånade';
  }

  public changeToCig() {
    this.type = 'Alla Böcker';
  }
}
</script>
