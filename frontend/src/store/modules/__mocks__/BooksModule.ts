import { Book } from '@/types';

const book: Book = {
  barcode: '5002',
  note: 'None',
  condition: 'Broken',
  created_at: '2020-12-21T15:23:15.866Z', // eslint-disable-line camelcase
  title: {
    cost: 700,
    created_at: '2020-12-21T15:23:15.615Z',  // eslint-disable-line camelcase
    id: 1,
    isbn: '0763645680',
    name: 'Alice in Wonderland',
    title_type: 'Skönlitteratur',  // eslint-disable-line camelcase
    updated_at: '2021-01-04T15:54:04.695Z'  // eslint-disable-line camelcase
  },
  title_id: 1,  // eslint-disable-line camelcase
  updated_at: '2020-12-21T15:23:15.866Z'  // eslint-disable-line camelcase
};
const book1: Book = {
  barcode: '5004',
  note: 'None',
  condition: 'Broken...',
  created_at: '2020-12-21T15:23:15.866Z',  // eslint-disable-line camelcase
  title: {
    cost: 5000,
    created_at: '2020-12-21T15:23:15.615Z',  // eslint-disable-line camelcase
    id: 1,
    isbn: '0763645230',
    name: 'Game of Thrones',
    title_type: 'Skönlitteratur',  // eslint-disable-line camelcase
    updated_at: '2021-01-04T15:54:04.695Z'  // eslint-disable-line camelcase
  },
  title_id: 1,  // eslint-disable-line camelcase
  updated_at: '2020-12-21T15:23:15.866Z'  // eslint-disable-line camelcase
};

module.exports = {
  allAsArray: [book, book1],
  fetchAll: (): null => null,
  create: jest.fn().mockImplementationOnce(_arg => {
    return Promise.resolve();
  }),
  update: jest.fn(),
  fetchSingle: (barcode: string): Promise<Book> => {
    return new Promise((resolve, reject) => {
      resolve(book);
    });
  },
};
