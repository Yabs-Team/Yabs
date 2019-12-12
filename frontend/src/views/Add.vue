<template>
  <div class="view">
    <div class="left">
      <v-alert
        type="error"
        :show="showDismissibleDangerAlert"
        dismissible="dismissible"
      >
        {{ failure }}
      </v-alert>
      <v-alert
        type="success"
        :show="showDismissibleSuccessAlert"
        dismissible="dismissible"
      >
        Loan added
      </v-alert>
      <div class="container">
        <h1>Lägg till {{ this.type }}</h1>
        <DropDownType
          :selected-type="this.type"
          @changeType="onChangeType($event)"
        />
        <LoaningForm
          :style="{ display: displayLoan }"
          @loan-added="onLoanAdded"
        />
        <CigForm
          :style="{ display: displayCig }"
          @sendImages="onSendImages($event)"
        />
        <CreateBookFormComponent :style="{ display: displayAdd }" />
        <TitelForm :style="{ display: displayTitel }" />
      </div>
    </div>
    <LoadingIcon v-show="loading" />
    <div
      v-show="!loading"
      class="right"
    >
      <RecentLoan
        :style="{ display: displayLoan }"
        @loans-loaded="onLoaded"
      />
      <CanvasContainer
        :style="{ display: displayCig }"
        :images="images"
      />
      <RecentBook :style="{ display: displayAdd }" />
      <RecentTitel :style="{ display: displayTitel }" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import LoaningForm from '@/components/LoaningForm.vue';
import CigForm from '@/components/CigForm.vue';
import CreateBookFormComponent from '@/components/CreateBookFormComponent.vue';
import DropDownType from '@/components/DropDownType.vue';
import RecentBook from '@/components/RecentBook.vue';
import RecentLoan from '@/components/RecentLoan.vue';
import RecentTitel from '@/components/RecentTitel.vue';
import CanvasContainer from '@/components/CanvasContainer.vue';
import TitelForm from '@/components/TitelForm.vue';
import LoadingIcon from '@/components/LoadingIcon.vue';

@Component({
  components: {
    LoaningForm,
    CigForm,
    CreateBookFormComponent,
    TitelForm,
    DropDownType,
    RecentLoan,
    RecentTitel,
    RecentBook,
    CanvasContainer,
    LoadingIcon,
  },
})
export default class Add extends Vue {
  public type = 'Lån';
  public displayLoan = 'block';
  public displayCig = 'none';
  public updated = false;
  public images: File[] = [];
  public showDismissibleDangerAlert = false;
  public showDismissibleSuccessAlert = false;
  public failure: any = '';
  public hasAddedLoan: boolean = false;
  public loading = true;

  public displayAdd = 'none';
  public displayTitel = 'none';

  @Watch('$store.state.loans.failure')
  public onFailureChanged(val: any) {
    this.failure = Object.entries(this.$store.state.loans.failure.response.data)
      .map(([k, v]) => {
        // @ts-ignore: v is array
        return k + ' ' + v.join(', ');
      })
      .join(' and ');
    this.showDismissibleDangerAlert = true;
    this.showDismissibleSuccessAlert = false;
  }
  @Watch('$store.state.loans.loans')
  public onLoansChanged(val: any) {
    if (this.hasAddedLoan) {
      this.hasAddedLoan = false;
      this.showDismissibleSuccessAlert = true;
      this.showDismissibleDangerAlert = false;
    }
  }

  public onLoanAdded(payload: any) {
    this.hasAddedLoan = true;
  }

  public onLoaded() {
    this.loading = false;
  }

  public onChangeType(type: string) {
    this.type = type;

    if (this.type === 'Lån') {
      this.displayLoan = 'block';
      this.displayCig = 'none';
      this.displayAdd = 'none';
      this.displayTitel = 'none';
    } else if (this.type === 'ID Kort') {
      this.displayLoan = 'none';
      this.displayCig = 'flex';
      this.displayAdd = 'none';
      this.displayTitel = 'none';
    } else if (this.type === 'Bok') {
      this.displayLoan = 'none';
      this.displayCig = 'none';
      this.displayAdd = 'block';
      this.displayTitel = 'none';
    } else {
      this.displayLoan = 'none';
      this.displayCig = 'none';
      this.displayAdd = 'none';
      this.displayTitel = 'block';
    }
  }

  public onSendImages(images: any[]) {
    this.images = images;
  }

  public onSendImages(images: any[]) {
    this.images = images;
  }
}
</script>

<style lang="sass" scoped>
    .left
        width: 50%
        height: 100%
        padding: 10%
        padding-top: 5%

    .right
        width: 50%
        height: 100%
        padding: 5%
        padding-left: 0px

    @media only screen and (max-width: 808px)
        .right, .left
            width: 100%
            display: flex
            flex-direction: row
            justify-content: center
            padding: 0px

        .left
            height: 43%

        .right
            height: 57%

</style>

