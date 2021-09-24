import {Component, OnInit} from '@angular/core';
import {VolunteeringExperienceService} from "../../../_shared/services/volunteering-experience.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {VolunteeringExperienceModel} from "../../../_shared/models/volunteering-experience.model";
import { UploadService } from 'src/app/_shared/services/upload.service';

import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-volunteer',
  templateUrl: './add-volunteer.component.html',
  styleUrls: ['./add-volunteer.component.scss']
})
export class AddVolunteerComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private volunteeringExperienceService: VolunteeringExperienceService,
              private router: Router,
              private route: ActivatedRoute,
              private uploadService: UploadService,
              private spinner: NgxSpinnerService) {
  }

  // check if we are editing a testimonial or adding a new one
  edit = false;
  check = false;
  volunteerExperience: VolunteeringExperienceModel = {} as VolunteeringExperienceModel;
  beginDate : any;
  endDate: any;

  volunteeringExperienceForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', [Validators.required,Validators.maxLength(300)]],
    organisation: ['', Validators.required],
    position: [''],
    img: [''],
    skills: [''],
    beginDate: ['', Validators.required],
    endDate: [''],
    city: ['']
  });

  checked(){
    if(this.check){
      this.check = false;
      this.volunteeringExperienceForm.controls['endDate'].enable();
    }else{
      this.check = true;
      this.volunteeringExperienceForm.controls['endDate'].disable();
    }
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['volunteerId']) {
        this.edit = true;
        this.fillEditForm(params['volunteerId']);
      }
    });
  }

  public fillEditForm(volunteerId: string): void {
    this.volunteerExperience = (JSON.parse(localStorage.getItem('portfolio')!).volunteeringExperiences.filter((volunteer: VolunteeringExperienceModel) => volunteer.id === volunteerId ))[0];
    this.beginDate = new Date(this.volunteerExperience.beginDate!);
    this.endDate = this.volunteerExperience ? new Date(this.volunteerExperience.endDate): undefined;
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
          this.volunteeringExperienceForm.controls['img'].setValue(image.url);
        else
          errors.push('image' + image.errors.title);
      }
      catch(err){
        errors.push('image' + err.error.errors.title);
      }

    }

    if(!this.edit) {
      this.volunteeringExperienceService.addOne(this.volunteeringExperienceForm.value).subscribe((result) => {
        localStorage.setItem('portfolio', JSON.stringify(result.portfolio))
        this.spinner.hide();
        if(errors.length>0)
          Swal.fire({
            title: 'Infos updated but some uploads failed',
            text: errors.join('\n'),
            icon: 'warning',
            confirmButtonText: 'Ok',
            footer: '<a href="/dashboard/support-request">Contact Support</a>'
          });
        else
          this.router.navigate(['..'], {relativeTo: this.route}).then(r => console.log(r));
      }, (error) => {
        this.spinner.hide();
        Swal.fire({
          title: 'Error!',
          text: error.error.errors[0].message || 'something went wrong with uploading data! Please retry again.',
          icon: 'error',
          confirmButtonText: 'Okay',
          footer: '<a href="/dashboard/support-request">Contact Support</a>'
        });
      });
    } else {
      this.volunteeringExperienceService.edit(this.volunteerExperience.id, this.volunteeringExperienceForm.value).subscribe(result => {
        localStorage.setItem('portfolio', JSON.stringify(result.portfolio))
        this.spinner.hide()
        if(errors.length>0)
          Swal.fire({
            title: 'Infos updated but some uploads failed',
            text: errors.join('\n'),
            icon: 'warning',
            confirmButtonText: 'Ok',
            footer: '<a href="/dashboard/support-request">Contact Support</a>'
          });
        else
          this.router.navigate(['..'], {relativeTo: this.route}).then(r => console.log(r));
      }, (error) => {
        this.spinner.hide();
        Swal.fire({
          title: 'Error!',
          text: error.error.errors[0].message || 'something went wrong with uploading data! Please retry again.',
          icon: 'error',
          confirmButtonText: 'Okay',
          footer: '<a href="/dashboard/support-request">Contact Support</a>'
        });
      })
    }
  }

}
