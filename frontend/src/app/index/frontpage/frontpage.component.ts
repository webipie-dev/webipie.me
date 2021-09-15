import { Component, HostListener, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { faMouse } from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss'],
})
export class FrontpageComponent implements OnInit {
  mouse = faMouse;
  class = '';
  constructor(private renderer:Renderer2, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  onIntersection(){
    this.class = 'active';
  }

  getStarted() {
    /**
     * if logged in and has portfolio, redirect to dashboard
     * if logged in and no portfolio, redirect to choose template
     * if not logged in, redirect to signup
     */
    const navigateTo = localStorage.getItem('token') ? (localStorage.getItem('portfolio') ? '/dashboard' : '/templates/choose-template') : '/register/signup'
    this.router.navigate([navigateTo]);
  }
}
