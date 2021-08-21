
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
  secondaryColor: any;
  primaryColor: any;
  constructor(private renderer: Renderer2) { }
  projects?: [ProjectModel];
  ngOnInit(): void {
    this.secondaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[1];
    this.primaryColor = JSON.parse(localStorage.getItem('portfolio')!).template.colorChart[0];
    
    this.projects = JSON.parse(localStorage.getItem('portfolio')!).projects;
    this.button = JSON.parse(localStorage.getItem('portfolio')!).template.project.button;
  }
  hover(e:any){
    e.target.setAttribute('style','background-color:'+this.primaryColor);
  }
  changeTag(s:string){
    this.globalTag = s;
  }
}
