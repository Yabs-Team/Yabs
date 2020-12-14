import { shallowFactory } from '@/helpers/testFactoryHelpers';
import { Wrapper } from '@vue/test-utils';
import AdminCardsView from '../AdminCardsView.vue';

describe('AdminCardsView.vue', () => {
  
  it('CardFormComponent exists in view', () => {
    const wrapper: Wrapper<AdminCardsView> = shallowFactory(AdminCardsView);
    expect(wrapper.find({name: 'CardFormComponent'}).exists()).toBe(true);
  });

});
