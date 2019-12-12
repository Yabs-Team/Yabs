<template>
  <div>
    <div class="view find">
      <dropdownFind
        :selected-type="this.type"
        @change-type="onChangeType($event)"
      />
      <v-container fluid>
        <!-- User Interface controls-->
        <v-row>
          <v-col md="6">
            <v-text-field
              v-model="filter"
              label="Type to Search"
            />
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
            <v-select
              v-model="perPage"
              :items="pageOptions"
              label="Per page"
            />
          </v-col>
        </v-row>
        <!-- Main table element-->
        <LoadingIcon v-show="loading" />
        <div
          v-show="!loading"
          id="info"
        >
          <div
            id="loan"
            :style="{display: displayTable}"
          >
            <MainTable
              :per-page="perPage"
              :page-options="pageOptions"
              :sort-by="sortBy"
              :sort-desc="sortDesc"
              :filter="filter"
              :modal-info="modalInfo"
            />
          </div>
          <div
            id="all"
            :style="{display: displayCig}"
          >
            <AllBooks
              :per-page="perPage"
              :page-options="pageOptions"
              :sort-by="sortBy"
              :sort-desc="sortDesc"
              :filter="filter"
              :modal-info="modalInfo"
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
