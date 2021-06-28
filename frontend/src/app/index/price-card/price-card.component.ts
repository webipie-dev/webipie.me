import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.component.html',
  styleUrls: ['./price-card.component.css']
})
export class PriceCardComponent implements OnInit {
  @Input() class : String = '';
  title:String='';
  cost:String='';
  constructor() {

  }

  ngOnInit(): void {
    if(this.class =="card primary"){
      this.title='PREMIUM PACK';
      this.cost='$150';
    } else {
      this.title='STANDARD PACK';
      this.cost='$100';
    }
  }

}
