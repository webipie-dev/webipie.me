import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard.component";
import { GeneralInfosComponent } from "./general-infos/general-infos.component";
import { SkillsComponent } from "./skills/skills.component";
import { AddSoftSkillComponent } from "./skills/add-soft-skill/add-soft-skill.component";
import { AddHardSkillComponent } from "./skills/add-hard-skill/add-hard-skill.component";
import { ExperienceComponent } from "./experience/experience.component";
import { AddExperienceComponent } from "./experience/add-experience/add-experience.component";

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
