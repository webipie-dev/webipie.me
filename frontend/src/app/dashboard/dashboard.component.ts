import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../_shared/services/portfolio.service';
import { ThemeOptions } from '../_shared/theme-options';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    public globals: ThemeOptions,
    private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    const id = localStorage.getItem('portfolioId') || "";
    this.portfolioService.getById(id).subscribe(
      result => {
        localStorage.setItem("portfolio", JSON.stringify(result));
      }
    );
  }

}
