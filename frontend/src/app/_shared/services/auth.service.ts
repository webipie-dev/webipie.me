import { Injectable } from '@angular/core';
import {UtilsUrl} from "../utils/utils-url";
import {HttpClient} from "@angular/common/http";
import {GenericService} from "./generic.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends GenericService<any>{

  constructor(protected http: HttpClient) {
    super(http);
    this.suffix = '/user';
  }

  protected getUrl() {
    return UtilsUrl.url;
  }

  public signUp(credentials: { [key: string]: any}) {
    return this.http.post(this.getUrl() + this.suffix + '/signup', credentials) as unknown as Observable<any>;
  }

  public signIn(credentials: { [key: string]: any}) {
    return this.http.post(this.getUrl() + this.suffix + '/signin', credentials) as unknown as Observable<any>;
  }

  public sendConfirmation(token: string) {
    return this.http.get(this.getUrl() + this.suffix + '/confirmation/' + token) as unknown as Observable<any>;
  }

  public resendConfirmation(token: string) {
    return this.http.get(this.getUrl() + this.suffix + '/resend/confirmation/' + token) as unknown as Observable<any>;
  }
}
