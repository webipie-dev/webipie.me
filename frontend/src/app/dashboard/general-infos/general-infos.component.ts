import {Component, OnChanges, OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PortfolioModel } from 'src/app/_shared/models/portfolio.model';
import { PortfolioService } from 'src/app/_shared/services/portfolio.service';
import { UploadService } from 'src/app/_shared/services/upload.service';
import { NgxSpinnerService } from "ngx-spinner";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-general-infos',
  templateUrl: './general-infos.component.html',
  styleUrls: ['./general-infos.component.scss']
})
export class GeneralInfosComponent implements OnInit {

  portfolio : PortfolioModel = {} as PortfolioModel;
  portfolioForm = this.formBuilder.group({
    name: ['',Validators.required],
    position: ['',Validators.required],
    email: ['',[Validators.required,Validators.email]],
    phoneNumber: ['',Validators.required],
    github: [''],
    linkedIn: [''],
    picture: [''],
    CV: [''],
    description: ['',[Validators.minLength(20),Validators.required,Validators.maxLength(300)]]
  });
  submitted = false;

  constructor(private portfolioService: PortfolioService,
    private formBuilder: FormBuilder,
    private uploadService: UploadService,
    private spinner: NgxSpinnerService) {}
    
  ngOnInit(): void {
    this.portfolio = JSON.parse(localStorage.getItem('portfolio')!);
  }
  // ease access to form fields :
    get f() {
      return this.portfolioForm.controls
    }
  // ---------------------------
  pictures: File[] = [];
  disabled: boolean = false;

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

  cleanBody(body: any){
    for (var propName in body) {
      if (!body[propName]) {
        delete body[propName];
      }
    }
    return body
  }

  async onSubmit() {
    this.submitted = true;
    this.disabled = true;
    this.spinner.show();
    let formData = new FormData();
    let errors: any[] = []

    if(this.pictures[0]){
      formData.append("file", this.pictures[0]);
      let picture;
      try{
        picture = await this.uploadService.imageUpload(formData);
        if(picture.success)
          this.portfolioForm.controls['picture'].setValue(picture.url);
        else
          errors.push('picture' + picture.errors.title);
      }
      catch(err){
        errors.push('picture' + err.error.errors.title);
      }
    }
    
    if(this.files[0]){
      formData = new FormData();
      formData.append("file", this.files[0]);
      let cv;
      try{
        cv = await this.uploadService.cvUpload(formData);
        if(cv.success)
          this.portfolioForm.controls['CV'].setValue(cv.url);
        else
          errors.push('cv' + cv.errors.title);
      }
      catch(err){
        errors.push('cv' + err.error.errors.title);
      }
    }    
    let body = this.portfolioForm.value;
    body = this.cleanBody(body);
    this.portfolioService.edit(this.portfolio.id,this.portfolioForm.value).subscribe((result) => {

      localStorage.setItem('portfolio', JSON.stringify(result));

      if(errors.length>0)
        Swal.fire({
          title: 'Infos updated but some uploads failed',
          text: errors.join('\n'),
          icon: 'warning',
          confirmButtonText: 'Ok'
        });
      else
      Swal.fire({
        title: 'Operation successful',
        text: 'Infos updated successfully',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      this.disabled = false;
      this.spinner.hide();
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
