<!--
    As shown in the template, this view is based of the components listed as 
    elements below so for more information, take a look at those documented components
 -->

<template>
  <div>
    <h1 class="display-2">
      Loans
    </h1>
    <div class="flex">
      <div style="margin-right: 50px">
        <LoanFormComponent />
      </div>
      <div>
        <LoanListComponent />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import LoanFormComponent from '@/components/LoanFormComponent.vue';
import LoanListComponent from '@/components/LoanListComponent.vue';
import LoansModule from '../store/modules/LoansModule';

@Component({
  components: {
    LoanFormComponent,
    LoanListComponent
  }
})

// This component is the parent view of the components LoanListComponent and LoanFormComponent
// which is declared in the template

export default class AdminLoansView extends Vue {

  // The class is instantiated by the constructor created by fetching all the loans from the
  // loans module
  
  private created(): void {
    LoansModule.fetchAll();
  }
}
</script>

<style scoped>
.flex {
  display: flex;
}

.flex > div {
  flex: 1;
}
</style>
