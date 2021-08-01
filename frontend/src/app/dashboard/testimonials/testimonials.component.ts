import {Component, OnInit} from '@angular/core';
import {TestimonialModel} from "../../_shared/models/testimonial.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  testimonials?: [TestimonialModel];

  ngOnInit(): void {
    this.testimonials = JSON.parse(localStorage.getItem('portfolio')!).testimonials;
  }

  editTestimonial(id: string) {
    this.router.navigate(['addtestimonial'], { relativeTo: this.route, queryParams: { testimonialId: id } });
  }
}
