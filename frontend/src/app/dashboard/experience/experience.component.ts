import { Component, OnInit } from '@angular/core';
import {WorkExperienceModel} from "../../_shared/models/work-experience.model";

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  constructor() { }

  workExperience?: [WorkExperienceModel];

  ngOnInit(): void {
    this.workExperience = JSON.parse(localStorage.getItem('portfolio')!).workExperiences
  }

}
