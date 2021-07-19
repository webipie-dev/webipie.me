import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { faAddressCard, faArrowLeft, faBars, faHome, faMoneyBill, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menu = faBars;
  home = faHome;
  aboutus = faAddressCard;
  contactus = faPhoneAlt;
  pricing = faMoneyBill;
  leftarrow = faArrowLeft;
  menuactive = false;
  scrolled = true;
  constructor(private router : Router) { }

  ngOnInit(): void {
    
  }
  onMenuClick(event:any){
    if(!this.menuactive){
      this.menuactive = true;
    }else{
      this.menuactive = false;
    }
  }
}
