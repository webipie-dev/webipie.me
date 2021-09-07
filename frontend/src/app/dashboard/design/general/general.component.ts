import {Component, OnInit} from '@angular/core';
import {Font, FontInterface} from 'ngx-font-picker';
import {TemplateModel} from "../../../_shared/models/template.model";
import {DesignEditService} from "../../../_shared/services/design-edit.service";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  color1 = '#50aeaa';
  speedValue: number = 0;
  toggle = true;
  colorPalettes: string[][] = [];
  presetFonts: string[] = [];
  colorChart: string[] = [];
  colorChartIndex: number = -1;
  template!: TemplateModel;
  pictureStyle: boolean[] = [];
  buttonShape: boolean[] = [];
  buttonStyle: boolean[] = [];
  buttonSize: boolean[] = [];


  public font: FontInterface = new Font({
    family: 'Roboto',
    size: '14px',
    style: 'regular',
    styles: ['regular']

  });
  hover = false;
  public sizeSelect: boolean = false;
  public styleSelect: boolean = false;

  constructor(private designEditService: DesignEditService) {
  }

  ngOnInit(): void {
    this.designEditService.currentTemplate.subscribe(template => {
      this.template = template;
      this.setDefaultColorPalettes();
      this.setDefaultFonts();
      this.setDefaultColorChosen();
      this.setDefaultPictureStyle();
      this.setDefaultButtonShape();
      this.setDefaultButtonSize();
      this.setDefaultButtonStyle();
      this.setDefaultCarouselSpeed();
    })
  }

  setDefaultColorPalettes() {
    this.colorPalettes = this.template.colorChartOptions
  }

  setDefaultColorChosen() {
    this.colorChart = this.template.colorChart;
    this.colorPalettes.map((color, index) => {
      if(JSON.stringify(color) === JSON.stringify(this.colorChart)) {
        this.colorChartIndex = index
      }
    })
  }

  setDefaultFonts() {
    this.presetFonts = this.template.fontOptions
    this.font.family = this.template.font
  }

  setDefaultCarouselSpeed() {
    this.speedValue = this.template.general.animationSpeed
  }

  setDefaultPictureStyle() {
    if(this.template.general.picture === 'rounded') {
      this.pictureStyle = [true, false];
    } else {
      this.pictureStyle = [false, true];
    }
  }

  setDefaultButtonShape() {
    if(this.template.general.buttons.shape === 'square') {
      this.buttonShape = [true, false];
    } else {
      this.buttonShape = [false, true];
    }
  }

  setDefaultButtonSize() {
    if(this.template.general.buttons.size === 'small') {
      this.buttonSize = [true, false, false];
    } else if (this.template.general.buttons.size === 'normal'){
      this.buttonSize = [false, true, false];
    } else {
      this.buttonSize = [false, false, true];
    }
  }

  setDefaultButtonStyle() {
    if(this.template.general.buttons.style === 'solid') {
      this.buttonStyle = [true, false];
    } else {
      this.buttonStyle = [false, true];
    }
  }

  public togglePresetFonts(): void {
    this.presetFonts = this.presetFonts.length ? [] : this.presetFonts;
  }

  public toggleExtraOptions(): void {
    this.sizeSelect = !this.sizeSelect;
    this.styleSelect = !this.styleSelect;
  }

  onGeneralElementChange(element: string, newValue: any) {
    // @ts-ignore
    this.template.general[element] = newValue;
    this.designEditService.updateTemplate(this.template);
  }

  onElementChange(element: string, newValue: any) {
    // @ts-ignore
    this.template[element] = newValue;
    this.designEditService.updateTemplate(this.template);
  }

  onButtonChange(element: string, newValue: string) {
    // @ts-ignore
    this.template.general.buttons[element] = newValue;
    this.designEditService.updateTemplate(this.template);
  }

  changePicture(element: string, newValue: any, number: number) {
    if (number === 1) {
      this.pictureStyle = [true, false]
    } else {
      this.pictureStyle = [false, true]
    }
    this.onGeneralElementChange(element, newValue);
  }

  changeButtonShape(element: string, newValue: string, number: number) {
    if(number === 1) {
      this.buttonShape = [true, false];
    } else {
      this.buttonShape = [false, true];
    }
    this.onButtonChange(element, newValue);
  }

  changeButtonStyle(element: string, newValue: string, number: number) {
    if(number === 1) {
      this.buttonStyle = [true, false];
    } else {
      this.buttonStyle = [false, true];
    }
    this.onButtonChange(element, newValue);
  }

  changeButtonSize(element: string, newValue: string, number: number) {
    if(number === 1) {
      this.buttonSize = [true, false, false];
    } else if(number === 2) {
      this.buttonSize = [false, true, false];
    } else {
      this.buttonSize = [false, false, true];
    }
    this.onButtonChange(element, newValue);
  }
}
