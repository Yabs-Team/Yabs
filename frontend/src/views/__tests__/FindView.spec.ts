import { shallowFactory } from '@/helpers/testFactoryHelpers';
import { Wrapper } from '@vue/test-utils';
import FindView from '../FindView.vue';
import Vue from 'vue';

describe('FindView.vue', () => {
  it('is not empty', () => {
    const wrapper: Wrapper<Vue> = shallowFactory(FindView);
    expect(wrapper.html()).not.toBe('');
  });
  it('matches the snapshot', async () => {
    const wrapper: Wrapper<Vue> = shallowFactory(FindView);
    // sets properties 'users', 'loans' and 'books' to true to allow their respective components to render
    await wrapper.setData({
      users: true,
      loans: true,
      books: true
    });
    // checks if the components rendered as stubs by comparing them to snapshot
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('requisite v-chips exist with correct content', () => {
    const wrapper: Wrapper<Vue> = shallowFactory(FindView);
    const chipStubs = wrapper.findAll('v-chip-stub');
    for (let i:number = 0; i < chipStubs.length; i++) {
      // Uses RegEx to chech if Users Loans or Books is included in text content of v-chip-stub
      if (/Users|Loans|Books/.test(chipStubs.at(i).text())) {
        expect(true).toBeTruthy();
      } else {
        expect(true).toBeFalsy();
      }
    }
  });
});
