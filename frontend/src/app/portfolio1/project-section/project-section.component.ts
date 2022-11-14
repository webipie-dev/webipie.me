import { Component, OnInit } from '@angular/core';
import { ProjectModel } from 'src/app/_shared/models/project.model';

@Component({
  selector: 'app-project-section',
  templateUrl: './project-section.component.html',
  styleUrls: ['./project-section.component.scss']
})
export class ProjectSectionComponent implements OnInit {

  projects: ProjectModel[]= [];
  disabled?: boolean;

  constructor() { }

  ngOnInit(): void {
    this.disabled = JSON.parse(localStorage.getItem('portfolio')!).projectsDisabled;
    this.projects = this.getProjects();
    console.log(this.projects)
  }

  getProjects(){
    let projects = JSON.parse(localStorage.getItem('portfolio')!).projects;
    if(projects)
      for(let project of projects)
        if(project.skills)
          for(let i = 0; i < project.skills.length; i++)
            project.skills[i] = project.skills[i].toLowerCase();
    return projects;
  }

}
