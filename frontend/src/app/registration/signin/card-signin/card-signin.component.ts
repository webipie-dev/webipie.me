import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from 'src/app/_shared/services/auth.service';
import {environment} from "../../../../environments/environment";
import Swal from 'sweetalert2';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from 'angularx-social-login';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-card-signin',
  templateUrl: './card-signin.component.html',
  styleUrls: ['./card-signin.component.scss']
})
export class CardSigninComponent implements OnInit {

  delay=false;
  google=faGoogle;
  linkedin=faLinkedinIn;
  email: string = '';
  password: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private authSocial: SocialAuthService,
    private spinner: NgxSpinnerService) { }

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
    this.spinner.show();
    this.authService.signIn({ email: this.email, password: this.password}).subscribe(result => {
      localStorage.setItem('token', result['token']);
      this.spinner.hide();
      if(result['verified']){
        if (result['portfolioId']){
          localStorage.setItem('portfolioId',result['portfolioId']);
          this.router.navigate(['/dashboard/home']);
        }
        else{
          this.router.navigate(['templates/choose-template']);
        }
      }else{
        this.router.navigate(['/register/confirmation']);
      }

    }, error => {
      this.spinner.hide();
      Swal.fire({
        title: 'Error!',
        text: 'email or/and password are incorrect!',
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    })
  }

  signInWithGoogle(): void {
    this.authSocial.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(x => {
      console.log(x);
      this.authService.signInWithGoogle(x['idToken'])
        .subscribe(result => {
          // set token in localStorage
          localStorage.setItem('token', result.token);
          if (result.portfolioId){
            localStorage.setItem('portfolioId',result.portfolioId);
            this.router.navigate(['dashboard', 'home']);
          }
          else{
            this.router.navigate(['templates']);
          }
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Error!',
            text: 'Something wrong with google email',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }
      );
    })
  }
}
