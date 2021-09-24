import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-section',
  templateUrl: './team-section.component.html',
  styleUrls: ['./team-section.component.scss']
})
export class TeamSectionComponent implements OnInit {
  class = "";
  constructor() { }

  ngOnInit(): void {
  }
  onIntersection(){
    this.class = 'active';
  }
}
