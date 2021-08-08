import {formatDate} from '@angular/common';
import {Component, OnInit} from '@angular/core';

type CountryVisit = {
  country: string;
  count: number;
  icon: string
};

type UserVisit = {
  country: string;
  count: number;
  icon: string,
  date: Date,
  ip: string
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  portfolio: any = {
    "creationDate": "2021-07-15T10:43:14.304Z",
    "projects": [],
    "softSkills": [],
    "workExperiences": [],
    "volunteeringExperiences": [],
    "name": "first-portfolio",
    "url": "first-portfolio.webipie.me",
    "template": {
      "header": {"img": "", "title": "image", "description": "", "mainButton": ""},
      "colorChartOptions": [{
        "bg-color": "#fcf7ff",
        "font color": "#655560",
        "secondary color": "#a4969b"
      }, {"bg-color": "#ffffff", "font color": "#1f0812", "secondary color": "#c99489"}, {
        "bg-color": "#ebeaea",
        "font color": "#4a051c",
        "secondary color": "#830a48"
      }, {"bg-color": "#FFFFFF", "font color": "#2D3A4B", "secondary color": "#FFE115"}, {
        "bg-color": "#e7e7de",
        "font color": "#00587a",
        "secondary color": "#008891"
      }, {"bg-color": "#f6f6f6", "font color": "#ff8e6e", "secondary color": "#4e89ae"}],
      "fontOptions": ["Montserrat", "Verdana", "Courier New"],
      "colorChart": {"bg-color": "#fcf7ff", "font color": "#655560", "secondary color": "#a4969b"},
      "name": "template1",
      "font": "Montserrat",
      "id": "600052b31181b6901031508f"
    },
    "achievements": [],
    "testimonials": [],
    "technicalSkills": [],
    "description": "it is a patch in a description",
    "visits": {
      "3-227-233-40": {
        "_id": "60f22757b2271636b1820da2",
        "ip": "3.227.233.40",
        "date": "2021-07-17T00:41:59.926Z",
        "country": "US",
        "count": 5
      },
      "197-28-78-112": {
        "_id": "60f22aad8e3250001f2260a0",
        "ip": "197.28.78.112",
        "date": "2021-07-17T00:56:13.524Z",
        "country": "TN",
        "count": 2
      },
      "54-81-107-155": {
        "_id": "60f22b1c8e3250001f2260a6",
        "ip": "54.81.107.155",
        "date": "2021-07-17T00:58:04.019Z",
        "country": "US",
        "count": 3
      },
      "197-2-187-156": {
        "_id": "60f2a4348e3250001f2260ad",
        "ip": "197.2.187.156",
        "date": "2021-07-17T09:34:44.443Z",
        "country": "TN",
        "count": 3
      },
      "197-15-38-184": {
        "_id": "60f2a45e8e3250001f2260bc",
        "ip": "197.15.38.184",
        "date": "2021-07-17T09:35:26.218Z",
        "country": "TN",
        "count": 2
      },
      "41-225-49-109": {
        "_id": "60f2ad0b8e3250001f2260c5",
        "ip": "41.225.49.109",
        "date": "2021-07-17T10:12:27.831Z",
        "country": "TN",
        "count": 1
      },
      "197-15-67-167": {
        "_id": "60f32a228e3250001f2260da",
        "ip": "197.15.67.167",
        "date": "2021-07-17T19:06:10.960Z",
        "country": "TN",
        "count": 6
      }
    },
    "visitsPerDay": {
      "2021-07-24": 5,
      "2021-07-23": 1,
      "2021-07-22": 3,
      "2021-07-21": 5,
      "2021-07-20": 1,
      "2021-07-25": 2
    },
    "id": "60f01191e48f772dcdf242ab"
  }
  lastNDays: number = 15
  visits: any
  nusers: number
  nvisits: number
  visitsPerDay: number
  visitsPerCountry: CountryVisit[]
  userVisits: UserVisit[]

  constructor() {
    let visitsInLastNDays = this.getVisits(this.portfolio.visitsPerDay, this.lastNDays)
    this.visits = [
      {
        name: 'visits',
        data: visitsInLastNDays
      }
    ]

    this.nvisits = this.getNVisits(this.portfolio.visits)
    this.nusers = this.getNUsers(this.portfolio.visits)
    this.visitsPerDay = 0
    for (let i = 0; i < visitsInLastNDays.length; i++) {
      this.visitsPerDay += visitsInLastNDays[i]
    }
    this.visitsPerDay = this.visitsPerDay / visitsInLastNDays.length
    this.visitsPerCountry = this.getVisitsPerCountry(this.portfolio.visits)
    this.userVisits = this.getUserVisits(this.portfolio.visits)
    console.log(this.userVisits)

  }

  ngOnInit(): void {
  }

  getVisits(visitsPerDay: any, lastNDays: number) {
    let visits = [];
    if (!visitsPerDay) {
      for (var i = 0; i < lastNDays; i++) visits.push(0);
      return visits;
    }

    let today = new Date(Date.now())

    for (var i = 0; i < lastNDays; i++) {
      let currentDay = formatDate(today, 'YYYY-MM-dd', 'en-US')
      if (currentDay in visitsPerDay)
        visits.push(visitsPerDay[currentDay])
      else
        visits.push(0)

      today.setDate(today.getDate() - 1)
    }

    return visits.reverse()
  }

  getNVisits(visits: any): number {
    if (visits) {
      let nvisits = 0
      for (const ip in visits) {
        nvisits += visits[ip]["count"]
      }
      return nvisits
    } else
      return 0
  }

  getNUsers(visits: any): number {
    if (visits)
      return Object.keys(visits).length
    else
      return 0
  }

  getVisitsPerCountry(visits: any): CountryVisit[] {
    if (visits) {
      let countryVisits: Map<string, number> = new Map<string, number>()
      for (const ip in visits) {
        if (countryVisits.has(visits[ip]["country"])) {
          let cnVisits = countryVisits.get(visits[ip]["country"])
          if (cnVisits)
            countryVisits.set(visits[ip]["country"], cnVisits + visits[ip]["count"])
        } else {
          countryVisits.set(visits[ip]["country"], visits[ip]["count"])
        }
      }
      let rows: CountryVisit[] = []
      countryVisits.forEach((count: number, country: string) => {
        let cnVisit: CountryVisit = {
          country: country,
          count: count,
          icon: `flag-icon flag-icon-${country.toLowerCase()}`
        }
        rows.push(cnVisit)
      })
      return rows
    }
    return []
  }

  getUserVisits(visits: any): UserVisit[] {
    if (visits) {
      let rows: UserVisit[] = []
      for (const ip in visits) {
        let userVisit: UserVisit = {
          country: visits[ip]["country"],
          count: visits[ip]["count"],
          date: new Date(Date.parse(visits[ip]["date"])),
          ip: visits[ip]["ip"],
          icon: `flag-icon flag-icon-${visits[ip]["country"].toLowerCase()}`
        }
        rows.push(userVisit)
      }
      rows.sort((a, b) => {
        return b.date.getDate() - a.date.getDate()
      })
      return rows
    }
    return []
  }
}
