import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../_shared/services/auth.service";

@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.component.html',
  styleUrls: ['./price-card.component.scss'],
})
export class PriceCardComponent implements OnInit {
  @Input() class : String = '';
  title:String='';
  cost:String='';
  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    if(this.class =="cardd primary"){
      this.title='Free Pack';
      this.cost='Free';
    } else {
      this.title='Free Pack';
      this.cost='Free';
    }
  }

  clicked() {
    if(this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard/home'])
    } else {
      this.router.navigate(['/register/signup'])
    }
  }
}
