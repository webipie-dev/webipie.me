import { Component, OnInit } from '@angular/core';
import { faArrowAltCircleDown, faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-section',
  templateUrl: './landing-section.component.html',
  styleUrls: ['./landing-section.component.scss']
})
export class LandingSectionComponent implements OnInit {

  primaryColor="#79ebfe";
  secondaryColor="#e184fe";
  speed = 2;
  position = '';
  picture = "assets/johndoe.jpg";

  constructor() { }

  ngOnInit(): void {
    this.position = JSON.parse(localStorage.getItem('portfolio')!).position;
    this.primaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[0];
    this.secondaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[1];
    this.speed = JSON.parse(localStorage.getItem('portfolio')!).template.general.animationSpeed;
    this.picture = JSON.parse(localStorage.getItem('portfolio')!).picture;
    
  }

}
