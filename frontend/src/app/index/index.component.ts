import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { faMouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  mouse = faMouse;
  class = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  scroll(el:HTMLElement){
    el.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
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
