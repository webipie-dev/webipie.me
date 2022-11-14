import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GenericModel} from '../models/generic.model';
import {UtilsUrl} from '../utils/utils-url';
import Swal from 'sweetalert2';
import {PortfolioModel} from "../models/portfolio.model";
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends BaseService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  public contact(body: any): Observable<any> {
    console.log(BaseService.addJWT())
    return this.http.post(this.getUrl() + '/contact/', body, BaseService.addJWT()) as Observable<any>;
  }

  public contactSupport(body: any): Observable<any> {
    console.log(BaseService.addJWT())
    console.log(body);
    return this.http.post(this.getUrl() + '/contact/support/' , body, BaseService.addJWT()) as Observable<any>;
  }

  public contactRequestDomain(body: any): Observable<any> {
    console.log(BaseService.addJWT())
    console.log(body);
    return this.http.post(this.getUrl() + '/contact/domain-request/' , body, BaseService.addJWT()) as Observable<any>;
  }
}
