import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
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
    private portfolioService: PortfolioService) {
  }

  async ngOnInit(): Promise<void> {
    const id = localStorage.getItem('portfolioId') || "";
    try{
      let portfolio = await this.portfolioService.getById(id).toPromise()
      localStorage.setItem("portfolio", JSON.stringify(portfolio));
    }
    catch(err){
      Swal.fire({
        title: 'Error!',
        text: 'something went wrong when loading dashboard, please try again',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
    

  }

}
