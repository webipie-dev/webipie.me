import {Component, OnInit} from '@angular/core';
import {WorkExperienceService} from "../../../_shared/services/work-experience.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {WorkExperienceModel} from "../../../_shared/models/work-experience.model";

import { UploadService } from 'src/app/_shared/services/upload.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { TechnicalSkillModel } from 'src/app/_shared/models/technical-skill.model';
import { TechnicalSkillService } from 'src/app/_shared/services/technical-skill.service';

@Component({
  selector: 'app-add-experience',
  templateUrl: './add-experience.component.html',
  styleUrls: ['./add-experience.component.scss']
})
export class AddExperienceComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private workExperienceService: WorkExperienceService,
              private router: Router, private route: ActivatedRoute, private uploadService: UploadService, private spinner: NgxSpinnerService,
              private technicalSkillsService: TechnicalSkillService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
  }
  jobType?:string;
  check = false;
  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  bsRangeValue!: Date[];
  maxDate = new Date();
  checked(){
    if(this.check){
      this.check = false;
      this.workExperienceForm.controls['endDate'].enable();
    }else{
      this.check = true;
      this.workExperienceForm.controls['endDate'].disable();
    }
  }
  // check if we are editing a testimonial or adding a new one
  edit = false;
  workExperience: WorkExperienceModel = {} as WorkExperienceModel;
  beginDate : any;
  endDate: any;

  workExperienceForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    position: [''],
    company: [''],
    link: [''],
    img: [''],
    skills: [''],
    beginDate: ['', Validators.required],
    endDate: [''],
    city: ['']
  });

  skills: TechnicalSkillModel[] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['workId']) {
        this.edit = true;
        this.fillEditForm(params['workId']);
      }
    });
    this.technicalSkillsService.getMany().subscribe(result => {
      this.skills = result;
    });

  }

  public fillEditForm(workId: string): void {
    this.workExperience = (JSON.parse(localStorage.getItem('portfolio')!).workExperiences.filter((workExperience: WorkExperienceModel) => workExperience.id === workId ))[0];
    this.beginDate = new Date(this.workExperience.beginDate!);
    this.endDate = this.workExperience.endDate ? new Date(this.workExperience.endDate): undefined;
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

  selectJobType(type : string){
    this.jobType = type;
    this.workExperienceForm.controls['position'].setValue(type);
  }


  async onSubmit() {
    this.spinner.show();
    let formData = new FormData();
    let errors: any[] = [];
    console.log(errors);

    if(this.images[0]){
      let image
      formData.append("file", this.images[0]);
      try{
        image = await this.uploadService.imageUpload(formData);
        if(image.success)
          this.workExperienceForm.controls['img'].setValue(image.url);
        else
          errors.push('image' + image.errors.title);
      }
      catch(err){
        errors.push('image' + err.error.errors.title);
      }

    }

    if(!this.edit) {
      this.workExperienceService.addOne(this.workExperienceForm.value).subscribe((result) => {
        localStorage.setItem('portfolio', JSON.stringify(result.portfolio));
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
      this.workExperienceService.edit(this.workExperience.id, this.workExperienceForm.value).subscribe(result => {
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
