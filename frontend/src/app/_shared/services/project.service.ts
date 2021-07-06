import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";
import {ProjectModel} from "../models/project.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends GenericService<ProjectModel>{

  constructor(protected http: HttpClient) {
    super(http)
    this.suffix = '/project'
  }
}
