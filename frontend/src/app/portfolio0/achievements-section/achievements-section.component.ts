import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-achievements-section',
  templateUrl: './achievements-section.component.html',
  styleUrls: ['./achievements-section.component.scss']
})
export class AchievementsSectionComponent implements OnInit {
  check = faCheck;
  constructor() { }

  ngOnInit(): void {
  }

}
