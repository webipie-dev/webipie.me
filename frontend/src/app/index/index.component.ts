import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
