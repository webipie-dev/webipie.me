import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../_shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SocialAuthService} from "angularx-social-login";
import {NgxSpinnerService} from "ngx-spinner";
import Swal from "sweetalert2";

@Component({
  selector: 'app-card-consent',
  templateUrl: './card-consent.component.html',
  styleUrls: ['./card-consent.component.scss']
})
export class CardConsentComponent implements OnInit {
  shown : boolean = false;
  consent : boolean = false;
  delay: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private authSocial: SocialAuthService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    //Delaying the card animation for a bit
    setInterval(()=>{
      this.delay=true;
    },100)
  }

  isValidForm(): boolean {
    return this.consent;
  }

  giveConsent() {
    this.spinner.show();
    this.authService.giveConsent().subscribe(result => {
      this.spinner.hide();
      if(result.success){
        if (result.user.portfolioId) {
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
        text: 'An error occurred',
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    })

  }

  show(){
    this.shown = !this.shown;
  }
}
