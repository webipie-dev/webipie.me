import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";
import { RegistrationComponent } from "./registration.component";
import {ConfirmationComponent} from "./confirmation/confirmation.component";
import {LoginAuthGuardService as LoginAuthGuard} from "../_shared/services/login-auth-guard.service";
import {LinkedinVerifComponent} from "./linkedin-verif/linkedin-verif.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";

const routes: Routes = [{
  path: '',
  component: RegistrationComponent,
  children : [
    {
      path: 'signup',
      component: SignupComponent,
      canActivate: [LoginAuthGuard],
    },
    {
      path: 'signin',
      component: SigninComponent,
      canActivate: [LoginAuthGuard],
    },
    {
      path: 'confirmation',
      component: ConfirmationComponent
    },
    {
      path: 'linkedin-verif',
      component: LinkedinVerifComponent
    },
    {
      path: 'forget-password',
      component: ForgotPasswordComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule {
}
