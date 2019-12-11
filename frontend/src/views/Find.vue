<template lang="pug">
div
    .view.find()
        dropdownFind(@change-type='onChangeType($event)', v-bind:selectedType='this.type')
        v-container(fluid='')
            // User Interface controls
            v-row
                v-col(md='6')
                    v-text-field(v-model='filter', label='Type to Search')
                        //- v-input-group-append
                        //-     v-btn(:disabled='!filter', @click="filter = ''") Clear
                v-col(md='6')
                    //- b-form-select(v-model='sortBy', :options='sortOptions')
                    v-select(v-model='sortDesc', :items="sortTypes", item-text="text", item-value="value", label='Sort')
                v-col(md='6')
                    v-select(:items='pageOptions', v-model='perPage', label='Per page')
            // Main table element
            LoadingIcon(v-show='loading')
            #info(v-show='!loading')
                #loan(v-bind:style="{display: displayTable}")
                    MainTable(:perPage="perPage", :pageOptions="pageOptions",
                    :sortBy="sortBy", :sortDesc="sortDesc",
                    :filter="filter",
                    :modalInfo="modalInfo")

                #all(v-bind:style="{display: displayCig}")
                    AllBooks(:perPage="perPage", :pageOptions="pageOptions",
                    :sortBy="sortBy", :sortDesc="sortDesc",
                    :filter="filter",
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
  
  public perPage: number = 5;
  public pageOptions: number[] = [ 5, 10, 15 ];
  public sortBy = null;
  public sortDesc = true;
  public filter = null;
  public modalInfo = { title: '', content: '' };
  public loading = true;

  private sortTypes = [{text: 'Asc', value: false}, {text: 'Desc', value: true}];

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
