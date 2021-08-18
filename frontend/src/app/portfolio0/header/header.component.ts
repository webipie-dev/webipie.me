import { Component, HostListener, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  scrolled = false;
  name : string = "John Doe"
  @Output() aboutmeClick = new EventEmitter<any>();
  @Output() expertiseClick = new EventEmitter<any>();
  @Output() experienceClick = new EventEmitter<any>();
  @Output() testimonialsClick = new EventEmitter<any>();
  @Output() educationClick = new EventEmitter<any>();
  @Output() achievementsClick = new EventEmitter<any>();
  @Output() portfolioClick = new EventEmitter<any>();
  @Output() contactClick = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem('portfolio')!).name;
  }
  clickContact(event:any){
    this.contactClick.emit(event);
  }
  clickAboutme(event:any){
    this.aboutmeClick.emit(event);
  }
  clickExpertise(event:any){
    this.expertiseClick.emit(event);
  }
  clickExperience(event:any){
    this.experienceClick.emit(event);
  }
  clickTestimonials(event:any){
    this.testimonialsClick.emit(event);
  }
  clickEducation(event:any){
    this.educationClick.emit(event);
  }
  clickAchievements(event:any){
    this.achievementsClick.emit(event);
  }
  clickPortfolio(event:any){
    this.portfolioClick.emit(event);
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
