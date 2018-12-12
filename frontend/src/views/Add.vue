<template lang="pug">
    .view
        .left
            b-alert(variant="danger" :show="showDismissibleDangerAlert" dismissible) {{failure}}
            b-alert(variant="success" :show="showDismissibleSuccessAlert" dismissible) Loan added
            .container
                h1 Lägg till {{this.type}}
                DropDownType(@changeType='onChangeType($event)', v-bind:selectedType='this.type')
                LoaningForm(v-bind:style='{ display: displayLoan }' v-on:loan-added="onLoanAdded")
                CigForm(@sendUserData='onSendUserData($event)' @sendImages='onSendImages($event)' v-bind:style='{ display: displayCig }')
                AddingForm(v-bind:style='{ display: displayAdd }')
                TitelForm(v-bind:style='{ display: displayTitel }')
        .right
            RecentLoan(v-bind:style='{ display: displayLoan }')
            CanvasContainer(v-bind:style='{ display: displayCig }' v-bind:userData='userData' v-bind:images='images')
            RecentLoan(v-bind:style='{ display: displayAdd }')
            RecentTitel(v-bind:style='{ display: displayTitel }')
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import LoaningForm from '@/components/LoaningForm.vue';
import CigForm from '@/components/CigForm.vue';
import AddingForm from '@/components/AddingForm.vue';
import DropDownType from '@/components/DropDownType.vue';
import RecentLoan from '@/components/RecentLoan.vue';
import RecentTitel from '@/components/RecentTitel.vue';
import CanvasContainer from '@/components/CanvasContainer.vue';
import TitelForm from '@/components/TitelForm.vue';
import LoadingIcon from '@/components/LoadingIcon.vue';

@Component({
  components: {
    LoaningForm,
    CigForm,
    AddingForm,
    TitelForm,
    DropDownType,
    RecentLoan,
    RecentTitel,
    CanvasContainer,
    LoadingIcon,
  },
})

export default class Add extends Vue {
    public type = 'Lån';
    public displayLoan = 'block';
    public displayCig = 'none';
    public updated = false;
    public userData = {};
    public images: any[] = [];
    public showDismissibleDangerAlert = false;
    public showDismissibleSuccessAlert = false;
    public failure: any = '';
    public hasAddedLoan: boolean = false;

    public displayAdd = 'none';
    public displayTitel = 'none';

    @Watch('$store.state.loans.failure')
    public onFailureChanged(val: any) {
        this.failure = Object.entries(this.$store.state.loans.failure.response.data)
            .map(([k, v]) => {
                // @ts-ignore: v is array
                return k + ' ' + v.join(', ');
            }).join(' and ');
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

    public onSendUserData(userData: any) {
        this.userData = userData;
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

