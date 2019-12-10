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
    current_user: User | null;
    failure: any;
}

@Module({dynamic: true, namespaced: true, name: 'UsersModule', store})
class UsersModule extends VuexModule {
    private userState: UserState = {users: {}, current_user: null, failure: null};

    get all() {
        return this.userState.users;
    }

    get currentUser() {
        return this.userState.current_user;
    }

    @Action({rawError: true})
    public fetchAll() {
        return new Promise((resolve, reject) => {
            UsersAPI.all()
              .then((response: any) => {
                response.forEach((user: any) => this.setUser(user));
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
    public signOut() {
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
    public setUser(payload: any) {
        Vue.set(this.userState.users, payload.uid, payload);
    }

    @Mutation
    public setCurrentUser(payload: any) {
        this.userState.current_user = payload;
    }

    @Mutation
    public setFailure(payload: any) {
        this.userState.failure = payload;
    }

}

export default getModule(UsersModule);