import {Component, OnInit} from '@angular/core';
import {TemplateModel} from "../../../_shared/models/template.model";
import {DesignEditService} from "../../../_shared/services/design-edit.service";

@Component({
  selector: 'app-skills-section',
  templateUrl: './skills-section.component.html',
  styleUrls: ['./skills-section.component.scss']
})
export class SkillsSectionComponent implements OnInit {

  softSkills: boolean[] = [false, false, false];
  harSkills: boolean[] = [false, false, false];
  template!: TemplateModel;

  constructor(private designEditService: DesignEditService) { }

  ngOnInit(): void {
    this.template = this.designEditService.getCurrentTemplate();
    this.setDefaultHardSkills();
    this.setDefaultSoftSkills();
  }

  setDefaultSoftSkills() {
    this.softSkills[this.template.softSkills - 1] = true
  }

  setDefaultHardSkills() {
    this.harSkills[this.template.hardSkills - 1] = true
  }

  onElementChange(element: string, newValue: string | number) {
    // @ts-ignore
    this.template[element] = newValue;
    console.log(this.template)
  }

  change(element: string, s:string){
    if(element === 'softSkills') {
      switch (s){
        case 'first':{
          this.softSkills[0]=true;
          this.softSkills[1]=false;
          this.softSkills[2]=false;
          break;
        }
        case 'second':{
          this.softSkills[1]=true;
          this.softSkills[0]=false;
          this.softSkills[2]=false;
          break;
        }
        case 'third': {
          this.softSkills[2]=true;
          this.softSkills[0]=false;
          this.softSkills[1]=false;
          break;
        }
      }
    } else {
      switch (s){
        case 'first':{
          this.harSkills[0]=true;
          this.harSkills[1]=false;
          this.harSkills[2]=false;
          break;
        }
        case 'second':{
          this.harSkills[1]=true;
          this.harSkills[0]=false;
          this.harSkills[2]=false;
          break;
        }
        case 'third': {
          this.harSkills[2]=true;
          this.harSkills[0]=false;
          this.harSkills[1]=false;
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
