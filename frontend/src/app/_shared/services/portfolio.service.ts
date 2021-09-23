import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable} from "rxjs";
import {PortfolioModel} from "../models/portfolio.model";
import {TemplateModel} from "../models/template.model";
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService extends BaseService {

  constructor(protected http: HttpClient) {
    super(http);
    this.suffix = '/portfolio';
  }

  public getById(id: string): Observable<PortfolioModel> {
    return this.http.get(this.getUrl() + this.suffix + '/' + id) as Observable<PortfolioModel>;
  }

  public getMany(query?: string): Observable<[PortfolioModel]> {
    // query is an object of elements you want to filter the documents with
    const httpOptions: {[key: string]: any} = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: query
    };
    return this.http.get(this.getUrl() + this.suffix, httpOptions) as Observable<[PortfolioModel]>;
  }

  public getManyByIds(arrayIds: string[]): Observable<[PortfolioModel]> {
    return this.http.get(this.getUrl() + this.suffix + '/many') as Observable<[PortfolioModel]>;
  }

  public addOne(body: any): Observable<PortfolioModel> {
    if(localStorage.getItem('portfolioId')) {
      body.portfolioId = localStorage.getItem('portfolioId');
    }
    return this.http.post(this.getUrl() + this.suffix, body, BaseService.addJWT()) as Observable<PortfolioModel>;
  }

  public edit(id: string, body: any): Observable<PortfolioModel> {
    if(localStorage.getItem('portfolioId')) {
      body.portfolioId = localStorage.getItem('portfolioId');
    }
    return this.http.patch(this.getUrl() + this.suffix + '/' + id, body, BaseService.addJWT()) as Observable<PortfolioModel>;
  }

  public deleteMany(body: any): Observable<PortfolioModel> {
    if(localStorage.getItem('portfolioId')) {
      body.portfolioId = localStorage.getItem('portfolioId');
    }
    return this.http.request('delete', this.getUrl() + this.suffix, {body, headers: BaseService.addJWT().headers}) as unknown as Observable<PortfolioModel>;
  }

  public deleteAll(): Observable<PortfolioModel> {
    return this.http.delete(this.getUrl() + this.suffix + '/delete') as Observable<PortfolioModel>;
  }

  getPortfolioUrls(): Observable<[string]> {
    return this.http.get(this.getUrl() + this.suffix + '/all/urls') as unknown as Observable<any>;
  }

  getPortfolioNames(): Observable<[string]> {
    return this.http.get(this.getUrl() + this.suffix + '/all/names') as unknown as Observable<any>;
  }

  getPortfolioByUrl(): Promise<boolean> {
    return new Promise(resolve => {
      if (
        window.location.hostname === 'webipie.me' ||
        window.location.hostname === 'localhost' ||
        window.location.hostname === 'www.webipie.me'
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

  toggleSection(id: string, section: string, disabled: boolean): Observable<PortfolioModel> {
    let sectionAttribute = `${section}Disabled`
    let body: any = {}
    body[sectionAttribute] = disabled

    console.log(body)
    return this.edit(id, body)
  }
}
