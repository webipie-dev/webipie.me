import {Component, OnDestroy, OnInit} from '@angular/core';
import {AchievementModel} from "../../_shared/models/achievement.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AchievementService} from "../../_shared/services/achievement.service";
import { ToggleSection } from '../toggle-section/toggle-section';
import { PortfolioService } from 'src/app/_shared/services/portfolio.service';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent extends ToggleSection implements OnInit, OnDestroy {

  constructor(private router: Router, private route: ActivatedRoute,
              private achievementService: AchievementService, protected portfolioService: PortfolioService,
              private spinner: NgxSpinnerService) {
    super(portfolioService, 'achievements');
  }

  achievements?: [AchievementModel];

  ngOnInit(): void {
    this.achievements = JSON.parse(localStorage.getItem('portfolio')!).achievements;
  }

  editAchievement(id: string) {
    this.router.navigate(['addachievement'], { relativeTo: this.route, queryParams: { achievementId: id } });
  }

  removeAchievement(id: string) {
    this.spinner.show();
    this.achievementService.deleteMany({ids: [id]}).subscribe(result => {
      localStorage.setItem('portfolio', JSON.stringify(result.portfolio));
      this.spinner.hide();
      this.ngOnInit();
    })
  }

  upAchievement(i: number){
    let aux = this.achievements![i];
    this.achievements![i] = this.achievements![i-1]
    this.achievements![i-1] = aux
  }

  downAchievement(i: number){
    let aux = this.achievements![i];
    this.achievements![i] = this.achievements![i+1]
    this.achievements![i+1] = aux
  }

  compareArrays(array1: any, array2: any){
    return array1.length === array2.length && array1.every((value: any, index: any) => { 
      return value._id===array2[index]._id && value.id===array2[index].id
    })
  }

  ngOnDestroy(): void {
    let portfolio: any = JSON.parse(localStorage.getItem('portfolio')!);
    let body: any = {}
    if(!this.compareArrays(this.achievements, JSON.parse(localStorage.getItem('portfolio')!).achievements)){ 
      body.achievements = this.achievements
    }
    if(Object.keys(body).length !== 0){
      this.portfolioService.edit(portfolio.id, body).subscribe(
        (result) => {
          localStorage.setItem('portfolio', JSON.stringify(result));
        }
      );
    }
  }
}
