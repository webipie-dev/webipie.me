import {Component, Input, OnInit} from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {TechnicalSkillDeveloperModel} from "../../../_shared/models/technical-skill-developer";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  @Input() hardSkill!: TechnicalSkillDeveloperModel;

  constructor() { }
  star = faStar;
  hardSkillsTemplate? = 1;
  levels : any = [];
  ngOnInit(): void {
    this.hardSkillsTemplate = JSON.parse(localStorage.getItem('portfolio')!).template.hardSkills;
    this.levels = Array(5).fill(false);
    for(let i = 0;i<this.hardSkill.level/2;i++){
      this.levels[i] = true;
    }
  }

}
