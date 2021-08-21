import {Component, OnInit, ViewChild} from '@angular/core';
import {DropzoneComponent, DropzoneConfigInterface, DropzoneDirective} from "ngx-dropzone-wrapper";
import {WorkExperienceService} from "../../../_shared/services/work-experience.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TestimonialModel} from "../../../_shared/models/testimonial.model";
import {WorkExperienceModel} from "../../../_shared/models/work-experience.model";

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.scss']
})
export class AddExperienceComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private workExperienceService: WorkExperienceService,
              private router: Router, private route: ActivatedRoute) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
  }

  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  bsRangeValue!: Date[];
  maxDate = new Date();

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
  workExperience: WorkExperienceModel = {} as WorkExperienceModel;


  @ViewChild(DropzoneComponent, {static: false}) componentRef?: DropzoneComponent;
  @ViewChild(DropzoneDirective, {static: false}) directiveRef?: DropzoneDirective;

  workExperienceForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    position: [''],
    company: [''],
    imgs: [''],
    skills: [''],
    beginDate: ['', Validators.required],
    endDate: [''],
    city: ['']
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['workId']) {
        this.edit = true;
        this.fillEditForm(params['workId']);
      }
    });
  }

  public fillEditForm(workId: string): void {
    this.workExperience = (JSON.parse(localStorage.getItem('portfolio')!).workExperiences.filter((workExperience: WorkExperienceModel) => workExperience.id === workId ))[0];
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
      this.workExperienceService.addOne(this.workExperienceForm.value).subscribe((result) => {
        localStorage.setItem('portfolio', JSON.stringify(result.portfolio))
        this.router.navigate(['..'], {relativeTo: this.route}).then(r => console.log(r));
      });
    } else {
      this.workExperienceService.edit(this.workExperience.id, this.workExperienceForm.value).subscribe(result => {
        localStorage.setItem('portfolio', JSON.stringify(result.portfolio))
        this.router.navigate(['..'], {relativeTo: this.route}).then(r => console.log(r));
      })
    }
  }

}
