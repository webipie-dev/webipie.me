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
      console.log(res);
    }, error => {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'email or/and password are incorrect!',
          icon: 'error',
          confirmButtonText: 'Cool'
        });
      })
  }

  emailConfirmed() {
    // fetch user from jwt
    this.authService.isVerified().subscribe(res => {
      if (res.verified) {
        this.router.navigate(['/dashboard'])
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
        confirmButtonText: 'Cool'
      });
    })
  }
}
