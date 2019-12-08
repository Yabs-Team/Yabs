import HeaderNav from '../HeaderNav.vue';

import { Wrapper } from '@vue/test-utils';
import { shallowFactory } from '@/helpers/testFactoryHelpers';

describe('HeaderNav.vue', () => {

  const injectRouterStubs = {stubs: ['router-link', 'router-view']};

  it('renders title when passed', () => {
    const wrapper: Wrapper<HeaderNav> = shallowFactory(HeaderNav, injectRouterStubs);

    expect(wrapper.html()).toMatch('Yabs');
  });

  it('renders profile if logged in when passed', () => {
    const wrapper: Wrapper<HeaderNav> = shallowFactory(HeaderNav, injectRouterStubs);

    expect(wrapper.html()).not.toMatch('Profile');

    wrapper.vm.$store.commit('users/setCurrentUser', {uid: 1});

    expect(wrapper.html()).toMatch('Profil');
  });

  it('renders correctly', () => {
    const wrapper: Wrapper<HeaderNav> = shallowFactory(HeaderNav, injectRouterStubs);

    expect(wrapper.html()).toMatchSnapshot();
  });
});
