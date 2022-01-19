import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonials-section',
  templateUrl: './testimonials-section.component.html',
  styleUrls: ['./testimonials-section.component.scss'],
})
export class TestimonialsSectionComponent implements OnInit {
  slides = [{}, {}, {}, {}, {}, {}, {}];
  config = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    prevArrow:
      "<button type='button' class='slick-prev'><i class='ion-ios-arrow-back font-size-xl'></i></button>",
    nextArrow:
      "<button type='button' class='slick-next'><i class='ion-ios-arrow-forward font-size-xl'></i></fa-icon></button>",
  };
  constructor() {}

  ngOnInit(): void {}
}
