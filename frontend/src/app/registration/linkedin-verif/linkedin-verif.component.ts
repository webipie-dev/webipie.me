import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../_shared/services/auth.service";

@Component({
  selector: 'app-linkedin-verif',
  templateUrl: './linkedin-verif.component.html',
  styleUrls: ['./linkedin-verif.component.scss']
})
export class LinkedinVerifComponent implements OnInit {

  linkedInToken?: string;
  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.linkedInToken = this.route.snapshot.queryParams["code"];
    this.authService.signInWithLinkedIn(this.linkedInToken).subscribe(res => {
      console.log(res)})
    console.log(this.linkedInToken)
  }

}
