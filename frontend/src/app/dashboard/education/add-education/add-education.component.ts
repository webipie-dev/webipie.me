import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {EducationService} from "../../../_shared/services/education.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import { NgxSpinnerService } from 'ngx-spinner';
import { EducationModel } from 'src/app/_shared/models/education.model';

@Component({
  selector: 'app-add-education',
  templateUrl: './add-education.component.html',
  styleUrls: ['./add-education.component.scss']
})
export class AddEducationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private educationService: EducationService,
              private router: Router, private route: ActivatedRoute, private spinner: NgxSpinnerService) {
  }


  educationForm = this.formBuilder.group({
    title: ['', Validators.required],
    level: ['', Validators.required],
    beginDate: ['', Validators.required],
    endDate: [''],
    city: ['']
  });

  edit = false;
  education: EducationModel = {} as EducationModel;
  beginDate : any;
  endDate : any;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params['educationId']) {
        this.edit = true;
        this.fillEditForm(params['educationId']);
      }
    });
  }

  public fillEditForm(educationId: string): void {
    this.education = (JSON.parse(localStorage.getItem('portfolio')!).education.filter((education: EducationModel) => education.id === educationId ))[0];
    this.beginDate = new Date(this.education.beginDate!);
    this.endDate = this.education.endDate ? new Date(this.education.endDate): undefined;
  }

  onSubmit() {
    this.spinner.show();
    if(! this.edit){
      this.educationService.addOne(this.educationForm.value).subscribe((result) => {
        localStorage.setItem('portfolio', JSON.stringify(result.portfolio));
        this.spinner.hide();
        this.router.navigate(['..'], {relativeTo: this.route}).then(r => console.log(r))
      }, error => {
        this.spinner.hide();
        Swal.fire({
          title: 'Error!',
          text: error.error.errors[0].message || "Something went wrong! Please try again.",
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      });
    }else {
      this.educationService.edit(this.education.id, this.educationForm.value).subscribe(result =>{
        localStorage.setItem('portfolio', JSON.stringify(result.portfolio));
        this.spinner.hide();
        this.router.navigate(['..'], {relativeTo: this.route}).then(r => console.log(r));
      }, error => {
        this.spinner.hide();
        Swal.fire({
          title: 'Error!',
          text: error.error.errors[0].message || "Something went wrong! Please try again.",
          icon: 'error',
          confirmButtonText: 'Okay',
          footer: '<a href="/dashboard/support-request">Contact Support</a>'
        });
      })
    }

  }
}
