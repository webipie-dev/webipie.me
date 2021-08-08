import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html'
})
export class HeaderMenuComponent implements OnInit {


  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  openSite() {
    const url = JSON.parse(localStorage.getItem('portfolio')!).url + environment.PORT;
    window.open('//' + 'google.com', '_blank');
  }

  changeTemplate() {
    this.router.navigate(['/templates/choose-template']);
  }
}
