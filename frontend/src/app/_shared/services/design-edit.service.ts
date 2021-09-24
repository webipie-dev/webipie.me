import { Injectable } from '@angular/core';
import {TemplateModel} from "../models/template.model";
import {PortfolioService} from "./portfolio.service";
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DesignEditService {

  private template = new BehaviorSubject<TemplateModel>(JSON.parse(localStorage.getItem('portfolio')!).template);
  private initialTemplate!: TemplateModel;
  public currentTemplate = this.template.asObservable();

  constructor(private portfolioService: PortfolioService) {
    this.setTemplates();
  }

  setTemplates(): void {
    this.initialTemplate = JSON.parse(localStorage.getItem('portfolio')!).template;
  }

  getInitialTemplate(): TemplateModel {
    return this.initialTemplate;
  }

  getCurrentTemplate(): Observable<TemplateModel> {
    return this.template;
  }

  updateTemplate(template: TemplateModel) {
    this.template.next(template);
  }

  testChange(): boolean {
    return JSON.stringify(this.initialTemplate) === JSON.stringify(this.template.getValue())
  }

  submitValues(): void {
    console.log(this.template.getValue())
    const body = {
      template: this.template.getValue()
    };
    const id = localStorage.getItem('portfolioId')!;
    this.portfolioService.editTemplate(id, body).subscribe(portfolio => {
      localStorage.setItem('portfolio', JSON.stringify(portfolio));
      this.updateTemplate(portfolio.template);
      this.setTemplates();
    });
  }
}
