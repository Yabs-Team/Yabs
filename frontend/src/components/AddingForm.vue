<template lang="pug">
   div
    b-form(@submit='onSubmit', @reset='onReset', v-if='show')
        b-card(bg-variant='light')
            b-form-group(vertical='' label-class='text-sm-right' label-for='nestedBid')
                b-form-input#nestedBid(placeholder='Bokens Streckkod' v-model="form.barcode")
            b-form-group(vertical='' label-class='text-sm-right' label-for='nestedBid')
                b-form-input#nestedBid(placeholder='Titel' v-model="form.titel")
            b-form-group(vertical='' label-class='text-sm-right' label-for='nestedBid')
                b-form-input#nestedBid(placeholder='Status: tex "ok", "framsida saknas"' v-model="form.status")
            b-button(type='submit', variant='primary') Lägg till
            b-button(type='reset', variant='danger') Rensa Fältet

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LoaningForm extends Vue {
    public form = {
        barcode: '',
        titel: '',
        status: '',
    };
    public show = true;

    public onSubmit(evt: Event) {
        evt.preventDefault();
        console.log(this.$store.dispatch('books/create', this.form));
        // alert(JSON.stringify(this.form));
    }

    public onReset(evt: Event) {
        evt.preventDefault();
        this.form.barcode = '';
        this.form.titel = '';
        this.form.status = '';
        this.show = false;
        this.$nextTick(() => { this.show = true; });
    }
}
</script>
