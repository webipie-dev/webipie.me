import { Component, OnInit } from '@angular/core';
import { faFacebookF, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss']
})
export class ContactSectionComponent implements OnInit {
  google = faGoogle;
  facebook = faFacebookF;
  linkedin = faLinkedinIn;
  mail = faEnvelope;
  phone = faPhone;
  constructor() { }

  ngOnInit(): void {
  }

}
