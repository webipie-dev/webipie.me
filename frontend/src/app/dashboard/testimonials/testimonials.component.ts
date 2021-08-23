import {Component, OnInit} from '@angular/core';
import {TestimonialModel} from "../../_shared/models/testimonial.model";
import {ActivatedRoute, Router} from "@angular/router";
import {TestimonialService} from "../../_shared/services/testimonial.service";

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,
              private testimonialService: TestimonialService) {
  }

  testimonials?: [TestimonialModel];

  ngOnInit(): void {
    this.testimonials = JSON.parse(localStorage.getItem('portfolio')!).testimonials;
  }

  editTestimonial(id: string) {
    this.router.navigate(['addtestimonial'], { relativeTo: this.route, queryParams: { testimonialId: id } });
  }

  removeTestimonial(id: string) {
    this.testimonialService.deleteMany({ids: [id]}).subscribe(result => {
      localStorage.setItem('portfolio', JSON.stringify(result.portfolio))
      this.ngOnInit();
    })
  }

}
