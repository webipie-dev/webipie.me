import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {DesignEditService} from "../../_shared/services/design-edit.service";
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
  backgroundSpeed = 2;
  position = 0;
  elements = 4;
  inView: Boolean[] = [];
  testimonials!: [TestimonialModel];
  @ViewChild('target') target?: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.speed = JSON.parse(localStorage.getItem('portfolio')!).template.testimonials.carouselSpeed
    this.primaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[0];
    this.secondaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[1];
    this.backgroundSpeed = JSON.parse(localStorage.getItem('portfolio')!).template.general.animationSpeed;
    this.testimonials = JSON.parse(localStorage.getItem('portfolio')!).testimonials ?? [];
    this.inView = new Array(this.testimonials?.length).fill(false) ?? [];
    setTimeout(()=>{
      if(window.innerWidth<1000){
        this.position = 0;
        this.elements = this.inView.length-1;
        this.makeActive(this.inView.length-this.elements-1);
      }else{
        if(this.target){
          this.position = - this.target.nativeElement.offsetWidth;
        }
        
        this.elements = this.inView.length - 1;
        this.makeActive(this.inView.length-this.elements-1);
      }
    },100)
    
    setInterval(()=>{
      if(this.elements && this.target){
        this.position += this.target.nativeElement.offsetWidth;
        this.elements --;
        if(window.innerWidth<1000){
          this.makeActive(this.inView.length-this.elements-1);
        }else{
          this.makeActive(this.inView.length-this.elements-1);
        }

      }else{
        
        if(window.innerWidth<1000){
          this.position = 0;
          this.elements = this.inView.length-1;
          this.makeActive(this.inView.length-this.elements-1);
        }else{
          this.position = - this.target!.nativeElement.offsetWidth;
          this.elements = this.inView.length - 1;
          this.makeActive(this.inView.length-this.elements-1);
        }
      }
    },this.speed * 1000)
  }

  makeActive(i:number){
    for(let j=0; j<this.inView.length;j++){
      this.inView[j]=false;
    }
    this.inView[i]=true;
  }
}
