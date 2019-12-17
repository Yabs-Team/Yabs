import Vue from 'vue';
import {VuexModule, Module, getModule, Action, Mutation} from 'vuex-module-decorators';
import store from '..';
import LoansAPI from '../../api/loans';
import convertList from '../../helpers/convertArrayToNested';

export interface Loan {
  book: object;
  book_id: number;
  created_at: string;
  expiration_date: string;
  id: number;
  lent_by: object;
  lent_by_id: number;
  loaned_by: object;
  loaned_by_id: number;
  returned_at: string|null;
  updated_at: string;
}
export interface LoanCollection {[id: number]: Loan; }

@Module({dynamic: true, namespaced: true, name: 'LoansModule', store})
class LoansModule extends VuexModule {
  private _loans: LoanCollection = {};
  private _failure: any = null;

  get all() {
    return this._loans;
  }

  get allAsArray() {
    return Object.keys(this._loans).map( (id) => this._loans[parseInt(id)]);
  }

  @Action({rawError: true})
  public fetchAll() {
    return new Promise((resolve, reject) => {
      LoansAPI.all()
        .then((response: any) => {
          this.convertLoanList(response);
          resolve();
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  @Action({rawError: true})
  public create(request: any): Promise<Loan> {
    return new Promise((resolve, reject) => {
      LoansAPI.create(request)
        .then((response: any) => {
          this.setLoan(response);
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  @Action({rawError: true})
  public update(request: any) {
    return new Promise((resolve, reject) => {
      LoansAPI.update(request)
        .then((response: any) => {
          this.setLoan(response);
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  @Action({rawError: true})
  public delete(request: any) {
    return new Promise((resolve, reject) => {
      LoansAPI.delete(request)
        .then((response: any) => {
          this.removeLoan(response);
          resolve(response);
        })
        .catch((error: any) => {
          reject(error);
        });
    });
  }

  @Mutation
  private setLoan(payload: any):void {
    Vue.set(this._loans, payload.id, payload);
  }

  @Mutation
  private removeLoan(loanId: string): void {
    Vue.delete(this._loans, loanId);
  }

  @Mutation
  private convertLoanList(payload: Loan[]): void {
    const list = convertList(payload, 'id');
    this._loans = list;
  }

  @Mutation
  private setFailure(payload: any): void {
    //should enable e2e CI pipeline
  }
}

export default getModule(LoansModule);
