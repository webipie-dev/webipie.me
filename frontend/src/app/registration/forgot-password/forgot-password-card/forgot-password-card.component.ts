import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../_shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SocialAuthService} from "angularx-social-login";
import {NgxSpinnerService} from "ngx-spinner";
import Swal from "sweetalert2";

@Component({
  selector: 'app-forgot-password-card',
  templateUrl: './forgot-password-card.component.html',
  styleUrls: ['./forgot-password-card.component.scss']
})
export class ForgotPasswordCardComponent implements OnInit {

  email = '';
  delay = false;


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
    return this.email !== '';
  }

  sendPassword() {
    this.spinner.show();
    this.authService.forgotPassword(this.email).subscribe(result => {
      console.log(result)
      this.spinner.hide();
      if(result.success) {
        Swal.fire({
          title: 'Hourey!',
          text: 'We generated a new password for you, Go Check your email, GO GO GO !',
          icon: 'success',
          confirmButtonText: 'Cool'
        }).then(() => {
          this.router.navigate(['/']);
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Something Went Wrong',
          icon: 'error',
          confirmButtonText: 'Cool'
        }).then(() => {
          this.router.navigate(['/']);
        });
      }
    }, error => {
      this.spinner.hide();
      Swal.fire({
        title: 'Error!',
        text: error.error.errors[0].message || 'Email doesn\'t exist',
        icon: 'error',
        confirmButtonText: 'Cool'
      }).then(() => {
        this.router.navigate(['/']);
      });
    })
  }

}
