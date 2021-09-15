import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleRight, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from "../../_shared/services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuu = faBars;
  leftarrow = faTimes;
  rightArrow = faAngleRight;
  menuactive = false;
  scrolled = false;
  logged = this.isLoggedIn();
  @Output() aboutusEmitter = new EventEmitter<any>();
  @Output() indexEmitter = new EventEmitter<any>();
  @Output() contactusEmitter = new EventEmitter<any>();
  @Output() pricingEmitter = new EventEmitter<any>();
  constructor(private router : Router, private authService: AuthService) { }


  ngOnInit(): void {
    if(this.router.url != '/'){
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
      if(window.pageYOffset > 100){
        this.scrolled=true;
      }else{
        this.scrolled=false;
      }
    }

  isLoggedIn() {
    return this.authService.isLoggedIn()
  }
  click(target:any,event:any){
    if(target === "aboutus") this.aboutusEmitter.emit(event);
    if(target === "index") this.indexEmitter.emit(event);
    if(target === "pricing") this.pricingEmitter.emit(event);
    if(target === "contactus") this.contactusEmitter.emit(event);
  }
}
