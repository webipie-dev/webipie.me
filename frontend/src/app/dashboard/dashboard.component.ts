import { Component, OnInit } from '@angular/core';
import { ThemeOptions } from '../_shared/theme-options';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public globals: ThemeOptions) { }

  ngOnInit(): void {
  }

}
