import {HttpClient, HttpHeaders, HttpParamsOptions} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GenericModel} from '../models/generic.model';
import {UtilsUrl} from '../utils/utils-url';
import Swal from 'sweetalert2';

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

  public addOne(body: T): Observable<T> {
    return this.http.post(this.getUrl() + this.suffix, body) as Observable<T>;
  }

  public edit(id: string, body: T): Observable<T> {
    return this.http.patch(this.getUrl() + this.suffix + '/' + id, body) as Observable<T>;
  }

  public deleteMany(body: {ids: string[]}): Observable<T> {
    return this.http.delete(this.getUrl() + this.suffix) as Observable<T>;
  }

  public deleteAll(): Observable<T> {
    return this.http.delete(this.getUrl() + this.suffix + '/delete') as Observable<T>;
  }
}
