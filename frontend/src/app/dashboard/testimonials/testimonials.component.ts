import { Component, OnInit } from '@angular/core';
import {TestimonialModel} from "../../_shared/models/testimonial.model";

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

  constructor() { }

  testimonials?: [TestimonialModel];

  ngOnInit(): void {
    this.testimonials = JSON.parse(localStorage.getItem('portfolio')!).testimonials;
  }

}
