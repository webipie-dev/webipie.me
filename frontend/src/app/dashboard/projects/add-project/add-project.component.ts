import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ProjectService} from "../../../_shared/services/project.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectModel} from "../../../_shared/models/project.model";
import Swal from "sweetalert2";
import { NgxSpinnerService } from 'ngx-spinner';
import { UploadService } from 'src/app/_shared/services/upload.service';
import { TechnicalSkillModel } from 'src/app/_shared/models/technical-skill.model';
import { TechnicalSkillService } from 'src/app/_shared/services/technical-skill.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private projectService: ProjectService, private uploadService: UploadService,
              private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService,
              private technicalSkillsService: TechnicalSkillService) {
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];
  }

  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  bsRangeValue!: Date[];
  maxDate = new Date();

  // check if we are editing a project or adding a new one
  edit = false;
  project: ProjectModel = {} as ProjectModel;

  projectForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    github: [],
    imgs: [],
    video: [],
    link: [],
    skills: [],
  })
  skills: TechnicalSkillModel[] = [];
  selectedSkills = [];
  deletedImages: any = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['projectId']) {
        this.edit = true;
        this.fillEditForm(params['projectId']);
      }
    });
    this.technicalSkillsService.getMany().subscribe(result => {
      this.skills = result;
    });
  }

  public fillEditForm(projectId: string): void {
    this.project = (JSON.parse(localStorage.getItem('portfolio')!).projects.filter((project: ProjectModel) => project.id === projectId))[0];
  }

  images: File[] = [];

  onSelectImage(event: any) {
    this.images.push(...event.addedFiles);
  }

  onRemoveImage(event: any) {
    this.images.splice(this.images.indexOf(event), 1);
  }

  videos: File[] = [];

  onSelectVideo(event: any) {
    this.videos = []
    this.videos.push(...event.addedFiles);
  }

  onRemoveVideo(event: any) {
    this.videos.splice(this.images.indexOf(event), 1);
  }

  processForm(){
    this.projectForm.value.skills = this.projectForm.value.skills.map((skill: any) =>{
      if (skill.label)
        return skill.label;
      else
        return skill;
    })
  }

  removeImage(event: any, image: any){
    this.project.imgs = this.project.imgs ? this.project.imgs?.filter(o => o!== image): [];
    this.deletedImages.push(image);
    event.preventDefault();
  }




  async onSubmit() {
    this.spinner.show();
    let formData = new FormData();
    let errors: any[] = []

    if(this.images[0]){
      this.images.forEach(value => formData.append('file', value));
      let images;
      try{
        images = await this.uploadService.imageMultipleUpload(formData);
        console.log(images);
        if(images.success)
          this.projectForm.controls['imgs'].setValue(images.urls);
        else
          errors.push('image' + images.errors.title);
      }
      catch(err){
        errors.push('image' + err.error.errors.title);
      }
    }

    if(this.videos[0]){
      formData = new FormData();
      formData.append("file", this.videos[0]);
      let video;
      try{
        video = await this.uploadService.videoUpload(formData);
        if(video.success)
          this.projectForm.controls['video'].setValue(video.url);
        else
          errors.push('video' + video.errors.title);
      }
      catch(err){
        errors.push('video' + err.error.errors.title);
      }
    }

    if(this.projectForm.value.skills){this.processForm()}
    if(!this.edit) {
      console.log(this.projectForm.value)
      this.projectService.addOne(this.projectForm.value).subscribe((result) => {
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
      }, error => {
        this.spinner.hide();
        Swal.fire({
          title: 'Error!',
          text: error.error.errors[0].message,
          icon: 'error',
          confirmButtonText: 'Okay',
          footer: '<a href="/dashboard/support-request">Contact Support</a>'
        });
      })
    } else {
      if(this.deletedImages.length > 0) this.projectForm.value.deletedImages = this.deletedImages;
      this.projectService.edit(this.project.id, this.projectForm.value).subscribe(result => {
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
      }, error => {
        this.spinner.hide();
        Swal.fire({
          title: 'Error!',
          text: error.error.errors[0].message,
          icon: 'error',
          confirmButtonText: 'Okay',
          footer: '<a href="/dashboard/support-request">Contact Support</a>'
        });
      })
    }
  }
}
