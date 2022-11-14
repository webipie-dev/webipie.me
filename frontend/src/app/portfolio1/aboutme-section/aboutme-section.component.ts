import { Component, OnInit } from '@angular/core';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'app-aboutme-section',
  templateUrl: './aboutme-section.component.html',
  styleUrls: ['./aboutme-section.component.scss']
})
export class AboutmeSectionComponent implements OnInit {

  picture = "assets/johndoe.jpg";
  description = "description";
  position : string = '';
  preposition = "a";
  cv ="";
  github ="";
  linkedin = "";

  gitHub = faGithub;
  linkedIn = faLinkedin;

  constructor() { }

  ngOnInit(): void {
    this.position = JSON.parse(localStorage.getItem('portfolio')!).position;
    this.picture = JSON.parse(localStorage.getItem('portfolio')!).picture;
    this.description = JSON.parse(localStorage.getItem('portfolio')!).description;
    this.cv = JSON.parse(localStorage.getItem('portfolio')!).CV;
    if(this.position) {
      this.preposition = this.startsWithVowel(this.position) ? 'an' : 'a';
    }
    this.github = JSON.parse(localStorage.getItem('portfolio')!).github;
    this.linkedin = JSON.parse(localStorage.getItem('portfolio')!).linkedIn;
  }

  startsWithVowel(word: string) {
    return word.startsWith('a') || word.startsWith('e') || word.startsWith('i') || word.startsWith('o') || word.startsWith('u')
  }

}
