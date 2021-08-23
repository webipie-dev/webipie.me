import {Component} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-userbox',
  templateUrl: './header-userbox.component.html'
})
export class HeaderUserboxComponent {

  constructor(private router: Router) {
  }

  openSite() {
    const url = JSON.parse(localStorage.getItem('portfolio')!).url + environment.PORT;
    window.open('//' + 'google.com', '_blank');
  }

  changeTemplate() {
    this.router.navigate(['/templates/choose-template']);
  }

}
