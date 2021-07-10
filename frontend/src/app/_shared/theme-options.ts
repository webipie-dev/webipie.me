import { Injectable } from '@angular/core';

@Injectable()
export class ThemeOptions {
  // Header

  hoverHeaderSearch = false;
  toggleHeaderDrawer = false;
  headerFixed = true;
  headerShadow = true;
  headerTransparentBg = true;

  // Sidebar

  toggleSidebar = false;
  toggleSidebarMobile = false;
  sidebarBackground = '';
  sidebarBackgroundStyle = 'dark';
  sidebarFixed = true;
  sidebarLighterStyle = false;
  sidebarShadow = false;
  sidebarFooter = false;
  sidebarUserbox = false;

  // Footer

  footerFixed = false;
  footerShadow = false;
  footerTransparentBg = true;

  // Page title

  pageTitleIconBox = true;
  pageTitleBreadcrumb = false;
  pageTitleDescription = true;
  pageTitleShadow = false;
  pageTitleStyle = '';
  pageTitleBackground = '';

  // Main content

  contentBackground = '';
}
