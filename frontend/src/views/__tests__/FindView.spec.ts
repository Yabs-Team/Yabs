import { shallowFactory } from '@/helpers/testFactoryHelpers';
import { Wrapper } from '@vue/test-utils';
import FindView from '@/views/FindView.vue';
import Vue from 'vue';

describe('Start.vue', () => {
  it('is not empty', () => {
    const wrapper: Wrapper<Vue> = shallowFactory(FindView);
    expect(wrapper.html()).not.toBe('');
  });
  it('matches the snapshot', () => {
    const wrapper: Wrapper<Vue> = shallowFactory(FindView);
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('router links exists in view', () => {
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
