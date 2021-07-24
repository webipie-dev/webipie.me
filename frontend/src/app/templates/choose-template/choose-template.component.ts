import { Component, ContentChild, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  carouselwidth = 0;
  inView = 4;
  selected = [false,false,false,false,false,false];
  @ViewChild('target',{static:true}) target ?: ElementRef<HTMLElement>;
  constructor() { 
    
  }

  ngOnInit(): void {
    if(window.innerWidth<700){
      this.inView = 1;
    }else if(window.innerWidth<1100){
      this.inView = 2;
    }else if(window.innerWidth<1400){
      this.inView = 3;
    }
    if(this.target) this.carouselwidth = this.selected.length * this.target.nativeElement.offsetWidth;
    console.log(this.carouselwidth);
  }
  rightArrow(el:HTMLElement){
    this.positionY += el.offsetWidth;
    if(this.positionY>el.offsetWidth * (this.selected.length-this.inView)){
      this.positionY=0;
    }
  }
  leftArrow(el:HTMLElement){
    this.positionY -= el.offsetWidth;
    if(this.positionY<0){
      this.positionY=el.offsetWidth * (this.selected.length-this.inView);
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
