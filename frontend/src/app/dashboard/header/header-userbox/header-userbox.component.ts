import {Component} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import {AuthService} from "../../../_shared/services/auth.service";
import { LocalStorageService } from 'src/app/_shared/services/local-storage.service';

@Component({
  selector: 'app-header-userbox',
  templateUrl: './header-userbox.component.html'
})
export class HeaderUserboxComponent {
  url?: string
  username!: string;
  position?: string;
  picture!: string;

  constructor(private router: Router, private authService: AuthService, private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.localStorageService.getItem("portfolio").subscribe(
      result => {
        let portfolio = JSON.parse(result);
        this.url = portfolio.url;
        this.position = portfolio.position;
        this.picture = portfolio.picture ?? 'assets/SVG/avatar.svg';
        if(!this.url){
          Swal.fire({
            title: 'Error!',
            text: 'something went wrong, please refresh',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
        this.username = portfolio.username;
      }
    )
    
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
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
