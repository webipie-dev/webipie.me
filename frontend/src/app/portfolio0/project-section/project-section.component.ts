
import { Component, OnInit, Renderer2 } from '@angular/core';
import {ProjectModel} from "../../_shared/models/project.model";

@Component({
  selector: 'app-project-section',
  templateUrl: './project-section.component.html',
  styleUrls: ['./project-section.component.scss']
})
export class ProjectSectionComponent implements OnInit {
  globalTag="All";
  button = 1;
  tags: string[] = [];
  secondaryColor: any;
  primaryColor: any;
  constructor(private renderer: Renderer2) { }
  projects?: [ProjectModel];
  disabled?: boolean;
  ngOnInit(): void {
    this.secondaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[1];
    this.primaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[0];
    
    this.projects = this.getProjects();
    this.disabled = JSON.parse(localStorage.getItem('portfolio')!).projectsDisabled;
    this.button = JSON.parse(localStorage.getItem('portfolio')!).template.project.button;
    this.tags = this.getTags(this.projects)
  }
  hover(e:any){
    if(!e.target.getAttribute('class').includes('active')){
      e.target.setAttribute('style','background-color:'+this.primaryColor+';border-color:'+this.primaryColor);
    }
    
  }
  unhover(e:any){
    if(!e.target.getAttribute('class').includes('active')){
      e.target.setAttribute('style','background-color:inherit;color:'+this.primaryColor+';border-color:'+this.primaryColor);
    }
  }
  changeTag(s:string){
    this.globalTag = s;
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

  getTags(projects: [ProjectModel]|undefined): string[]{
    let result: string[] = [];
    if(projects)
      for(let project of projects)
        if(project.skills)
          for(let skill of project.skills)
            if(!result.includes(skill))
              result.push(skill)  
    return result;
  }
}
