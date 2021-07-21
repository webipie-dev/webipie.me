import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-testimonials-section',
  templateUrl: './testimonials-section.component.html',
  styleUrls: ['./testimonials-section.component.scss']
})
export class TestimonialsSectionComponent implements OnInit {
  primaryColor="#79ebfe";
  secondaryColor="#e184fe";
  speed = 2;
  position = 0;
  elements = 4;
  inView=[false,false,false,false,false,false,false];
  @ViewChild('target') target?: ElementRef<HTMLElement>;
  constructor() { }
  makeActive(i:number){
    for(let j=0; j<this.inView.length;j++){
      this.inView[j]=false;
    }
    this.inView[i]=true;
  }
  ngOnInit(): void {
    
    if(window.innerWidth<1000){
      this.elements = this.inView.length;
      this.makeActive(this.inView.length-this.elements);
    }else{
      this.makeActive(this.inView.length-this.elements-2);
    }
    
    setInterval(()=>{
      
      if(this.elements && this.target){
        this.position += this.target.nativeElement.offsetWidth;
        this.elements --;
        if(window.innerWidth<1000){
          this.makeActive(this.inView.length-this.elements);
        }else{
          this.makeActive(this.inView.length-this.elements-2);
        }
        
      }else{
        this.elements = 4;
        this.position = 0;
        if(window.innerWidth<1000){
          this.elements = this.inView.length;
          this.makeActive(this.inView.length-this.elements);
        }else{
          this.makeActive(this.inView.length-this.elements-2);
        }
      }
    },4000)
  }

}
