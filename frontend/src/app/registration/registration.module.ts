import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import {RegistrationRoutingModule} from "./registration-routing.module";
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from "@angular/forms";
import { SignupComponent } from './signup/signup.component';
import { CardComponent } from './signup/card/card.component';
import { SigninComponent } from './signin/signin.component';
import { CardSigninComponent } from './signin/card-signin/card-signin.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ConfirmationCardComponent } from './confirmation/confirmation-card/confirmation-card.component';
import { LinkedinVerifComponent } from './linkedin-verif/linkedin-verif.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';



@NgModule({
  declarations: [
    RegistrationComponent,
    HeaderComponent,
    SignupComponent,
    CardComponent,
    SigninComponent,
    CardSigninComponent,
    ConfirmationComponent,
    ConfirmationCardComponent,
    LinkedinVerifComponent
  ],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    FontAwesomeModule,
    FormsModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '49124487691-99k5mbpk8cf52e52i6c0ifc5cp672r6k.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
})
export class RegistrationModule { }
