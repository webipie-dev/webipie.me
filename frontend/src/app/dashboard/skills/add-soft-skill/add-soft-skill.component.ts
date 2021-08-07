import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-soft-skill',
  templateUrl: './add-soft-skill.component.html',
  styleUrls: ['./add-soft-skill.component.scss']
})
export class AddSoftSkillComponent implements OnInit {
  someValue = 5;
  selectedSkills = ['Karyn Wright'];
    skills :any;
  constructor() { }

  ngOnInit(): void {
    this.skills = [
        'Karyn Wright',
        'Rochelle Estes',
        'Mendoza Ruiz',
        'Rosales Russell',
        'Marquez Nolan',
        'Franklin James',
        'Elsa Bradley',
        'Pearson Thompson',
        'Ina Pugh',
        'Nguyen Elliott',
        'Mills Barnett',
        'Margaret Reynolds',
        'Yvette Navarro',
        'Elisa Guzman',
        'Jodie Bowman',
        'Diann Booker'
    ];
  }

}
