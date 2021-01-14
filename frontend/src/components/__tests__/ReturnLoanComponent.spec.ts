import { shallowFactory, factory } from '@/helpers/testFactoryHelpers';
import ReturnLoanComponent from '@/components/ReturnLoanComponent.vue';
import Vue from 'vue';

jest.mock('@/store/modules/BooksModule');
import { Wrapper } from '@vue/test-utils';


describe('ReturnLoanComponent.vue', () => {
  const book = {
    barcode: '5002',
    condition: 'Broken',
    created_at: '2020-12-21T15:23:15.866Z',  //eslint-disable-line camelcase
    notes: null,
    title: {
      authors: '[\'Lewis Carroll\']',
      cost: 700,
      cover:
        'http://books.google.com/books/content?id=sw0UwPjaw80C&printsec=frontcover&img=1&zoom=3&source=gbs_api',
      created_at: '2020-12-21T15:23:15.615Z',  //eslint-disable-line camelcase
      description:
        'A little girl falls down a rabbit hole and discovers a world of nonsensical and amusing characters.',
      id: 1,
      isbn: '0763645680',
      name: 'Alice in Wonderland',
      page_count: '95.0',  //eslint-disable-line camelcase
      published_date: '2009',  //eslint-disable-line camelcase
      subject_id: 4,  //eslint-disable-line camelcase
      title_type: 'Skönlitteratur', //eslint-disable-line camelcase
      updated_at: '2021-01-04T15:54:04.695Z' //eslint-disable-line camelcase
    },
    title_id: 1, //eslint-disable-line camelcase
    updated_at: '2020-12-21T15:23:15.866Z' //eslint-disable-line camelcase
  };

  const loan = {
    id: 1,
    loaned_by_id: 0, //eslint-disable-line camelcase
    lent_by_id: 0, //eslint-disable-line camelcase
    book_id: '5002', //eslint-disable-line camelcase
    returned_at: null, //eslint-disable-line camelcase
    created_at: '2021-01-06T18:28:58.728Z', //eslint-disable-line camelcase
    updated_at: '2021-01-06T18:28:58.728Z', //eslint-disable-line camelcase
    expiration_date: '2020-02-12', //eslint-disable-line camelcase
    lent_by: { //eslint-disable-line camelcase
      uid: 0,
      name: 'Låneservice Johanneberg',
      email: 'example.example@example.example',
      klass: 'none',
      role: 1,
      google_token: '0', //eslint-disable-line camelcase
      photo_path: null, //eslint-disable-line camelcase
      created_at: '2020-12-21T15:22:53.281Z', //eslint-disable-line camelcase
      updated_at: '2020-12-21T15:22:53.281Z' //eslint-disable-line camelcase
    },
    loaned_by: { //eslint-disable-line camelcase
      uid: 0,
      name: 'Hmmm',
      email: 'hmm@hmm.hmm',
      klass: 'TE4',
      role: 1,
      google_token: '0', //eslint-disable-line camelcase
      photo_path: //eslint-disable-line camelcase
        'abc',
      created_at: '2020-12-21T15:22:58.998Z', //eslint-disable-line camelcase
      updated_at: '2020-12-21T15:22:58.998Z' //eslint-disable-line camelcase
    },
    book: book
  };

  const options = {
    mocks: {
      BooksModule: {
        update: jest.fn().mockImplementationOnce(_arg => {
          return Promise.resolve();
        }),
      },
      LoansModule: {
        fetchAll: jest.fn().mockImplementationOnce(_arg => {
          return Promise.resolve();
        }),
        allAsArray: [loan]
      }
    }
  };

  it('Expect the modal to be present', async () => {
    const wrapper = factory(ReturnLoanComponent, options);
    expect(wrapper.find('[data-jest=\'modal\']').exists()).toBe(true);
  });

  it('Expect the barcodeReader to be present', async () => {
    const wrapper = factory(ReturnLoanComponent, options);

    expect(wrapper.find('[data-jest=\'barcodeReader\']').exists()).toBe(false);
    wrapper.find('[data-jest=\'barcodeButton\']').trigger('click');
    expect(wrapper.find('[data-jest=\'barcodeReader\']').exists()).toBe(true);
  });

  it('renders correctly', async () => {
    const wrapper: Wrapper<Vue> = shallowFactory(ReturnLoanComponent, options);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('initialises an update calls update book with correct input', async () => {
    const wrapper: Wrapper<Vue> = factory(ReturnLoanComponent, options);

    wrapper.find('[data-jest=\'bookBarcodeReturn\']').setValue('5002');
    wrapper.find('[data-jest=\'bookCondition\']').setValue('Broken');
    await wrapper.find('[data-jest=\'ReturnBook\']').trigger('click');

    wrapper.setData({
      confirmationBody: book.title.name,
      confirmationHeader: 'Confirm',
      modalActions: [
        {
          text: 'Avbryt',
          action: (): void => {
            wrapper.setData({ showModal: false });
          }
        },
        {
          text: 'Bekräfta',
          action: (): void => {
            wrapper.setData({ showModal: false });
            wrapper.vm.$data.submitChanges(book);
          }
        }
      ]
    });
    wrapper.setData({ showModal: true });
    const spy = jest.spyOn(wrapper.vm.$data, 'submitChanges');

    wrapper.findAll('[data-jest=\'modal-btn\']').filter(x => x.html().toLowerCase().includes('bekräfta')).trigger('click');
    expect(spy).toHaveBeenCalled();
  });
});
