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
  selected = [false,false,false,false,false,false];
  constructor() { }

  ngOnInit(): void {
  }
  rightArrow(el:HTMLElement){
    this.positionY += el.offsetWidth;
    if(this.positionY>el.offsetWidth){
      this.positionY=0;
    }
  }
  leftArrow(el:HTMLElement){
    this.positionY -= el.offsetWidth;
    if(this.positionY<0){
      this.positionY=el.offsetWidth;
    }
  }
  select(i:number,value:boolean){
    
    for(let j = 0;j<this.selected.length;j++){
      this.selected[j] = false;
    }
    console.log(this.selected);
    this.selected[i]=value;
    console.log(this.selected);
  }
}
