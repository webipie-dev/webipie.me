import { Injectable } from '@angular/core';
import {GenericService} from "./generic.service";
import {HttpClient} from "@angular/common/http";
import {AchievementModel} from "../models/achievement.model";
import {PortfolioModel} from "../models/portfolio.model";

@Injectable({
  providedIn: 'root'
})
export class AchievementService extends GenericService<AchievementModel>{

  constructor(protected http: HttpClient) {
    super(http);
    this.suffix = 'achievement';
  }
}
