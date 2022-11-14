import { Component, OnInit } from '@angular/core';
import { AchievementModel } from 'src/app/_shared/models/achievement.model';
import { EducationModel } from 'src/app/_shared/models/education.model';
import { VolunteeringExperienceModel } from 'src/app/_shared/models/volunteering-experience.model';
import { WorkExperienceModel } from 'src/app/_shared/models/work-experience.model';

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.scss']
})
export class ExperienceSectionComponent implements OnInit {

  workExperiences?: WorkExperienceModel[];
  volunteeringExperiences?: VolunteeringExperienceModel[];
  education?: [EducationModel];
  achievements?: [AchievementModel];
  constructor() { }

  ngOnInit(): void {
    this.workExperiences = JSON.parse(localStorage.getItem('portfolio')!).workExperiences;
    this.volunteeringExperiences = JSON.parse(localStorage.getItem('portfolio')!).volunteeringExperiences;
    this.education = JSON.parse(localStorage.getItem('portfolio')!).education
    this.achievements = JSON.parse(localStorage.getItem('portfolio')!).achievements;
  }

  get educationDisabled() {
    return JSON.parse(localStorage.getItem('portfolio')!).educationDisabled as boolean;
  }

  get achievementsDisabled() {
    return JSON.parse(localStorage.getItem('portfolio')!).achievementsDisabled as boolean;
  }

  get workExperiencesDisabled() {
    return JSON.parse(localStorage.getItem('portfolio')!).workExperiencesDisabled as boolean;
  }
  
  get volunteeringExperiencesDisabled() {
    return JSON.parse(localStorage.getItem('portfolio')!).volunteeringExperiencesDisabled as boolean;
  }
}
