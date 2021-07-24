import { Component, OnInit } from '@angular/core';

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
  elements = 5;
  constructor() { }

  ngOnInit(): void {
    setInterval(()=>{
      
      if(this.elements){
        this.position += 340;
        this.elements --;
      }else{
        this.elements = 5;
        this.position = 0;
      }
    },4000)
  }

}
