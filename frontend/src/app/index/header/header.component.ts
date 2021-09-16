import { Component, HostListener, OnInit } from '@angular/core';
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
  username?: string;
  picture: string = 'assets/SVG/avatar.svg';

  constructor(private router : Router, private authService: AuthService) { }


  ngOnInit(): void {
    if(this.router.url != '/'){
      this.scrolled=true;
    }
    if(this.isLoggedIn()) {
      this.getUsername();
    }
    if(localStorage.getItem('portfolio') &&  JSON.parse(localStorage.getItem('portfolio')!).picture) {
      this.picture = JSON.parse(localStorage.getItem('portfolio')!).picture;
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

  getUsername() {
    if(JSON.parse(localStorage.getItem('portfolio')!).username) {
      this.username = JSON.parse(localStorage.getItem('portfolio')!).username;
    } else {
      this.authService.getUserName().subscribe(result => {
        this.username = result.name;
      });
    }
  }
}
