import { Component, HostListener, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { faMouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class FrontpageComponent implements OnInit {
  mouse = faMouse;
  class = '';
  constructor(private renderer:Renderer2) { }

  ngOnInit(): void {
  }
  onIntersection(){
    this.class = 'active';
  }
  
}
