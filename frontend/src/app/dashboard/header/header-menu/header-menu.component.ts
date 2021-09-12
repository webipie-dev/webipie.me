import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html'
})
export class HeaderMenuComponent implements OnInit {
  url?: string


  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.url = JSON.parse(localStorage.getItem('portfolio')!).url;
    if(!this.url){
      Swal.fire({
        title: 'Error!',
        text: 'something went wrong, please refresh',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
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
