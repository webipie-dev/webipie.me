import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UtilsUrl} from '../utils/utils-url';

export class BaseService {

  constructor(protected http: HttpClient) {
  }

  protected suffix = '';

  protected getUrl(): string {
    return UtilsUrl.url;
  }

  protected static addJWT() {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')!
    });
    return {
      headers: httpHeaders
    }
  }
}
