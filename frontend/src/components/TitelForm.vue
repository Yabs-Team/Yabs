<template lang="pug">
   div
    b-form(@submit='onSubmit', @reset='onReset', v-if='show')
        b-card(bg-variant='light')
            b-form-group(vertical='' label-class='text-sm-right' label-for='nestedBid')
                b-form-input#nestedBid(placeholder='Namn' v-model="form.name")
            b-form-group(vertical='' label-class='text-sm-right' label-for='nestedBid')
                b-form-input#nestedBid(placeholder='Kostnad' v-model="form.cost")
            b-form-group(vertical='' label-class='text-sm-right' label-for='nestedBid')
                b-form-input#nestedBid(placeholder='isbn' v-model="form.isbn")
            b-form-select(v-model="form.title_type" :options="options" class="mb-3")
            b-button(type='submit', variant='primary') Lägg till
            b-button(type='reset', variant='danger') Rensa Fältet

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TitleForm extends Vue {

    public form = {
        name: '',
        cost: '',
        isbn: '',
        title_type: '',
    };
    public show = true;

    public options =  [
        { value: null, text: 'Välj typ av Titel' },
        { value: 'Kurslitteratur', text: 'Kurslitteratur' },
        { value: 'Bibloteksbok', text: 'Bibloteksbok' },
        { value: 'Skönlitteratur', text: 'Skönlitteratur' },
      ];

   public onSubmit(evt: Event) {
        evt.preventDefault();
        this.$store.dispatch('titles/create', this.form)
            .then((title: any) => this.$emit('title-added', title))
            .catch((failure: any) => console.log(failure));
        // alert(JSON.stringify(this.form));
    }

    public onReset(evt: Event) {
        evt.preventDefault();
        this.form.name = '';
        this.form.cost = '';
        this.form.isbn = '';
        this.show = false;
        this.$nextTick(() => { this.show = true; });
    }
}
</script>
