import {Component, OnInit} from '@angular/core';
import {VolunteeringExperienceService} from "../../../_shared/services/volunteering-experience.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {VolunteeringExperienceModel} from "../../../_shared/models/volunteering-experience.model";
import { UploadService } from 'src/app/_shared/services/upload.service';
import Swal from 'sweetalert2';

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
              private uploadService: UploadService) {
  }

  // check if we are editing a testimonial or adding a new one
  edit = false;
  volunteerExperience: VolunteeringExperienceModel = {} as VolunteeringExperienceModel;

  volunteeringExperienceForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    organisation: ['', Validators.required],
    position: [''],
    img: [''],
    skills: [''],
    beginDate: ['', Validators.required],
    endDate: [''],
    city: ['']
  });

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
    let formData = new FormData();

    if(this.images[0]){
      formData.append("file", this.images[0]);
      const image = await this.uploadService.imageUpload(formData);
      if(image.success) this.volunteeringExperienceForm.controls['img'].setValue(image.url);
    }

    if(!this.edit) {
      this.volunteeringExperienceService.addOne(this.volunteeringExperienceForm.value).subscribe((result) => {
        localStorage.setItem('portfolio', JSON.stringify(result.portfolio))
        this.router.navigate(['..'], {relativeTo: this.route}).then(r => console.log(r));
      }, (error) => {
        Swal.fire({
          title: 'Error!',
          text: error.error.errors[0].message || 'something went wrong with uploading data! Please retry again.',
          icon: 'error',
          confirmButtonText: 'Cool'
        });
      });
    } else {
      this.volunteeringExperienceService.edit(this.volunteerExperience.id, this.volunteeringExperienceForm.value).subscribe(result => {
        localStorage.setItem('portfolio', JSON.stringify(result.portfolio))
        this.router.navigate(['..'], {relativeTo: this.route}).then(r => console.log(r));
      }, (error) => {
        Swal.fire({
          title: 'Error!',
          text: error.error.errors[0].message || 'something went wrong with uploading data! Please retry again.',
          icon: 'error',
          confirmButtonText: 'Cool'
        });
      })
    }
  }

}
