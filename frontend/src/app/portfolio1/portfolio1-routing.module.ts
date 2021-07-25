import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { IndexComponent } from './index/index.component';
import { Portfolio1Component } from './portfolio1.component';
import { ProjectsComponent } from './projects/projects.component';
import { SkillsComponent } from './skills/skills.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { WelcomeComponent } from './welcome/welcome.component';



const routes: Routes = [
  {path: '', component: IndexComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'education', component: EducationComponent },
  { path: 'experience', component: ExperienceComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'skills', component: SkillsComponent },
  { path: 'testimonials', component: TestimonialsComponent },
  { path: 'welcome', component: WelcomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Portfolio1RoutingModule {
}
