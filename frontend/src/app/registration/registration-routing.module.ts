import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { RegistrationComponent } from "./registration.component";
import {ConfirmationComponent} from "./confirmation/confirmation.component";

const routes: Routes = [{
  path: '',
  component: RegistrationComponent,
  children : [
    {
      path: 'signup',
      component: SignupComponent,
    },
    {
      path: 'signin',
      component: SigninComponent
    },
    {
      path: 'confirmation',
      component: ConfirmationComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule {
}
