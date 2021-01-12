import { Title } from '@/types';

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
};
