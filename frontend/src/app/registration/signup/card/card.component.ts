import { Component, OnInit } from '@angular/core';
import { faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import {ActivatedRoute, Router} from "@angular/router";
import { environment } from '../../../../environments/environment';
import {AuthService} from "../../../_shared/services/auth.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  delay=false;
  google=faGoogle;
  linkedin=faLinkedinIn;
  email?: string;
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    //Delaying the card animation for a bit
    setInterval(()=>{
      this.delay=true;
    },100)
  }

  signUp(): void{
    this.router.navigate(['../confirmation'], { relativeTo: this.route, queryParams: { email: this.email ?? 'webipie.me@gmail.com'}})
  }

  signUpWithLinkedin() {
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=true&client_id=${
      environment.LINKEDIN_API_KEY}&redirect_uri=${environment.LINKEDIN_REDIRECT_URL}&scope=r_liteprofile%20r_emailaddress`;
  }

  signUpWithGoogle() {

  }

}
