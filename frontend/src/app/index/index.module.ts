import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import {IndexRoutingModule} from "./index-routing.module";
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { FooterComponent } from './footer/footer.component';
import { PriceCardComponent } from './price-card/price-card.component';
import { PriceSectionComponent } from './price-section/price-section.component';
import { InViewportModule } from 'ng-in-viewport';


@NgModule({
  declarations: [
    IndexComponent,
    HeaderComponent,
    FrontpageComponent,
    FooterComponent,
    PriceCardComponent,
    PriceSectionComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    FontAwesomeModule,
    InViewportModule
  ]
})
export class IndexModule { }
