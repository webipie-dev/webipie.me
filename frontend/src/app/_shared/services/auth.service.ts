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

  public signUp(credentials: { [key: string]: any}): Observable<any> {
    return this.http.post(this.getUrl() + this.suffix + '/signup', credentials) as Observable<any>;
  }

  public signIn(credentials: { [key: string]: any}): Observable<any> {
    return this.http.post(this.getUrl() + this.suffix + '/signin', credentials) as Observable<any>;
  }

  public sendConfirmation(token: string): Observable<any> {
    return this.http.get(this.getUrl() + this.suffix + '/confirmation/' + token) as Observable<any>;
  }

  public resendConfirmation(token: string): Observable<any> {
    return this.http.get(this.getUrl() + this.suffix + '/resend/confirmation/' + token) as Observable<any>;
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  public logout() {}

  public signInWithGoogle() {}

  public signInWithLinkedIn(linkedinToken?: string): Observable<any> {
    return this.http.post(this.getUrl() + this.suffix + '/oauth/linkedin', { token: linkedinToken }) as Observable<any>
  }

}
