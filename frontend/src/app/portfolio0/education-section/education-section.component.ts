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
  secondaryColor: any;
  primaryColor: any;
  font="Montserrat";
  constructor() { }

  disabled?: boolean;
  education?: [EducationModel]
  ngOnInit(): void {
    this.font = JSON.parse(localStorage.getItem('portfolio')!).template.font;

    this.secondaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[1];
    this.primaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[0];
    this.education = JSON.parse(localStorage.getItem('portfolio')!).education
    this.disabled = JSON.parse(localStorage.getItem('portfolio')!).educationDisabled;
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
  show(target:HTMLElement){
    if(target.getAttribute('class')==='cos-image hidden'){
      target.setAttribute('class','cos-image');
    }else{
      target.setAttribute('class','cos-image hidden');
    }
    
    
  }
}
