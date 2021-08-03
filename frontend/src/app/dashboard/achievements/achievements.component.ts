import {Component, OnInit} from '@angular/core';
import {AchievementModel} from "../../_shared/models/achievement.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  achievements?: [AchievementModel];

  ngOnInit(): void {
    this.achievements = JSON.parse(localStorage.getItem('portfolio')!).achievements;
  }

  editAchievement(id: string) {
    this.router.navigate(['addachievement'], { relativeTo: this.route, queryParams: { achievementId: id } });
  }
}
