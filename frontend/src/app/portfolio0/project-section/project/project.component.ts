import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import {ProjectModel} from "../../../_shared/models/project.model";

@Component({
  selector: 'app-project-element',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit,OnChanges {
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
  ngOnInit(): void {
    this.secondaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[1];
    this.primaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[0];
    
    this.template = JSON.parse(localStorage.getItem('portfolio')!).template.project.popupCard;
    if(window.innerWidth<1100)this.imgWidth=window.innerWidth;
    setInterval(()=>{
      if(this.pic==this.img.length){
        this.pic = 0;
        this.pos = 0;
      }else{
        this.pos+= this.imgWidth;
        this.pic++;
      }
    },4000)
  }
  ngOnChanges(changes: any) {
    // to be changed when filtering
    this.compare = true;
    if(!this.compare){
        this.class="cos-container inactive";
        setTimeout(()=>{
          this.class="cos-container inactive invisible";
        },1000)
    }else{
      this.class="cos-container";
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
