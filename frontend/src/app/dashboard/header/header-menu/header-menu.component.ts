import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import {JoyrideService} from "ngx-joyride";
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';
import {AuthService} from "../../../_shared/services/auth.service";

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html'
})
export class HeaderMenuComponent implements OnInit {
  url?: string
  loading = true;

  constructor(private router: Router,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.localStorageService.getItem("portfolio").subscribe(
      result => {
        this.loading = false;
        let portfolio = JSON.parse(result);
        this.url = portfolio.url;
        if(!this.url){
          Swal.fire({
            title: 'Error!',
            text: 'something went wrong, please refresh',
            icon: 'error',
            confirmButtonText: 'Ok',
            footer: '<a href="/dashboard/support-request">Contact Support</a>'
          });
        }
      }
    )
  }

  openSite() {
    if(this.url){
      let url = `${environment.protocol}://${this.url}${environment.PORT}`;
      window.open(url, '_blank');
    }
  }

  changeTemplate() {
    this.router.navigate(['/templates/choose-template']);
  }
}
