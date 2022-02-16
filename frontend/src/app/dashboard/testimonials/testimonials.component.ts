import {Component, OnInit} from '@angular/core';
import {TestimonialModel} from "../../_shared/models/testimonial.model";
import {ActivatedRoute, Router} from "@angular/router";
import {TestimonialService} from "../../_shared/services/testimonial.service";
import { ToggleSection } from '../toggle-section/toggle-section';
import { PortfolioService } from 'src/app/_shared/services/portfolio.service';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent extends ToggleSection implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,
              private testimonialService: TestimonialService, protected portfolioService: PortfolioService,
              private spinner: NgxSpinnerService) {
    super(portfolioService, 'testimonials');
  }

  testimonials?: [TestimonialModel];

  ngOnInit(): void {
    this.testimonials = JSON.parse(localStorage.getItem('portfolio')!).testimonials;
  }

  editTestimonial(id: string) {
    this.router.navigate(['addtestimonial'], { relativeTo: this.route, queryParams: { testimonialId: id } });
  }

  removeTestimonial(id: string) {
    this.spinner.show();
    this.testimonialService.deleteMany({ids: [id]}).subscribe(result => {
      localStorage.setItem('portfolio', JSON.stringify(result.portfolio))
      this.spinner.hide();
      this.ngOnInit();
    })
  }

  upTestimonial(i: number){
    let aux = this.testimonials![i];
    this.testimonials![i] = this.testimonials![i-1]
    this.testimonials![i-1] = aux
  }

  downTestimonial(i: number){
    let aux = this.testimonials![i];
    this.testimonials![i] = this.testimonials![i+1]
    this.testimonials![i+1] = aux
  }

  compareArrays(array1: any, array2: any){
    return array1.length === array2.length && array1.every((value: any, index: any) => { 
      return value._id===array2[index]._id && value.id===array2[index].id
    })
  }

  ngOnDestroy(): void {
    let portfolio: any = JSON.parse(localStorage.getItem('portfolio')!);
    let body: any = {}
    if(!this.compareArrays(this.testimonials, JSON.parse(localStorage.getItem('portfolio')!).testimonials)){ 
      body.testimonials = this.testimonials
    }
    if(Object.keys(body).length !== 0){
      this.portfolioService.edit(portfolio.id, body).subscribe(
        (result) => {
          localStorage.setItem('portfolio', JSON.stringify(result));
        }
      );
    }
  }
}
