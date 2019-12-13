<template>
  <v-card>
    <v-card-title>
      <v-text-field 
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table 
      :headers="headers"
      :items="items"
      :search="search"
    />
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface IHeader {
  text: string;
  value: string;
}

@Component({})
export default class SearchListComponent extends Vue {
  public search: string = '';
  @Prop() public headers!: IHeader[];
  @Prop() public items!: any[]; // Please fix generic types.

}
</script>
