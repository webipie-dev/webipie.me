import {Component, OnInit} from '@angular/core';
import {Font, FontInterface} from 'ngx-font-picker';
import {TemplateModel} from "../../../_shared/models/template.model";
import {DesignEditService} from "../../../_shared/services/design-edit.service";
import {ObjectShapeEnum} from "../../../_shared/enums/object-shape.enum";
import {ButtonStyleEnum} from "../../../_shared/enums/button-style.enum";
import {ButtonSizeEnum} from "../../../_shared/enums/button-size.enum";

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
    this.template = this.designEditService.getCurrentTemplate();
    this.setDefaultColorPalettes();
    this.setDefaultFonts();
    this.setDefaultColorChosen();
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

  public togglePresetFonts(): void {
    this.presetFonts = this.presetFonts.length ? [] : this.presetFonts;
  }

  public toggleExtraOptions(): void {
    this.sizeSelect = !this.sizeSelect;
    this.styleSelect = !this.styleSelect;
  }

  onElementChange(element: string, newValue: any) {
    console.log(element, newValue)
    // @ts-ignore
    this.template[element] = newValue;
    console.log(this.template);
  }
}
