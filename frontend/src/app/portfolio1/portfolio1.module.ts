import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Portfolio1Component } from './portfolio1.component';
import { Portfolio1RoutingModule } from './portfolio1-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { SkillsComponent } from './skills/skills.component';
import { ExperienceComponent } from './experience/experience.component';
import { EducationComponent } from './education/education.component';
import { ProjectsComponent } from './projects/projects.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { ContactComponent } from './contact/contact.component';
import { IndexComponent } from './index/index.component';



@NgModule({
  declarations: [
    Portfolio1Component,
    WelcomeComponent,
    SkillsComponent,
    ExperienceComponent,
    EducationComponent,
    ProjectsComponent,
    TestimonialsComponent,
    ContactComponent,
    IndexComponent
  ],
  exports: [
    Portfolio1Component
  ],
  imports: [
    CommonModule,
    Portfolio1RoutingModule
  ]
})
export class Portfolio1Module { }
