import { Wrapper } from '@vue/test-utils';
import { shallowFactory } from '@/helpers/testFactoryHelpers';
import Vue from 'vue';

import BaseModal from '@/components/BaseModal.vue';

describe('BaseModal.vue', () => {
  it('Renders with correct data', async () => {
    const wrapper: Wrapper<Vue> = shallowFactory(BaseModal);

    expect(wrapper.find('[data-jest=\'modal\']')).toBeTruthy();
    expect(wrapper.text()).toMatch('Noo');
    expect(wrapper.text()).toMatch('Yeah');
    expect(wrapper.text()).toMatch('This header');
    expect(wrapper.text()).toMatch('This body');
    expect(wrapper.findAll('[data-jest=\'modal-btn\']').length).toEqual(2);
  });
});
