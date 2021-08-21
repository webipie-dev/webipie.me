import {Component, OnInit, ViewChild} from '@angular/core';
import {DropzoneComponent, DropzoneConfigInterface, DropzoneDirective} from "ngx-dropzone-wrapper";
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

  public type: string = 'component';

  public disabled: boolean = false;

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  // check if we are editing a testimonial or adding a new one
  edit = false;
  achievement: AchievementModel = {} as AchievementModel;

  @ViewChild(DropzoneComponent, {static: false}) componentRef?: DropzoneComponent;
  @ViewChild(DropzoneDirective, {static: false}) directiveRef?: DropzoneDirective;

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

  public toggleType(): void {
    this.type = (this.type === 'component') ? 'directive' : 'component';

  }

  public toggleDisabled(): void {
    this.disabled = !this.disabled;

  }

  public toggleAutoReset(): void {
    this.config.autoReset = this.config.autoReset ? null : 5000;
    this.config.errorReset = this.config.errorReset ? null : 5000;
    this.config.cancelReset = this.config.cancelReset ? null : 5000;
  }

  public toggleMultiUpload(): void {
    this.config.maxFiles = this.config.maxFiles ? 0 : 1;
  }

  public toggleClickAction(): void {
    this.config.clickable = !this.config.clickable;

  }

  public resetDropzoneUploads(): void {
    if (this.type === 'directive' && this.directiveRef) {
      this.directiveRef.reset();
    } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.reset();
    }
  }

  public onUploadInit(): void {
    document.getElementById('hiddenImageInput')?.click();
  }

  public onUploadError(): void {
  }

  public onUploadSuccess(): void {
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
