import {Component, OnInit} from '@angular/core';
import {WorkExperienceService} from "../../../_shared/services/work-experience.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {WorkExperienceModel} from "../../../_shared/models/work-experience.model";

import { UploadService } from 'src/app/_shared/services/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.scss']
})
export class AddExperienceComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private workExperienceService: WorkExperienceService,
              private router: Router, private route: ActivatedRoute, private uploadService: UploadService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
  }

  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  bsRangeValue!: Date[];
  maxDate = new Date();

  // check if we are editing a testimonial or adding a new one
  edit = false;
  workExperience: WorkExperienceModel = {} as WorkExperienceModel;


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
      if(image.success) this.workExperienceForm.controls['imgs'].setValue(image.url);
    }

    if(!this.edit) {
      this.workExperienceService.addOne(this.workExperienceForm.value).subscribe((result) => {
        localStorage.setItem('portfolio', JSON.stringify(result.portfolio))
        this.router.navigate(['..'], {relativeTo: this.route}).then(r => console.log(r));
      }, (error) => {
        Swal.fire({
          title: 'Error!',
          text: error.error.errors[0].message || 'something went wrong with uploading data! Please retry again.',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      });
    } else {
      this.workExperienceService.edit(this.workExperience.id, this.workExperienceForm.value).subscribe(result => {
        localStorage.setItem('portfolio', JSON.stringify(result.portfolio))
        this.router.navigate(['..'], {relativeTo: this.route}).then(r => console.log(r));
      }, (error) => {
        Swal.fire({
          title: 'Error!',
          text: error.error.errors[0].message || 'something went wrong with uploading data! Please retry again.',
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      })
    }
  }

}
