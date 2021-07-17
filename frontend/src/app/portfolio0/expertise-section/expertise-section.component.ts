import { Component, OnInit } from '@angular/core';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-expertise-section',
  templateUrl: './expertise-section.component.html',
  styleUrls: ['./expertise-section.component.scss']
})
export class ExpertiseSectionComponent implements OnInit {
  watch = faStopwatch;
  constructor() { }

  ngOnInit(): void {
  }

}