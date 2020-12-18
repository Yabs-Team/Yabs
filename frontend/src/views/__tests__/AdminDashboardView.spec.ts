import { shallowFactory } from '@/helpers/testFactoryHelpers';
import { Wrapper } from '@vue/test-utils';
import AdminDashboardView from '../AdminDashboardView.vue';

describe('AdminDashboardView.vue', () => {
  
  it('Dashboard title exists in view', () => {
    const wrapper: Wrapper<AdminDashboardView> = shallowFactory(AdminDashboardView);
    expect(wrapper.find('h1').exists()).toBe(true);
  });

});
