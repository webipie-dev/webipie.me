import {Injectable, OnInit} from '@angular/core';

interface MenuItem {
  title: string;
  type: string;
  badge?: {
    class: string;
    text: string;
  };
  text?: string;
  link?: string;
  active?: boolean;
  icon?: string;
  submenus?: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class SidebarMenuService {

  menus: MenuItem[] = [
    {
      "title": "Application",
      "type": "header",
      "text": "some text"
    },
    {
      "title": "Home",
      "type": "simple",
      "icon": "<i class=\"pe-7s-safe\"> </i>",
      "link": "/dashboard/home",
      "text": 'This is the home page of your dashboard where you can keep track of the number of visitors and their location.'
    },
    {
      "title": "Portfolio Sections",
      "type": "dropdown",
      "text": 'This is the part where you fulfill your portfolio with all your experiences and achievements, click on it and all the different sections will appear',
      "icon": "<i class=\"pe-7s-note2\"></i>",
      "submenus": [
        {
          "title": "General Infos",
          "type": "simple",
          "link": "/dashboard/general-infos"
        },
        {
          "title": "Skills",
          "type": "simple",
          "link": "/dashboard/skills"
        },
        {
          "title": "Education",
          "type": "simple",
          "link": "/dashboard/education"
        },
        {
          "title": "Experience",
          "type": "simple",
          "link": "/dashboard/experience"
        },
        {
          "title": "Projects",
          "type": "simple",
          "link": "/dashboard/projects"
        },
        {
          "title": "Achievements",
          "type": "simple",
          "link": "/dashboard/achievements"
        },
        {
          "title": "Testimonials",
          "type": "simple",
          "link": "/dashboard/testimonials"
        },
      ]
    },
    {
      "title": "Portfolio Design",
      "type": "simple",
      "icon": "<i class=\"pe-7s-magic-wand\"> </i>",
      "link": "/dashboard/design",
      "text": 'This is the part where you customize your portfolio, you can change colors, fonts and so much more'
    },
    {
      "title": "Help",
      "type": "header",
      "text": "The help section"
    },
    {
      "title": "Contact Support",
      "type": "simple",
      "icon": "<i class=\"pe-7s-headphones\"></i>",
      "link": "/dashboard/support-request",
      "text": "If you have any questions or feedback, don't hesitate to contact us, we reply within a day"
    },
    {
      "title": "Request Domain Name",
      "type": "simple",
      "icon": "<i class=\"pe-7s-note2\"></i>",
      "link": "/dashboard/domain-request",
      "text": "If you want to customize your domain name, fill out this form and we'll get back to you with further details"
    },
    {
      "title": "FAQ",
      "type": "simple",
      "icon": "<i class=\"pe-7s-help1\"></i>",
      "link": "/dashboard/faq",
      "text": "Check out our frequently asked questions"
    },
    {
      "title": "Settings",
      "type": "header",
      "text": "general settings for your profile"
    },
    {
      "title": "Profile",
      "type": "simple",
      "icon": "<i class=\"pe-7s-user\"></i>",
      "link": "/dashboard/profile",
      "text": "check your portfolio"
    },
    {
      "title": "Log Out",
      "type": "simple",
      "icon": "<i class=\"pe-7s-next-2\"></i>",
      "text": "simply log out"
    }
  ];

  constructor() {
  }

  getMenuList() {
    return this.menus;
  }

  getMenuItemByUrl(aMenus: MenuItem[], aUrl: string): any {
    for (const theMenu of aMenus) {
      if (theMenu.link && theMenu.link === aUrl) {
        return theMenu;
      }

      if (theMenu.submenus && theMenu.submenus.length > 0) {
        const foundItem = this.getMenuItemByUrl(theMenu.submenus, aUrl);
        if (foundItem) {
          return foundItem;
        }
      }
    }
    return undefined;
  }

  toggleMenuItem(aMenus: MenuItem[], aCurrentMenu: MenuItem): MenuItem[] {
    return aMenus.map((aMenu: MenuItem) => {
      if (aMenu === aCurrentMenu) {
        aMenu.active = !aMenu.active;
      } else {
        aMenu.active = false;
      }

      if (aMenu.submenus && aMenu.submenus.length > 0) {
        aMenu.submenus = this.toggleMenuItem(aMenu.submenus, aCurrentMenu);

        if (aMenu.submenus.find(aChild => aChild.active)) {
          aMenu.active = true;
        }
      }

      return aMenu;
    });
  }
}
