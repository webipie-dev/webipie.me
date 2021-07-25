import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebipieMeRoutingModule } from './webipieme-routing.module';
import { WebipiemeComponentComponent } from './webipieme-component/webipieme-component.component';
import { WebipiemeComponent } from './webipieme/webipieme.component';



@NgModule({
  declarations: [
    WebipiemeComponentComponent,
    WebipiemeComponent
  ],
  imports: [
    CommonModule,
    WebipieMeRoutingModule,
  ]
})
export class WebipiemeModule { }
