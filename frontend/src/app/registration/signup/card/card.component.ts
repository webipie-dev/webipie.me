import { Component, OnInit } from '@angular/core';
import { faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  delay=false;
  google=faGoogle;
  linkedin=faLinkedinIn;
  email?: string;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Delaying the card animation for a bit
    setInterval(()=>{
      this.delay=true;
    },100)
  }

  signUp(): void{
    this.router.navigate(['../confirmation'], { relativeTo: this.route, queryParams: { email: this.email ?? 'webipie.me@gmail.com'}})
  }

}
