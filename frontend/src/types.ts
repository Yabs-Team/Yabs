export {
  User,
  UserForm,
  UserCollection,
  Title,
  TitleForm,
  TitleCollection,
  Book,
  BookForm,
  BookCollection,
  Loan,
  LoanForm,
  LoanCollection,
  Subject,
  StatusMessage
};

interface User {
  created_at: string; //eslint-disable-line camelcase
  email: string;
  google_token: string; //eslint-disable-line camelcase
  klass: string;
  name: string;
  photo_path: string; //eslint-disable-line camelcase
  role: number;
  uid: number;
  updated_at: string; //eslint-disable-line camelcase
  assignedRoles?: string[]
}

interface UserForm {
  email: string;
  google_token: string; //eslint-disable-line camelcase
  klass: string;
  name: string;
  photo_path: string; //eslint-disable-line camelcase
  role: number;
  uid: number;
}

interface UserCollection { [uid: number]: User; }

interface Title {
  cost: number;
  created_at: string; //eslint-disable-line camelcase
  id: number;
  isbn: string;
  name: string;
  title_type: string; //eslint-disable-line camelcase
  updated_at: string; //eslint-disable-line camelcase
}

interface TitleForm {
  id?: number;
  name: string;
  cost: string;
  isbn: string;
  title_type: string; //eslint-disable-line camelcase
}

interface TitleCollection { [id: number]: Title; }

interface Book {
  barcode: string;
  created_at: string; //eslint-disable-line camelcase
  condition: string;
  note: string;
  title_id: number; //eslint-disable-line camelcase
  updated_at: string; //eslint-disable-line camelcase
  title: Title;
}

interface BookForm {
  barcode: string;
  title_id: number; //eslint-disable-line camelcase
  condition: string;
  availability?: boolean;
}

interface BookCollection { [id: string]: Book; }

interface Loan {
  book: Book;
  book_id: string; //eslint-disable-line camelcase
  created_at: string; //eslint-disable-line camelcase
  expiration_date: string; //eslint-disable-line camelcase
  id: number;
  lent_by: object; //eslint-disable-line camelcase
  lent_by_id: number; //eslint-disable-line camelcase
  loaned_by: User; //eslint-disable-line camelcase
  loaned_by_id: number; //eslint-disable-line camelcase
  returned_at: string|null; //eslint-disable-line camelcase
  updated_at: string; //eslint-disable-line camelcase
}

interface LoanForm {
  id?: number;
  book_id: number; //eslint-disable-line camelcase
  lent_by_id: number; //eslint-disable-line camelcase
  loaned_by_id: number; //eslint-disable-line camelcase
  expiration_date: string; //eslint-disable-line camelcase
}

interface LoanCollection {[id: number]: Loan; }

interface Subject {
  id: number;
  name: string;
}

interface StatusMessage {
  color: string;
  text: string;
  type: string;
  icon: string;
  timeout: number;
};
