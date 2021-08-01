import {Component, OnInit} from '@angular/core';
import {WorkExperienceModel} from "../../_shared/models/work-experience.model";
import {VolunteeringExperienceModel} from "../../_shared/models/volunteering-experience.model";

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  constructor() {
  }

  workExperiences?: [WorkExperienceModel];
  volunteeringExperiences?: [VolunteeringExperienceModel];

  ngOnInit(): void {
    this.workExperiences = JSON.parse(localStorage.getItem('portfolio')!).workExperiences;
    this.volunteeringExperiences = JSON.parse(localStorage.getItem('portfolio')!).volunteeringExperiences;
  }

}
