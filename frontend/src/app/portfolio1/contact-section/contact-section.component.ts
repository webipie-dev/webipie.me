import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactService } from 'src/app/_shared/services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss']
})
export class ContactSectionComponent implements OnInit {

  email = "johndoe@gmail.com";
  phoneNumber = "55 555 555";


  contactForm = this.formBuilder.group({
    name: ['', Validators.required],
    message: ['', Validators.required],
    subject: ['', Validators.required],
    email: ['', [Validators.required,Validators.email]],
  });

  constructor(private formBuilder: FormBuilder, private contactService: ContactService) { }

  ngOnInit(): void {
    this.phoneNumber = JSON.parse(localStorage.getItem('portfolio')!).phoneNumber;
    this.email = JSON.parse(localStorage.getItem('portfolio')!).email;
  }

  get f() {
    return this.contactForm.controls
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
          confirmButtonText: 'Ok',
          footer: '<a href="/dashboard/support-request">Contact Support</a>'
        })
    });
  }
}
