import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import {RegistrationRoutingModule} from "./registration-routing.module";
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignupComponent } from './signup/signup.component';
import { CardComponent } from './signup/card/card.component';
import { SigninComponent } from './signin/signin.component';
import { CardSigninComponent } from './signin/card-signin/card-signin.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ConfirmationCardComponent } from './confirmation/confirmation-card/confirmation-card.component';
import { LinkedinVerifComponent } from './linkedin-verif/linkedin-verif.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';



@NgModule({
  declarations: [
    RegistrationComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    CardComponent,
    CardSigninComponent,
    ConfirmationComponent,
    ConfirmationCardComponent,
    LinkedinVerifComponent,
  ],
  imports: [
    SlickCarouselModule,
    CommonModule,
    RegistrationRoutingModule,
    FontAwesomeModule
  ]
})
export class RegistrationModule { }
