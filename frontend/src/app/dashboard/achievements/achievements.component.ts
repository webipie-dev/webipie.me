import {Component, OnInit} from '@angular/core';
import {AchievementModel} from "../../_shared/models/achievement.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AchievementService} from "../../_shared/services/achievement.service";

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,
              private achievementService: AchievementService) {
  }

  achievements?: [AchievementModel];

  ngOnInit(): void {
    this.achievements = JSON.parse(localStorage.getItem('portfolio')!).achievements;
  }

  editAchievement(id: string) {
    this.router.navigate(['addachievement'], { relativeTo: this.route, queryParams: { achievementId: id } });
  }

  removeAchievement(id: string) {
    this.achievementService.deleteMany({ids: [id]}).subscribe(result => {
      localStorage.setItem('portfolio', JSON.stringify(result.portfolio))
      this.ngOnInit();
    })
  }
}
