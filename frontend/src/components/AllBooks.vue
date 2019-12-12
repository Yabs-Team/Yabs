<template>
  <div>
    <v-data-table
      show-empty=""
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :custom-filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      @filtered="onFiltered"
    >
      <template
        slot="name"
        slot-scope="row"
      >
        {{ row.value.first }} {{ row.value.last }}
      </template>
      <template
        slot="isActive"
        slot-scope="row"
      >
        {{ row.value?'Yes :)':'No :(' }}
      </template>
      <template
        slot="actions"
        slot-scope="row"
      >
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening-->
        <v-btn
          class="mr-1"
          size="sm"
          @click.stop="info(row.item, row.index, $event.target)"
        >
          Info modal
        </v-btn>
        <v-btn
          size="sm"
          @click.stop="row.toggleDetails"
        >
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </v-btn>
      </template>
      <template
        slot="row-details"
        slot-scope="row"
      >
        <v-card>
          <ul>
            <li
              v-for="(value, key) in row.item"
              :key="key"
            >
              {{ key }}: {{ value }}
            </li>
          </ul>
        </v-card>
      </template>
    </v-data-table>
    <v-row>
      <v-col
        class="my-1"
        md="6"
      >
        <v-pagination
          v-model="currentPage"
          class="my-0"
          :total-rows="totalRows"
          :per-page="perPage"
        />
      </v-col>
    </v-row>
    <!-- Info modal-->
    <v-dialog
      id="modalInfo"
      :title="modalInfo.title"
      ok-only=""
      @hide="resetModal"
    >
      <v-card>
        <v-card-text>{{ modalInfo.content }}</v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import BooksModule from '../store/modules/BooksModule';

@Component
export default class AllBooks extends Vue {

  @Prop({ default: 5 }) public perPage!: number;
  @Prop({ default: 0 }) public pageOptions!: number;
  @Prop({ default: null }) public sortBy!: any;
  @Prop({ default: true }) public sortDesc!: boolean;
  @Prop({ default: null }) public filter!: any;
  @Prop({ default: null }) public modalInfo!: any;

  public currentPage: number = 1;
  public totalRows: number = 0;

  public fields: object[] = [
    { key: 'title.name', label: 'Titel', sortable: true, class: 'text-left' },
    { key: 'barcode', label: 'Streckkod', sortable: true, class: 'text-left' },
    { key: 'status', label: 'Status', sortable: true, class: 'text-left' },
  ];

  get items() {
    const items = Object.entries(BooksModule.all).map(([key, value]) =>
      Object.assign(value, { '.key': key }),
    );
    this.totalRows = items.length;

    return items;
  }

  get sortOptions() {
    // Create an options list from our fields
    return this.fields
      .filter((f: any) => f.sortable)
      .map((f: any) => Object({ text: f.label, value: f.key }));
  }

  public info(item: any, index: number, button: any) {
    this.modalInfo.title = `Row index: ${index}`;
    this.modalInfo.content = JSON.stringify(item, null, 2);
    this.$root.$emit('bv::show::modal', 'modalInfo', button);
  }

  public created() {
    BooksModule.fetchAll()
      .then(() => this.$emit('books-loaded', BooksModule.all))
      .catch((failure: any) => console.log(failure));
  }

  public resetModal() {
    this.modalInfo.title = '';
    this.modalInfo.content = '';
  }

  public onFiltered(filteredItems: any) {
    // Trigger pagination to update the number of buttons/pages due to filtering
    this.totalRows = filteredItems.length;
    this.currentPage = 1;
  }
}
</script>
