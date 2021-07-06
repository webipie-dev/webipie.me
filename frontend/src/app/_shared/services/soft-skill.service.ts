import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GenericService} from "./generic.service";
import {SoftSkillModel} from "../models/soft-skill.model";

@Injectable({
  providedIn: 'root'
})
export class SoftSkillService extends GenericService<SoftSkillModel>{

  constructor(protected http: HttpClient) {
    super(http);
    this.suffix = '/softskills';
  }
}
