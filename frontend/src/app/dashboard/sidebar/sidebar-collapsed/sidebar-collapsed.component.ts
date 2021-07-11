import { Component } from '@angular/core';
import { ThemeOptions } from 'src/app/_shared/theme-options';

@Component({
  selector: 'app-sidebar-collapsed',
  templateUrl: './sidebar-collapsed.component.html'
})
export class SidebarCollapsedComponent {

  constructor(public globals: ThemeOptions) {}

  toggleSidebarMobileOpen() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
    this.globals.toggleSidebar = false;
  }

}
