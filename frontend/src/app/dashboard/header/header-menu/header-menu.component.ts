import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import {JoyrideService} from "ngx-joyride";

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html'
})
export class HeaderMenuComponent implements OnInit {
  url?: string


  constructor(private router: Router, private joyride: JoyrideService) {
  }

  ngOnInit() {
    this.url = JSON.parse(localStorage.getItem('portfolio')!).url;
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

  tour() {
    this.joyride.startTour({
      steps: ['tourStep1'],
      themeColor: '#070919'
    })
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
