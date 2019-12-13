import Vue from 'vue';
import {
  VuexModule,
  Module,
  getModule,
  Action,
  Mutation,
} from 'vuex-module-decorators';
import store from '..';
import UsersAPI from '../../api/users';
import convertList from '../../helpers/convertArrayToNested';
export interface User {
  created_at: string;
  email: string;
  google_token: string;
  klass: string;
  name: string;
  photo_path: string;
  role: string;
  uid: number;
  updated_at: string;
}

export interface UserCollection { [uid: number]: User; }

export interface UserState {
  users: UserCollection;
  currentUser: any;
  failure: any;
}

@Module({dynamic: true, namespaced: true, name: 'UsersModule', store, preserveState: true})
class UsersModule extends VuexModule {
  private userState: UserState = {users: {}, currentUser: null, failure: null};

  get currentUserID(): number {
    return this.userState.currentUser;
  }

  get all(): UserCollection {
    return this.userState.users;
  }

  get currentUser(): User {
    return this.all[this.userState.currentUser];
  }

  @Action({rawError: true})
  public fetchAll(): Promise<object> {
    return new Promise((resolve, reject) => {
      UsersAPI.all()
        .then((response: User[]) => {
          this.convertUserList(response);
          resolve();
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
      UsersAPI.update(request)
        .then((response: any) => {
          this.setUser(response);
          this.setCurrentUser(response);
          resolve(response);
        })
        .catch((error: any) => {
          this.setFailure(error);
          reject(error);
        });
    });
  }

  @Action({rawError: true})
  public signIn(request: any) {
    return new Promise((resolve, reject) => {
      UsersAPI.signIn(request)
        .then((response: any) => {
          this.setCurrentUser(response);
          resolve(response);
        })
        .catch((error: any) => {
          this.setFailure(error);
          reject(error);
        });
    });
  }

  @Action({rawError: true})
  public signOut(): Promise<object> {
    return new Promise((resolve, reject) => {
      UsersAPI.signOut()
        .then((response: any) => {
          this.setCurrentUser(response);
          resolve(response);
        })
        .catch((error: any) => {
          this.setFailure(error);
          reject(error);
        });
    });
  }

  @Mutation
  public setUser(payload: any): void {
    Vue.set(this.userState.users, payload.uid, payload);
  }

  @Mutation
  public setCurrentUser(payload: any): void {
    Vue.set(this.userState, 'currentUser', payload.uid);
  }

  @Mutation
  public convertUserList(payload: User[]): void {
    const list = convertList(payload, 'uid');
    Vue.set(this.userState, 'users', list);
  }
}

export default getModule(UsersModule);
