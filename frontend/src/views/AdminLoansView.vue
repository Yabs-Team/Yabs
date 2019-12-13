<template>
  <div>
    <h1 class="display-2">Loans</h1>
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
import { Vue, Component, Prop } from 'vue-property-decorator';
import LoanFormComponent from '@/components/LoanFormComponent.vue';
import LoanListComponent from '@/components/LoanListComponent.vue';
import LoansModule from '../store/modules/LoansModule';

@Component({
  components: {
    LoanFormComponent,
    LoanListComponent
  }
})
export default class AdminLoansView extends Vue {
  private created() {
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
