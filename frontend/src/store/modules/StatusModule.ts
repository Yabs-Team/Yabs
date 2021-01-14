import {
  VuexModule,
  Module,
  getModule,
  Action,
  Mutation,
} from 'vuex-module-decorators';
import store from '..';
import { StatusMessage } from '@/types';

@Module({dynamic: true, namespaced: true, name: 'StatusModule', store})
class StatusModule extends VuexModule {
  private _messages: StatusMessage[] = [];

  get allAsArray(): StatusMessage[] {
    return this._messages;
  }

  @Action({rawError: true})
  public add(status : StatusMessage): void {
    this.addStatus(status);
  }

  @Mutation
  private addStatus(payload: StatusMessage): void {
    this._messages.push(payload);
  }
}

export default getModule(StatusModule);
