import { Component, OnInit } from '@angular/core';
import { faCalendarCheck, faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faAsterisk, faCheck } from '@fortawesome/free-solid-svg-icons';
import {WorkExperienceModel} from "../../_shared/models/work-experience.model";

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.scss']
})
export class ExperienceSectionComponent implements OnInit {
  check = faCheck;
  divider?= 1;
  template?= 2;
  secondaryColor: any;
  primaryColor: any;
  constructor() { }

  workExperiences?: [WorkExperienceModel]

  ngOnInit(): void {

    this.secondaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[1];
    this.primaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[0];
    this.workExperiences = JSON.parse(localStorage.getItem('portfolio')!).workExperiences;
    this.divider = JSON.parse(localStorage.getItem('portfolio')!).template.experience.dividerIcon;
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
    this.template = JSON.parse(localStorage.getItem('portfolio')!).template.experience.dataContainer;
  }

}
