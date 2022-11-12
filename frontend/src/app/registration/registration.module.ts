import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import {RegistrationRoutingModule} from "./registration-routing.module";
import { HeaderComponent } from './header/header.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from "@angular/forms";
import { SignupComponent } from './signup/signup.component';
import { CardComponent } from './signup/card/card.component';
import { SigninComponent } from './signin/signin.component';
import { CardSigninComponent } from './signin/card-signin/card-signin.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ConfirmationCardComponent } from './confirmation/confirmation-card/confirmation-card.component';
import { LinkedinVerifComponent } from './linkedin-verif/linkedin-verif.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { NgxSpinnerModule } from "ngx-spinner";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ForgotPasswordCardComponent } from './forgot-password/forgot-password-card/forgot-password-card.component';
import { ConsentComponent } from './consent/consent.component';
import { CardConsentComponent } from './consent/card-consent/card-consent.component';
import { faFacebookF, faLinkedinIn, faFacebook, faTwitter, faAngular, faVuejs, faReact, faHtml5, faGoogle, faInstagram, faPinterest, faYoutube, faDiscord, faSlack, faDribbble, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCalendarCheck, faAsterisk, faCheck, faCheckCircle, faArrowAltCircleLeft, faExclamation, faExclamationCircle, faStopwatch, faBell, faCalendarAlt, faPrint, faAlignCenter, faMapMarkerAlt, faTachometerAlt, faExternalLinkAlt, faShareSquare, faSitemap, faInfoCircle, faLifeRing, faQuoteRight, faStarHalfAlt, faSync, faShapes, faCarBattery, faTable, faCubes, faPager, faTimesCircle, faBomb, faNetworkWired, faBusAlt, faBirthdayCake, faEyeDropper, faThumbsUp, faCameraRetro, faUnlockAlt, faDownload, faUpload, faReply, faFileImage, faFolderOpen, faBars, faTrashAlt, faSave, faPlayCircle, faEllipsisV, faEllipsisH, faSlidersH, faFileArchive, faAward, faCaretRight, faPlus, faFolder, faTimes, faEnvelope, faAddressCard, faMap, faImages, faFilm, faClock, faSearch, faChevronRight, faChevronUp, faChevronLeft, faChevronDown, faLink, faLightbulb, faGem, faCog, faDotCircle, faArrowsAltH, faComments, faCommentDots, faKeyboard, faObjectGroup, faUser, faUserCircle, faQuestionCircle, faBuilding, faFileExcel, faFileAudio, faFileVideo, faFileWord, faFilePdf, faFileCode, faFileAlt, faEye, faChartBar, faPlusCircle, faAngleRight, faAngleUp, faAngleLeft, faAngleDown, faArrowUp, faArrowDown, faArrowRight, faArrowLeft, faStar, faSignOutAlt, faLemon, faUsers, faPuzzlePiece, faHourglassStart, faHandsHelping, faBolt, faBalanceScale, faHandshake, faCommentMedical, faGraduationCap, faUserShield, faAssistiveListeningSystems, faHourglass, faPoll, faPaperPlane, faArrowsAlt, faTasks, faBook, faDoorOpen, faWrench, faDirections, faRandom, faUserGraduate, faUserLock, faGavel, faProjectDiagram, faUserClock } from '@fortawesome/free-solid-svg-icons';


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
    ForgotPasswordComponent,
    ForgotPasswordCardComponent,
    ConsentComponent,
    CardConsentComponent,
  ],
  imports: [
    SlickCarouselModule,
    CommonModule,
    RegistrationRoutingModule,
    FontAwesomeModule,
    FormsModule,
    SocialLoginModule,
    NgxSpinnerModule
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
export class RegistrationModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faFacebookF,faCalendarCheck,faAsterisk,faCheck,faCheckCircle,faArrowAltCircleLeft,faExclamation,faExclamationCircle,faStopwatch, faBell, faLinkedinIn, faCalendarAlt, faFacebook, faPrint, faAlignCenter, faMapMarkerAlt, faTachometerAlt, faExternalLinkAlt, faShareSquare, faSitemap, faInfoCircle, faLifeRing, faTwitter, faQuoteRight, faStarHalfAlt, faSync, faShapes, faCarBattery, faTable, faCubes, faPager,  faAngular, faVuejs, faReact, faHtml5, faCheckCircle, faTimesCircle, faBomb, faNetworkWired, faBusAlt, faBirthdayCake, faEyeDropper, faThumbsUp, faCameraRetro, faUnlockAlt, faDownload, faUpload, faReply, faGoogle, faFileImage, faFolderOpen, faBars, faTrashAlt, faSave, faPlayCircle, faEllipsisV, faEllipsisH, faSlidersH, faFileArchive, faAward, faCaretRight, faInstagram, faPinterest, faYoutube, faDiscord, faSlack, faDribbble, faGithub, faPlus, faFolder, faTimes, faEnvelope, faAddressCard, faMap, faCalendarAlt, faImages, faFilm, faClock, faSearch, faChevronRight, faChevronUp, faChevronLeft, faChevronDown, faLink, faLightbulb, faGem, faCog, faDotCircle, faArrowsAltH, faComments, faCommentDots, faKeyboard, faObjectGroup, faUser, faUserCircle, faQuestionCircle, faBuilding, faBell, faFileExcel, faFileAudio, faFileVideo, faFileWord, faFilePdf, faFileCode, faFileAlt, faEye, faChartBar, faPlusCircle, faAngleRight, faAngleUp, faAngleLeft, faAngleDown, faArrowUp, faArrowDown, faArrowRight, faArrowLeft, faStar, faSignOutAlt, faLemon, faUser, faKeyboard, faEye, faChartBar, faComments, faUsers, faLightbulb, faPuzzlePiece, faHourglassStart, faHandsHelping, faBolt, faBalanceScale, faHandshake, faCommentMedical,faGraduationCap, faUserShield, faAssistiveListeningSystems, faHourglass, faPoll, faPaperPlane, faArrowsAlt, faTasks, faBook, faClock, faDoorOpen, faWrench, faDirections,faRandom, faUserGraduate, faUserLock, faGavel, faProjectDiagram, faUserClock);
  }
}
