import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UrlPipe } from '../_shared/pipes/urlPipe';



@NgModule({
  declarations: [UrlPipe],
  imports: [
    CommonModule
  ],
  exports: [UrlPipe]
})
export class SharedModule { }
