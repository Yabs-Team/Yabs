import Vue from 'vue';
import {
    VuexModule,
    Module,
    getModule,
    Action,
    Mutation,
} from 'vuex-module-decorators';
import store from '..';
import TitlesAPI from '../../api/titles';

export interface Title {
    cost: number;
    created_at: string;
    id: number;
    isbn: string;
    name: string;
    title_type: string;
    updated_at: string;
}

export interface TitleCollection { [id: number]: Title; }

export interface TitleState {
    titles: TitleCollection;
    failure: any;
}

@Module({dynamic: true, namespaced: true, name: 'TitlesModule', store})
class TitlesModule extends VuexModule {
    private titleState: TitleState = {titles: {}, failure: null};

    get all() {
      return this.titleState.titles;
    }

    get allAsArray() {
      return Object.keys(this.titleState.titles).map( (id) => this.titleState.titles[parseInt(id, 10)]);
    }

    @Action({rawError: true})
    public fetchAll() {
        return new Promise((resolve, reject) => {
        TitlesAPI.all()
            .then((response: any) => {
            response.forEach((title: any) => this.setTitle(title));
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
          TitlesAPI.create(request)
            .then((response: any) => {
              this.setTitle(response);
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
          TitlesAPI.update(request)
            .then((response: any) => {
              this.setTitle(response);
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
          TitlesAPI.delete(request)
            .then((response: any) => {
              this.removeTitle(response);
              resolve(response);
            })
            .catch((error: any) => {
              this.setFailure(error);
              reject(error);
            });
        });
      }

    @Mutation
    private setTitle(payload: any) {
        Vue.set(this.titleState.titles, payload.id, payload);
    }

    @Mutation
    private removeTitle(titleId: string) {
        Vue.delete(this.titleState.titles, titleId);
    }

    @Mutation
    private setFailure(payload: any) {
        this.titleState.failure = payload;
    }
}

export default getModule(TitlesModule);
