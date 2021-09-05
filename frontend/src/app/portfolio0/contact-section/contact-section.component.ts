import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faFacebookF, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { ContactService } from 'src/app/_shared/services/contact.service';
import Swal from 'sweetalert2';

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
    name: ['', Validators.required],
    message: ['', Validators.required],
    subject: ['', Validators.required],
    email: ['', Validators.required],
  });

  ngOnInit(): void {
    this.phoneNumber = JSON.parse(localStorage.getItem('portfolio')!).phoneNumber;
    this.email = JSON.parse(localStorage.getItem('portfolio')!).email;
    if(JSON.parse(localStorage.getItem('portfolio')!).template.contact.socialMediaIcon == 2) this.icon = 'square';
    if(JSON.parse(localStorage.getItem('portfolio')!).template.contact.contactCard == 1) this.card = 'fullysquare';
  }
  onSubmit() {
    let obj = {portfolioID: JSON.parse(localStorage.getItem('portfolio')!).id, ...this.contactForm.value}
    console.log(obj)
    this.contactService.contact(obj).subscribe((result) => {
      
        Swal.fire({
          title: 'Email sent!',
          text: result.result,
          icon: 'success',
          confirmButtonText: 'Thanks'
        })
    }, (error) =>{
      Swal.fire({
          title: 'Error !',
          text: error.error.error,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
    });
  }
}
