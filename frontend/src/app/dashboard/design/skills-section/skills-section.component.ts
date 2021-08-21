import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-skills-section',
  templateUrl: './skills-section.component.html',
  styleUrls: ['./skills-section.component.scss']
})
export class SkillsSectionComponent implements OnInit {
  softSkills = [false, false, true];

  constructor() {
  }

  onItemChange(softSkill: any) {
    this.change(softSkill.target.value);
  }

  change(s: string) {
    switch (s) {
      case 'first': {
        this.softSkills[0] = true;
        this.softSkills[1] = false;
        this.softSkills[2] = false;
        break;
      }
      case 'second': {
        this.softSkills[1] = true;
        this.softSkills[2] = false;
        this.softSkills[0] = false;
        break;
      }
      case 'third': {
        this.softSkills[2] = true;
        this.softSkills[0] = false;
        this.softSkills[1] = false;
        break;
      }
    }
  }

  select(i: number) {
    let s: string;
    if (i == 1) {
      s = "first";
    } else if (i == 2) {
      s = "second";
    } else {
      s = "third";
    }
    this.change(s);
  }

  ngOnInit(): void {
  }

}
