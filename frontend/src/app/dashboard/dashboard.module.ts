import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {DashboardRoutingModule} from "./dashboard-routing.module";
import { SidebarFooterComponent } from './sidebar/sidebar-footer/sidebar-footer.component';
import { SidebarMenuComponent } from './sidebar/sidebar-menu/sidebar-menu.component';
import { SidebarHeaderComponent } from './sidebar/sidebar-header/sidebar-header.component';
import { SidebarUserboxComponent } from './sidebar/sidebar-userbox/sidebar-userbox.component';
import { HeaderSearchComponent } from './header/header-search/header-search.component';
import { HeaderMenuComponent } from './header/header-menu/header-menu.component';
import { HeaderUserboxComponent } from './header/header-userbox/header-userbox.component';
import { SidebarCollapsedComponent } from './sidebar/sidebar-collapsed/sidebar-collapsed.component';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';
import { ErrorModalComponent } from '../_shared/components/error-modal/error-modal.component';
import { SuccessModalComponent } from '../_shared/components/success-modal/success-modal.component';
import { WarningModalComponent } from '../_shared/components/warning-modal/warning-modal.component';
import { InfoModalComponent } from '../_shared/components/info-modal/info-modal.component';
import { HeaderNotificationComponent } from './header/header-notification/header-notification.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeatherModule } from 'angular-feather';
import { Calendar, Activity, Bell, Settings, Search, Grid, Users, LifeBuoy, CloudDrizzle, Coffee, Box, Briefcase, Layers, Printer } from 'angular-feather/icons';
import { HeaderComponent } from './header/header/header.component';
const icons = {
   Calendar,
   Activity,
   Bell,
   Settings,
   Search,
   Grid,
   Users,
   LifeBuoy,
   CloudDrizzle,
   Coffee,
   Box,
   Briefcase,
   Layers,
   Printer
};

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ThemeOptions } from '../_shared/theme-options';
import { GeneralInfosComponent } from './general-infos/general-infos.component';
import { WrapperSimpleComponent } from '../_shared/components/wrapper-simple/wrapper-simple.component';
import { FooterComponent } from './footer/footer.component';
import { SkillsComponent } from './skills/skills.component';
import { WrapperSeamlessComponent } from '../_shared/components/wrapper-seamless/wrapper-seamless.component';
import { faFacebook, faTwitter, faAngular, faVuejs, faReact, faHtml5, faGoogle, faInstagram, faPinterest, faYoutube, faDiscord, faSlack, faDribbble, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faPrint, faAlignCenter, faMapMarkerAlt, faTachometerAlt, faExternalLinkAlt, faShareSquare, faSitemap, faInfoCircle, faLifeRing, faQuoteRight, faStarHalfAlt, faSync, faShapes, faCarBattery, faTable, faCubes, faPager, faCheckCircle, faTimesCircle, faBomb, faNetworkWired, faBusAlt, faBirthdayCake, faEyeDropper, faThumbsUp, faCameraRetro, faUnlockAlt, faDownload, faUpload, faReply, faFileImage, faFolderOpen, faBars, faTrashAlt, faSave, faPlayCircle, faEllipsisV, faEllipsisH, faSlidersH, faFileArchive, faAward, faCaretRight, faPlus, faFolder, faTimes, faEnvelope, faAddressCard, faMap, faCalendarAlt, faImages, faFilm, faClock, faSearch, faChevronRight, faChevronUp, faChevronLeft, faChevronDown, faLink, faLightbulb, faGem, faCog, faDotCircle, faArrowsAltH, faComments, faCommentDots, faKeyboard, faObjectGroup, faUser, faUserCircle, faQuestionCircle, faBuilding, faBell, faFileExcel, faFileAudio, faFileVideo, faFileWord, faFilePdf, faFileCode, faFileAlt, faEye, faChartBar, faPlusCircle, faAngleRight, faAngleUp, faAngleLeft, faAngleDown, faArrowUp, faArrowDown, faArrowRight, faArrowLeft, faStar, faSignOutAlt, faLemon } from '@fortawesome/free-solid-svg-icons';
import { AddSoftSkillComponent } from './skills/add-soft-skill/add-soft-skill.component';
import { AddHardSkillComponent } from './skills/add-hard-skill/add-hard-skill.component';
import { ExperienceComponent } from './experience/experience.component';
import { AddExperienceComponent } from './experience/add-experience/add-experience.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NouisliderModule } from 'ng2-nouislider';
import { ProjectsComponent } from './projects/projects.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper'; import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper'; import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { AchievementsComponent } from './achievements/achievements.component';
import { AddAchievementComponent } from './achievements/add-achievement/add-achievement.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { AddTestimonialComponent } from './testimonials/add-testimonial/add-testimonial.component';
import { ProfileComponent } from './profile/profile.component';
import { DesignComponent } from './design/design.component'; 
import { ColorPickerModule } from 'ngx-color-picker';
import { FontPickerModule } from 'ngx-font-picker';
import { FONT_PICKER_CONFIG } from 'ngx-font-picker';
import { FontPickerConfigInterface } from 'ngx-font-picker';
import { AutosizeModule } from 'ngx-autosize';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = { /* Change this to your upload POST address: url: 'https://httpbin.org/post', maxFilesize: 50, acceptedFiles: 'image/*'*/ };
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: false,
};
const DEFAULT_FONT_PICKER_CONFIG: FontPickerConfigInterface = {
  // Change this to your Google API key
  apiKey: 'AIzaSyBhWqjEHa0rSVAZs-bFDZoT9tkgKUg2sx0'
};
@NgModule({
  declarations: [
    
    DashboardComponent,
    SidebarComponent,
    SidebarCollapsedComponent,
    SidebarHeaderComponent,
    SidebarFooterComponent,
    SidebarMenuComponent,
    SidebarUserboxComponent,
    HeaderComponent,
    HeaderMenuComponent,
    HeaderSearchComponent,
    HeaderUserboxComponent,
    HeaderNotificationComponent,
    GeneralInfosComponent,
    WrapperSimpleComponent,
    WrapperSeamlessComponent,
    FooterComponent,
    ErrorModalComponent,
    SuccessModalComponent,
    WarningModalComponent,
    InfoModalComponent,
    SkillsComponent,
    AddSoftSkillComponent,
    AddHardSkillComponent,
    ExperienceComponent,
    AddExperienceComponent,
    ProjectsComponent,
    AddProjectComponent,
    AchievementsComponent,
    AddAchievementComponent,
    TestimonialsComponent,
    AddTestimonialComponent,
    ProfileComponent,
    DesignComponent,
    
  ],
  imports: [
    CommonModule,
    DropzoneModule,
    PerfectScrollbarModule,
    AccordionModule.forRoot(),
    FeatherModule.pick(icons),
    FontAwesomeModule,
    UiSwitchModule,
    NouisliderModule,
    ButtonsModule.forRoot(),
    CollapseModule.forRoot(),
    TimepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    ColorPickerModule,
    FontPickerModule,
    AutosizeModule,
    DashboardRoutingModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {
      provide: FONT_PICKER_CONFIG,
      useValue: DEFAULT_FONT_PICKER_CONFIG
    }
    ,
    ThemeOptions
  ]
})
export class DashboardModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faBell,faLinkedinIn,faCalendarAlt,faFacebook, faPrint, faAlignCenter, faMapMarkerAlt, faTachometerAlt, faExternalLinkAlt, faShareSquare, faSitemap, faInfoCircle, faLifeRing, faTwitter, faQuoteRight, faStarHalfAlt, faSync, faShapes, faCarBattery, faTable, faCubes, faPager,  faAngular, faVuejs, faReact, faHtml5, faCheckCircle, faTimesCircle, faBomb, faNetworkWired, faBusAlt, faBirthdayCake, faEyeDropper, faThumbsUp, faCameraRetro, faUnlockAlt, faDownload, faUpload, faReply, faGoogle, faFileImage, faFolderOpen, faBars, faTrashAlt, faSave, faPlayCircle, faEllipsisV, faEllipsisH, faSlidersH, faFileArchive, faAward, faCaretRight, faInstagram, faPinterest, faYoutube, faDiscord, faSlack, faDribbble, faGithub, faPlus, faFolder, faTimes, faEnvelope, faAddressCard, faMap, faCalendarAlt, faImages, faFilm, faClock, faSearch, faChevronRight, faChevronUp, faChevronLeft, faChevronDown, faLink, faLightbulb, faGem, faCog, faDotCircle, faArrowsAltH, faComments, faCommentDots, faKeyboard, faObjectGroup, faUser, faUserCircle, faQuestionCircle, faBuilding, faBell, faFileExcel, faFileAudio, faFileVideo, faFileWord, faFilePdf, faFileCode, faFileAlt, faEye, faChartBar, faPlusCircle, faAngleRight, faAngleUp, faAngleLeft, faAngleDown, faArrowUp, faArrowDown, faArrowRight, faArrowLeft, faStar, faSignOutAlt, faLemon);
  }
 }
