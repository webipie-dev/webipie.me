import {Component, Input, OnInit} from '@angular/core';
import {TestimonialModel} from "../../../_shared/models/testimonial.model";

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {
  square : boolean = true;
  textAlign : string = 'center';
  font="Montserrat";
  constructor() { }

  @Input() testimonial?: TestimonialModel;
  ngOnInit(): void {
    this.font = JSON.parse(localStorage.getItem('portfolio')!).template.font;

    if(JSON.parse(localStorage.getItem('portfolio')!).template.testimonials.picture == 'rounded') this.square = false;
    this.textAlign = JSON.parse(localStorage.getItem('portfolio')!).template.testimonials.textAlign;
  }

}
