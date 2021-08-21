import {Component} from '@angular/core';
import {ThemeOptions} from 'src/app/_shared/theme-options';
import {faDotCircle} from '@fortawesome/free-regular-svg-icons';
import {faArrowsAltH} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar-header',
  templateUrl: './sidebar-header.component.html'
})
export class SidebarHeaderComponent {

  dotCircle = faDotCircle;
  arrowsAltH = faArrowsAltH;

  constructor(public globals: ThemeOptions) {
  }

  toggleSidebarCollapse() {
    this.globals.toggleSidebar = !this.globals.toggleSidebar;
  }

  toggleSidebarMobileOpen() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
    this.globals.toggleSidebar = false;
  }

}
