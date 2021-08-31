import {Component, OnInit} from '@angular/core';
import {DesignEditService} from "../../../_shared/services/design-edit.service";
import {TemplateModel} from "../../../_shared/models/template.model";

@Component({
  selector: 'app-testimonials-section',
  templateUrl: './testimonials-section.component.html',
  styleUrls: ['./testimonials-section.component.scss']
})
export class TestimonialsSectionComponent implements OnInit {

  textAlignment: boolean[] = [];
  pictureStyle: boolean[] = [];
  speedValue = 5;
  template!: TemplateModel;

  constructor(private designEditService: DesignEditService) { }

  ngOnInit(): void {
    this.designEditService.currentTemplate.subscribe(template => {
      this.template = template;
      this.setDefaultPictureStyle();
      this.setDefaultTextAlignment();
      this.setDefaultCarouselSpeed();
    })
  }

  setDefaultPictureStyle() {
    if(this.template.testimonials.picture === 'rounded') {
      this.pictureStyle = [true, false];
    } else {
      this.pictureStyle = [false, true];
    }
  }

  setDefaultCarouselSpeed() {
    this.speedValue = this.template.testimonials.carouselSpeed;
  }

  setDefaultTextAlignment() {
    if(this.template.testimonials.textAlign === 'right') {
      this.textAlignment = [true, false];
    } else {
      this.textAlignment = [false, true];
    }
  }

  onElementChange(element: string, newValue: string | number) {
    // @ts-ignore
    this.template.testimonials[element] = newValue;
    this.designEditService.updateTemplate(this.template);
  }

  change(element: string, s:string){
    if(element === 'textAlign') {
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
    } else {
      switch (s){
        case 'first':{
          this.pictureStyle[0]=true;
          this.pictureStyle[1]=false;
          break;
        }
        case 'second':{
          this.pictureStyle[1]=true;
          this.pictureStyle[0]=false;
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
    this.onElementChange(element, newValue)
  }
}
