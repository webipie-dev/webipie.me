import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleRight, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

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
  constructor(private router : Router) { }

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
}
