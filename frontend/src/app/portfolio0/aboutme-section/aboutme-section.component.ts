import { Component, OnInit } from '@angular/core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-aboutme-section',
  templateUrl: './aboutme-section.component.html',
  styleUrls: ['./aboutme-section.component.scss']
})
export class AboutmeSectionComponent implements OnInit {
  github ="";
  preposition = "a";
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
    this.linkedin = JSON.parse(localStorage.getItem('portfolio')!).linkedIn;
    this.position = JSON.parse(localStorage.getItem('portfolio')!).position;
    this.picture = JSON.parse(localStorage.getItem('portfolio')!).picture;
    this.description = JSON.parse(localStorage.getItem('portfolio')!).description;
    this.font = JSON.parse(localStorage.getItem('portfolio')!).template.font;
    if(JSON.parse(localStorage.getItem('portfolio')!).template.general.picture == 'square') this.square = true;
    if(this.position) {
      this.preposition = this.startsWithVowel(this.position.toLowerCase()) ? 'an' : 'a';
    }
  }

  startsWithVowel(word: string) {
    return word.startsWith('a') || word.startsWith('e') || word.startsWith('i') || word.startsWith('o') || word.startsWith('u')
  }
}
