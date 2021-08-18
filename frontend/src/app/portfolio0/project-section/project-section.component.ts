
import { Component, OnInit, Renderer2 } from '@angular/core';
import {ProjectModel} from "../../_shared/models/project.model";

@Component({
  selector: 'app-project-section',
  templateUrl: './project-section.component.html',
  styleUrls: ['./project-section.component.scss']
})
export class ProjectSectionComponent implements OnInit {
  globalTag="All";
  constructor(private renderer: Renderer2) { }
  projects?: [ProjectModel];
  ngOnInit(): void {
    this.projects = JSON.parse(localStorage.getItem('portfolio')!).projects;
  }
  changeTag(s:string){
    this.globalTag = s;
  }
}
