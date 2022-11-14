import { Component, OnInit } from '@angular/core';
import { PortfolioComponent } from '../_shared/components/portfolio/portfolio.component';
import { PortfolioService } from '../_shared/services/portfolio.service';

@Component({
  selector: 'app-portfolio0',
  templateUrl: './portfolio0.component.html',
  styleUrls: ['./portfolio0.component.scss']
})
export class Portfolio0Component extends PortfolioComponent {
  favIcon: HTMLLinkElement | null = document.querySelector('#app-icon');

  constructor(private portfolioService: PortfolioService) {
    super();
  }


  scroll(el : HTMLElement){
    el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  get projectDisabled() {
    return JSON.parse(localStorage.getItem('portfolio')!).projectDisabled as boolean;
  }
}
