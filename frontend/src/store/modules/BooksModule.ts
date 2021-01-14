import Vue from 'vue';
import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import store from '..';
import { Book, BookForm, BookCollection } from '@/types';
import BooksAPI from '../../services/api/books';
import convertList from '@/helpers/convertArrayToNested';
import convertNested from '@/helpers/convertNestedToArray';


@Module({dynamic: true, namespaced: true, name: 'BooksModule', store})
class BooksModule extends VuexModule {
  private _books: BookCollection = {};
  private _failure: object = {};

  get all(): BookCollection {
    return this._books;
  }

  get allAsArray(): Book[] {
    return convertNested(this._books);
  }

  @Action({rawError: true})
  public fetchAll(): Promise<BookCollection> {
    return new Promise((resolve, reject) => {
      BooksAPI.all()
        .then((response: Book[]) => {
          this.convertBookList(response);
          resolve(this._books);
        })
        .catch((error: object) => {
          this.setfailure(error);
          reject(error);
        });
    });
  }

  @Action({rawError: true})
  public fetchSingle(barcode: string): Promise<Book> {
    return new Promise((resolve, reject) => {
      BooksAPI.single(barcode)
        .then((response: Book) => {
          resolve(response);
        })
        .catch((error: object) => {
          this.setfailure(error);
          reject(error);
        });
    });
  }

  @Action({rawError: true})
  public create(request: BookForm): Promise<Book> {
    return new Promise((resolve, reject) => {
      BooksAPI.create(request)
        .then((response: Book) => {
          this.setBook(response);
          resolve(response);
        })
        .catch((error: object) => {
          this.setfailure(error);
          reject(error);
        });
    });
  }

  @Action({rawError: true})
  public update(request: BookForm): Promise<Book> {
    return new Promise((resolve, reject) => {
      BooksAPI.update(request)
        .then((response: Book) => {
          this.setBook(response);
          resolve(response);
          console.log(response);
        })
        .catch((error: object) => {
          this.setfailure(error);
          reject(error);
        });
    });
  }

  @Action({rawError: true})
  public delete(request: Book): Promise<string> {
    return new Promise((resolve, reject) => {
      BooksAPI.delete(request)
        .then((response: string) => {
          this.removeBook(response);
          resolve(response);
        })
        .catch((error: object) => {
          this.setfailure(error);
          reject(error);
        });
    });
  }

  @Mutation
  public setBook(payload: Book): void {
    Vue.set(this._books, payload.barcode, payload);
  }

  @Mutation
  private removeBook(bookId: string): void {
    Vue.delete(this._books, bookId);
  }

  @Mutation
  private setfailure(payload: object): void {
    this._failure = payload;
  }
  @Mutation
  private convertBookList(payload: Book[]): void {
    const list = convertList(payload, 'barcode');
    this._books = list;
  }
}

export default getModule(BooksModule);
