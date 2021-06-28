import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PortfolioEditComponent} from "./portfolio-edit.component";

const routes: Routes = [
  {
    path: '',
    component: PortfolioEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioEditRoutingModule {
}
