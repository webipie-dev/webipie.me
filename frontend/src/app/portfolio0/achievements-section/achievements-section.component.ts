import { Component, OnInit } from '@angular/core';
import { faAsterisk, faCalendarCheck, faCheck } from '@fortawesome/free-solid-svg-icons';
import {AchievementModel} from "../../_shared/models/achievement.model";

@Component({
  selector: 'app-achievements-section',
  templateUrl: './achievements-section.component.html',
  styleUrls: ['./achievements-section.component.scss']
})
export class AchievementsSectionComponent implements OnInit {
  check = faCheck;
  achievements?: [AchievementModel];
  divider?= 1;
  template?= 2;
  constructor() { }

  ngOnInit(): void {
    this.achievements = JSON.parse(localStorage.getItem('portfolio')!).achievements;
    this.divider = JSON.parse(localStorage.getItem('portfolio')!).template.achievement.dividerIcon;
    switch(this.divider){
      case 1: {
        this.check = faCheck;
        break;
      }case 2: {
        this.check = faAsterisk;
        break;
      }case 3: {
        this.check = faCalendarCheck;
      }
    }
    this.template = JSON.parse(localStorage.getItem('portfolio')!).template.achievement.dataContainer;
  }
  

}
