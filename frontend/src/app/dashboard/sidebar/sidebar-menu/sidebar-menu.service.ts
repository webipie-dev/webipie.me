import { Injectable } from '@angular/core';

interface MenuItem {
    title: string;
    type: string;
    badge?: {
        class: string;
        text: string;
    };
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
    "type": "header"
  },
  {
    "title": "Home",
    "type": "simple",
    "icon": "<i class=\"pe-7s-safe\"> </i>",
    "link": "/dashboard/"
  },
  {
    "title": "Portfolio",
    "type": "dropdown",
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
    "title": "Design",
    "type": "simple",
    "icon": "<i class=\"pe-7s-magic-wand\"> </i>",
    "link": "/dashboard/design"
  },
  {
    "title": "Settings",
    "type": "header"
  },
  {
    "title": "Profile",
    "type": "simple",
    "icon": "<i class=\"pe-7s-user\"></i>",
    "link": "/dashboard/profile"
  },
  {
    "title": "Preferences",
    "type": "simple",
    "icon": "<i class=\"pe-7s-settings\"></i>",
    "link": "/update-preferences"
  },
  {
    "title": "Log Out",
    "type": "simple",
    "icon": "<i class=\"pe-7s-next-2\"></i>",
    "link": "/logout"
  }
];

    constructor() { }

    getMenuList() {
        return this.menus;
    }

    getMenuItemByUrl(aMenus: MenuItem[], aUrl: string): any {
        for (const theMenu of aMenus) {
            if (theMenu.link && theMenu.link == aUrl) {
              
              console.log(aUrl);
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
                console.log(aCurrentMenu.link);
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
