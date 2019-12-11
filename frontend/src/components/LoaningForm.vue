<template>
  <div>
    <v-form @submit="onSubmit" @reset="onReset" v-if="show">
      <v-card bg-variant="light">
        <v-item-group vertical="" label-class="text-sm-right" label-for="nestedUid">
          <v-text-field id="nestedUid" placeholder="Elevens Streckkod" v-model="form.loaned_by_id" />
        </v-item-group>
        <v-item-group vertical="" label-class="text-sm-right" label-for="nestedBid">
          <v-text-field id="nestedBid" placeholder="Bokens Streckkod" v-model="form.book_id" />
        </v-item-group>
        <v-btn type="submit" variant="primary">Låna Ut</v-btn>
        <v-btn type="reset" variant="danger">Rensa Fälten</v-btn>
      </v-card>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import LoansModule from '../store/modules/LoansModule';
import UsersModule from '../store/modules/UsersModule';

interface Form {
  lent_by_id: any;
  loaned_by_id: '';
  book_id: '';
}

@Component
export default class LoaningForm extends Vue {
  public form: Form = {
    lent_by_id: '',
    loaned_by_id: '',
    book_id: '',
  };
  public show = true;

  public onSubmit(evt: Event) {
    evt.preventDefault();
    this.form.lent_by_id = UsersModule.currentUser ? UsersModule.currentUser.uid : '';
    LoansModule.create(this.form)
      .then((loan: any) => this.$emit('loan-added', loan))
      .catch((failure: any) => console.log(failure));
  }

  public onReset(evt: Event) {
    evt.preventDefault();
    this.form.loaned_by_id = '';
    this.form.book_id = '';
    this.show = false;
    this.$nextTick(() => {
      this.show = true;
    });
  }
}
</script>
