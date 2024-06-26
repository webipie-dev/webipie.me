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
  secondaryColor: any;
  primaryColor: any;
  font="Montserrat";
  disabled?: boolean;
  constructor() { }

  ngOnInit(): void {
    this.secondaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[1];
    this.primaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[0];
    this.font = JSON.parse(localStorage.getItem('portfolio')!).template.font;

    this.achievements = JSON.parse(localStorage.getItem('portfolio')!).achievements;
    this.disabled = JSON.parse(localStorage.getItem('portfolio')!).achievementsDisabled;
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
  show(target:HTMLElement){
    if(target.getAttribute('class')==='cos-image hidden'){
      target.setAttribute('class','cos-image');
    }else{
      target.setAttribute('class','cos-image hidden');
    }
    
    
  }

}
