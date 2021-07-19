import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-templates',
  templateUrl: './card-templates.component.html',
  styleUrls: ['./card-templates.component.scss']
})
export class CardTemplatesComponent implements OnInit {
  @Input() selected=false;
  constructor() { }

  ngOnInit(): void {
  }
  select(){
    if(this.selected){
      this.selected=false;
    }else{
      this.selected=true;
    }
  }
}
