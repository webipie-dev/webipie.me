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

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: false,
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
    GeneralInfosComponent,
    WrapperSimpleComponent,
    FooterComponent,
    ErrorModalComponent,
    SuccessModalComponent,
    WarningModalComponent,
    InfoModalComponent,
  ],
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    FeatherModule.pick(icons),
    FontAwesomeModule,
    
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

    DashboardRoutingModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    ThemeOptions
  ]
})
export class DashboardModule { }
