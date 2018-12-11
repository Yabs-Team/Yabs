<template lang="pug">
    div
        b-table(v-if="!loansLoading" show-empty='', stacked='md', :items='items', :fields='fields', :current-page='currentPage', :per-page='perPage', :filter='filter', :sort-by.sync='sortBy', :sort-desc.sync='sortDesc', :sort-direction='sortDirection', @filtered='onFiltered')
            template(slot='name', slot-scope='row') {{row.value.first}} {{row.value.last}}
            template(slot='isActive', slot-scope='row') {{row.value?'Yes :)':'No :('}}
            template(slot='actions', slot-scope='row')
                // We use @click.stop here to prevent a 'row-clicked' event from also happening
                b-button.mr-1(size='sm', @click.stop='info(row.item, row.index, $event.target)')
                    | Info modal
                b-button(size='sm', @click.stop='row.toggleDetails')
                    | {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
            template(slot='row-details', slot-scope='row')
                b-card
                    ul
                        li(v-for='(value, key) in row.item', :key='key') {{ key }}: {{ value}}
        .preloader(v-else)
            p LOADING!
        b-row
            b-col.my-1(md='6')
                b-pagination.my-0(:total-rows='totalRows', :per-page='perPage', v-model='currentPage')
        // Info modal
        b-modal#modalInfo(@hide='resetModal', :title='modalInfo.title', ok-only='')
            pre.
                \n{{ modalInfo.content }}        
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from '../decorators';

@Component
export default class MainTable extends Vue {
    @Getter('loans/all') public loans: any;

    @Prop({default: 5}) public perPage!: number;
    @Prop({default: 0}) public pageOptions!: number;
    @Prop({default: null}) public sortBy!: any;
    @Prop({default: true}) public sortDesc!: boolean;
    @Prop({default: 'desc'}) public sortDirection!: string;
    @Prop({default: null}) public filter!: any;
    @Prop({default: null}) public modalInfo!: any;

    public loansLoading: boolean = true;

    public fields = [
        { key: 'loaned_by.name', sortable: false, label: 'Lånad av'},
        { key: 'lent_by.name', sortable: false, label: 'Utlånad av'},
        { key: 'book.title.name', sortable: false, label: 'Boktitel'},
        { key: 'expiration_date', sortable: false, label: 'Utgångsdatum'},
      ];

    public currentPage = 1;

    public totalRows = 0;

    get items() {
        const items = Object.entries(this.loans).filter(([k, v]) => {
            // @ts-ignore: returned at
            this.totalRows = items.length;
        }).map(([k, v]) => Object.assign(v, {'.key': k}));
        this.totalRows = items.length;

        return items;
    }


    get sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f: any) => f.sortable)
        .map((f: any) => Object({ text: f.label,
                    value: f.key }) );
    }

    public created() {
        this.$store.dispatch('loans/all')
        .then( () => {
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