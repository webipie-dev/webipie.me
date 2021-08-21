import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GenericService} from "./generic.service";
import {PortfolioModel} from "../models/portfolio.model";
import {TestimonialModel} from "../models/testimonial.model";

@Injectable({
  providedIn: 'root'
})
export class TestimonialService extends GenericService<TestimonialModel>{

  constructor(protected http: HttpClient) {
    super(http);
    this.suffix = '/testimonial';
  }
}
