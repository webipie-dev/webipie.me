import { Component, OnInit } from '@angular/core';
import { faAsterisk, faCalendarCheck, faCheck } from '@fortawesome/free-solid-svg-icons';
import {EducationModel} from "../../_shared/models/education.model";

@Component({
  selector: 'app-education-section',
  templateUrl: './education-section.component.html',
  styleUrls: ['./education-section.component.scss']
})
export class EducationSectionComponent implements OnInit {
  check = faCheck;
  divider? = 1;
  template? = 2;
  constructor() { }

  education?: [EducationModel]
  ngOnInit(): void {
    this.education = JSON.parse(localStorage.getItem('portfolio')!).education
    this.divider = JSON.parse(localStorage.getItem('portfolio')!).template.education.dividerIcon;
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
    this.template = JSON.parse(localStorage.getItem('portfolio')!).template.education.dataContainer;
  }

}
