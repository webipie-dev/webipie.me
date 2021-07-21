import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-templates',
  templateUrl: './card-templates.component.html',
  styleUrls: ['./card-templates.component.scss']
})
export class CardTemplatesComponent implements OnInit {
  @Input() selected=false;
  constructor() { }
  @Output() selectEmitter = new EventEmitter<boolean>();
  ngOnInit(): void {
  }
  select(){
    if(this.selected){
      this.selectEmitter.emit(false);
    }else{
      this.selectEmitter.emit(true);
    }
  }
}
