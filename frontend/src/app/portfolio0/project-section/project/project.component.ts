import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faAngleLeft, faAngleRight, faLink } from '@fortawesome/free-solid-svg-icons';
import {ProjectModel} from "../../../_shared/models/project.model";
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-project-element',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit,OnChanges,AfterViewInit {
  gitHub = faGithub;
  link = faLink;
  secondaryColor: any;
  primaryColor: any;
  constructor() { }
  @Input() globalTag = "All";
  @Input() tags? = ["none"];
  @Input() project!: ProjectModel;
  displayImg = 'assets/default-project-img.jpg'
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
  button = 1;

  minus : number = 0 ;

  ngOnInit(): void {
    console.log(this.project);
    this.secondaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[1];
    this.primaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[0];
    this.font = JSON.parse(localStorage.getItem('portfolio')!).template.font;
    this.button = JSON.parse(localStorage.getItem('portfolio')!).template.project.button;
    this.template = JSON.parse(localStorage.getItem('portfolio')!).template.project.popupCard;
    if(this.project.imgs){
      this.displayImg = this.project.imgs[0];
    }
    this.minus = this.project.video ? 0 : 1 ;
  }
  ngAfterViewInit(){
    if(window.innerWidth<1100)this.imgWidth=window.innerWidth;
  }
  goRight(){


    if(this.project.imgs)
    if(this.pic === this.project.imgs.length - this.minus ){
      this.pic = 0;
      this.pos = 0;

    }else{
      this.pos+= this.imgWidth;
      this.pic++;
    }
  }
  goLeft(){
    if(this.project.imgs)
    if(this.pic==0){
      this.pic = this.project.imgs.length;
      this.pos = (this.project.imgs.length - this.minus )*this.imgWidth;

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
  hexToRGB(hex: any, alpha: any) {
    var r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16);

    if (alpha) {
        return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
    } else {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
  }
}
