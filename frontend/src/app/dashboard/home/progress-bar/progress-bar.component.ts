import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  completionValue : number = 0;
  constructor() { }

  ngOnInit(): void {
    let portfolio = JSON.parse(localStorage.getItem('portfolio')!);
    if(portfolio.name) this.completionValue += 5;
    if(portfolio.position) this.completionValue += 5;
    if(portfolio.description) this.completionValue += 5;
    if(portfolio.email) this.completionValue += 5;
    if(portfolio.picture) this.completionValue += 5;
    if(portfolio.phoneNumber) this.completionValue += 5;
    if(portfolio.education.length) this.completionValue += 10;
    if(portfolio.projects.length) this.completionValue += 10;
    if(portfolio.technicalSkills.length) this.completionValue += 5;
    if(portfolio.softSkills.length) this.completionValue += 5;
    if(portfolio.workExperiences.length) this.completionValue += 10;
    if(portfolio.volunteeringExperiences.length) this.completionValue += 10;
    if(portfolio.testimonials.length) this.completionValue += 10;
    if(portfolio.achievements.length) this.completionValue += 10;
    
  }
}