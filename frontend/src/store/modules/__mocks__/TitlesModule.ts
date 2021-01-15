import { Loan, Title, User, Book } from '@/types';

const title: Title = {
  'id': 1,
  'name': 'Alice in Wonderland',
  'isbn': '0763645680',
  'cost': 700,
  'title_type': 'Skönlitteratur',
  'created_at': '2020-12-21T15:23:15.615Z',
  'updated_at': '2021-01-04T15:54:04.695Z',
};

const title1: Title = {
  'id': 3,
  'name': 'Clean Code',
  'isbn': '9780132350884',
  'cost': 300,
  'title_type': 'Kurslitteratur',
  'created_at': '2020-12-21T15:23:15.652Z',
  'updated_at': '2020-12-21T15:23:15.652Z',
};

const user: User = {
  'uid': 123523,
  'name': 'abc',
  'email': 'abc@abc.abc',
  'klass': 'not known',
  'role': 1,
  'google_token': '222222222222',
  'photo_path': 'ab.web',
  'created_at': '2021-01-14T15:22:58.998Z',
  'updated_at': '2021-01-14T15:22:58.998Z'
};

const book: Book = {
  barcode: '5004',
  note: 'None',
  condition: 'Ok',
  created_at: '2021-01-14T15:23:15.866Z', // eslint-disable-line camelcase
  title: {
    cost: 70,
    created_at: '2021-01-14T15:23:15.615Z',  // eslint-disable-line camelcase
    id: 2,
    isbn: '123412341',
    name: 'Test',
    title_type: 'Skönlitteratur',  // eslint-disable-line camelcase
    updated_at: '2021-01-04T15:54:04.695Z'  // eslint-disable-line camelcase
  },
  title_id: 2,  // eslint-disable-line camelcase
  updated_at: '2021-01-14T15:23:15.866Z'  // eslint-disable-line camelcase
};

const loan: Loan = {
  'book': book,
  'book_id': '5000', //eslint-disable-line camelcase
  'created_at': '1234125', //eslint-disable-line camelcase
  'expiration_date': '51215123', //eslint-disable-line camelcase
  'id': 1,
  'lent_by': {}, //eslint-disable-line camelcase
  'lent_by_id': 123144, //eslint-disable-line camelcase
  'loaned_by': user, //eslint-disable-line camelcase
  'loaned_by_id': 123, //eslint-disable-line camelcase
  'returned_at': 'asda', //eslint-disable-line camelcase
  'updated_at': '1234123' //eslint-disable-line camelcase
};

module.exports = {
  allAsArray: [title, title1],
  fetchAll: (): null => null,
  create: jest.fn().mockImplementationOnce(_arg => {
    return Promise.resolve();
  }),
  update: jest.fn(),
  fetchSingle: (_: any): Title => { // eslint-disable-line @typescript-eslint/no-explicit-any
    return title;
  },
  fetchSingleByISBN: jest.fn().mockImplementation(() => {
    return new Promise((resolve, _) => {
      resolve(title);
    });
  }),
  getLoans: jest.fn().mockImplementation(() => {
    return [loan];
  })
};
