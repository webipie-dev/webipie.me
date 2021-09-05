import {Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PortfolioModel } from 'src/app/_shared/models/portfolio.model';
import { PortfolioService } from 'src/app/_shared/services/portfolio.service';
import { UploadService } from 'src/app/_shared/services/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-general-infos',
  templateUrl: './general-infos.component.html',
  styleUrls: ['./general-infos.component.scss']
})
export class GeneralInfosComponent implements OnInit {

  portfolio : PortfolioModel = {} as PortfolioModel;
  portfolioForm = this.formBuilder.group({
    name: [''],
    position: [''],
    email: [''],
    phone: [''],
    github: [''],
    linkedin: [''],
    picture: [''],
    cv: [''],
    aboutme: ['']
  });


  constructor(private portfolioService: PortfolioService,
    private formBuilder: FormBuilder,
    private uploadService: UploadService) {}

  ngOnInit(): void {
    this.portfolio = JSON.parse(localStorage.getItem('portfolio')!);
  }

  pictures: File[] = [];

  onSelectPicture(event: any) {
    this.pictures = [];
    this.pictures.push(...event.addedFiles);
    console.log(this.pictures);
  }

  onRemovePicture(event: any) {
    console.log(event);
    this.pictures.splice(this.pictures.indexOf(event), 1);
  }

  files: File[] = [];

  onSelectCV(event: any) {
    console.log(event);
    this.files = [];
    this.files.push(...event.addedFiles);
  }

  onRemoveCV(event: any) {
    console.log(event);
    this.files.splice(this.pictures.indexOf(event), 1);
  }

  async onSubmit() { 
    let formData = new FormData();

    if(this.pictures[0]){
      formData.append("file", this.pictures[0]);
      const picture = await this.uploadService.imageUpload(formData);
      if(picture.success) this.portfolioForm.controls['picture'].setValue(picture.url);
    }
    
    if(this.files[0]){
      formData = new FormData();
      formData.append("file", this.pictures[0]);
      const cv = await this.uploadService.imageUpload(formData);
      if(cv.success) this.portfolioForm.controls['cv'].setValue(cv.url);
    }    

    this.portfolioService.edit(this.portfolio.id,this.portfolioForm.value).subscribe((result) => {

      localStorage.setItem('portfolio', JSON.stringify(result));

      console.log(JSON.stringify(result));
    }, (error) => {
      Swal.fire({
        title: 'Error!',
        text: 'something went wrong with uploading data! Please retry again.',
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    });
  }

}
