import { Component } from '@angular/core';
import { ThemeOptions } from 'src/app/_shared/theme-options';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html'
})
export class HeaderSearchComponent {
  constructor(public globals: ThemeOptions) {}

  searchActive = false;

}
