import { Component, OnInit } from '@angular/core';
import { SoftSkillModel } from 'src/app/_shared/models/soft-skill.model';
import { TechnicalSkillDeveloperModel } from 'src/app/_shared/models/technical-skill-developer';
import { faDrawPolygon, faStar, faToolbox } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-expertise-section',
  templateUrl: './expertise-section.component.html',
  styleUrls: ['./expertise-section.component.scss']
})
export class ExpertiseSectionComponent implements OnInit {

  softSkills?: [SoftSkillModel];
  hardSkills?: [TechnicalSkillDeveloperModel] | [any];
  
  design = faDrawPolygon;
  gears = faToolbox;
  star = faStar;
  constructor() { }

  ngOnInit(): void {
    this.hardSkills = JSON.parse(localStorage.getItem('portfolio')!).technicalSkills;
    this.softSkills = JSON.parse(localStorage.getItem('portfolio')!).softSkills;
  }

}
