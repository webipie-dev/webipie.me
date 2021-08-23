import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../_shared/services/auth.service";

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
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log(error)
    });
    console.log(this.linkedInToken)
  }

}
