import {Component, OnInit, ViewChild} from '@angular/core';
import {DropzoneComponent, DropzoneConfigInterface, DropzoneDirective} from 'ngx-dropzone-wrapper';
import {FormBuilder, Validators} from "@angular/forms";
import {ProjectService} from "../../../_shared/services/project.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectModel} from "../../../_shared/models/project.model";
import {TestimonialModel} from "../../../_shared/models/testimonial.model";
import Swal from "sweetalert2";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private projectService: ProjectService,
              private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService) {
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
  project: ProjectModel = {} as ProjectModel;

  @ViewChild(DropzoneComponent, {static: false}) componentRef?: DropzoneComponent;
  @ViewChild(DropzoneDirective, {static: false}) directiveRef?: DropzoneDirective;

  projectForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    github: ['', Validators.required],
    imgs: [''],
    link: [''],
    skills: [''],
  })

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['projectId']) {
        this.edit = true;
        this.fillEditForm(params['projectId']);
      }
    });
  }

  public fillEditForm(projectId: string): void {
    this.project = (JSON.parse(localStorage.getItem('portfolio')!).projects.filter((project: ProjectModel) => project.id === projectId))[0];
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
  }

  public onUploadError(): void {
  }

  public onUploadSuccess(): void {
  }

  onSubmit() {
    this.spinner.show();
    if(!this.edit) {
      this.projectService.addOne(this.projectForm.value).subscribe((result) => {
        localStorage.setItem('portfolio', JSON.stringify(result.portfolio));
        this.spinner.hide();
        this.router.navigate(['..'], {relativeTo: this.route}).then(r => console.log(r));
      }, error => {
        this.spinner.hide();
        Swal.fire({
          title: 'Error!',
          text: error.error.errors[0].message,
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      })
    } else {
      this.projectService.edit(this.project.id, this.projectForm.value).subscribe(result => {
        localStorage.setItem('portfolio', JSON.stringify(result.portfolio));
        this.spinner.hide();
        this.router.navigate(['..'], {relativeTo: this.route}).then(r => console.log(r));
      }, error => {
        this.spinner.hide();
        Swal.fire({
          title: 'Error!',
          text: error.error.errors[0].message,
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      })
    }
  }
}
