import {Component, OnInit, ViewChild} from '@angular/core';
import {DropzoneComponent, DropzoneConfigInterface, DropzoneDirective} from 'ngx-dropzone-wrapper';
import {FormBuilder, Validators} from "@angular/forms";
import {TestimonialService} from "../../../_shared/services/testimonial.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TestimonialModel} from "../../../_shared/models/testimonial.model";
import Swal from "sweetalert2";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-testimonial',
  templateUrl: './add-testimonial.component.html',
  styleUrls: ['./add-testimonial.component.scss']
})
export class AddTestimonialComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private testimonialService: TestimonialService,
              private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService) {
  }

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
  testimonial: TestimonialModel = {} as TestimonialModel;

  @ViewChild(DropzoneComponent, {static: false}) componentRef?: DropzoneComponent;
  @ViewChild(DropzoneDirective, {static: false}) directiveRef?: DropzoneDirective;

  testimonialForm = this.formBuilder.group({
    name: ['', Validators.required],
    position: ['', Validators.required],
    description: ['', Validators.required],
    photo: ['']
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['testimonialId']) {
        this.edit = true;
        this.fillEditForm(params['testimonialId']);
      }
    });
  }

  public fillEditForm(testimonialId: string): void {
    this.testimonial = (JSON.parse(localStorage.getItem('portfolio')!).testimonials.filter((testimonial: TestimonialModel) => testimonial.id === testimonialId ))[0];
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

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files;
  }

  onSubmit() {
    this.spinner.show();
    if(!this.edit) {
      this.testimonialService.addOne(this.testimonialForm.value).subscribe((result) => {
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
      });
    } else {
      this.testimonialService.edit(this.testimonial.id, this.testimonialForm.value).subscribe(result => {
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
