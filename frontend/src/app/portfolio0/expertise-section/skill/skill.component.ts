import {Component, Input, OnInit} from '@angular/core';
import { faAddressBook, faStar } from '@fortawesome/free-solid-svg-icons';
import {TechnicalSkillDeveloperModel} from "../../../_shared/models/technical-skill-developer";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  @Input() hardSkill!: TechnicalSkillDeveloperModel | any ;
  secondaryColor: any;
  primaryColor: any;
  icon = true;
  font='Montserrat';
  skill = faAddressBook;
  constructor() { }
  star = faStar;
  hardSkillsTemplate? = 1;
  levels : any = [];
  ngOnInit(): void {
    this.hardSkillsTemplate = JSON.parse(localStorage.getItem('portfolio')!).template.hardSkills;
    this.levels = Array(5).fill(false);
    this.secondaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[1];
    this.primaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[0];
    this.font = JSON.parse(localStorage.getItem('portfolio')!).template.font;

    for(let i = 0;i<this.hardSkill.level/2;i++){
      this.levels[i] = true;
    }

    
  }

}
