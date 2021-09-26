import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-section',
  templateUrl: './team-section.component.html',
  styleUrls: ['./team-section.component.scss']
})
export class TeamSectionComponent implements OnInit {
  class = "";
  team = [
    {
      name: 'Nour Karoui',
      picture: 'assets/nour.jpg',
      position: 'Co-founder & Full Stack Developer',
      githublink: 'https://github.com/nour-karoui',
      linkedinlink: 'https://www.linkedin.com/in/nourkaroui/'
    },
    {
      name: 'Jawher Bouhouch',
      picture: 'assets/jawher.jpg',
      position: 'Co-founder & Backend Developer',
      githublink: 'https://github.com/butterjack',
      linkedinlink: 'https://www.linkedin.com/in/jawher-bouhouch/'
    },
    {
      name: 'Alaeddine Abdessalem',
      picture: 'assets/ala.jpg',
      position: 'Co-founder & Solutions Architect',
      githublink: 'https://github.com/alaeddine-13',
      linkedinlink: 'https://www.linkedin.com/in/alaeddine-abdessalem-549b65169/'
    },
    {
      name: 'Chedy Hammami',
      picture: 'assets/shadi.jpg',
      position: 'Co-founder & Full Stack Developer',
      githublink: 'https://github.com/bishkou',
      linkedinlink: 'https://www.linkedin.com/in/chedyhm/'
    },
    {
      name: 'Med Amine Hamdouni',
      picture: 'https://media-exp1.licdn.com/dms/image/C4D03AQEmmk2DS-OP7g/profile-displayphoto-shrink_800_800/0/1617576000611?e=1637798400&v=beta&t=GeYyCd8DT1a6lLZpvocy5ZJFXc0qMtJB9SmRRAEFxsw',
      position: 'Frontend Developer',
      githublink: 'https://github.com/Dopeamin',
      linkedinlink: 'https://www.linkedin.com/in/aminehmd/'
    },
    {
      name: 'Dali Sahnoun',
      picture: 'assets/dali.png',
      position: 'Frontend Developer',
      githublink: 'https://github.com/dalideco',
      linkedinlink: 'https://www.linkedin.com/in/dalideco/'
    },
    {
      name: 'Yassine Gabsi',
      picture: 'assets/ala.jpg',
      position: 'Frontend Developer',
      githublink: 'https://github.com/YassineGabsi',
      linkedinlink: 'https://www.linkedin.com/in/yassine-gabsi/'
    },

  ]
  constructor() { }

  ngOnInit(): void {
  }
  onIntersection(){
    this.class = 'active';
  }
}
