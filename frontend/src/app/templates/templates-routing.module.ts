import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import { TemplatesModule } from "./templates.module";
import { TemplatesComponent } from "./templates.component";
import { ChooseTemplateComponent } from "./choose-template/choose-template.component";

const routes: Routes = [{
  path: '',
  component: TemplatesComponent,
  children:[{
      path:'choose-template',
      component:ChooseTemplateComponent,
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule {
}
