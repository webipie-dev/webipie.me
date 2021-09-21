import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor() { }

  faqs = [
    {
      question: "what is webipie.me ?",
      answer: "it a portfolio builder"
    },
    {
      question: "what is webipie.me ?",
      answer: "it a portfolio builder"
    },
    {
      question: "what is webipie.me ?",
      answer: "it a portfolio builder"
    },
    {
      question: "what is webipie.me ?",
      answer: "it a portfolio builder"
    },
    {
      question: "what is webipie.me ?",
      answer: "it a portfolio builder"
    },
    {
      question: "what is webipie.me ?",
      answer: "it a portfolio builder"
    },
    {
      question: "what is webipie.me ?",
      answer: "it a portfolio builder"
    }
  ]

  ngOnInit(): void {
  }

}
