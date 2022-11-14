import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FontawesomeModule } from '../fontawesome/fontawesome.module';
import { SharedModule } from '../shared/shared.module';
import { AboutmeSectionComponent } from './aboutme-section/aboutme-section.component';
import { AchievementsSectionComponent } from './achievements-section/achievements-section.component';
import { ContactSectionComponent } from './contact-section/contact-section.component';
import { CopyrightsComponent } from './copyrights/copyrights.component';
import { EducationSectionComponent } from './education-section/education-section.component';
import { ExperienceSectionComponent } from './experience-section/experience-section.component';
import { ExpertiseSectionComponent } from './expertise-section/expertise-section.component';
import { HeaderComponent } from './header/header.component';
import { LandingSectionComponent } from './landing-section/landing-section.component';
import { Portfolio1RoutingModule } from './porftolio1-routing.module';
import { Portfolio1Component } from './portfolio1.component';
import { ProjectListComponent } from './project-section/project-list/project-list.component';
import { ProjectSectionComponent } from './project-section/project-section.component';
import { TestimonialsSectionComponent } from './testimonials-section/testimonials-section.component';

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
    ProjectListComponent,
  ],
  imports: [
    CommonModule,
    Portfolio1RoutingModule,
    FontawesomeModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    SharedModule,
  ],
})
export class Portfolio1Module { }
