import { Component, OnInit } from '@angular/core';
import { faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-card-signin',
  templateUrl: './card-signin.component.html',
  styleUrls: ['./card-signin.component.scss']
})
export class CardSigninComponent implements OnInit {

  delay=false;
  google=faGoogle;
  linkedin=faLinkedinIn
  email: string = '';
  password: string = '';
  constructor() { }

  ngOnInit(): void {
    //Delaying the card animation for a bit
    setInterval(()=>{
      this.delay=true;
    },100)
  }

  isValidForm(): boolean {
    return this.email !== '' && this.password !== '';
  }

  signinWithLinkedin(): void {
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=true&client_id=${
      environment.LINKEDIN_API_KEY}&redirect_uri=${environment.LINKEDIN_REDIRECT_URL}&scope=r_liteprofile%20r_emailaddress`;
  }

  signIn() {
    console.log('not so much disabled')
  }
}
