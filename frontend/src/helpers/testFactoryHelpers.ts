import {
  mount,
  shallowMount,
  VueClass,
  Wrapper,
  ThisTypedMountOptions,
} from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import {cloneDeep} from 'lodash';
import users from '@/store/modules/UsersModule';

export function factory<V extends Vue>(
  component: VueClass<V>,
  options?: ThisTypedMountOptions<V>,
  mountFunc: any = mount,
): Wrapper<V> {

  Vue.use(Vuetify);
  Vue.use(Vuex);

  const storeConfig = {
    modules: {
      users,
    },
  };

  const store = new Vuex.Store(cloneDeep(storeConfig));

  return mountFunc(component, {
    store,
    ...options,
  });
}

// my jokes aren't dry unlike my code...

export function shallowFactory<V extends Vue>(
  component: VueClass<V>,
  options?: ThisTypedMountOptions<V>,
): Wrapper<V> {
  return factory(component, options, shallowMount);
}

export type IRouterFactory<V extends Vue> = [jest.Mock<any, any>, Wrapper<V>];
export function routerFactory<V extends Vue>(
  component: VueClass<V>,
  options?: ThisTypedMountOptions<V>,
): IRouterFactory<V> {
  const pushFunction = jest.fn();

  return [
    pushFunction,
    factory(component, {
      mocks: {
        $router: {
          push: pushFunction,
        },
      },
      ...options,
    }),
  ];
}

export function shallowRouterFactory<V extends Vue>(
  component: VueClass<V>,
  options?: ThisTypedMountOptions<V>,
): IRouterFactory<V> {
  const pushFunction = jest.fn();

  return [
    pushFunction,
    shallowFactory(component, {
      mocks: {
        $router: {
          push: pushFunction,
        },
      },
      ...options,
    }),
  ];
}
