import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressRouterModule } from '@ngx-progressbar/router';
import { FeatherModule } from 'angular-feather';
import {
  Activity,
  Bell,
  Box,
  Briefcase,
  Calendar,
  CloudDrizzle,
  Coffee,
  Grid,
  Layers,
  LifeBuoy,
  Printer,
  Search,
  Settings,
  Users
} from 'angular-feather/icons';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxFlagIconCssModule } from 'ngx-flag-icon-css';
import { FontawesomeModule } from '../fontawesome/fontawesome.module';
import { ErrorModalComponent } from '../_shared/components/error-modal/error-modal.component';
import { InfoModalComponent } from '../_shared/components/info-modal/info-modal.component';
import { SuccessModalComponent } from '../_shared/components/success-modal/success-modal.component';
import { WarningModalComponent } from '../_shared/components/warning-modal/warning-modal.component';
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from './dashboard.component';
import { HeaderMenuComponent } from './header/header-menu/header-menu.component';
import { HeaderNotificationComponent } from './header/header-notification/header-notification.component';
import { HeaderSearchComponent } from './header/header-search/header-search.component';
import { HeaderUserboxComponent } from './header/header-userbox/header-userbox.component';
import { HeaderComponent } from './header/header/header.component';
import { SidebarCollapsedComponent } from './sidebar/sidebar-collapsed/sidebar-collapsed.component';
import { SidebarFooterComponent } from './sidebar/sidebar-footer/sidebar-footer.component';
import { SidebarHeaderComponent } from './sidebar/sidebar-header/sidebar-header.component';
import { SidebarMenuComponent } from './sidebar/sidebar-menu/sidebar-menu.component';
import { SidebarUserboxComponent } from './sidebar/sidebar-userbox/sidebar-userbox.component';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';


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

import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { NouisliderModule } from 'ng2-nouislider';
import { DropzoneConfigInterface, DropzoneModule } from 'ngx-dropzone-wrapper';
import { PerfectScrollbarConfigInterface, PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { UiSwitchModule } from 'ngx-ui-switch';
import { WrapperSeamlessComponent } from '../_shared/components/wrapper-seamless/wrapper-seamless.component';
import { WrapperSimpleComponent } from '../_shared/components/wrapper-simple/wrapper-simple.component';
import { ThemeOptions } from '../_shared/theme-options';
import { AchievementsComponent } from './achievements/achievements.component';
import { AddAchievementComponent } from './achievements/add-achievement/add-achievement.component';
import { AddExperienceComponent } from './experience/add-experience/add-experience.component';
import { ExperienceComponent } from './experience/experience.component';
import { FooterComponent } from './footer/footer.component';
import { GeneralInfosComponent } from './general-infos/general-infos.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { ProjectsComponent } from './projects/projects.component';
import { AddHardSkillComponent } from './skills/add-hard-skill/add-hard-skill.component';
import { AddSoftSkillComponent } from './skills/add-soft-skill/add-soft-skill.component';
import { AddTestimonialComponent } from './testimonials/add-testimonial/add-testimonial.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { AutosizeModule } from 'ngx-autosize';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { EllipsisModule } from 'ngx-ellipsis';
import { FontPickerConfigInterface, FontPickerModule, FONT_PICKER_CONFIG } from 'ngx-font-picker';
import { JoyrideModule } from 'ngx-joyride';
import { NgxSpinnerModule } from "ngx-spinner";
import { ContactSupportComponent } from './contact-support/contact-support.component';
import { AchievementsSectionComponent } from './design/achievements-section/achievements-section.component';
import { ContactSectionComponent } from './design/contact-section/contact-section.component';
import { DesignComponent } from './design/design.component';
import { EducationSectionComponent } from './design/education-section/education-section.component';
import { ExperienceSectionComponent } from './design/experience-section/experience-section.component';
import { ExplanationComponent } from './design/explanation/explanation.component';
import { GeneralComponent } from './design/general/general.component';
import { ProjectsSectionComponent } from './design/projects-section/projects-section.component';
import { SkillsSectionComponent } from './design/skills-section/skills-section.component';
import { TestimonialsSectionComponent } from './design/testimonials-section/testimonials-section.component';
import { DomainRequestComponent } from './domain-request/domain-request.component';
import { AddEducationComponent } from './education/add-education/add-education.component';
import { EducationComponent } from './education/education.component';
import { AddVolunteerComponent } from './experience/add-volunteer/add-volunteer.component';
import { FaqComponent } from './faq/faq.component';
import { ProgressBarComponent } from './home/progress-bar/progress-bar.component';
import { SectionTogglesComponent } from './home/section-toggles/section-toggles.component';
import { LogoutComponent } from './logout/logout.component';
import { SkillsComponent } from './skills/skills.component';


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
    SkillsSectionComponent,
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
    HomeComponent,
    EducationComponent,
    AddEducationComponent,
    DesignComponent,
    GeneralComponent,
    SkillsComponent,
    AddVolunteerComponent,
    TestimonialsSectionComponent,
    ExperienceSectionComponent,
    ContactSectionComponent,
    EducationSectionComponent,
    ProjectsSectionComponent,
    AchievementsSectionComponent,
    LogoutComponent,
    SectionTogglesComponent,
    ProgressBarComponent,
    ContactSupportComponent,
    DomainRequestComponent,
    FaqComponent,
    ExplanationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    JoyrideModule.forRoot(),
    DropzoneModule,
    PerfectScrollbarModule,
    NgxDropzoneModule,
    AccordionModule.forRoot(),
    FeatherModule.pick(icons),
    FontawesomeModule,
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
    NgApexchartsModule,
    NgProgressModule,
    NgProgressRouterModule,
    NgxFlagIconCssModule,
    ColorPickerModule,
    FontPickerModule,
    AutosizeModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    NgSelectModule,
    NgxSpinnerModule,
    EllipsisModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
export class DashboardModule {}
