import {Component, HostListener, Input, OnInit} from '@angular/core';
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
  portfolio?: any = null;
  username?: string;
  logged = this.isLoggedIn();

  constructor(private router : Router, private authService: AuthService) { }

  ngOnInit(): void {
    if(this.router.url === '/register/choose-template' || this.router.url === '/register/linkedin-verif'){
      this.scrolled=true;
    }
    this.portfolio = localStorage.getItem('portfolio')
    if(this.isLoggedIn()) {
      this.getUsername();
    }
  }

  hide(){
    this.menuactive = false;
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
      if(this.router.url != '/register/choose-template'){
        if(window.pageYOffset > 100 ){
          this.scrolled=true;
        }else{
          this.scrolled=false;
        }
      }

    }

  isLoggedIn() {
    return this.authService.isLoggedIn()
  }

  getUsername() {
    this.authService.getUserName().subscribe(result => {
      this.username = result.name;
    });
  }

  logOut(){
    this.authService.logout();
    this.logged = this.isLoggedIn();
    this.router.navigate(['/']);
  }
}
