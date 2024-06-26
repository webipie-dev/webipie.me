import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-card-templates',
  templateUrl: './card-templates.component.html',
  styleUrls: ['./card-templates.component.scss']
})
export class CardTemplatesComponent implements OnInit {

  constructor() { }

  url!: string;
  @Input() selected=false;
  @Input() index!: number;
  @Output() selectEmitter = new EventEmitter<boolean>();
  ngOnInit(): void {
    this.url = `${environment.protocol}://johndoe${this.index}.${environment.websiteDomainName}${environment.PORT}`;
  }

  select(){
    if(this.selected){
      this.selectEmitter.emit(false);
    }else{
      this.selectEmitter.emit(true);
    }
  }
}
