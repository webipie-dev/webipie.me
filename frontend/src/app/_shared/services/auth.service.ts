import { Injectable } from '@angular/core';
import {UtilsUrl} from "../utils/utils-url";
import {HttpClient, HttpHeaders} from "@angular/common/http";
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

  public forgotPassword(email: string): Observable<any> {
    return this.http.post(this.getUrl() + this.suffix + '/forgot-password', {email}) as Observable<any>;
  }

  public sendConfirmation(token: any): Observable<any> {
    return this.http.get(this.getUrl() + this.suffix + '/confirmation/' + token) as Observable<any>;
  }

  public giveConsent(): Observable<any> {
    return this.http.patch(this.getUrl() + this.suffix + '/give-consent/', {}, GenericService.addJWT()) as Observable<any>;
  }

  public resendConfirmation(): Observable<any> {
    const token = localStorage.getItem('token')
    return this.http.get(this.getUrl() + this.suffix + '/confirmation/resend/' + token) as Observable<any>;
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('portfolio');
    localStorage.removeItem('portfolioId');
  }

  public signInWithGoogle(googleToken?: string) {
    let httpOptions: any;
    httpOptions = {
      access_token: googleToken
    };
    return this.http.post(this.getUrl() + this.suffix + '/oauth/google', httpOptions) as Observable<any>
  }

  public signInWithLinkedIn(linkedinToken?: string): Observable<any> {
    return this.http.post(this.getUrl() + this.suffix + '/oauth/linkedin', { token: linkedinToken }) as Observable<any>;
  }

  public isVerified(): Observable<{verified: boolean, consent: boolean}> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')!
    });
    const httpOptions = {
      headers: httpHeaders
    };
    return this.http.get(this.getUrl() + this.suffix + '/verified', httpOptions) as unknown as Observable<{verified: boolean, consent: boolean}>;
  }

  public changePassword(body: any): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')!
    });
    const httpOptions = {
      headers: httpHeaders
    };
    return this.http.post(this.getUrl() + this.suffix + '/changepwd', body, httpOptions) as Observable<any>;
  }

  public guideTourDone(): Observable<{operation: string}> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')!
    });
    const httpOptions = {
      headers: httpHeaders
    };
    return this.http.get(this.getUrl() + this.suffix + '/guidetour', httpOptions) as Observable<{operation: string}>;
  }

  public verifyFirstVisit(): Observable<{ firstVisit: boolean }> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')!
    });
    const httpOptions = {
      headers: httpHeaders
    };
    return this.http.get(this.getUrl() + this.suffix + '/firstvisit', httpOptions) as Observable<{firstVisit: boolean}>;
  }

  public getUserName(): Observable<{name: string}> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')!
    });
    const httpOptions = {
      headers: httpHeaders
    };
    return this.http.get(this.getUrl() + this.suffix + '/username', httpOptions) as Observable<{name: string}>;
  }

  public getPicture(): Observable<{picture: string}> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')!
    });
    const httpOptions = {
      headers: httpHeaders
    };
    return this.http.get(this.getUrl() + this.suffix + '/picture', httpOptions) as Observable<{picture: string}>;
  }

}
