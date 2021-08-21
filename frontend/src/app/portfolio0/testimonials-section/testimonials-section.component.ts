import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {TestimonialModel} from "../../_shared/models/testimonial.model";

@Component({
  selector: 'app-testimonials-section',
  templateUrl: './testimonials-section.component.html',
  styleUrls: ['./testimonials-section.component.scss']
})
export class TestimonialsSectionComponent implements OnInit {

  constructor() { }

  primaryColor="#79ebfe";
  secondaryColor="#e184fe";
  speed = 2;
  position = 0;
  elements = 4;
  inView: Boolean[] = [];
  testimonials!: [TestimonialModel];
  @ViewChild('target') target?: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.primaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[0];
    this.secondaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[1];
    this.speed = JSON.parse(localStorage.getItem('portfolio')!).template.general.animationSpeed;
    this.testimonials = JSON.parse(localStorage.getItem('portfolio')!).testimonials ?? [];
    this.inView = new Array(this.testimonials?.length).fill(false) ?? [];
    
    if(window.innerWidth<1000){
      this.elements = this.inView.length;
      this.makeActive(this.inView.length-this.elements);
    }else{
      this.elements = this.inView.length-3;
      this.makeActive(this.inView.length-this.elements-2);
    }
    setInterval(()=>{
      if(this.elements && this.target){
        this.position += this.target.nativeElement.offsetWidth;
        console.log(this.elements --);
        if(window.innerWidth<1000){
          this.makeActive(this.inView.length-this.elements);
        }else{
          this.makeActive(this.inView.length-this.elements-2);
        }

      }else{
        this.position = 0;
        if(window.innerWidth<1000){
          this.elements = this.inView.length;
          this.makeActive(this.inView.length-this.elements);
        }else{
          this.elements = this.inView.length - 3;
          this.makeActive(this.inView.length-this.elements-2);
        }
      }
    },JSON.parse(localStorage.getItem('portfolio')!).template.testimonials.carouselSpeed * 1000)
  }

  makeActive(i:number){
    for(let j=0; j<this.inView.length;j++){
      this.inView[j]=false;
    }
    this.inView[i]=true;
  }
}
