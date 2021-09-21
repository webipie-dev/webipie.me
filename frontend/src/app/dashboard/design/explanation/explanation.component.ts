import { Component, OnInit,Input } from '@angular/core';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-explanation',
  templateUrl: './explanation.component.html',
  styleUrls: ['./explanation.component.scss']
})
export class ExplanationComponent implements OnInit {

  @Input() text : string =""; 
  shown : boolean = false ;
  question = faQuestionCircle;
  constructor() { }

  ngOnInit(): void {
  }

}
