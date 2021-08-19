import { Component, OnInit } from '@angular/core';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import {SoftSkillService} from "../../_shared/services/soft-skill.service";
import {SoftSkillModel} from "../../_shared/models/soft-skill.model";
import {TechnicalSkillDeveloperModel} from "../../_shared/models/technical-skill-developer";

@Component({
  selector: 'app-expertise-section',
  templateUrl: './expertise-section.component.html',
  styleUrls: ['./expertise-section.component.scss']
})
export class ExpertiseSectionComponent implements OnInit {
  watch = faStopwatch;
  softSkills?: [SoftSkillModel];
  hardSkills?: [TechnicalSkillDeveloperModel];
  constructor() { }

  ngOnInit(): void {
    this.softSkills = JSON.parse(localStorage.getItem('portfolio')!).softSkills;
    this.hardSkills = JSON.parse(localStorage.getItem('portfolio')!).technicalSkills;
    
  }

}
