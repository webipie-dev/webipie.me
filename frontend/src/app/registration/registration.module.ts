import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import {RegistrationRoutingModule} from "./registration-routing.module";
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignupComponent } from './signup/signup.component';
import { CardComponent } from './signup/card/card.component';
import { SigninComponent } from './signin/signin.component';



@NgModule({
  declarations: [
    RegistrationComponent,
    HeaderComponent,
    SignupComponent,
    CardComponent,
    SigninComponent
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    FontAwesomeModule
  ]
})
export class RegistrationModule { }
