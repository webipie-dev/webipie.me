import {Component, Input, OnInit} from '@angular/core';
import {TechnicalSkillDeveloperModel} from "../../../_shared/models/technical-skill-developer";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  @Input() hardSkill!: TechnicalSkillDeveloperModel;

  constructor() { }

  ngOnInit(): void {
  }

}
