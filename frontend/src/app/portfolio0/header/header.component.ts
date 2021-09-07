import { Component, HostListener, OnInit, Output, EventEmitter, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { faAngleRight, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  scrolled = false;
  menu = faBars;
  rightArrow = faAngleRight;
  name : string = "John Doe";
  color : string = "#202e37";
  @Output() aboutmeClick = new EventEmitter<any>();
  @Output() expertiseClick = new EventEmitter<any>();
  @Output() experienceClick = new EventEmitter<any>();
  @Output() testimonialsClick = new EventEmitter<any>();
  @Output() educationClick = new EventEmitter<any>();
  @Output() achievementsClick = new EventEmitter<any>();
  @Output() portfolioClick = new EventEmitter<any>();
  @Output() contactClick = new EventEmitter<any>();
  @ViewChild('target') target?: ElementRef;
  constructor() { } 
  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem('portfolio')!).name;
    this.color = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[0];
  }
  clickContact(event:any){
    this.contactClick.emit(event);
  }
  clickAboutme(event:any){
    this.target?.nativeElement.setAttribute('class','cosmenu hidden');
    this.target?.nativeElement.setAttribute('style','opacity:1');
    this.aboutmeClick.emit(event);
  }
  clickExpertise(event:any){
    this.target?.nativeElement.setAttribute('class','cosmenu hidden');
    this.target?.nativeElement.setAttribute('style','opacity:1');
    this.expertiseClick.emit(event);
  }
  clickExperience(event:any){
    this.target?.nativeElement.setAttribute('class','cosmenu hidden');
    this.target?.nativeElement.setAttribute('style','opacity:1');
    this.experienceClick.emit(event);
  }
  clickTestimonials(event:any){
    this.target?.nativeElement.setAttribute('class','cosmenu hidden');
    this.target?.nativeElement.setAttribute('style','opacity:1');
    this.testimonialsClick.emit(event);
  }
  clickEducation(event:any){
    this.target?.nativeElement.setAttribute('class','cosmenu hidden');
    this.target?.nativeElement.setAttribute('style','opacity:1');
    this.educationClick.emit(event);
  }
  clickAchievements(event:any){
    this.target?.nativeElement.setAttribute('class','cosmenu hidden');
    this.target?.nativeElement.setAttribute('style','opacity:1');
    this.achievementsClick.emit(event);
  }
  clickPortfolio(event:any){
    this.target?.nativeElement.setAttribute('class','cosmenu hidden');
    this.target?.nativeElement.setAttribute('style','opacity:1');
    this.portfolioClick.emit(event);
  }
  onClick(el : HTMLElement){
    if(el.getAttribute('class') == 'cosmenu hidden'){
      el.setAttribute('class','cosmenu');
      el.setAttribute('style','opacity:1');

    }else{
      el.setAttribute('class','cosmenu hidden');
      el.setAttribute('style','')
    }
    
  } 
  @HostListener('window:scroll', ['$event']) 
    doSomething(event:any) {
      if(window.pageYOffset > 100){
        this.scrolled=true;
      }else{
        this.scrolled=false;
      }
    }
}
