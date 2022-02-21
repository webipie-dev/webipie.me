import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio1',
  templateUrl: './portfolio1.component.html',
  styleUrls: ['./portfolio1.component.scss']
})
export class Portfolio1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  get projectDisabled() {
    return JSON.parse(localStorage.getItem('portfolio')!).projectDisabled as boolean;
  }
  
  get testimonialsDisabled() {
    return JSON.parse(localStorage.getItem('portfolio')!).testimonialsDisabled as boolean;
  }
  
}
