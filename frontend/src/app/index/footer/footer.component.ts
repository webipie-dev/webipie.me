import { Component, OnInit } from '@angular/core';
import { faTwitter,faFacebookF,faLinkedinIn,faInstagram } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faTwitter = faTwitter;
  faFacebook = faFacebookF;
  faLinkedIn = faLinkedinIn;
  faInstagram = faInstagram;
  constructor() { }

  ngOnInit(): void {
  }

}
