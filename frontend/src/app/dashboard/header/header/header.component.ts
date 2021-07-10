import { Component } from '@angular/core';
import { ThemeOptions } from 'src/app/_shared/theme-options';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(public globals: ThemeOptions) {}

  toggleSidebarMobileOpen() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
    this.globals.toggleSidebar = false;
  }

}
