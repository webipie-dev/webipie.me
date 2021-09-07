import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import {ProjectModel} from "../../../_shared/models/project.model";

@Component({
  selector: 'app-project-element',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit,OnChanges,AfterViewInit {
  secondaryColor: any;
  primaryColor: any;
  constructor() { }
  @Input() globalTag = "All";
  @Input() tags? = ["none"];
  @Input() project?: ProjectModel;
  pos = 0;
  imgWidth=1100;
  class = "cos-container";
  compare = true;
  img=['','',''];
  pic=0;
  close = faTimesCircle;
  template = 2;
  font = 'Montserrat';
  speed= 4000;
  rightArrow = faAngleRight;
  leftArrow = faAngleLeft;
  ngOnInit(): void {
    console.log(this.tags)
    this.secondaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[1];
    this.primaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[0];
    this.font = JSON.parse(localStorage.getItem('portfolio')!).template.font;

    this.template = JSON.parse(localStorage.getItem('portfolio')!).template.project.popupCard;
    
  }
  ngAfterViewInit(){
    if(window.innerWidth<1100)this.imgWidth=window.innerWidth;
  }
  goRight(){
    if(this.pic==this.img.length){
      this.pic = 0;
      this.pos = 0;
      
    }else{
      this.pos+= this.imgWidth;
      this.pic++;
    }
  }
  goLeft(){
    if(this.pic==0){
      this.pic = this.img.length;
      this.pos = this.img.length*this.imgWidth;
      
    }else{
      this.pos-= this.imgWidth;
      this.pic--;
    }
  }
  ngOnChanges(changes: any) {
    // to be changed when filtering
    if(!this.tags?.includes(this.globalTag) && this.globalTag!="All"){
        this.class="cos-container inactive";
        setTimeout(()=>{
          this.class="cos-container inactive invisible";
        },400)
    }else{
      setTimeout(()=>{
        this.class="cos-container";
      },950)
    }
  }
  onResize(el: HTMLElement){
    this.imgWidth = el.offsetWidth;
  }
  click(el: HTMLElement){
    el.setAttribute('class','overlay show');
  }
  exit(el: HTMLElement){
    el.setAttribute('class','overlay')
  }
}
