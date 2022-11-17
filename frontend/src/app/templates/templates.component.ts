import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../_shared/services/auth.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {
  arrowright = faArrowAltCircleRight;
  arrowleft = faArrowAltCircleLeft;
  positionY = 0;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isVerified().subscribe((res)=>{
      if(!res.consent){
        this.router.navigate(["/register/give-consent"])
      }
    })
  }
  rightArrow(el:HTMLElement){
    this.positionY += el.offsetWidth;
  }
  leftArrow(el:HTMLElement){
    this.positionY -= el.offsetWidth;
  }

}
