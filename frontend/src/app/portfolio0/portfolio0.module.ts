import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Portfolio0Component } from './portfolio0.component';
import {Portfolio0RoutingModule} from "./portfolio0-routing.module";
import { HeaderComponent } from './header/header.component';
import { LandingSectionComponent } from './landing-section/landing-section.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AboutmeSectionComponent } from './aboutme-section/aboutme-section.component';
import { ExpertiseSectionComponent } from './expertise-section/expertise-section.component';
import { SkillComponent } from './expertise-section/skill/skill.component';
import { ExperienceSectionComponent } from './experience-section/experience-section.component';
import { PortfolioSectionComponent } from './portfolio-section/portfolio-section.component';
import { ProjectComponent } from './portfolio-section/project/project.component';
import { TestimonialsSectionComponent } from './testimonials-section/testimonials-section.component';
import { TestimonialComponent } from './testimonials-section/testimonial/testimonial.component';
import { ContactSectionComponent } from './contact-section/contact-section.component';



@NgModule({
  declarations: [
    Portfolio0Component,
    HeaderComponent,
    LandingSectionComponent,
    AboutmeSectionComponent,
    ExpertiseSectionComponent,
    SkillComponent,
    ExperienceSectionComponent,
    PortfolioSectionComponent,
    ProjectComponent,
    TestimonialsSectionComponent,
    TestimonialComponent,
    ContactSectionComponent
  ],
  imports: [
    CommonModule,
    Portfolio0RoutingModule,
    FontAwesomeModule
  ]
})
export class Portfolio0Module { }
