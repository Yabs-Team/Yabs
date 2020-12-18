import { shallowFactory } from '@/helpers/testFactoryHelpers';
import { Wrapper } from '@vue/test-utils';
import EditBookView from '../EditBookView.vue';
import BooksModule from '@/store/modules/BooksModule';
import { Book } from '@/types';

describe('EditBookView.vue', () => {

  const baseBook: Book = {
    barcode: '',
    condition: '',
    created_at: '',
    note: '',
    title: {
      cost: 0,
      created_at: '',
      id: 0,
      isbn: '',
      name: '',
      title_type: '',
      updated_at: ''
    },
    title_id: 0,
    updated_at: ''
  }

  it('BooksStatusComponent exists', () => {
    setTimeout(() => {
      const wrapper: Wrapper<EditBookView> = shallowFactory(EditBookView);
      expect(wrapper.find({name: 'BookStatusComponent'}).exists()).toBe(true);
    }, 1000);
  });

  it('correct bookproperties check', () => {
    setTimeout(() => {
      const wrapper: Wrapper<EditBookView> = shallowFactory(EditBookView);
      baseBook.barcode = '1001'
      baseBook.title.name= 'korvmedmos'
      BooksModule.setBook(baseBook);
      expect(wrapper.text()).toMatch('1001');
      expect(wrapper.text()).toMatch('korvmedmos');
    }, 1000);
  });

});