<template>
  <div @click="changeType">
    <b-dropdown class="m-md-2" id="ddown1" :text="type">
      <b-dropdown-item @click="changeToLoan">Utlånade</b-dropdown-item>
      <b-dropdown-item @click="changeToCig">Alla Böcker</b-dropdown-item>
    </b-dropdown>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

// this will be routes instead

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
