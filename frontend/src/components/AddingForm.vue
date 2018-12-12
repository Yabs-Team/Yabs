<template lang="pug">
   div
    b-form(@submit='onSubmit', @reset='onReset', v-if='show')
        b-card(bg-variant='light')
            b-form-group(vertical='' label-class='text-sm-right' label-for='nestedBid')
                b-form-input#nestedBid(placeholder='Bokens Streckkod' v-model="form.barcode")
            b-form-group(vertical='' label-class='text-sm-right' label-for='nestedBid')
                vue-bootstrap-typeahead(v-model="name" :data="titleNames" @hit="toId()" placeholder='Titel namn')
            b-form-group(vertical='' label-class='text-sm-right' label-for='nestedBid')
                b-form-input#nestedBid(placeholder='Status: tex "ok", "framsida saknas"' v-model="form.status")
            b-button(type='submit', variant='primary') Lägg till
            b-button(type='reset', variant='danger') Rensa Fältet

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from '../decorators';
import { TitleObject } from '../store/modules/titles';

@Component
export default class AddingForm extends Vue {
    
    @Getter('titles/all') public titles!: TitleObject;

    public form = {
        barcode: '',
        title_id: 0,
        status: '',
    };
    public name: string = '';
    public show = true;
    
    get titleNames() {
        return Object.entries(this.titles).map(([k, title]) => title.name);
    }

    public toId() {
       for (const title in this.titles) {
           if (this.name === this.titles[title].name) {
               this.form.title_id = this.titles[title].id;
           }
       }
    }

    public onSubmit(evt: Event) {
        evt.preventDefault();
        console.log(this.$store.dispatch('books/create', this.form));
        // alert(JSON.stringify(this.form));
    }

    public onReset(evt: Event) {
        evt.preventDefault();
        this.form.barcode = '';
        this.form.title_id = 0;
        this.form.status = '';
        this.show = false;
        this.$nextTick(() => { this.show = true; });
    }
}
</script>
