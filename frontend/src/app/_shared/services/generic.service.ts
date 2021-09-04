import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GenericModel} from '../models/generic.model';
import {UtilsUrl} from '../utils/utils-url';
import Swal from 'sweetalert2';
import {PortfolioModel} from "../models/portfolio.model";
import { BaseService } from './base.service';

export class GenericService<T extends GenericModel> extends BaseService {
  constructor(protected http: HttpClient) {
    super(http);
  }


  deleteModal = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });


  protected suffix = '';

  public getById(id: string): Observable<T> {
    return this.http.get(this.getUrl() + this.suffix + '/' + id) as Observable<T>;
  }

  public getMany(query?: string): Observable<[T]> {
    // query is an object of elements you want to filter the documents with
    const httpOptions: {[key: string]: any} = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: query
    };
    return this.http.get(this.getUrl() + this.suffix, httpOptions) as Observable<[T]>;
  }

  public getManyByIds(arrayIds: string[]): Observable<[T]> {
    return this.http.get(this.getUrl() + this.suffix + '/many') as Observable<[T]>;
  }

  public addOne(body: any): Observable<{[index: string]: T | PortfolioModel}> {
    if(localStorage.getItem('portfolioId')) {
      body.portfolioId = localStorage.getItem('portfolioId');
    }
    return this.http.post(this.getUrl() + this.suffix, body, GenericService.addJWT()) as Observable<{[index: string]: T | PortfolioModel}>;
  }

  public edit(id: string, body: any): Observable<{[index: string]: T | PortfolioModel}> {
    if(localStorage.getItem('portfolioId')) {
      body.portfolioId = localStorage.getItem('portfolioId');
    }
    return this.http.patch(this.getUrl() + this.suffix + '/' + id, body, GenericService.addJWT()) as Observable<{[index: string]: T | PortfolioModel}>;
  }

  public deleteMany(body: any): Observable<{[index: string]: T | PortfolioModel}> {
    if(localStorage.getItem('portfolioId')) {
      body.portfolioId = localStorage.getItem('portfolioId');
    }
    return this.http.request('delete', this.getUrl() + this.suffix, {body, headers: GenericService.addJWT().headers}) as unknown as Observable<{[index: string]: T | PortfolioModel}>;
  }

  public deleteAll(): Observable<T> {
    return this.http.delete(this.getUrl() + this.suffix + '/delete') as Observable<T>;
  }
}
