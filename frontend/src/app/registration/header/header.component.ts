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
  scrolled = false;
  constructor(private router : Router) { }

  ngOnInit(): void {
    if(this.router.url === '/register'){
      this.scrolled=true;
    }
    if(this.router.url === '/register/choose-template'){
      this.scrolled=true;
    }
  }
  onMenuClick(event:any){
    if(!this.menuactive){
      this.menuactive = true;
    }else{
      this.menuactive = false;
    }
  }
  @HostListener('window:scroll', ['$event']) 
    doSomething(event:any) {
      if(this.router.url !== '/register/choose-template'){
        if(window.pageYOffset > 100 ){
          this.scrolled=true;
        }else{
          this.scrolled=false;
        }
      }
      
    }
}
