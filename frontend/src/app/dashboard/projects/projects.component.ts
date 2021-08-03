import {Component, OnInit} from '@angular/core';
import {ProjectModel} from "../../_shared/models/project.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  projects?: [ProjectModel]

  ngOnInit(): void {
    this.projects = JSON.parse(localStorage.getItem('portfolio')!).projects;
  }

  editProject(id: string) {
    this.router.navigate(['addproject'], { relativeTo: this.route, queryParams: { projectId: id } });
  }
}
