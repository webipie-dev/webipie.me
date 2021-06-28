import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Portfolio0Component } from './portfolio0.component';
import {Portfolio0RoutingModule} from "./portfolio0-routing.module";



@NgModule({
  declarations: [
    Portfolio0Component
  ],
  imports: [
    CommonModule,
    Portfolio0RoutingModule
  ]
})
export class Portfolio0Module { }
