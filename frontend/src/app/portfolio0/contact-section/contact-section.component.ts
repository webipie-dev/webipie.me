import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faFacebookF, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { ContactService } from 'src/app/_shared/services/contact.service';

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
  constructor(private formBuilder: FormBuilder, private contactService: ContactService) { }

  contactForm = this.formBuilder.group({
    name: ['', ],
    message: ['', ],
    subject: ['', ],
    email: ['', ],
  });

  ngOnInit(): void {
    this.phoneNumber = JSON.parse(localStorage.getItem('portfolio')!).phoneNumber;
    this.email = JSON.parse(localStorage.getItem('portfolio')!).email;
    if(JSON.parse(localStorage.getItem('portfolio')!).template.contact.socialMediaIcon == 2) this.icon = 'square';
    if(JSON.parse(localStorage.getItem('portfolio')!).template.contact.contactCard == 1) this.card = 'fullysquare';
  }
  onSubmit() {
    this.contactService.contact({id: "60de311165912da279d3cb9d", ...this.contactForm.value}).subscribe((result) => {
    });
  }
}
