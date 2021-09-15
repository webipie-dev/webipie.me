import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesComponent } from './templates.component';
import { CardTemplatesComponent } from './card-templates/card-templates.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component';
import { TemplatesRoutingModule } from './templates-routing.module';
import { ChooseTemplateComponent } from './choose-template/choose-template.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ChooseNameComponent } from './choose-name/choose-name.component';


@NgModule({
  declarations: [
    TemplatesComponent,
    CardTemplatesComponent,
    HeaderComponent,
    ChooseTemplateComponent,
    ChooseNameComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TemplatesRoutingModule,
    FontAwesomeModule,
  ]
})
export class TemplatesModule { }
