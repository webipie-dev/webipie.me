import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../_shared/services/auth.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-confirmation-card',
  templateUrl: './confirmation-card.component.html',
  styleUrls: ['./confirmation-card.component.css']
})
export class ConfirmationCardComponent implements OnInit {

  delay=false;
  email?: string;
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if(token){
      this.authService.sendConfirmation(token).subscribe((res) => {
        if(this.authService.isLoggedIn())
          this.router.navigate(['/templates', 'choose-template']);
        else
          this.router.navigate(['/register', 'signin']).then(() =>{
            Swal.fire({
              title: 'Email confirmed',
              text: 'Please sign in',
              icon: 'success',
              confirmButtonText: 'Thanks'
            });
          });
      });
    }

    this.route.queryParams
      .subscribe(params => {
          this.email = params.email;
        }
      );
    //Delaying the card animation for a bit
    setInterval(()=>{
      this.delay=true;
    },100)
  }

  resendEmail() {
    this.authService.resendConfirmation().subscribe(res => {
      if(res.success)
        Swal.fire({
          title: 'Email confirmation sent',
          text: 'Please check your email',
          icon: 'success',
          confirmButtonText: 'Thanks'
        });
      else
        Swal.fire({
          title: 'Error!',
          text: 'please try again or contact us',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
    }, error => {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'email or/and password are incorrect!',
          icon: 'error',
          confirmButtonText: 'Cool',
          footer: '<a href="/dashboard/support-request">Contact Support</a>'
        });
      })
  }

  emailConfirmed() {
    // fetch user from jwt
    this.authService.isVerified().subscribe(res => {
      if (res.verified) {
        if(localStorage.getItem('portfolioId')){
          this.router.navigate(['/dashboard', 'home'])
        }else{
          this.router.navigate(['/templates/choose-template'])
        }
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Email not Verified, check your email box or click on RESEND EMAIL!',
          icon: 'error',
          confirmButtonText: 'Cool'
        });
      }
    }, error => {
      Swal.fire({
        title: 'Error!',
        text: 'Email not Verified, check your email box or click on RESEND EMAIL!',
        icon: 'error',
        confirmButtonText: 'Cool',
      });
    })
  }
}
