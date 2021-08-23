import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio0',
  templateUrl: './portfolio0.component.html',
  styleUrls: ['./portfolio0.component.scss']
})
export class Portfolio0Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  scroll(el : HTMLElement){
    el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
