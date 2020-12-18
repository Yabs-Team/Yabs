import { shallowFactory } from '@/helpers/testFactoryHelpers';
import { Wrapper } from '@vue/test-utils';
import AdminTitlesView from '../AdminTitlesView.vue';
import Vue from 'vue';

describe('AdminTitlesView.vue', () => {
  
  it('Is not empty', () => {
    const wrapper: Wrapper<Vue> = shallowFactory(AdminTitlesView);
    expect(wrapper.find('div').exists()).toBe(true);
  });
  
  it('Components exist in view', () => {
    const injectRouterStubs = {stubs: ['router-link']};
    const wrapper: Wrapper<Vue> = shallowFactory(AdminTitlesView, injectRouterStubs);
    const componentNames = ['TitleFormComponent', 'TitleListComponent'];
    componentNames.forEach(componentName => {
      expect(wrapper.find(`${componentName}-stub`).name()).toEqual(componentName);
    });
  });
});
