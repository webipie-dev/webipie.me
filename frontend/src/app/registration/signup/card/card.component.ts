import { Component, OnInit } from '@angular/core';
import { faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import {ActivatedRoute, Router} from "@angular/router";
import { environment } from '../../../../environments/environment';
import {AuthService} from "../../../_shared/services/auth.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  delay=false;
  google=faGoogle;
  linkedin=faLinkedinIn;
  email: string = '';
  name = '';
  password = '';
  confirmPassword = '';
  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    //Delaying the card animation for a bit
    setInterval(()=>{
      this.delay=true;
    },100)
  }

  isValidForm(): boolean {
    return (this.email !== '' && this.name !== '' && this.password === this.confirmPassword && this.password !== '')
  }

  signUp(): void{
    this.authService.signUp({ name: this.name, email: this.email, password: this.password}).subscribe(res => {
      console.log(res);
      this.router.navigate(['../confirmation'], {
        relativeTo: this.route,
        queryParams: {email: this.email ?? 'webipie.me@gmail.com'}
      }).then(r => console.log(r))
    })
  }

  signUpWithLinkedin() {
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=true&client_id=${
      environment.LINKEDIN_API_KEY}&redirect_uri=${environment.LINKEDIN_REDIRECT_URL}&scope=r_liteprofile%20r_emailaddress`;
  }

  signUpWithGoogle() {

  }

}
