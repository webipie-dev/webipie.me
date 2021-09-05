import { Component, OnInit } from '@angular/core';
import {TemplateModel} from "../../../_shared/models/template.model";
import {DesignEditService} from "../../../_shared/services/design-edit.service";

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss']
})
export class ProjectsSectionComponent implements OnInit {
  popupCard: boolean[] = [];
  buttonStyle: boolean[] = [];
  template!: TemplateModel;

  constructor(private designEditService: DesignEditService) { }

  ngOnInit(): void {
    this.designEditService.currentTemplate.subscribe(template => {
      this.template = template;
      this.setDefaultButtonStyle();
      this.setDefaultPopupCard();
    })
  }

  setDefaultPopupCard() {
    if(this.template.project.popupCard === 1) {
      this.popupCard = [true, false];
    } else {
      this.popupCard = [false, true];
    }
  }

  setDefaultButtonStyle() {
    if(this.template.project.button === 1) {
      this.buttonStyle = [true, false];
    } else {
      this.buttonStyle = [false, true];
    }
  }

  onElementChange(element: string, newValue: string | number) {
    // @ts-ignore
    this.template.project[element] = newValue;
    this.designEditService.updateTemplate(this.template);
  }

  change(element: string, s:string){
    if(element === 'button') {
      switch (s){
        case 'first':{
          this.buttonStyle[0]=true;
          this.buttonStyle[1]=false;
          break;
        }
        case 'second':{
          this.buttonStyle[1]=true;
          this.buttonStyle[0]=false;
          break;
        }
      }
    } else {
      switch (s){
        case 'first':{
          this.popupCard[0]=true;
          this.popupCard[1]=false;
          break;
        }
        case 'second':{
          this.popupCard[1]=true;
          this.popupCard[0]=false;
          break;
        }
      }
    }
  }

  select(element: string, newValue: string | number, i?: number){
    let s:string;
    if(i==1){
      s="first";
    }else{
      s="second";
    }
    this.change(element, s);
    this.onElementChange(element, newValue);
  }

}
