import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {TemplateModel} from "../models/template.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TemplateService extends GenericService<TemplateModel>{

  constructor(protected http: HttpClient) {
    super(http);
    this.suffix = '/template';
  }
}
