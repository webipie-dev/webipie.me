import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomSkillModel } from '../models/custom-skill.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class CustomSkillService extends GenericService<CustomSkillModel>{

  constructor(protected http: HttpClient) {
    super(http);
    this.suffix = '/technicalskills';
  }}

