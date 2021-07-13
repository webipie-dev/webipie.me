import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {DashboardComponent} from "./dashboard.component";
import { GeneralInfosComponent } from "./general-infos/general-infos.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children : [
      {
        path: 'general-infos',
        component: GeneralInfosComponent
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
