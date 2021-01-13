import Vue from 'vue';
import {
  VuexModule,
  Module,
  getModule,
  Action,
  Mutation,
} from 'vuex-module-decorators';
import store from '..';
import { Title, TitleForm, TitleCollection, Loan } from '@/types';
import TitlesAPI from '../../services/api/titles';
import convertList from '@/helpers/convertArrayToNested';
import convertNested from '@/helpers/convertNestedToArray';

@Module({dynamic: true, namespaced: true, name: 'TitlesModule', store})
class TitlesModule extends VuexModule {
  private _failure: object = {};
  private _titles: TitleCollection = {};

  get all(): TitleCollection {
    return this._titles;
  }

  get allAsArray(): Title[] {
    return convertNested(this._titles);
  }

  @Action({rawError: true})
  public fetchAll(): Promise<TitleCollection> {
    return new Promise((resolve, reject) => {
      TitlesAPI.all()
        .then((response: Title[]) => {
          this.convertTitleList(response);
          resolve();
        })
        .catch((error: object) => {
          this.setFailure(error);
          reject(error);
        });
    });
  }
  @Action({rawError: true})
  public fetchSingle(id: number): Promise<Title> {
    return new Promise((resolve, reject) => {
      TitlesAPI.single(id)
        .then((response: Title) => {
          resolve(response);
        })
        .catch((error: object) => {
          this.setFailure(Error);
          reject(error);
        });
    });
  }
  @Action({rawError: true})
  public fetchSingleByISBN(isbn: string): Promise<Title> {
    return new Promise((resolve, reject) => {
      TitlesAPI.singleByISBN(isbn)
        .then((response: Title) => {
          resolve(response);
        })
        .catch((error: object) => {
          this.setFailure(Error);
          reject(error);
        });
    });
  }

  @Action({rawError: true})
  public create(request: TitleForm): Promise<Title> {
    return new Promise((resolve, reject) => {
      TitlesAPI.create(request)
        .then((response: Title) => {
          this.setTitle(response);
          resolve(response);
        })
        .catch((error: object) => {
          this.setFailure(error);
          reject(error);
        });
    });
  }

  @Action({rawError: true})
  public update(request: TitleForm): Promise<Title> {
    return new Promise((resolve, reject) => {
      TitlesAPI.update(request)
        .then((response: Title) => {
          this.setTitle(response);
          resolve(response);
        })
        .catch((error: object) => {
          this.setFailure(error);
          reject(error);
        });
    });
  }

  @Action({rawError: true})
  public delete(request: Title): Promise<number> {
    return new Promise((resolve, reject) => {
      TitlesAPI.delete(request)
        .then((response: number) => {
          this.removeTitle(response);
          resolve(response);
        })
        .catch((error: object) => {
          this.setFailure(error);
          reject(error);
        });
    });
  }

  @Action({rawError: true})
  public getLoans(id: number): Promise<Loan[]> {
    return new Promise((resolve, reject) => {
      TitlesAPI.getLoans(id)
        .then((response: Loan[]) => {
          resolve(response);
        })
        .catch((error: object) => {
          this.setFailure(Error);
          reject(error);
        });
    });
  }

  @Mutation
  private setTitle(payload: Title): void {
    Vue.set(this._titles, payload.id, payload);
  }

  @Mutation
  private removeTitle(titleId: number): void {
    Vue.delete(this._titles, titleId);
  }

  @Mutation
  private setFailure(payload: object): void {
    this._failure = payload;
  }

  @Mutation
  private convertTitleList(payload: Title[]): void {
    const list = convertList(payload, 'id');
    this._titles = list;
  }
}

export default getModule(TitlesModule);
