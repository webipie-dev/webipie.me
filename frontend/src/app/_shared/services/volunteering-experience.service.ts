import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GenericService} from "./generic.service";
import {VolunteeringExperienceModel} from "../models/volunteering-experience.model";

@Injectable({
  providedIn: 'root'
})
export class VolunteeringExperienceService extends GenericService<VolunteeringExperienceModel>{

  constructor(protected http: HttpClient) {
    super(http)
    this.suffix = '/volunteeringexperience';
  }
}
