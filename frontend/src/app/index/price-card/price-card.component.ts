import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.component.html',
  styleUrls: ['./price-card.component.scss'],
})
export class PriceCardComponent implements OnInit {
  @Input() class : String = '';
  title:String='';
  cost:String='';
  constructor() {

  }

  ngOnInit(): void {
    if(this.class =="cardd primary"){
      this.title='PREMIUM PACK';
      this.cost='$150';
    } else {
      this.title='STANDARD PACK';
      this.cost='$100';
    }
  }

}
