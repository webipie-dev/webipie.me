import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplatesComponent } from './templates.component';
import { CardTemplatesComponent } from './card-templates/card-templates.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component';
import { TemplatesRoutingModule } from './templates-routing.module';
import { ChooseTemplateComponent } from './choose-template/choose-template.component';



@NgModule({
  declarations: [
    TemplatesComponent,
    CardTemplatesComponent,
    HeaderComponent,
    ChooseTemplateComponent

  ],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    FontAwesomeModule,
  ]
})
export class TemplatesModule { }
