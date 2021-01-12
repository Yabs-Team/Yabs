<!--
    As shown in the template, this view is based of the components listed as 
    elements below so for more information, take a look at those documented components
 -->

<template>
  <div>  
    <div>
      <h1 class="display-2">
        Loans
      </h1>
      <div class="flex">
        <div>
          <LoanFormComponent />
        </div>
        <div>
          <LoanListComponent />
        </div>
      </div>
    </div>
    <div>
      <h1 class="display-2">
        Return
      </h1>
      <ReturnLoanComponent />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import LoanFormComponent from '@/components/LoanFormComponent.vue';
import LoanListComponent from '@/components/LoanListComponent.vue';
import ReturnLoanComponent from '@/components/ReturnLoanComponent.vue';
import LoansModule from '../store/modules/LoansModule';

export default defineComponent({
  name: 'AdminLoansView',
  components: {
    LoanFormComponent,
    LoanListComponent,
    ReturnLoanComponent
  },
  setup() {
    function created(): void {
      LoansModule.fetchAll();
    }

    created();
  }
});
</script>

<style scoped>
.flex {
  display: flex;
}

.flex > div {
  flex: 1;
}

.flex {
  margin-right: 50px;
}

.display-2 {
  margin-top: 50px;
}
</style>
