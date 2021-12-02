import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {Portfolio0Component} from "./portfolio0.component";

const routes: Routes = [
  {
    path: '',
    component: Portfolio0Component,
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Portfolio0RoutingModule {
}
