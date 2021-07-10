import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Portfolio0Component } from './portfolio0.component';
import {Portfolio0RoutingModule} from "./portfolio0-routing.module";
import { HeaderComponent } from './header/header.component';
import { LandingSectionComponent } from './landing-section/landing-section.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    Portfolio0Component,
    HeaderComponent,
    LandingSectionComponent
  ],
  imports: [
    CommonModule,
    Portfolio0RoutingModule,
    FontAwesomeModule
  ]
})
export class Portfolio0Module { }
