<template>
  <b-container fluid>
    <!-- User Interface controls-->
    <b-row>
      <b-col
        class="my-1"
        md="6"
      >
        <b-form-group
          class="mb-0"
          horizontal
          label="Filter"
        >
          <b-input-group>
            <b-form-input
              v-model="filter"
              placeholder="Type to Search"
            >
              <b-input-group-append>
                <b-btn
                  :disabled="!filter"
                  @click="filter = ''"
                >
                  Clear
                </b-btn>
              </b-input-group-append>
            </b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col
        class="my-1"
        md="6"
      >
        <b-form-group
          class="mb-0"
          horizontal
          label="Sort"
        >
          <b-input-group>
            <b-form-select
              v-model="sortBy"
              :options="sortOptions"
            >
              <option
                slot="first"
                :value="null"
              >
                -- none --
              </option>
            </b-form-select>
            <b-form-select
              slot="append"
              v-model="sortDesc"
              :disabled="!sortBy"
            >
              <option :value="false">
                Asc
              </option>
              <option :value="true">
                Desc
              </option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col
        class="my-1"
        md="6"
      >
        <b-form-group
          class="mb-0"
          horizontal
          label="Sort direction"
        >
          <b-input-group>
            <b-form-select
              slot="append"
              v-model="sortDirection"
            >
              <option value="asc">
                Asc
              </option>
              <option value="desc">
                Desc
              </option>
              <option value="last">
                Last
              </option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col
        class="my-1"
        md="6"
      >
        <b-form-group
          class="mb-0"
          horizontal
          label="Per page"
        >
          <b-form-select
            v-model="perPage"
            :options="pageOptions"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <!-- Main table element-->
    <b-table
      show-empty
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
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
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import dropdownFind from '@/components/dropdownFind.vue';

@Component({
  components: {
    dropdownFind,
  },
})
export default class Find extends Vue {
  public items = [
    // Mockup
    {
      elevnamn: 'Simon Johannesson',
      lån: 'The Hobbit',
      lärarnamn: 'Daniel Berg',
      utgångsdatum: '01-01-2019',
    },
    {
      elevnamn: 'Eric Persson',
      lån: 'Lord of the flies',
      lärarnamn: 'David Lundholm',
      utgångsdatum: '01-01-2019',
    },
    {
      elevnamn: 'Filip Gustavsson',
      lån: 'The hitchhiker\'s guide to the galaxy',
      lärarnamn: 'Fredrik Kronhamn',
      utgångsdatum: '01-01-2019',
    },
    {
      elevnamn: 'Alex henryz',
      lån: 'Moby Dick',
      lärarnamn: 'Daniel Berg',
      utgångsdatum: '01-01-2019',
    },
    {
      elevnamn: 'Linus Styrén',
      lån: 'Harry Potter 3',
      lärarnamn: 'David Lundholm',
      utgångsdatum: '01-01-2019',
    },
  ];

  public fields = [
    {
      key: 'elevnamn',
      label: 'Utlånad till',
      sortable: true,
      class: 'text-left',
    },
    { key: 'lärarnamn', label: 'Utlånad av', class: 'text-left' },
    { key: 'lån', label: 'Material', sortable: true, class: 'text-left' },
    {
      key: 'utgångsdatum',
      label: 'Utgångsdatum',
      sortable: true,
      class: 'text-left',
    },
  ];

  public currentPage = 1;

  public perPage = 5;
  public totalRows = this.items.length;
  public pageOptions = [5, 10, 15];
  public sortBy = null;
  public sortDesc = true;
  public sortDirection = 'asc';
  public filter = null;
  public modalInfo = { title: '', content: '' };

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
