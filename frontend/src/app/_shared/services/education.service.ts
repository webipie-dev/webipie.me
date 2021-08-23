import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {EducationModel} from "../models/education.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EducationService extends GenericService<EducationModel>{

  constructor(protected http: HttpClient) {
    super(http);
    this.suffix = '/education';
  }
}
