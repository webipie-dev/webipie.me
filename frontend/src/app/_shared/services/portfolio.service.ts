import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {PortfolioModel} from "../models/portfolio.model";
import {TemplateModel} from "../models/template.model";

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
        window.location.hostname === 'webipie.me' ||
        window.location.hostname === 'localhost' ||
        window.location.hostname === 'www.webipie.me' || true
      ) {
        resolve(true);
      } else {
        // any to be changed by Portfolio
        this.http.get<any>(this.getUrl() + this.suffix + '/url/' + window.location.hostname).subscribe( portfolio => {
          if (portfolio){
            localStorage.setItem("portfolio", JSON.stringify(portfolio));
          }
          resolve(true);
        });
      }
    });
  }

  changeTemplate(id: string, body: any){
    return this.http.patch(this.getUrl() + this.suffix + '/change-template/' + id, body, PortfolioService.addJWT());
  }

  editTemplate(id: string, body: { template: TemplateModel }): Observable<PortfolioModel> {
    return this.http.patch(this.getUrl() + this.suffix + '/template/' + id, body, PortfolioService.addJWT()) as Observable<PortfolioModel>;
  }
}
