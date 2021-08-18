import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TemplateModel} from "../models/template.model";
import {PortfolioService} from "./portfolio.service";

@Injectable({
  providedIn: 'root'
})
export class DesignEditService {

  private initialTemplate!: TemplateModel;
  private template!: TemplateModel;

  constructor(private portfolioService: PortfolioService) {
    this.setTemplates();
  }

  setTemplates(): void {
    this.initialTemplate = JSON.parse(localStorage.getItem('portfolio')!).template;
    this.template = JSON.parse(localStorage.getItem('portfolio')!).template;
  }

  getInitialTemplate(): TemplateModel {
    return this.initialTemplate;
  }

  getCurrentTemplate(): TemplateModel {
    return this.template;
  }

  updateCurrentTemplate(): void {

  }

  testChange(): boolean {
    return JSON.stringify(this.initialTemplate) === JSON.stringify(this.template);
  }

  submitValues(): void {
    const body = {
      template: this.template
    };
    const id = localStorage.getItem('portfolioId')!;
    this.portfolioService.editTemplate(id, body).subscribe(portfolio => {
      localStorage.setItem('portfolio', JSON.stringify(portfolio));
      this.setTemplates();
    });
  }
}
