import { Component, OnInit } from '@angular/core';
import { faCalendarCheck, faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faAsterisk, faCheck } from '@fortawesome/free-solid-svg-icons';
import { VolunteeringExperienceModel } from 'src/app/_shared/models/volunteering-experience.model';
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
  font="Montserrat";

  shownVolImages: boolean[] = [];
  shownWorkImages: boolean[] = [];

  workExperiencesDisabled?: boolean;
  volunteeringExperiencesDisabled?: boolean;
  constructor() { }

  workExperiences?: WorkExperienceModel[];
  volunteeringExperiences?: VolunteeringExperienceModel[];

  ngOnInit(): void {
    this.font = JSON.parse(localStorage.getItem('portfolio')!).template.font;

    this.secondaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[1];
    this.primaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[0];
    this.workExperiences = JSON.parse(localStorage.getItem('portfolio')!).workExperiences;
    this.workExperiencesDisabled = JSON.parse(localStorage.getItem('portfolio')!).workExperiencesDisabled;
    
    this.volunteeringExperiences = JSON.parse(localStorage.getItem('portfolio')!).volunteeringExperiences;
    this.volunteeringExperiencesDisabled = JSON.parse(localStorage.getItem('portfolio')!).volunteeringExperiencesDisabled;
    
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

    this.volunteeringExperiences?.forEach(()=> {this.shownVolImages.push(false)})
    this.workExperiences?.forEach(()=>this.shownWorkImages.push(false))
  }
  show(target:HTMLElement){
    if(target.getAttribute('class')==='cos-image hidden'){
      target.setAttribute('class','cos-image');
    }else{
      target.setAttribute('class','cos-image hidden');
    }
    
    
  }
}
