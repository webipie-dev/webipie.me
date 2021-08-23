import { Component, HostListener, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  scrolled = false;
  @Output() aboutmeClick = new EventEmitter<any>();
  @Output() expertiseClick = new EventEmitter<any>();
  @Output() experienceClick = new EventEmitter<any>();
  @Output() testimonialsClick = new EventEmitter<any>();
  @Output() contactClick = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
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
  @HostListener('window:scroll', ['$event']) 
    doSomething(event:any) {
      if(window.pageYOffset > 100){
        this.scrolled=true;
      }else{
        this.scrolled=false;
      }
    }
}
