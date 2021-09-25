import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor() { }

  faqs = [
    {
      question: "What is webipie.me ?",
      answer: "Webipie.me helps you build and customize a portfolio in minutes. All you need to do is to fill your information in the portfolio section, customize your design preferences and you'll see changes applied to your website."
    },
    {
      question: "How can I fill information about my portfolio ?",
      answer: "In your dashboard, you should be able to access the portfolio sections. We support different sections like general infos, education, skills, experience, projects, achievements and testimonials. Add your information and it will immediately show up in your website!"
    },
    {
      question: "How can I customize the design of my portfolio ?",
      answer: "Check the design section in your dashboard. For each portfolio section, you can configure your preferences and they will immediately show up in your website!"
    },
    {
      question: "Can I get a custom domain name instead of a webipie.me subdomain ?",
      answer: `Yes. Simply fill the form here: ${environment.protocol}://${environment.websiteDomainName}${environment.PORT}/dashboard/domain-request. We'll reach out to you as soon as possible.`,
    },
    {
      question: "There are many sections but I don't want all of them. How can I remove sections ?",
      answer: "It's possible to disable sections. You can find toggle buttons in the portfolio section in your dashboard or the dashboard home page. If you disable a toggle butotn of a section, it will not show up on your portfolio, but your data will not be lost."
    },
    {
      question: "I need support setting up portfolio. Where can I seek help ?",
      answer: `Fill the form here: ${environment.protocol}://${environment.websiteDomainName}${environment.PORT}/dashboard/support-request. And we will reach out to you soon.`
    },
    {
      question: "Where can I get information about visits to my website ?",
      answer: "Check your dashboard home page. You should be able to see analytics about the number of visits and the sources of these visits."
    },
  ]

  ngOnInit(): void {
  }

}
