import {HttpClient, HttpHeaders, HttpParamsOptions} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GenericModel} from '../models/generic.model';
import {UtilsUrl} from '../utils/utils-url';
import Swal from 'sweetalert2';
import {PortfolioModel} from "../models/portfolio.model";

export class GenericService<T extends GenericModel> {

  deleteModal = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });

  constructor(protected http: HttpClient) {
  }

  protected suffix = '';

  protected getUrl(): string {
    return UtilsUrl.url;
  }

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
    return this.http.post(this.getUrl() + this.suffix, body, this.addJWT()) as Observable<{[index: string]: T | PortfolioModel}>;
  }

  public edit(id: string, body: any): Observable<{[index: string]: T | PortfolioModel}> {
    if(localStorage.getItem('portfolioId')) {
      body.portfolioId = localStorage.getItem('portfolioId');
    }
    return this.http.patch(this.getUrl() + this.suffix + '/' + id, body, this.addJWT()) as Observable<{[index: string]: T | PortfolioModel}>;
  }

  public deleteMany(body: any): Observable<{[index: string]: T | PortfolioModel}> {
    if(localStorage.getItem('portfolioId')) {
      body.portfolioId = localStorage.getItem('portfolioId');
    }
    const httpOptions = {
      headers: this.addJWT(),
      body
    };
    return this.http.request('delete', this.getUrl() + this.suffix, {body, headers: this.addJWT().headers}) as unknown as Observable<{[index: string]: T | PortfolioModel}>;
  }

  public deleteAll(): Observable<T> {
    return this.http.delete(this.getUrl() + this.suffix + '/delete') as Observable<T>;
  }

  private addJWT() {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')!
    });
    const httpOptions = {
      headers: httpHeaders
    };
    return httpOptions
  }
}
