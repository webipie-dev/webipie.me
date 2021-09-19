import { Component, OnInit } from '@angular/core';
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
  scrolled = true;
  logged = this.isLoggedIn();
  username?: string;
  picture?: string = 'assets/SVG/avatar.svg';

  constructor(private router : Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.getUsername();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn()
  }

  onMenuClick(event:any){
    if(!this.menuactive){
      this.menuactive = true;
    }else{
      this.menuactive = false;
    }
  }

  getUsername() {
    this.authService.getUserName().subscribe(result => {
      this.username = result.name;
    });
  }
}
