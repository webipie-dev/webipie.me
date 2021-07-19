import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-choose-template',
  templateUrl: './choose-template.component.html',
  styleUrls: ['./choose-template.component.scss']
})
export class ChooseTemplateComponent implements OnInit {
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
