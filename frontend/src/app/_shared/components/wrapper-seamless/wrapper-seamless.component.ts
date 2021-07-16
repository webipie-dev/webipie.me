import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wrapper-seamless',
  templateUrl: './wrapper-seamless.component.html'
})
export class WrapperSeamlessComponent {
  @Input() sectionHeading!: string;
  @Input() sectionDescription!: string;
}
