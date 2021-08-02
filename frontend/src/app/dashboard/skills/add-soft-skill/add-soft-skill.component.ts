import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-soft-skill',
  templateUrl: './add-soft-skill.component.html',
  styleUrls: ['./add-soft-skill.component.scss']
})
export class AddSoftSkillComponent implements OnInit {
  someValue = 5;
  selectedSkills = ['Karyn Wright'];
    skills = [
        {
            'id': '5a15b13c36e7a7f00cf0d7cb',
            'name': 'Front End'
        },
        {
            'id': '5a15b13c2340978ec3d2c0ea',
            'name': 'Back End'
        },
        {
            'id': '5a15b13c663ea0af9ad0dae8',
            'name': 'Mobile Development'
        },
        {
            'id': '5a15b13cc9eeb36511d65acf',
            'name': 'Rosales Russell'
        },
        {
            'id': '5a15b13c728cd3f43cc0fe8a',
            'name': 'Marquez Nolan'
        },
        {
            'id': '5a15b13ca51b0aaf8a99c05a',
            'name': 'Franklin James'
        },
        {
            'id': '5a15b13cc3b9381ffcb1d6f7',
            'name': 'Elsa Bradley'
        },
        {
            'id': '5a15b13ce58cb6ff62c65164',
            'name': 'Pearson Thompson'
        },
        {
            'id': '5a15b13c90b95eb68010c86e',
            'name': 'Ina Pugh'
        },
        {
            'id': '5a15b13c2b1746e12788711f',
            'name': 'Nguyen Elliott'
        },
        {
            'id': '5a15b13c605403381eec5019',
            'name': 'Mills Barnett'
        },
        {
            'id': '5a15b13c67e2e6d1a3cd6ca5',
            'name': 'Margaret Reynolds'
        },
        {
            'id': '5a15b13c947c836d177aa85c',
            'name': 'Yvette Navarro'
        },
        {
            'id': '5a15b13c5dbbe61245c1fb73',
            'name': 'Elisa Guzman'
        },
        {
            'id': '5a15b13c38fd49fefea8db80',
            'name': 'Jodie Bowman'
        },
        {
            'id': '5a15b13c9680913c470eb8fd',
            'name': 'Diann Booker'
        }
    ];
  constructor() { }

  ngOnInit(): void {

  }

}
