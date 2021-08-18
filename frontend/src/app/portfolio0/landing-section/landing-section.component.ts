import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-section',
  templateUrl: './landing-section.component.html',
  styleUrls: ['./landing-section.component.scss']
})
export class LandingSectionComponent implements OnInit {
  primaryColor="#79ebfe";
  secondaryColor="#e184fe";
  download = faDownload;
  speed = 2;
  position = '';
  arrowDown = faArrowAltCircleDown;
  name: string = '';
  constructor() { }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem('portfolio')!).name;
    this.position = JSON.parse(localStorage.getItem('portfolio')!).position;
    this.primaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart.font_color;
    this.secondaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart.secondary_color;
    this.speed = JSON.parse(localStorage.getItem('portfolio')!).template.general.animationSpeed;
  }

}
