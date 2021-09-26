import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioService } from 'src/app/_shared/services/portfolio.service';
import { nameValidator } from 'src/app/_shared/utils/forbidden-name-validator';
import Swal from "sweetalert2";import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-choose-name',
  templateUrl: './choose-name.component.html',
  styleUrls: ['./choose-name.component.scss']
})
export class ChooseNameComponent implements OnInit {

  portfolioName: string = '';
  names: string[] = [];
  nameForm = this.formBuilder.group({
    name: ['',[Validators.required, Validators.min(3), nameValidator()]],
  });

  constructor(
    private portfolioService: PortfolioService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.portfolioService.getPortfolioNames().subscribe(
      result => {
        this.names = result;
      },
      error =>{
        Swal.fire({
          title: 'Error!',
          text: 'cannot get portfolio names! Please refresh page.',
          icon: 'error',
          confirmButtonText: 'Cool',
          footer: '<a href="/dashboard/support-request">Contact Support</a>'   
        });
      }
    )
  }

  submit(){
    this.spinner.show();
    const templateId = this.route.snapshot.queryParamMap.get('templateId');
    this.portfolioService.addOne({templateId, name: this.portfolioName}).subscribe(
      result => {
        this.spinner.hide();
        localStorage.setItem('portfolioId', result['id']);
        this.router.navigate(['/dashboard', 'home']);
      }, 
      error => {
        this.spinner.hide();
        Swal.fire({
          title: 'Error!',
          text: error.error.errors[0].message || "Something went wrong! Please try again.",
          icon: 'error',
          confirmButtonText: 'Okay'
        });
      }
    );
  }

}