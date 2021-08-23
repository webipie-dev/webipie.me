import {Component, OnInit} from '@angular/core';
import {Font, FontInterface} from 'ngx-font-picker';
import {DesignEditService} from "../../_shared/services/design-edit.service";

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {
  color1 = '#50aeaa';
  color2 = '#000000';
  toggle = true;
  private _presetFonts = ['Arial', 'Times', 'Courier', 'Lato', 'Open Sans', 'Roboto Slab', 'Montserrat'];
  public font: FontInterface = new Font({
    family: 'Roboto',
    size: '14px',
    style: 'regular',
    styles: ['regular']

  });
  hover = false;
  public sizeSelect: boolean = false;
  public styleSelect: boolean = false;

  public presetFonts = this._presetFonts;

  constructor(public designEditService: DesignEditService) {
  }

  ngOnInit(): void {
    console.log(this.designEditService.testChange())
  }

  public togglePresetFonts(): void {
    this.presetFonts = this.presetFonts.length ? [] : this._presetFonts;
  }

  public toggleExtraOptions(): void {
    this.sizeSelect = !this.sizeSelect;
    this.styleSelect = !this.styleSelect;
  }

  public submitChanges(): void {
    this.designEditService.submitValues();
  }
}
