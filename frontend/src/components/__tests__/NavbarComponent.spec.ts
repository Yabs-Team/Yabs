import NavbarComponent from '@/components/NavbarComponent.vue';

import { Wrapper } from '@vue/test-utils';
import { shallowFactory } from '@/helpers/testFactoryHelpers';

describe('NavbarComponent.vue', () => {

  const injectRouterStubs = {stubs: ['router-link', 'router-view']};

  it('renders title when passed', () => {
    const wrapper: Wrapper<NavbarComponent> = shallowFactory(NavbarComponent, injectRouterStubs);

    expect(wrapper.html()).toMatch('Yabs');
  });

  it('renders correctly', () => {
    const wrapper: Wrapper<NavbarComponent> = shallowFactory(NavbarComponent, injectRouterStubs);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
