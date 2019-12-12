<template>
  <div>
    <b-dropdown
      id="ddown1"
      class="m-md-2"
      text="Ändra Typ"
    >
      <b-dropdown-item @click="changeToLoan">
        Lån
      </b-dropdown-item>
      <b-dropdown-item @click="changeToCig">
        ID Kort
      </b-dropdown-item>
      <b-dropdown-item
        data-cy="book"
        @click="changeToBook"
      >
        Bok
      </b-dropdown-item>
      <b-dropdown-item
        data-cy="title"
        @click="changeToTitel"
      >
        Titel
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

// this will be routes instead


@Component
export default class DropDownType extends Vue {
  @Prop({ default: '' }) public selectedType!: string;

  public type: string = this.selectedType;

  @Watch('type')
  public changeType() {
    this.$emit('changeType', this.type);
  }

  public changeToLoan() {
    this.type = 'Lån';
  }

  public changeToCig() {
    this.type = 'ID Kort';
  }

  public changeToBook() {
    this.type = 'Bok';
  }

  public changeToTitel() {
    this.type = 'Titel';
  }
}
</script>
