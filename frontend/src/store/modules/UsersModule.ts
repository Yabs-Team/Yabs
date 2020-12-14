import Vue from 'vue';
import {
  VuexModule,
  Module,
  getModule,
  Action,
  Mutation,
} from 'vuex-module-decorators';
import store from '..';
import { User, UserCollection } from '@/types';
import UsersAPI from '../../services/api/users';
import convertList from '@/helpers/convertArrayToNested';
import convertNested from '@/helpers/convertNestedToArray';

@Module({dynamic: true, namespaced: true, name: 'UsersModule', store})
class UsersModule extends VuexModule {
  private _failure: object = {};
  public _users: UserCollection = {};
  private _currentUser: number = 0;

  get currentUserID(): number {
    return this._currentUser;
  }

  get all(): UserCollection {
    return this._users;
  }

  get allAsArray(): User[] {
    return convertNested(this._users);
  }

  get currentUser(): User {
    return this._users[this._currentUser];
  }

  @Action({rawError: true})
  public fetchAll(): Promise<UserCollection> {
    return new Promise((resolve, reject) => {
      UsersAPI.all()
        .then((response: User[]) => {
          this.convertUserList(response);
          resolve(this._users);
        })
        .catch((error: object) => {
          this.setFailure(error);
          reject(error);
        });
    });
  }

  @Action({rawError: true})
  public update(request: FormData | User): Promise<User> {
    return new Promise((resolve, reject) => {
      UsersAPI.update(request)
        .then((response: User) => {
          this.setUser(response);
          resolve(response);
        })
        .catch((error: object) => {
          reject(error);
        });
    });
  }

  @Action({rawError: true})
  public signIn(request: string): Promise<User> {
    return new Promise((resolve, reject) => {
      UsersAPI.signIn(request)
        .then((response: User) => {
          console.log(response);
          this.setCurrentUser(response);
          this.fetchAll();
          resolve(response);
        })
        .catch((error: object) => {
          this.setFailure(error);
          reject(error);
        });
    });
  }

  @Action({rawError: true})
  public signOut(): Promise<User> {
    return new Promise((resolve, reject) => {
      UsersAPI.signOut()
        .then((response: User) => {
          this.setCurrentUser(response);
          resolve(response);
        })
        .catch((error: object) => {
          reject(error);
        });
    });
  }

  @Mutation
  public setUser(payload: User): void {
    Vue.set(this._users, payload.uid, payload);
  }

  @Mutation
  public setCurrentUser(payload: User): void {
    this._currentUser = payload.uid;
  }

  @Mutation
  public setFailure(payload: object): void {
    console.log(payload);
    // This should fix end to end tests(yarn build)
  }

  @Mutation
  public convertUserList(payload: User[]): void {
    const list = convertList(payload, 'uid');
    this._users = list;
  }
}

export default getModule(UsersModule);
