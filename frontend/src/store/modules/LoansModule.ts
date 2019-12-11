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

export interface LoanState {
  loans: LoanCollection;
  failure: any;
}

@Module({dynamic: true, namespaced: true, name: 'LoansModule', store})
class LoansModule extends VuexModule {
  private loanState: LoanState = {loans: {}, failure: null};

  get all() {
    return this.loanState.loans;
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
          this.setFailure(error);
          reject(error);
        });
    });
  }

  @Action({rawError: true})
  public create(request: any) {
    return new Promise((resolve, reject) => {
      LoansAPI.create(request)
        .then((response: any) => {
          this.setLoan(response);
          resolve(response);
        })
        .catch((error: any) => {
          this.setFailure(error);
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
          this.setFailure(error);
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
          this.setFailure(error);
          reject(error);
        });
    });
  }

  @Mutation
  private setLoan(payload: any) {
    Vue.set(this.loanState.loans, payload.id, payload);
  }

  @Mutation
  private setFailure(payload: any) {
    this.loanState.failure = payload;
  }

  @Mutation
  private removeLoan(loanId: string) {
    Vue.delete(this.loanState.loans, loanId);
  }
  @Mutation
  private convertLoanList(payload: Loan[]) {
    const list = convertList(payload, 'id');
    this.loanState.loans = list;
  }
}

export default getModule(LoansModule);
