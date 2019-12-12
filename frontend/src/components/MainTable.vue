<template>
  <div>
    <b-table
      v-if="!loansLoading"
      show-empty
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
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
        <b-button
          class="mr-1"
          size="sm"
          @click.stop="info(row.item, row.index, $event.target)"
        >
          Info modal
        </b-button>
        <b-button
          size="sm"
          @click.stop="row.toggleDetails"
        >
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>
      <template
        slot="row-details"
        slot-scope="row"
      >
        <b-card>
          <ul>
            <li
              v-for="(value, key) in row.item"
              :key="key"
            >
              {{ key }}: {{ value }}
            </li>
          </ul>
        </b-card>
      </template>
    </b-table>
    <div
      v-else
      class="preloader"
    >
      <p>LOADING!</p>
    </div>
    <b-row>
      <b-col
        class="my-1"
        md="6"
      >
        <b-pagination
          v-model="currentPage"
          class="my-0"
          :total-rows="totalRows"
          :per-page="perPage"
        />
      </b-col>
    </b-row>
    <!-- Info modal-->
    <b-modal
      id="modalInfo"
      :title="modalInfo.title"
      ok-only
      @hide="resetModal"
    >
      <pre>\n{{ modalInfo.content }}</pre>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LoansModule from '../store/modules/LoansModule';

@Component
export default class MainTable extends Vue {
  @Prop({ default: 5 }) public perPage!: number;
  @Prop({ default: 0 }) public pageOptions!: number;
  @Prop({ default: null }) public sortBy!: any;
  @Prop({ default: true }) public sortDesc!: boolean;
  @Prop({ default: null }) public filter!: any;
  @Prop({ default: null }) public modalInfo!: any;

  public loansLoading: boolean = true;

  public fields: object[] = [
    { key: 'loaned_by.name', sortable: false, label: 'Lånad av' },
    { key: 'lent_by.name', sortable: false, label: 'Utlånad av' },
    { key: 'book.title.name', sortable: false, label: 'Boktitel' },
    { key: 'expiration_date', sortable: false, label: 'Utgångsdatum' },
  ];

  public currentPage: number = 1;

  public totalRows: number = 0;

  get items() {
    const items = Object.entries(LoansModule.all)
      .filter(([key, value]) => {
        return !value.returned_at;
      })
      .map(([key, value]) => Object.assign(value, { '.key': key }));
    this.totalRows = items.length;

    return items;
  }

  get sortOptions() {
    // Create an options list from our fields
    return this.fields
      .filter((f: any) => f.sortable)
      .map((f: any) => Object({ text: f.label, value: f.key }));
  }

  public created() {
    LoansModule.fetchAll().then(() => {
      this.loansLoading = false;
    });
  }

  public info(item: any, index: number, button: any) {
    this.modalInfo.title = `Row index: ${index}`;
    this.modalInfo.content = JSON.stringify(item, null, 2);
    this.$root.$emit('bv::show::modal', 'modalInfo', button);
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
