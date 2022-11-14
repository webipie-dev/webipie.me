import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-wrapper-simple',
  templateUrl: './wrapper-simple.component.html',
  styleUrls: ['./wrapper-simple.component.scss']
})
export class WrapperSimpleComponent implements OnInit {
  @Input()
  sectionHeading!: string;
  @Input()
  sectionDescription!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
