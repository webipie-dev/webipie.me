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
  email = "johndoe@gmail.com";
  phoneNumber = "55 555 555";
  icon : string = "";
  card : string = "";
  constructor() { }

  ngOnInit(): void {
    this.phoneNumber = JSON.parse(localStorage.getItem('portfolio')!).phoneNumber;
    this.email = JSON.parse(localStorage.getItem('portfolio')!).email;
    if(JSON.parse(localStorage.getItem('portfolio')!).template.contact.socialMediaIcon == 2) this.icon = 'square';
    if(JSON.parse(localStorage.getItem('portfolio')!).template.contact.contactCard == 1) this.card = 'fullysquare';
  }

}
