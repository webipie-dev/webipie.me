import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faFacebookF, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { ContactService } from 'src/app/_shared/services/contact.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contact-support',
  templateUrl: './contact-support.component.html',
  styleUrls: ['./contact-support.component.scss']
})
export class ContactSupportComponent implements OnInit {
  mail = faEnvelope;
  phone = faPhone;
  email = "alaeddine.abdessalem@gmail.com";
  phoneNumber = "+216 99739801";
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
  }

  

  onSubmit() {
    let obj = this.contactForm.value
    console.log(obj)
    this.contactService.contactSupport(obj).subscribe((result) => {
      
        Swal.fire({
          title: 'Support contacted! We\'ll reach out to you soon!',
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



