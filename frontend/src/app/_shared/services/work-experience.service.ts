import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService extends GenericService<any>{

  constructor(protected http: HttpClient) {
    super(http)
    this.suffix = 'workexperience'
  }
}
