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

  changeTitle(){
    document.title = JSON.parse(localStorage.getItem('portfolio')!).name;
  }

  ngOnInit(): void {
    this.changeIcon()
    this.changeTitle()
  }

  scroll(el : HTMLElement){
    el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  get projectDisabled() {
    return JSON.parse(localStorage.getItem('portfolio')!).projectDisabled as boolean;
  }
}
