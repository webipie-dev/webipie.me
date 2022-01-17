import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AboutmeSectionComponent } from './aboutme-section/aboutme-section.component';
import { AchievementsSectionComponent } from './achievements-section/achievements-section.component';
import { ContactSectionComponent } from './contact-section/contact-section.component';
import { CopyrightsComponent } from './copyrights/copyrights.component';
import { EducationSectionComponent } from './education-section/education-section.component';
import { ExperienceSectionComponent } from './experience-section/experience-section.component';
import { ExpertiseSectionComponent } from './expertise-section/expertise-section.component';
import { LandingSectionComponent } from './landing-section/landing-section.component';
import { ProjectSectionComponent } from './project-section/project-section.component';
import { TestimonialsSectionComponent } from './testimonials-section/testimonials-section.component';
import { Portfolio1Component } from './portfolio1.component';
import { Portfolio1RoutingModule } from "./porftolio1-routing.module";
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import {
  faBolt,
  faComments,
  faDrawPolygon,
  faHandsHelping,
  faHourglassStart,
  faLightbulb,
  faPuzzlePiece,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import { ProjectListComponent } from './project-section/project-list/project-list.component';

@NgModule({
  declarations: [
    HeaderComponent,
    AboutmeSectionComponent,
    AchievementsSectionComponent,
    ContactSectionComponent,
    CopyrightsComponent,
    EducationSectionComponent,
    ExperienceSectionComponent,
    ExpertiseSectionComponent,
    LandingSectionComponent,
    ProjectSectionComponent,
    TestimonialsSectionComponent,
    Portfolio1Component,
    ProjectListComponent
  ],
  imports: [
    CommonModule,
    Portfolio1RoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class Portfolio1Module { 
  constructor(library: FaIconLibrary){
    library.addIcons(faComments, faUsers, faLightbulb, faPuzzlePiece, faHourglassStart, faHandsHelping, faBolt, faDrawPolygon);
  }
}
