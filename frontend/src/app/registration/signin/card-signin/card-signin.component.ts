import { Component, OnInit } from '@angular/core';
import { faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-card-signin',
  templateUrl: './card-signin.component.html',
  styleUrls: ['./card-signin.component.css']
})
export class CardSigninComponent implements OnInit {

  delay=false;
  google=faGoogle;
  linkedin=faLinkedinIn
  constructor() { }

  ngOnInit(): void {
    //Delaying the card animation for a bit
    setInterval(()=>{
      this.delay=true;
    },100)
  }
}
