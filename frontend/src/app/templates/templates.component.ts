import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  arrowright = faArrowAltCircleRight;
  arrowleft = faArrowAltCircleLeft;
  positionY = 0;

  constructor() { }

  ngOnInit(): void {
  }
  rightArrow(el:HTMLElement){
    this.positionY += el.offsetWidth;
  }
  leftArrow(el:HTMLElement){
    this.positionY -= el.offsetWidth;
  }

}
