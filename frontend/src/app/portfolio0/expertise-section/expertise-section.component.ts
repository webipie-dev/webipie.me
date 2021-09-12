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
  softSkillsTemplate?= 1;
  secondaryColor: any;
  primaryColor: any;
  font='Montserrat';
  technicalSkillsDisabled?: boolean;
  softSkillsDisabled?: boolean;
  constructor() { }

  ngOnInit(): void {
    this.font = JSON.parse(localStorage.getItem('portfolio')!).template.font;
    this.softSkills = JSON.parse(localStorage.getItem('portfolio')!).softSkills;
    this.softSkillsDisabled = JSON.parse(localStorage.getItem('portfolio')!).softSkillsDisabled;
    this.hardSkills = JSON.parse(localStorage.getItem('portfolio')!).technicalSkills;
    this.technicalSkillsDisabled = JSON.parse(localStorage.getItem('portfolio')!).technicalSkillsDisabled;
    this.softSkillsTemplate = JSON.parse(localStorage.getItem('portfolio')!).template.softSkills;
    this.secondaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[1];
    this.primaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[0];
  }

}
