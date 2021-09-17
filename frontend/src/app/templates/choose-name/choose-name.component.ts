import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioService } from 'src/app/_shared/services/portfolio.service';
import { nameValidator } from 'src/app/_shared/utils/forbidden-name-validator';
import Swal from "sweetalert2";

@Component({
  selector: 'app-choose-name',
  templateUrl: './choose-name.component.html',
  styleUrls: ['./choose-name.component.scss']
})
export class ChooseNameComponent implements OnInit {

  portfolioName: string = '';
  names: string[] = [];
  nameForm = this.formBuilder.group({
    name: ['',[Validators.required, Validators.min(5), nameValidator()]],
  });

  constructor(
    private portfolioService: PortfolioService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.portfolioService.getPortfolioNames().subscribe(
      result => {
        this.names = result;
      },
      error =>{
        Swal.fire({
          title: 'Error!',
          text: 'Connat get portfolio names! Please refresh page.',
          icon: 'error',
          confirmButtonText: 'Cool'   
        });
      }
    )
  }

  submit(){
    const templateId = this.route.snapshot.queryParamMap.get('templateId');
    console.log(templateId);
    this.portfolioService.addOne({templateId, name: this.portfolioName}).subscribe(
      result => {
        localStorage.setItem('portfolioId', result['id']);
        this.router.navigate(['dashboard']);
      }
    );
  }

}