import { Title, TitleForm } from '@/types';
import APIRequest from './APIRequest';

export default class TitlesAPI extends APIRequest {

  static all(): Promise<Title[]> {
    return new Promise((res, rej) => {
      this.Get<Title[]>('v1/titles')
        .then((resp) => {res(resp); })
        .catch((err) => {rej(err); });
    });
  }

  static single(id: number): Promise<Title> {
    return new Promise((res, rej) => {
      this.Get<Title>(`v1/titles/${id}`)
        .then((resp) => {res(resp); })
        .catch((err) => {rej(err); });
    });
  }

  static singleByISBN(isbn: string): Promise<Title> {
    return new Promise((res, rej) => {
      this.Get<Title>(`v1/titles/${isbn}?ISBN=true`)
        .then((resp) => {res(resp); })
        .catch((err) => {rej(err); });
    });
  }

  static create(request: TitleForm): Promise<Title> {
    return new Promise((res, rej) => {
      this.Post<Title>('v1/titles', request)
        .then((resp) => {res(resp); })
        .catch((err) => {rej(err); });
    });
  }

  static update(request: TitleForm): Promise<Title> {
    return new Promise((res, rej) => {
      this.Patch<Title>(`v1/titles/${request.id}`, request)
        .then((resp) => {res(resp); })
        .catch((err) => {rej(err); });
    });
  }

  static delete(request: Title): Promise<number> {
    return new Promise((res, rej) => {
      this.Delete<number>(`v1/titles/${request.id}`)
        .then((resp) => {res(resp); })
        .catch((err) => {rej(err); });
    });
  }
}
