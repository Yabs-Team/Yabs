<template lang="pug">
div
    .view.find()
        dropdownFind(@change-type='onChangeType($event)', v-bind:selectedType='this.type')
        b-container(fluid='')
            // User Interface controls
            b-row
                b-col.my-1(md='6')
                    b-form-group.mb-0(horizontal='', label='Filter')
                        b-input-group
                            b-form-input(v-model='filter', placeholder='Type to Search')
                                b-input-group-append
                                    b-btn(:disabled='!filter', @click="filter = ''") Clear
                b-col.my-1(md='6')
                    b-form-group.mb-0(horizontal='', label='Sort')
                        b-input-group
                            //- b-form-select(v-model='sortBy', :options='sortOptions')
                            b-form-select(v-model='sortBy')
                                option(slot='first', :value='null') -- none --
                            b-form-select(:disabled='!sortBy', v-model='sortDesc', slot='append')
                                option(:value='false') Asc
                                option(:value='true') Desc
                b-col.my-1(md='6')
                    b-form-group.mb-0(horizontal='', label='Sort direction')
                        b-input-group
                            b-form-select(v-model='sortDirection', slot='append')
                                option(value='asc') Asc
                                option(value='desc') Desc
                                option(value='last') Last
                b-col.my-1(md='6')
                    b-form-group.mb-0(horizontal='', label='Per page')
                        b-form-select(:options='pageOptions', v-model='perPage')
            // Main table element
            LoadingIcon(v-show='loading')
            #info(v-show='!loading')
                #loan(v-bind:style="{display: displayTable}")
                    MainTable(:perPage="perPage", :pageOptions="pageOptions",
                    :sortBy="sortBy", :sortDesc="sortDesc",
                    :sortDirection="sortDirection",:filter="filter",
                    :modalInfo="modalInfo")

                #all(v-bind:style="{display: displayCig}")
                    AllBooks(:perPage="perPage", :pageOptions="pageOptions",
                    :sortBy="sortBy", :sortDesc="sortDesc",
                    :sortDirection="sortDirection",:filter="filter",
                    :modalInfo="modalInfo", @books-loaded="onLoaded")

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

    public perPage = 5;
    public pageOptions = [ 5, 10, 15 ];
    public sortBy = null;
    public sortDesc = true;
    public sortDirection = 'asc';
    public filter = null;
    public modalInfo = { title: '', content: '' };
    public loading = true;

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