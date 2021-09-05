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
  portfolio: any
  lastNDays: number = 15
  visits: any
  nusers: number = 0
  nvisits: number = 0
  visitsPerDay: number = 0
  visitsPerCountry: CountryVisit[] = []
  userVisits: UserVisit[] = []

  constructor() {}

  ngOnInit(): void {
    window.addEventListener('storage', () => {
      this.setAll()
    });
    this.setAll()

  }

  setAll(): void {
    this.portfolio = JSON.parse(localStorage.getItem('portfolio')!)
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
