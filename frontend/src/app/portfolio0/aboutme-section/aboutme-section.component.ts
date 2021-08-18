import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutme-section',
  templateUrl: './aboutme-section.component.html',
  styleUrls: ['./aboutme-section.component.scss']
})
export class AboutmeSectionComponent implements OnInit {
  github ="";
  linkedin = "";
  picture = "assets/johndoe.jpg";
  description = "description";
  position : string = '';
  square : boolean = false;
  secondaryColor = "#e184fe";
  constructor() { }

  ngOnInit(): void {
    this.secondaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart.secondary_color;
    this.github = JSON.parse(localStorage.getItem('portfolio')!).github;
    this.linkedin = JSON.parse(localStorage.getItem('portfolio')!).linkedin;
    this.position = JSON.parse(localStorage.getItem('portfolio')!).position;
    this.picture = JSON.parse(localStorage.getItem('portfolio')!).picture;
    this.description = JSON.parse(localStorage.getItem('portfolio')!).description;
    if(JSON.parse(localStorage.getItem('portfolio')!).template.general.picture == 'square') this.square = true;
  }

}
