import {Component, Input, OnInit} from '@angular/core';
import {DesignEditService} from "../../../_shared/services/design-edit.service";
import {TemplateModel} from "../../../_shared/models/template.model";

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.component.html',
  styleUrls: ['./contact-section.component.scss']
})
export class ContactSectionComponent implements OnInit {
  contactCard: boolean[] = [];
  socialMediaIcon: boolean[] = [false, false, false];
  template!: TemplateModel;
  setDefault = true;
  constructor(private designEditService: DesignEditService) { }

  ngOnInit(): void {
    this.designEditService.currentTemplate.subscribe(template =>  {
      this.template = template;
      if (this.setDefault) {
        this.setDefaultFormAlignment();
        this.setDefaultSocialMediaIcon();
        this.setDefault = false;
      }

    })
  }

  setDefaultSocialMediaIcon() {
    this.socialMediaIcon[this.template.contact.contactCard - 1] = true;
    console.log(this.socialMediaIcon)
  }

  setDefaultFormAlignment() {
    if(this.template.contact.contactCard === 1) {
      this.contactCard = [true, false];
    } else {
      this.contactCard = [false, true];
    }
  }

  onElementChange(element: string, newValue: string | number) {
    // @ts-ignore
    this.template.contact[element] = newValue;
    this.designEditService.updateTemplate(this.template);
  }

  change(element: string, s:string){
    if(element == 'contactCard') {
      switch (s){
        case 'first':{
          this.contactCard[0]=true;
          this.contactCard[1]=false;
          break;
        }
        case 'second':{
          this.contactCard[1]=true;
          this.contactCard[0]=false;
          break;
        }
      }
    }
    else {
      console.log('ggfgf')
      switch (s){
        case 'first':{
          console.log('first')

          this.socialMediaIcon[0]=true;
          this.socialMediaIcon[1]=false;
          this.socialMediaIcon[2]=false;
          break;
        }
        case 'second':{
          this.socialMediaIcon[0]=false;
          this.socialMediaIcon[1]=true;
          this.socialMediaIcon[2]=false;
          break;
        }
        case 'third': {
          console.log('thris')
          this.socialMediaIcon[0]=false;
          this.socialMediaIcon[1]=false;
          this.socialMediaIcon[2]=true;
          console.log(this.socialMediaIcon)
          break;
        }
      }
    }
  }

  select(element: string, newValue: string | number, i?: number){
    let s:string;
    if(i === 1){
      s="first";
    }else if (i === 2){
      s="second";
    }else {
      s="third";
    }
    this.change(element, s);
    this.onElementChange(element, newValue);
  }

}
