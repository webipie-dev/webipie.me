import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioEditComponent } from './portfolio-edit.component';
import {PortfolioEditRoutingModule} from "./portfolio-edit-routing.module";



@NgModule({
  declarations: [
    PortfolioEditComponent
  ],
  imports: [
    CommonModule,
    PortfolioEditRoutingModule
  ]
})
export class PortfolioEditModule { }
