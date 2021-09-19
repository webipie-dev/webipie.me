import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  cv ="";
  @Output() aboutmeClick = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
    this.name = JSON.parse(localStorage.getItem('portfolio')!).userName;
    this.cv = JSON.parse(localStorage.getItem('portfolio')!).CV;
    this.position = JSON.parse(localStorage.getItem('portfolio')!).position;
    this.primaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[0];
    this.secondaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[1];
    this.speed = JSON.parse(localStorage.getItem('portfolio')!).template.general.animationSpeed;
  }
  clickAboutme(event:any){
    this.aboutmeClick.emit(event);
  }
}
