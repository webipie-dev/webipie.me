import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-confirmation-card',
  templateUrl: './confirmation-card.component.html',
  styleUrls: ['./confirmation-card.component.css']
})
export class ConfirmationCardComponent implements OnInit {

  delay=false;
  email?: string;
  constructor(private route: ActivatedRoute) { }

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

}
