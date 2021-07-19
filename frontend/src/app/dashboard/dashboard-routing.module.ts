import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard.component";
import { GeneralInfosComponent } from "./general-infos/general-infos.component";
import { SkillsComponent } from "./skills/skills.component";
import { AddSoftSkillComponent } from "./skills/add-soft-skill/add-soft-skill.component";
import { AddHardSkillComponent } from "./skills/add-hard-skill/add-hard-skill.component";
import { ExperienceComponent } from "./experience/experience.component";
import { AddExperienceComponent } from "./experience/add-experience/add-experience.component";
import { ProjectsComponent } from "./projects/projects.component";
import { AddProjectComponent } from "./projects/add-project/add-project.component";
import { AchievementsComponent } from "./achievements/achievements.component";
import { AddAchievementComponent } from "./achievements/add-achievement/add-achievement.component";
import { TestimonialsComponent } from "./testimonials/testimonials.component";
import { AddTestimonialComponent } from "./testimonials/add-testimonial/add-testimonial.component";
import { ProfileComponent } from "./profile/profile.component";
import { DesignComponent } from "./design/design.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children : [
      {
        path: 'general-infos',
        component: GeneralInfosComponent
      },
      {
        path: 'skills',
        component: SkillsComponent
      },
      {
        path: 'skills/addsoftskill',
        component: AddSoftSkillComponent
      },
      {
        path: 'skills/addhardskill',
        component: AddHardSkillComponent
      },
      {
        path: 'experience',
        component: ExperienceComponent
      },
      {
        path: 'experience/addexperience',
        component: AddExperienceComponent
      },
      {
        path: 'projects',
        component: ProjectsComponent
      },
      {
        path: 'projects/addproject',
        component: AddProjectComponent
      },
      {
        path: 'achievements',
        component: AchievementsComponent
      },
      {
        path: 'achievements/addachievement',
        component: AddAchievementComponent
      },
      {
        path: 'testimonials',
        component: TestimonialsComponent
      },
      {
        path: 'testimonials/addtestimonial',
        component: AddTestimonialComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'design',
        component: DesignComponent
      },
    ]
  },
  {
    path: 'edit',
    loadChildren: () => import('../portfolio-edit/portfolio-edit.module')
      .then(m => m.PortfolioEditModule),
    data: { preload: true}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
