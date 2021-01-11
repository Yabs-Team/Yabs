import { User } from '@/types';

const user: User = {
  'uid': 123,
  'name': 'Example',
  'email': 'example@example.example',
  'klass': 'unknown',
  'role': 1,
  'google_token': '11111111111111111',
  'photo_path': 'abc.web',
  'created_at': '2020-12-21T15:22:58.998Z',
  'updated_at': '2020-12-21T15:22:58.998Z'
};
const user1: User = {
  'uid': 444,
  'name': 'Test',
  'email': 'test@test.test',
  'klass': 'test',
  'role': 20,
  'google_token': '11111111111111111',
  'photo_path': 'abc.web',
  'created_at': '2020-12-21T15:22:58.998Z',
  'updated_at': '2020-12-21T15:22:58.998Z'
};

module.exports = {
  allAsArray: [user, user1],
  fetchAll: () => null,
  create: jest.fn().mockImplementationOnce(_arg => {
    return Promise.resolve();
  }),
  update: jest.fn(),
  fetchSingle: (_: any) => {
    return user;
  },
};
