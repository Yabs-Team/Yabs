import { shallowFactory } from '@/helpers/testFactoryHelpers';
import { Wrapper } from '@vue/test-utils';
import StartView from '../Start.vue';
import Vue from 'vue';

describe('Start.vue', () => {
  
  it('router links exists in view', () => {
    const injectRouterStubs = {stubs: ['router-link']};
    const wrapper: Wrapper<Vue> = shallowFactory(StartView, injectRouterStubs);
    const titles = ['Profil', 'Admin', 'Hitta'];
    const routerLinks = wrapper.findAll('router-link-stub');
    
    for (let i:number = 0; i < routerLinks.length; i++) {
      expect(routerLinks.at(i).text()).toEqual(titles.find(title=>title == routerLinks.at(i).text()));
    }
    
  });
  
  it('LoanListComponent exists in view', () => {
    const injectRouterStubs = {stubs: ['router-link']};
    const wrapper: Wrapper<Vue> = shallowFactory(StartView, injectRouterStubs);
    expect(wrapper.find('LoanListComponent-stub').exists()).toBe(true);
  });
});
