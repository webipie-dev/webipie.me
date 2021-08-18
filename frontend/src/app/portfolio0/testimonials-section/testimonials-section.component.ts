import { Component, OnInit } from '@angular/core';
import {DesignEditService} from "../../_shared/services/design-edit.service";
import {TemplateModel} from "../../_shared/models/template.model";

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
    this.speed = JSON.parse(localStorage.getItem('portfolio')!).template.testimonials.carouselSpeed
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
