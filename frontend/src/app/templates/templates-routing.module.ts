import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import { TemplatesComponent } from "./templates.component";
import { ChooseTemplateComponent } from "./choose-template/choose-template.component";
import { ChooseNameComponent } from "./choose-name/choose-name.component";

const routes: Routes = [{
  path: '',
  component: TemplatesComponent,
  children:[
    {
      path:'choose-template',
      component:ChooseTemplateComponent
    },
    {
      path:'choose-name',
      component:ChooseNameComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule {
}
