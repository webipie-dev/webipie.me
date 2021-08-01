import {Component, OnInit, ViewChild} from '@angular/core';
import {DropzoneComponent, DropzoneConfigInterface, DropzoneDirective} from "ngx-dropzone-wrapper";
import {WorkExperienceService} from "../../../_shared/services/work-experience.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

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

  @ViewChild(DropzoneComponent, { static: false }) componentRef?: DropzoneComponent;
  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

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
    this.workExperienceService.addOne(this.workExperienceForm.value).subscribe( (result) => {
      console.log('got here')
      localStorage.setItem('portfolio', JSON.stringify(result.portfolio))
      this.router.navigate(['..'], { relativeTo: this.route }).then(r => console.log(r))
    });
  }

}
