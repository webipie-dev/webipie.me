import {Component, OnInit, ViewChild} from '@angular/core';
import {DropzoneComponent, DropzoneConfigInterface, DropzoneDirective} from "ngx-dropzone-wrapper";
import {AchievementModel} from "../../_shared/models/achievement.model";

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements OnInit {

  constructor() { }

  achievements?: [AchievementModel];

  ngOnInit(): void {
    this.achievements = JSON.parse(localStorage.getItem('portfolio')!).achievements;
  }
}
