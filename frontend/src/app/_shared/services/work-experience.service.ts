import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";
import {WorkExperienceModel} from "../models/work-experience.model";

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService extends GenericService<WorkExperienceModel>{

  constructor(protected http: HttpClient) {
    super(http)
    this.suffix = '/workexperience'
  }
}
