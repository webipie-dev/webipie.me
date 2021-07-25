import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PortfolioModel} from "../models/portfolio.model";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService extends GenericService<PortfolioModel> {

  constructor(protected http: HttpClient) {
    super(http);
    this.suffix = '/portfolio';
  }

  getStoreUrls(): Observable<[string]> {
    return this.http.get(this.getUrl() + this.suffix + '/all/urls') as unknown as Observable<any>;
  }

  getPortfolioByUrl(): Promise<boolean> {
    return new Promise(resolve => {
      if (
        window.location.hostname === 'webipie.com' ||
        window.location.hostname === 'www.webipie.com' // ||
       // window.location.hostname === encryptStorage.getItem('store')?.url
      ) {
        resolve(true);
      } else {
        // any to be changed by Portfolio
        this.http.get<any>(this.getUrl() + this.suffix + '/url/' + window.location.hostname).subscribe( store => {
          if (store){
            // encryptStorage.setItem('store', store);
          }
          resolve(true);
        });
      }
    });
  }

  changeTemplate(id: string, body: any){
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')!
    });
    const httpOptions = {
      headers: httpHeaders
    };
    return this.http.patch(this.getUrl() + this.suffix + '/change-template/' + id, body, httpOptions);
  }
}
