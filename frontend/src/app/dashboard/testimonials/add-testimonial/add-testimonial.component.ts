import {Component, OnInit, ViewChild} from '@angular/core';
import {DropzoneComponent, DropzoneConfigInterface, DropzoneDirective} from 'ngx-dropzone-wrapper';
import {FormBuilder, Validators} from "@angular/forms";
import {TestimonialService} from "../../../_shared/services/testimonial.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TestimonialModel} from "../../../_shared/models/testimonial.model";
import Swal from "sweetalert2";
import { NgxSpinnerService } from 'ngx-spinner';
import { UploadService } from 'src/app/_shared/services/upload.service';

@Component({
  selector: 'app-add-testimonial',
  templateUrl: './add-testimonial.component.html',
  styleUrls: ['./add-testimonial.component.scss']
})
export class AddTestimonialComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private testimonialService: TestimonialService, private uploadService: UploadService,
              private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService) {
  }

  // check if we are editing a testimonial or adding a new one
  edit = false;
  testimonial: TestimonialModel = {} as TestimonialModel;

  testimonialForm = this.formBuilder.group({
    name: ['', Validators.required],
    position: ['', Validators.required],
    description: ['', [Validators.required,Validators.maxLength(300)]],
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

  async onSubmit() {
    this.spinner.show();
    let formData = new FormData();
    let errors: any[] = [];

    if(this.images[0]){
      let image
      formData.append("file", this.images[0]);
      try{
        image = await this.uploadService.imageUpload(formData);
        if(image.success) 
          this.testimonialForm.controls['photo'].setValue(image.url);
        else
          errors.push('image' + image.errors.title);
      }
      catch(err){
        console.log(err);
        errors.push('image' + err.error.errors.title);
      }

    }

    if(!this.edit) {
      this.testimonialService.addOne(this.testimonialForm.value).subscribe((result) => {
        localStorage.setItem('portfolio', JSON.stringify(result.portfolio));
        this.spinner.hide();
        if(errors.length>0)
          Swal.fire({
            title: 'Infos updated but some uploads failed',
            text: errors.join('\n'),
            icon: 'warning',
            confirmButtonText: 'Ok'
          });
        else
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
        if(errors.length>0)
          Swal.fire({
            title: 'Infos updated but some uploads failed',
            text: errors.join('\n'),
            icon: 'warning',
            confirmButtonText: 'Ok'
          });
        else
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
