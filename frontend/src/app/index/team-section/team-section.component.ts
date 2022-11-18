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
      position: 'Full Stack Developer',
      githublink: 'https://github.com/nour-karoui',
      linkedinlink: 'https://www.linkedin.com/in/nourkaroui/'
    },
    {
      name: 'Jawher Bouhouch',
      picture: 'assets/jawher.jpg',
      position: 'Full Stack Developer',
      githublink: 'https://github.com/butterjack',
      linkedinlink: 'https://www.linkedin.com/in/jawher-bouhouch/'
    },
    {
      name: 'Alaeddine Abdessalem',
      picture: 'assets/ala.jpg',
      position: 'Solutions Architect',
      githublink: 'https://github.com/alaeddine-13',
      linkedinlink: 'https://www.linkedin.com/in/alaeddine-abdessalem-549b65169/'
    },
    {
      name: 'Med Amine Hamdouni',
      picture: 'assets/amine.jpg',
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
  ]
  constructor() { }

  ngOnInit(): void {
  }
  onIntersection(){
    this.class = 'active';
  }
}
