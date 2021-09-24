import { Component, OnInit } from '@angular/core';
import {TemplateModel} from "../../../_shared/models/template.model";
import {DesignEditService} from "../../../_shared/services/design-edit.service";

@Component({
  selector: 'app-education-section',
  templateUrl: './education-section.component.html',
  styleUrls: ['./education-section.component.scss']
})
export class EducationSectionComponent implements OnInit {

  dateContainer: boolean[] = [false, false, false];
  dividerIcon: boolean[] = [false, false, false];
  template!: TemplateModel;

  constructor(private designEditService: DesignEditService) { }

  ngOnInit(): void {
    this.designEditService.currentTemplate.subscribe(template => {
      this.template = template;
      this.setDefaultDateContainer();
      this.setDefaultDividerIcon();
    })
  }

  setDefaultDateContainer() {
    this.dateContainer[this.template.education.dateContainer - 1] = true
  }

  setDefaultDividerIcon() {
    this.dividerIcon[this.template.education.dividerIcon - 1] = true
  }

  onElementChange(element: string, newValue: string | number) {
    // @ts-ignore
    this.template.education[element] = newValue;
    this.designEditService.updateTemplate(this.template);
  }

  change(element: string, s:string){
    if(element === 'dateContainer') {
      switch (s){
        case 'first':{
          this.dateContainer[0]=true;
          this.dateContainer[1]=false;
          this.dateContainer[2]=false;
          break;
        }
        case 'second':{
          this.dateContainer[1]=true;
          this.dateContainer[0]=false;
          this.dateContainer[2]=false;
          break;
        }
        case 'third': {
          this.dateContainer[2]=true;
          this.dateContainer[0]=false;
          this.dateContainer[1]=false;
          break;
        }
      }
    } else {
      switch (s){
        case 'first':{
          this.dividerIcon[0]=true;
          this.dividerIcon[1]=false;
          this.dividerIcon[2]=false;
          break;
        }
        case 'second':{
          this.dividerIcon[1]=true;
          this.dividerIcon[0]=false;
          this.dividerIcon[2]=false;
          break;
        }
        case 'third': {
          this.dividerIcon[2]=true;
          this.dividerIcon[0]=false;
          this.dividerIcon[1]=false;
          break;
        }
      }
    }
  }

  select(element: string, newValue: string | number, i?: number){
    let s:string;
    if(i==1){
      s="first";
    }else if(i===2){
      s="second";
    }else {
      s="third";
    }
    this.change(element, s);
    this.onElementChange(element, newValue)
  }


}
