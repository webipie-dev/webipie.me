import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    this.position = JSON.parse(localStorage.getItem('portfolio')!).position;
    this.picture = JSON.parse(localStorage.getItem('portfolio')!).picture;
    this.description = JSON.parse(localStorage.getItem('portfolio')!).description;
    this.cv = JSON.parse(localStorage.getItem('portfolio')!).CV;
    if(this.position) {
      this.preposition = this.startsWithVowel(this.position) ? 'an' : 'a';
    }
  }

  startsWithVowel(word: string) {
    return word.startsWith('a') || word.startsWith('e') || word.startsWith('i') || word.startsWith('o') || word.startsWith('u')
  }

}
