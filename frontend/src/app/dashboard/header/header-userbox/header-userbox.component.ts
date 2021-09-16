import {Component} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import {AuthService} from "../../../_shared/services/auth.service";

@Component({
  selector: 'app-header-userbox',
  templateUrl: './header-userbox.component.html'
})
export class HeaderUserboxComponent {
  url?: string
  username!: string;
  position?: string;
  picture!: string;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.url = JSON.parse(localStorage.getItem('portfolio')!).url;
    this.position = JSON.parse(localStorage.getItem('portfolio')!).position;
    this.picture = JSON.parse(localStorage.getItem('portfolio')!).picture ?? 'assets/SVG/avatar.svg';
    if(!this.url){
      Swal.fire({
        title: 'Error!',
        text: 'something went wrong, please refresh',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
    this.getUsername();
  }

  getUsername() {
    this.username = JSON.parse(localStorage.getItem('portfolio')!).username;
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
  logOut(){

  }
}
