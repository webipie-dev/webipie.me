import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-howitworks-section',
  templateUrl: './howitworks-section.component.html',
  styleUrls: ['./howitworks-section.component.scss']
})
export class HowitworksSectionComponent implements OnInit {
  fakeArray = new Array(6);
  fakeArrayInline = new Array(10);
  constructor() { }

  ngOnInit(): void {
  }

}
