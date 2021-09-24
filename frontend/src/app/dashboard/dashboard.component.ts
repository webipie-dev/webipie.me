import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LocalStorageService } from '../_shared/services/local-storage.service';
import {PortfolioService} from '../_shared/services/portfolio.service';
import {ThemeOptions} from '../_shared/theme-options';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    public globals: ThemeOptions,
    private router: Router,
    private portfolioService: PortfolioService,
    private localStorageService: LocalStorageService) {
  }

  async ngOnInit(): Promise<void> {
    const id = localStorage.getItem('portfolioId') || "";
    try{
      let portfolio = await this.portfolioService.getById(id).toPromise()
      if (!portfolio.template){
        this.router.navigate(['templates/choose-template']);
      }
      //localStorage.setItem("portfolio", JSON.stringify(portfolio));
      this.localStorageService.setItem("portfolio", JSON.stringify(portfolio));
      console.log(localStorage.getItem("portfolio"));
      console.log("Terminate loading .....")
    }
    catch(err){
      Swal.fire({
        title: 'Error!',
        text: 'something went wrong when loading dashboard, please try again',
        icon: 'error',
        confirmButtonText: 'Ok',
        footer: '<a href="/dashboard/support-request">Contact Support</a>'
      }).then((result) => {
        this.router.navigate(['/']);
      })
    }
  }
}
