import BookFormComponent from '@/components/BookFormComponent.vue';

import { Wrapper} from '@vue/test-utils';
import { factory } from '@/helpers/testFactoryHelpers';
import BooksModule from '@/store/modules/BooksModule';

jest.mock('@/store/modules/BooksModule');

describe('BookFormComponent.vue', () => {
  
  it('calls booksmodule with correct values', () => {
    const wrapper: Wrapper<Vue> = factory(BookFormComponent);

    wrapper.find('[data-jest=\'barcode\']').setValue('1234');
    wrapper.find('[data-jest=\'condition\']').setValue('ok');
    wrapper.find('[data-jest=\'form\']').trigger('submit');

    expect(BooksModule.create).toHaveBeenCalledWith({
      barcode: '1234',
      title_id: 0, //eslint-disable-line camelcase
      condition: 'ok',
      availability: true
    });
  });
});