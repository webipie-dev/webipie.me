import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../_shared/services/portfolio.service';

@Component({
  selector: 'app-portfolio0',
  templateUrl: './portfolio0.component.html',
  styleUrls: ['./portfolio0.component.scss']
})
export class Portfolio0Component implements OnInit {
  favIcon: HTMLLinkElement | null = document.querySelector('#app-icon');

  constructor(private portfolioService: PortfolioService) { 
  }

  changeIcon() {
    if(this.favIcon){
      this.favIcon.href = JSON.parse(localStorage.getItem('portfolio')!).picture;
      this.favIcon.type ="image/gif/png"
    }
  }
  ngOnInit(): void {
    this.setPortfolio()
    this.changeIcon()
  }

  async setPortfolio(){
    let result = await this.portfolioService.getPortfolioByUrl().toPromise()
    console.log(result);
    localStorage.setItem("portfolio", JSON.stringify(result));
  }

  scroll(el : HTMLElement){
    el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
