import { shallowFactory } from '@/helpers/testFactoryHelpers';
import { Wrapper } from '@vue/test-utils';
import LibraryView from '../LibraryView.vue';
import Vue from 'vue';

describe('LibraryView.vue', () => {
  it('is not empty', () => {
    const wrapper: Wrapper<Vue> = shallowFactory(LibraryView);
    expect(wrapper.html()).not.toBe('');
  });
  it('matches the snapshot', async () => {
    const wrapper: Wrapper<Vue> = shallowFactory(LibraryView);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
