<template>
  <div>
    <div class="view find">
      <dropdownFind @change-type="onChangeType($event)" v-bind:selectedType="this.type" />
      <v-container fluid>
        <!-- User Interface controls-->
        <v-row>
          <v-col md="6">
            <v-text-field v-model="filter" label="Type to Search" />
          </v-col>
          <v-col md="6">
            <v-select
              v-model="sortDesc"
              :items="sortTypes"
              item-text="text"
              item-value="value"
              label="Sort"
            />
          </v-col>
          <v-col md="6">
            <v-select :items="pageOptions" v-model="perPage" label="Per page" />
          </v-col>
        </v-row>
        <!-- Main table element-->
        <LoadingIcon v-show="loading" />
        <div id="info" v-show="!loading">
          <div id="loan" v-bind:style="{display: displayTable}">
            <MainTable
              :perPage="perPage"
              :pageOptions="pageOptions"
              :sortBy="sortBy"
              :sortDesc="sortDesc"
              :filter="filter"
              :modalInfo="modalInfo"
            />
          </div>
          <div id="all" v-bind:style="{display: displayCig}">
            <AllBooks
              :perPage="perPage"
              :pageOptions="pageOptions"
              :sortBy="sortBy"
              :sortDesc="sortDesc"
              :filter="filter"
              :modalInfo="modalInfo"
              @books-loaded="onLoaded"
            />
          </div>
        </div>
      </v-container>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DropdownFind from '@/components/DropdownFind.vue';
import MainTable from '@/components/MainTable.vue';
import AllBooks from '@/components/AllBooks.vue';
import LoadingIcon from '@/components/LoadingIcon.vue';

@Component({
  components: {
    DropdownFind,
    MainTable,
    AllBooks,
    LoadingIcon,
  },
})
export default class Find extends Vue {
  public type = 'Utlånade';
  public displayTable = 'block';
  public displayCig = 'none';

  public perPage: number = 5;
  public pageOptions: number[] = [5, 10, 15];

  public sortBy = null;
  public sortDesc = true;
  public filter = null;
  public modalInfo = { title: '', content: '' };
  public loading = true;

  private sortTypes = [
    { text: 'Asc', value: false },
    { text: 'Desc', value: true },
  ];

  public onChangeType(type: string) {
    this.type = type;
    if (this.type === 'Utlånade') {
      this.displayTable = 'block';
      this.displayCig = 'none';
    } else {
      this.displayTable = 'none';
      this.displayCig = 'block';
    }
  }

  public onLoaded() {
    this.loading = false;
  }
}
</script>

<style lang="sass">
    .card
        margin: 25px

    .find
        margin-left: 0% 
        width: 50vw
        margin-top: 70px    

</style>
