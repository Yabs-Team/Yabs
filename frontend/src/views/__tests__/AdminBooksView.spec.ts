import AdminBooksView from '../AdminBooksView.vue';
import vue from 'vue';

import { Wrapper } from '@vue/test-utils';
import { shallowFactory } from '@/helpers/testFactoryHelpers';

jest.mock('@/store/modules/TitlesModule');
jest.mock('@/store/modules/BooksModule');

const options = {
  sync: false
};

describe('AdminTitlesEditView.vue', () => {
  it('Displays the correct data in the form', async () => {
    const wrapper: Wrapper<vue> = shallowFactory(AdminBooksView, options);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
