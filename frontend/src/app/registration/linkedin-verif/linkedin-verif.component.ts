import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../_shared/services/auth.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-linkedin-verif',
  templateUrl: './linkedin-verif.component.html',
  styleUrls: ['./linkedin-verif.component.scss']
})
export class LinkedinVerifComponent implements OnInit {

  linkedInToken?: string;
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.linkedInToken = this.route.snapshot.queryParams["code"];
    this.authService.signInWithLinkedIn(this.linkedInToken).subscribe(res => {
      localStorage.setItem('token', res.jwtToken);
      console.log(res)
      if(res.portfolioId) {
        localStorage.setItem('portfolioId', res.portfolioId)
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/templates/choose-template']);
      }
      //
    }, error => {
      Swal.fire({
        title: 'Error!',
        text: error.error.errors[0],
        icon: 'error',
        confirmButtonText: 'Cool'
      });
      //add swal
    });
  }

}
