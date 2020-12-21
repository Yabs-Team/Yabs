import ListComponent from '@/components/ListComponent.vue';
import vue from 'vue';

import { Wrapper} from '@vue/test-utils';
import { factory } from '@/helpers/testFactoryHelpers';

describe('ListComponent.vue', () => {
  const books = [
    {
      barcode: 1111,
      created_at: '', //eslint-disable-line camelcase
      status: 'OK',
      title_id: 1, //eslint-disable-line camelcase
      updated_at: '', //eslint-disable-line camelcase
      title: {
        name: 'Title1'
      }
    },
    {
      barcode: 2222,
      created_at: '', //eslint-disable-line camelcase
      status: 'OK',
      title_id: 2, //eslint-disable-line camelcase
      updated_at: '', //eslint-disable-line camelcase
      title: {
        name: 'Title2'
      }
    }
  ];

  const headers = [
    { text: 'Titel', value: 'title.name', sortable: false },
    { text: 'Status', value: 'status', sortable: false },
    { text: 'Sträckkod', value: 'barcode', sortable: false },
  ];

  const injectPropsData = {
    propsData: {
      items: books,
      headers
    }
  };
  
  it('can search for books', () => {
    const wrapper: Wrapper<vue> = factory(ListComponent, injectPropsData);

    expect(wrapper.text()).toMatch('Title1');
    expect(wrapper.text()).toMatch('Title2');

    wrapper.find('[data-jest="search"]').setValue('Title2');

    wrapper.vm.$nextTick( () => {
      expect(wrapper.text()).not.toMatch('Title1');
    });
  });
});