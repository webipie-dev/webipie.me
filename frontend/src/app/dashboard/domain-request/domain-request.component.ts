import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faFacebookF, faGoogle, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { ContactService } from 'src/app/_shared/services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-domain-request',
  templateUrl: './domain-request.component.html',
  styleUrls: ['./domain-request.component.scss']
})
export class DomainRequestComponent implements OnInit {
  mail = faEnvelope;
  phone = faPhone;
  email = "alaeddine.abdessalem@gmail.com";
  phoneNumber = "+216 99739801";
  icon : string = "";
  card : string = "";
  constructor(private formBuilder: FormBuilder, private contactService: ContactService) { }

  contactForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    domain: ['', Validators.required],
  });

  ngOnInit(): void {
  }
  onSubmit() {
    let obj = {portfolioID: JSON.parse(localStorage.getItem('portfolio')!).id, ...this.contactForm.value}
    this.contactService.contactRequestDomain(obj).subscribe((result) => {
      
        Swal.fire({
          title: 'Request submitted! We\'ll reach out to you soon!',
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

