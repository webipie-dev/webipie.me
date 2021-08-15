import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio0',
  templateUrl: './portfolio0.component.html',
  styleUrls: ['./portfolio0.component.scss']
})
export class Portfolio0Component implements OnInit {
  favIcon: HTMLLinkElement | null = document.querySelector('#app-icon');

  constructor() { }

  changeIcon() {
    if(this.favIcon){
      this.favIcon.href = JSON.parse(localStorage.getItem('portfolio')!).picture;
      this.favIcon.type ="image/gif/png"
    }
  }
  ngOnInit(): void {
    this.changeIcon()
  }
  scroll(el : HTMLElement){
    el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
