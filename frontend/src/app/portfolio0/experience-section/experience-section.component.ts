import { Component, OnInit } from '@angular/core';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {WorkExperienceModel} from "../../_shared/models/work-experience.model";

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.scss']
})
export class ExperienceSectionComponent implements OnInit {
  check = faCheck;
  constructor() { }

  workExperiences?: [WorkExperienceModel]

  ngOnInit(): void {
    this.workExperiences = JSON.parse(localStorage.getItem('portfolio')!).workExperiences
  }

}
