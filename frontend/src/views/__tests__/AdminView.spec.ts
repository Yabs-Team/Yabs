import { shallowFactory } from '@/helpers/testFactoryHelpers';
import { Wrapper } from '@vue/test-utils';
import AdminView from '../AdminView.vue';
import Vue from 'vue';

describe('AdminView.vue', () => {
  const injectRouterStubs = {stubs: ['router-link', 'router-view']};
  const wrapper: Wrapper<Vue> = shallowFactory(AdminView, injectRouterStubs);
  const requiredItems = ['Dashboard', 'Loans', 'Titles', 'Books', 'Cards', 'Users'];
  
  it('Is not empty', () => {
    expect(wrapper.find('div').exists()).toBe(true);
  });
  
  it('Router links have correct content', () => {
    const a = wrapper.findAll('router-link-stub');
    if (a.length == requiredItems.length) {
      for (let i:number = 0; i < a.length; i++) {
        expect(requiredItems.find(item => a.at(i).text().includes(item))).not.toBeFalsy();
      }
    } else {
      expect(true).toBe(false);
    }
  });

  it('Required items exist in view', () => {
    const listItems = wrapper.findAll('v-list-item-content-stub');
    if (listItems.length == requiredItems.length) {
      for (let i:number = 0; i < requiredItems.length; i++) {
        expect(listItems.at(i).text()).toEqual(requiredItems.find(item=>item == listItems.at(i).text()));
      }
    } else {
      expect(true).toBe(false);
    }
  });
});
