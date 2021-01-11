import {
  Title
} from '@/types';

const title: Title = {
  'id': 1,
  'name': 'Alice in Wonderland',
  'isbn': '0763645680',
  'cost': 70,
  'title_type': 'Skönlitteratur',
  'created_at': '2021-01-11T10:15:54.412Z',
  'updated_at': '2021-01-11T10:15:54.412Z',
};

const title1: Title = {
  'id': 3,
  'name': 'Clean Code',
  'isbn': '9780132350884',
  'cost': 300,
  'title_type': 'Kurslitteratur',
  'created_at': '2021-01-11T10:15:54.445Z',
  'updated_at': '2021-01-11T10:15:54.445Z',
};

module.exports = {
  allAsArray: [title, title1],
  fetchAll: (): null => null,
  create: jest.fn().mockImplementationOnce(_arg => {
    return Promise.resolve();
  }),
  update: jest.fn(),
  fetchSingle: (barcode: string): Promise < Title > => {
    return new Promise((resolve, reject) => {
      resolve(title);
    });
  },
};
