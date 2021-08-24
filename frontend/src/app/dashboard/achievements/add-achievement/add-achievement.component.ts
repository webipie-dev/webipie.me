import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AchievementService} from "../../../_shared/services/achievement.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TestimonialModel} from "../../../_shared/models/testimonial.model";
import {AchievementModel} from "../../../_shared/models/achievement.model";

@Component({
  selector: 'app-add-achievement',
  templateUrl: './add-achievement.component.html',
  styleUrls: ['./add-achievement.component.scss']
})
export class AddAchievementComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private achievementService: AchievementService,
              private router: Router, private route: ActivatedRoute) {
  }

  achievementForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    date: ['', Validators.required],
    image: ['']
  });

  // check if we are editing a testimonial or adding a new one
  edit = false;
  achievement: AchievementModel = {} as AchievementModel;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['achievementId']) {
        this.edit = true;
        this.fillEditForm(params['achievementId']);
      }
    });
  }

  public fillEditForm(achievementId: string): void {
    this.achievement = (JSON.parse(localStorage.getItem('portfolio')!).achievements.filter((achievement: AchievementModel) => achievement.id === achievementId ))[0];
  }

  images: File[] = [];

  onSelect(event: any) {
    this.images = [];
    this.images.push(...event.addedFiles);
    console.log(this.images);
  }

  onRemove(event: any) {
    console.log(event);
    this.images.splice(this.images.indexOf(event), 1);
  }

  onSubmit() {
    if(!this.edit) {
      this.achievementService.addOne(this.achievementForm.value).subscribe((result) => {
        localStorage.setItem('portfolio', JSON.stringify(result.portfolio))
        this.router.navigate(['..'], {relativeTo: this.route}).then(r => console.log(r));
      });
    } else {
      this.achievementService.edit(this.achievement.id, this.achievementForm.value).subscribe(result => {
        localStorage.setItem('portfolio', JSON.stringify(result.portfolio))
        this.router.navigate(['..'], {relativeTo: this.route}).then(r => console.log(r));
      })
    }
  }
}
