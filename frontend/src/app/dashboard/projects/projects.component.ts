import {Component, OnInit} from '@angular/core';
import {ProjectModel} from "../../_shared/models/project.model";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor() {
  }

  projects?: [ProjectModel]

  ngOnInit(): void {
    this.projects = JSON.parse(localStorage.getItem('portfolio')!).projects;
  }

}
