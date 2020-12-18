import { shallowFactory } from '@/helpers/testFactoryHelpers';
import { Wrapper } from '@vue/test-utils';
import AdminLoansView from '../AdminLoansView.vue';
import Vue from 'vue';

describe('AdminLoansView.vue', () => {
  
  it('CardFormComponent exists in view', () => {
    const wrapper: Wrapper<AdminLoansView> = shallowFactory(AdminLoansView);
    expect(wrapper.find('div').exists()).toBe(true);
  });

  it('Components exist in view', () => {
    const injectRouterStubs = {stubs: ['router-link']};
    const wrapper: Wrapper<Vue> = shallowFactory(AdminLoansView, injectRouterStubs);
    const componentNames = ['LoanFormComponent', 'LoanListComponent', 'ReturnLoanComponent'];
    componentNames.forEach(componentName => {
       expect(wrapper.find(`${componentName}-stub`).name()).toEqual(componentName);
    });
  });
});
