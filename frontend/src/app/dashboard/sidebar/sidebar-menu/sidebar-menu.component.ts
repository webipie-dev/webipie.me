import {Component, HostListener, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {SidebarMenuService} from './sidebar-menu.service';
import {ThemeOptions} from 'src/app/_shared/theme-options';
import {JoyrideService} from "ngx-joyride";

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  animations: [
    trigger('slide', [
      state('up', style({height: 0, opacity: '0'})),
      state('down', style({height: '*', opacity: '1'})),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarMenuComponent implements OnInit {
  menus: any;

  constructor(
    public globals: ThemeOptions,
    private sidebarMenuService: SidebarMenuService,
    private router: Router,
    private joyride: JoyrideService
  ) {
    this.menus = [...sidebarMenuService.getMenuList()];
  }

  private innerWidth: any;

  ngOnInit() {
    const theActiveMenu = this.sidebarMenuService.getMenuItemByUrl(this.menus, this.router.url);
    if (theActiveMenu) {
      this.toggle(theActiveMenu);
    }
    this.tour();
    this.innerWidth = window.innerWidth;
  }


  tour() {
    this.joyride.startTour({
      steps: ['tourStep1', 'tourStep2', 'tourStep3', 'tourStep4', 'tourStep5', 'tourStep6', 'tourStep7'],
      themeColor: '#070919'
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  toggleSidebarMobileOpen() {
    if (this.innerWidth < 992) {
      this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
      this.globals.toggleSidebar = false;
    }
  }

  toggle(currentMenu: any) {
    this.menus = this.sidebarMenuService.toggleMenuItem(this.menus, currentMenu);
  }

  getState(currentMenu: any) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

}
