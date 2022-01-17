import { Component, OnInit } from '@angular/core';
import { faDrawPolygon, faStar, faToolbox } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-expertise-section',
  templateUrl: './expertise-section.component.html',
  styleUrls: ['./expertise-section.component.scss']
})
export class ExpertiseSectionComponent implements OnInit {
  design = faDrawPolygon;
  gears = faToolbox;
  star = faStar;
  constructor() { }

  ngOnInit(): void {
  }

}
