import { Subject } from '@/types';
import APIRequest from './APIRequest';

export default class SubjectsAPI extends APIRequest {

  static all(): Promise<Subject[]> {
    return new Promise((res, rej) => {
      this.Get<Subject[]>('v1/subjects')
        .then((resp) => {res(resp); })
        .catch((err) => {rej(err); });
    });
  }
}
