import { shallowFactory } from '@/helpers/testFactoryHelpers';
import { Wrapper } from '@vue/test-utils';
import AdminUsersView from '../AdminUsersView.vue';
import Vue from 'vue';

describe('AdminUsersView.vue', () => {
  const wrapper: Wrapper<Vue> = shallowFactory(AdminUsersView);  
  it('Is not empty', () => {
    expect(wrapper.isEmpty()).toBe(false);
  });
  it('Search field exists', () => {
    const textField = wrapper.find('v-text-field-stub');
    expect(textField.html()).not.toBeFalsy();
    expect(textField.attributes().label).toBe('Search');
  });
});
