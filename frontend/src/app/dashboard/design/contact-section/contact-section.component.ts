import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss']
})
export class ContactSectionComponent implements OnInit {
  textAlignment = [false,true];
  someValue = 5;
  constructor() { }
  onItemChange(softSkill:any){
    this.change(softSkill.target.value);
  }
  change(s:string){
    switch (s){
      case 'first':{
        this.textAlignment[0]=true;
        this.textAlignment[1]=false;
        break;
      }
      case 'second':{
        this.textAlignment[1]=true;
        this.textAlignment[0]=false;
        break;
      }
    }
  }
  select(i:number){
    let s:string;
    if(i==1){
      s="first";
    }else{
      s="second";
    }
    this.change(s);
  }
  ngOnInit(): void {
  }
}
