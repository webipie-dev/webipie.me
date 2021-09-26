import {Component, HostListener, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Router} from '@angular/router';
import {SidebarMenuService} from './sidebar-menu.service';
import {ThemeOptions} from 'src/app/_shared/theme-options';
import {JoyrideService} from "ngx-joyride";
import {AuthService} from "../../../_shared/services/auth.service";

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.css'],
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
  steps: string[] = [];

  constructor(
    public globals: ThemeOptions,
    private sidebarMenuService: SidebarMenuService,
    private router: Router,
    private joyride: JoyrideService,
    private authService: AuthService
  ) {
    this.menus = [...sidebarMenuService.getMenuList()];
  }

  private innerWidth: any;

  ngOnInit() {
    const theActiveMenu = this.sidebarMenuService.getMenuItemByUrl(this.menus, this.router.url);
    if (theActiveMenu) {
      this.toggle(theActiveMenu);
    }
    this.authService.verifyFirstVisit().subscribe(result => {
      if (result.firstVisit === true) {
        this.tour();
      }
    })
    this.innerWidth = window.innerWidth;
  }

  tour() {

    this.joyride.startTour({
      steps: ['Portfolio', 'Design', 'Request Domain Name'],
      themeColor: '#070919'
    })
    this.authService.guideTourDone().subscribe(result => {
      console.log(result)
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

  logout() {
    this.authService.logout();
    this.toggleSidebarMobileOpen();
    this.router.navigate(['/']);
  }
}
