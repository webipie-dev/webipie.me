import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";
import {TechnicalSkillModel} from "../models/technical-skill.model";

@Injectable({
  providedIn: 'root'
})
export class TechnicalSkillService extends GenericService<TechnicalSkillModel>{

  constructor(protected http: HttpClient) {
    super(http);
    this.suffix = '/technicalskills';
  }}
