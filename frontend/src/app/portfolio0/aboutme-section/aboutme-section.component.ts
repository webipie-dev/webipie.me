import { Component, OnInit } from '@angular/core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

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
  primaryColor:string = "#e184fe";
  secondaryColor:string = "#e184fe";
  font = 'Montserrat';
  gitHub = faGithub;
  linkedIn = faLinkedin;
  constructor() { }

  ngOnInit(): void {
    this.secondaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[1];
    this.primaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[0];
    this.github = JSON.parse(localStorage.getItem('portfolio')!).github;
    this.linkedin = JSON.parse(localStorage.getItem('portfolio')!).linkedin;
    this.position = JSON.parse(localStorage.getItem('portfolio')!).position;
    this.picture = JSON.parse(localStorage.getItem('portfolio')!).picture;
    this.description = JSON.parse(localStorage.getItem('portfolio')!).description;
    this.font = JSON.parse(localStorage.getItem('portfolio')!).template.font;
    if(JSON.parse(localStorage.getItem('portfolio')!).template.general.picture == 'square') this.square = true;
  }

}
