import { Component, OnInit } from '@angular/core';
import { PortfolioComponent } from '../_shared/components/portfolio/portfolio.component';

@Component({
  selector: 'app-portfolio1',
  templateUrl: './portfolio1.component.html',
  styleUrls: ['./portfolio1.component.scss']
})
export class Portfolio1Component extends PortfolioComponent {

  constructor() {
    super();
  }

  get projectDisabled() {
    return JSON.parse(localStorage.getItem('portfolio')!).projectDisabled as boolean;
  }
  
  get testimonialsDisabled() {
    return JSON.parse(localStorage.getItem('portfolio')!).testimonialsDisabled as boolean;
  }
  
}
