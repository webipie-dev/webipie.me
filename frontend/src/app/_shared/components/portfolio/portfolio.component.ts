import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  favIcon: HTMLLinkElement | null = document.querySelector('#app-icon');

  constructor() { }

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

}
