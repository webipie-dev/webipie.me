import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { IndexComponent } from "../index/index.component";

const routes: Routes = [{
  path: '',
 // component: IndexComponent,
  children : [
    {
      path: 'signup',
      component: SignupComponent,
    },
    {
      path: 'signin',
      component: SigninComponent
    }
  ]  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule {
}
